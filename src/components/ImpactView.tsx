/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Leaf, Award, Flame, Users, Sparkles, Scale, Info, CheckCircle2, ChevronRight, Calculator, HelpCircle } from 'lucide-react';
import { initialImpactStats } from '../data';

export default function ImpactView() {
  const [stats, setStats] = useState(initialImpactStats);

  // Household Upcycling Calculator States
  const [glassBottles, setGlassBottles] = useState(3);
  const [denimJeans, setDenimJeans] = useState(2);
  const [sarees, setSarees] = useState(1);
  const [cartons, setCartons] = useState(5);

  // Calculator Multipliers (Approximate ecological impact metrics)
  // Glass bottle: 0.6 kg waste, 0.4 kg CO2 avoided
  // Denim jean: 0.8 kg waste, 2.5 kg CO2 avoided, 1500L water saved
  // Saree fabric: 0.5 kg waste, 1.2 kg CO2 avoided, 800L water saved
  // Paper carton: 0.2 kg waste, 0.1 kg CO2 avoided
  
  const calculatedWaste = Number(
    (glassBottles * 0.6 + denimJeans * 0.8 + sarees * 0.5 + cartons * 0.2).toFixed(1)
  );
  
  const calculatedCO2 = Number(
    (glassBottles * 0.4 + denimJeans * 2.5 + sarees * 1.2 + cartons * 0.1).toFixed(1)
  );

  const calculatedWater = glassBottles * 0 + denimJeans * 1500 + sarees * 800 + cartons * 5;

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Header Intro */}
      <section id="impact-intro" className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-forest uppercase tracking-wider">
          Verification & Accountability · Circular Metrics
        </div>
        <h1 className="font-display text-4xl font-bold text-earth-dark tracking-tight [text-wrap:balance]">
          Social & Ecological Impact Ledger
        </h1>
        <p className="text-sm text-earth-slate leading-relaxed">
          Every upcycled artifact on our platform represents an audited metric. We operate a direct, closed-loop ledger mapping collected waste streams to village employment registers.
        </p>
      </section>

      {/* 2. Interactive Year 1 Goals Progress Dashboard */}
      <section id="year1-progress-dashboard" className="space-y-6">
        <div className="rounded-3xl border border-[#E8E2D9] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 text-forest font-display font-bold text-lg mb-2">
            <Target className="h-5.5 w-5.5" />
            <span>Year 1 Social Impact Milestones (Live Trackers)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Goal 1: Waste Recycled */}
            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs">
                <span className="font-sans font-bold text-earth-dark flex items-center gap-1">
                  <Leaf className="h-4 w-4 text-forest" />
                  <span>Waste Recycled:</span>
                </span>
                <span className="font-mono font-extrabold text-[#A25E1A] bg-ochre/15 px-2 py-0.5 rounded">
                  {stats.wasteDivertedKg} / {stats.goals.wasteGoalKg} kg
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#F3EDE3] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-forest rounded-full transition-all duration-1000" 
                  style={{ width: `${(stats.wasteDivertedKg / stats.goals.wasteGoalKg) * 100}%` }}
                />
              </div>
              <span className="block text-[10px] text-earth-slate text-right">
                {((stats.wasteDivertedKg / stats.goals.wasteGoalKg) * 100).toFixed(0)}% Year-1 Milestone Cleared
              </span>
            </div>

            {/* Goal 2: Products Created */}
            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs">
                <span className="font-sans font-bold text-earth-dark flex items-center gap-1">
                  <Award className="h-4 w-4 text-ochre" />
                  <span>Upcycled Products Made:</span>
                </span>
                <span className="font-mono font-extrabold text-forest bg-forest/15 px-2 py-0.5 rounded">
                  {stats.productsCreated} / {stats.goals.productsGoal} units
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#F3EDE3] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-ochre rounded-full transition-all duration-1000" 
                  style={{ width: `${(stats.productsCreated / stats.goals.productsGoal) * 100}%` }}
                />
              </div>
              <span className="block text-[10px] text-earth-slate text-right">
                {((stats.productsCreated / stats.goals.productsGoal) * 100).toFixed(0)}% Design Catalog Target Complete
              </span>
            </div>

            {/* Goal 3: Women Employment */}
            <div className="space-y-2">
              <div className="flex justify-between items-end text-xs">
                <span className="font-sans font-bold text-earth-dark flex items-center gap-1">
                  <Users className="h-4 w-4 text-brown-600" />
                  <span>Rural Artisans Self-Employed:</span>
                </span>
                <span className="font-mono font-extrabold text-[#754E25] bg-[#754E25]/15 px-2 py-0.5 rounded">
                  {stats.employmentGenerated} / {stats.goals.employmentGoal} artisans
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#F3EDE3] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-700 rounded-full transition-all duration-1000" 
                  style={{ width: `${(stats.employmentGenerated / stats.goals.employmentGoal) * 100}%` }}
                />
              </div>
              <span className="block text-[10px] text-earth-slate text-right">
                {((stats.employmentGenerated / stats.goals.employmentGoal) * 100).toFixed(0)}% Household Independence Goal
              </span>
            </div>

          </div>

          <div className="bg-[#FCFAF7] border border-[#E8E2D9] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 text-xs text-earth-slate">
            <Info className="h-5 w-5 text-ochre shrink-0" />
            <p className="leading-relaxed">
              <strong>Verification Standard:</strong> These indicators are compiled monthly by the Bengal Handloom Advisory Board and Shaktipuri Rural Panchayat cooperatives. For each product sold, shipping logs calculate raw mass saved and wages disbursed directly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Interactive Household Upcycling Calculator */}
      <section id="eco-upcycling-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sliders Console */}
        <div className="lg:col-span-7 bg-[#FCFAF7] border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-earth-dark font-display font-bold text-lg border-b border-[#E8E2D9] pb-3">
            <Calculator className="h-5 w-5 text-ochre" />
            <span>Calculate My Household Upcyclability Score</span>
          </div>

          <p className="font-sans text-xs text-earth-slate leading-relaxed">
            Wondering how much ecological impact you create by donating your domestic waste streams to <strong>The Second Story Assembly Centers</strong> instead of dumping them in bin bags? Drag the sliders representing your weekly disposals:
          </p>

          <div className="space-y-5">
            {/* Slider 1: Glass Bottles */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-earth-dark">
                <span>Discarded Glass Wine/Ketchup Bottles</span>
                <span className="font-mono text-forest">{glassBottles} Bottles</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={glassBottles}
                onChange={(e) => setGlassBottles(Number(e.target.value))}
                className="w-full accent-forest h-1.5 bg-[#E8E2D9] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Old Denim Jeans */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-earth-dark">
                <span>Pre-Loved/Worn Out Denim Jeans</span>
                <span className="font-mono text-ochre">{denimJeans} Pairs</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={denimJeans}
                onChange={(e) => setDenimJeans(Number(e.target.value))}
                className="w-full accent-ochre h-1.5 bg-[#E8E2D9] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3: Silk or Cotton Sarees */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-earth-dark">
                <span>Faded Old Sarees / Cotton Clothes</span>
                <span className="font-mono text-slate-800">{sarees} Sarees</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={sarees}
                onChange={(e) => setSarees(Number(e.target.value))}
                className="w-full accent-slate-800 h-1.5 bg-[#E8E2D9] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 4: Cardboard Milk & Shipping Boxes */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-earth-dark">
                <span>Cardboard / Tetra-Pak Cartons</span>
                <span className="font-mono text-zinc-700">{cartons} Cartons</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={cartons}
                onChange={(e) => setCartons(Number(e.target.value))}
                className="w-full accent-zinc-700 h-1.5 bg-[#E8E2D9] rounded-lg cursor-pointer"
              />
            </div>
          </div>
          
          <div className="p-3.5 bg-yellow-50 rounded-xl border border-[#CC7722]/15 text-[11px] text-[#A25E1A]">
            ✨ <strong>Ready for exchange?</strong> Bring these clean items to our Kalighat Center (Kolkata) on weekends to receive high-value product vouchers in return!
          </div>
        </div>

        {/* Output Metrics Panel */}
        <div className="lg:col-span-5 bg-forest text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl shadow-forest/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="space-y-4 relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
              Your Weekly Impact Estimator
            </span>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              Earthy Salvage Coordinates
            </h3>
            <p className="font-sans text-xs text-white/80 leading-relaxed">
              If these items are routed to rural craft cooperatives instead of decaying in wet general landfill dumps, you accomplish:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 relative z-10 grow justify-center py-2">
            
            {/* Metric 1: Waste Diverted */}
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4.5 border border-white/10">
              <Scale className="h-6 w-6 text-ochre shrink-0" />
              <div>
                <span className="block font-mono text-2xl font-bold font-display">{calculatedWaste} kg</span>
                <span className="block text-[10px] text-white/70">Solid Waste Diverted from Municipal Dumps</span>
              </div>
            </div>

            {/* Metric 2: CO2 Avoided */}
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4.5 border border-white/10">
              <Flame className="h-6 w-6 text-orange-300 shrink-0" />
              <div>
                <span className="block font-mono text-2xl font-bold font-display">{calculatedCO2} kg</span>
                <span className="block text-[10px] text-white/70">Greenhouse CO2 emissions avoided</span>
              </div>
            </div>

            {/* Metric 3: Water Saved */}
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4.5 border border-white/10">
              <Leaf className="h-6 w-6 text-emerald-300 shrink-0" />
              <div>
                <span className="block font-mono text-2xl font-bold font-display">{calculatedWater.toLocaleString()} Liters</span>
                <span className="block text-[10px] text-white/70">Virtual Water footprint saved globally</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 relative z-10 text-center">
            <span className="block text-[11px] font-semibold text-[#FFECD4] italic">
              Beneficiary Cooperative Group:
            </span>
            <span className="block font-display text-xs font-bold text-white uppercase tracking-wider mt-0.5">
              {calculatedWaste > 5 ? 'Varanasi Weavers & Dharavi Kumhar Group' : 'Shaktipuri Women Tailors Group'}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Stories of Transformation (Key Case Study) */}
      <section id="impact-case-study" className="rounded-3xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2">
        <div className="aspect-video lg:aspect-auto lg:h-full bg-zinc-200">
          <img
            src="/src/assets/images/craft_denim_saree_tote_1791988805890.jpg"
            alt="Handcrafted tote bag made from reclaimed denim jeans and vintage silk saree patchwork"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-6 sm:p-12 space-y-5 justify-center flex flex-col bg-[#FCFAF7]">
          <span className="font-mono text-xs font-bold text-[#A25E1A]">Transformation Lifecycle</span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-earth-dark leading-tight">
            The Journey of a Denim Tear
          </h3>
          <p className="font-sans text-xs sm:text-sm text-earth-slate leading-relaxed">
            Standard industrial cotton denim is legendary for its water-heavy manufacturing footstep, requiring 10,000 liters of pristine groundwater for a single pair of pants. Once ripped, millions of these high-durability jeans are binned.
          </p>
          <div className="space-y-3.5">
            {[
              { title: 'Collection & Sanitization', desc: 'Denim drives scheduled with green colleges strip the metal rivets and sanitize the fabric safely utilizing herbal distillates.' },
              { title: 'Local Tailoring Blocks', desc: 'Draped pieces are divided and assigned to partnering single mothers in the Shaktipuri Rural craft cluster.' },
              { title: 'Finished Masterpiece', desc: 'Patches are blockprinted in classical patterns to produce robust bags, picture borders, and festival collections.' }
            ].map((step, sIdx) => (
              <div key={sIdx} className="flex gap-3">
                <CheckCircle2 className="h-4.5 w-4.5 text-forest shrink-0 mt-0.5" />
                <div>
                  <span className="block font-display text-xs font-bold text-earth-dark leading-none">{step.title}</span>
                  <span className="block font-sans text-[11px] text-earth-slate tracking-wide mt-1 leading-normal">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO Social & Ecological Impact Knowledge Section */}
      <section id="impact-aeo-knowledge" className="rounded-3xl border border-[#CC7722]/20 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-ochre uppercase tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>AEO Impact Accountability & Verification Query</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              How Does The Second Story Measure Its Environmental and Social Impact?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              Our impact framework tracks verified metrics across four core indicators: kilograms of waste diverted from dumping grounds, units of carbon dioxide emissions avoided through localized reuse, volume of water saved against virgin manufacturing, and fair-wage work hours provided to women artisans. All data is reconciled bi-weekly with partnering recycling facilities and self-help cooperatives.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E2D9]">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              What Are the Social Impact Targets for Year One?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              The Second Story is committed to recycling over 5,000 kilograms of non-biodegradable waste, creating 100+ sustainable handcrafted products monthly, conducting 50 public workshops, and sustaining dignified, permanent employment for 20+ marginalized women artisans. Achieving these milestones diverts hazardous material from open-air burning while uplifting rural household incomes by 40%.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
