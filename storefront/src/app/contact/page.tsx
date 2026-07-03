"use client";

import React, { useState } from 'react';
import { Loader2, Mail, MessageCircle, Phone, Send } from 'lucide-react';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const phoneNumber = "918149409265";
        const message = `Hello, I saw your website and have a query:\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n\n*Message:*\n${formData.message}`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[#fbfbf8] px-4 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 max-w-3xl">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">Private concierge</p>
                    <h1 className="text-4xl font-semibold tracking-[-0.055em] text-[#12100d] md:text-6xl">Talk to LUXIVE before you buy.</h1>
                    <p className="mt-5 text-sm leading-6 text-black/58 md:text-base">
                        Ask about sizing, availability, fragrance recommendations, or a custom product shortlist. We route your request through WhatsApp for a faster assisted response.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                    <aside className="rounded-[8px] bg-[#12100d] p-6 text-white shadow-[0_24px_70px_rgba(18,16,13,0.18)] md:p-8">
                        <h2 className="text-2xl font-semibold tracking-[-0.04em]">Get in touch</h2>
                        <p className="mt-3 text-sm leading-6 text-white/58">Use the form or contact us directly for premium purchase guidance.</p>

                        <div className="mt-8 space-y-5">
                            <a href="mailto:contact@luxive.com" className="flex items-center gap-4 rounded-[8px] border border-white/12 p-4 transition hover:bg-white/10">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#12100d]">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/42">Email</span>
                                    <span className="text-sm font-semibold">contact@luxive.com</span>
                                </span>
                            </a>
                            <a href="tel:+918149409265" className="flex items-center gap-4 rounded-[8px] border border-white/12 p-4 transition hover:bg-white/10">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#12100d]">
                                    <Phone className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/42">Phone</span>
                                    <span className="text-sm font-semibold">+91 81494 09265</span>
                                </span>
                            </a>
                            <a href="https://wa.me/918149409265?text=Hello%20LUXIVE%2C%20I%20need%20assistance" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-[8px] border border-white/12 p-4 transition hover:bg-white/10">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#12100d]">
                                    <MessageCircle className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/42">WhatsApp</span>
                                    <span className="text-sm font-semibold">Fast concierge chat</span>
                                </span>
                            </a>
                        </div>
                    </aside>

                    <section className="rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(18,16,13,0.08)] md:p-8">
                        {submitted ? (
                            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[8px] border border-[#9d7b32]/20 bg-[#fbfbf8] p-8 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#12100d] text-[#d4b45f]">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#12100d]">Message sent</h3>
                                <p className="mt-2 text-sm leading-6 text-black/56">WhatsApp opened with your message. We will get back to you shortly.</p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 min-h-11 rounded-full border border-black/10 px-5 text-xs font-bold uppercase tracking-[0.18em] text-[#12100d] hover:border-black"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-[0.18em] text-black/54">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="min-h-12 w-full rounded-[8px] border border-black/10 bg-[#fbfbf8] px-4 text-base outline-none transition focus:border-black focus:bg-white"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-[0.18em] text-black/54">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="min-h-12 w-full rounded-[8px] border border-black/10 bg-[#fbfbf8] px-4 text-base outline-none transition focus:border-black focus:bg-white"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.18em] text-black/54">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="min-h-12 w-full rounded-[8px] border border-black/10 bg-[#fbfbf8] px-4 text-base outline-none transition focus:border-black focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.18em] text-black/54">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full resize-none rounded-[8px] border border-black/10 bg-[#fbfbf8] px-4 py-3 text-base outline-none transition focus:border-black focus:bg-white"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#12100d] px-6 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Redirecting
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
