import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Terminal, Shield, Cpu } from 'lucide-react';
import { SquigglyArrow, Sparkle, HandCircle, DoodleWrapper } from './Doodles';

export const Hero: React.FC<{ onStart?: () => void; onViewSkillTrees?: () => void }> = ({ onStart, onViewSkillTrees }) => {
  return (
    <div className="relative overflow-hidden bg-white pt-24 pb-32">
      {/* Doodle Elements */}
      <DoodleWrapper className="top-20 left-[10%] text-brand-blue/20 w-24 h-24 -rotate-12">
        <HandCircle />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-40 right-[15%] text-brand-blue/20 w-32 h-32 rotate-45">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="top-1/4 right-[25%] text-brand-blue/30 w-12 h-12 animate-pulse">
        <Sparkle />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-20 left-[20%] text-brand-blue/20 w-16 h-16 rotate-180">
        <Sparkle />
      </DoodleWrapper>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black bg-brand-blue/10 text-brand-blue mb-8 uppercase tracking-[0.2em] border border-brand-blue/20">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-blue mr-2 animate-pulse"></span>
              The Future of Learning
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900 mb-8 leading-[0.95]">
              Build your <br />
              <span className="inline-block bg-zinc-900 text-white px-4 py-2 mt-2 mb-2 font-mono font-medium tracking-tight">expertise</span> <br />
              hands-on.
            </h1>
            <p className="text-xl text-zinc-500 mb-12 leading-relaxed max-w-lg font-medium">
              Access 1000+ interactive labs in Linux, Cloud, and DevOps. No setup, no simulations—just real infrastructure in your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStart}
                className="w-full sm:w-auto px-12 py-5 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-blue/90 transition-all shadow-2xl shadow-brand-blue/20 group text-lg cursor-pointer"
              >
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewSkillTrees}
                className="w-full sm:w-auto px-12 py-5 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all text-lg cursor-pointer"
              >
                View Skill Trees
              </motion.button>
            </div>
            
            <div className="mt-16 flex items-center gap-10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/user_hero_${i}/100/100`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <span className="font-black text-zinc-900">4.9/5</span>
                <span className="text-zinc-500 ml-2">from 50,000+ engineers</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-zinc-900 rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-zinc-800 aspect-square flex flex-col group">
              <div className="bg-zinc-800/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-zinc-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-blue/80"></div>
                </div>
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Cloud Sandbox v2.4</div>
                <div className="w-10"></div>
              </div>
              <div className="flex-1 p-8 font-mono text-sm leading-relaxed">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-zinc-600">01</span>
                    <p className="text-brand-blue">$ realcloud init --env production</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">02</span>
                    <p className="text-zinc-400">Initializing secure container...</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">03</span>
                    <p className="text-zinc-400">Provisioning K8s cluster [OK]</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">04</span>
                    <p className="text-brand-blue">$ kubectl apply -f deployment.yaml</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">05</span>
                    <p className="text-zinc-400">deployment.apps/nginx-server created</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">06</span>
                    <p className="text-brand-blue">$ realcloud verify</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">07</span>
                    <p className="text-brand-blue font-bold">✓ Verification successful! Lab complete.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-zinc-600">08</span>
                    <span className="text-brand-blue animate-pulse">_</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative terminal elements */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating badges with glassmorphism */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue rounded-2xl shadow-lg shadow-brand-blue/20">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-zinc-900 uppercase tracking-tight">Real Hardware</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Bare metal performance</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-gray rounded-2xl shadow-lg shadow-brand-gray/20">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black text-zinc-900 uppercase tracking-tight">1,240 Labs</div>
                  <div className="text-[11px] text-zinc-500 font-medium">Curated by experts</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-50 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
