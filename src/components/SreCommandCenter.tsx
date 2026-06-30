import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Database, GitBranch, Shield, Activity, 
  Sparkles, Flame, Zap, Play, Trophy, Users, Globe, ArrowUpRight, 
  DollarSign, AlertTriangle, CheckCircle, Plus
} from 'lucide-react';
import { projects, Project } from '../data/projects';

interface SreCommandCenterProps {
  onStartLab: (projectId: string, projectTitle: string) => void;
  completedLabs: string[];
  xp: number;
}

export function SreCommandCenter({ onStartLab, completedLabs, xp }: SreCommandCenterProps) {
  // Game Economy States
  const [cash, setCash] = useState<number>(10);
  const [activeUsers, setActiveUsers] = useState<number>(42);
  const [cpuCores, setCpuCores] = useState<number>(1);
  const [dbReplicas, setDbReplicas] = useState<number>(1);
  const [pipelineSpeed, setPipelineSpeed] = useState<number>(1); // lvl
  const [firewallLevel, setFirewallLevel] = useState<number>(1); // lvl
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  const [activeAlertText, setActiveAlertText] = useState<string>('');
  const [clickPackets, setClickPackets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [clickCount, setClickCount] = useState(0);

  // Dynamic calculations based on hardware and SRE completions
  const webLvl = completedLabs.includes('1') ? 3 : 1;
  const monLvl = completedLabs.includes('2') ? 3 : 1;
  const dbLvl = completedLabs.includes('3') ? 3 : 1;
  const cicdLvl = completedLabs.includes('5') ? 3 : 1;
  const secLvl = completedLabs.includes('11') ? 3 : 1;

  // Requests per second depends on web server level + cpu cores
  const requestsPerSec = (webLvl * 50) + (cpuCores * 15) + (isAlertActive ? -30 : 0);
  const activeIncome = Math.max(1, Math.floor(requestsPerSec / 10)); // $ per second

  // Idle game loop - generates cash passively every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCash(prev => prev + activeIncome);
      setActiveUsers(prev => {
        const targetUsers = 42 + (webLvl * 150) + (dbReplicas * 80);
        if (prev < targetUsers) return prev + 2;
        if (prev > targetUsers) return prev - 1;
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIncome, webLvl, dbReplicas]);

  // Alert generation loop
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (!isAlertActive && Math.random() > 0.4) {
        setIsAlertActive(true);
        const alerts = [
          'High API Latency on DB-01',
          'Kubernetes Pod CrashLoopBackOff',
          'Unauthorized Access Scan on Gateway'
        ];
        setActiveAlertText(alerts[Math.floor(Math.random() * alerts.length)]);
      }
    }, 30000);
    return () => clearInterval(alertInterval);
  }, [isAlertActive]);

  // Click handler to manually dispatch traffic and generate quick cash
  const handleManualDispatch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickPackets(prev => [...prev, { id: Date.now(), x, y }]);
    setCash(prev => prev + 5);
    setClickCount(c => c + 1);

    // Auto cleanup particles
    setTimeout(() => {
      setClickPackets(prev => prev.slice(1));
    }, 1000);
  };

  // Hardware upgrade handlers
  const buyCpuCore = () => {
    const cost = cpuCores * 40;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setCpuCores(prev => prev + 1);
    }
  };

  const buyDbReplica = () => {
    const cost = dbReplicas * 60;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setDbReplicas(prev => prev + 1);
    }
  };

  // Determine user SRE commander rank based on XP
  const getRank = (xpValue: number) => {
    if (xpValue >= 2000) return 'SRE Legend';
    if (xpValue >= 1000) return 'Cluster Commander';
    if (xpValue >= 500) return 'Infrastructure Officer';
    return 'DevOps Recruit';
  };

  const currentRank = getRank(xp);

  return (
    <div id="tycoon-section" className="bg-[#07090e] border-y border-cyan-500/10 text-zinc-100 font-mono relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none z-0 opacity-80" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Title bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-cyan-400">CLOUDQUEST: SRE IDLE TYCOON</h2>
              <div className="text-[10px] text-zinc-500">MANAGE TRAFFIC, BUY UPGRADES, UNLOCK LABS</div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <div className="flex items-center gap-2 border border-cyan-500/20 px-3 py-1.5 rounded-xl bg-cyan-950/10">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-zinc-500 font-bold uppercase">CASH:</span>
              <span className="text-emerald-400 font-black">${cash}</span>
            </div>
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950/30 px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-500 font-bold uppercase">RANK:</span>
              <span className="text-zinc-300 font-black">{currentRank}</span>
            </div>
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950/30 px-3 py-1.5 rounded-xl">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-500 font-bold uppercase">USERS:</span>
              <span className="text-cyan-400 font-black">{activeUsers}</span>
            </div>
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950/30 px-3 py-1.5 rounded-xl">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-500 font-bold uppercase">TRAFFIC:</span>
              <span className="text-cyan-400 font-black">{requestsPerSec} r/s</span>
            </div>
          </div>
        </div>

        {/* Live Grid Alerts */}
        <AnimatePresence>
          {isAlertActive && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-rose-950/60 border border-rose-500/30 rounded-2xl p-4 mb-8 flex items-center justify-between gap-4 backdrop-blur-sm animate-pulse"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <div>
                  <div className="text-[10px] text-rose-400 font-bold uppercase">INCIDENT ALERT ACTIVE</div>
                  <div className="text-xs text-zinc-200">{activeAlertText}</div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsAlertActive(false);
                  setCash(prev => Math.max(0, prev - 10)); // tiny resolution cost
                }}
                className="px-3 py-1.5 bg-rose-500 text-zinc-950 rounded-xl text-[10px] font-bold hover:bg-rose-400 transition-colors"
              >
                QUICK REBOOT (-$10)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Deck of Infrastructure Cards (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">INFRASTRUCTURE CARD DECK</h3>
              <span className="text-[10px] text-zinc-500">Hover or click cards to view hardware upgrades</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Web Server Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">TIER {webLvl}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mb-1">Web Server Node</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Capacity: {webLvl * 100} req/s. Upgrade tier by completing the Linux Web Server lab.</p>
                </div>
                <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                  <div className="text-[10px] text-zinc-400">CPU Cores: {cpuCores}</div>
                  <button 
                    onClick={buyCpuCore}
                    disabled={cash < cpuCores * 40}
                    className="px-2 py-1 bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-lg text-[9px] hover:bg-cyan-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    +1 Core (${cpuCores * 40})
                  </button>
                </div>
              </div>

              {/* Database Cluster Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">TIER {dbLvl}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mb-1">Database Cluster</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Redundancy: {dbLvl > 1 ? 'Cosmos Distributed' : 'Local SQLite'}. Complete Database lab to unlock tier 3.</p>
                </div>
                <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                  <div className="text-[10px] text-zinc-400">Replicas: {dbReplicas}</div>
                  <button 
                    onClick={buyDbReplica}
                    disabled={cash < dbReplicas * 60}
                    className="px-2 py-1 bg-purple-950 border border-purple-500/30 text-purple-400 rounded-lg text-[9px] hover:bg-purple-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    +1 Replica (${dbReplicas * 60})
                  </button>
                </div>
              </div>

            </div>

            {/* Interactive Terminal clicker console */}
            <div className="border border-cyan-500/20 bg-zinc-950/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-cyan-400 font-bold uppercase">MANUAL REQUEST CONTROLLER</span>
                <span className="text-[9px] text-zinc-600">Clicking dispatches packets to earn +$5 cash</span>
              </div>
              
              <button 
                onClick={handleManualDispatch}
                className="w-full py-8 border border-dashed border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-950/10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden"
              >
                <Zap className="w-6 h-6 text-cyan-400 animate-bounce" />
                <span className="text-xs font-bold text-cyan-400 tracking-widest">DISPATCH SYSTEM TRAFFIC</span>
                <span className="text-[9px] text-zinc-500">Pings: {clickCount}</span>

                {/* Flying click packet particles */}
                {clickPackets.map(p => (
                  <motion.div 
                    key={p.id}
                    initial={{ y: p.y, x: p.x, scale: 1, opacity: 1 }}
                    animate={{ y: p.y - 120, scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute text-emerald-400 text-xs font-black pointer-events-none"
                  >
                    +$5
                  </motion.div>
                ))}
              </button>
            </div>
          </div>

          {/* Upgrade Missions & Advisory (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Upgrade Target panel */}
            <div className="border border-cyan-500/10 bg-[#0a0d14]/75 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-cyan-400" /> UPGRADE TARGETS
              </h3>
              
              {webLvl < 3 ? (
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Target Lab Upgrade:</div>
                  <div className="text-xs font-bold text-zinc-200 mb-2">Linux Web Server Setup & Security</div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Complete this lab to permanently double your base requests capacity to Tier 3.</p>
                  <button 
                    onClick={() => onStartLab('1', 'Linux Web Server Setup & Security')}
                    className="w-full py-2.5 bg-cyan-500 text-zinc-950 rounded-xl text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1"
                  >
                    LAUNCH LAB MISSION <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 text-zinc-500 text-xs">
                  🎉 Primary upgrades unlocked. Explore other labs below!
                </div>
              )}
            </div>

            {/* Advisory chats */}
            <div className="border border-cyan-500/10 bg-[#0a0d14]/75 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-4">OPS CHAT & ADVICES</h3>
              <div className="space-y-4 max-h-[220px] overflow-y-auto no-scrollbar">
                
                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-cyan-400">Zia & Mia</span>
                    <span className="text-[8px] text-zinc-600">Advisors</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed">
                    "Use cash to add CPU cores and database replicas. They boost traffic income passively every second!"
                  </p>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-cyan-400">Raphael Gabriels</span>
                    <span className="text-[8px] text-zinc-600">CEO</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                    "Amazing velocity, Commander! Let's get our Active Users scaled past 1,000 soon."
                  </p>
                </div>

                <div className="border border-zinc-900 bg-zinc-950/40 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-cyan-400">Dumka Esaenwi PhD</span>
                    <span className="text-[8px] text-zinc-600">CTO</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                    "Alerts decrease capacity and slow down requests. Be sure to resolve active alerts quickly!"
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
