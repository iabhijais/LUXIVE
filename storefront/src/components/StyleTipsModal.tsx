"use client";

import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Product } from '../types/product';

const StyleTipsModal = ({ product, isOpen, onClose, tips, loading }: { product: Product, isOpen: boolean, onClose: () => void, tips: string, loading: boolean }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/64 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_24px_90px_rgba(18,16,13,0.24)] animate-in fade-in zoom-in-95 duration-300 md:p-8">
                <button type="button" onClick={onClose} className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-black/48 transition-colors hover:bg-black/10 hover:text-black" aria-label="Close style tips">
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-8 flex items-start gap-5 border-b border-black/10 pb-6">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[8px] border border-black/10 bg-[#fbfbf8] shadow-sm">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-black">
                            <div className="rounded-full bg-[#12100d] p-1 text-[#d4b45f]">
                                <Sparkles className="h-3 w-3" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">LUXIVE Stylist</span>
                        </div>
                        <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-[#12100d]">{product.title}</h3>
                        <p className="mt-1 text-xs uppercase tracking-wider text-black/44">{product.category}</p>
                    </div>
                </div>

                <div className="min-h-[200px] text-sm leading-relaxed text-black/66">
                    {loading ? (
                        <div className="flex h-full flex-col items-center justify-center py-12 text-black/42">
                            <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/48">Curating your look...</p>
                        </div>
                    ) : (
                        <div className="prose prose-sm max-w-none prose-p:mb-3 prose-ul:my-2 prose-li:my-1 prose-strong:text-black prose-strong:font-bold">
                            <ReactMarkdown
                                components={{
                                    ul: ({ node, ...props }) => {
                                        void node;
                                        return <ul className="list-disc space-y-1 pl-5 marker:text-[#9d7b32]" {...props} />;
                                    },
                                    li: ({ node, ...props }) => {
                                        void node;
                                        return <li className="pl-1" {...props} />;
                                    },
                                    strong: ({ node, ...props }) => {
                                        void node;
                                        return <span className="font-bold text-black" {...props} />;
                                    },
                                }}
                            >
                                {tips}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="mt-8 flex justify-end border-t border-black/10 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-h-12 rounded-full bg-[#12100d] px-8 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-black hover:shadow-xl"
                        >
                            Shop The Look
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleTipsModal;
