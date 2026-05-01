import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  { value: 10,   suffix: 'k+',  label: 'Engineers trained' },
  { value: 1000, suffix: '+',   label: 'Hands-on labs' },
  { value: 28,   suffix: '',    label: 'Skill paths' },
  { value: 4.9,  suffix: '/5',  label: 'Average rating' },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const step = 16;
    const increment = (value / duration) * step;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value, isDecimal]);

  return <>{isDecimal ? display.toFixed(1) : display.toLocaleString()}{suffix}</>;
}

export const StatsBar: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="py-8 bg-zinc-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center py-4 px-6 rounded-2xl bg-white/4 border border-white/6 hover:bg-white/7 transition-colors"
            >
              <div className="text-4xl font-black text-white mb-1 tabular-nums">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
