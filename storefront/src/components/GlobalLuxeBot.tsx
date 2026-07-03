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
                className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#12100d] text-white shadow-[0_18px_45px_rgba(18,16,13,0.28)] transition hover:-translate-y-0.5 md:right-6 group"
                aria-label={isLuxeBotOpen ? 'Close LuxeBot' : 'Open LuxeBot'}
            >
                <Sparkles className="h-6 w-6 text-[#d4b45f] transition group-hover:scale-110" />
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
