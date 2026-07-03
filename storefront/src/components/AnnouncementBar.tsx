"use client";
import React from 'react';

const OFFERS = [
    "Authenticated luxury drops curated for India",
    "Private WhatsApp concierge for sizing and sourcing",
    "Secure checkout with fast nationwide delivery"
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
        <div className="safe-top relative z-50 bg-[#12100d] text-white">
            <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-center px-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white/86 md:text-xs">
                <p className="transition-opacity duration-300">{OFFERS[currentOffer]}</p>
            </div>
        </div>
    );
};

export default AnnouncementBar;
