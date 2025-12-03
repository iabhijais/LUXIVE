import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => (
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
                    <li><a href="#" className="hover:text-black">Return & Refund Policy</a></li>
                    <li><a href="#" className="hover:text-black">Shipping Policy</a></li>
                    <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Follow Us</h4>
                <div className="flex space-x-4 text-gray-600">
                    <Facebook className="w-5 h-5 hover:text-black cursor-pointer" />
                    <Instagram className="w-5 h-5 hover:text-black cursor-pointer" />
                    <Twitter className="w-5 h-5 hover:text-black cursor-pointer" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
                <p className="text-sm text-gray-500 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                <div className="flex">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 border border-r-0 border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                    />
                    <button className="bg-black text-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-800">
                        Join
                    </button>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2024 LUXIVE. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
