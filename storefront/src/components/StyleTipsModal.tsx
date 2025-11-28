"use client";

import React from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

const StyleTipsModal = ({ product, isOpen, onClose, tips, loading }: { product: any, isOpen: boolean, onClose: () => void, tips: string, loading: boolean }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 mb-1">
                            <Sparkles className="w-4 h-4 fill-current" />
                            <span className="text-xs font-bold uppercase tracking-widest">Gemini Stylist</span>
                        </div>
                        <h3 className="font-bold text-sm leading-tight line-clamp-2">{product.title}</h3>
                    </div>
                </div>

                <div className="min-h-[150px] text-sm text-gray-700 leading-relaxed">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center py-8 text-gray-400">
                            <Loader2 className="w-8 h-8 animate-spin mb-3" />
                            <p className="text-xs uppercase tracking-widest">Generating style advice...</p>
                        </div>
                    ) : (
                        <div className="prose prose-sm max-w-none">
                            {tips.split('\n').map((line, i) => (
                                <p key={i} className="mb-2">{line}</p>
                            ))}
                        </div>
                    )}
                </div>

                {!loading && (
                    <div className="mt-6 pt-4 border-t flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                        >
                            Got it
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleTipsModal;
