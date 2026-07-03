"use client";

import React from 'react';
import { Globe, Instagram, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    const [activePolicy, setActivePolicy] = React.useState<{ title: string; content: React.ReactNode } | null>(null);

    const policies = {
        return: {
            title: "Return & Refund Policy",
            content: (
                <div className="space-y-4 text-black/64">
                    <p>At LUXIVE, we want you to be completely satisfied with your purchase. If you&apos;re not happy with your order, we&apos;re here to help.</p>
                    <h5 className="font-bold text-black">Returns</h5>
                    <p>You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.</p>
                    <h5 className="font-bold text-black">Refunds</h5>
                    <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment.</p>
                    <h5 className="font-bold text-black">Contact Us</h5>
                    <p>If you have any questions on how to return your item to us, contact us at contact@luxive.com.</p>
                </div>
            )
        },
        shipping: {
            title: "Shipping Policy",
            content: (
                <div className="space-y-4 text-black/64">
                    <p>Thank you for visiting and shopping at LUXIVE. Following are the terms and conditions that constitute our Shipping Policy.</p>
                    <h5 className="font-bold text-black">Shipment Processing Time</h5>
                    <p>All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
                    <h5 className="font-bold text-black">Shipping Rates & Delivery Estimates</h5>
                    <p>Shipping charges for your order will be calculated and displayed at checkout. Standard delivery usually takes 5-7 business days.</p>
                    <h5 className="font-bold text-black">Shipment Confirmation & Order Tracking</h5>
                    <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                </div>
            )
        },
        terms: {
            title: "Terms of Service",
            content: (
                <div className="space-y-4 text-black/64">
                    <p>Please read these Terms of Service carefully before accessing or using our website.</p>
                    <h5 className="font-bold text-black">General Conditions</h5>
                    <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content, not including credit card information, may be transferred unencrypted and involve transmissions over various networks and changes to conform to technical requirements.</p>
                    <h5 className="font-bold text-black">Products or Services</h5>
                    <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
                    <h5 className="font-bold text-black">Accuracy of Billing and Account Information</h5>
                    <p>We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, household, or order.</p>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            content: (
                <div className="space-y-4 text-black/64">
                    <p>Your privacy is important to us. It is LUXIVE&apos;s policy to respect your privacy regarding any information we may collect from you across our website.</p>
                    <h5 className="font-bold text-black">Information We Collect</h5>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                    <h5 className="font-bold text-black">How We Use Information</h5>
                    <p>We use the information we collect to operate and maintain our website, send marketing communications, respond to comments and questions, and provide customer service.</p>
                    <h5 className="font-bold text-black">Security</h5>
                    <p>We value your trust in providing us your personal information and use commercially acceptable means to protect it.</p>
                </div>
            )
        }
    };

    const socialLinks = [
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/luxive.premium.zone?igsh=NXlvbHQ0MnpnMzY=',
            icon: Instagram,
        },
        {
            label: 'Linktree',
            href: 'https://linktr.ee/luxiveworld?utm_source=linktree_profile_share&ltsid=b647bf37-f1d0-4cd6-a41f-081b55e66c90',
            icon: Globe,
        },
        {
            label: 'WhatsApp',
            href: 'https://wa.me/918149409265?text=Hello%20LUXIVE%2C%20I%20would%20like%20to%20join%20the%20community',
            icon: MessageCircle,
        },
    ];

    return (
        <>
            <footer className="safe-bottom bg-[#12100d] text-white">
                <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
                    <div className="grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.8fr]">
                        <div>
                            <div className="relative mb-5 h-12 w-36 overflow-hidden rounded-[8px] bg-white">
                                <img src="/luxive-text-black.png" alt="LUXIVE" className="luxive-logo-img absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-[52%] object-contain" />
                            </div>
                            <p className="max-w-sm text-sm leading-7 text-white/58">
                                LUXIVE curates sneakers, luxury shoes, watches and fragrances for shoppers who want a sharper, assisted premium buying experience.
                            </p>
                            <div className="mt-6 flex gap-3">
                                {socialLinks.map(link => {
                                    const Icon = link.icon;

                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white/72 transition hover:bg-white hover:text-[#12100d]"
                                            aria-label={link.label}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Collections</h4>
                            <ul className="space-y-3 text-sm text-white/58">
                                <li><Link href="/shop/sneakers" className="transition hover:text-white">Sneakers</Link></li>
                                <li><Link href="/shop/luxury" className="transition hover:text-white">Luxury Shoes</Link></li>
                                <li><Link href="/shop/watches_him" className="transition hover:text-white">Watches</Link></li>
                                <li><Link href="/shop/perfumes_him" className="transition hover:text-white">Perfumes</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Store Policy</h4>
                            <ul className="space-y-3 text-sm text-white/58">
                                <li><button type="button" onClick={() => setActivePolicy(policies.return)} className="text-left transition hover:text-white">Return & Refund</button></li>
                                <li><button type="button" onClick={() => setActivePolicy(policies.shipping)} className="text-left transition hover:text-white">Shipping</button></li>
                                <li><button type="button" onClick={() => setActivePolicy(policies.terms)} className="text-left transition hover:text-white">Terms of Service</button></li>
                                <li><button type="button" onClick={() => setActivePolicy(policies.privacy)} className="text-left transition hover:text-white">Privacy Policy</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white">Private Community</h4>
                            <p className="mb-4 text-sm leading-6 text-white/58">
                                Scan to join the WhatsApp community for early access, styling guidance and drop updates.
                            </p>
                            <div className="inline-block rounded-[8px] border border-white/12 bg-white p-2">
                                <img src="/whatsapp-community-qr.png" alt="WhatsApp Community QR" className="h-32 w-32 object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/38 md:flex-row md:items-center md:justify-between">
                        <p>© 2025 luxive.co.in. All rights reserved.</p>
                        <p>Premium commerce experience for India.</p>
                    </div>
                </div>
            </footer>

            {activePolicy && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/62 p-4">
                    <button
                        type="button"
                        className="absolute inset-0 cursor-default"
                        onClick={() => setActivePolicy(null)}
                        aria-label="Close policy modal"
                    />
                    <div className="relative z-10 flex max-h-[84svh] w-full max-w-2xl flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-black/10 bg-white p-5">
                            <h3 className="text-lg font-bold tracking-[-0.02em] text-[#12100d] md:text-xl">{activePolicy.title}</h3>
                            <button
                                type="button"
                                onClick={() => setActivePolicy(null)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] transition hover:bg-black/10"
                                aria-label="Close policy"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-5 text-sm leading-6 md:p-6">
                            {activePolicy.content}
                        </div>
                        <div className="border-t border-black/10 bg-[#fbfbf8] p-5">
                            <button
                                type="button"
                                onClick={() => setActivePolicy(null)}
                                className="min-h-12 w-full rounded-full bg-[#12100d] text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-black"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
