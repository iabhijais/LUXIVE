"use client";

import React, { useState } from 'react';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
    onGetTips?: (product: Product) => void;
}

const SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

const ProductCard = ({ product, onGetTips }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showSizeSelector, setShowSizeSelector] = useState(false);
    const { addToCart, animateAddToCart, wishlist, addToWishlist, removeFromWishlist } = useCart();

    const isInWishlist = wishlist.some(p => p.id === product.id);
    const discount = Math.max(0, Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100));

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleQuickAdd = async (e: React.MouseEvent, size?: string) => {
        e.preventDefault();
        e.stopPropagation();

        const needsSize = ['sneakers', 'shoes', 'luxury'].includes(product.category.toLowerCase());

        if (needsSize && !size) {
            setShowSizeSelector(true);
            return;
        }

        const cardElement = e.currentTarget.closest('.group');
        const imgElement = cardElement?.querySelector('img');

        if (imgElement) {
            const rect = imgElement.getBoundingClientRect();
            animateAddToCart(rect, product.image);
        }

        await addToCart(product, size);
        setShowSizeSelector(false);
    };

    return (
        <article
            className="group relative overflow-hidden rounded-[8px] border border-black/[0.08] bg-white shadow-[0_18px_44px_rgba(18,16,13,0.05)] transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_26px_70px_rgba(18,16,13,0.12)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1eb]">
                <Link href={`/product/${product.id}`} className="block h-full" aria-label={`View ${product.title}`}>
                    <img
                        src={isHovered && product.hoverImage ? product.hoverImage : product.image}
                        alt={product.title}
                        width={900}
                        height={1100}
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 300px"
                        draggable={false}
                        className="product-card-image h-full w-full object-contain p-5 transition duration-500 group-hover:scale-[1.035] md:p-7"
                    />
                </Link>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent" />

                {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#12100d] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        {product.badge}
                    </span>
                )}

                <button
                    type="button"
                    onClick={toggleWishlist}
                    className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/[0.88] text-black shadow-sm transition hover:scale-105 hover:bg-white"
                    aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                    {!showSizeSelector ? (
                        <button
                            type="button"
                            onClick={(e) => handleQuickAdd(e)}
                            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-bold uppercase tracking-[0.18em] text-[#12100d] shadow-[0_14px_32px_rgba(18,16,13,0.16)] transition hover:bg-[#12100d] hover:text-white"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Quick Add
                        </button>
                    ) : (
                        <div className="grid grid-cols-3 gap-1 rounded-[8px] border border-black/10 bg-white p-2 shadow-[0_14px_32px_rgba(18,16,13,0.16)]">
                            {SIZES.map(size => (
                                <button
                                    type="button"
                                    key={size}
                                    onClick={(e) => handleQuickAdd(e, size)}
                                    className="min-h-9 rounded-md border border-black/10 text-[10px] font-bold uppercase tracking-wide transition hover:border-black hover:bg-[#12100d] hover:text-white"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/46">
                        {product.category.replace('_', ' ')}
                    </span>
                    {discount > 0 && (
                        <span className="rounded-full bg-[#f4efe4] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5b471d]">
                            {discount}% off
                        </span>
                    )}
                </div>

                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="min-h-11 text-sm font-semibold leading-5 text-[#12100d] transition group-hover:text-[#5b471d] md:text-[15px]">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-bold text-[#12100d]">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-xs font-medium text-black/38 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                </div>

                {onGetTips && (
                    <button
                        type="button"
                        onClick={() => onGetTips(product)}
                        className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-[#fbfbf8] px-3 text-xs font-bold uppercase tracking-[0.16em] text-[#12100d] transition hover:border-[#12100d] hover:bg-[#12100d] hover:text-white"
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        Style With AI
                    </button>
                )}

                <div className="relative md:hidden">
                    {showSizeSelector && (
                        <div className="absolute bottom-full left-0 z-30 mb-2 grid w-full grid-cols-3 gap-1 rounded-[8px] border border-black/10 bg-white p-2 shadow-xl">
                            {SIZES.map(size => (
                                <button
                                    type="button"
                                    key={size}
                                    onClick={(e) => handleQuickAdd(e, size)}
                                    className="min-h-9 rounded-md border border-black/10 text-[10px] font-bold uppercase"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e)}
                        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#12100d] px-4 text-xs font-bold uppercase tracking-[0.18em] text-white"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        {showSizeSelector ? 'Select Size' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
