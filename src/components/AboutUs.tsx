import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-6">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            Built for learners, <span className="text-brand-blue font-mono font-medium">free for everyone.</span>
          </h2>
          <p className="text-lg text-zinc-600 leading-relaxed">
            These materials represent the <strong className="text-zinc-900">MVP contributions of Raphael Gab-Momoh</strong>,
            crafted to make hands-on cloud engineering accessible to all. Every lab, lesson, and project here
            is dedicated to learning — and is <strong className="text-zinc-900">100% free to use</strong>.
          </p>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed">
            You only pay if you request <strong className="text-zinc-900">Live Guided Help</strong>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5">
              <BookOpen className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">For Learning</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every lab and lesson on this site exists for one reason: to help you learn. No paywalls,
              no upsells — just real, hands-on cloud experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8"
          >
            <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5">
              <Heart className="w-6 h-6 text-brand-blue" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">Free to Use</h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              All materials are free to use. Study them, share them, build on them — they're here to help
              the next generation of cloud engineers grow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
