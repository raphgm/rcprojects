import React from 'react';
import { motion } from 'motion/react';
import { Search, Terminal, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-brand-blue" />,
      title: "Choose your path",
      description: "Select from 1000+ labs across Linux, Kubernetes, Docker, and more. Filter by skill level or technology stack."
    },
    {
      icon: <Terminal className="w-8 h-8 text-brand-blue" />,
      title: "Launch your sandbox",
      description: "Get a dedicated, private environment in seconds. No configuration needed—everything is pre-installed and ready to go."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-brand-blue" />,
      title: "Verify and master",
      description: "Follow guided instructions and use our automated verification tool to check your progress. Earn badges as you master new skills."
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mb-4">The Process</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight">How Realcloudprojects works.</h3>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 hidden lg:block"></div>

          <div className="grid lg:grid-cols-3 gap-16 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-[2rem] bg-white border border-zinc-200 shadow-xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-zinc-900 transition-all duration-500 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-900 text-white text-xs font-black flex items-center justify-center">
                    0{i + 1}
                  </div>
                  {step.icon}
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 mb-4">{step.title}</h4>
                <p className="text-zinc-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
