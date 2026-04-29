import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, Check, Share2, 
  Terminal as TerminalIcon, Play, 
  BookOpen, Target, Lightbulb
} from 'lucide-react';
import { LabContent, LabStep } from '../types/content';
import { Terminal } from './Terminal';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';

interface LabViewProps {
  lab: LabContent;
  onClose: () => void;
  onComplete: (xp?: number) => void;
  projectTitle: string;
}

export const LabView: React.FC<LabViewProps> = ({ lab, onClose, onComplete, projectTitle }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

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

  const currentStep = lab.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === lab.steps.length - 1;

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
                Mission {lab.missionNumber || 1} of {lab.totalMissions || lab.steps.length}
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
                  {lab.steps[0].instruction}
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  Objective
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Complete all {lab.steps.length} missions to master the core concepts of {projectTitle} and validate your practical skills in a live-cloud sandbox environment.
                </p>
              </div>
            </div>
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
                onComplete={() => {
                  onComplete(lab.xpReward || 250);
                  onClose();
                }}
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
      </main>

      {/* Footer (Simplified as navigation is mostly in terminal now) */}
      <footer className="bg-white border-t border-zinc-100 px-8 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <div>{lab.environment.toUpperCase()} ENVIRONMENT READY</div>
          <div className="flex items-center gap-4">
            <span className={isStarted ? "text-emerald-500" : "text-zinc-300"}>
              {isStarted ? "● LIVE SESSION ACTIVE" : "○ SESSION IDLE"}
            </span>
          </div>
        </div>
      </footer>
    </motion.div>
  </motion.div>
);
};

