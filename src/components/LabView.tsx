import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, Check, Share2,
  Terminal as TerminalIcon, Play,
  BookOpen, Target, Lightbulb,
  MessageSquare, ThumbsUp, Send
} from 'lucide-react';
import { LabContent, LabStep } from '../types/content';
import { Terminal } from './Terminal';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';
import { projects } from '../data/projects';
import { conceptDictionary } from '../data/conceptDictionary';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 font-sans"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-6xl max-h-full rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Header */}
        <header className="bg-white border-b border-zinc-100 px-8 py-6 shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              All Labs
            </button>
            <div className="h-4 w-px bg-zinc-200"></div>
            <button className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-bold text-sm">
              <Share2 className="w-4 h-4" />
              Share Lab
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
                Mission {lab.missionNumber || 1} of {lab.totalMissions || lab.steps?.length || 0}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-brand-blue"
                  />
                </div>
              </div>
            </div>
            {lab.xpReward && (
              <div className="flex flex-col items-center px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-sm font-black text-amber-600 leading-none">{lab.xpReward} XP</span>
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mt-0.5">Reward</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Login-to-save banner */}
      <div className="bg-gradient-to-r from-brand-blue/8 to-blue-50 border-b border-brand-blue/10 px-8 py-3 shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 font-medium">
            <span className="font-bold text-zinc-900">Log in to save your progress and XP.</span>
            {' '}Your work won't be saved in guest mode.
          </p>
          <button className="shrink-0 px-4 py-1.5 bg-zinc-900 text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-brand-blue transition-colors">
            Log in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-zinc-50/50">
        <div className="max-w-6xl mx-auto py-12 px-8">
          {/* Lab Title Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-zinc-900 mb-6 tracking-tight leading-tight">
              {projectTitle}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-zinc-200">
              <div>
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  Description
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {lab.description || lab.steps?.[0]?.instruction || ''}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  Objective
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {lab.objective || `Complete all ${lab.steps?.length || 0} missions to master the core concepts of ${projectTitle} and validate your practical skills in a live-cloud sandbox environment.`}
                </p>
              </div>
            </div>

            {/* Important Concepts Section */}
            {(() => {
              if (!lab || !lab.projectId) return null;
              const project = projects.find(p => p.id === String(lab.projectId));
              const tags = project?.tags || [];
              
              const concepts = tags
                .map(tag => conceptDictionary[tag])
                .filter((c): c is { title: string; description: string } => 
                  Boolean(c && typeof c === 'object' && 'title' in c && 'description' in c)
                );

              // Deduplicate concepts by title to be extra safe
              const uniqueConcepts = Array.from(
                new Map(concepts.map(c => [c.title, c])).values()
              );

              if (uniqueConcepts.length > 0) {
                return (
                  <div className="mb-8 pb-8 border-b border-zinc-200">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      Important Concepts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {uniqueConcepts.map((concept, idx) => (
                        <div key={idx} className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
                          <h5 className="text-sm font-bold text-zinc-900 mb-2 flex items-center gap-2">
                            <Sparkle className="w-4 h-4 text-brand-blue" />
                            {concept.title}
                          </h5>
                          <p className="text-zinc-500 text-xs leading-relaxed">
                            {concept.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}
          </div>

          <div className="h-[650px] flex flex-col relative">
            <AnimatePresence>
              {isLastStep && completedSteps.includes(currentStep.id) && (
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute inset-x-8 -top-6 z-20"
                >
                  <div className="bg-emerald-500 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center justify-between border-4 border-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                        🏆
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest">Mission Accomplished!</h4>
                        <p className="text-[10px] font-medium opacity-90">All objectives secured. Lab status: COMPLETED.</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-black">+{lab.xpReward || 250} XP</span>
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-75">Cloud Progress</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isStarted ? (
              <div className="flex-1 bg-white rounded-[2rem] border-2 border-zinc-100 flex flex-col items-center justify-center text-center p-12">
                <AnimatePresence mode="wait">
                  {isConnecting ? (
                    <motion.div 
                      key="connecting"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="w-full max-w-sm"
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
            ) : (
              <Terminal 
                initialMessage={`Connected to ${lab.environment} instance... Ready for lab: ${projectTitle}`}
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
                onCommand={(cmd) => {
                  const command = cmd.trim().toLowerCase();
                  
                  // Global Commands
                  if (command === 'help') return 'Available commands: az, kubectl, terraform, ansible, helm, ls, cd, pwd, curl, date, whoami, help';
                  if (command === 'ls') return 'configs/  scripts/  manifests/  terraform/  README.md';
                  if (command === 'pwd') return '/home/cloud-user/workspace';
                  if (command === 'whoami') return 'cloud-user';
                  if (command === 'date') return new Date().toUTCString();
                  if (command.startsWith('cd ')) return `Changed directory to ${command.split(' ')[1]}`;

                  // Helm Installation specific
                  if (command.includes('curl') && command.includes('get_helm.sh')) {
                    return '  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n                                 Dload  Upload   Total   Spent    Left  Speed\n100  11.2k  100  11.2k    0     0  45161      0 --:--:-- --:--:-- --:--:-- 45362';
                  }
                  if (command.includes('chmod 700 get_helm.sh')) {
                    return ''; // Silent success
                  }
                  if (command.includes('./get_helm.sh')) {
                    return 'Downloading https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz\nVerifying checksum... Done.\nPreparing to install helm into /usr/local/bin\nhelm installed into /usr/local/bin/helm successfully.\nRun "helm version" to verify.';
                  }

                  // Tool Specific Realistic Outputs
                  if (command.includes('helm version')) {
                    return 'version.BuildInfo{Version:"v3.12.0", GitCommit:"c9f554a753830491f22316e25dc520399433b7e0", GitTreeState:"clean", GoVersion:"go1.20.3"}';
                  }

                  if (command.includes('kubectl get nodes')) {
                    return 'NAME             STATUS   ROLES           AGE   VERSION\naks-nodepool1    Ready    agent           12d   v1.26.3\naks-nodepool2    Ready    agent           12d   v1.26.3';
                  }

                  if (command.includes('kubectl get pods')) {
                    if (currentStepIndex > 1) {
                      return 'NAME                                      READY   STATUS    RESTARTS   AGE\nprometheus-server-767988bfb9-w87v5        1/1     Running   0          2m\ngrafana-56c68677c7-xphk7                  1/1     Running   0          2m\nnode-exporter-8v6tx                       1/1     Running   0          2m';
                    }
                    return 'No resources found in default namespace.';
                  }

                  if (command.includes('curl') && command.includes('http')) {
                    return 'HTTP/1.1 200 OK\nContent-Type: application/json\nDate: ' + new Date().toUTCString() + '\n\n{"status": "success", "data": "connected to endpoint"}';
                  }

                  if (command.includes('terraform plan')) {
                    return 'Terraform used the selected providers to generate the following execution plan...\n\nPlan: 4 to add, 0 to change, 0 to destroy.';
                  }

                  if (command.includes('terraform apply')) {
                    return 'azurerm_resource_group.main: Creating...\nazurerm_kubernetes_cluster.k8s: Creating...\n\nApply complete! Resources: 4 added, 0 changed, 0 destroyed.';
                  }

                  if (command.includes('az login')) {
                    return 'Logged in successfully as user@example.com (Tenant ID: 72f988bf-86f1-41af-91ab-2d7cd011db47)';
                  }

                  // Default success message for unknown but valid-looking commands
                  return `bash: ${cmd}: command executed successfully. [LOG: ${new Date().toISOString()}]`;
                }}
              />
            )}
          </div>
        </div>

        {/* Comments & Recommendations */}
        <div className="max-w-6xl mx-auto py-10 px-8 border-t border-zinc-100">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Comments & Recommendations</h3>
            <span className="ml-1 text-xs text-zinc-400 font-semibold">({comments.length})</span>
          </div>

          {/* Input — login gate */}
          {false /* replace with real isLoggedIn check */ ? (
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-8">
              <div className="flex gap-3 mb-3">
                {(['general', 'tip', 'recommendation', 'issue'] as Comment['tag'][]).map(t => (
                  <button
                    key={t}
                    onClick={() => setNewTag(t)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold border capitalize transition-colors ${newTag === t ? TAG_STYLES[t] : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 items-end">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitComment(); } }}
                  placeholder="Share a tip, recommendation, or issue you found…"
                  rows={2}
                  className="flex-1 resize-none bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-700 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/50 transition-all"
                />
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                  className="flex items-center gap-2 px-5 py-3 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-blue transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-2xl p-6 mb-8 flex flex-col items-center text-center gap-3">
              <MessageSquare className="w-6 h-6 text-zinc-300" />
              <p className="text-sm font-semibold text-zinc-500">You must be logged in to post a comment or recommendation.</p>
              <button className="px-6 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-blue transition-colors">
                Log in to comment
              </button>
            </div>
          )}

          {/* Comment list */}
          <div className="space-y-4">
            {comments.map(c => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-zinc-100 rounded-2xl p-5 flex gap-4"
              >
                <img src={c.avatar} alt={c.author} className="w-8 h-8 rounded-full shrink-0 mt-0.5" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-zinc-900">{c.author}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${TAG_STYLES[c.tag]}`}>{c.tag}</span>
                    <span className="text-[10px] text-zinc-400 ml-auto">{c.timestamp}</span>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">{c.text}</p>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className={`mt-2 flex items-center gap-1.5 text-[11px] font-bold transition-colors ${c.liked ? 'text-brand-blue' : 'text-zinc-400 hover:text-zinc-600'}`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {c.likes} helpful
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer (Simplified as navigation is mostly in terminal now) */}
      <footer className="bg-white border-t border-zinc-100 px-8 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
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
            className="absolute inset-0 z-[10] bg-zinc-900/75 backdrop-blur-md flex items-center justify-center p-6 rounded-[2.5rem]"
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

              {/* Trophy */}
              <motion.div
                animate={{ rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.15, 1] }}
                transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }}
                className="text-6xl select-none mb-4"
              >
                🏆
              </motion.div>

              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Lab Complete!</h2>
              <p className="text-zinc-400 text-sm mb-7 truncate px-4">{projectTitle}</p>

              {/* XP earned */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                className="bg-amber-50 border-2 border-amber-100 rounded-2xl py-5 px-6 mb-5"
              >
                <div className="text-4xl font-black text-amber-500 leading-none">+{earnedXp}</div>
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] mt-1">XP Earned</div>
              </motion.div>

              {/* Rank */}
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

              {/* Login-to-save nudge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-brand-blue/6 border border-brand-blue/15 rounded-2xl px-5 py-4 mb-4 text-left"
              >
                <p className="text-xs font-bold text-zinc-900 mb-1">Don't lose your progress!</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">Log in to permanently save your XP, rank, and completed labs.</p>
                <button className="w-full py-2.5 bg-brand-blue text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                  Log in &amp; Save Progress
                </button>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { setShowReward(false); onClose(); }}
                className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
              >
                Continue as guest
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);
};

