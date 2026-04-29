import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "Realcloud changed how I learn DevOps. The instant sandbox environments are a game changer compared to setting up local VMs.",
      author: "Amara Okafor",
      role: "Platform Engineer at Northwind",
      image: "https://picsum.photos/seed/amara/100/100"
    },
    {
      content: "The Kubernetes labs are the most comprehensive I've found. I passed my CKA exam thanks to the hands-on practice here.",
      author: "Marcus Rodriguez",
      role: "Cloud Architect",
      image: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      content: "As a hiring manager, I recommend Realcloud to all our junior engineers. It's the fastest way to get them up to speed with our stack.",
      author: "David Kim",
      role: "Engineering Manager at ScaleUp",
      image: "https://picsum.photos/seed/david/100/100"
    }
  ];

  return (
    <section className="py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mb-4">Success Stories</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight">Trusted by the best in the industry.</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/face_${i}/100/100`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-zinc-50"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm font-bold text-zinc-900">
              Join 50k+ engineers
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-zinc-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <Quote className="w-10 h-10 text-zinc-100 mb-8" />
              <p className="text-zinc-600 text-lg leading-relaxed mb-10 flex-1 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-12 h-12 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-zinc-900">{t.author}</div>
                  <div className="text-xs text-zinc-500 font-medium">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
