import React from 'react';
import { Github, Twitter, Linkedin, Youtube, Instagram, Mail, Sparkle } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: 'projects' | 'learn') => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tab: 'projects' | 'learn') => {
    onTabChange(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-white pt-32 pb-12 border-t border-zinc-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-8">
              <div className="bg-zinc-900 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-zinc-900/20 relative">
                <Sparkle className="absolute -top-2 -left-2 w-5 h-5 text-brand-blue fill-brand-blue" />
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                ealcloud<span className="text-zinc-400 font-mono font-medium tracking-tight">projects</span>
              </span>
            </div>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-sm mb-10">
              The world's most advanced hands-on learning platform for cloud engineers. Master real infrastructure, not simulations.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { icon: <Youtube className="w-5 h-5" />, label: 'YouTube' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-white hover:border-zinc-900 transition-all duration-300 shadow-sm hover:shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] mb-8">Platform</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => handleLinkClick('learn')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-brand-blue transition-colors"></div>
                  Interactive Labs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('projects')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-brand-blue transition-colors"></div>
                  Skill Trees
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('projects')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-brand-blue transition-colors"></div>
                  Enterprise
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] mb-8">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-blue-500 transition-colors"></div>Documentation</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-blue-500 transition-colors"></div>Community</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-blue-500 transition-colors"></div>Blog</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-blue-500 transition-colors"></div>Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] mb-8">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-rose-500 transition-colors"></div>About Us</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-rose-500 transition-colors"></div>Careers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-rose-500 transition-colors"></div>Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-zinc-200 group-hover:bg-rose-500 transition-colors"></div>Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-xs font-medium">
            © {new Date().getFullYear()} Realcloudprojects. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
              <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">All Systems Operational</span>
            </div>
            <button 
              onClick={scrollToTop}
              className="text-zinc-900 text-[10px] font-black uppercase tracking-widest hover:text-brand-blue transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
