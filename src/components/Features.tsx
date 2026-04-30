import React from 'react';
import { Terminal, Cpu, Layout, Zap, Shield, Globe, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SquigglyArrow, Sparkle, HandCircle, DoodleWrapper } from './Doodles';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Terminal className="w-5 h-5 text-brand-blue" />,
      title: 'Full Linux Environments',
      description: 'Get a complete, root-access Linux terminal in seconds. Practice shell scripting and system admin.',
      color: 'brand-blue'
    },
    {
      icon: <Cpu className="w-5 h-5 text-brand-blue" />,
      title: 'Real Infrastructure',
      description: 'Real Azure, Kubernetes, and Linux infrastructure. No simulations, just the real deal in your browser.',
      color: 'brand-blue'
    },
    {
      icon: <Layout className="w-5 h-5 text-brand-blue" />,
      title: 'Skill Trees',
      description: 'Structured learning paths that guide you from zero to hero with clear milestones.',
      color: 'brand-blue'
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-blue" />,
      title: 'Automated Verification',
      description: 'Our platform automatically checks your work and provides instant, actionable feedback.',
      color: 'brand-blue'
    }
  ];

  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
      {/* Doodles */}
      <DoodleWrapper className="top-10 right-10 text-white/10 w-24 h-24">
        <Sparkle />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-20 left-10 text-white/10 w-32 h-32 -rotate-45">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 w-[800px] h-[800px]">
        <HandCircle />
      </DoodleWrapper>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-blue/20"
            >
              <Shield className="w-3 h-3" />
              Platform Capabilities
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-6">
              Everything you need to <br />
              <span className="text-zinc-500 font-mono font-medium tracking-tight">master</span> the cloud.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-zinc-400 text-lg leading-relaxed border-l-2 border-brand-blue/30 pl-8">
              We've built the ultimate sandbox for engineers. No more tutorials, just pure hands-on experience with production-grade infrastructure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-zinc-800/40 border border-white/5 p-8 rounded-[2rem] hover:bg-zinc-800/60 transition-all duration-500 hover:border-white/10 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] after:absolute after:inset-0 after:rounded-[2rem] after:shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.05)]"
            >
              <div className="mb-8 relative">
                <div className={`w-12 h-12 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 bg-${feature.color}-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
              
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                {feature.title}
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                {feature.description}
              </p>
              
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-${feature.color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </motion.div>
          ))}
        </div>

        {/* Technical Detail Row */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-white/10 transition-all">
            <div className="shrink-0 w-20 h-20 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl">
              <Globe className="w-8 h-8 text-brand-blue" />
            </div>
            <div>
              <div className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-2">Global Infrastructure</div>
              <h4 className="text-xl font-bold mb-2">Multi-Region Deployment</h4>
              <p className="text-zinc-500 text-sm max-w-md">Practice high-availability setups across Azure regions — UK South, West Europe, East US — with zero latency.</p>
            </div>
          </div>
          <div className="bg-brand-blue rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-brand-blue/90 transition-all cursor-pointer shadow-lg shadow-brand-blue/20">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-blue" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-zinc-900 mb-1">Start Lab</h4>
              <p className="text-zinc-900/60 text-xs font-medium uppercase tracking-wider">Instant Provisioning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
