"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Heart, Share2, ShieldCheck, ShoppingBag, Sparkles, Truck } from 'lucide-react';
import { PRODUCTS } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { callGemini } from '../../../utils/gemini';
import StyleTipsModal from '../../../components/StyleTipsModal';
import ProductCard from '../../../components/ProductCard';
import ProductGallery from '../../../components/ProductGallery';

const SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

export default function ProductPage() {
    const params = useParams();
    const id = Number(params.id);
    const product = PRODUCTS.find(p => p.id === id);

    const { addToCart, animateAddToCart, wishlist, addToWishlist, removeFromWishlist, isCartOpen, toggleCart } = useCart();
    const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
    const [styleTips, setStyleTips] = useState("");
    const [loadingTips, setLoadingTips] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [shareStatus, setShareStatus] = useState("");
    const needsSize = product ? ['sneakers', 'luxury', 'shoes'].includes(product.category.toLowerCase()) : false;

    if (!product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#fbfbf8] px-4">
                <div className="rounded-[8px] border border-black/10 bg-white p-8 text-center shadow-[0_20px_60px_rgba(18,16,13,0.08)]">
                    <p className="text-xl font-semibold text-[#12100d]">Product not found.</p>
                    <Link href="/collections" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#12100d] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                        Back to collections
                    </Link>
                </div>
            </main>
        );
    }

    const isInWishlist = wishlist.some(p => p.id === product.id);
    const discount = Math.max(0, Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100));

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

    const validateSize = () => {
        if (needsSize && !selectedSize) {
            setSizeError('Select a size to continue.');
            return false;
        }

        setSizeError('');
        return true;
    };

    const animateFromGallery = () => {
        const imgElement = document.querySelector('.product-main-media img');

        if (imgElement) {
            const rect = imgElement.getBoundingClientRect();
            animateAddToCart(rect, product.image);
        }
    };

    const handleAddToCart = async () => {
        if (!validateSize()) return;
        animateFromGallery();
        await addToCart(product, selectedSize);
    };

    const handleBuyNow = async () => {
        if (!validateSize()) return;
        animateFromGallery();
        await addToCart(product, selectedSize);
        if (!isCartOpen) toggleCart();
    };

    const handleShare = async () => {
        const shareData = {
            title: `Check out ${product.title} on LUXIVE`,
            text: `I found this ${product.title} on LUXIVE.`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                setShareStatus('Shared');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShareStatus('Link copied');
            } catch (err) {
                console.error('Failed to copy link:', err);
                setShareStatus('Copy failed');
            }
        }

        window.setTimeout(() => setShareStatus(''), 1800);
    };

    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main className="min-h-screen bg-[#fbfbf8] px-4 py-12 md:px-8 md:py-20">
            <div className="mx-auto max-w-7xl">
                <Link href={`/shop/${product.category}`} className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-black/56 transition hover:text-black">
                    <ArrowLeft className="h-4 w-4" />
                    Back to collection
                </Link>

                <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
                    <div className="product-main-media">
                        <ProductGallery images={product.gallery || [product.image]} title={product.title} />
                    </div>

                    <div className="md:sticky md:top-28 md:self-start">
                        <div className="rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(18,16,13,0.08)] md:p-8">
                            <div className="mb-6">
                                <div className="mb-4 flex items-center justify-between gap-4">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#9d7b32]">{product.category.replace('_', ' ')}</span>
                                    {product.badge && (
                                        <span className="rounded-full bg-[#12100d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                            {product.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-start justify-between gap-4">
                                    <h1 className="text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#12100d] md:text-5xl">{product.title}</h1>
                                    <button
                                        type="button"
                                        onClick={toggleWishlist}
                                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 transition ${isInWishlist ? 'bg-red-50 text-red-500' : 'bg-[#fbfbf8] text-black/46 hover:text-red-500'}`}
                                        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                    >
                                        <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <span className="text-3xl font-bold tracking-[-0.04em] text-[#12100d]">Rs. {product.price.toLocaleString()}</span>
                                    <span className="text-base font-medium text-black/36 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                                    {discount > 0 && (
                                        <span className="rounded-full bg-[#f4efe4] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#5b471d]">
                                            {discount}% off
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-7 border-t border-black/10 pt-6">
                                <p className="text-sm leading-7 text-black/62">
                                    Elevate your style with the {product.title}. Curated for premium presentation, daily confidence and LUXIVE&apos;s assisted shopping experience.
                                </p>

                                {needsSize && (
                                    <div>
                                        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#12100d]">Select Size</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {SIZES.map(size => (
                                                <button
                                                    type="button"
                                                    key={size}
                                                    onClick={() => {
                                                        setSelectedSize(size);
                                                        setSizeError('');
                                                    }}
                                                    className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-all ${selectedSize === size
                                                        ? 'border-[#12100d] bg-[#12100d] text-white'
                                                        : 'border-black/10 bg-[#fbfbf8] text-[#12100d] hover:border-[#12100d]'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                        {sizeError && <p className="mt-3 text-sm font-semibold text-red-600">{sizeError}</p>}
                                    </div>
                                )}

                                <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
                                    <button
                                        type="button"
                                        onClick={handleAddToCart}
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#12100d] bg-white px-5 text-xs font-bold uppercase tracking-[0.18em] text-[#12100d] transition hover:-translate-y-0.5 hover:bg-[#12100d] hover:text-white"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleBuyNow}
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#12100d] px-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-black"
                                    >
                                        <ShoppingBag className="h-5 w-5" /> Buy Now
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleGetStyleTips}
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#fbfbf8] px-4 text-xs font-bold uppercase tracking-[0.16em] text-[#12100d] transition hover:border-[#12100d]"
                                        aria-label="Open AI stylist"
                                    >
                                        <Sparkles className="h-5 w-5 text-[#9d7b32]" />
                                        <span className="sm:hidden lg:inline">AI Stylist</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#fbfbf8] px-4 text-xs font-bold uppercase tracking-[0.16em] text-[#12100d] transition hover:border-[#12100d]"
                                        aria-label="Share product"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        <span className="sm:hidden lg:inline">{shareStatus || 'Share'}</span>
                                    </button>
                                </div>
                                {shareStatus && <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">{shareStatus}</p>}

                                <div className="grid grid-cols-1 gap-3 border-t border-black/10 pt-6 sm:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-[8px] bg-[#fbfbf8] p-4 text-sm font-semibold text-black/66">
                                        <Truck className="h-5 w-5 text-[#9d7b32]" /> Free shipping support
                                    </div>
                                    <div className="flex items-center gap-3 rounded-[8px] bg-[#fbfbf8] p-4 text-sm font-semibold text-black/66">
                                        <ShieldCheck className="h-5 w-5 text-[#9d7b32]" /> Curated premium pick
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <section className="border-t border-black/10 pt-14 md:pt-20">
                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                            <div>
                                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">Complete the edit</p>
                                <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#12100d] md:text-5xl">You might also like</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 lg:gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <StyleTipsModal
                product={product}
                isOpen={styleTipsModalOpen}
                onClose={() => setStyleTipsModalOpen(false)}
                tips={styleTips}
                loading={loadingTips}
            />
        </main>
    );
}
