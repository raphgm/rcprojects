import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkle, Target, BarChart3, 
  Zap, Mail, CheckCircle2, Building2, ChevronRight 
} from 'lucide-react';
import { staticPages, StaticPageId } from '../data/staticPages';
import type { FooterTab } from './Footer';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface StaticPageProps {
  pageId: StaticPageId;
  onTabChange: (tab: FooterTab) => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ pageId, onTabChange }) => {
  const page = staticPages[pageId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pageId]);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: '1-10'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!page) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        ...formData,
        submittedAt: new Date().toISOString()
      });
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        teamSize: '1-10'
      });
    } catch (err) {
      console.error('Error saving consultation request:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('consultation-form-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom Enterprise Render
  if (pageId === 'enterprise') {
    return (
      <div className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white">
        {/* Custom Hero Cover */}
        <section className="relative h-[540px] flex items-center overflow-hidden">
          {/* Cover Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/enterprise-hero.jpg")' }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/75 to-transparent" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-white">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              {/* Back Link */}
              <button 
                onClick={() => onTabChange('projects')}
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-xs mb-6 transition-colors"
              >
                &larr; Back to Home
              </button>

              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/20 border border-brand-blue/30 rounded-full mb-6">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">
                  FOR ENTERPRISE
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                Transform Your Engineering Team
              </h1>

              {/* Intro Subtext */}
              <p className="text-sm md:text-base text-zinc-300 mb-8 leading-relaxed">
                Customized technical training programs to bridge skill gaps, accelerate onboarding, and drive innovation.
              </p>

              {/* Get Demo Action */}
              <button
                onClick={scrollToForm}
                className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98] shadow-lg shadow-brand-blue/20 cursor-pointer"
              >
                Get a Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* Luxoft Cards Section */}
        <section className="py-20 md:py-24 bg-zinc-50 border-b border-zinc-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm flex flex-col items-start hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-zinc-950 mb-2">Custom Learning Paths</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  We align curriculum with your specific tech stack and business goals.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm flex flex-col items-start hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-zinc-950 mb-2">Actionable Analytics</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Track team progress, skill acquisition, and project completion in real-time.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm flex flex-col items-start hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-zinc-950 mb-2">Expert Mentorship</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Live code reviews and Q&A sessions with senior engineers from top tech firms.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Curriculum That Scales With You */}
        <section className="py-20 md:py-24 bg-[#101935] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
                Curriculum That Scales With You
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                From onboarding junior devs to upskilling seniors in Cloud Native architecture. Choose from our catalog or let us build a bespoke program.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white/95">Cloud & DevOps (AWS, Azure, Kubernetes)</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white/95">Modern Frontend (React, Next.js, TypeScript)</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white/95">Backend Microservices (Node.js, Python, Go)</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white/95">Data Engineering & AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule a Consultation */}
        <section id="consultation-form-section" className="py-20 md:py-24 bg-zinc-50 border-t border-zinc-200/50">
          <div className="max-w-xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">
                Schedule a Consultation
              </h2>
              <p className="text-xs text-zinc-500 mt-2">
                Tell us about your team's needs and we'll design a program for you.
              </p>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-sm">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit} 
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-wider mb-1.5">First Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.firstName}
                          onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-wider mb-1.5">Last Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.lastName}
                          onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-wider mb-1.5">Work Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-wider mb-1.5">Company</label>
                      <input 
                        type="text" 
                        required
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-wider mb-1.5">Team Size to Train</label>
                      <select 
                        value={formData.teamSize}
                        onChange={e => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-blue-600 disabled:bg-zinc-300 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Information'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-zinc-900">Request Submitted!</h3>
                    <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      Thank you for your interest! A training advisor will contact you within 24 business hours to discuss your team's requirements.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Standard Page Render
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-100">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-blue/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full mb-6">
              <Sparkle className="w-3 h-3 text-brand-blue fill-brand-blue" />
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-wider">
                {page.eyebrow}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6">
              {page.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-3xl leading-relaxed">
              {page.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {page.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-b border-zinc-100 pb-16 last:border-0 last:pb-0"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight mb-4">
                {section.heading}
              </h2>
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-4">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="space-y-2 mt-4">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-zinc-700 text-base"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-10 md:p-14 border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
                Ready to get hands-on?
              </h3>
              <p className="text-zinc-500">
                Pick a skill tree or jump straight into a lab — no setup required.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onTabChange('learn')}
                className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-900 hover:border-zinc-900 transition-all"
              >
                Skill Trees
              </button>
              <button
                onClick={() => onTabChange('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20"
              >
                Browse Labs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
