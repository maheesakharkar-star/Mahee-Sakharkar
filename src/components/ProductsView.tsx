/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Leaf, 
  Gift, 
  Sparkles, 
  Check, 
  ArrowRight, 
  X, 
  Info, 
  Tag, 
  Users, 
  Scale, 
  Calculator 
} from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, customizationNote?: string) => void;
  selectedProductFromHome?: Product | null;
  setSelectedProductFromHome: (p: Product | null) => void;
}

export default function ProductsView({ 
  products, 
  onAddToCart, 
  selectedProductFromHome, 
  setSelectedProductFromHome 
}: ProductsViewProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'decor' | 'corporate' | 'custom' | 'festival'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Customization note & Quantity state for modal details
  const [customNote, setCustomNote] = useState('');
  const [qty, setQty] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState(false);

  // Bulk inquiry & calculator state
  const [bulkQty, setBulkQty] = useState<number>(100);
  const [bulkName, setBulkName] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkCompany, setBulkCompany] = useState('');
  const [bulkType, setBulkType] = useState('corporate');
  const [bulkDesc, setBulkDesc] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Check if there's any active product passed from the home screen
  if (selectedProductFromHome && !selectedProduct) {
    setSelectedProduct(selectedProductFromHome);
    setSelectedProductFromHome(null); // Clear reference
  }

  // Categories list
  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'decor', label: 'Home Décor' },
    { id: 'corporate', label: 'Corporate Gifting' },
    { id: 'custom', label: 'Customized Gifts' },
    { id: 'festival', label: 'Festival Collections' },
  ];

  // Filter items
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.originalMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setCustomNote('');
    setQty(1);
    setFeedbackMsg(false);
  };

  const handleAddToCartSubmit = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, qty, customNote);
      setFeedbackMsg(true);
      setTimeout(() => {
        setFeedbackMsg(false);
        setSelectedProduct(null);
      }, 1400);
    }
  };

  const handleBulkSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newInquiry = {
      id: 'bulk-' + Date.now(),
      fullName: bulkName,
      email: bulkEmail,
      company: bulkCompany,
      quantity: bulkQty,
      giftingType: bulkType,
      customRequirements: bulkDesc,
      submittedDate: new Date().toISOString()
    };
    
    const existingInquiries = JSON.parse(localStorage.getItem('second_story_bulk_inquiries') || '[]');
    existingInquiries.push(newInquiry);
    localStorage.setItem('second_story_bulk_inquiries', JSON.stringify(existingInquiries));

    setBulkSuccess(true);
    setBulkName('');
    setBulkEmail('');
    setBulkCompany('');
    setBulkDesc('');
    
    setTimeout(() => {
      setBulkSuccess(false);
    }, 5000);
  };

  // Bulk dynamic calculation estimates
  const bulkDiscountPercent = bulkQty >= 250 ? 25 : bulkQty >= 100 ? 15 : 10;
  const bulkEstimatedWasteKg = Math.round(bulkQty * 1.8);
  const bulkArtisanWorkdays = Math.round(bulkQty * 0.4);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Search and Category Filter Section */}
      <section id="products-filters" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-earth-slate" />
            <input
              type="text"
              placeholder="Search by material (denim, glass...), name, or craft group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E8E2D9] bg-white py-2.5 pl-10 pr-4 text-sm text-earth-dark placeholder-earth-slate focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest shadow-sm"
            />
          </div>
          
          <div className="text-xs text-earth-slate font-medium">
            Showing <span className="font-bold text-earth-dark font-mono tabular-nums">{filteredProducts.length}</span> handcrafted upcycled creations
          </div>
        </div>

        {/* Clean Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F3EDE3] rounded-xl overflow-x-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-forest shadow-sm font-bold'
                    : 'text-earth-slate hover:text-earth-dark'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-catalog" className="space-y-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-white border border-[#E8E2D9] space-y-4">
            <Info className="h-10 w-10 text-ochre mx-auto" />
            <p className="font-display font-semibold text-lg text-earth-dark">No Sustainable Creations Found</p>
            <p className="text-xs text-earth-slate max-w-sm mx-auto">
              We are actively developing new lines with our artisan collectives. Try clearing your search query.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
              className="rounded-lg bg-forest px-4.5 py-2 text-xs font-bold text-white transition-all hover:bg-forest/90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                onClick={() => handleOpenDetails(product)}
              >
                <div>
                  {/* Uniform 4:3 Aspect Ratio Product Image */}
                  <div className="relative aspect-[4/3] w-full bg-[#F3EDE3] overflow-hidden border-b border-[#E8E2D9]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded text-xs font-bold font-mono text-earth-dark border border-[#E8E2D9] tabular-nums">
                      ${product.price}
                    </div>
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-earth-slate">
                      <span>{product.originalMaterial.split('&')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-forest font-semibold">{product.wasteDivertedKg} kg Diverted</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-earth-dark group-hover:text-forest transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-earth-slate line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#F1ECE4] flex items-center justify-between text-xs">
                  <span className="text-earth-slate text-[11px] truncate max-w-[150px]">
                    By {product.artisanGroup.split(',')[0]}
                  </span>
                  <span className="font-semibold text-forest flex items-center gap-1 group-hover:underline">
                    <span>Inspect & Personalize</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Corporate & Bulk Inquiry with Interactive Impact Estimator */}
      <section id="corporate-bulk-inquiry" className="rounded-3xl border border-[#E8E2D9] bg-[#1F1916] text-[#EBE6E0] p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          
          <div className="lg:col-span-5 space-y-5 justify-between flex flex-col">
            <div className="space-y-4">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-forest/30 text-forest">
                <Gift className="h-5 w-5" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Corporate & Bulk Gifting Solutions
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-[#BDB5AC]">
                Elevate your company gifting with bespoke, zero-waste hampers crafted from industrial textile overstock, discarded glass, and reclaimed woods. Every unit is packaged with an individualized artisan story tag and verified carbon audit.
              </p>
            </div>

            {/* Interactive Live Volume & ESG Estimator */}
            <div className="bg-[#29211C] border border-[#3E332C] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Calculator className="h-4 w-4 text-ochre" />
                  <span>Interactive Order Volume:</span>
                </span>
                <span className="font-mono text-ochre font-bold text-sm tabular-nums">
                  {bulkQty} Units
                </span>
              </div>

              <input
                type="range"
                min="25"
                max="500"
                step="25"
                value={bulkQty}
                onChange={(e) => setBulkQty(Number(e.target.value))}
                className="w-full accent-forest h-1.5 bg-[#4E4138] rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#3E332C] text-center">
                <div className="p-2 bg-[#1E1612] rounded-lg">
                  <span className="block font-mono text-sm font-bold text-forest">{bulkDiscountPercent}%</span>
                  <span className="block text-[10px] text-[#A69C90] mt-0.5">Bulk Savings</span>
                </div>
                <div className="p-2 bg-[#1E1612] rounded-lg">
                  <span className="block font-mono text-sm font-bold text-white tabular-nums">{bulkEstimatedWasteKg} kg</span>
                  <span className="block text-[10px] text-[#A69C90] mt-0.5">ESG Waste Diverted</span>
                </div>
                <div className="p-2 bg-[#1E1612] rounded-lg">
                  <span className="block font-mono text-sm font-bold text-ochre tabular-nums">{bulkArtisanWorkdays}</span>
                  <span className="block text-[10px] text-[#A69C90] mt-0.5">Artisan Workdays</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#29211C] border border-[#3E332C] rounded-2xl p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-white mb-4">Request a Customized ESG Quote</h3>
            
            <form onSubmit={handleBulkSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#BDB5AC] uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={bulkName}
                    onChange={(e) => setBulkName(e.target.value)}
                    className="w-full rounded-xl border border-[#4E4138] bg-[#1E1612] px-3.5 py-2.5 text-xs text-white focus:border-forest focus:outline-none"
                    placeholder="Priya Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#BDB5AC] uppercase tracking-wider mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={bulkEmail}
                    onChange={(e) => setBulkEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#4E4138] bg-[#1E1612] px-3.5 py-2.5 text-xs text-white focus:border-forest focus:outline-none"
                    placeholder="priya@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#BDB5AC] uppercase tracking-wider mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={bulkCompany}
                    onChange={(e) => setBulkCompany(e.target.value)}
                    className="w-full rounded-xl border border-[#4E4138] bg-[#1E1612] px-3.5 py-2.5 text-xs text-white focus:border-forest focus:outline-none"
                    placeholder="Green Systems Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#BDB5AC] uppercase tracking-wider mb-1">Occasion / Theme</label>
                  <select
                    value={bulkType}
                    onChange={(e) => setBulkType(e.target.value)}
                    className="w-full rounded-xl border border-[#4E4138] bg-[#1E1612] px-3.5 py-2.5 text-xs text-white focus:border-forest focus:outline-none"
                  >
                    <option value="corporate">Annual Corporate Gifting</option>
                    <option value="conference">Sustainable Conference Kits</option>
                    <option value="diwali">Festive & Diwali Hampers</option>
                    <option value="wedding">Eco-Conscious Wedding Favors</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#BDB5AC] uppercase tracking-wider mb-1">Design & Customization Notes</label>
                <textarea
                  rows={3}
                  value={bulkDesc}
                  onChange={(e) => setBulkDesc(e.target.value)}
                  placeholder="Tell us about company logo embossing, required delivery dates, or specific waste streams preferred..."
                  className="w-full rounded-xl border border-[#4E4138] bg-[#1E1612] px-3.5 py-2.5 text-xs text-white focus:border-forest focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center font-semibold py-3 bg-forest hover:bg-forest/90 text-white rounded-xl shadow-md transition-all text-xs"
              >
                Send Request for {bulkQty} Units
              </button>

              <AnimatePresence>
                {bulkSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-forest/20 text-emerald-300 rounded-xl border border-forest/35 text-xs"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Inquiry received! Our corporate artisan coordinator will send design mockups within 24 hours.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>

      {/* Individual Product Customization Details Dialog Panel */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white text-earth-dark border border-[#E8E2D9] max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-[#F3EDE3] text-earth-dark hover:bg-forest hover:text-white transition-all"
                aria-label="Close Modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-4">
                
                {/* Modal Visual Block with Live Inscription Tag Preview */}
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F3EDE3] border border-[#E8E2D9]">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-earth-dark border border-[#E8E2D9]">
                      Salvage Base: {selectedProduct.originalMaterial.split('&')[0]}
                    </div>
                  </div>

                  {/* Live Interactive Artisan Dedication Tag Preview */}
                  <div className="p-3.5 rounded-xl bg-[#FCFAF7] border border-[#E8E2D9] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-earth-slate">
                      <span className="flex items-center gap-1 text-ochre">
                        <Tag className="h-3.5 w-3.5" />
                        <span>Artisan Dedication Tag Preview:</span>
                      </span>
                      <span className="font-mono text-[10px] text-forest">Attached Free</span>
                    </div>
                    <div className="bg-[#FAF6F0] border border-dashed border-[#D5C7B7] p-2.5 rounded-lg text-xs italic font-serif text-earth-dark">
                      "{customNote.trim() ? customNote : 'Handcrafted for conscious living — The Second Story'}"
                    </div>
                  </div>
                </div>

                {/* Modal Actions and Specifications */}
                <div className="space-y-4 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-[11px] text-forest font-semibold uppercase tracking-wider">
                      {selectedProduct.category}
                    </div>
                    <h3 className="font-display font-bold text-xl text-earth-dark leading-tight mt-1">
                      {selectedProduct.name}
                    </h3>
                    <div className="font-mono text-lg font-bold text-earth-dark mt-1 tabular-nums">
                      ${selectedProduct.price}
                    </div>
                    
                    <p className="text-xs text-earth-slate mt-2 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Detailed Specifications */}
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-[#F1ECE4]">
                      <span className="text-[11px] font-bold text-earth-dark uppercase tracking-wider block">
                        Craft Heritage & Impact:
                      </span>
                      <ul className="text-xs text-earth-slate space-y-1">
                        {selectedProduct.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <span className="text-forest mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                        <li className="flex items-start gap-1.5 text-forest font-medium">
                          <span>•</span>
                          <span>Diverts {selectedProduct.wasteDivertedKg} kg directly from landfills</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Custom Inscription & Add to Bag */}
                  <div className="border-t border-[#F1ECE4] pt-4 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-earth-dark mb-1">
                        Free Custom Inscription / Gift Note:
                      </label>
                      <input
                        type="text"
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        placeholder="E.g., Inscribe 'For Elena's New Home'"
                        className="w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-2 text-xs text-earth-dark placeholder-earth-slate focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-24">
                        <label className="block text-[11px] font-semibold text-earth-dark mb-1">Quantity:</label>
                        <div className="flex items-center border border-[#E8E2D9] rounded-lg overflow-hidden bg-white">
                          <button 
                            type="button" 
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            className="w-8 h-8 flex items-center justify-center text-earth-slate hover:bg-[#F3EDE3] font-bold"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-mono text-xs font-bold text-earth-dark">{qty}</span>
                          <button 
                            type="button" 
                            onClick={() => setQty(qty + 1)}
                            className="w-8 h-8 flex items-center justify-center text-earth-slate hover:bg-[#F3EDE3] font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 self-end">
                        <button
                          type="button"
                          onClick={handleAddToCartSubmit}
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-forest py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-forest/90 active:scale-[0.98]"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {feedbackMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1.5 justify-center p-2 bg-forest/10 text-forest rounded-lg text-xs font-semibold"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Added to your bag!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
