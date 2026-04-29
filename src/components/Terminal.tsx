import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { LinuxFlavor } from '../App';

import { LabStep } from '../types/content';

interface TerminalProps {
  initialMessage?: string;
  availableCommands?: string[];
  onCommand?: (command: string) => string;
  flavor?: LinuxFlavor;
  currentStep?: LabStep;
  allSteps?: LabStep[];
  currentStepIndex?: number;
  onNext?: () => void;
  onPrev?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onComplete?: () => void;
  onStepComplete?: (stepId: string) => void;
  xpReward?: number;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  initialMessage = 'Welcome to the Realcloud Sandbox!', 
  availableCommands = ['ls', 'pwd', 'whoami', 'date', 'clear'],
  onCommand,
  flavor = 'ubuntu',
  currentStep,
  allSteps = [],
  currentStepIndex = 0,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  onComplete,
  onStepComplete,
  xpReward = 250
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCheckingProgress, setIsCheckingProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [isSudoAuthenticated, setIsSudoAuthenticated] = useState(false);
  const [sudoAuthTimeout, setSudoAuthTimeout] = useState<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SUDO_PASSWORD = 'cloudlabs123';

  // Clear sudo authentication after 5 minutes of inactivity (simulated)
  const refreshSudoAuth = () => {
    setIsSudoAuthenticated(true);
    if (sudoAuthTimeout) clearTimeout(sudoAuthTimeout);
    const timeout = setTimeout(() => {
      setIsSudoAuthenticated(false);
    }, 5 * 60 * 1000); 
    setSudoAuthTimeout(timeout);
  };

  const fileSystem: Record<string, string[]> = {
    '/': ['bin', 'etc', 'home', 'var', 'tmp', 'usr', 'root', 'dev', 'proc'],
    '/bin': ['bash', 'ls', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'echo', 'ps', 'apt', 'top', 'uname'],
    '/etc': ['passwd', 'group', 'hosts', 'hostname', 'network', 'ssh', 'os-release'],
    '/home': ['user'],
    '/home/user': ['Documents', 'Downloads', 'README.md', 'projects'],
    '/home/user/Documents': ['notes.txt', 'budget.xlsx'],
    '/home/user/Downloads': ['installer.sh'],
    '/home/user/projects': ['cloud-app', 'devops-scripts'],
    '/var': ['log', 'mail', 'spool', 'www'],
    '/tmp': []
  };

  const bootSequence = [
    `[    0.000000] Linux version 5.15.0-generic (buildd@lgw01-amd64-060) (${flavor})`,
    `[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic root=UUID=... ro quiet flavor=${flavor}`,
    '[    0.052341] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'',
    '[    0.052342] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'',
    '[    0.124512] Memory: 8142340K/8388608K available (16384K kernel code, 2340K rwdata...)',
    '[    0.451234] Checking connectivity... OK',
    '[    0.891231] Initializing Realcloud Virtual Environment...',
    '[    1.234121] Mounting root filesystem... OK',
    '[    1.567123] Starting system services...',
    '[    1.890123] Loading network drivers... OK',
    '[    2.123451] Configuring network interfaces... OK',
    '[    2.456781] Starting SSH daemon... OK',
    '[    2.789012] System ready.',
    '',
    initialMessage || 'Welcome to the Realcloud Sandbox!',
    'Default user: user',
    'Password: cloudlabs123',
    'Type "help" to see available commands.',
    ''
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setHistory(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
        setBootProgress((currentLine / bootSequence.length) * 100);
      } else {
        setIsBooting(false);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Immediate scroll on history change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Fallback scroll to handle rendering delays with a small timeout
    const timeoutId = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [history, isExecuting, isBooting]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBooting || isExecuting || !input.trim()) return;
    const cmd = input.trim();
    await runCommandWithSudoCheck(cmd);
  };

  const handleCommandClick = async (cmd: string) => {
    if (isBooting || isExecuting) return;
    // Set input first for visual feedback
    setInput(cmd);
    await runCommandWithSudoCheck(cmd);
  };

