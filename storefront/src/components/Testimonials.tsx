"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
    { id: 1, text: "Genuine seller, superb quality and the customer service is also quite good.", author: "Rohan Khanna", detail: "Sneaker collector" },
    { id: 2, text: "Loved the brand literally, you guys must order. The whole buying experience felt premium.", author: "Priya Singh", detail: "Fragrance buyer" },
    { id: 3, text: "Best place for sneaker drops in India. Authentic stuff and quick guidance on WhatsApp.", author: "Kabir Mehta", detail: "Repeat customer" }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    const active = TESTIMONIALS[index];

    return (
        <section className="bg-[#12100d] py-16 text-white md:py-24">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-[0.75fr_1.25fr] md:items-center md:px-8">
                <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4b45f]">Customer proof</p>
                    <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Luxury needs trust before checkout.</h2>
                    <p className="mt-4 text-sm leading-6 text-white/62 md:text-base">
                        The storefront now frames social proof with the same premium tone as the product catalog.
                    </p>
                </div>

                <div className="rounded-[8px] border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] md:p-9">
                    <div className="mb-6 flex items-center justify-between">
                        <Quote className="h-9 w-9 text-[#d4b45f]" />
                        <div className="flex text-[#d4b45f]" aria-label="5 star rating">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                    </div>
                    <p className="text-xl font-light leading-9 tracking-[-0.02em] text-white/88 md:text-3xl md:leading-[1.35]">
                        &quot;{active.text}&quot;
                    </p>
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/12 pt-6">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em]">{active.author}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">{active.detail}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={prev}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white transition hover:bg-white hover:text-[#12100d]"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-white transition hover:bg-white hover:text-[#12100d]"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
