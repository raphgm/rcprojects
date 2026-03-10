import React from 'react';
import { motion } from 'motion/react';

export const SquigglyArrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,50 Q30,20 50,50 T90,50" />
    <path d="M80,40 L90,50 L80,60" />
  </svg>
);

export const HandCircle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M50,10 C20,10 10,40 10,60 C10,85 40,95 70,85 C95,75 95,30 70,15 C60,10 40,15 35,20" />
  </svg>
);

export const Sparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50,0 L55,45 L100,50 L55,55 L50,100 L45,55 L0,50 L45,45 Z" />
  </svg>
);

export const ZigZag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M0,10 L10,0 L20,20 L30,0 L40,20 L50,0 L60,20 L70,0 L80,20 L90,0 L100,10" />
  </svg>
);

export const DoodleWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`absolute pointer-events-none select-none ${className}`}
  >
    {children}
  </motion.div>
);
