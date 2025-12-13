"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import LuxeBot from './LuxeBot';
import { PRODUCTS } from '../data/products';

export default function GlobalLuxeBot() {
    const [isLuxeBotOpen, setIsLuxeBotOpen] = useState(false);
    const botRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isLuxeBotOpen &&
                botRef.current &&
                !botRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsLuxeBotOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLuxeBotOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setIsLuxeBotOpen(!isLuxeBotOpen)}
                className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 group"
            >
                <Sparkles className="w-6 h-6 group-hover:animate-spin" />
            </button>

            <LuxeBot
                ref={botRef}
                isOpen={isLuxeBotOpen}
                onClose={() => setIsLuxeBotOpen(false)}
                products={PRODUCTS}
            />
        </>
    );
}
