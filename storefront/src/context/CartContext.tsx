"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    [key: string]: any;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (index: number) => void;
    isCartOpen: boolean;
    toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product: Product) => {
        setCart((prev) => [...prev, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
