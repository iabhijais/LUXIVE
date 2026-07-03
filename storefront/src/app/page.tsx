"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Gem, MessageCircle, ShieldCheck, Sparkles, Timer } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { callGemini } from '../utils/gemini';
import type { Product } from '../types/product';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';

import StyleTipsModal from '../components/StyleTipsModal';

const STATS = [
  { value: '6', label: 'Premium departments' },
  { value: '24/7', label: 'WhatsApp concierge' },
  { value: 'AI', label: 'Personal styling help' },
  { value: 'PAN', label: 'India delivery support' },
];

const COLLECTION_GATEWAYS = [
  {
    title: 'Sneaker Vault',
    copy: 'Hype releases, everyday heat, and luxury trainers sourced for statement rotation.',
    href: '/shop/sneakers',
    image: '/lv-runner-tatic.png',
  },
  {
    title: 'Fragrance Room',
    copy: "Men's and women's scents with cleaner discovery and gifting-ready presentation.",
    href: '/shop/perfumes_him',
    image: '/creed-aventus.png',
  },
  {
    title: 'Watch Edit',
    copy: 'Premium daily watches and high-presence designs for polished finishing touches.',
    href: '/shop/watches_him',
    image: '/PREMIUM WATCHES MEN/Tag_Heuer Aquaracer GMT Automatic AAA 42000 X 6499/682850dbe2b7c2.jpeg',
  },
];

