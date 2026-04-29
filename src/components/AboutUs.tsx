import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Unlock, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8">
              About
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[0.95] mb-8">
              Open Learning.<br />
              Real Skills.<br />
              <span className="text-brand-blue font-mono font-medium tracking-tight">Zero Barriers.</span>
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
              This is <strong className="text-zinc-900">Raphael Gab-Momoh's</strong> MVP contribution to making cloud
              engineering accessible to everyone — regardless of background.
            </p>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              Inside, you'll find hands-on labs, practical lessons, and real-world projects — all designed
              for <strong className="text-zinc-900">learning by doing</strong>.
            </p>
            <div className="flex items-center gap-3 px-5 py-4 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl w-fit">
              <Unlock className="w-5 h-5 text-brand-blue flex-shrink-0" />
              <p className="text-sm font-semibold text-zinc-700">
                <span className="text-brand-blue font-black">Free forever.</span> Optional paid support available if you need Live Guided Help.
              </p>
            </div>
          </motion.div>

          {/* Right — cards */}
          <div className="grid grid-cols-1 gap-5">
            {[
              {
                icon: <BookOpen className="w-6 h-6 text-brand-blue" />,
                title: 'Learning by Doing',
                body: 'Every lab and lesson exists for one reason: to build real skills. No passive video watching — just hands-on work in real environments.',
                delay: 0.1,
              },
              {
                icon: <Heart className="w-6 h-6 text-brand-blue" />,
                title: 'Free to Use',
                body: 'All content is free. No paywalls, no upsells. Study it, share it, build on it — the only cost is your time.',
                delay: 0.2,
              },
              {
                icon: <Users className="w-6 h-6 text-brand-blue" />,
                title: 'Built for Everyone',
                body: 'Whether you\'re switching careers, upskilling, or just curious — this platform meets you where you are.',
                delay: 0.3,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: card.delay }}
                className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 flex gap-5 items-start hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-colors"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
