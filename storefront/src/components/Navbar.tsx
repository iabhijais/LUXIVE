"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cart, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <button
                    className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                    <X className={`w-6 h-6 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
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
                    <User className="w-5 h-5 cursor-pointer hover:text-gray-600 hidden md:block" />
                    <div className="relative cursor-pointer" onClick={toggleCart}>
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
                </div>
            )}
        </nav>
    );
};

export default Navbar;