export default function Home() {

  const [styleTipsModalOpen, setStyleTipsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [styleTips, setStyleTips] = useState("");
  const [loadingTips, setLoadingTips] = useState(false);

  const handleGetStyleTips = async (product: Product) => {
    setSelectedProduct(product);
    setStyleTipsModalOpen(true);
    setLoadingTips(true);

    const prompt = `I am considering buying the "${product.title}" (${product.category}). Give me 3 short, stylish outfit ideas to pair with this.`;
    const systemPrompt = "You are a high-end fashion stylist. Be concise, trendy, and use bullet points.";

    const tips = await callGemini(prompt, systemPrompt);
    setStyleTips(tips);
    setLoadingTips(false);
  };

  const sneakers = PRODUCTS.filter(p => p.category === 'sneakers');
  const luxury = PRODUCTS.filter(p => p.category === 'luxury');
  const perfumesHer = PRODUCTS.filter(p => p.category === 'perfumes_her');
  const perfumesHim = PRODUCTS.filter(p => p.category === 'perfumes_him');
  const watchesHim = PRODUCTS.filter(p => p.category === 'watches_him');
  const watchesHer = PRODUCTS.filter(p => p.category === 'watches_her');

  const productSections = [
    {
      eyebrow: 'The drop wall',
      title: 'Authentic Sneakers',
      description: 'Collector-grade silhouettes, verified hype pairs, and premium everyday rotations with a sharper catalog experience.',
      href: '/shop/sneakers',
      actionLabel: 'View sneakers',
      products: sneakers,
    },
    {
      eyebrow: 'Designer energy',
      title: 'Luxury Shoes',
      description: 'Statement trainers and fashion-forward pairs presented like a boutique edit, not a crowded discount shelf.',
      href: '/shop/luxury',
      actionLabel: 'View luxury',
      products: luxury,
    },
    {
      eyebrow: 'Wrist presence',
      title: 'Watches for Him',
      description: 'Chronographs, sport styles, and premium daily watches for clean outfit finishing.',
      href: '/shop/watches_him',
      actionLabel: 'View watches',
      products: watchesHim,
    },
    {
      eyebrow: 'Elegant details',
      title: 'Watches for Her',
      description: 'Polished timepieces with gifting-friendly pricing and elevated product discovery.',
      href: '/shop/watches_her',
      actionLabel: 'View watches',
      products: watchesHer,
    },
    {
      eyebrow: 'Scent wardrobe',
      title: 'Perfumes for Her',
      description: 'A refined fragrance lineup with romantic, fresh, and evening-ready options.',
      href: '/shop/perfumes_her',
      actionLabel: 'View perfumes',
      products: perfumesHer,
    },
    {
      eyebrow: 'Signature trails',
      title: 'Perfumes for Him',
      description: 'Bold, fresh, and luxury-inspired scents built for daily wear and standout nights.',
      href: '/shop/perfumes_him',
      actionLabel: 'View perfumes',
      products: perfumesHim,
    },
  ];

  return (
    <main className="min-h-screen luxury-noise">
      <HeroSlider />

      <section className="border-b border-black/10 bg-[#12100d] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
          {STATS.map(stat => (
            <div key={stat.label} className="bg-[#12100d] px-4 py-6 text-center md:py-8">
              <p className="text-2xl font-semibold tracking-[-0.04em] md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/56 md:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbfbf8] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#9d7b32]">Client-ready luxury storefront</p>
            <h2 className="text-3xl font-semibold tracking-[-0.045em] text-[#12100d] md:text-5xl">
              Boutique polish with commerce flows already wired in.
            </h2>
            <p className="mt-4 text-sm leading-6 text-black/58 md:text-base">
              LUXIVE now opens with a premium brand system, stronger product discovery, AI styling hooks, wishlist/cart actions, and mobile-first touch targets.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {COLLECTION_GATEWAYS.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative min-h-[360px] overflow-hidden rounded-[8px] bg-[#12100d] text-white shadow-[0_24px_60px_rgba(18,16,13,0.12)]"
              >
                <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.82] transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,13,0.08)_0%,rgba(18,16,13,0.35)_42%,rgba(18,16,13,0.88)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b45f]">Explore</p>
                  <h3 className="text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{item.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                    Open collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-4 md:px-8">
          {[
            { icon: ShieldCheck, title: 'Curated authenticity', copy: 'Premium picks presented with a cleaner purchase path.' },
            { icon: Bot, title: 'Gemini stylist', copy: 'AI-assisted outfit and scent guidance from the product grid.' },
            { icon: MessageCircle, title: 'WhatsApp checkout', copy: 'Fast assisted checkout for Indian luxury shoppers.' },
            { icon: Timer, title: 'Mobile ready', copy: 'Touch-safe UI with Safari-friendly viewport handling.' },
          ].map(item => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex gap-4 border-black/10 md:border-r md:pr-5 md:last:border-r-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12100d] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.17em] text-[#12100d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/56">{item.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {productSections.map((section, index) => (
        <section
          key={section.href}
          className={`relative overflow-hidden py-16 md:py-24 ${index % 2 === 1 ? 'bg-[#12100d] text-white' : 'bg-[#fbfbf8] text-[#12100d]'}`}
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={`mb-3 text-[11px] font-bold uppercase tracking-[0.28em] ${index % 2 === 1 ? 'text-[#d4b45f]' : 'text-[#9d7b32]'}`}>
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">{section.title}</h2>
                <p className={`mt-4 text-sm leading-6 md:text-base ${index % 2 === 1 ? 'text-white/66' : 'text-black/58'}`}>
                  {section.description}
                </p>
              </div>
              <Link
                href={section.href}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-xs font-bold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 ${index % 2 === 1 ? 'border border-white/22 text-white hover:bg-white hover:text-[#12100d]' : 'border border-black/12 bg-white text-[#12100d] hover:border-[#12100d]'}`}
              >
                {section.actionLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 lg:gap-6">
              {section.products.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} onGetTips={handleGetStyleTips} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#fbfbf8] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid overflow-hidden rounded-[8px] bg-[#12100d] text-white md:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10 lg:p-14">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4b45f]">AI concierge</p>
              <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-5xl">LuxeBot turns browsing into styling.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/66 md:text-base">
                Shoppers can ask for outfit ideas, scent suggestions, and product guidance directly from the catalog. It makes the site feel assisted, premium, and conversion-focused.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Catalog-aware', 'Short answers', 'WhatsApp handoff'].map(item => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/16 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/78">
                    <Sparkles className="h-3.5 w-3.5 text-[#d4b45f]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] bg-[#f1eee7]">
              <img src="/lv-beverly-hills.png" alt="Luxury product styling" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,13,0)_0%,rgba(18,16,13,0.62)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/16 bg-white/12 p-4 text-sm text-white backdrop-blur">
                <Gem className="mb-3 h-5 w-5 text-[#d4b45f]" />
                Ask: &quot;Style me for a premium dinner look under Rs. 20,000.&quot;
              </div>
            </div>
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
