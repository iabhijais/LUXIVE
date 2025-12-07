"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

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

        // Construct WhatsApp message
        const phoneNumber = "916289135345";
        const message = `Hello, I saw your website and have a query:\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n\n*Message:*\n${formData.message}`;

        // Open WhatsApp with encoded text using link click trick
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
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">CONTACT US</h1>
                <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-full shadow-sm">
                                        <Mail className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email us at</p>
                                        <a href="mailto:contact@luxive.com" className="font-medium hover:text-gray-600">contact@luxive.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-white p-3 rounded-full shadow-sm">
                                        <Phone className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Call us at</p>
                                        <a href="tel:+916289135345" className="font-medium hover:text-gray-600">+91 62891 35345</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Send className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
                                <p className="text-green-700">Thank you for contacting us. We'll get back to you shortly.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-sm font-semibold text-green-700 hover:text-green-800 underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-gray-50 focus:bg-white resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Redirecting...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
