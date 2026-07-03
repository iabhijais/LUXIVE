import React from 'react';
import { LockKeyhole, MessageCircle, PackageCheck, ShieldCheck } from 'lucide-react';

const FEATURES = [
    {
        icon: ShieldCheck,
        title: 'Curated Selection',
        copy: 'Premium sneakers, watches and perfumes edited for a sharper luxury shopping experience.',
    },
    {
        icon: MessageCircle,
        title: 'Concierge Support',
        copy: 'Talk to the LUXIVE team on WhatsApp for fit, scent and availability guidance.',
    },
    {
        icon: PackageCheck,
        title: 'Nationwide Delivery',
        copy: 'Fast dispatch support across India with order confirmation before fulfillment.',
    },
    {
        icon: LockKeyhole,
        title: 'Secure Checkout',
        copy: 'Checkout is assisted and confirmed through trusted payment and WhatsApp flows.',
    },
];

const Features = () => (
    <section className="border-y border-black/10 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 max-w-2xl">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">Why LUXIVE</p>
                <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#12100d] md:text-5xl">Built for premium shopping confidence.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
                {FEATURES.map(feature => {
                    const Icon = feature.icon;

                    return (
                        <div key={feature.title} className="rounded-[8px] border border-black/10 bg-[#fbfbf8] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_55px_rgba(18,16,13,0.09)]">
                            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#12100d] text-white">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#12100d]">{feature.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-black/56">{feature.copy}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

export default Features;
