"use client";

import React from 'react';
import { X, ShoppingBag, Heart, Trash2, Minus, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const CartDrawer = () => {
    const { cart, removeFromCart, deleteFromCart, updateQuantity, clearCart, wishlist, moveToCart, removeFromWishlist, addToWishlist, isCartOpen, toggleCart, removingIndex, isClearing } = useCart();
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        // REPLACE WITH YOUR WHATSAPP NUMBER (International format without +)
        const SELLER_PHONE = "918149409265";

        let message = `*NEW ORDER REQUEST*\n\n`;
        message += `Hello, I would like to place an order:\n\n`;

        cart.forEach((item, i) => {
            message += `${i + 1}. *${item.title}*\n`;
            if (item.size) message += `   • Size: ${item.size}\n`;
            message += `   • Qty: ${item.quantity}\n`;
            message += `   • Price: Rs. ${item.price.toLocaleString()}\n`;
            // Use window.location.origin to get the current domain
            const productUrl = `${window.location.origin}/product/${item.id}`;
            message += `   • Link: ${productUrl}\n\n`;
        });

        message += `--------------------------------\n`;
        message += `*TOTAL AMOUNT: Rs. ${total.toLocaleString()}*\n`;
        message += `--------------------------------\n\n`;
        message += `Please confirm availability & shipping calculation.`;

        const url = `https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            />
            <div className={`fixed top-0 right-0 h-full w-[85vw] md:w-[400px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold uppercase tracking-widest">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                        {cart.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wide group ml-4"
                            >
                                <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                Clear All
                            </button>
                        )}
                    </div>
                    <button onClick={toggleCart}><X className="w-6 h-6 hover:rotate-90 transition-transform" /></button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Cart Items */}
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your cart is currently empty.</p>
                            <button
                                onClick={toggleCart}
                                className="mt-6 bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className={`space-y-4 transition-all duration-500 ease-in-out ${isClearing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                            {cart.map((item, idx) => (
                                <div
                                    key={`${item.id}-${idx}`}
                                    className={`flex gap-4 border-b border-gray-100 pb-4 transition-all duration-300 ${removingIndex === idx
                                        ? 'opacity-0 translate-x-full scale-95'
                                        : 'opacity-100 translate-x-0 scale-100'
                                        }`}
                                >
                                    <Link href={`/product/${item.id}`} onClick={toggleCart} className="flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover bg-gray-50 rounded hover:opacity-80 transition-opacity" />
                                    </Link>
                                    <div className="flex-1">
                                        <Link href={`/product/${item.id}`} onClick={toggleCart}>
                                            <h3 className="text-sm font-medium line-clamp-2 mb-1 hover:underline cursor-pointer">{item.title}</h3>
                                        </Link>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-gray-500 text-xs text-left">
                                                {item.category}{item.size ? ` • Size: ${item.size}` : ''}
                                            </p>
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => updateQuantity(idx, -1)}
                                                    className="px-2 py-0.5 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(idx, 1)}
                                                    className="px-2 py-0.5 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => deleteFromCart(idx)}
                                                    disabled={removingIndex !== null}
                                                    className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors tracking-wider hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                                <div className="h-3 w-px bg-gray-300"></div>
                                                <button
                                                    onClick={() => removeFromCart(idx)}
                                                    disabled={removingIndex !== null}
                                                    className="text-[10px] uppercase font-bold text-gray-500 hover:text-black transition-colors tracking-wider hover:underline"
                                                >
                                                    SAVE FOR LATER
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Saved for Later Section */}
                    {wishlist.length > 0 && (
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-gray-800">
                                SAVED FOR LATER ({wishlist.length})
                            </h3>
                            <div className="space-y-4">
                                {wishlist.map((item) => (
                                    <div key={item.id} className="flex gap-4 opacity-75 hover:opacity-100 transition-opacity">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover bg-gray-50 rounded grayscale hover:grayscale-0 transition-all" />
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                                            <p className="text-xs text-gray-500 mb-1">Rs. {item.price.toLocaleString()}</p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => moveToCart(item)}
                                                    className="text-[10px] uppercase font-bold text-gray-500 hover:text-black transition-colors tracking-wider hover:underline"
                                                >
                                                    MOVE TO CART
                                                </button>
                                                <div className="h-3 w-px bg-gray-300"></div>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors tracking-wider hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer (Total & Checkout) */}
                {cart.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4 text-sm">
                            <span className="font-bold">TOTAL</span>
                            <span className="font-bold">Rs. {total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-600 text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5" /> Checkout via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
