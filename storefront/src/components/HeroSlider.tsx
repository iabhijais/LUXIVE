"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

type HeroSlide = {
    id: number;
    image: string;
    eyebrow: string;
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
    focus?: string;
};

const slides: HeroSlide[] = [
    {
        id: 1,
        image: "/Premium Sneakers/Air Jordan 1 Retro High OG ObsidianUniversity Blue 3300 x 6999/14431181_21155388_1000.webp",
        eyebrow: "Verified Sneaker Vault",
        title: "Rare drops with a private-store finish.",
        description: "Air Jordans, LV trainers and hype releases curated for collectors who want the look without the chaos.",
        primary: { label: "Shop sneakers", href: "/shop/sneakers" },
        secondary: { label: "View luxury shoes", href: "/shop/luxury" },
        focus: "center"
    },
    {
        id: 2,
        image: "/luxury-perfume-banner.png",
        eyebrow: "Signature Scents",
        title: "Fragrances that feel custom selected.",
        description: "A sharper perfume edit for him and her, presented with concierge-style recommendations from LuxeBot.",
        primary: { label: "For him", href: "/shop/perfumes_him" },
        secondary: { label: "For her", href: "/shop/perfumes_her" },
        focus: "center"
    },
    {
        id: 3,
        image: "/PREMIUM WATCHES MEN/Tag_Heuer Aquaracer GMT Automatic AAA 42000 X 6499/682850dbe2b7c2.jpeg",
        eyebrow: "Statement Timepieces",
        title: "Premium watches for daily presence.",
        description: "Discover bold men's chronographs and elegant women's silhouettes in one curated watch room.",
        primary: { label: "Men's watches", href: "/shop/watches_him" },
        secondary: { label: "Women's watches", href: "/shop/watches_her" },
        focus: "center"
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5200);
        return () => window.clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;

        if (distance > 48) nextSlide();
        if (distance < -48) prevSlide();

        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <section
            className="relative isolate h-[calc(100svh-105px)] min-h-[560px] max-h-[820px] overflow-hidden bg-[#12100d] text-white"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden={currentSlide !== index}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: slide.focus || 'center' }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,13,0.9)_0%,rgba(18,16,13,0.62)_38%,rgba(18,16,13,0.2)_72%,rgba(18,16,13,0.55)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#12100d] to-transparent" />
                </div>
            ))}

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-10 md:px-8">
                <div className="max-w-3xl">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur">
                        <ShieldCheck className="h-4 w-4 text-[#d4b45f]" />
                        {slides[currentSlide].eyebrow}
                    </div>

                    <h1 className="max-w-4xl text-4xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-5xl md:text-7xl lg:text-8xl">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/74 md:text-lg">
                        {slides[currentSlide].description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href={slides[currentSlide].primary.href}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold uppercase tracking-[0.18em] text-[#12100d] transition hover:-translate-y-0.5 hover:bg-[#f5efe3]"
                        >
                            {slides[currentSlide].primary.label}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        {slides[currentSlide].secondary && (
                            <Link
                                href={slides[currentSlide].secondary.href}
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/28 px-7 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-white/12"
                            >
                                {slides[currentSlide].secondary.label}
                            </Link>
                        )}
                    </div>

                    <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-white/14 py-4 text-white/82">
                        {['Verified picks', 'AI stylist', 'WhatsApp concierge'].map((item) => (
                            <div key={item} className="border-r border-white/12 px-3 first:pl-0 last:border-r-0">
                                <Sparkles className="mb-2 h-4 w-4 text-[#d4b45f]" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center justify-between md:bottom-8 md:px-4">
                <div className="flex items-center gap-3">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-10 bg-white' : 'w-4 bg-white/35 hover:bg-white/70'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="hidden gap-3 sm:flex">
                    <button
                        type="button"
                        onClick={prevSlide}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/22 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#12100d]"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/22 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#12100d]"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSlider;
