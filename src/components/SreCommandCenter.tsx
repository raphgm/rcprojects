import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Database, GitBranch, Shield, Activity, 
  Sparkles, Flame, Zap, Trophy, Users, Globe, ArrowUpRight, 
  DollarSign, AlertTriangle, CheckCircle, Plus, HardDrive, Terminal as TermIcon
} from 'lucide-react';

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
  const [loadBalancers, setLoadBalancers] = useState<number>(1);
  const [pipelineLvl, setPipelineLvl] = useState<number>(0);
  
  // Alert & Health States
  const [systemHealth, setSystemHealth] = useState<number>(100);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
  const [activeAlertText, setActiveAlertText] = useState<string>('');
  
  // Interaction Visual States
  const [clickPackets, setClickPackets] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [shake, setShake] = useState(false);

  // Live Terminal Logs
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Booting CloudQuest SRE Cluster...',
    '[SYSTEM] Establishing secure gRPC channels...',
    '[INFO] 127.0.0.1 - GET /index.html - 200 OK (5ms)'
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic calculations based on hardware and SRE completions
  const webLvl = completedLabs.includes('1') ? 3 : 1;
  const dbLvl = completedLabs.includes('3') ? 3 : 1;
  const cicdLvl = completedLabs.includes('5') ? 3 : 1;
  const monLvl = completedLabs.includes('2') ? 3 : 1;

  // Multiplier from load balancers
  const clickMultiplier = 5 + (loadBalancers - 1) * 3;
  const requestsPerSec = (webLvl * 50) + (cpuCores * 20) + (dbReplicas * 15) + (isAlertActive ? -40 : 0);
  
  // Passive income is halved if system health drops below 50%
  const basePassiveIncome = Math.max(1, Math.floor(requestsPerSec / 8)) + (pipelineLvl * 4);
  const passiveIncome = systemHealth < 50 ? Math.floor(basePassiveIncome / 2) : basePassiveIncome;

  // Add a log helper
  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-30), msg]);
  };

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Passive game loop (cash generation, active users scaling, health decay)
  useEffect(() => {
    const interval = setInterval(() => {
      setCash(prev => prev + passiveIncome);
      
      // Health decay if alert is active
      if (isAlertActive) {
        setSystemHealth(prev => Math.max(15, prev - 4));
      } else {
        setSystemHealth(prev => Math.min(100, prev + 2));
      }

      // Scaling active users
      setActiveUsers(prev => {
        const targetUsers = 42 + (webLvl * 200) + (dbReplicas * 100) + (loadBalancers * 150);
        if (prev < targetUsers) return prev + 3;
        if (prev > targetUsers) return prev - 2;
        return prev;
      });

      // Periodic random log entries
      const ips = ['192.168.1.5', '10.0.2.14', '8.8.8.8', '172.16.0.4'];
      const endpoints = ['/api/v1/metrics', '/static/bundle.js', '/healthz', '/api/v1/auth/login'];
      const lat = Math.floor(Math.random() * 20) + 1;
      const randomIp = ips[Math.floor(Math.random() * ips.length)];
      const randomEnd = endpoints[Math.floor(Math.random() * endpoints.length)];
      addLog(`[INFO] ${randomIp} - GET ${randomEnd} - 200 OK (${lat}ms)`);
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome, isAlertActive, webLvl, dbReplicas, loadBalancers]);

  // Alert generation loop
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (!isAlertActive && Math.random() > 0.4) {
        setIsAlertActive(true);
        const alerts = [
          'High Latency spike on PostgreSQL cluster DB-01',
          'Kubernetes Pod CrashLoopBackOff: web-deployment',
          'CPU saturation threat detected on Web-Node-02',
          '502 Bad Gateway response rates rising'
        ];
        const chosenAlert = alerts[Math.floor(Math.random() * alerts.length)];
        setActiveAlertText(chosenAlert);
        addLog(`[CRITICAL] ${chosenAlert}`);
      }
    }, 15000);
    return () => clearInterval(alertInterval);
  }, [isAlertActive]);

  // Click handler to manually dispatch traffic
  const handleManualDispatch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickPackets(prev => [...prev, { id: Date.now(), x, y, text: `+$${clickMultiplier}` }]);
    setCash(prev => prev + clickMultiplier);
    setClickCount(c => c + 1);
    setShake(true);
    setTimeout(() => setShake(false), 150);

    const randomLogs = [
      '[PING] Sent ping packet to node-web-01...',
      `[TRAFFIC] Dispatched manual request multiplier (+${clickMultiplier} cash)`,
      '[PING] Latency check target-ip: 8.8.8.8 success (12ms)'
    ];
    addLog(randomLogs[Math.floor(Math.random() * randomLogs.length)]);

    // Auto cleanup particles
    setTimeout(() => {
      setClickPackets(prev => prev.filter(p => Date.now() - p.id < 900));
    }, 1000);
  };

  // Hardware upgrade handlers
  const buyCpuCore = () => {
    const cost = cpuCores * 40;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setCpuCores(prev => prev + 1);
      addLog(`[UPGRADE] CPU Cores scaled to ${cpuCores + 1} (Spent $${cost})`);
    }
  };

  const buyDbReplica = () => {
    const cost = dbReplicas * 60;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setDbReplicas(prev => prev + 1);
      addLog(`[UPGRADE] Database replicas scaled to ${dbReplicas + 1} (Spent $${cost})`);
    }
  };

  const buyLoadBalancer = () => {
    const cost = loadBalancers * 90;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setLoadBalancers(prev => prev + 1);
      addLog(`[UPGRADE] Load balancer nodes scaled to ${loadBalancers + 1} (Spent $${cost})`);
    }
  };

  const buyPipelineLvl = () => {
    const cost = (pipelineLvl + 1) * 120;
    if (cash >= cost) {
      setCash(prev => prev - cost);
      setPipelineLvl(prev => prev + 1);
      addLog(`[UPGRADE] CI/CD pipeline level upgraded to ${pipelineLvl + 1} (Spent $${cost})`);
    }
  };

  const resolveIncident = () => {
    setIsAlertActive(false);
    setSystemHealth(100);
    addLog('[SUCCESS] Incident resolved! Hot-rebooted node successfully.');
  };

  // SRE rank calculations
  const getRank = (xpValue: number) => {
    if (xpValue >= 2000) return 'SRE Legend';
    if (xpValue >= 1000) return 'Cluster Commander';
    if (xpValue >= 500) return 'Infrastructure Officer';
    return 'DevOps Recruit';
  };

  const currentRank = getRank(xp);

  return (
    <div id="tycoon-section" className={`bg-[#07090e] border-y border-cyan-500/10 text-zinc-100 font-mono relative overflow-hidden py-16 transition-all duration-150 ${shake ? 'translate-y-1' : ''}`}>
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

        {/* System Health Meter */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-zinc-300">CLUSTER HEALTH:</span>
            <span className={`text-xs font-black ${systemHealth < 50 ? 'text-rose-500' : 'text-emerald-400'}`}>{systemHealth}%</span>
          </div>

          <div className="w-full md:w-[60%] h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
            <div 
              className={`h-full transition-all duration-300 ${systemHealth < 40 ? 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : systemHealth < 75 ? 'bg-amber-500' : 'bg-emerald-400'}`}
              style={{ width: `${systemHealth}%` }}
            />
          </div>

          {systemHealth < 50 && (
            <div className="text-[10px] text-rose-500 font-black animate-pulse">⚠️ DEGRADED HEALTH: 50% PASSIVE INCOME LOSS!</div>
          )}
        </div>

        {/* Incident Alerts */}
        <AnimatePresence>
          {isAlertActive && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-rose-950/60 border border-rose-500/30 rounded-2xl p-4 mb-8 flex items-center justify-between gap-4 backdrop-blur-sm animate-pulse"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 animate-bounce" />
                <div>
                  <div className="text-[10px] text-rose-400 font-bold uppercase">CRITICAL INCIDENT ALERT</div>
                  <div className="text-xs text-zinc-200">{activeAlertText}</div>
                </div>
              </div>
              <button 
                onClick={resolveIncident}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-zinc-950 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-rose-500/20"
              >
                QUICK REBOOT
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Deck of Infrastructure Cards */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">INFRASTRUCTURE CARD DECK</h3>
              <span className="text-[10px] text-zinc-500">Buy upgrades to increase capacity & multiplier</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Web Server Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 hover:border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between transition-colors">
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
                    className="px-2 py-1 bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-lg text-[9px] hover:bg-cyan-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    +1 Core (${cpuCores * 40})
                  </button>
                </div>
              </div>

              {/* Database Cluster Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 hover:border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between transition-colors">
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
                    className="px-2 py-1 bg-purple-950 border border-purple-500/30 text-purple-400 rounded-lg text-[9px] hover:bg-purple-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    +1 Replica (${dbReplicas * 60})
                  </button>
                </div>
              </div>

              {/* Load Balancer Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 hover:border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">MULTIPLIER: x{clickMultiplier}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mb-1">Load Balancer</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Boosts manual dispatch click value. Distributes traffic efficiently across nodes.</p>
                </div>
                <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                  <div className="text-[10px] text-zinc-400">Balancers: {loadBalancers}</div>
                  <button 
                    onClick={buyLoadBalancer}
                    disabled={cash < loadBalancers * 90}
                    className="px-2 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded-lg text-[9px] hover:bg-emerald-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    +1 Balancer (${loadBalancers * 90})
                  </button>
                </div>
              </div>

              {/* CI/CD Pipeline Card */}
              <div className="border border-zinc-800 bg-[#0a0d14]/40 hover:border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <GitBranch className="w-5 h-5 text-amber-400" />
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">LEVEL {pipelineLvl}</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-200 mb-1">CI/CD Pipeline</h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">Generates passive cash upgrades automatically. Complete CI/CD lab to unlock tier 3.</p>
                </div>
                <div className="border-t border-zinc-900 pt-3 flex items-center justify-between">
                  <div className="text-[10px] text-zinc-400">Auto Cash: +${pipelineLvl * 4}/s</div>
                  <button 
                    onClick={buyPipelineLvl}
                    disabled={cash < (pipelineLvl + 1) * 120}
                    className="px-2 py-1 bg-amber-950 border border-amber-500/30 text-amber-400 rounded-lg text-[9px] hover:bg-amber-900 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    Upgrade (${(pipelineLvl + 1) * 120})
                  </button>
                </div>
              </div>

            </div>

            {/* Interactive Terminal clicker console */}
            <div className="border border-cyan-500/20 bg-zinc-950/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-cyan-400 font-bold uppercase">MANUAL REQUEST CONTROLLER</span>
                <span className="text-[9px] text-zinc-500">Dispatch packets manually to generate traffic</span>
              </div>
              
              <button 
                onClick={handleManualDispatch}
                className="w-full py-10 border border-dashed border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-950/10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden active:scale-[0.99] select-none"
              >
                <Zap className="w-6 h-6 text-cyan-400 animate-bounce" />
                <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">DISPATCH SYSTEM TRAFFIC</span>
                <span className="text-[9px] text-zinc-500">Pings: {clickCount}</span>

                {/* Flying click packet particles */}
                {clickPackets.map(p => (
                  <motion.div 
                    key={p.id}
                    initial={{ y: p.y, x: p.x, scale: 1, opacity: 1 }}
                    animate={{ y: p.y - 120, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute text-emerald-400 text-xs font-black pointer-events-none select-none"
                  >
                    {p.text}
                  </motion.div>
                ))}
              </button>
            </div>

            {/* Live Terminal Log Ticker */}
            <div className="border border-zinc-800 bg-[#06080d] rounded-2xl p-4 flex flex-col h-[150px] overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <TermIcon className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">LIVE SYSTEM LOG STREAM</span>
                </div>
                <span className="text-[8px] text-zinc-600">STDOUT / STDERR</span>
              </div>
              <div ref={logContainerRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-none font-mono text-[9px] text-zinc-500 leading-relaxed max-h-[100px] select-text">
                {logs.map((log, index) => {
                  const isCritical = log.includes('[CRITICAL]');
                  const isUpgrade = log.includes('[UPGRADE]');
                  const isSuccess = log.includes('[SUCCESS]');
                  return (
                    <div 
                      key={index} 
                      className={`break-all ${isCritical ? 'text-rose-400 font-bold' : isUpgrade ? 'text-amber-400' : isSuccess ? 'text-emerald-400' : 'text-zinc-500'}`}
                    >
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Upgrade Missions & Advisory */}
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
                    className="w-full py-2.5 bg-cyan-500 text-zinc-950 rounded-xl text-xs font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
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
