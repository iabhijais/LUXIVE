"use client";

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    category: string;
    image: string;
    hoverImage?: string;
    badge?: string;
}

interface ProductCardProps {
    product: Product;
    onGetTips?: (product: Product) => void;
}

const ProductCard = ({ product, onGetTips }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, animateAddToCart } = useCart();

    const handleQuickAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log("Quick Add clicked for:", product.title);

        // Get the product image element for animation
        const cardElement = e.currentTarget.closest('.group');
        const imgElement = cardElement?.querySelector('img');

        if (imgElement) {
            const rect = imgElement.getBoundingClientRect();
            animateAddToCart(rect, product.image);
        }

        await addToCart(product);
        console.log("Product added to cart");
    };

    return (
        <div
            className="group relative bg-white border border-transparent hover:border-gray-100 transition-all duration-300 pb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-square overflow-hidden bg-gray-50 mb-3">
                <Link href={`/product/${product.id}`}>
                    <img
                        src={isHovered && product.hoverImage ? product.hoverImage : product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>
                {product.badge && (
                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">
                        {product.badge}
                    </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                    <button
                        onClick={handleQuickAdd}
                        className="w-full bg-white text-black border border-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="px-2 text-center">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-2 h-10 group-hover:underline decoration-1 underline-offset-4">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-center gap-2 text-sm mb-3">
                    <span className="font-bold">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-xs">Rs. {product.originalPrice.toLocaleString()}</span>
                    <span className="text-green-600 text-xs font-bold">
                        ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                    </span>
                </div>

                {/* AI Feature Button */}
                {onGetTips && (
                    <button
                        onClick={() => onGetTips(product)}
                        className="text-xs uppercase font-bold text-gray-800 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex items-center justify-center mx-auto gap-1"
                    >
                        <Sparkles className="w-3 h-3" /> Get Style Tips
                    </button>
                )}

                <button
                    onClick={handleQuickAdd}
                    className="mt-3 w-full md:hidden bg-black text-white py-2 text-xs font-bold uppercase"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
