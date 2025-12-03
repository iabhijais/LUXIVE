"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { callGemini } from '../../../utils/gemini';
import { Sparkles, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import StyleTipsModal from '../../../components/StyleTipsModal';
import ProductCard from '../../../components/ProductCard';

export default function ProductPage() {
    const params = useParams();
    const id = Number(params.id);
    const product = PRODUCTS.find(p => p.id === id);

    const { addToCart, animateAddToCart } = useCart();
    const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
    const [styleTips, setStyleTips] = useState("");
    const [loadingTips, setLoadingTips] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-500">Product not found.</p>
            </div>
        );
    }

    const handleGetStyleTips = async () => {
        setStyleTipsModalOpen(true);
        setLoadingTips(true);

        const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
        const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

        const tips = await callGemini(prompt, systemPrompt);
        setStyleTips(tips);
        setLoadingTips(false);
    };

    const handleAddToCart = () => {
        addToCart(product, selectedSize);

        // Trigger Animation
        // Find the main product image
        const imgElement = document.querySelector(`img[alt="${product.title}"]`);
        if (imgElement) {
            const rect = imgElement.getBoundingClientRect();
            animateAddToCart(rect, product.image);
        }
    };

    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        {/* Thumbnails would go here */}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category.replace('_', ' ')}</span>
                            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{product.title}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold">Rs. {product.price.toLocaleString()}</span>
                                <span className="text-lg text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                                <span className="text-green-600 font-bold">
                                    ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                                </span>
                                {product.badge && (
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                                        {product.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 border-t border-gray-100 pt-6">
                            <p className="text-gray-600 leading-relaxed">
                                Elevate your style with the {product.title}. Crafted with premium materials and designed for the modern trendsetter.
                                100% Authentic and verified by our experts.
                            </p>

                            {/* Size Selector (Mock) - Only for shoes */}
                            {(product.category === 'sneakers' || product.category === 'luxury') && (
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Select Size</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-3 md:py-2 border rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-200 hover:border-black'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                                </button>
                                <button
                                    onClick={handleGetStyleTips}
                                    className="flex-1 bg-indigo-50 text-indigo-700 border border-indigo-200 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-100 transition flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-5 h-5" /> AI Style Tips
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Truck className="w-5 h-5" /> Free Shipping
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <ShieldCheck className="w-5 h-5" /> 100% Authentic
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-100 pt-16">
                        <h2 className="text-2xl font-bold mb-8 tracking-tight">YOU MIGHT ALSO LIKE</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <StyleTipsModal
                product={product}
                isOpen={styleTipsModalOpen}
                onClose={() => setStyleTipsModalOpen(false)}
                tips={styleTips}
                loading={loadingTips}
            />
        </div>
    );
}
