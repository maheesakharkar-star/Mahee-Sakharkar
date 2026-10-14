/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Leaf, Box, Sparkles, MapPin, Tag, ShoppingBag, Landmark } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQty: (index: number, newQty: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQty,
  onClearCart
}: CartDrawerProps) {
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [organicWrapping, setOrganicWrapping] = useState(true);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [savedWasteKg, setSavedWasteKg] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalWasteKg = Number(cart.reduce((acc, item) => acc + (item.product.wasteDivertedKg * item.quantity), 0).toFixed(1));

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const mockOrder = {
      id: orderId,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        customizationNote: item.customizationNote
      })),
      totalValue: subtotal,
      divertedWasteKg: totalWasteKg,
      buyerName: orderName,
      buyerEmail: orderEmail,
      buyerPhone: orderPhone,
      address: orderAddress,
      ecoWrap: organicWrapping,
      status: 'Inquiry Logged',
      submittedDate: new Date().toISOString()
    };

    // Store in localStorage
    const savedOrders = JSON.parse(localStorage.getItem('second_story_product_orders') || '[]');
    savedOrders.push(mockOrder);
    localStorage.setItem('second_story_product_orders', JSON.stringify(savedOrders));

    // Prepare success state
    setPlacedOrderId(orderId);
    setSavedWasteKg(totalWasteKg);
    setCheckoutSuccess(true);
    setIsCheckoutMode(false);
    
    // Clear forms
    setOrderName('');
    setOrderEmail('');
    setOrderPhone('');
    setOrderAddress('');
  };

  const handleCloseReceipt = () => {
    setCheckoutSuccess(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop blur background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-earth-dark/45 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="w-screen max-w-md bg-white border-l border-[#E8E2D9] h-full flex flex-col justify-between shadow-2xl relative"
            >
              
              {/* Header section */}
              <div className="p-6 border-b border-[#E8E2D9] bg-[#FCFAF7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-earth-dark">My Conscious Cart</h3>
                    <p className="font-sans text-[10px] text-earth-slate">Upcycled collections ready for circular exchange</p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-[#F3EDE3] text-earth-dark hover:bg-forest hover:text-white transition-all"
                  aria-label="Close Shopping Cart Drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Central Contents panel */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* CHECKOUT REVEAL RECEIPT SUCCESS MODAL (PERSISTED AT THE TOP STATE) */}
                {checkoutSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-6"
                  >
                    <div className="h-16 w-16 bg-forest rounded-full mx-auto flex items-center justify-center text-white text-3xl shadow-lg shadow-forest/20">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl text-earth-dark">Upcycled Order Logged!</h4>
                      <p className="font-mono text-xs font-semibold text-ochre mt-1">Receipt Ref: {placedOrderId}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-forest/5 border border-forest/15 space-y-3.5 text-xs text-earth-slate leading-relaxed">
                      <p className="font-bold text-earth-dark text-sm">🌱 Ecological Breakthrough Accomplished!</p>
                      <p>
                        By picking up this customized gifting solution, you saved <strong className="text-forest font-bold text-sm block font-mono mt-1">{savedWasteKg} kg of usable materials</strong> directly from collapsing solid landfills.
                      </p>
                      <p>Our logistical team at Kalighat Assembly Center is organizing the fabric wraps is contacting you via phone shortly.</p>
                    </div>

                    <button
                      onClick={handleCloseReceipt}
                      className="w-full text-center py-3 bg-forest text-white font-display font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
                    >
                      Browse More Creations
                    </button>
                  </motion.div>
                ) : (
                  
                  /* REAL CART FLOW CONTENT */
                  <>
                    {!isCheckoutMode ? (
                      
                      /* LISTING ITEMS */
                      <div className="space-y-4">
                        {cart.length === 0 ? (
                          <div className="text-center py-16 space-y-4">
                            <Box className="h-12 w-12 text-[#E8E2D9] mx-auto" />
                            <p className="font-display font-bold text-base text-earth-dark">Your Gift Box is Empty</p>
                            <p className="font-sans text-xs text-earth-slate max-w-[240px] mx-auto">Explore our upcycled catalog to add handcrafted lamps, totes, and seed diaries.</p>
                            <button
                              onClick={onClose}
                              className="rounded-xl bg-forest px-4 py-2 text-xs font-bold text-white transition-all hover:bg-forest/90"
                            >
                              Explore Now
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {cart.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 p-3 border border-[#E8E2D9] rounded-xl bg-white shadow-sm hover:shadow transition-all"
                              >
                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="h-full w-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>

                                <div className="flex-1 space-y-1">
                                  <div className="flex justify-between items-start gap-1">
                                    <span className="block font-display text-xs font-bold text-earth-dark line-clamp-1">
                                      {item.product.name}
                                    </span>
                                    <span className="block font-mono text-xs font-bold text-[#2E7D32] whitespace-nowrap">
                                      ${item.product.price * item.quantity}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between text-[10px] text-earth-slate font-medium">
                                    <span>Base: {item.product.originalMaterial.split(' ')[0]}</span>
                                    <span className="font-mono text-ochre font-extrabold">{item.product.wasteDivertedKg * item.quantity}kg Salvaged</span>
                                  </div>

                                  {item.customizationNote && (
                                    <p className="text-[10px] bg-yellow-50 text-[#A25E1A] font-medium p-1 rounded border border-[#CC7722]/15 italic">
                                      Custom: "{item.customizationNote}"
                                    </p>
                                  )}

                                  {/* Qty Counter and deletes button */}
                                  <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center border border-[#E8E2D9] rounded-md overflow-hidden bg-[#FCFAF7]">
                                      <button
                                        type="button"
                                        onClick={() => onUpdateQty(idx, Math.max(1, item.quantity - 1))}
                                        className="px-2 py-0.5 text-xs text-earth-slate hover:bg-[#F3EDE3] font-bold"
                                      >
                                        -
                                      </button>
                                      <span className="px-2.5 font-display text-xs font-bold text-earth-dark">{item.quantity}</span>
                                      <button
                                        type="button"
                                        onClick={() => onUpdateQty(idx, item.quantity + 1)}
                                        className="px-2 py-0.5 text-xs text-earth-slate hover:bg-[#F3EDE3] font-bold"
                                      >
                                        +
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => onRemoveItem(idx)}
                                      className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-[10px]"
                                      aria-label="Remove Product from Cart"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                      <span>Remove</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    ) : (

                      /* INTEGRATED CHECKOUT PANEL */
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-2">
                          <button
                            onClick={() => setIsCheckoutMode(false)}
                            className="text-xs font-bold text-forest hover:underline"
                          >
                            ← Back to Items Checkout
                          </button>
                        </div>

                        <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Your Full Name:*</label>
                              <input
                                type="text"
                                required
                                value={orderName}
                                onChange={(e) => setOrderName(e.target.value)}
                                placeholder="E.g., Priya Venket"
                                className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                              <input
                                type="email"
                                required
                                value={orderEmail}
                                onChange={(e) => setOrderEmail(e.target.value)}
                                placeholder="E.g., priya@gmail.com"
                                className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Mobile Phone:*</label>
                              <input
                                type="tel"
                                required
                                value={orderPhone}
                                onChange={(e) => setOrderPhone(e.target.value)}
                                placeholder="+91 99000 00000"
                                className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Delivery Address:*</label>
                              <textarea
                                required
                                rows={3}
                                value={orderAddress}
                                onChange={(e) => setOrderAddress(e.target.value)}
                                placeholder="State house details, apartment, street, pincode..."
                                className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                              />
                            </div>

                            <div className="flex items-center gap-2.5 p-3.5 bg-yellow-50 rounded-xl border border-[#CC7722]/15 text-[11px] text-[#A25E1A] font-semibold">
                              <input
                                type="checkbox"
                                checked={organicWrapping}
                                onChange={(e) => setOrganicWrapping(e.target.checked)}
                                className="accent-forest h-4 w-4 shrink-0"
                              />
                              <span>Apply complimentary festive gift wrapping with upcycled saree cloth.</span>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full text-center font-display font-bold py-3 bg-forest hover:bg-forest/90 text-white rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
                          >
                            Submit Checkout & Custom Gift Request
                          </button>
                        </form>
                      </div>

                    )}
                  </>
                )}

              </div>

              {/* Bottom Totals and Actions panel */}
              {!checkoutSuccess && cart.length > 0 && (
                <div className="p-6 border-t border-[#E8E2D9] bg-[#FCFAF7] space-y-4">
                  <div className="space-y-1.5 text-xs">
                    
                    {/* Waste Diverted Scale banner inside cart bottom */}
                    <div className="flex items-center justify-between p-3.5 bg-forest/5 text-forest border border-forest/15 rounded-xl font-semibold text-[11px]">
                      <span className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-forest" />
                        <span>Cumulative Landfill Savings:</span>
                      </span>
                      <span className="font-mono font-bold text-sm block">{totalWasteKg} kg</span>
                    </div>

                    <div className="flex justify-between font-medium text-earth-slate">
                      <span>Total Cart Items:</span>
                      <span className="font-mono text-earth-dark">{cart.reduce((a,c) => a + c.quantity, 0)} Units</span>
                    </div>

                    <div className="flex justify-between border-t border-[#E8E2D9] pt-2 font-display text-sm font-bold text-earth-dark">
                      <span>Invoiced Amount:</span>
                      <span className="font-mono text-forest font-extrabold text-base">${subtotal}</span>
                    </div>
                  </div>

                  {!isCheckoutMode ? (
                    <button
                      onClick={() => setIsCheckoutMode(true)}
                      className="w-full text-center py-3 bg-[#CC7722] hover:bg-[#CC7722]/90 text-white font-display font-bold rounded-xl shadow-lg shadow-ochre/10 transition-transform hover:scale-[1.01]"
                    >
                      Request Delivery & Customized Checkout
                    </button>
                  ) : null}
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
