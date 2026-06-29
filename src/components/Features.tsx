import React from 'react';
import { Terminal, Cpu, Layout, Zap, Shield, Globe, CheckCircle2, ArrowUpRight, Cloud, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { SquigglyArrow, Sparkle, HandCircle, DoodleWrapper } from './Doodles';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Terminal className="w-6 h-6 text-brand-blue" />,
      title: 'Full Linux Environments',
      description: 'Get a complete, root-access Linux terminal in seconds. Practice shell scripting and system admin.',
      color: 'brand-blue'
    },
    {
      icon: <Cloud className="w-6 h-6 text-emerald-500" />,
      title: 'Real Infrastructure',
      description: 'Real AWS, Azure, and GCP resources. No simulations, just the real deal in your browser.',
      color: 'emerald'
    },
    {
      icon: <Layers className="w-6 h-6 text-violet-500" />,
      title: 'Skill Trees',
      description: 'Structured learning paths that guide you from zero to hero with clear milestones.',
      color: 'violet'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Automated Verification',
      description: 'Our platform automatically checks your work and provides instant, actionable feedback.',
      color: 'amber'
    }
  ];

  return (
    <section className="py-32 bg-zinc-950 text-white overflow-hidden relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Doodles */}
      <DoodleWrapper className="top-20 right-20 text-white/5 w-24 h-24">
        <Sparkle />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-40 left-20 text-white/5 w-32 h-32 -rotate-45">
        <SquigglyArrow />
      </DoodleWrapper>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10"
            >
              <Shield className="w-3.5 h-3.5 text-brand-blue" />
              Platform Capabilities
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-8">
              Everything you need to <br />
              <span className="text-zinc-600 font-mono font-medium tracking-tight">master</span> the cloud.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-500 text-lg leading-relaxed pl-8 border-l border-zinc-800">
              We've built the ultimate sandbox for engineers. No more tutorials, just pure hands-on experience with production-grade infrastructure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative bg-zinc-900/50 border border-white/5 p-10 rounded-[2.5rem] hover:bg-zinc-900 transition-all duration-500 hover:border-white/20 shadow-2xl"
            >
              <div className="mb-10 relative">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                  {feature.icon}
                </div>
                <div className="absolute -inset-2 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-brand-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                {feature.description}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                Learn more
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 border-t-2 border-r-2 border-brand-blue/30 rounded-tr-xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Infrastructure Row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 group hover:border-white/10 transition-all"
          >
            <div className="shrink-0 w-24 h-24 rounded-[2rem] bg-zinc-950 border border-white/10 flex items-center justify-center shadow-inner group-hover:shadow-brand-blue/5 transition-all">
              <Globe className="w-10 h-10 text-brand-blue animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <div className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] mb-4">Global Infrastructure</div>
              <h4 className="text-2xl font-bold mb-3 text-white">Multi-Region Deployment</h4>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xl">Practice high-availability setups across AWS, Azure, and GCP regions with zero latency. Master global architecture from day one.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-brand-blue rounded-[2.5rem] p-10 flex flex-col justify-between group hover:brightness-105 transition-all cursor-pointer shadow-2xl shadow-brand-blue/20"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center shadow-xl">
                <Zap className="w-7 h-7 text-brand-blue" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-950/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-zinc-950" />
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-3xl font-black text-zinc-950 tracking-tight mb-1">Start Lab</h4>
              <p className="text-zinc-950/60 text-xs font-black uppercase tracking-[0.2em]">Instant Provisioning</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

