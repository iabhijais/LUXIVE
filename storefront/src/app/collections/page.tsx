"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/products';

const COLLECTION_IMAGES: Record<string, string> = {
    sneakers: '/lv-runner-tatic.png',
    luxury: '/lv-beverly-hills.png',
    perfumes_her: '/luxury-perfume-banner.png',
    perfumes_him: '/creed-aventus.png',
    watches_him: '/PREMIUM WATCHES MEN/Tag_Heuer Aquaracer GMT Automatic AAA 42000 X 6499/682850dbe2b7c2.jpeg',
    watches_her: '/PREMIUM WATCHES WOMEN/Role_x Oyester Perpetual Date Just Copper-Green 13000 X 4999/69303df056b3b1.jpg',
    sweatshirts: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=86&w=1200',
};

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-[#fbfbf8] px-4 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 max-w-3xl">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">LUXIVE catalog</p>
                    <h1 className="text-4xl font-semibold tracking-[-0.055em] text-[#12100d] md:text-6xl">Collections built like boutique rooms.</h1>
                    <p className="mt-5 text-sm leading-6 text-black/58 md:text-base">
                        Explore curated departments for sneakers, luxury shoes, watches and fragrances with a cleaner premium browsing experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    {COLLECTIONS.map((collection, index) => (
                        <Link
                            key={collection.id}
                            href={collection.link}
                            className={`group relative min-h-[330px] overflow-hidden rounded-[8px] bg-[#12100d] text-white shadow-[0_24px_64px_rgba(18,16,13,0.12)] ${index === 0 ? 'md:min-h-[440px]' : ''}`}
                        >
                            <img
                                src={COLLECTION_IMAGES[collection.id] || '/lv-beverly-hills.png'}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-[0.84] transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,13,0.08)_0%,rgba(18,16,13,0.36)_46%,rgba(18,16,13,0.9)_100%)]" />

                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#d4b45f]">{collection.subtitle}</span>
                                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{collection.title}</h2>
                                <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/18 px-5 text-xs font-bold uppercase tracking-[0.18em] transition group-hover:bg-white group-hover:text-[#12100d]">
                                    Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
