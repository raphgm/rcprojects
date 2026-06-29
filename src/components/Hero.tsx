import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal, Zap, GitBranch, Box } from 'lucide-react';

const ROTATING_WORDS = ['Linux', 'Kubernetes', 'Azure', 'AWS', 'DevOps', 'Docker'];

const TERMINAL_LINES = [
  { delay: 0,    text: '$ realcloud init --env production',        type: 'cmd' },
  { delay: 600,  text: '  Spinning up isolated sandbox...',         type: 'out' },
  { delay: 1100, text: '  Provisioning K8s cluster        [OK]',    type: 'ok'  },
  { delay: 1600, text: '$ kubectl apply -f deployment.yaml',        type: 'cmd' },
  { delay: 2200, text: '  deployment.apps/nginx created',           type: 'out' },
  { delay: 2700, text: '$ realcloud verify',                        type: 'cmd' },
  { delay: 3300, text: '  ✓ All checks passed. +250 XP earned!',    type: 'ok'  },
];

const PILLS = [
  { icon: <Terminal className="w-3.5 h-3.5" />, label: 'Linux' },
  { icon: <Box className="w-3.5 h-3.5" />,      label: 'Docker' },
  { icon: <GitBranch className="w-3.5 h-3.5" />, label: 'DevOps' },
  { icon: <Zap className="w-3.5 h-3.5" />,      label: 'Security' },
  { icon: <Zap className="w-3.5 h-3.5" />,      label: 'AWS' },
  { icon: <Zap className="w-3.5 h-3.5" />,      label: 'Azure' },
];

function TypingTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    );
    // loop: restart after last line + pause
    const loop = setTimeout(() => setVisibleCount(0), 5000);
    return () => { timers.forEach(clearTimeout); clearTimeout(loop); };
  }, [visibleCount === 0 ? 0 : undefined]);

  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl border border-white/5 font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-rose-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-[11px] text-zinc-500 tracking-widest uppercase">cloud-sandbox</span>
      </div>
      {/* Output */}
      <div className="p-5 space-y-1.5 min-h-[200px]">
        {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.type === 'cmd' ? 'text-brand-blue' :
              line.type === 'ok'  ? 'text-emerald-400' :
              'text-zinc-400'
            }
          >
            {line.text}
          </motion.div>
        ))}
        <span className={`text-brand-blue transition-opacity duration-100 ${cursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
      </div>
    </div>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % ROTATING_WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: '220px' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-brand-blue"
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export const Hero: React.FC<{ onStart?: () => void; onViewSkillTrees?: () => void }> = ({ onStart, onViewSkillTrees }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/8 border border-brand-blue/20 text-brand-blue text-[11px] font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              100% Hands-on. Zero fluff.
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1] text-zinc-900 mb-6">
              Master <RotatingWord /><br />
              <span className="text-zinc-400 font-medium">by building</span><br />
              real things.
            </h1>

            <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-md">
              1,000+ hands-on labs in Linux, Cloud, and DevOps. Real infrastructure spins up in your browser in seconds — no setup, no simulations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold flex items-center gap-2.5 hover:bg-brand-blue transition-colors shadow-lg shadow-zinc-900/10 text-base cursor-pointer"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onViewSkillTrees}
                className="px-8 py-4 bg-white border border-zinc-200 text-zinc-700 rounded-2xl font-bold hover:border-zinc-400 hover:text-zinc-900 transition-colors text-base cursor-pointer"
              >
                Browse skill trees
              </motion.button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&crop=faces&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&crop=faces&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&crop=faces&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&crop=faces&q=80',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop&crop=faces&q=80'
                ].map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Engineer Profile"
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm text-zinc-500">
                <span className="font-bold text-zinc-900">10,000+</span> engineers already learning
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="ml-1 font-semibold text-zinc-700 text-xs">4.9 / 5</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — terminal + floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            <TypingTerminal />

            {/* Topic pills scattered around */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden lg:flex">
              {PILLS.slice(0, 3).map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-100 rounded-full shadow-sm text-zinc-600 text-xs font-semibold"
                >
                  {p.icon} {p.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
