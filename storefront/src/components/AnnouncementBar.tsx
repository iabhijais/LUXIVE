"use client";
import React from 'react';

const AnnouncementBar = () => {
    const [currentOffer, setCurrentOffer] = React.useState(0);

    const offers = [
        "❄️ WINTER SALE IS LIVE: Flat 40% OFF on Hoodies & Sweatshirts",
        "🎁 NEW USER EXCLUSIVE: Get Extra 10% OFF on First Order",
        "🎄 MERRY CHRISTMAS: Special Surprises with Every Purchase"
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentOffer((prev) => (prev + 1) % offers.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black text-white text-xs md:text-sm py-2 px-4 text-center tracking-wide font-medium relative z-50">
            <p className="animate-pulse">{offers[currentOffer]}</p>
        </div>
    );
};

export default AnnouncementBar;
