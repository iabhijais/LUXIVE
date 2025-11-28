"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/products';

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">OUR COLLECTIONS</h1>
                <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                    Explore our curated selection of premium sneakers, luxury fashion, and exquisite fragrances.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {COLLECTIONS.map((collection) => (
                        <Link key={collection.id} href={collection.link} className="group relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100 block">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 z-10" />

                            {/* Placeholder background - in a real app, you'd have collection images */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />

                            <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 p-6 text-center">
                                <span className="text-sm font-medium tracking-widest mb-2 opacity-80">{collection.subtitle}</span>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{collection.title}</h2>
                                <span className="inline-flex items-center text-sm font-semibold bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
