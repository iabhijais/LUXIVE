"use client";

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
    { id: 1, text: "Genuine Seller, superb quality and the customer service is also quite good.", author: "Rohan Khanna" },
    { id: 2, text: "Loved the brand literally, you guys must order.", author: "Priya Singh" },
    { id: 3, text: "Best place for sneaker drops in India. Authentic stuff.", author: "Kabir Mehta" }
];

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    return (
        <div className="bg-black text-white py-16">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <div className="flex justify-center mb-6">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                </div>
                <p className="text-lg md:text-xl font-light italic mb-8 leading-relaxed">
                    "{TESTIMONIALS[index].text}"
                </p>
                <p className="font-bold tracking-widest text-sm uppercase text-gray-400 mb-8">
                    - {TESTIMONIALS[index].author}
                </p>

                <div className="flex justify-center gap-4">
                    <button onClick={prev} className="p-2 border border-gray-700 hover:border-white transition rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={next} className="p-2 border border-gray-700 hover:border-white transition rounded-full"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
