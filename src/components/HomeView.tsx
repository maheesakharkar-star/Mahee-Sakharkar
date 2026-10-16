/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Flame, 
  Droplet, 
  HelpCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Product, Workshop } from '../types';
import { materialTransformations } from '../data';

interface HomeViewProps {
  products: Product[];
  workshops: Workshop[];
  setActiveTab: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectWorkshop: (workshop: Workshop) => void;
  navigate: (path: string) => void;
}

export default function HomeView({ 
  products, 
  workshops, 
  setActiveTab, 
  onSelectProduct, 
  onSelectWorkshop,
  navigate
}: HomeViewProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('trans-glass');

  // Featured creations
  const featuredProducts = products.slice(0, 3);
  const upcomingWorkshops = workshops.slice(0, 2);

  const activeTransformation = materialTransformations.find(
    (t) => t.id === selectedMaterialId
  ) || materialTransformations[0];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Storefront Hero Section */}
      <section id="hero-banner" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left 7 Columns: Editorial Headline and Lead Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-forest tracking-wide">
            <span>Every Waste Has a Worth</span>
            <span aria-hidden="true" className="text-earth-slate/40">·</span>
            <span>Circular Craft Collective</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-earth-dark leading-[1.08] [text-wrap:balance]">
            Transforming Discarded Waste into <span className="text-ochre italic font-serif">Handcrafted</span> Masterpieces.
          </h1>

          <p className="text-base sm:text-lg text-earth-slate leading-relaxed max-w-2xl font-normal">
            We co-create sustainable home décor, corporate gifts, and circular learning experiences alongside skilled women artisans and marginalized communities. Because we believe, truly, that every waste has a story waiting to be told.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/products"
              onClick={(e) => { e.preventDefault(); navigate('/products'); }}
              className="inline-flex items-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-forest/90 transition-all active:scale-[0.98]"
              title="Explore sustainable products collection"
            >
              <span>Explore Upcycled Products</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/activities"
              onClick={(e) => { e.preventDefault(); navigate('/activities'); }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#D8D0C5] bg-white px-6 py-3.5 text-sm font-semibold text-earth-dark hover:border-earth-dark transition-all"
              title="Book sustainability workshops and tours"
            >
              <span>Book Workshops & Eco Tours</span>
            </a>
          </div>

          {/* Proof Strip */}
          <div className="pt-6 border-t border-[#E8E2D9] grid grid-cols-3 gap-4 text-left">
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-earth-dark tabular-nums">5,320 kg</span>
              <span className="block text-xs text-earth-slate mt-0.5">Waste Diverted</span>
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-forest tabular-nums">24 Artisans</span>
              <span className="block text-xs text-earth-slate mt-0.5">Livelihoods Sustained</span>
            </div>
            <div>
              <span className="block font-mono text-xl sm:text-2xl font-bold text-ochre tabular-nums">1,420+</span>
              <span className="block text-xs text-earth-slate mt-0.5">Creations Shipped</span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Visual Hero Window */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] lg:aspect-[5/6] rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm bg-[#F3EDE3]">
            <img 
              src="/src/assets/images/hero_artisanal_workshop_1791988805254.jpg" 
              alt="Artisanal upcycling studio with sunlight, reclaimed glass bottles, handloom textiles, and craft tools" 
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFECD4]">
                The Workshop
              </span>
              <h3 className="font-display text-lg font-bold mt-1 text-white">
                Handcrafting with Dignity & Ecological Care
              </h3>
              <p className="text-xs text-white/80 mt-1 line-clamp-2">
                Shaktipuri Rural Craft Cluster, West Bengal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AEO QUESTION & ANSWER SECTION 1: Direct Answer for Search Engines & Users */}
      <section id="aeo-answer-transformation" className="rounded-3xl border border-[#CC7722]/20 bg-gradient-to-br from-[#FFFDF8] via-white to-[#F9F6F0] p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-ochre uppercase tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>AEO Knowledge Query · Circular Economy</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-earth-dark tracking-tight [text-wrap:balance]">
          How Does Upcycling Transform Domestic Waste Into Social Wealth?
        </h2>
        <p className="text-sm sm:text-base text-earth-slate leading-relaxed font-sans">
          Upcycling diverts post-consumer materials from municipal landfills and channels them directly into handcrafted artisan production. By collecting discarded wine bottles, temple coconut shells, and industrial denim offcuts, The Second Story prevents over 5,320 kg of municipal waste while generating dignified, 40%-above-average fair wages for rural women craft collectives. Every item produced not only cuts raw industrial extraction emissions, but also funds children's schooling and healthcare across 8 underserved artisan villages.
        </p>
        <div className="pt-2 flex flex-wrap gap-6 text-xs text-earth-slate border-t border-[#E8E2D9]/70">
          <div className="flex items-center gap-1.5 font-medium text-forest">
            <CheckCircle2 className="h-4 w-4" />
            <span>Zero Virgin Plastic Extraction</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-ochre">
            <CheckCircle2 className="h-4 w-4" />
            <span>Guaranteed Fair Livelihoods</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-earth-dark">
            <CheckCircle2 className="h-4 w-4" />
            <span>100% Traceable Circular Supply Chains</span>
          </div>
        </div>
      </section>

      {/* 2. Interactive "Waste to Worth" Metamorphosis Explorer */}
      <section id="waste-to-worth-studio" className="rounded-3xl border border-[#E8E2D9] bg-white p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-ochre uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Material Studio</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-earth-dark tracking-tight [text-wrap:balance]">
              How Discarded Waste Becomes a Treasured Story
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-earth-slate max-w-md">
            Click on any discarded domestic or industrial waste stream below to trace its metamorphosis into a finished artisanal keepsake.
          </p>
        </div>

        {/* Interactive Material Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {materialTransformations.map((trans) => {
            const isSelected = trans.id === selectedMaterialId;
            return (
              <button
                key={trans.id}
                onClick={() => setSelectedMaterialId(trans.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected 
                    ? 'border-forest bg-forest/5 shadow-sm' 
                    : 'border-[#E8E2D9] bg-[#FCFAF7] hover:border-earth-dark/40 hover:bg-white'
                }`}
              >
                <span className="block text-[11px] font-mono text-earth-slate/75 uppercase tracking-wide">
                  Raw Stream
                </span>
                <span className={`block text-xs sm:text-sm font-semibold mt-1 leading-snug ${
                  isSelected ? 'text-forest font-bold' : 'text-earth-dark'
                }`}>
                  {trans.rawMaterial}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Transformation Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTransformation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FCFAF7] border border-[#E8E2D9] rounded-2xl p-6 sm:p-8"
          >
            {/* Left 5 Cols: Resulting Product Photography */}
            <div className="lg:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#E8E2D9] bg-white">
              <img
                src={activeTransformation.image}
                alt={`Upcycled ${activeTransformation.endProductTitle} made from ${activeTransformation.rawMaterial}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-earth-dark border border-[#E8E2D9]">
                {activeTransformation.endProductCategory}
              </div>
            </div>

            {/* Right 7 Cols: Process and Impact Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs text-forest font-semibold mb-1">
                  Metamorphosis Outcome
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-earth-dark">
                  {activeTransformation.endProductTitle}
                </h3>
                <p className="text-xs text-earth-slate mt-1">
                  Sourced from: <strong className="text-earth-dark font-medium">{activeTransformation.wasteSource}</strong>
                </p>
                <p className="text-xs text-earth-slate">
                  Handcrafted by: <strong className="text-earth-dark font-medium">{activeTransformation.artisanCluster}</strong>
                </p>
              </div>

              {/* Step-by-Step Craft Process */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-earth-slate font-bold block">
                  Artisanal Transformation Steps:
                </span>
                <div className="space-y-2">
                  {activeTransformation.craftProcess.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-earth-slate">
                      <div className="h-5 w-5 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        {sIdx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Figures for this item */}
              <div className="pt-4 border-t border-[#E8E2D9] flex flex-wrap gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-ochre shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-earth-dark">{activeTransformation.impactFacts.wasteDivertedKg} kg</span>
                    <span className="text-earth-slate ml-1">Waste Diverted</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500 shrink-0" />
                  <div>
                    <span className="font-mono font-bold text-earth-dark">{activeTransformation.impactFacts.co2AvoidedKg} kg</span>
                    <span className="text-earth-slate ml-1">CO₂ Prevented</span>
                  </div>
                </div>

                {activeTransformation.impactFacts.waterSavedLiters && (
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-blue-500 shrink-0" />
                    <div>
                      <span className="font-mono font-bold text-earth-dark">{activeTransformation.impactFacts.waterSavedLiters.toLocaleString()} L</span>
                      <span className="text-earth-slate ml-1">Water Saved</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <a
                  href="/products"
                  onClick={(e) => { e.preventDefault(); navigate('/products'); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-ochre transition-colors"
                  title="View this upcycled design in our store"
                >
                  <span>Explore this design in our collection</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* AEO QUESTION & ANSWER SECTION 2: Direct Answer for Search Engines & Users */}
      <section id="aeo-answer-usp" className="rounded-3xl border border-forest/20 bg-gradient-to-br from-[#F5F9F5] via-white to-[#FAF6EE] p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-forest uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>AEO Authenticity Standards · Verified Traceability</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-earth-dark tracking-tight [text-wrap:balance]">
          What Makes The Second Story's Sustainable Products Unique?
        </h2>
        <p className="text-sm sm:text-base text-earth-slate leading-relaxed font-sans">
          Every product handcrafted by The Second Story carries a verified origin trail documenting the raw waste diverted and the artisan collective that made it. Unlike mass-manufactured sustainable items, our collections blend heritage Indian craft traditions—such as Bengal handloom embroidery and Odisha shell carving—with rigorous zero-waste material circularity. Customers receive full transparency regarding kilograms of waste redirected, CO₂ emissions prevented, and individual women artisans supported.
        </p>
      </section>

      {/* 3. Featured Products Grid */}
      <section id="featured-products" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-4">
          <div>
            <span className="text-xs font-semibold text-forest uppercase tracking-wider block">
              Curated Waste-to-Worth
            </span>
            <h2 className="font-display text-3xl font-bold text-earth-dark tracking-tight mt-1">
              Featured Creations
            </h2>
          </div>
          <a
            href="/products"
            onClick={(e) => { e.preventDefault(); navigate('/products'); }}
            className="flex items-center gap-1 text-xs font-bold text-forest hover:text-ochre transition-colors"
            title="Browse all sustainable products"
          >
            <span>View All Handcrafted Products</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              onClick={() => onSelectProduct(product)}
            >
              <div>
                {/* 4:3 Aspect Ratio Product Image */}
                <div className="relative aspect-[4/3] w-full bg-[#F3EDE3] overflow-hidden border-b border-[#E8E2D9]">
                  <img 
                    src={product.image} 
                    alt={product.imageAlt || product.name} 
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded text-xs font-bold font-mono text-earth-dark border border-[#E8E2D9] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-[11px] text-earth-slate">
                    <span>{product.originalMaterial.split('&')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-forest font-medium">{product.wasteDivertedKg} kg Diverted</span>
                  </div>

                  <h3 className="font-display text-base font-bold text-earth-dark group-hover:text-forest transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-xs text-earth-slate leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#F1ECE4] flex items-center justify-between text-xs">
                <span className="text-earth-slate text-[11px]">
                  By: {product.artisanGroup.split(',')[0]}
                </span>
                <span className="font-semibold text-forest flex items-center gap-1 group-hover:underline">
                  <span>View Product Details</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Upcoming Educational Workshops */}
      <section id="upcoming-workshops" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-4">
          <div>
            <span className="text-xs font-semibold text-ochre uppercase tracking-wider block">
              Education & Immersion
            </span>
            <h2 className="font-display text-3xl font-bold text-earth-dark tracking-tight mt-1">
              Upcoming Workshops & Tours
            </h2>
          </div>
          <a
            href="/activities"
            onClick={(e) => { e.preventDefault(); navigate('/activities'); }}
            className="flex items-center gap-1 text-xs font-bold text-forest hover:text-ochre transition-colors"
            title="Browse full calendar of eco tours and workshops"
          >
            <span>Browse Full Educational Calendar</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm flex flex-col sm:flex-row transition-all hover:border-forest/40"
            >
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto bg-[#F3EDE3] overflow-hidden shrink-0">
                <img 
                  src={workshop.image} 
                  alt={workshop.imageAlt || workshop.title} 
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/95 px-2 py-0.5 rounded text-xs font-bold font-mono text-earth-dark border border-[#E8E2D9] tabular-nums">
                  ₹{workshop.price.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-earth-slate">
                    <span>{workshop.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{workshop.duration}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-earth-dark leading-snug">
                    {workshop.title}
                  </h3>
                  <p className="line-clamp-2 text-xs text-earth-slate leading-relaxed">
                    {workshop.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#F1ECE4] pt-4">
                  <span className="text-xs font-mono text-ochre font-semibold">
                    {workshop.maxSeats - workshop.seatsBooked} seats remaining
                  </span>
                  <button
                    onClick={() => onSelectWorkshop(workshop)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-forest px-3.5 py-1.5 rounded-lg hover:bg-forest/90 transition-all"
                  >
                    <span>Reserve Seat</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Core Brand Promise & Community Voice */}
      <section id="brand-promise" className="rounded-2xl border border-[#E8E2D9] bg-[#FCFAF7] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-semibold text-forest uppercase tracking-widest block">
          Our Guiding Conviction
        </span>
        <blockquote className="font-display text-2xl sm:text-3xl font-bold italic text-earth-dark leading-snug [text-wrap:balance]">
          "We don't just recycle waste—we create opportunities, stories, and a greener future."
        </blockquote>
        <p className="text-xs text-earth-slate">
          Co-designed with rural artisans, women's self-help collectives, and conscious consumers.
        </p>
      </section>

    </div>
  );
}
