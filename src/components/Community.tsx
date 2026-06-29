import React from 'react';
import { motion } from 'motion/react';
import { Users, Star, ArrowRight, MessageSquare, Heart, ShieldCheck, Zap } from 'lucide-react';

export const Community: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <section className="py-32 bg-zinc-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-zinc-950 rounded-[4rem] overflow-hidden px-10 py-20 md:px-24 md:py-32 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.3)]">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-blue/20 blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -30, 0],
                y: [0, 30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px]" 
            />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-brand-blue text-[10px] font-black uppercase tracking-[0.3em] mb-10"
              >
                <Users className="w-4 h-4" />
                Engineering Community
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-10"
              >
                Learn faster,<br />
                <span className="text-brand-blue">together.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-zinc-400 text-xl leading-relaxed mb-12 max-w-lg font-medium"
              >
                Join a global network of cloud engineers. Share solutions, master complex architectures, and build your career alongside the best.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStart}
                  className="px-10 py-5 bg-brand-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-brand-blue/90 transition-all shadow-2xl shadow-brand-blue/30 group cursor-pointer"
                >
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.a
                  href="https://discord.gg/realcloudprojects"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Join Discord
                </motion.a>
              </motion.div>

              {/* Stats badges */}
              <div className="mt-16 flex items-center gap-10">
                <div>
                  <div className="text-2xl font-black text-white mb-1">50k+</div>
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Members</div>
                </div>
                <div className="w-px h-10 bg-zinc-800" />
                <div>
                  <div className="text-2xl font-black text-white mb-1">12k+</div>
                  <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Labs Completed Today</div>
                </div>
              </div>
            </div>

            {/* Right Column — Card Stack */}
            <div className="relative">
              <div className="space-y-5">
                {[
                  { name: 'Lena K.', role: 'SRE @ Stripe', quote: 'I finally understand systemd after years of struggling. The labs are insanely practical.', seed: 'lena', icon: <Zap className="w-4 h-4 text-amber-400" /> },
                  { name: 'Tomás R.', role: 'DevOps Engineer', quote: 'Passed my CKA first try. The K8s labs here beat any paid prep course I tried.', seed: 'tomas', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
                  { name: 'Priya M.', role: 'Cloud Architect', quote: 'No theory fluff—just real terminals. This is what learning should feel like.', seed: 'priya', icon: <Heart className="w-4 h-4 text-rose-400" /> },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: -10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex gap-6 backdrop-blur-md transition-all cursor-default group"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={`https://picsum.photos/seed/comm_${item.seed}/100/100`}
                        alt={item.name}
                        className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-zinc-950 rounded-xl border border-white/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-brand-blue text-brand-blue" />
                        ))}
                      </div>
                      <p className="text-zinc-300 text-base leading-relaxed mb-4 font-medium italic">"{item.quote}"</p>
                      <div className="flex items-center gap-2">
                        <div className="text-white text-sm font-black uppercase tracking-wider">{item.name}</div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <div className="text-zinc-500 text-xs font-bold">{item.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-blue/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

