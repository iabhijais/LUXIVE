"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { callGemini } from '../../../utils/gemini';
import { Sparkles, ShoppingBag, Truck, ShieldCheck, ArrowRight, Heart, Share2 } from 'lucide-react';
import StyleTipsModal from '../../../components/StyleTipsModal';
import ProductCard from '../../../components/ProductCard';
import ProductGallery from '../../../components/ProductGallery';

export default function ProductPage() {
    const params = useParams();
    const id = Number(params.id);
    const product = PRODUCTS.find(p => p.id === id);

    const { addToCart, animateAddToCart, wishlist, addToWishlist, removeFromWishlist, isCartOpen, toggleCart } = useCart();
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

    const isInWishlist = wishlist.some(p => p.id === product.id);

    const toggleWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleGetStyleTips = async () => {
        setStyleTipsModalOpen(true);
        setLoadingTips(true);

        const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
        const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

        const tips = await callGemini(prompt, systemPrompt);
        setStyleTips(tips);
        setLoadingTips(false);
    };

    const handleAddToCart = async () => {
        // Validate Size for Sneakers/Shoes
        if ((product.category.toLowerCase() === 'sneakers' || product.category.toLowerCase() === 'shoes') && !selectedSize) {
            alert('Please select a size');
            return;
        }

        // Trigger Animation
        const imgElement = document.querySelector(`img[alt="${product.title}"]`);
        if (imgElement) {
            const rect = imgElement.getBoundingClientRect();
            animateAddToCart(rect, product.image);
        }

        await addToCart(product, selectedSize);
    };

    const handleBuyNow = async () => {
        if ((product.category.toLowerCase() === 'sneakers' || product.category.toLowerCase() === 'shoes') && !selectedSize) {
            alert('Please select a size');
            return;
        }
        await addToCart(product, selectedSize);
        if (!isCartOpen) toggleCart();
    };

    const handleShare = async () => {
        const shareData = {
            title: `Check out ${product.title} on LUXIVE`,
            text: `I found this amazing ${product.title} on LUXIVE!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    };


    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <ProductGallery images={product.gallery || [product.image]} title={product.title} />
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-6">
                            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category.replace('_', ' ')}</span>
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{product.title}</h1>
                                <button
                                    onClick={toggleWishlist}
                                    className={`p-3 rounded-full hover:bg-gray-50 transition-colors ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                    title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                >
                                    <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                                </button>
                            </div>
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
                                    className="flex-1 bg-white text-black border-2 border-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-center gap-2"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 hover:shadow-xl hover:bg-gray-900 transition-all duration-300 ease-out flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Buy Now
                                </button>

                                {/* Stylist Button */}
                                <div className="relative group">
                                    <button
                                        onClick={handleGetStyleTips}
                                        className="w-16 h-full flex items-center justify-center border border-indigo-200 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-lg"
                                    >
                                        <Sparkles className="w-6 h-6" />
                                    </button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        AI Stylist
                                    </span>
                                </div>

                                {/* Share Button */}
                                <div className="relative group">
                                    <button
                                        onClick={handleShare}
                                        className="w-16 h-full flex items-center justify-center border border-gray-200 rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-lg"
                                    >
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        Share
                                    </span>
                                </div>
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
        </div >
    );
}