  const runCommandWithSudoCheck = async (cmd: string) => {
    const args = cmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    
    // Add command to history immediately (handle password separately)
    if (isWaitingForPassword) {
      setHistory(prev => [...prev, '●●●●●●●●']); // Mask password in history
    } else {
      setHistory(prev => [...prev, `user@${flavor}:${currentDir}$ ${cmd}`]);
    }
    
    setIsExecuting(true);

    if (isWaitingForPassword) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (cmd === SUDO_PASSWORD) {
        setHistory(prev => [...prev, 'Access granted. Executing pending command...']);
        setIsWaitingForPassword(false);
        refreshSudoAuth();
        const originalCmd = pendingCommand || '';
        setPendingCommand(null);
        // Process the original command that was waiting for sudo
        await processActualCommand(originalCmd);
      } else {
        setHistory(prev => [...prev, 'sudo: 1 incorrect password attempt', '[sudo] password for user: ']);
        setIsExecuting(false);
      }
      setInput('');
      return;
    }

    // Check if it's a sudo command
    if (baseCmd === 'sudo') {
      if (isSudoAuthenticated) {
        // Already authenticated, just process the command
        const originalCmd = cmd.replace(/^sudo\s+/, '');
        await processActualCommand(originalCmd);
        setInput('');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setHistory(prev => [
        ...prev, 
        '[sudo] password for user: ',
        '[HINT] Use password: cloudlabs123'
      ]);
      setIsWaitingForPassword(true);
      setPendingCommand(cmd.replace(/^sudo\s+/, '')); // Save the remainder of the command
      setIsExecuting(false);
      setInput('');
      return;
    }

    await processActualCommand(cmd);
    setInput('');
  };

