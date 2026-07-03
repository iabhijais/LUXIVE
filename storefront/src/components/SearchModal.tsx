"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Search as SearchIcon, Clock, Trash2, Flame, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import Link from 'next/link';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];

        try {
            const saved = localStorage.getItem('recentSearches');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const results = useMemo(() => {
        if (query.trim() === "") {
            return [];
        }

        const normalizedQuery = query.toLowerCase();
        return PRODUCTS.filter(product =>
            product.title.toLowerCase().includes(normalizedQuery) ||
            product.category.toLowerCase().includes(normalizedQuery)
        ).slice(0, 6); // Limit to 6 results
    }, [query]);

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const addToRecentSearches = (searchTerm: string) => {
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const handleResultClick = (productTitle: string) => {
        addToRecentSearches(productTitle);
        onClose();
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            addToRecentSearches(query.trim());
        }
    };

    if (!isOpen) return null;

    // Filter for Hot Deals and New Arrivals
    const hotDeals = PRODUCTS.filter(p => p.badge === 'Sale' || p.badge === 'Hot').slice(0, 4);
    const newArrivals = PRODUCTS.filter(p => p.badge === 'New').slice(0, 4);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#fbfbf8] animate-in fade-in duration-200">
            {/* Header / Search Bar */}
            <div className="safe-top border-b border-black/10 bg-white/[0.86] px-4 pb-4 pt-5 md:px-8">
                <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-end mb-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
                        aria-label="Close search"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="relative max-w-3xl mx-auto w-full">
                    <form onSubmit={handleSearchSubmit}>
                        <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for products, brands and more"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full border-none bg-transparent py-3 pl-10 text-2xl font-semibold tracking-[-0.03em] text-[#12100d] transition-colors placeholder:text-black/28 focus:outline-none md:text-3xl"
                        />
                    </form>
                </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 md:px-8 pt-8 pb-20 max-w-7xl">

                    {/* Empty Query State */}
                    {query.trim() === "" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Column: Recent Searches */}
                            <div className="lg:col-span-4 space-y-8">
                                {recentSearches.length > 0 && (
                                    <div className="rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(18,16,13,0.06)]">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Searches</h3>
                                            <button
                                                onClick={clearRecentSearches}
                                                className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" /> Clear
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {recentSearches.map((term, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setQuery(term)}
                                                className="group flex w-full items-center gap-3 rounded-[8px] p-3 text-left transition-colors hover:bg-[#fbfbf8]"
                                                >
                                                    <Clock className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                                    <span className="text-gray-600 group-hover:text-black font-medium">{term}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Trending Searches (Static for now) */}
                                <div className="rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(18,16,13,0.06)]">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Trending Now</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Sneakers', 'Luxury Watches', 'Perfumes', 'Jordan', 'Nike'].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setQuery(tag)}
                                                className="rounded-full border border-black/10 bg-[#fbfbf8] px-3 py-1.5 text-sm font-semibold transition-all hover:bg-[#12100d] hover:text-white"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Discover */}
                            <div className="lg:col-span-8 space-y-10">
                                {/* Hot Deals */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Flame className="w-5 h-5 text-orange-500" />
                                        <h3 className="text-lg font-bold">Hot Deals</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {hotDeals.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={() => handleResultClick(product.title)}
                                                className="group rounded-[8px] border border-black/10 bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(18,16,13,0.1)]"
                                            >
                                                <div className="mb-3 aspect-square overflow-hidden rounded-[8px] bg-[#fbfbf8]">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                                <h4 className="font-bold text-sm truncate">{product.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1">Rs. {product.price.toLocaleString()}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* New Arrivals */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <Sparkles className="w-5 h-5 text-[#9d7b32]" />
                                        <h3 className="text-lg font-bold">New Arrivals</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {newArrivals.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={() => handleResultClick(product.title)}
                                                className="group rounded-[8px] border border-black/10 bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(18,16,13,0.1)]"
                                            >
                                                <div className="mb-3 aspect-square overflow-hidden rounded-[8px] bg-[#fbfbf8]">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                </div>
                                                <h4 className="font-bold text-sm truncate">{product.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1">Rs. {product.price.toLocaleString()}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Search Results */}
                    {query.trim() !== "" && (
                        <div className="max-w-6xl mx-auto">
                            {results.length === 0 ? (
                                <div className="text-center py-20 text-gray-400">
                                    <p className="text-xl">No results found for &quot;{query}&quot;</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 mt-4">
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            onClick={() => handleResultClick(product.title)}
                                            className="group cursor-pointer block"
                                        >
                                            <div className="mb-4 aspect-square overflow-hidden rounded-[8px] bg-[#fbfbf8]">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="mb-1 text-xs text-gray-500 uppercase tracking-widest">{product.category.replace('_', ' ')}</div>
                                            <h3 className="text-sm font-bold line-clamp-1 mb-2 group-hover:underline underline-offset-4">{product.title}</h3>
                                            <p className="text-sm">Rs. {product.price.toLocaleString()}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
