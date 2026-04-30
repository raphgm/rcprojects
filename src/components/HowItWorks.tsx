import React from 'react';
import { motion } from 'motion/react';
import { Layers, Terminal, BadgeCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Layers className="w-6 h-6 text-brand-blue" />,
    title: 'Pick a skill path',
    description: 'Choose from 28 paths across Linux, Cloud, DevOps, and Security. Filter by level — beginner to advanced.',
    color: 'bg-blue-50',
  },
  {
    number: '02',
    icon: <Terminal className="w-6 h-6 text-violet-600" />,
    title: 'Launch your sandbox',
    description: 'A private, pre-configured environment spins up in seconds. No installs, no config — just start building.',
    color: 'bg-violet-50',
  },
  {
    number: '03',
    icon: <BadgeCheck className="w-6 h-6 text-emerald-600" />,
    title: 'Verify & earn XP',
    description: 'Run `realcloud verify` and our engine checks your work automatically. Pass → XP and badges. Fail → a hint.',
    color: 'bg-emerald-50',
  },
];

export const HowItWorks: React.FC = () => (
  <section className="py-28 bg-zinc-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-xl mb-20">
        <p className="text-[11px] font-black text-brand-blue uppercase tracking-[0.3em] mb-3">How it works</p>
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
          From zero to cloud engineer.<br />
          <span className="text-zinc-400 font-medium">Three steps.</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-8 border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <span className="text-4xl font-black text-zinc-100 group-hover:text-zinc-200 transition-colors tabular-nums">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
