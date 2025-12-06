
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    [key: string]: any;
};

type CartItem = Product & {
    quantity: number;
    size?: string;
    cart_item_id?: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product, size?: string) => Promise<void>;
    updateQuantity: (index: number, change: number) => Promise<void>;
    removeFromCart: (index: number) => Promise<void>;
    deleteFromCart: (index: number) => Promise<void>;
    clearCart: () => Promise<void>;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    moveToCart: (product: Product) => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    user: User | null;
    animateAddToCart: (sourceRect: DOMRect, imageSrc: string) => void;
    removingIndex: number | null;
    isClearing: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const supabase = createClient();

    // 1. Check User & Fetch Cart on Load
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);

                if (user) {
                    fetchDbCart(user.id); // DB se cart lao
                } else {
                    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
                    setCart(localCart); // Local cart lao
                }
            } catch (error) {
                console.error('Error checking user:', error);
                const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart(localCart); // Local cart lao
            }

            // Load Wishlist from LocalStorage
            try {
                const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                setWishlist(localWishlist);
            } catch (err) {
                console.error("Error loading wishlist:", err);
            }
        };
        checkUser();

        // Auth State Change Listener (Login/Logout detect karne ke liye)
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user || null;
            setUser(currentUser);

            if (event === 'SIGNED_IN' && currentUser) {
                // Non-blocking merge: Don't await this to prevent login freeze
                mergeLocalCartToDb(currentUser.id).catch(err => console.error("Background merge failed:", err));

                // Fetch cart immediately
                await fetchDbCart(currentUser.id);
            } else if (event === 'SIGNED_OUT') {
                setCart([]); // Clear cart or reset to local
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // 2. Database se Cart lana
    const fetchDbCart = async (userId: string) => {
        console.log("Fetching cart from DB for user:", userId);

        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error("Error fetching cart:", error);
            return;
        }

        console.log("Cart data from DB:", data);

        if (data && data.length > 0) {
            const { PRODUCTS } = await import('../data/products');

            const fullCartItems = data.map((item: any) => {
                const product = PRODUCTS.find(p => p.id == item.product_id);
                if (product) {
                    return {
                        ...product,
                        quantity: item.quantity,
                        size: item.size,
                        cart_item_id: item.id
                    };
                }
                console.log("Product not found for id:", item.product_id);
                return null;
            }).filter(Boolean) as CartItem[];

            console.log("Setting cart to:", fullCartItems);
            setCart(fullCartItems);
        } else {
            console.log("No items in DB cart, setting empty array");
            setCart([]);
        }
    };

    // 3. ✨ Merge Logic (Local -> DB) - High End Approach (RPC)
    // 3. ✨ Merge Logic (Local -> DB) - High End Approach (RPC)
    const mergeLocalCartToDb = async (userId: string) => {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (localCart.length === 0) return;

        console.log("Attempting to merge cart for user:", userId);

        // Double check session existence
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            console.warn("No active session found during cart merge. Aborting.");
            return;
        }

        // Use the secure Database Function (RPC) to sync items
        const { error } = await supabase.rpc('sync_cart', {
            items: localCart
        });

        if (error) {
            console.error("Error merging cart to DB (RPC):", error.message);
        } else {
            console.log("Cart merged successfully via RPC!");
            localStorage.removeItem('cart'); // Safayi only on success
        }
    };

    // 4. Add to Cart Function
    const addToCart = async (product: Product, size?: string) => {
        console.log("Adding to cart:", product.title, "User:", user?.email);

        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size);

        if (existingItemIndex > -1) {
            // Item exists, increment quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);

            if (user) {
                // DB Update Quantity
                const item = updatedCart[existingItemIndex];
                if (item.cart_item_id) {
                    const { error } = await supabase
                        .from('cart_items')
                        .update({ quantity: item.quantity })
                        .eq('id', item.cart_item_id);

                    if (error) console.error("Error updating quantity in DB:", error);
                }
            } else {
                // Local Update
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } else {
            // New Item
            const newItem = { ...product, size, quantity: 1 };
            setCart(prevCart => [...prevCart, newItem]);

            if (user) {
                // DB Add
                const { data, error } = await supabase
                    .from('cart_items')
                    .insert({ user_id: user.id, product_id: product.id, quantity: 1, size })
                    .select();

                if (error) {
                    console.error("Error adding to cart:", JSON.stringify(error, null, 2));
                } else {
                    console.log("Added to DB successfully:", data);
                    // Refresh to get the cart_item_id
                    await fetchDbCart(user.id);
                }
            } else {
                // Local Add - save to localStorage
                console.log("Adding to local cart (no user)");
                const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
                currentCart.push(newItem);
                localStorage.setItem('cart', JSON.stringify(currentCart));
            }
        }
    };

    // Update Quantity
    const updateQuantity = async (index: number, change: number) => {
        const updatedCart = [...cart];
        const item = updatedCart[index];
        const newQuantity = item.quantity + change;

        // Prevent quantity < 1
        if (newQuantity < 1) return;

        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);

        if (user && item.cart_item_id) {
            // DB Update
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('id', item.cart_item_id);

            if (error) console.error("Error updating quantity:", error);
        } else {
            // Local Update
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // Wishlist Functions
    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.some(p => p.id === product.id)) return prev;
            const newWishlist = [...prev, product];
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist(prev => {
            const newWishlist = prev.filter(p => p.id !== productId);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
    };

    const moveToCart = (product: Product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const [isClearing, setIsClearing] = useState(false);

    const clearCart = async () => {
        setIsClearing(true);
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 500));

        setCart([]);
        setIsClearing(false);

        if (user) {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.id);
            if (error) console.error("Error clearing DB cart:", error);
        } else {
            localStorage.removeItem('cart');
        }
    };


    // Track removing items for animation
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);

    const removeFromCart = async (index: number) => {
        console.log("Removing item at index:", index);

        // Start remove animation
        setRemovingIndex(index);

        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));

        const itemToRemove = cart[index];

        // Auto-move to Wishlist (User Requirement)
        if (itemToRemove) {
            addToWishlist(itemToRemove);
        }

        // Optimistic UI update
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
        setRemovingIndex(null);

        if (user && itemToRemove?.cart_item_id) {
            // Remove from DB
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemToRemove.cart_item_id);

            if (error) {
                console.error("Error removing from cart:", error);
            } else {
                console.log("Removed from DB successfully");
            }
        } else if (!user) {
            // Update localStorage
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            currentCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    };

    // Explicit Delete (No Wishlist Move)
    const deleteFromCart = async (index: number) => {
        console.log("Permanently deleting item at index:", index);
        setRemovingIndex(index);

        await new Promise(resolve => setTimeout(resolve, 300));

        const itemToRemove = cart[index];
        setCart(prevCart => prevCart.filter((_, i) => i !== index));
        setRemovingIndex(null);

        if (user && itemToRemove?.cart_item_id) {
            const { error } = await supabase.from('cart_items').delete().eq('id', itemToRemove.cart_item_id);
            if (error) console.error("Error deleting from cart:", error);
        } else if (!user) {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            currentCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    };

    const getRemovingIndex = () => removingIndex;

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const [flyingImage, setFlyingImage] = useState<{
        src: string;
        currentX: number;
        currentY: number;
        currentWidth: number;
        currentHeight: number;
        targetX: number;
        targetY: number;
        isAnimating: boolean;
    } | null>(null);

    // Animation Logic
    const animateAddToCart = (sourceRect: DOMRect, imageSrc: string) => {
        console.log('Animation triggered!', { sourceRect, imageSrc });

        const targetElement = document.getElementById('cart-icon-container');
        if (!targetElement) {
            console.error('Cart icon container not found!');
            return;
        }

        const targetRect = targetElement.getBoundingClientRect();
        console.log('Cart icon position:', {
            left: targetRect.left,
            top: targetRect.top,
            width: targetRect.width,
            height: targetRect.height
        });

        // Calculate center of cart icon
        const targetCenterX = targetRect.left + (targetRect.width / 2);
        const targetCenterY = targetRect.top + (targetRect.height / 2);

        console.log('Target center:', { targetCenterX, targetCenterY });
        console.log('Source position:', {
            left: sourceRect.left,
            top: sourceRect.top,
            width: sourceRect.width,
            height: sourceRect.height
        });

        // Set initial state
        setFlyingImage({
            src: imageSrc,
            currentX: sourceRect.left,
            currentY: sourceRect.top,
            currentWidth: sourceRect.width,
            currentHeight: sourceRect.height,
            targetX: targetCenterX,
            targetY: targetCenterY,
            isAnimating: false,
        });

        // Start animation after a small delay (to ensure initial state is rendered)
        setTimeout(() => {
            setFlyingImage(prev => prev ? { ...prev, isAnimating: true } : null);
        }, 50);

        // Clear after animation completes
        setTimeout(() => {
            setFlyingImage(null);
        }, 600);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, deleteFromCart, clearCart, wishlist, addToWishlist, removeFromWishlist, moveToCart, isCartOpen, toggleCart, user, animateAddToCart, removingIndex, isClearing }}>
            {children}

            {/* Flying Image Animation */}
            {flyingImage && (
                <img
                    src={flyingImage.src}
                    alt="Flying product"
                    style={{
                        position: 'fixed',
                        left: flyingImage.isAnimating ? `${flyingImage.targetX}px` : `${flyingImage.currentX}px`,
                        top: flyingImage.isAnimating ? `${flyingImage.targetY}px` : `${flyingImage.currentY}px`,
                        width: flyingImage.isAnimating ? '30px' : `${flyingImage.currentWidth}px`,
                        height: flyingImage.isAnimating ? '30px' : `${flyingImage.currentHeight}px`,
                        transform: flyingImage.isAnimating ? 'translate(-50%, -50%) scale(0.2)' : 'translate(0, 0) scale(1)',
                        opacity: flyingImage.isAnimating ? 0.3 : 1,
                        zIndex: 10000,
                        pointerEvents: 'none',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                />
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
