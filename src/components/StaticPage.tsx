import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkle } from 'lucide-react';
import { staticPages, StaticPageId } from '../data/staticPages';
import type { FooterTab } from './Footer';

interface StaticPageProps {
  pageId: StaticPageId;
  onTabChange: (tab: FooterTab) => void;
}

export const StaticPage: React.FC<StaticPageProps> = ({ pageId, onTabChange }) => {
  const page = staticPages[pageId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pageId]);

  if (!page) return null;

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
