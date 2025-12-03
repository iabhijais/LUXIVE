"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import { callGemini } from '../../../utils/gemini';
import StyleTipsModal from '../../../components/StyleTipsModal';

export default function CategoryPage() {
    const params = useParams();
    const category = params.category as string;

    const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [styleTips, setStyleTips] = useState("");
    const [loadingTips, setLoadingTips] = useState(false);

    const products = PRODUCTS.filter(p => p.category === category);

    const handleGetStyleTips = async (product: any) => {
        setSelectedProduct(product);
        setStyleTipsModalOpen(true);
        setLoadingTips(true);

        const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
        const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

        const tips = await callGemini(prompt, systemPrompt);
        setStyleTips(tips);
        setLoadingTips(false);
    };

    const getCategoryTitle = (cat: string) => {
        switch (cat) {
            case 'sneakers': return 'AUTHENTIC SNEAKERS';
            case 'luxury': return 'LUXURY FASHION';
            case 'perfumes_her': return 'PERFUMES FOR HER';
            case 'perfumes_him': return 'PERFUMES FOR HIM';
            default: return cat.replace('_', ' ').toUpperCase();
        }
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">{getCategoryTitle(category)}</h1>
                <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                    Explore our exclusive collection.
                </p>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-400">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
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
        </div>
    );
}
