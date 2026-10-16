/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Globe, Key, Search, FileText, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import ActivitiesView from './components/ActivitiesView';
import ImpactView from './components/ImpactView';
import GetInvolvedView from './components/GetInvolvedView';
import BlogView from './components/BlogView';
import CartDrawer from './components/CartDrawer';

import { Product, Workshop, CartItem } from './types';
import { productsData, workshopsData, toursData } from './data';
import { siteSeoRegistry } from './seoData';
import { updatePageSeo } from './utils/seo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSeoInspectorOpen, setIsSeoInspectorOpen] = useState<boolean>(false);

  // Deep linking bridges to open custom detail triggers across sections
  const [selectedProductFromHome, setSelectedProductFromHome] = useState<Product | null>(null);
  const [selectedWorkshopFromHome, setSelectedWorkshopFromHome] = useState<Workshop | null>(null);

  // Sync route and metadata based on URL path
  const syncRouteFromPath = useCallback((pathname: string) => {
    let cleanPath = pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }
    setCurrentPath(cleanPath);

    if (cleanPath === '/' || cleanPath === '/home') {
      setActiveTab('home');
      setSelectedArticleSlug(null);
      updatePageSeo('/');
    } else if (cleanPath === '/products' || cleanPath.startsWith('/products')) {
      setActiveTab('products');
      setSelectedArticleSlug(null);
      updatePageSeo('/products');
    } else if (cleanPath === '/activities' || cleanPath.startsWith('/activities')) {
      setActiveTab('activities');
      setSelectedArticleSlug(null);
      updatePageSeo('/activities');
    } else if (cleanPath === '/impact' || cleanPath.startsWith('/impact')) {
      setActiveTab('impact');
      setSelectedArticleSlug(null);
      updatePageSeo('/impact');
    } else if (cleanPath === '/find-us' || cleanPath.startsWith('/find-us')) {
      setActiveTab('find-us');
      setSelectedArticleSlug(null);
      updatePageSeo('/find-us');
    } else if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      setActiveTab('blog');
      setSelectedArticleSlug(slug);
      updatePageSeo(cleanPath);
    } else if (cleanPath === '/blog') {
      setActiveTab('blog');
      setSelectedArticleSlug(null);
      updatePageSeo('/blog');
    } else {
      // Default fallback
      setActiveTab('home');
      setSelectedArticleSlug(null);
      updatePageSeo('/');
    }
  }, []);

  // Handle URL navigation with pushState
  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      syncRouteFromPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [syncRouteFromPath]);

  // Initial load and popstate event listener for back/forward buttons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      syncRouteFromPath(window.location.pathname);

      const handlePopState = () => {
        syncRouteFromPath(window.location.pathname);
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [syncRouteFromPath]);

  // Sync Cart state with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('second_story_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart local storage:', err);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('second_story_cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product: Product, quantity: number, customizationNote?: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.customizationNote === customizationNote
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity, customizationNote });
    }

    saveCartToStorage(updatedCart);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    saveCartToStorage(updatedCart);
  };

  const handleUpdateQty = (index: number, newQty: number) => {
    const updatedCart = cart.map((item, idx) => {
      if (idx === index) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  // Switch navigation helper targets
  const handleSelectProductFromHome = (product: Product) => {
    setSelectedProductFromHome(product);
    navigate('/products');
  };

  const handleSelectWorkshopFromHome = (workshop: Workshop) => {
    setSelectedWorkshopFromHome(workshop);
    navigate('/activities');
  };

  // Current active SEO metadata for inspector
  const currentSeo = siteSeoRegistry[currentPath] || siteSeoRegistry['/'];

  return (
    <div id="second-story-cooperative-applet" className="min-h-screen bg-[#FCFAF7] text-earth-dark flex flex-col justify-between selection:bg-forest/25 selection:text-[#1F1916]">
      
      {/* 1. Brand Header Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          const pathMap: Record<string, string> = {
            home: '/',
            products: '/products',
            activities: '/activities',
            impact: '/impact',
            blog: '/blog',
            'find-us': '/find-us'
          };
          navigate(pathMap[tab] || '/');
        }}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        navigate={navigate}
      />

      {/* SEO & AEO Active Metadata Indicator Banner (Expandable for AI Studio & Reviewer) */}
      <aside aria-label="SEO & AEO Inspector" className="w-full bg-[#1F1916] text-[#FCFAF7] border-b border-white/10 px-4 py-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] bg-forest/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-forest/40">
              <Globe className="h-3.5 w-3.5" />
              <span>URL: {currentPath}</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#BDB5AC]">
              <Key className="h-3 w-3 text-ochre" />
              <span>Main Keyword: <strong className="text-white">{currentSeo.mainKeyword}</strong></span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[11px] text-[#BDB5AC]">
              Title: <strong className="text-white font-mono">{currentSeo.pageTitle.length} chars</strong> (30-60 standard)
            </span>
            <button
              onClick={() => setIsSeoInspectorOpen(!isSeoInspectorOpen)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-ochre hover:text-white transition-colors cursor-pointer"
              aria-expanded={isSeoInspectorOpen}
              aria-controls="seo-details-panel"
            >
              <span>{isSeoInspectorOpen ? 'Hide SEO & AEO Details' : 'Inspect Page SEO & Keywords'}</span>
              {isSeoInspectorOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Detailed Inspector Drawer */}
        <AnimatePresence>
          {isSeoInspectorOpen && (
            <motion.div
              id="seo-details-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 mt-2 pt-3 pb-2 text-xs text-[#EBE6E0] space-y-3"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#29211C] p-3 rounded-xl border border-[#3E332C] space-y-1">
                  <span className="text-[10px] uppercase font-mono text-ochre font-bold block">Page Title ({currentSeo.pageTitle.length} / 60 chars)</span>
                  <p className="font-semibold text-white">{currentSeo.pageTitle}</p>
                </div>
                <div className="bg-[#29211C] p-3 rounded-xl border border-[#3E332C] space-y-1">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">Meta Description ({currentSeo.metaDescription.length} / 160 chars)</span>
                  <p className="text-[#BDB5AC] leading-relaxed text-[11px]">{currentSeo.metaDescription}</p>
                </div>
                <div className="bg-[#29211C] p-3 rounded-xl border border-[#3E332C] space-y-1">
                  <span className="text-[10px] uppercase font-mono text-amber-300 font-bold block">Target Keywords (Main + 2 Related)</span>
                  <p className="text-white font-medium text-[11px]">
                    <span className="text-ochre">1. Main:</span> {currentSeo.mainKeyword}
                  </p>
                  <p className="text-[#BDB5AC] text-[11px]">
                    <span className="text-emerald-400">2. Related:</span> {currentSeo.relatedKeywords[0]}
                  </p>
                  <p className="text-[#BDB5AC] text-[11px]">
                    <span className="text-emerald-400">3. Related:</span> {currentSeo.relatedKeywords[1]}
                  </p>
                </div>
              </div>

              {currentSeo.aeoQuestions && currentSeo.aeoQuestions.length > 0 && (
                <div className="max-w-7xl mx-auto bg-[#29211C] p-3.5 rounded-xl border border-[#3E332C] space-y-2">
                  <span className="text-[10px] uppercase font-mono text-ochre font-bold block">AEO (Answer Engine Optimization) Question-Answer Pairs</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    {currentSeo.aeoQuestions.map((qa, qIdx) => (
                      <div key={qIdx} className="bg-[#1F1916] p-2.5 rounded-lg border border-white/5 space-y-1">
                        <strong className="text-white block">Q: {qa.question}</strong>
                        <p className="text-[#BDB5AC] leading-relaxed"><strong>A:</strong> {qa.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* 2. Main Tabbed Content Workspace utilizing Framer Motion transitions */}
      <main id="app-main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedArticleSlug || '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                products={productsData}
                workshops={workshopsData}
                setActiveTab={(tab) => {
                  const pathMap: Record<string, string> = {
                    products: '/products',
                    activities: '/activities',
                    impact: '/impact',
                    blog: '/blog',
                    'find-us': '/find-us'
                  };
                  navigate(pathMap[tab] || '/');
                }}
                onSelectProduct={handleSelectProductFromHome}
                onSelectWorkshop={handleSelectWorkshopFromHome}
                navigate={navigate}
              />
            )}

            {activeTab === 'products' && (
              <ProductsView
                products={productsData}
                onAddToCart={handleAddToCart}
                selectedProductFromHome={selectedProductFromHome}
                setSelectedProductFromHome={setSelectedProductFromHome}
              />
            )}

            {activeTab === 'activities' && (
              <ActivitiesView
                workshops={workshopsData}
                tours={toursData}
                selectedWorkshopFromHome={selectedWorkshopFromHome}
                setSelectedWorkshopFromHome={setSelectedWorkshopFromHome}
              />
            )}

            {activeTab === 'impact' && <ImpactView />}

            {activeTab === 'blog' && (
              <BlogView 
                initialArticleSlug={selectedArticleSlug}
                navigate={navigate}
              />
            )}

            {activeTab === 'find-us' && <GetInvolvedView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Sustainable Brand Sticky Footer */}
      <Footer 
        navigate={navigate}
      />

      {/* 4. Sliding Context Shopping Cart Slider */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
