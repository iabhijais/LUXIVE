"use client";

import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
    const { cart, removeFromCart, isCartOpen, toggleCart, removingIndex } = useCart();
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            />
            <div className={`fixed top-0 right-0 h-full w-[85vw] md:w-[400px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-bold uppercase tracking-widest">Shopping Cart ({cart.length})</h2>
                    <button onClick={toggleCart}><X className="w-6 h-6 hover:rotate-90 transition-transform" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                            <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your cart is currently empty.</p>
                            <button
                                onClick={toggleCart}
                                className="mt-6 bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div 
                                key={`${item.id}-${idx}`} 
                                className={`flex gap-4 border-b border-gray-100 pb-4 transition-all duration-300 ${
                                    removingIndex === idx 
                                        ? 'opacity-0 translate-x-full scale-95' 
                                        : 'opacity-100 translate-x-0 scale-100'
                                }`}
                            >
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover bg-gray-50 rounded" />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-xs mb-2">{item.category}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">Rs. {item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => removeFromCart(idx)}
                                            disabled={removingIndex !== null}
                                            className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4 text-sm">
                            <span className="font-bold">TOTAL</span>
                            <span className="font-bold">Rs. {total.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
                        <button className="w-full bg-black text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
