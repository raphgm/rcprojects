import React from 'react';
import { motion } from 'motion/react';
import { Heart, BookOpen, Unlock, Users, Target, Rocket } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left Column — Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-xl text-[10px] font-black tracking-[0.3em] uppercase mb-10 border border-brand-blue/20"
            >
              The Mission
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-[0.85] mb-12">
              Open Learning.<br />
              Real Skills.<br />
              <span className="text-brand-blue">Zero Barriers.</span>
            </h2>

            <div className="space-y-8 max-w-xl">
              <p className="text-2xl text-zinc-600 leading-snug font-medium">
                This is <strong className="text-zinc-900 underline decoration-brand-blue/30 decoration-4 underline-offset-4">Raphael Gab-Momoh's</strong> contribution to making cloud engineering accessible to everyone — regardless of background.
              </p>
              
              <p className="text-lg text-zinc-500 leading-relaxed">
                Inside, you'll find hands-on labs, practical lessons, and real-world projects — all designed for <strong className="text-zinc-900 font-bold italic">learning by doing</strong>. No passive watching, just pure engineering.
              </p>

              <div className="flex items-center gap-4 p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 shadow-sm group hover:border-brand-blue/20 transition-all">
                <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-blue/20 group-hover:rotate-12 transition-transform">
                  <Unlock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-1">Free Forever</div>
                  <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                    All core content is free. Optional paid support available for live guided sessions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Feature Cards */}
          <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-0">
            {[
              {
                icon: <Target className="w-7 h-7 text-brand-blue" />,
                title: 'Learning by Doing',
                body: 'Every lab and lesson exists for one reason: to build real skills. We provide root-access terminals and real cloud resources.',
                delay: 0.1,
              },
              {
                icon: <Heart className="w-7 h-7 text-rose-500" />,
                title: 'Community Driven',
                body: 'Designed for the next generation of SREs and DevOps engineers. Study it, share it, and build the future of the cloud.',
                delay: 0.2,
              },
              {
                icon: <Rocket className="w-7 h-7 text-indigo-500" />,
                title: 'Built for Scale',
                body: 'Whether you\'re switching careers or upskilling, our platform scales with you from zero to production-grade mastery.',
                delay: 0.3,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="bg-zinc-50 border border-zinc-100 rounded-[2.5rem] p-10 flex gap-8 items-start group transition-all cursor-default"
              >
                <div className="w-16 h-16 bg-white border border-zinc-200 rounded-3xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-all group-hover:border-brand-blue/30">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-zinc-900 mb-3 tracking-tight">{card.title}</h3>
                  <p className="text-zinc-500 leading-relaxed font-medium">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

