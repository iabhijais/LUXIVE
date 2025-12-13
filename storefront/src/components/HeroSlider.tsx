"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1600",
            sub: "India's #1 Drops",
            title: "Authentic Sneakers",
            btn: "SHOP NOW",
            link: "/shop/sneakers"
        },
        {
            id: 2,
            image: "/luxury-perfume-banner.png",
            sub: "Luxury Scents",
            title: "Premium Perfumes",
            buttons: [
                { text: "FOR HIM", link: "/shop/perfumes_him" },
                { text: "FOR HER", link: "/shop/perfumes_her" }
            ]
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1600",
            sub: "High-End Fashion",
            title: "Luxury Shoes",
            btn: "VIEW COLLECTION",
            link: "/shop/luxury"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1600",
            sub: "Timepieces",
            title: "Exclusive Watches",
            buttons: [
                { text: "FOR HIM", link: "/shop/watches_him" },
                { text: "FOR HER", link: "/shop/watches_her" }
            ]
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Touch swipe support
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <div
            className="relative w-full h-[50vh] md:h-[70vh] bg-gray-100 overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white p-4">
                        <h2 className="text-xs md:text-lg tracking-[0.2em] font-light mb-2 md:mb-4 uppercase animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            {slide.sub}
                        </h2>
                        <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 uppercase tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            {slide.title}
                        </h1>
                        {slide.buttons ? (
                            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                                {slide.buttons.map((btn, idx) => (
                                    <Link key={idx} href={btn.link} className="bg-white text-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
                                        {btn.text}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Link href={slide.link} className="bg-white text-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                                {slide.btn}
                            </Link>
                        )}
                    </div>
                </div>
            ))}

            {/* Slide Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows - Visible on both Mobile and PC */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 transition z-20 backdrop-blur-sm"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-black/40 transition z-20 backdrop-blur-sm"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default HeroSlider;