  const processActualCommand = async (cmd: string) => {
    const args = cmd.split(' ');
    const baseCmd = args[0].toLowerCase();

    // Simulate different processing times based on command
    let processDelay = 600; // Default minimal delay
    
    if (cmd.includes('install') || cmd.includes('deploy') || cmd.includes('apply')) {
      processDelay = 1500 + Math.random() * 1000;
    } else if (cmd.includes('curl') || cmd.includes('get')) {
      processDelay = 800 + Math.random() * 500;
    }

    // Wait for the simulated process
    await new Promise(resolve => setTimeout(resolve, processDelay));

    if (baseCmd === 'clear') {
      setHistory([]);
      setIsExecuting(false);
    } else {
      let output = '';
      
      // Check for built-in commands first
      switch (baseCmd) {
        case 'ls': {
          let targetPath = currentDir;
          const pathArg = args.find(a => !a.startsWith('-') && a !== baseCmd);
          
          if (pathArg) {
            if (pathArg.startsWith('/')) {
              targetPath = pathArg;
            } else {
              targetPath = currentDir === '/' ? `/${pathArg}` : `${currentDir}/${pathArg}`;
            }
          }

          // Normalize path (remove trailing slash)
          if (targetPath.length > 1 && targetPath.endsWith('/')) {
            targetPath = targetPath.slice(0, -1);
          }

          if (fileSystem[targetPath]) {
            const files = [...fileSystem[targetPath]];
            if (args.includes('-a')) {
              files.unshift('.', '..');
            }
            output = files.join('  ');
          } else {
            output = `ls: cannot access '${pathArg}': No such file or directory`;
          }
          break;
        }
        case 'pwd':
          output = currentDir;
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'cat':
          if (args[1]?.toLowerCase() === 'readme.md') {
            output = '# Welcome to Realcloud\nThis is a simulated Linux environment for learning cloud engineering and DevOps.';
          } else if (args[1]?.toLowerCase() === '/etc/passwd') {
            output = 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash';
          } else if (args[1]?.toLowerCase() === '/etc/os-release') {
            if (flavor === 'ubuntu') {
              output = 'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nID=ubuntu\nID_LIKE=debian';
            } else if (flavor === 'centos') {
              output = 'PRETTY_NAME="CentOS Linux 7 (Core)"\nNAME="CentOS Linux"\nVERSION_ID="7"\nID="centos"\nID_LIKE="rhel fedora"';
            } else if (flavor === 'rhel') {
              output = 'PRETTY_NAME="Red Hat Enterprise Linux 9.2 (Plow)"\nNAME="Red Hat Enterprise Linux"\nVERSION_ID="9.2"\nID="rhel"\nID_LIKE="fedora"';
            } else {
              output = 'PRETTY_NAME="Alpine Linux v3.15"\nNAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.15.0';
            }
          } else if (!args[1]) {
            output = 'cat: missing file operand';
          } else {
            output = `cat: ${args[1]}: No such file or directory`;
          }
          break;
        case 'mkdir':
          output = args[1] ? `Created directory ${args[1]}` : 'mkdir: missing operand';
          break;
        case 'touch':
          output = args[1] ? `Created file ${args[1]}` : 'touch: missing file operand';
          break;
        case 'rm':
          output = args[1] ? `Removed ${args[1]}` : 'rm: missing operand';
          break;
        case 'apt':
          if (flavor === 'ubuntu') {
            output = 'Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nAll packages are up to date.';
          } else {
            output = `bash: apt: command not found (Did you mean ${flavor === 'centos' || flavor === 'rhel' ? 'yum' : 'apk'}?)`;
          }
          break;
        case 'yum':
        case 'dnf':
          if (flavor === 'centos' || flavor === 'rhel') {
            output = `Loaded plugins: fastestmirror, ovl\nLoading mirror speeds from cached hostfile\nNo packages marked for update on ${flavor.toUpperCase()}`;
          } else {
            output = `bash: ${baseCmd}: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'apk'}?)`;
          }
          break;
        case 'apk':
          if (flavor === 'alpine') {
            output = 'fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz\nOK: 0 distinct packages available';
          } else {
            output = `bash: apk: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'yum'}?)`;
          }
          break;
        case 'top':
          output = 'top - 15:32:40 up 1 min, 1 user, load average: 0.00, 0.00, 0.00\nTasks: 1 total, 0 running, 1 sleeping, 0 stopped, 0 zombie\n%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st';
          break;
        case 'uname':
          if (args.includes('-a')) {
            const flavorInfo = flavor === 'ubuntu' ? 'Ubuntu' : flavor === 'centos' ? 'CentOS' : flavor === 'rhel' ? 'Red Hat' : 'Alpine';
            output = `Linux realcloud 5.15.0-generic #54-${flavorInfo} SMP x86_64 GNU/Linux`;
          } else {
            output = 'Linux';
          }
          break;
        case 'echo':
          output = args.slice(1).join(' ');
          break;
        case 'ps':
          output = '  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps';
          break;
        case 'cp':
          output = args[1] && args[2] ? `Copied ${args[1]} to ${args[2]}` : 'cp: missing file operand';
          break;
        case 'mv':
          output = args[1] && args[2] ? `Moved ${args[1]} to ${args[2]}` : 'mv: missing destination file operand';
          break;
        case 'cd': {
          const path = args[1];
          if (!path || path === '~') {
            setCurrentDir('/home/user');
          } else if (path === '..') {
            const parts = currentDir.split('/').filter(Boolean);
            parts.pop();
            setCurrentDir('/' + parts.join('/'));
          } else if (path === '/') {
            setCurrentDir('/');
          } else {
            let targetPath = path.startsWith('/') ? path : (currentDir === '/' ? `/${path}` : `${currentDir}/${path}`);
            // Normalize path
            if (targetPath.length > 1 && targetPath.endsWith('/')) {
              targetPath = targetPath.slice(0, -1);
            }
            if (fileSystem[targetPath]) {
              setCurrentDir(targetPath);
            } else {
              output = `bash: cd: ${path}: No such file or directory`;
            }
          }
          break;
        }
        case 'help':
          output = `Available commands: ${[...availableCommands, 'cat', 'mkdir', 'touch', 'rm', 'sudo', 'apt', 'top', 'uname', 'echo', 'ps', 'cp', 'mv', 'cd'].join(', ')}, help, clear`;
          break;
        default: {
          // Check if the user is typing a directory path or a directory definition
          const dirDescriptions: Record<string, string> = {
            '/bin': 'Essential user binaries (e.g., ls, cd, cat).',
            'bin': 'Essential user binaries (e.g., ls, cd, cat).',
            '/etc': 'System-wide configuration files.',
            'etc': 'System-wide configuration files.',
            '/home': 'User home directories.',
            'home': 'User home directories.',
            '/var': 'Variable data files like logs and databases.',
            'var': 'Variable data files like logs and databases.',
            '/tmp': 'Temporary files.',
            'tmp': 'Temporary files.',
            '/usr': 'User utilities and applications.',
            'usr': 'User utilities and applications.',
            '/root': 'Home directory for the root user.',
            'root': 'Home directory for the root user.',
            '/dev': 'Device files.',
            'dev': 'Device files.',
            '/proc': 'Process information.',
            'proc': 'Process information.'
          };

          const normalizedCmd = baseCmd.endsWith(':') ? baseCmd.slice(0, -1) : baseCmd;
          
          if (dirDescriptions[normalizedCmd]) {
            output = `${normalizedCmd}: ${dirDescriptions[normalizedCmd]}`;
          } else if (onCommand) {
            output = onCommand(cmd.toLowerCase());
          } else {
            output = `bash: ${baseCmd}: command not found. Type "help" for a list of commands.`;
          }
        }
      }
      
      if (output) {
        setHistory(prev => [...prev, output]);
      }
      setIsExecuting(false);
    }

    setInput('');
  };

