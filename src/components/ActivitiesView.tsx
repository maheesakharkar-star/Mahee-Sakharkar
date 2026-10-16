/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, Clock, Check, Sparkles, AlertCircle, BookmarkCheck, ArrowRight, X, Heart, ShieldAlert, ChevronDown, Award, HelpCircle } from 'lucide-react';
import { Workshop, Tour, WorkshopRegistration, TourBooking } from '../types';

interface ActivitiesViewProps {
  workshops: Workshop[];
  tours: Tour[];
  selectedWorkshopFromHome?: Workshop | null;
  setSelectedWorkshopFromHome: (w: Workshop | null) => void;
}

export default function ActivitiesView({ 
  workshops, 
  tours, 
  selectedWorkshopFromHome, 
  setSelectedWorkshopFromHome 
}: ActivitiesViewProps) {
  const [activeSubMode, setActiveSubMode] = useState<'workshops' | 'tours'>('workshops');
  
  // Workshop Registration form states
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [wName, setWName] = useState('');
  const [wEmail, setWEmail] = useState('');
  const [wPhone, setWPhone] = useState('');
  const [wQty, setWQty] = useState(1);
  const [wPay, setWPay] = useState('upi');
  const [wSuccess, setWSuccess] = useState(false);

  // Tour Booking form states
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPhone, setTPhone] = useState('');
  const [tSize, setTSize] = useState(2);
  const [tReqs, setTReqs] = useState('');
  const [tSuccess, setTSuccess] = useState(false);

  // Calendar Highlight filter
  const [calendarMonth, setCalendarMonth] = useState('June 2026');

  // Load workshops from state first to dynamically increase seats booked on local storage save
  const [dynamicWorkshops, setDynamicWorkshops] = useState<Workshop[]>(workshops);

  useEffect(() => {
    // If a workshop is selected on the Home Screen, redirect here and open modal
    if (selectedWorkshopFromHome) {
      setSelectedWorkshop(selectedWorkshopFromHome);
      setActiveSubMode('workshops');
      setSelectedWorkshopFromHome(null); // Clear
    }
  }, [selectedWorkshopFromHome]);

  const handleWorkshopSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;

    const registration: WorkshopRegistration = {
      id: 'reg-' + Date.now(),
      workshopId: selectedWorkshop.id,
      workshopTitle: selectedWorkshop.title,
      fullName: wName,
      email: wEmail,
      phone: wPhone,
      ticketsCount: wQty,
      paymentMethod: wPay,
      registrationDate: new Date().toISOString()
    };

    // Save to localStorage
    const savedRegs = JSON.parse(localStorage.getItem('second_story_workshop_registrations') || '[]');
    savedRegs.push(registration);
    localStorage.setItem('second_story_workshop_registrations', JSON.stringify(savedRegs));

    // Update seating counters locally
    const updatedWorkshops = dynamicWorkshops.map(w => {
      if (w.id === selectedWorkshop.id) {
        return { ...w, seatsBooked: Math.min(w.maxSeats, w.seatsBooked + wQty) };
      }
      return w;
    });
    setDynamicWorkshops(updatedWorkshops);

    setWSuccess(true);
    setWName('');
    setWEmail('');
    setWPhone('');
    setWQty(1);

    setTimeout(() => {
      setWSuccess(false);
      setSelectedWorkshop(null);
    }, 4000);
  };

  const handleTourSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    const booking: TourBooking = {
      id: 'book-' + Date.now(),
      tourId: selectedTour.id,
      tourTitle: selectedTour.title,
      fullName: tName,
      email: tEmail,
      phone: tPhone,
      groupSize: tSize,
      bookingDate: new Date().toISOString(),
      specialRequests: tReqs
    };

    // Save
    const savedBooks = JSON.parse(localStorage.getItem('second_story_tour_bookings') || '[]');
    savedBooks.push(booking);
    localStorage.setItem('second_story_tour_bookings', JSON.stringify(savedBooks));

    setTSuccess(true);
    setTName('');
    setTEmail('');
    setTPhone('');
    setTSize(2);
    setTReqs('');

    setTimeout(() => {
      setTSuccess(false);
      setSelectedTour(null);
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Visual Sub Navigation Switcher */}
      <section id="activities-header" className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-forest uppercase tracking-wider">
          Immersive Eco-Experiences · Craft & Field Education
        </div>
        <h1 className="font-display text-4xl font-bold text-earth-dark tracking-tight leading-tight [text-wrap:balance]">
          Workshops & Sustainability Tours
        </h1>
        <p className="text-sm text-earth-slate leading-relaxed">
          We don't limit ourselves to making upcycled products. We empower modern consumers to pick up the tools, explore circular logistics, and construct their own green futures.
        </p>

        {/* Switch Tabs */}
        <div className="flex bg-[#F3EDE3] p-1 rounded-xl shadow-sm gap-1 mt-2">
          <button
            onClick={() => setActiveSubMode('workshops')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold transition-all ${
              activeSubMode === 'workshops'
                ? 'bg-white text-forest shadow-sm font-bold'
                : 'text-earth-slate hover:text-earth-dark'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>Interactive Craft Workshops</span>
          </button>
          
          <button
            onClick={() => setActiveSubMode('tours')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold transition-all ${
              activeSubMode === 'tours'
                ? 'bg-white text-ochre shadow-sm font-bold'
                : 'text-earth-slate hover:text-earth-dark'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Sustainability Eco Tours</span>
          </button>
        </div>
      </section>

      {/* Main Mode Output Container */}
      <div id="activities-main-container">
        
        {/* MODE A: WORKSHOPS */}
        {activeSubMode === 'workshops' && (
          <div className="space-y-12">
            
            {/* Interactive Month Calendar Highlights */}
            <div className="rounded-3xl border border-[#E8E2D9] bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-earth-dark flex items-center gap-2">
                    <span>Workshop Event Calendar: {calendarMonth}</span>
                  </h3>
                  <p className="text-xs text-earth-slate mt-0.5">Click any workshop schedule card below to secure your craft kit before they sell out.</p>
                </div>
                <div className="text-xs text-forest font-semibold">
                  100% Zero-Landfill Workshops
                </div>
              </div>

              {/* Day calendar Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs">
                {[
                  { day: 'Mon', date: '08', event: null },
                  { day: 'Tue', date: '09', event: null },
                  { day: 'Wed', date: '10', event: null },
                  { day: 'Thu', date: '11', event: null },
                  { day: 'Fri', date: '12', event: null },
                  { day: 'Sat', date: '13', event: 'Artisan Tour' },
                  { day: 'Sun', date: '14', event: 'DIY Bottle Designing', active: true },
                  { day: 'Mon', date: '15', event: null },
                  { day: 'Tue', date: '16', event: null },
                  { day: 'Wed', date: '17', event: null },
                  { day: 'Thu', date: '18', event: null },
                  { day: 'Fri', date: '19', event: null },
                  { day: 'Sat', date: '20', event: 'Herbal Colour', active: true },
                  { day: 'Sun', date: '21', event: null },
                ].map((cal, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                      cal.active 
                        ? 'bg-forest/5 border-forest/40 text-forest font-bold shadow-sm'
                        : cal.event
                          ? 'bg-ochre/5 border-[#CC7722]/30 text-ochre font-bold'
                          : 'bg-white border-[#E8E2D9] text-earth-slate hover:bg-[#F3EDE3]/40'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider">
                      <span>{cal.day}</span>
                      <span className="font-extrabold">{cal.date}</span>
                    </div>
                    <span className="text-[10px] font-semibold leading-tight line-clamp-2 text-left shrink-0">
                      {cal.event || 'No Scheduled Slits'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Workshop Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dynamicWorkshops.map((workshop) => {
                const spotsAvailable = workshop.maxSeats - workshop.seatsBooked;
                return (
                  <div
                    key={workshop.id}
                    className="group rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm flex flex-col h-full hover:border-forest/20 justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full bg-[#F3EDE3] overflow-hidden">
                        <img
                          src={workshop.image}
                          alt={workshop.imageAlt || workshop.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-forest px-3 py-1 font-display text-[11px] font-bold text-white shadow-sm">
                          ₹{workshop.price.toLocaleString('en-IN')}
                        </span>
                        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[9px] font-mono font-bold text-earth-dark shadow-sm">
                          {workshop.duration}
                        </span>
                      </div>

                      {/* Info body */}
                      <div className="p-5 space-y-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] font-extrabold tracking-widest text-[#A25E1A] uppercase">
                            Facilitated by: {workshop.facilitator.split(' ')[0]}
                          </span>
                          <h4 className="font-display font-bold text-base text-earth-dark group-hover:text-forest transition-colors leading-snug">
                            {workshop.title}
                          </h4>
                          <p className="font-sans text-xs text-earth-slate leading-relaxed">
                            {workshop.description}
                          </p>
                        </div>

                        {/* List of materials provided */}
                        <div className="space-y-1 bg-[#FCFAF7] border border-[#E8E2D9]/70 rounded-xl p-3.5 text-[11px] text-earth-slate">
                          <span className="font-display font-bold text-earth-dark uppercase tracking-wider block">Eco Gift Kits Provided:</span>
                          <ul className="list-disc pl-4 space-y-0.5">
                            {workshop.materialsProvided.map((mat, mIdx) => (
                              <li key={mIdx}>{mat}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="flex items-center justify-between border-t border-[#F1ECE4] pt-4 mb-3">
                        <span className="font-sans text-[11px] font-semibold text-earth-slate flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-forest" />
                          <span>Spots: {workshop.seatsBooked}/{workshop.maxSeats} Booked</span>
                        </span>
                        <span className={`font-mono text-[10px] font-bold uppercase ${spotsAvailable <= 3 ? 'text-[#BF1E1E]' : 'text-forest'}`}>
                          {spotsAvailable <= 0 ? 'Full Slot' : `${spotsAvailable} open seats`}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setWQty(1);
                        }}
                        disabled={spotsAvailable <= 0}
                        className={`w-full text-center font-display font-bold py-2.5 rounded-xl transition-all shadow-sm ${
                          spotsAvailable <= 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-forest hover:bg-forest/90 text-white shadow-forest/10 hover:shadow-md'
                        }`}
                      >
                        {spotsAvailable <= 0 ? 'Fully Booked' : 'Register Craft Spot'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE B: TOURS */}
        {activeSubMode === 'tours' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="rounded-3xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-[#F3EDE3] overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.imageAlt || tour.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-ochre px-3.5 py-1.5 font-display text-sm font-bold text-white shadow-md">
                        ₹{tour.price.toLocaleString('en-IN')} <span className="text-xs font-normal">/ Person</span>
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-earth-dark/80 backdrop-blur-sm p-3 text-white border border-white/10 flex flex-wrap gap-x-6 gap-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-[#EBE6E0]">
                          <Clock className="h-4 w-4 text-ochre" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#EBE6E0]">
                          <MapPin className="h-4 w-4 text-forest" />
                          <span>{tour.location.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-display text-xl font-bold text-earth-dark">
                          {tour.title}
                        </h3>
                        <p className="font-sans text-xs text-earth-slate leading-relaxed">
                          {tour.description}
                        </p>
                      </div>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {tour.highlights.map((high, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-earth-dark">
                            <Award className="h-4 w-4 text-forest shrink-0" />
                            <span className="font-semibold">{high}</span>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Timelines Itinerary drop */}
                      <div className="border-t border-[#F2EDE4] pt-4 space-y-3.5">
                        <span className="font-display text-xs font-bold text-earth-dark uppercase tracking-wider block">Hourly Itinerary Schedule:</span>
                        <div className="space-y-3">
                          {tour.itinerary.map((it, itIdx) => {
                            const [time, desc] = it.split(' - ');
                            return (
                              <div key={itIdx} className="flex items-start gap-3.5 text-xs">
                                <span className="font-mono font-bold text-[#A25E1A] bg-ochre/10 rounded px-2 py-0.5 whitespace-nowrap">{time}</span>
                                <span className="text-earth-slate leading-relaxed">{desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 pt-0">
                    <button
                      onClick={() => setSelectedTour(tour)}
                      className="w-full text-center font-display font-bold py-3 rounded-xl bg-[#CC7722] hover:bg-[#CC7722]/90 text-white shadow-lg shadow-ochre/10 hover:shadow-md transition-all"
                    >
                      Request Group or Individual Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* DIALOG FORM A: Workshop Registration Form */}
      <AnimatePresence>
        {selectedWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white text-earth-dark border border-[#E8E2D9] max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-[#F3EDE3] text-earth-dark hover:bg-forest hover:text-white transition-all"
                aria-label="Close Workshop Booking modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="space-y-4 mt-2">
                <span className="font-mono text-[9px] font-bold text-forest uppercase tracking-wider bg-forest/10 px-2 py-0.5 rounded-full inline-block">Book Craft Workshop</span>
                <h3 className="font-display font-bold text-xl leading-tight">
                  {selectedWorkshop.title}
                </h3>
                <p className="font-sans text-xs text-earth-slate">
                  Secure your slot with live eco-crafting materials. Session runs on {selectedWorkshop.date} at {selectedWorkshop.time}.
                </p>

                <form onSubmit={handleWorkshopSubmit} className="space-y-4 border-t border-[#F1ECE4] pt-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Full Name:*</label>
                    <input
                      type="text"
                      required
                      value={wName}
                      onChange={(e) => setWName(e.target.value)}
                      placeholder="E.g., Ananya Deshmukh"
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                    <input
                      type="email"
                      required
                      value={wEmail}
                      onChange={(e) => setWEmail(e.target.value)}
                      placeholder="E.g., ananya@gmail.com"
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Phone Number:*</label>
                      <input
                        type="tel"
                        required
                        value={wPhone}
                        onChange={(e) => setWPhone(e.target.value)}
                        placeholder="+91 99000 00000"
                        className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Seats Count:*</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={10}
                        value={wQty}
                        onChange={(e) => setWQty(Number(e.target.value))}
                        className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Ticket Price Calculation:</label>
                    <div className="p-3 bg-[#FCFAF7] border border-[#E8E2D9] rounded-xl flex justify-between text-xs font-semibold">
                      <span>{wQty} Tickets × ₹{selectedWorkshop.price.toLocaleString('en-IN')}</span>
                      <span className="text-forest text-sm font-bold">₹{(wQty * selectedWorkshop.price).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Select Payment Gateway Mock:*</label>
                    <select
                      value={wPay}
                      onChange={(e) => setWPay(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    >
                      <option value="upi">Secure Unified Payments Interface (UPI)</option>
                      <option value="card">Eco-Led Debit / Credit Card</option>
                      <option value="pay-at-venue">Secure Pay-at-Center Registration</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center font-display font-bold py-3 bg-forest hover:bg-forest/90 text-white rounded-xl shadow-lg transition-all"
                  >
                    Confirm Craft Booking
                  </button>

                  <AnimatePresence>
                    {wSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-green-50 text-forest border border-forest/20 rounded-xl mt-2 text-xs"
                      >
                        <Sparkles className="h-4.5 w-4.5 text-[#CC7722]" />
                        <span className="font-semibold">Seat Reserved! Soft copy tickets and venue directions sent to your email. See you there!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG FORM B: Tour Booking Form */}
      <AnimatePresence>
        {selectedTour && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-dark/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white text-earth-dark border border-[#E8E2D9] max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full bg-[#F3EDE3] text-earth-dark hover:bg-forest hover:text-white transition-all"
                aria-label="Close Tour selection modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="space-y-4 mt-2">
                <span className="font-mono text-[9px] font-bold text-[#CC7722] uppercase tracking-wider bg-ochre/10 px-2 py-0.5 rounded-full inline-block">Book Sustainability Tour</span>
                <h3 className="font-display font-bold text-xl leading-tight">
                  {selectedTour.title}
                </h3>
                <p className="font-sans text-xs text-earth-slate">
                  Registration coordinates individual or group buses. Sourced meals included. Runs on {selectedTour.date}.
                </p>

                <form onSubmit={handleTourSubmit} className="space-y-4 border-t border-[#F1ECE4] pt-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Full Name:*</label>
                    <input
                      type="text"
                      required
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                      placeholder="E.g., Vineet Roy"
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                    <input
                      type="email"
                      required
                      value={tEmail}
                      onChange={(e) => setTEmail(e.target.value)}
                      placeholder="E.g., vineet@gmail.com"
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Mobile:*</label>
                      <input
                        type="tel"
                        required
                        value={tPhone}
                        onChange={(e) => setTPhone(e.target.value)}
                        placeholder="+91 99000 00000"
                        className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Group size:*</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={30}
                        value={tSize}
                        onChange={(e) => setTSize(Number(e.target.value))}
                        className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Estimated Total Price:</label>
                    <div className="p-3 bg-[#FCFAF7] border border-[#E8E2D9] rounded-xl flex justify-between text-xs font-semibold">
                      <span>{tSize} Persons × ₹{selectedTour.price.toLocaleString('en-IN')}</span>
                      <span className="text-ochre text-sm font-bold">₹{(tSize * selectedTour.price).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1 font-semibold">Special Requests (Dietary, pickup assistance):</label>
                    <textarea
                      rows={2}
                      value={tReqs}
                      onChange={(e) => setTReqs(e.target.value)}
                      placeholder="Specify vegan food need, child requirements, wheelchair accessibility..."
                      className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center font-display font-bold py-3 bg-[#CC7722] hover:bg-[#CC7722]/90 text-white rounded-xl shadow-lg transition-all"
                  >
                    Send Tour Reservation Request
                  </button>

                  <AnimatePresence>
                    {tSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-3 bg-green-50 text-forest border border-forest/20 rounded-xl mt-2 text-xs"
                      >
                        <Check className="h-4.5 w-4.5" />
                        <span className="font-semibold">Tour Booking Request Logged! Our local eco-guide will coordinate pickup hubs via WhatsApp shortly.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AEO Activities & Eco Tours Knowledge Section */}
      <section id="activities-aeo-knowledge" className="rounded-3xl border border-[#CC7722]/20 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-ochre uppercase tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>AEO Practical Immersion & Workshop Query Center</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              What Will Participants Learn in a Second Story Sustainability Workshop?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              Participants learn hands-on circular economy skills, including natural plant extraction for herbal dyes, upcycled fabric quilting, and diamond-wheel glass bottle scoring. All raw materials and protective safety gear are provided, and attendees bring home their own finished upcycled creation along with reusable recipes and workshop notes to continue crafting sustainably at home.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E2D9]">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              Who Can Attend the Weekend Sustainability Eco Tours?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              Our eco tours are designed for students, families, educators, and conscious travelers looking to understand real-world waste management. Tours visit municipal recycling hubs, sorting facilities, and rural artisan clusters to observe the end-to-end journey from waste heap to retail gallery, accompanied by organic village lunches and direct conversations with craftswomen.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
