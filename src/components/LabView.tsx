import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, Check, Share2,
  Terminal as TerminalIcon, Play,
  BookOpen, Target, Lightbulb,
  MessageSquare, ThumbsUp, Send,
  ChevronDown, Monitor, Shield, Copy
} from 'lucide-react';
import { LabContent, LabStep } from '../types/content';
import { Terminal } from './Terminal';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';
import { projects } from '../data/projects';
import { conceptDictionary } from '../data/conceptDictionary';

const getOSCommand = (cmd: string, os: 'macos' | 'windows' | 'linux'): string => {
  if (os === 'linux') return cmd;
  
  // Normalize apt-get to apt first to simplify matching
  let normalized = cmd.replace(/apt-get/g, 'apt');

  if (os === 'macos') {
    let newCmd = normalized;
    // Replace apt update
    newCmd = newCmd.replace(/sudo\s+apt\s+update/g, 'brew update');
    // Replace apt install (e.g. sudo apt install -y pkg, sudo apt install pkg -y, sudo apt install pkg)
    newCmd = newCmd.replace(/sudo\s+apt\s+install\s+(-y\s+)?([a-zA-Z0-9\-\s]+)(\s+-y)?/g, 'brew install $2');
    
    // Replace systemctl start/restart
    newCmd = newCmd.replace(/sudo\s+systemctl\s+start\s+(\w+)/g, 'brew services start $1');
    newCmd = newCmd.replace(/sudo\s+systemctl\s+restart\s+(\w+)/g, 'brew services restart $1');
    newCmd = newCmd.replace(/systemctl\s+is-active\s+(\w+)/g, 'brew services list | grep $1');
    return newCmd;
  }
  
  if (os === 'windows') {
    let newCmd = normalized;
    // Strip leading and inner sudo
    newCmd = newCmd.replace(/^sudo\s+/, '');
    newCmd = newCmd.replace(/\s+sudo\s+/g, ' ');
    
    // Replace apt update
    newCmd = newCmd.replace(/apt\s+update/g, 'winget upgrade');
    // Replace apt install
    newCmd = newCmd.replace(/apt\s+install\s+(-y\s+)?([a-zA-Z0-9\-\s]+)(\s+-y)?/g, 'winget install $2');
    
    // Replace systemctl start/restart/status
    newCmd = newCmd.replace(/systemctl\s+start\s+(\w+)/g, 'Start-Service $1');
    newCmd = newCmd.replace(/systemctl\s+restart\s+(\w+)/g, 'Restart-Service $1');
    newCmd = newCmd.replace(/systemctl\s+is-active\s+(\w+)/g, 'Get-Service $1');
    
    // Common basic commands
    if (newCmd.startsWith('ls -la')) {
      newCmd = newCmd.replace('ls -la', 'Get-ChildItem -Force');
    } else if (newCmd.startsWith('ls')) {
      newCmd = newCmd.replace('ls', 'Get-ChildItem');
    } else if (newCmd.startsWith('pwd')) {
      newCmd = 'Get-Location';
    } else if (newCmd.startsWith('cat ')) {
      newCmd = newCmd.replace(/^cat\s+/, 'Get-Content ');
    } else if (newCmd.includes('| tee')) {
      newCmd = newCmd.replace(/echo\s+(["'].*?["'])\s*\|\s*tee\s+(.*)/g, '$1 | Out-File -FilePath $2');
      newCmd = newCmd.replace(/echo\s+(["'].*?["'])\s*\|\s*sudo\s+tee\s+(.*)/g, '$1 | Out-File -FilePath $2');
    } else if (newCmd.startsWith('curl ')) {
      newCmd = newCmd.replace(/curl\s+-s\s+(.*)/g, 'Invoke-WebRequest -Uri http://$1 -UseBasicParsing');
      newCmd = newCmd.replace(/curl\s+(.*)/g, 'Invoke-WebRequest -Uri $1');
    }
    return newCmd;
  }
  return cmd;
};

const getCommandBreakdown = (cmd: string): { term: string; explanation: string }[] => {
  const breakdown: { term: string; explanation: string }[] = [];
  const cleanCmd = (cmd || '').trim();

  if (cleanCmd.includes('echo') && cleanCmd.includes('>>')) {
    breakdown.push({
      term: "echo '...'",
      explanation: "Prints the specified string/text to the standard output."
    });
    breakdown.push({
      term: ">>",
      explanation: "Appends the output to the end of the target file instead of displaying it on the screen."
    });
  } else if (cleanCmd.includes('echo') && cleanCmd.includes('>')) {
    breakdown.push({
      term: "echo '...'",
      explanation: "Prints the specified string/text to the standard output."
    });
    breakdown.push({
      term: ">",
      explanation: "Redirects the output, overwriting the target file's content entirely."
    });
  }

  if (cleanCmd.includes('tar ')) {
    breakdown.push({
      term: "tar",
      explanation: "Tape Archive utility: bundles multiple files or directories into a single archive file."
    });
    if (cleanCmd.includes('-c') || cleanCmd.includes(' c')) {
      breakdown.push({
        term: "-c",
        explanation: "Tells tar to CREATE a new archive."
      });
    }
    if (cleanCmd.includes('-z') || cleanCmd.includes(' z')) {
      breakdown.push({
        term: "-z",
        explanation: "Compresses the archive file using gzip compression to save space."
      });
    }
    if (cleanCmd.includes('-f') || cleanCmd.includes(' f')) {
      breakdown.push({
        term: "-f",
        explanation: "Specifies the filename of the archive file to create."
      });
    }
    if (cleanCmd.includes('/etc')) {
      breakdown.push({
        term: "/etc",
        explanation: "The target system folder containing system-wide configuration files to backup."
      });
    }
  }

  if (cleanCmd.includes('date +%F') || cleanCmd.includes('$(date +%F)')) {
    breakdown.push({
      term: "$(date +%F)",
      explanation: "Command substitution: runs 'date +%F' which prints the current date in YYYY-MM-DD format and embeds it dynamically into the filename."
    });
  }

  if (cleanCmd.includes('crontab')) {
    breakdown.push({
      term: "crontab -l",
      explanation: "Lists the active cron jobs for the current user."
    });
    breakdown.push({
      term: "| crontab -",
      explanation: "Pipes the text output into crontab to install/update the crontab configuration."
    });
    breakdown.push({
      term: "0 0 * * *",
      explanation: "Cron schedule expression: runs the command daily at exactly midnight (00:00)."
    });
  }

  if (cleanCmd.includes('kubectl')) {
    breakdown.push({
      term: "kubectl",
      explanation: "The official command-line tool for controlling Kubernetes clusters."
    });
    if (cleanCmd.includes('create namespace') || cleanCmd.includes('create ns')) {
      breakdown.push({
        term: "create namespace",
        explanation: "Creates a new virtual boundary/workspace inside the cluster to isolate resources."
      });
    }
    if (cleanCmd.includes('apply -f') || cleanCmd.includes('apply')) {
      breakdown.push({
        term: "apply -f",
        explanation: "Deploys or updates resources defined in a local or remote YAML manifest configuration file."
      });
    }
    if (cleanCmd.includes('get nodes')) {
      breakdown.push({
        term: "get nodes",
        explanation: "Queries the cluster control plane to list all active worker and master nodes."
      });
    }
    if (cleanCmd.includes('cluster-info')) {
      breakdown.push({
        term: "cluster-info",
        explanation: "Displays connection endpoints and status information for master and core services."
      });
    }
  }

  if (cleanCmd.includes('swapoff')) {
    breakdown.push({
      term: "swapoff -a",
      explanation: "Disables all swap paging/virtual memory space instantly to satisfy Kubernetes cluster installation prerequisites."
    });
  }

  if (cleanCmd.includes('sed ')) {
    breakdown.push({
      term: "sed",
      explanation: "Stream Editor: used to search, find, replace, or edit text in files programmatically."
    });
    if (cleanCmd.includes('-i')) {
      breakdown.push({
        term: "-i",
        explanation: "In-place: saves the modified changes directly back to the original file."
      });
    }
    if (cleanCmd.includes('/etc/fstab')) {
      breakdown.push({
        term: "/etc/fstab",
        explanation: "File System Table: system file that controls static disk partition mount settings."
      });
    }
    if (cleanCmd.includes('/ swap /')) {
      breakdown.push({
        term: '"/ swap / ..."',
        explanation: "Finds the line containing 'swap' and comments it out by adding a hash (#) prefix, preventing it from mounting on system boot."
      });
    }
  }

  if (cleanCmd.includes('mkdir -p')) {
    breakdown.push({
      term: "mkdir -p",
      explanation: "Creates directories recursively, ensuring parent directories are created if they do not exist."
    });
  }

  if (cleanCmd.includes('sudo cp -i')) {
    breakdown.push({
      term: "sudo",
      explanation: "Superuser Do: Executes the command with administrator (root) privileges."
    });
    breakdown.push({
      term: "cp -i",
      explanation: "Copies files or directories, prompting before overwriting any existing files."
    });
  }

  if (cleanCmd.includes('chown')) {
    breakdown.push({
      term: "chown",
      explanation: "Changes the owner and/or group ownership of files and directories."
    });
    breakdown.push({
      term: "$(id -u):$(id -g)",
      explanation: "Dynamically gets the current user's numeric User ID and Group ID to apply permissions."
    });
  }

  if (cleanCmd.includes('docker ')) {
    breakdown.push({
      term: "docker",
      explanation: "Docker containerisation engine command line interface."
    });
    if (cleanCmd.includes('run')) {
      breakdown.push({
        term: "run",
        explanation: "Creates and starts a new container instance from a Docker image."
      });
    }
    if (cleanCmd.includes('-d')) {
      breakdown.push({
        term: "-d",
        explanation: "Detached mode: runs the container in the background, leaving the terminal free."
      });
    }
    if (cleanCmd.includes('-p ')) {
      breakdown.push({
        term: "-p",
        explanation: "Port forwarding: maps a port on the host machine to a port inside the container."
      });
    }
    if (cleanCmd.includes('build')) {
      breakdown.push({
        term: "build",
        explanation: "Builds a Docker image from a local Dockerfile configuration."
      });
    }
    if (cleanCmd.includes('-t ')) {
      breakdown.push({
        term: "-t",
        explanation: "Tag: specifies a name and optional tag version for the built image."
      });
    }
  }

  if (cleanCmd.includes('curl ')) {
    breakdown.push({
      term: "curl",
      explanation: "Client URL: utility for transferring data to/from a network server using protocols like HTTP."
    });
    if (cleanCmd.includes('-I') || cleanCmd.includes('-i')) {
      breakdown.push({
        term: "-I / -i",
        explanation: "Fetches and displays HTTP header response information from the server."
      });
    }
  }

  if (cleanCmd.includes('&&')) {
    breakdown.push({
      term: "&&",
      explanation: "Logical AND operator: executes the second command only if the first command succeeds."
    });
  }

  return breakdown;
};

interface LabViewProps {
  lab: LabContent;
  onClose: () => void;
  onComplete: (xp?: number) => void;
  projectTitle: string;
  currentXp?: number;
}

const RANKS = [
  { min: 0,     title: 'Trainee',               icon: '🎓' },
  { min: 250,   title: 'Cloud Apprentice',       icon: '🌱' },
  { min: 750,   title: 'Cloud Engineer I',       icon: '⚡' },
  { min: 1500,  title: 'Cloud Engineer II',      icon: '🔧' },
  { min: 3000,  title: 'Senior Cloud Engineer',  icon: '🚀' },
  { min: 5000,  title: 'Cloud Architect',        icon: '🏛️' },
  { min: 8000,  title: 'Principal Engineer',     icon: '💎' },
  { min: 12000, title: 'Distinguished Engineer', icon: '👑' },
];
const getRank = (xp: number) => [...RANKS].reverse().find(r => xp >= r.min) ?? RANKS[0];

const PARTICLES = [
  { x: 25, y: 20, color: '#3B82F6', dy: -70 },
  { x: 45, y: 15, color: '#F59E0B', dy: -90 },
  { x: 65, y: 22, color: '#10B981', dy: -65 },
  { x: 80, y: 18, color: '#EF4444', dy: -80 },
  { x: 15, y: 30, color: '#8B5CF6', dy: -60 },
  { x: 35, y: 25, color: '#F59E0B', dy: -75 },
  { x: 55, y: 12, color: '#3B82F6', dy: -85 },
  { x: 75, y: 28, color: '#10B981', dy: -70 },
  { x: 20, y: 35, color: '#EF4444', dy: -55 },
  { x: 50, y: 10, color: '#8B5CF6', dy: -95 },
  { x: 70, y: 32, color: '#3B82F6', dy: -62 },
  { x: 88, y: 25, color: '#F59E0B', dy: -78 },
];

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  tag: 'tip' | 'issue' | 'recommendation' | 'general';
  likes: number;
  liked: boolean;
  timestamp: string;
}

const SEED_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Amara O.', avatar: 'https://picsum.photos/seed/amara/40/40', text: 'Make sure your kubectl context is set correctly before starting — cost me 20 min debugging!', tag: 'tip', likes: 14, liked: false, timestamp: '2 days ago' },
  { id: 'c2', author: 'Jonas K.', avatar: 'https://picsum.photos/seed/jonas/40/40', text: 'Step 3 is a bit tricky if you\'re on an ARM machine. Use the amd64 binary explicitly.', tag: 'recommendation', likes: 9, liked: false, timestamp: '5 days ago' },
];

const TAG_STYLES: Record<Comment['tag'], string> = {
  tip:            'bg-amber-50 text-amber-600 border-amber-100',
  issue:          'bg-rose-50 text-rose-600 border-rose-100',
  recommendation: 'bg-blue-50 text-blue-600 border-blue-100',
  general:        'bg-zinc-50 text-zinc-500 border-zinc-100',
};

export const LabView: React.FC<LabViewProps> = ({ lab, onClose, onComplete, projectTitle, currentXp = 0 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState<Comment['tag']>('general');
  const earnedXp = lab.xpReward ?? 250;

  const [prevProjectId, setPrevProjectId] = useState(lab.projectId);
  if (lab.projectId !== prevProjectId) {
    setPrevProjectId(lab.projectId);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setIsStarted(false);
    setIsConnecting(false);
    setConnectionProgress(0);
    setConnectionStatus('');
    setProgressPercentage(0);
  }

  const [selectedOS, setSelectedOS] = useState<'macos' | 'windows' | 'linux'>('linux');
  const [shareText, setShareText] = useState('Share Lab');

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?lab=${encodeURIComponent(lab.projectId)}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShareText('Copied!');
        setTimeout(() => setShareText('Share Lab'), 2000);
      })
      .catch(err => {
        console.error('Failed to copy share link:', err);
      });
  };
  const [runCommandTrigger, setRunCommandTrigger] = useState<{ command: string; timestamp: number } | null>(null);
  const [checkProgressTrigger, setCheckProgressTrigger] = useState<number>(0);
  const [isCheckingProgress, setIsCheckingProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isQuickRefOpen, setIsQuickRefOpen] = useState(false);

  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setComments(prev => [{
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'https://picsum.photos/seed/you/40/40',
      text,
      tag: newTag,
      likes: 0,
      liked: false,
      timestamp: 'just now',
    }, ...prev]);
    setNewComment('');
    setNewTag('general');
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const startLabSession = () => {
    setIsConnecting(true);
    const statuses = [
      'Initializing secure tunnel...',
      'Provisioning cloud resources...',
      'Configuring network interfaces...',
      'Starting container runtime...',
      'Establishing terminal connection...'
    ];
    
    let currentStatusIndex = 0;
    const interval = setInterval(() => {
      setConnectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setIsStarted(true);
          return 100;
        }
        
        const newProgress = prev + (Math.random() * 15);
        const statusIndex = Math.floor((newProgress / 100) * statuses.length);
        if (statusIndex < statuses.length) {
          setConnectionStatus(statuses[statusIndex]);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 400);
  };

  const currentStep = lab?.steps?.[currentStepIndex];
  if (!currentStep) return null; // Defensive bail-out if data is malformed

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === (lab?.steps?.length || 0) - 1;

  const nextStep = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
    }
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const progress = (completedSteps.length / lab.steps.length) * 100;

  const handleLabComplete = () => {
    onComplete(earnedXp);
    setShowReward(true);
  };

  const newTotalXp = currentXp + earnedXp;
  const oldRank = getRank(currentXp);
  const newRank = getRank(newTotalXp);
  const didRankUp = newRank.title !== oldRank.title;

  const handleCommandClick = (cmdText: string) => {
    setRunCommandTrigger({
      command: cmdText,
      timestamp: Date.now()
    });
  };

  const handleCheckProgress = () => {
    setCheckProgressTrigger(prev => prev + 1);
  };

  // Find category/concepts
  const project = projects.find(p => p.id === String(lab.projectId));
  const tags = project?.tags || [];
  const concepts = tags
    .map(tag => conceptDictionary[tag])
    .filter((c): c is { title: string; description: string } => 
      Boolean(c && typeof c === 'object' && 'title' in c && 'description' in c)
    );
  const uniqueConcepts = Array.from(
    new Map(concepts.map(c => [c.title, c])).values()
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-50 flex flex-col h-screen w-screen overflow-hidden font-sans"
    >
      {/* 1. Step Indicator Bar */}
      <div className="bg-white border-b border-zinc-200 py-4 px-8 flex justify-center items-center shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {lab.steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = completedSteps.includes(step.id);
            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div 
                    className={`h-0.5 w-6 sm:w-10 md:w-12 transition-colors duration-200 ${
                      idx <= currentStepIndex ? 'bg-brand-blue' : 'bg-zinc-200'
                    }`}
                  />
                )}
                <button
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-all ${
                    isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                      : isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  ) : (
                    idx + 1
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Main content split/unsplit based on isStarted */}
      {!isStarted ? (
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-8 bg-zinc-50/50">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-zinc-200/80 shadow-xl p-10 text-center relative">
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div 
                  key="connecting"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-8 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                    <TerminalIcon className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 mb-4">
                    Connecting to Cloud...
                  </h2>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="h-full bg-brand-blue"
                      initial={{ width: 0 }}
                      animate={{ width: `${connectionProgress}%` }}
                    />
                  </div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                    {connectionStatus}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="ready"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 ring-1 border border-brand-blue/20">
                    <Play className="w-10 h-10 text-brand-blue fill-brand-blue/20 ml-1" />
                  </div>
                  <h2 className="text-2xl font-black text-zinc-900 mb-3 tracking-tight">
                    Initialize Cloud Sandbox
                  </h2>
                  <p className="text-zinc-500 text-sm max-w-md mb-8 leading-relaxed">
                    This will provision a dedicated container with all required cloud tools and configuration pre-installed for this lab.
                  </p>
                  <button 
                    onClick={startLabSession}
                    className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20 flex items-center gap-3 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Start Lab Session
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-row overflow-hidden">
          {/* Left Column: Guide */}
          <div className="w-[45%] min-w-[360px] max-w-[55%] border-r border-zinc-200 bg-[#f8fafc] h-full overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-zinc-200">
            {/* Header Card */}
            <div className="bg-[#101935] text-white px-6 pb-6 pt-3.5 m-6 rounded-2xl flex flex-col justify-between relative shadow-lg overflow-hidden">
              {/* Decorative background glow */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header Buttons */}
                <div className="flex justify-between items-center mb-5">
                  <button 
                    onClick={onClose}
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-[0.98]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    All Labs
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-[0.98]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {shareText}
                  </button>
                </div>

                {/* Mission Info & Title */}
                <div className="flex justify-between items-end gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.2em] block mb-1">
                      MISSION {currentStepIndex + 1} OF {lab.steps.length}
                    </span>
                    <h2 className="text-xl font-black tracking-tight leading-tight flex items-center gap-2 truncate">
                      💻 {projectTitle}
                    </h2>
                    <p className="text-white/70 text-xs mt-1 truncate">
                      {currentStep.title}
                    </p>
                  </div>
                  {lab.xpReward && (
                    <div className="flex flex-col items-center px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl shrink-0">
                      <span className="text-sm font-black leading-none">{lab.xpReward} XP</span>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">Reward</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Reference Notes */}
            {uniqueConcepts.length > 0 && (
              <div className="px-6 mb-6">
                <div className="border border-amber-200/60 bg-amber-50/30 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setIsQuickRefOpen(!isQuickRefOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-black text-amber-900 text-xs tracking-wider block">QUICK REFERENCE NOTES</span>
                        <span className="text-[10px] text-amber-700 font-medium">Learn key architectural concepts for this lab</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-200/60 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {uniqueConcepts.length} concepts
                      </span>
                      <span className={`transition-transform duration-200 ${isQuickRefOpen ? 'rotate-185' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-amber-600" />
                      </span>
                    </div>
                  </button>
                  {isQuickRefOpen && (
                    <div className="px-4 pb-4 border-t border-amber-100 bg-white">
                      <div className="space-y-4 pt-4">
                        {uniqueConcepts.map((concept, idx) => (
                          <div key={idx} className="border-b border-zinc-100 last:border-0 pb-3 last:pb-0">
                            <h5 className="text-xs font-bold text-zinc-900 mb-1 flex items-center gap-2">
                              <Sparkle className="w-3.5 h-3.5 text-brand-blue" />
                              {concept.title}
                            </h5>
                            <p className="text-zinc-600 text-[11px] leading-relaxed">
                              {concept.description}
                            </p>
                          </div>
                        ))}

                        {currentStep?.commands && currentStep.commands.length > 0 && (
                          <div className="pt-4 border-t border-zinc-200 mt-4">
                            <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Monitor className="w-3.5 h-3.5 text-amber-700" />
                              Command Syntax Breakdown
                            </h5>
                            <div className="space-y-3">
                              {currentStep.commands.map((cmd, cIdx) => {
                                const breakdown = getCommandBreakdown(cmd.text);
                                if (breakdown.length === 0) return null;
                                return (
                                  <div key={cIdx} className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-3">
                                    <div className="font-mono text-[10px] text-zinc-800 bg-zinc-200/50 px-2 py-1 rounded mb-2 border border-zinc-300/30 overflow-x-auto">
                                      {cmd.text}
                                    </div>
                                    <div className="space-y-2">
                                      {breakdown.map((item, iIdx) => (
                                        <div key={iIdx} className="text-[11px] leading-relaxed flex items-start gap-1.5">
                                          <span className="font-mono font-bold text-brand-blue bg-blue-50 border border-blue-100/50 px-1 rounded shrink-0">{item.term}</span>
                                          <span className="text-zinc-600">— {item.explanation}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OS Selector Card */}
            <div className="px-6 mb-6">
              <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">Select Your Operating System</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Commands and terminal syntax will adapt to your platform.</p>
                  </div>
                </div>
                <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 self-start sm:self-auto">
                  {(['macos', 'windows', 'linux'] as const).map((os) => (
                    <button
                      key={os}
                      onClick={() => setSelectedOS(os)}
                      className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                        selectedOS === os 
                          ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/30'
                          : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      {os}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="px-6 mb-8 flex-1">
              <div className="flex items-center gap-2 border-l-4 border-brand-blue pl-3 mb-6">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">Implementation Guide</h3>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold text-sm shrink-0 border border-brand-blue/20">
                  {currentStepIndex + 1}
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-base font-bold text-zinc-900 leading-tight">{currentStep.title}</h3>
                  
                  {/* Summary / Instruction */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      Instruction Summary
                    </h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {currentStep.summary || currentStep.instruction}
                    </p>
                  </div>

                  {/* Why It's Needed */}
                  {currentStep.whyNeeded && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-amber-500" />
                        Why It's Needed
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {currentStep.whyNeeded}
                      </p>
                    </div>
                  )}

                  {/* Pillar Connection */}
                  {currentStep.pillarConnection && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />
                        Pillar Connection
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {currentStep.pillarConnection}
                      </p>
                    </div>
                  )}

                  {/* Target Commands */}
                  {currentStep.commands && currentStep.commands.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Target Commands (Click to Run)</h4>
                      {currentStep.commands.map((cmd, idx) => {
                        const translatedCmd = getOSCommand(cmd.text, selectedOS);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleCommandClick(translatedCmd)}
                            disabled={isCheckingProgress}
                            className="w-full text-left bg-zinc-950 p-4 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all group cursor-pointer disabled:cursor-not-allowed flex justify-between items-start gap-4"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-xs text-brand-blue mb-1 group-hover:text-white transition-colors break-all">
                                {translatedCmd}
                              </div>
                              <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                {cmd.explanation}
                              </p>
                            </div>
                            <div className="shrink-0 text-zinc-500 hover:text-white transition-colors p-1" onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(translatedCmd, `cmd-${idx}`);
                            }}>
                              {copied === `cmd-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Action controls inside Left Column */}
                  <div className="pt-6 border-t border-zinc-100 flex flex-col gap-3">
                    <button
                      onClick={handleCheckProgress}
                      disabled={isCheckingProgress}
                      className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5 relative overflow-hidden flex justify-center items-center gap-2 ${
                        isCheckingProgress 
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200' 
                          : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                      }`}
                    >
                      {isCheckingProgress && (
                        <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <span>
                        {isCheckingProgress ? `Validating... ${progressPercentage}%` : 'Check Progress'}
                      </span>
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={prevStep}
                        disabled={isFirstStep}
                        className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${(isFirstStep) ? 'text-zinc-300 bg-zinc-50 border-zinc-200 cursor-not-allowed' : 'text-zinc-500 border-zinc-200 hover:bg-zinc-50 bg-white'}`}
                      >
                        Back
                      </button>
                      <button
                        onClick={isLastStep ? handleLabComplete : nextStep}
                        disabled={!completedSteps.includes(currentStep.id)}
                        className={`flex-[2] py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                          completedSteps.includes(currentStep.id)
                            ? 'bg-brand-blue hover:bg-brand-blue/90 text-white shadow-brand-blue/20'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        }`}
                      >
                        {isLastStep ? 'Complete Lab' : 'Next Step'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal */}
          <div className="flex-1 bg-zinc-900 p-6 flex flex-col h-full overflow-hidden">
            <Terminal 
              initialMessage={`Connected to ${lab.environment} instance... Ready for lab: ${projectTitle}`}
              hideSidebar={true}
              runCommandTrigger={runCommandTrigger}
              checkProgressTrigger={checkProgressTrigger}
              onCheckingProgressChange={(checking, progress) => {
                setIsCheckingProgress(checking);
                setProgressPercentage(progress);
              }}
              currentStep={currentStep}
              allSteps={lab.steps}
              currentStepIndex={currentStepIndex}
              onNext={nextStep}
              onPrev={prevStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              onStepComplete={(stepId) => {
                if (!completedSteps.includes(stepId)) {
                  setCompletedSteps(prev => [...prev, stepId]);
                }
              }}
              onComplete={handleLabComplete}
              xpReward={lab.xpReward || 250}
              flavor="ubuntu"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 px-8 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <div>{(lab?.environment || 'LINUX').toUpperCase()} ENVIRONMENT READY</div>
          <div className="flex items-center gap-4">
            <span className={isStarted ? "text-emerald-500" : "text-zinc-300"}>
              {isStarted ? "● LIVE SESSION ACTIVE" : "○ SESSION IDLE"}
            </span>
          </div>
        </div>
      </footer>

      {/* XP + Rank Reward Overlay */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] bg-zinc-900/75 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.75, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
              className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center relative overflow-hidden shadow-2xl"
            >
              {/* Confetti particles */}
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.color }}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ scale: [0, 1, 0.8, 0], opacity: [1, 1, 0.6, 0], y: p.dy }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 1.1, ease: 'easeOut' }}
                />
              ))}

              <motion.div
                animate={{ rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.15, 1] }}
                transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }}
                className="text-6xl select-none mb-4"
              >
                🏆
              </motion.div>

              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Lab Complete!</h2>
              <p className="text-zinc-400 text-sm mb-7 truncate px-4">{projectTitle}</p>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                className="bg-amber-50 border-2 border-amber-100 rounded-2xl py-5 px-6 mb-5"
              >
                <div className="text-4xl font-black text-amber-500 leading-none">+{earnedXp}</div>
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] mt-1">XP Earned</div>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 mb-7"
              >
                <div className="text-3xl mb-1">{newRank.icon}</div>
                <div className="text-base font-black text-zinc-900">{newRank.title}</div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">{newTotalXp.toLocaleString()} XP total</div>
                {didRankUp && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 400 }}
                    className="mt-3 inline-block px-3 py-1 bg-brand-blue text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full"
                  >
                    ✦ Rank Up!
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { setShowReward(false); onClose(); }}
                className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
