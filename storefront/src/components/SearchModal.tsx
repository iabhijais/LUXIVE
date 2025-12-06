"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon, ArrowRight, Clock, Trash2, Flame, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import Link from 'next/link';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<typeof PRODUCTS>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initial focus and load recent searches
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
            const saved = localStorage.getItem('recentSearches');
            if (saved) {
                setRecentSearches(JSON.parse(saved));
            }
        }
    }, [isOpen]);

    // Search Logic
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = PRODUCTS.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6); // Limit to 6 results

        setResults(filtered);
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
        <div className="fixed inset-0 z-[100] bg-white/98 flex flex-col animate-in fade-in duration-200">
            {/* Header / Search Bar */}
            <div className="container mx-auto px-4 md:px-8 pt-6 pb-4 border-b border-gray-50">
                <div className="flex items-center justify-end mb-6">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-black" />
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
                            className="w-full text-2xl md:text-3xl font-medium bg-transparent border-none py-3 pl-10 focus:outline-none placeholder:text-gray-300 transition-colors"
                        />
                    </form>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50/30">
                <div className="container mx-auto px-4 md:px-8 pt-8 pb-20 max-w-7xl">

                    {/* Empty Query State */}
                    {query.trim() === "" && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Left Column: Recent Searches */}
                            <div className="lg:col-span-4 space-y-8">
                                {recentSearches.length > 0 && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group text-left"
                                                >
                                                    <Clock className="w-4 h-4 text-gray-300 group-hover:text-black transition-colors" />
                                                    <span className="text-gray-600 group-hover:text-black font-medium">{term}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Trending Searches (Static for now) */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Trending Now</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Sneakers', 'Luxury Watches', 'Perfumes', 'Jordan', 'Nike'].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setQuery(tag)}
                                                className="px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white border border-gray-100 rounded-full text-sm font-medium transition-all"
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
                                                className="group bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                                            >
                                                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
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
                                        <Sparkles className="w-5 h-5 text-purple-500" />
                                        <h3 className="text-lg font-bold">New Arrivals</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {newArrivals.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.id}`}
                                                onClick={() => handleResultClick(product.title)}
                                                className="group bg-white p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                                            >
                                                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
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
                                    <p className="text-xl">No results found for "{query}"</p>
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
                                            <div className="aspect-square bg-gray-50 mb-4 overflow-hidden rounded-xl">
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
