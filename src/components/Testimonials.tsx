import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "Realcloud changed how I learn DevOps. The instant sandbox environments are a game changer compared to setting up local VMs.",
      author: "Amara Okafor",
      role: "Platform Engineer at Northwind",
      image: "https://picsum.photos/seed/amara/100/100",
      rating: 5
    },
    {
      content: "The Kubernetes labs are the most comprehensive I've found. I passed my CKA exam thanks to the hands-on practice here.",
      author: "Marcus Rodriguez",
      role: "Cloud Architect",
      image: "https://picsum.photos/seed/marcus/100/100",
      rating: 5
    },
    {
      content: "As a hiring manager, I recommend Realcloud to all our junior engineers. It's the fastest way to get them up to speed with our stack.",
      author: "David Kim",
      role: "Engineering Manager at ScaleUp",
      image: "https://picsum.photos/seed/david/100/100",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-brand-blue/10"
            >
              Success Stories
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-[0.9]">
              Trusted by the best <br />
              <span className="text-zinc-400">in the industry.</span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/face_proof_${i}/100/100`} 
                  alt="User" 
                  className="w-12 h-12 rounded-2xl border-4 border-white shadow-sm object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="text-xl font-black text-zinc-900 leading-none mb-1">50k+</div>
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Engineers</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-zinc-50/50 p-10 rounded-[3rem] border border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="flex items-center gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-blue text-brand-blue" />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors" />
                <p className="relative z-10 text-zinc-700 text-xl leading-relaxed font-medium mb-12 italic">
                  "{t.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-zinc-100">
                <div className="relative">
                  <img 
                    src={t.image} 
                    alt={t.author} 
                    className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-blue rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-black text-zinc-900 text-base">{t.author}</div>
                  <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { CheckCircle2 } from 'lucide-react';