  const handleCheckProgress = async () => {
    if (isCheckingProgress || !currentStep) return;

    setIsCheckingProgress(true);
    setProgressPercentage(0);
    setHistory(prev => [...prev, `[USER_ACTION] Initiating manual check for: ${currentStep.title}...`]);

    const steps = [
      { p: 10, msg: '[SYSTEM] Initializing validation engine...' },
      { p: 30, msg: '[SYSTEM] Scanning cluster environment...' },
      { p: 50, msg: `[SYSTEM] Verifying resources in namespace: ${flavor === 'ubuntu' ? 'default' : 'monitoring'}...` },
      { p: 70, msg: '[SYSTEM] Comparing current state vs expected output...' },
      { p: 90, msg: '[SYSTEM] Finalizing verification reports...' },
      { p: 100, msg: 'DONE: Success! All checks passed. Mission validated.' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
      setProgressPercentage(step.p);
      setHistory(prev => [...prev, step.msg]);
    }

    setIsCheckingProgress(false);
    if (onStepComplete && currentStep) {
      onStepComplete(currentStep.id);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl font-mono text-sm flex-1 flex flex-row h-full min-h-[400px]">
      {currentStep && (
        <div className="w-1/3 flex flex-col text-zinc-300 border-r border-zinc-800 bg-zinc-950 h-full">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
            {allSteps.length > 0 && (
              <div className="mb-8 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Mission Progress</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 relative">
                  {/* Vertical Connection Line */}
                  <div className="absolute left-[9px] top-2 bottom-6 w-0.5 bg-zinc-800 -z-0" />
                  
                  {allSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                        idx === currentStepIndex 
                          ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                          : idx < currentStepIndex
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                      }`}>
                        {idx < currentStepIndex ? '✓' : idx + 1}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-[11px] font-black truncate transition-colors uppercase tracking-wider ${
                          idx === currentStepIndex ? 'text-brand-blue' : idx < currentStepIndex ? 'text-emerald-500/80' : 'text-zinc-500'
                        }`}>
                          {step.title}
                        </span>
                        {idx === currentStepIndex && (
                          <span className="text-[9px] text-zinc-400 font-medium animate-pulse">
                            Active Mission
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <h2 className="text-xl font-bold text-brand-blue mb-4">{currentStep.title}</h2>
            <p className="text-sm leading-relaxed mb-6">{(currentStep as any).instruction || (currentStep as any).task}</p>
            
            {currentStep.repository && (
              <div className="mb-6 p-4 bg-zinc-900 rounded-xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Official Repository</h4>
                <p className="text-xs text-zinc-400 mb-3">{currentStep.repository.explanation}</p>
                <a href={currentStep.repository.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-blue hover:underline">
                  {currentStep.repository.name}
                </a>
              </div>
            )}

            {currentStep.detailedSteps && currentStep.detailedSteps.length > 0 && (
              <div className="mb-6">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Step-by-Step Instructions</h4>
                <div className="space-y-4">
                  {currentStep.detailedSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white mb-1">{step.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep.commands && currentStep.commands.length > 0 && (
              <div className="mb-6">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Target Commands (Click to Run)</h4>
                <div className="space-y-4">
                  {currentStep.commands.map((cmd, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleCommandClick(cmd.text)}
                      disabled={isBooting || isExecuting}
                      className="w-full text-left bg-zinc-950 p-3 rounded-lg border border-white/5 hover:border-brand-blue/30 transition-all group cursor-pointer disabled:cursor-not-allowed"
                    >
                      <div className="font-mono text-xs text-brand-blue mb-1 group-hover:text-white transition-colors">{cmd.text}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{cmd.explanation}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep.whyNeeded && (
              <div className="bg-zinc-900 p-4 rounded-xl text-xs text-zinc-400 italic mb-4 border border-white/5">
                {currentStep.whyNeeded}
              </div>
            )}
            
            {currentStep.pillarConnection && (
              <div className="bg-zinc-900 p-4 rounded-xl text-xs text-zinc-400 italic border border-white/5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Well-Architected</span>
                {currentStep.pillarConnection}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="p-6 bg-zinc-950 border-t border-zinc-800 space-y-3 shrink-0">
            <button
              onClick={handleCheckProgress}
              disabled={isCheckingProgress || isBooting}
              className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5 relative overflow-hidden ${
                isCheckingProgress 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              {isCheckingProgress && (
                <motion.div 
                  className="absolute inset-0 bg-brand-blue/10 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progressPercentage / 100 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">
                {isCheckingProgress ? `Validating... ${progressPercentage}%` : 'Check Progress'}
              </span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                disabled={isFirstStep}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 ${isFirstStep ? 'text-zinc-600 bg-zinc-900/50 cursor-not-allowed' : 'text-zinc-400 bg-zinc-900 hover:bg-zinc-800'}`}
              >
                Back
              </button>
              <button
                onClick={isLastStep ? onComplete : onNext}
                className="flex-[2] py-3 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2"
              >
                {isLastStep ? `Complete Lab (+${xpReward} XP)` : 'Next Mission'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full bg-zinc-900">
        <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
          </div>
          <div className="flex items-center gap-2 ml-4 text-zinc-400">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {isBooting ? `Booting System... ${Math.round(bootProgress)}%` : 'Interactive Terminal'}
            </span>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto text-zinc-300 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600 transition-colors"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line?.includes(`user@${flavor}:`) && line?.includes('$') ? (
                <span className="text-brand-blue font-bold">{line}</span>
              ) : line?.startsWith('[') ? (
                <span className="text-zinc-500 text-xs">{line}</span>
              ) : line}
            </div>
          ))}
          {isBooting && (
            <div className="flex items-center gap-2 text-brand-blue text-xs animate-pulse mt-2">
              <div className="w-1 h-4 bg-brand-blue"></div>
              <span>System initializing...</span>
            </div>
          )}
          {/* Scroll anchor */}
          <div className="h-4 w-full" />
        </div>

        <form 
          onSubmit={handleCommand} 
          className={`p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0 ${(isBooting || isExecuting) ? 'opacity-50' : ''}`}
        >
          <ChevronRight className={`w-4 h-4 text-brand-blue shrink-0 ${(isBooting || isExecuting) ? 'animate-pulse' : ''}`} />
          <input
            type={isWaitingForPassword ? "password" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isBooting || isExecuting}
            className="bg-transparent border-none outline-none text-zinc-300 w-full focus:ring-0 p-0 font-mono"
            placeholder={isBooting ? "System booting..." : isExecuting ? (isWaitingForPassword ? "Verifying..." : "Processing...") : (isWaitingForPassword ? "Enter password" : "Type a command...")}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
