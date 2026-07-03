"use client";
import React from 'react';

const OFFERS = [
    "❄️ WINTER SALE IS LIVE: Flat 40% OFF on Hoodies & Sweatshirts",
    "🎁 NEW USER EXCLUSIVE: Get Extra 10% OFF on First Order",
    "🎄 MERRY CHRISTMAS: Special Surprises with Every Purchase"
];

const AnnouncementBar = () => {
    const [currentOffer, setCurrentOffer] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % OFFERS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black text-white text-xs md:text-sm py-2 px-4 text-center tracking-wide font-medium relative z-50">
            <p className="animate-pulse">{OFFERS[currentOffer]}</p>
        </div>
    );
};

export default AnnouncementBar;
