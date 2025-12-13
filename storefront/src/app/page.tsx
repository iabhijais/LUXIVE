"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { callGemini } from '../utils/gemini';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';

import StyleTipsModal from '../components/StyleTipsModal';

export default function Home() {

  const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [styleTips, setStyleTips] = useState("");
  const [loadingTips, setLoadingTips] = useState(false);

  const handleGetStyleTips = async (product: any) => {
    setSelectedProduct(product);
    setStyleTipsModalOpen(true);
    setLoadingTips(true);

    const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
    const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

    const tips = await callGemini(prompt, systemPrompt);
    setStyleTips(tips);
    setLoadingTips(false);
  };

  // Filter products by category
  const sneakers = PRODUCTS.filter(p => p.category === 'sneakers');
  const luxury = PRODUCTS.filter(p => p.category === 'luxury');
  const perfumesHer = PRODUCTS.filter(p => p.category === 'perfumes_her');
  const perfumesHim = PRODUCTS.filter(p => p.category === 'perfumes_him');
  const watchesHim = PRODUCTS.filter(p => p.category === 'watches_him');
  const watchesHer = PRODUCTS.filter(p => p.category === 'watches_her');


  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />

      {/* Sneakers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">AUTHENTIC SNEAKERS</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Premium Kicks</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {sneakers.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/sneakers" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL SNEAKERS
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">LUXURY SHOES</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">High-End Fashion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {luxury.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/luxury" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL LUXURY SHOES
            </Link>
          </div>
        </div>
      </section>

      {/* Watches For Him Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">WATCHES FOR HIM</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Timeless Elegance for Men</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {watchesHim.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/watches_him" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL WATCHES FOR HIM
            </Link>
          </div>
        </div>
      </section>

      {/* Watches For Her Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">WATCHES FOR HER</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Elegant Timepieces for Women</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {watchesHer.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/watches_her" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL WATCHES FOR HER
            </Link>
          </div>
        </div>
      </section>

      {/* Perfumes Her */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">PERFUMES FOR HER</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Elegant Fragrances</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {perfumesHer.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/perfumes_her" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL PERFUMES FOR HER
            </Link>
          </div>
        </div>
      </section>

      {/* Perfumes Him */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">PERFUMES FOR HIM</h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest">Bold Scents</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {perfumesHim.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/shop/perfumes_him" className="inline-block bg-white text-black border border-black px-8 py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              VIEW ALL PERFUMES FOR HIM
            </Link>
          </div>
        </div>
      </section>



      <Testimonials />
      <Features />



      {selectedProduct && (
        <StyleTipsModal
          product={selectedProduct}
          isOpen={styleTipsModalOpen}
          onClose={() => setStyleTipsModalOpen(false)}
          tips={styleTips}
          loading={loadingTips}
        />
      )}
    </main>
  );
}
