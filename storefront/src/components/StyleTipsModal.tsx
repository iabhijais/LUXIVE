"use client";

import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const StyleTipsModal = ({ product, isOpen, onClose, tips, loading }: { product: any, isOpen: boolean, onClose: () => void, tips: string, loading: boolean }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-5 mb-8 border-b border-gray-100 pb-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-black mb-2">
                            <div className="bg-black text-white p-1 rounded-full">
                                <Sparkles className="w-3 h-3 fill-current" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Luxive Stylist</span>
                        </div>
                        <h3 className="font-serif text-xl leading-tight text-gray-900">{product.title}</h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{product.category}</p>
                    </div>
                </div>

                <div className="min-h-[200px] text-sm text-gray-600 leading-relaxed">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center py-12 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
                            <p className="text-xs uppercase tracking-widest font-medium text-gray-500">Curating your look...</p>
                        </div>
                    ) : (
                        <div className="prose prose-sm max-w-none prose-p:mb-3 prose-ul:my-2 prose-li:my-1 prose-strong:text-black prose-strong:font-bold">
                            <ReactMarkdown
                                components={{
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 marker:text-gray-300" {...props} />,
                                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                    strong: ({ node, ...props }) => <span className="font-bold text-black" {...props} />,
                                }}
                            >
                                {tips}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
