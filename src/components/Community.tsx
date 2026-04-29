import React from 'react';
import { motion } from 'motion/react';
import { Users, Star, ArrowRight, MessageSquare } from 'lucide-react';

export const Community: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  return (
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-zinc-900 rounded-[3rem] overflow-hidden px-8 py-16 md:px-20 md:py-24">
          {/* Background radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-blue/30 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-blue/20 blur-[120px]" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-[10px] font-black uppercase tracking-[0.2em] mb-8"
              >
                <Users className="w-3 h-3" />
                Community
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-8"
              >
                Learn faster,<br />
                <span className="text-brand-blue">together.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg"
              >
                Join a global community of engineers who share tips, solutions, and career advice. Get unstuck fast with peer help and expert office hours.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStart}
                  className="px-8 py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-blue/90 transition-all shadow-2xl shadow-brand-blue/30 group cursor-pointer"
                >
                  Start Learning Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.a
                  href="https://discord.gg/realcloudprojects"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/15 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Join Discord
                </motion.a>
              </motion.div>
            </div>

            {/* Right — social proof stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { name: 'Lena K.', role: 'SRE @ Stripe', quote: 'I finally understand systemd after years of struggling. The labs are insanely practical.', seed: 'lena' },
                { name: 'Tomás R.', role: 'DevOps Engineer', quote: 'Passed my CKA first try. The K8s labs here beat any paid prep course I tried.', seed: 'tomas' },
                { name: 'Priya M.', role: 'Cloud Architect', quote: 'No videos, no theory fluff—just real terminals. This is what learning infrastructure should feel like.', seed: 'priya' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4 hover:bg-white/8 transition-colors"
                >
                  <img
                    src={`https://picsum.photos/seed/comm_${item.seed}/80/80`}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">"{item.quote}"</p>
                    <div className="text-white text-xs font-bold">{item.name}</div>
                    <div className="text-zinc-500 text-xs">{item.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
