"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart, toggleCart, user } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
    }, [cart.length]);

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

                <Link href="/" className="flex items-center cursor-pointer gap-2 md:gap-3">
                    <img src="/luxive-brand-logo.svg" alt="LUXIVE Logo" className="h-10 md:h-16 w-auto object-contain" />
                    <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-gray-900">LUXIVE</span>
                </Link>

                <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest text-gray-800">
                    <Link href="/" className="hover:text-black hover:underline underline-offset-4 transition">HOME</Link>
                    <Link href="/collections" className="hover:text-black hover:underline underline-offset-4 transition">COLLECTIONS</Link>
                    <Link href="/shop/sneakers" className="hover:text-black hover:underline underline-offset-4 transition">SNEAKERS</Link>
                    <Link href="/contact" className="hover:text-black hover:underline underline-offset-4 transition">CONTACT</Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6">
                    <Search className="w-5 h-5 cursor-pointer hover:text-gray-600" />

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
                                                    console.log('Signing out...');
                                                    const { error } = await supabase.auth.signOut();
                                                    if (error) {
                                                        console.error('Sign out error:', error);
                                                    }
                                                    console.log('Signed out successfully');
                                                    localStorage.removeItem('cart');
                                                    setIsUserMenuOpen(false);
                                                    window.location.href = '/login';
                                                } catch (error) {
                                                    console.error('Sign out error:', error);
                                                    window.location.href = '/login';
                                                }
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <User
                                className="w-5 h-5 cursor-pointer hover:text-gray-600"
                                onClick={handleUserClick}
                            />
                        )}
                    </div>

                    <div
                        id="cart-icon-container"
                        className={`relative cursor-pointer ${cartBounce ? 'animate-bounce-once' : ''}`}
                        onClick={toggleCart}
                    >
                        <ShoppingBag className="w-5 h-5 hover:text-gray-600" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-4 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-2">
                    <Link href="/" className="text-sm font-bold tracking-widest">HOME</Link>
                    <Link href="/collections" className="text-sm font-bold tracking-widest">COLLECTIONS</Link>
                    <Link href="/shop/sneakers" className="text-sm font-bold tracking-widest">SNEAKERS</Link>
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
            )}
        </nav>
    );
};

export default Navbar;
