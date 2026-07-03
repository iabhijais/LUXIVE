"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import { callGemini } from '../../../utils/gemini';
import StyleTipsModal from '../../../components/StyleTipsModal';
import type { Product } from '../../../types/product';

const CATEGORY_COPY: Record<string, { title: string; kicker: string; description: string }> = {
    sneakers: {
        title: 'Authentic Sneakers',
        kicker: 'Verified drop wall',
        description: 'Collector-worthy sneakers and premium daily pairs in a focused, easy-to-shop grid.',
    },
    luxury: {
        title: 'Luxury Shoes',
        kicker: 'Designer energy',
        description: 'Statement footwear and fashion-forward trainers curated for a boutique shopping feel.',
    },
    perfumes_her: {
        title: 'Perfumes for Her',
        kicker: 'Scent wardrobe',
        description: 'Elegant fragrances for gifting, daily wear and polished evening presence.',
    },
    perfumes_him: {
        title: 'Perfumes for Him',
        kicker: 'Signature trails',
        description: 'Bold, fresh and premium-inspired scents with AI styling support built in.',
    },
    watches_him: {
        title: 'Watches for Him',
        kicker: 'Wrist presence',
        description: 'Sport, chronograph and statement watches for clean outfit finishing.',
    },
    watches_her: {
        title: 'Watches for Her',
        kicker: 'Elegant details',
        description: 'Premium watches with refined silhouettes and gifting-friendly discovery.',
    },
    sweatshirts: {
        title: 'Premium Sweatshirts',
        kicker: 'Comfort edit',
        description: 'Elevated casualwear with a luxury storefront presentation.',
    },
};

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;

    const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [styleTips, setStyleTips] = useState("");
    const [loadingTips, setLoadingTips] = useState(false);

    const products = PRODUCTS.filter(p => p.category === category);
    const categoryCopy = CATEGORY_COPY[category] || {
        title: category.replace('_', ' ').toUpperCase(),
        kicker: 'LUXIVE edit',
        description: 'Explore our exclusive collection.',
    };

    const handleGetStyleTips = async (product: Product) => {
        setSelectedProduct(product);
        setStyleTipsModalOpen(true);
        setLoadingTips(true);

        const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
        const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

        const tips = await callGemini(prompt, systemPrompt);
        setStyleTips(tips);
        setLoadingTips(false);
    };

    return (
        <main className="min-h-screen bg-[#fbfbf8] px-4 py-12 md:px-8 md:py-20">
            <div className="mx-auto max-w-7xl">
                <Link href="/collections" className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-black/56 transition hover:text-black">
                    <ArrowLeft className="h-4 w-4" />
                    All collections
                </Link>

                <div className="mb-10 grid gap-6 rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(18,16,13,0.06)] md:grid-cols-[1fr_auto] md:items-end md:p-8">
                    <div className="max-w-3xl">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">{categoryCopy.kicker}</p>
                        <h1 className="text-4xl font-semibold tracking-[-0.055em] text-[#12100d] md:text-6xl">{categoryCopy.title}</h1>
                        <p className="mt-5 text-sm leading-6 text-black/58 md:text-base">{categoryCopy.description}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fbfbf8] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black/58">
                        <SlidersHorizontal className="h-4 w-4" />
                        {products.length} pieces
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="rounded-[8px] border border-black/10 bg-white py-20 text-center">
                        <p className="text-xl text-black/42">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 lg:gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
                        ))}
                    </div>
                )}
            </div>

            {selectedProduct && (
                <StyleTipsModal
                    product={selectedProduct}
                    isOpen={styleTipsModalOpen}
                    onClose={() => setStyleTipsModalOpen(false)}
                    tips={styleTips}
                    loading={loadingTips}
                />
            )}
        </main>
    );
}
