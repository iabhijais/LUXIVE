"use client";

import React, { useEffect, useState } from 'react';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Sneakers', href: '/shop/sneakers' },
    { label: 'Watches', href: '/shop/watches_him' },
    { label: 'Perfumes', href: '/shop/perfumes_him' },
    { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const { cart, toggleCart, user, wishlist } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartBounce, setCartBounce] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [themeReady, setThemeReady] = useState(false);
    const router = useRouter();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            setCartBounce(true);
            const timer = setTimeout(() => setCartBounce(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cart.length, cartItemCount]);

    useEffect(() => {
        const root = document.documentElement;
        const storedTheme = localStorage.getItem('luxive-theme');
        const initialTheme = root.dataset.theme === 'dark' || root.dataset.theme === 'light'
            ? root.dataset.theme
            : storedTheme === 'dark' || storedTheme === 'light'
                ? storedTheme
                : window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';

        setTheme(initialTheme);
        setThemeReady(true);
    }, []);

    const applyTheme = (nextTheme: 'light' | 'dark') => {
        const root = document.documentElement;
        root.dataset.theme = nextTheme;
        root.classList.toggle('dark', nextTheme === 'dark');
        localStorage.setItem('luxive-theme', nextTheme);
        setTheme(nextTheme);
    };

    const toggleTheme = () => {
        applyTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleUserClick = () => {
        if (user) {
            setIsUserMenuOpen(!isUserMenuOpen);
            return;
        }

        router.push('/login');
    };

    const handleSignOut = async () => {
        try {
            const { createClient } = await import('@/utils/supabase/client');
            const supabase = createClient();
            await supabase.auth.signOut({ scope: 'global' });
            localStorage.removeItem('cart');
            setIsUserMenuOpen(false);
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            window.location.href = '/login';
        }
    };

    const openCart = () => {
        setIsMenuOpen(false);
        toggleCart();
    };

    return (
        <nav className={`sticky top-0 z-[90] w-full border-b transition-all duration-300 ${isScrolled ? 'premium-glass shadow-[0_16px_45px_rgba(18,16,13,0.08)]' : 'border-transparent bg-[#fbfbf8]/96'}`}>
            <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 md:min-h-[76px] md:px-8">
                <button
                    type="button"
                    className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/75 text-black transition hover:border-black/25 hover:bg-white xl:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                <Link href="/" className="group flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                    <span className="relative h-10 w-32 overflow-hidden md:h-11 md:w-36" aria-hidden="true">
                        <img
                            src="/luxive-text-black.png"
                            alt=""
                            className="luxive-logo-img absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-[52%] object-contain md:h-36 md:w-36"
                        />
                    </span>
                    <span className="hidden border-l border-black/10 pl-3 text-[10px] font-semibold uppercase leading-4 tracking-[0.26em] text-black/55 xl:block">
                        Curated<br />Luxury
                    </span>
                    <span className="sr-only">LUXIVE home</span>
                </Link>

                <div className="hidden items-center rounded-full border border-black/10 bg-white/70 px-2 py-1 shadow-[0_8px_30px_rgba(18,16,13,0.04)] xl:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/62 transition hover:bg-black hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <button
                        type="button"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/75 text-black transition hover:border-black/25 hover:bg-white"
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Open search"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="group relative inline-flex h-11 w-14 items-center rounded-full border border-black/10 bg-white/75 px-1 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition hover:border-black/25 hover:bg-white sm:w-16"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        aria-pressed={theme === 'dark'}
                    >
                        <Sun className="absolute left-2 h-3.5 w-3.5 text-black/35 transition group-hover:text-black/55" />
                        <Moon className="absolute right-2 h-3.5 w-3.5 text-black/35 transition group-hover:text-black/55" />
                        <span className={`absolute left-1 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#12100d] text-white shadow-[0_8px_20px_rgba(18,16,13,0.22)] transition-all duration-300 ease-out ${theme === 'dark' ? 'theme-switch-thumb-dark translate-x-3 sm:translate-x-5' : 'translate-x-0'}`}>
                            {themeReady && theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </span>
                    </button>

                    <button
                        type="button"
                        className="relative hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/75 text-black transition hover:border-black/25 hover:bg-white md:inline-flex"
                        onClick={openCart}
                        aria-label="Open saved items"
                    >
                        <Heart className="h-5 w-5" />
                        {wishlist.length > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#12100d] px-1 text-[10px] font-bold text-white">
                                {wishlist.length}
                            </span>
                        )}
                    </button>

                    <div className="relative hidden md:block">
                        <button
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/75 text-black transition hover:border-black/25 hover:bg-white"
                            onClick={handleUserClick}
                            aria-label={user ? 'Open account menu' : 'Login'}
                        >
                            {user?.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </button>

                        {user && isUserMenuOpen && (
                            <div className="premium-panel absolute right-0 top-full z-[9999] mt-3 w-56 rounded-lg py-2">
                                <div className="border-b border-black/10 px-4 pb-3 pt-2 text-xs text-black/55">
                                    <p className="truncate font-semibold text-black">{user.user_metadata?.full_name || user.email}</p>
                                    <p className="mt-1 truncate">{user.email}</p>
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-black/70 transition hover:bg-black/[0.04] hover:text-black"
                                >
                                    View Profile
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="block w-full px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        id="cart-icon-container"
                        type="button"
                        className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#12100d] text-white shadow-[0_12px_34px_rgba(18,16,13,0.22)] transition hover:-translate-y-0.5 ${cartBounce ? 'animate-bounce-once' : ''}`}
                        onClick={openCart}
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cart.length > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9d7b32] px-1 text-[10px] font-bold text-white">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="premium-glass absolute left-0 top-full w-full border-t border-black/10 px-4 pb-6 pt-4 shadow-[0_24px_60px_rgba(18,16,13,0.12)] xl:hidden">
                    <div className="space-y-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-12 items-center justify-between border-b border-black/10 text-sm font-semibold uppercase tracking-[0.18em] text-black"
                            >
                                {link.label}
                                <span className="text-black/35">View</span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={openCart}
                            className="min-h-12 rounded-lg border border-black/10 bg-white text-xs font-bold uppercase tracking-[0.18em] text-black"
                        >
                            Saved ({wishlist.length})
                        </button>
                        {user ? (
                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="min-h-12 rounded-lg bg-[#12100d] text-xs font-bold uppercase tracking-[0.18em] text-white"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-12 items-center justify-center rounded-lg bg-[#12100d] text-xs font-bold uppercase tracking-[0.18em] text-white"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;
