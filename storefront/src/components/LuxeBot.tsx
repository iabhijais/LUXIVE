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
        { role: 'assistant', text: "Hello! I'm LuxeBot ✨. I can help you find the perfect sneakers or fragrance from our collection. What's your style?" }
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
    Keep responses short (under 50 words) and use emojis sparingly.`;

        try {
            const response = await callGemini(userMsg, systemPrompt);
            setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={ref} className="fixed bottom-24 left-4 right-4 sm:left-auto sm:w-96 sm:max-w-[calc(100vw-2rem)] h-[min(450px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
            <div className="bg-black text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="font-bold text-sm tracking-wide">LuxeBot Stylist</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://wa.me/918149409265?text=Hello%20LUXIVE%20Stylist%2C%20I%20need%20assistance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-green-400 transition-colors"
                        title="Chat on WhatsApp"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </a>
                    <button onClick={onClose} aria-label="Close LuxeBot">
                        <X className="w-4 h-4 text-gray-300 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-5 ${msg.role === 'user'
                            ? 'bg-black text-white rounded-br-none'
                            : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
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

            <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask for advice..."
                        disabled={loading}
                        className="flex-1 bg-gray-50 text-base md:text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
});

LuxeBot.displayName = "LuxeBot";

export default LuxeBot;
