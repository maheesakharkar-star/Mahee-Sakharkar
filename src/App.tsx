/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Deep linking bridges to open custom detail triggers across sections
  const [selectedProductFromHome, setSelectedProductFromHome] = useState<Product | null>(null);
  const [selectedWorkshopFromHome, setSelectedWorkshopFromHome] = useState<Workshop | null>(null);

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
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWorkshopFromHome = (workshop: Workshop) => {
    setSelectedWorkshopFromHome(workshop);
    setActiveTab('activities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="second-story-cooperative-applet" className="min-h-screen bg-[#FCFAF7] text-earth-dark flex flex-col justify-between selection:bg-forest/25 selection:text-[#1F1916]">
      
      {/* 1. Brand Header Sticky Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
      />

      {/* 2. Main Tabbed Content Workspace utilizing Framer Motion transitions */}
      <main id="app-main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                products={productsData}
                workshops={workshopsData}
                setActiveTab={setActiveTab}
                onSelectProduct={handleSelectProductFromHome}
                onSelectWorkshop={handleSelectWorkshopFromHome}
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

            {activeTab === 'blog' && <BlogView />}

            {activeTab === 'find-us' && <GetInvolvedView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Sustainable Brand Sticky Footer */}
      <Footer setActiveTab={setActiveTab} />

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
