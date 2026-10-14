/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Menu, X, ShoppingCart, Info, Award, Calendar, Contact, BookOpen, ShoppingBag, Landmark } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, cart, setIsCartOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Landmark },
    { id: 'products', label: 'Our Products', icon: ShoppingBag },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'impact', label: 'Social Impact', icon: Award },
    { id: 'blog', label: 'DIY & Blog', icon: BookOpen },
    { id: 'find-us', label: 'Find Us & Get Involved', icon: Contact },
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E2D9] bg-[#FCFAF7]/90 backdrop-blur-md">
      <div id="header-container" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Wordmark */}
        <div 
          id="brand-logo" 
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
          onClick={() => handleTabChange('home')}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-earth-dark whitespace-nowrap shrink-0">
            The Second Story
          </span>
        </div>

        {/* Zone 2: Clean single-line nav links with subtle hover underlines */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-7">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-btn-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  isActive 
                    ? 'text-forest font-semibold' 
                    : 'text-earth-slate hover:text-earth-dark'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-line"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-forest rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div id="header-actions" className="flex items-center gap-3 shrink-0">
          <button
            id="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-forest/90 transition-all whitespace-nowrap shrink-0"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag</span>
            <span className="font-mono text-[11px] tabular-nums bg-white/20 px-1.5 py-0.2 rounded-full">
              {totalCartItems}
            </span>
          </button>

          {/* Hamburger Mobile Toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8E2D9] text-earth-dark hover:bg-[#F3EDE3] lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-dropdown-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#E8E2D9] bg-[#FCFAF7] lg:hidden overflow-hidden"
          >
            <div className="space-y-1.5 px-4 py-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-tab-btn-${item.id}`}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-forest/10 text-forest'
                        : 'text-earth-slate hover:bg-[#F3EDE3] hover:text-earth-dark'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-forest' : 'text-earth-slate'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
