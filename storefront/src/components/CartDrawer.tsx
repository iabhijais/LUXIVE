"use client";

import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const CartDrawer = () => {
    const { cart, removeFromCart, deleteFromCart, updateQuantity, clearCart, wishlist, moveToCart, removeFromWishlist, isCartOpen, toggleCart, removingIndex, isClearing } = useCart();
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        // REPLACE WITH YOUR WHATSAPP NUMBER (International format without +)
        const SELLER_PHONE = "918149409265";

        let message = `*NEW ORDER REQUEST*\n\n`;
        message += `Hello, I would like to place an order:\n\n`;

        cart.forEach((item, i) => {
            message += `${i + 1}. *${item.title}*\n`;
            if (item.size) message += `   • Size: ${item.size}\n`;
            message += `   • Qty: ${item.quantity}\n`;
            message += `   • Price: Rs. ${item.price.toLocaleString()}\n`;
            // Use window.location.origin to get the current domain
            const productUrl = `${window.location.origin}/product/${item.id}`;
            message += `   • Link: ${productUrl}\n\n`;
        });

        message += `--------------------------------\n`;
        message += `*TOTAL AMOUNT: Rs. ${total.toLocaleString()}*\n`;
        message += `--------------------------------\n\n`;
        message += `Please confirm availability & shipping calculation.`;

        const url = `https://wa.me/${SELLER_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[110] bg-black/62 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            />
            <div className={`fixed right-0 top-0 z-[120] flex h-full w-[min(92vw,430px)] transform flex-col bg-[#fbfbf8] shadow-[0_24px_90px_rgba(18,16,13,0.24)] transition-transform duration-300 ease-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="safe-top flex items-center justify-between border-b border-black/10 bg-white p-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[#12100d]">Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                        {cart.length > 0 && (
                            <button
                                type="button"
                                onClick={clearCart}
                                className="group ml-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-black/36 transition-colors hover:text-red-500"
                            >
                                <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                Clear All
                            </button>
                        )}
                    </div>
                    <button type="button" onClick={toggleCart} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/10" aria-label="Close cart"><X className="w-5 h-5" /></button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-1 space-y-6 overflow-y-auto p-4">
                    {/* Cart Items */}
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-black/52">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your cart is currently empty.</p>
                            <button
                                type="button"
                                onClick={toggleCart}
                                className="mt-6 min-h-12 rounded-full bg-[#12100d] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-black"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className={`space-y-4 transition-all duration-500 ease-in-out ${isClearing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                            {cart.map((item, idx) => (
                                <div
                                    key={`${item.id}-${idx}`}
                                    className={`flex gap-4 border-b border-black/10 pb-4 transition-all duration-300 ${removingIndex === idx
                                        ? 'opacity-0 translate-x-full scale-95'
                                        : 'opacity-100 translate-x-0 scale-100'
                                        }`}
                                >
                                    <Link href={`/product/${item.id}`} onClick={toggleCart} className="flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="h-20 w-20 rounded-[8px] bg-white object-cover transition-opacity hover:opacity-80" />
                                    </Link>
                                    <div className="flex-1">
                                        <Link href={`/product/${item.id}`} onClick={toggleCart}>
                                            <h3 className="mb-1 line-clamp-2 cursor-pointer text-sm font-semibold text-[#12100d] hover:underline">{item.title}</h3>
                                        </Link>
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-left text-xs text-black/48">
                                                {item.category}{item.size ? ` • Size: ${item.size}` : ''}
                                            </p>
                                            <div className="flex items-center rounded-full border border-black/10 bg-white">
                                                <button
                                                    onClick={() => updateQuantity(idx, -1)}
                                                    className="px-2 py-1 text-black/48 transition-colors hover:text-black disabled:opacity-30"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(idx, 1)}
                                                    className="px-2 py-1 text-black/48 transition-colors hover:text-black"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm font-bold text-[#12100d]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => deleteFromCart(idx)}
                                                    disabled={removingIndex !== null}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-black/36 transition-colors hover:text-red-500 hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                                <div className="h-3 w-px bg-gray-300"></div>
                                                <button
                                                    onClick={() => removeFromCart(idx)}
                                                    disabled={removingIndex !== null}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-black/48 transition-colors hover:text-black hover:underline"
                                                >
                                                    SAVE FOR LATER
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Saved for Later Section */}
                    {wishlist.length > 0 && (
                        <div className="border-t border-black/10 pt-6">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#12100d]">
                                SAVED FOR LATER ({wishlist.length})
                            </h3>
                            <div className="space-y-4">
                                {wishlist.map((item) => (
                                    <div key={item.id} className="flex gap-4 opacity-75 transition-opacity hover:opacity-100">
                                        <img src={item.image} alt={item.title} className="h-16 w-16 rounded-[8px] bg-white object-cover grayscale transition-all hover:grayscale-0" />
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                                            <p className="mb-1 text-xs text-black/48">Rs. {item.price.toLocaleString()}</p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => moveToCart(item)}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-black/48 transition-colors hover:text-black hover:underline"
                                                >
                                                    MOVE TO CART
                                                </button>
                                                <div className="h-3 w-px bg-gray-300"></div>
                                                <button
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-black/36 transition-colors hover:text-red-500 hover:underline"
                                                >
                                                    REMOVE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer (Total & Checkout) */}
                {cart.length > 0 && (
                    <div className="safe-bottom border-t border-black/10 bg-white p-4">
                        <div className="flex justify-between mb-4 text-sm">
                            <span className="font-bold">TOTAL</span>
                            <span className="font-bold">Rs. {total.toLocaleString()}</span>
                        </div>
                        <p className="mb-4 text-center text-xs text-black/48">Shipping and taxes calculated at checkout</p>
                        <button
                            type="button"
                            onClick={handleCheckout}
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#12100d] text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-black"
                        >
                            <MessageCircle className="w-5 h-5" /> Checkout via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
