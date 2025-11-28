import React from 'react';
import { ArrowRight, Mail, ShoppingBag } from 'lucide-react';

const Features = () => (
    <div className="py-12 border-t border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <ArrowRight className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Free Shipping</h3>
                <p className="text-gray-500 text-sm">Free shipping all over India on prepaid orders.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">24/7 Support</h3>
                <p className="text-gray-500 text-sm">We are available on email to answer your questions.</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-2">Secure Payment</h3>
                <p className="text-gray-500 text-sm">Your payment information is processed securely.</p>
            </div>
        </div>
    </div>
);

export default Features;
