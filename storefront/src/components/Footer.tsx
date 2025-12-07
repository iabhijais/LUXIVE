"use client";

import React from 'react';
import { Instagram, Globe, MessageCircle, X } from 'lucide-react';

const Footer = () => {
    const [activePolicy, setActivePolicy] = React.useState<{ title: string; content: React.ReactNode } | null>(null);

    const policies = {
        return: {
            title: "Return & Refund Policy",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>At LUXIVE, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.</p>
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
                <div className="space-y-4 text-gray-600">
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
                <div className="space-y-4 text-gray-600">
                    <p>Please read these Terms of Service carefully before accessing or using our website.</p>
                    <h5 className="font-bold text-black">General Conditions</h5>
                    <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</p>
                    <h5 className="font-bold text-black">Products or Services</h5>
                    <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
                    <h5 className="font-bold text-black">Accuracy of Billing and Account Information</h5>
                    <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.</p>
                </div>
            )
        },
        privacy: {
            title: "Privacy Policy",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>Your privacy is important to us. It is LUXIVE's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                    <h5 className="font-bold text-black">Information We Collect</h5>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                    <h5 className="font-bold text-black">How We Use Information</h5>
                    <p>We use the information we collect to operate and maintain our website, send you marketing communications, respond to your comments and questions, and provide customer service.</p>
                    <h5 className="font-bold text-black">Security</h5>
                    <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure.</p>
                </div>
            )
        }
    };

    return (
        <>
            <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">About Us</h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">
                            LUXIVE is the ultimate destination for sneaker enthusiasts and luxury connoisseurs. We curate the rarest drops and finest scents to elevate your style game.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Store's Policy</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><button onClick={() => setActivePolicy(policies.return)} className="hover:text-black text-left">Return & Refund Policy</button></li>
                            <li><button onClick={() => setActivePolicy(policies.shipping)} className="hover:text-black text-left">Shipping Policy</button></li>
                            <li><button onClick={() => setActivePolicy(policies.terms)} className="hover:text-black text-left">Terms of Service</button></li>
                            <li><button onClick={() => setActivePolicy(policies.privacy)} className="hover:text-black text-left">Privacy Policy</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Follow Us</h4>
                        <div className="flex space-x-4 text-gray-600 mb-6">
                            <a href="https://www.instagram.com/luxive.premium.zone?igsh=NXlvbHQ0MnpnMzY=" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
                            </a>
                            <a href="https://linktr.ee/luxiveworld?utm_source=linktree_profile_share&ltsid=b647bf37-f1d0-4cd6-a41f-081b55e66c90" target="_blank" rel="noopener noreferrer">
                                <Globe className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
                            </a>
                            <a href="https://wa.me/918149409265?text=Hello%20LUXIVE%2C%20I%20would%20like%20to%20join%20the%20community" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Join our Community</h4>
                        <p className="text-sm text-gray-500 mb-4">Scan the QR code to join our exclusive WhatsApp community for early access to drops.</p>
                        <div className="bg-white p-2 border border-gray-100 inline-block rounded-lg shadow-sm">
                            <img src="/whatsapp-community-qr.png" alt="WhatsApp Community QR" className="w-32 h-32 object-contain" />
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>© 2025 luxive.co.in. All rights reserved.</p>
                </div>
            </footer>

            {/* Policy Modal */}
            {activePolicy && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 transition-opacity">
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                            <h3 className="text-xl font-bold">{activePolicy.title}</h3>
                            <button onClick={() => setActivePolicy(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            {activePolicy.content}
                        </div>
                        <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => setActivePolicy(null)}
                                className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-900 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-[-1]" onClick={() => setActivePolicy(null)}></div>
                </div>
            )}
        </>
    );
};

export default Footer;
