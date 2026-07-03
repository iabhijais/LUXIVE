"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, MessageCircle } from 'lucide-react';
import { callGemini } from '../utils/gemini';
import type { Product } from '../types/product';

type ChatMessage = {
    role: 'assistant' | 'user';
    text: string;
};

const LuxeBot = React.forwardRef<HTMLDivElement, { isOpen: boolean, onClose: () => void, products: Product[] }>(({ isOpen, onClose, products }, ref) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', text: "Hello, I'm LuxeBot. I can help you find the right sneakers, watch or fragrance from our collection. What's your style brief?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) {
            window.setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        const productContext = products
            .map(p => `${p.title} | Rs. ${p.price.toLocaleString()} | ${p.category}`)
            .join('\n');

        const systemPrompt = `You are LuxeBot, a high-end personal stylist for LUXIVE. 
    You are helpful, concise, and fashionable. 
    Here is our product catalog: ${productContext}. 
    Recommend specific products from this list when possible. 
    If asked about price, use the prices in the catalog. 
    Do not mention products not in the catalog. 
    Keep responses short (under 50 words) and avoid emojis unless the customer uses them first.`;

        try {
            const response = await callGemini(userMsg, systemPrompt);
            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={ref} className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 flex h-[min(520px,calc(100svh-8.5rem))] flex-col overflow-hidden rounded-[8px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(18,16,13,0.24)] animate-in slide-in-from-bottom-5 sm:left-auto sm:w-96 sm:max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between bg-[#12100d] p-4 text-white">
                <div className="flex items-center gap-2">
                    <div className="rounded-full border border-white/16 bg-white/10 p-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#d4b45f]" />
                    </div>
                    <span className="text-sm font-bold tracking-wide">LuxeBot Concierge</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://wa.me/918149409265?text=Hello%20LUXIVE%20Stylist%2C%20I%20need%20assistance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/72 transition-colors hover:text-white"
                        title="Chat on WhatsApp"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </a>
                    <button type="button" onClick={onClose} aria-label="Close LuxeBot">
                        <X className="h-4 w-4 text-white/70 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#fbfbf8] p-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[82%] rounded-[8px] p-3 text-xs leading-5 ${msg.role === 'user'
                            ? 'bg-[#12100d] text-white'
                            : 'border border-black/10 bg-white text-[#12100d] shadow-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="rounded-[8px] border border-black/10 bg-white p-3 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-black/10 bg-white p-3">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask for advice..."
                        disabled={loading}
                        className="min-h-11 flex-1 rounded-full bg-[#fbfbf8] px-4 text-base focus:outline-none focus:ring-1 focus:ring-black md:text-sm"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#12100d] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
});

LuxeBot.displayName = "LuxeBot";

export default LuxeBot;
