/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Leaf, Mail, Phone, MapPin, Send, Instagram, Facebook, ArrowUp, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#E8E2D9] bg-[#1F1916] text-[#EBE6E0]">
      
      {/* Heavy typographic metrics ribbon at the top of the footer */}
      <div className="bg-[#2E7D32] text-[#FDFCF8] px-6 sm:px-12 py-8 flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center justify-between border-b border-white/10">
        <div className="flex flex-wrap gap-8 sm:gap-16">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-75 font-mono">Waste Recycled</span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#FDFCF8]">5,320+ kg</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-75 font-mono">Jobs Created</span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#FDFCF8]">24+ Artisans</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-75 font-mono">Impact Goal</span>
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#FDFCF8]">100+ Monthly</span>
          </div>
        </div>
        <div className="text-xs sm:text-sm font-display font-bold italic opacity-90 border-l-2 border-ochre pl-4 max-w-sm">
          "We don't just recycle waste—we create opportunities, stories, and a greener future."
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-4" id="footer-brand-section">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                The Second Story.
              </span>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-[#BDB5AC]">
              To transform discarded materials into meaningful, handcrafted products while creating sustainable livelihoods for women, artisans, and marginalized communities through creativity and conscious consumption.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com/thesecondstory" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#312822] text-[#BDB5AC] transition-all hover:bg-forest hover:text-white"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://facebook.com/thesecondstory" 
                target="_blank" 
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#312822] text-[#BDB5AC] transition-all hover:bg-forest hover:text-white"
                aria-label="Facebook Page"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 lg:col-span-5" id="footer-links-section">
            <div>
              <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">
                Explore App
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => handleNavigation('home')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Introduction & Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('products')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Sustainable Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('activities')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Creative Workshops
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('activities')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Sustainability Eco Tours
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">
                Join Us
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <button 
                    onClick={() => handleNavigation('find-us')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Contact Team
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('find-us')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Apply for Internships
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('find-us')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Volunteer Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('blog')}
                    className="text-[#BDB5AC] transition-colors hover:text-ochre text-left"
                  >
                    Read DIY Blog
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">
                Find Our Center
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#BDB5AC]">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ochre" />
                  <span>
                    12, Green Circle Lane, Kalighat Waste-Assembly hub,<br />Kolkata, WB 700026
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4.5 w-4.5 text-ochre" />
                  <span>+91 98457 28312</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4.5 w-4.5 text-ochre" />
                  <span>hello@thesecondstory.org</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4 lg:col-span-3" id="footer-newsletter-section">
            <h3 className="font-display text-sm font-semibold tracking-wider text-white uppercase">
              The Conscious Newsletter
            </h3>
            <p className="font-sans text-sm text-[#BDB5AC]">
              Subscribe to receive DIY upcycling tips, upcoming craft workshop updates, and exclusive discount codes for new festival collection drops.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full rounded-xl border border-[#423932] bg-[#29211C] px-4 py-3 pr-12 text-sm text-white placeholder-[#786D65] focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-white transition-all hover:bg-ochre"
                aria-label="Send Email Subscribe Button"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="h-6">
              {isSubscribed && (
                <div className="flex items-center gap-2 font-display text-xs text-forest">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Wonderful! Welcome to our conscious circle. Check your inbox!</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom copyright of The Second Story */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#312822] pt-8 sm:flex-row text-xs text-[#786D65]">
          <p>© {new Date().getFullYear()} The Second Story. All rights reserved. Registered Secular Social Enterprise.</p>
          <div className="flex items-center gap-2">
            <span>Powered by Creativity & Community Impact</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#29211C] text-[#BDB5AC] transition-all hover:bg-ochre hover:text-white"
              aria-label="Back to Top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
