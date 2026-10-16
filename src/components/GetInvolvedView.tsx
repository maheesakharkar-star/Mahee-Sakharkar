/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Briefcase, Users, HelpCircle, Sparkles, CheckCircle, Info, Landmark } from 'lucide-react';
import { ContactSubmission, Application } from '../types';

export default function GetInvolvedView() {
  const [activeFormSection, setActiveFormSection] = useState<'contact' | 'internship' | 'volunteer'>('contact');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Internship form state
  const [intName, setIntName] = useState('');
  const [intEmail, setIntEmail] = useState('');
  const [intPhone, setIntPhone] = useState('');
  const [intRole, setIntRole] = useState('design-intervention');
  const [intSkills, setIntSkills] = useState('');
  const [intMotivation, setIntMotivation] = useState('');
  const [intDate, setIntDate] = useState('2026-07-01');
  const [intSuccess, setIntSuccess] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volProject, setVolProject] = useState('weekend-sorting');
  const [volSkills, setVolSkills] = useState('');
  const [volReason, setVolReason] = useState('');
  const [volSuccess, setVolSuccess] = useState(false);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submission: ContactSubmission = {
      id: 'contact-' + Date.now(),
      fullName: contactName,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage,
      submittedDate: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('second_story_contact_submissions') || '[]');
    saved.push(submission);
    localStorage.setItem('second_story_contact_submissions', JSON.stringify(saved));

    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactSubject('');
    setContactMessage('');

    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleInternshipSubmit = (e: FormEvent) => {
    e.preventDefault();
    const application: Application = {
      id: 'intern-' + Date.now(),
      type: 'internship',
      fullName: intName,
      email: intEmail,
      phone: intPhone,
      role: intRole,
      skills: intSkills,
      motivation: intMotivation,
      availableFrom: intDate,
      submittedDate: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('second_story_applications') || '[]');
    saved.push(application);
    localStorage.setItem('second_story_applications', JSON.stringify(saved));

    setIntSuccess(true);
    setIntName('');
    setIntEmail('');
    setIntPhone('');
    setIntSkills('');
    setIntMotivation('');

    setTimeout(() => setIntSuccess(false), 5000);
  };

  const handleVolunteerSubmit = (e: FormEvent) => {
    e.preventDefault();
    const application: Application = {
      id: 'vol-' + Date.now(),
      type: 'volunteer',
      fullName: volName,
      email: volEmail,
      phone: volPhone,
      role: volProject,
      skills: volSkills,
      motivation: volReason,
      availableFrom: 'immediately',
      submittedDate: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem('second_story_applications') || '[]');
    saved.push(application);
    localStorage.setItem('second_story_applications', JSON.stringify(saved));

    setVolSuccess(true);
    setVolName('');
    setVolEmail('');
    setVolPhone('');
    setVolSkills('');
    setVolReason('');

    setTimeout(() => setVolSuccess(false), 5000);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Visual Switcher header */}
      <section id="getinvolved-header" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1F1916] text-[#EBE6E0] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-ochre/10 blur-2xl" />
        
        <div className="lg:col-span-6 space-y-4">
          <span className="font-mono text-xs font-bold text-ochre uppercase tracking-widest block bg-white/10 px-3 py-1 rounded-full w-fit">Join Our Movement</span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Connecting People, Projects & Purpose
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#BDB5AC] leading-relaxed">
            Whether you want to coordinate inquiries, apply for structured design internships, or join weekend sorting and artisan mentoring projects, we have a desk waiting for you. Choose an option to open the registration panel:
          </p>
        </div>

        {/* Switcher Pills Container */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row gap-3.5 w-full justify-end">
          <button
            onClick={() => setActiveFormSection('contact')}
            className={`flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${
              activeFormSection === 'contact'
                ? 'bg-forest text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <Mail className="h-4.5 w-4.5" />
            <span>Contact Core Team</span>
          </button>

          <button
            onClick={() => setActiveFormSection('internship')}
            className={`flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${
              activeFormSection === 'internship'
                ? 'bg-ochre text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <Briefcase className="h-4.5 w-4.5" />
            <span>Apply for Internships</span>
          </button>

          <button
            onClick={() => setActiveFormSection('volunteer')}
            className={`flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-sm font-bold transition-all ${
              activeFormSection === 'volunteer'
                ? 'bg-slate-700 text-white shadow-lg'
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <Users className="h-4.5 w-4.5" />
            <span>Volunteer Projects</span>
          </button>
        </div>
      </section>

      {/* Main Form workspace */}
      <section id="getinvolved-forms-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Center Coordinates & Team Address */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 sm:p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-lg text-earth-dark flex items-center gap-2">
              <Landmark className="h-5 w-5 text-forest" />
              <span>Assembly Hub Details</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-ochre shrink-0" />
                <div>
                  <span className="block font-bold text-earth-dark">HQ Location:</span>
                  <span className="block mt-0.5 text-earth-slate leading-relaxed">
                    12, Green Circle Lane, Kalighat Waste-Assembly hub, Kolkata, WB 700026
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-forest shrink-0" />
                <div>
                  <span className="block font-bold text-earth-dark">Email Inquiries:</span>
                  <span className="block mt-0.5 text-[#CC7722] font-semibold font-mono">hello@thesecondstory.org</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-slate-755 shrink-0" />
                <div>
                  <span className="block font-bold text-earth-dark">Call Support Core:</span>
                  <span className="block mt-0.5 text-earth-slate font-mono">+91 98457 28312</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FCFAF7] border border-[#E8E2D9] space-y-3.5">
            <h4 className="font-display font-bold text-sm text-earth-dark">Why Get Involved?</h4>
            <p className="font-sans text-xs text-earth-slate leading-relaxed">
              We operate as a secular, circular social enterprise. 85% of all revenues are reinvested locally to source craft kits, purchase safety tools, and secure double-average fair pay scales for our tailor circles.
            </p>
            <div className="text-[10px] uppercase font-mono font-bold text-forest">
              🌱 Verified Carbon-Neutral operations
            </div>
          </div>
        </div>

        {/* Right Side: Direct Interactive Forms panels switching */}
        <div className="lg:col-span-8 bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* PANEL A: CONTACT US FORM */}
          {activeFormSection === 'contact' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-earth-dark">Write to Our Care Team</h3>
                <p className="font-sans text-xs text-earth-slate">Have comments, custom collaboration proposals, or general feedback? Send us a message.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 border-t border-[#F1ECE4] pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Full Name:*</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="E.g., Devendra Joshi"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="E.g., dev@gmail.com"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1">Subject:*</label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="E.g., Retail Outlet Custom Orders Inquiry in Pune"
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1 font-semibold">Your Message Content:*</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How can we assist you? Tell us about your idea, shipping issue, or collaboration proposal..."
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-center font-display font-bold py-3 bg-forest hover:bg-forest/90 text-white rounded-xl shadow-lg shadow-forest/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Inquiries</span>
                </button>

                <AnimatePresence>
                  {contactSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-green-50 text-forest border border-forest/20 rounded-xl mt-2 text-xs"
                    >
                      <Sparkles className="h-4.5 w-4.5 text-[#CC7722]" />
                      <span className="font-semibold">Message sent! Our support team will get back to you within 24 business hours.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}

          {/* PANEL B: INTERNSHIPS APPLICATION FORM */}
          {activeFormSection === 'internship' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-earth-dark">Structured Design & Impact Internship</h3>
                <p className="font-sans text-xs text-earth-slate">Are you a graduating student, young professional, or textile researcher? Join our 3-month stipend-supported cohort.</p>
              </div>

              <form onSubmit={handleInternshipSubmit} className="space-y-4 border-t border-[#F1ECE4] pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Full Name:*</label>
                    <input
                      type="text"
                      required
                      value={intName}
                      onChange={(e) => setIntName(e.target.value)}
                      placeholder="E.g., Shruti Kulkarni"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                    <input
                      type="email"
                      required
                      value={intEmail}
                      onChange={(e) => setIntEmail(e.target.value)}
                      placeholder="E.g., shruti@gmail.com"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Phone Number:*</label>
                    <input
                      type="tel"
                      required
                      value={intPhone}
                      onChange={(e) => setIntPhone(e.target.value)}
                      placeholder="+91 99000 00000"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Preferred Department:*</label>
                    <select
                      value={intRole}
                      onChange={(e) => setIntRole(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none bg-white font-semibold"
                    >
                      <option value="design-intervention">Upcycled Product Design & Crafting</option>
                      <option value="community-outreach">Artisan Livelihood Social Surveys</option>
                      <option value="waste-logistics">Municipal Collection Sorting Flow</option>
                      <option value="digital-branding">Digital Media & Impact Storytelling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1 font-semibold">Skills Portfolio (Brief):*</label>
                  <input
                    type="text"
                    required
                    value={intSkills}
                    onChange={(e) => setIntSkills(e.target.value)}
                    placeholder="E.g., Sketching, Adobe Creative Suite, Tailoring Basics, Excel, Social Surveying..."
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1 font-semibold">Statement of Motivation:*</label>
                  <textarea
                    required
                    rows={3}
                    value={intMotivation}
                    onChange={(e) => setIntMotivation(e.target.value)}
                    placeholder="Why are you passionate about converting discarded waste into meaningful design items and working side-by-side with village women collectives?"
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Available Starting From:*</label>
                    <input
                      type="date"
                      required
                      value={intDate}
                      onChange={(e) => setIntDate(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-center font-display font-bold py-3 bg-[#CC7722] hover:bg-[#CC7722]/90 text-white rounded-xl shadow-lg transition-all self-end"
                  >
                    Submit Internship Application
                  </button>
                </div>

                <AnimatePresence>
                  {intSuccess && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0 }}
                       className="flex items-center gap-2 p-3 bg-green-50 text-forest border border-forest/20 rounded-xl mt-2 text-xs"
                     >
                       <CheckCircle className="h-4.5 w-4.5" />
                       <span className="font-semibold">Application Logged! Our HR design team will request phone interviews if your portfolio aligns.</span>
                     </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}

          {/* PANEL C: VOLUNTEER PROJECTS CO-CREATOR FORM */}
          {activeFormSection === 'volunteer' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-xl text-earth-dark font-semibold">Join Sustainability Projects (Volunteers)</h3>
                <p className="font-sans text-xs text-earth-slate">Help during clean-up events, coordinate waste sorting with local partners, or teach computer basics in village clusters.</p>
              </div>

              <form onSubmit={handleVolunteerSubmit} className="space-y-4 border-t border-[#F1ECE4] pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Full Name:*</label>
                    <input
                      type="text"
                      required
                      value={volName}
                      onChange={(e) => setVolName(e.target.value)}
                      placeholder="E.g., Ramesh Pathak"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Email Address:*</label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      placeholder="E.g., ramesh@gmail.com"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Contact Phone:*</label>
                    <input
                      type="tel"
                      required
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="+91 99000 00000"
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Select Volunteer Action:*</label>
                    <select
                      value={volProject}
                      onChange={(e) => setVolProject(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none bg-white font-semibold"
                    >
                      <option value="weekend-sorting">Weekend Waste Sorting at Kalighat Assembly Center</option>
                      <option value="teaching">Teaching Core Digital Skills to single mothers</option>
                      <option value="beach-cleanups">Beach and Temple waste collections drives</option>
                      <option value="translation">Translation assist & Design catalog preparation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1 font-semibold">Special Skills or Professional Background:</label>
                  <input
                    type="text"
                    value={volSkills}
                    onChange={(e) => setVolSkills(e.target.value)}
                    placeholder="E.g., Photography, speaking Bengali/Marwari, graphic design, social media experience..."
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#544B45] uppercase tracking-wider mb-1 font-semibold">Reason for Joining:*</label>
                  <textarea
                    required
                    rows={3}
                    value={volReason}
                    onChange={(e) => setVolReason(e.target.value)}
                    placeholder="Share what inspires you to volunteer with The Second Story circular enterprise..."
                    className="w-full rounded-xl border border-[#E8E2D9] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-center font-display font-bold py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl shadow-lg transition-all"
                >
                  Join Sustainability Action
                </button>

                <AnimatePresence>
                  {volSuccess && (
                     <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0 }}
                       className="flex items-center gap-2 p-3 bg-green-50 text-forest border border-forest/20 rounded-xl mt-2 text-xs"
                     >
                       <CheckCircle className="h-4.5 w-4.5" />
                       <span className="font-semibold">Thank you for Volunteering! We added you to our weekly volunteer mailing list. You will receive assembly point schedules on Wednesday.</span>
                     </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}

        </div>
      </section>

      {/* AEO Community & Career Query Section */}
      <section id="getinvolved-aeo-knowledge" className="rounded-3xl border border-[#CC7722]/20 bg-white p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-ochre uppercase tracking-wider">
          <HelpCircle className="h-4 w-4" />
          <span>AEO Community Participation & Internship Answers</span>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              How Can Students and Professionals Apply for Sustainability Internships?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              Students and young professionals can submit applications for 8-to-12-week internships in Sustainable Product Design, Circular Supply Chains, and Community Outreach directly through our online Get Involved portal. Interns receive mentorship from experienced artisans, a monthly certificate of completion, and hands-on material prototyping experience.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#E8E2D9]">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              How Can Volunteers Participate in Community Waste Sorting Drives?
            </h2>
            <p className="text-sm text-earth-slate leading-relaxed font-sans">
              Volunteers can register for weekend community collection drives, fabric sorting bees, and educational eco workshops hosted at our urban recycling hubs. Registrations open bi-weekly with zero participation fee, providing safety gloves, training, and refreshments for all participants.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
