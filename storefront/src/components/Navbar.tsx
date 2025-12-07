"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

const Navbar = () => {
    const { cart, toggleCart, user, wishlist } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartBounce, setCartBounce] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Watch for cart changes and trigger bounce
    useEffect(() => {
        if (cart.length > 0) {
            setCartBounce(true);
            const timer = setTimeout(() => setCartBounce(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cart.reduce((acc, item) => acc + item.quantity, 0)]);

    const handleUserClick = () => {
        if (user) {
            setIsUserMenuOpen(!isUserMenuOpen);
        } else {
            router.push('/login');
        }
    };

    return (
        <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <button
                    className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50 group"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                <Link href="/" className="flex items-center cursor-pointer">
                    <img src="/luxive-text-black.png" alt="LUXIVE" className="h-24 md:h-56 w-auto object-contain -my-11 md:-my-20 -ml-3 md:-ml-6" />
                </Link>

                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest text-gray-800">
                    <Link href="/" className="hover:text-black hover:underline underline-offset-4 transition">HOME</Link>
                    <Link href="/collections" className="hover:text-black hover:underline underline-offset-4 transition">COLLECTIONS</Link>
                    <Link href="/shop/sneakers" className="hover:text-black hover:underline underline-offset-4 transition">SNEAKERS</Link>
                    <Link href="/contact" className="hover:text-black hover:underline underline-offset-4 transition">CONTACT</Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="relative group cursor-pointer" onClick={() => setIsSearchOpen(true)}>
                        <Search className="w-5 h-5 text-gray-600 transition-all duration-200 group-hover:scale-110 group-hover:text-black" />
                        <span className="absolute top-full pt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded whitespace-nowrap">Search</span>
                        </span>
                    </div>

                    <div className="relative group cursor-pointer hidden md:block" onClick={toggleCart}>
                        <Heart className="w-5 h-5 text-gray-600 transition-all duration-200 group-hover:scale-110 group-hover:text-red-500" />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {wishlist.length}
                            </span>
                        )}
                        <span className="absolute top-full pt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded whitespace-nowrap">Wishlist</span>
                        </span>
                    </div>

                    <div className="relative hidden md:block">
                        {user ? (
                            <div className="relative group">
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={handleUserClick}
                                >
                                    {user.user_metadata?.avatar_url ? (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-md py-1 border border-gray-100 z-[9999]">
                                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 truncate">
                                            {user.user_metadata?.full_name || user.email}
                                        </div>
                                        <Link
                                            href="/profile"
                                            onClick={() => setIsUserMenuOpen(false)}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log('Sign out clicked!');
                                                try {
                                                    const { createClient } = await import('@/utils/supabase/client');
                                                    const supabase = createClient();
                                                    console.log('Signing out with global scope...');
                                                    await supabase.auth.signOut({ scope: 'global' });
                                                    console.log('Signed out successfully');
                                                    localStorage.removeItem('cart');
                                                    setIsUserMenuOpen(false);
                                                } catch (error) {
                                                    console.error('Sign out error:', error);
                                                } finally {
                                                    window.location.href = '/login';
                                                }
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                                <span className="absolute top-full pt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded whitespace-nowrap">Account</span>
                                </span>
                            </div>
                        ) : (
                            <div className="relative group cursor-pointer" onClick={handleUserClick}>
                                <User className="w-5 h-5 text-gray-600 transition-all duration-200 group-hover:scale-110 group-hover:text-black" />
                                <span className="absolute top-full pt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded whitespace-nowrap">Login</span>
                                </span>
                            </div>
                        )}
                    </div>

                    <div
                        id="cart-icon-container"
                        className={`relative group cursor-pointer ${cartBounce ? 'animate-bounce-once' : ''}`}
                        onClick={toggleCart}
                    >
                        <ShoppingBag className="w-5 h-5 hover:text-black transition-transform duration-200 group-hover:scale-110 text-gray-600" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                        <span className="absolute top-full pt-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded whitespace-nowrap">Cart</span>
                        </span>
                    </div>
                </div>
            </div>

            {
                isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-2">
                        <Link href="/" className="text-sm font-bold tracking-widest">HOME</Link>
                        <Link href="/collections" className="text-sm font-bold tracking-widest">COLLECTIONS</Link>
                        <Link href="/shop/sneakers" className="text-sm font-bold tracking-widest">SNEAKERS</Link>
                        <button onClick={toggleCart} className="text-sm font-bold tracking-widest text-left">WISHLIST ({wishlist.length})</button>
                        <Link href="/contact" className="text-sm font-bold tracking-widest">CONTACT</Link>
                        {!user && (
                            <Link href="/login" className="text-sm font-bold tracking-widest text-gray-600">LOGIN</Link>
                        )}
                        {user && (
                            <button onClick={async () => {
                                try {
                                    const { createClient } = await import('@/utils/supabase/client');
                                    const supabase = createClient();
                                    await supabase.auth.signOut();
                                    localStorage.removeItem('cart');
                                    window.location.href = '/login';
                                } catch (error) {
                                    console.error('Sign out error:', error);
                                    window.location.href = '/login';
                                }
                            }} className="text-sm font-bold tracking-widest text-left text-red-600">SIGN OUT</button>
                        )}
                    </div>
                )
            }

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;
