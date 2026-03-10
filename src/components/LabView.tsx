import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Terminal as TerminalIcon, Layout, Code, Play, Info, AlertCircle, Copy, Check } from 'lucide-react';
import { LabContent, LabStep } from '../types/content';
import { Terminal } from './Terminal';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';

interface LabViewProps {
  lab: LabContent;
  onClose: () => void;
  onComplete: () => void;
  projectTitle: string;
  mode: 'real' | 'cli';
}

export const LabView: React.FC<LabViewProps> = ({ lab, onClose, onComplete, projectTitle, mode }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'nodejs' | 'csharp' | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startLabSession = () => {
    setIsConnecting(true);
    const statuses = mode === 'real' ? [
      'Initializing secure tunnel...',
      'Provisioning cloud resources...',
      'Configuring network interfaces...',
      'Starting container runtime...',
      'Establishing terminal connection...'
    ] : [
      'Initializing CLI environment...',
      'Loading lab configurations...',
      'Setting up local simulation...',
      'Preparing verification engine...',
      'Ready for CLI testing...'
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
        
        // Update status message based on progress
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

  const displayInstruction = (selectedLanguage && currentStep.languageInstructions?.[selectedLanguage]) 
    ? currentStep.languageInstructions[selectedLanguage] 
    : currentStep.instruction;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
      setShowHint(false);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
      setShowHint(false);
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const resetEnvironment = () => {
    setCompletedSteps(prev => prev.filter(id => id !== currentStep.id));
    setShowHint(false);
  };

  const progress = (completedSteps.length / lab.steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-900 flex flex-col relative overflow-hidden"
    >
      {/* Doodles */}
      <DoodleWrapper className="top-20 left-10 text-white/5 w-24 h-24">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-20 right-10 text-white/5 w-16 h-16">
        <Sparkle />
      </DoodleWrapper>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-32 right-8 z-[70] w-80 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-500/10 rounded-lg">
                  <Info className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-widest">Lab Hint</span>
              </div>
              <button 
                onClick={() => setShowHint(false)}
                className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {currentStep.hint || "Try to follow the instructions carefully. If you're stuck, check the documentation for the specific service."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
          <div className="h-6 w-px bg-zinc-800"></div>
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-0.5">
              Hands-on Lab
            </span>
            <h1 className="text-lg font-bold text-white leading-tight">
              {projectTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-brand-blue"
              />
            </div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <button 
            onClick={() => {
              onComplete();
              onClose();
            }}
            disabled={!isStarted}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg ${
              isStarted 
                ? 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-brand-blue/20' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            Submit Lab
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Lab Instructions */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
          <div className="p-6 overflow-y-auto flex-1 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800">
            <div>
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Lab Steps
              </h2>
              <div className="space-y-3">
                {lab.steps.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIndex(i)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                      i === currentStepIndex 
                        ? 'bg-zinc-800 border-zinc-700 shadow-xl' 
                        : 'bg-transparent border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                      completedSteps.includes(step.id) 
                        ? 'bg-brand-blue text-white' 
                        : i === currentStepIndex ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {completedSteps.includes(step.id) ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold mb-1 ${i === currentStepIndex ? 'text-white' : 'text-zinc-400'}`}>
                        {step.title}
                      </h3>
                      {i === currentStepIndex && (
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Click to view detailed instructions for this step.
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-blue/10 rounded-lg">
                    <Play className="w-4 h-4 text-brand-blue" />
                  </div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-brand-blue">Current Task</h4>
                </div>
                
                {currentStep.languageInstructions && (
                  <div className="flex gap-1 bg-zinc-800 p-1 rounded-lg">
                    {Object.keys(currentStep.languageInstructions).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang as any)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          selectedLanguage === lang 
                            ? 'bg-brand-blue text-white' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {lang === 'csharp' ? 'C#' : lang === 'nodejs' ? 'Node' : 'Py'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {displayInstruction}
              </p>

              {currentStep.command && (
                <div className="mb-6">
                  <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Task Command</h5>
                  <div className="relative group">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-brand-blue break-all pr-12">
                      {currentStep.command}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(currentStep.command!)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-white"
                      title="Copy command"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {completedSteps.includes(currentStep.id) && currentStep.feedback && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"
                >
                  <h5 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Feedback Explanation
                  </h5>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {currentStep.feedback}
                  </p>
                </motion.div>
              )}

              <button 
                onClick={() => toggleStepCompletion(currentStep.id)}
                disabled={!isStarted}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  !isStarted
                    ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                    : completedSteps.includes(currentStep.id)
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {!isStarted ? 'Start Lab to Begin' : completedSteps.includes(currentStep.id) ? 'Step Completed' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
            <button 
              onClick={prevStep}
              disabled={isFirstStep}
              className={`p-3 rounded-xl transition-all ${isFirstStep ? 'text-zinc-700' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Step {currentStepIndex + 1} of {lab.steps.length}</span>
            </div>
            <button 
              onClick={nextStep}
              disabled={isLastStep}
              className={`p-3 rounded-xl transition-all ${isLastStep ? 'text-zinc-700' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Lab Terminal / Sandbox */}
        <div className="flex-1 bg-zinc-950 p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <TerminalIcon className="w-4 h-4 text-brand-blue" />
                </div>
                <span className="text-sm font-bold text-white uppercase tracking-widest">Cloud Terminal</span>
              </div>
              <div className="h-4 w-px bg-zinc-800"></div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isStarted ? 'bg-brand-blue animate-pulse' : 'bg-zinc-700'}`}></div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Environment: {isStarted ? lab.environment.toUpperCase() : 'OFFLINE'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={resetEnvironment}
                disabled={!isStarted}
                className={`px-4 py-2 border rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  isStarted ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800' : 'bg-zinc-900/50 border-zinc-800/50 text-zinc-700 cursor-not-allowed'
                }`}
              >
                Reset Environment
              </button>
              <button 
                onClick={() => setShowHint(!showHint)}
                disabled={!isStarted}
                className={`px-4 py-2 border rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  !isStarted 
                    ? 'bg-zinc-900/50 border-zinc-800/50 text-zinc-700 cursor-not-allowed'
                    : showHint 
                      ? 'bg-amber-500 border-amber-500 text-white' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {showHint ? 'Hide Hint' : 'Get Hint'}
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            {!isStarted ? (
              <div className="absolute inset-0 z-10 bg-zinc-950/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
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
                      <h3 className="text-xl font-bold text-white mb-4">
                        {mode === 'real' ? 'Connecting to Cloud...' : 'Preparing CLI Environment...'}
                      </h3>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4">
                        <motion.div 
                          className="h-full bg-brand-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${connectionProgress}%` }}
                        />
                      </div>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest animate-pulse">
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
                      <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-brand-blue/20">
                        <Play className="w-10 h-10 text-brand-blue fill-brand-blue/20" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {mode === 'real' ? 'Ready to start your lab?' : 'Ready to test with CLI?'}
                      </h3>
                      <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed">
                        {mode === 'real' 
                          ? 'Click the button below to provision your cloud environment and connect to the interactive terminal.'
                          : 'Click the button below to start the CLI simulation and test your knowledge of the concepts.'}
                      </p>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={startLabSession}
                        className="bg-brand-blue text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-2xl shadow-brand-blue/40 flex items-center gap-3 cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        {mode === 'real' ? 'Start Lab Session' : 'Start CLI Test'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Terminal 
                initialMessage={mode === 'real' 
                  ? `Connected to ${lab.environment} instance... Ready for lab: ${projectTitle}`
                  : `CLI Simulation Environment Ready... Testing concepts for: ${projectTitle}`
                }
                onCommand={(cmd) => {
                  if (currentStep.checkCommand && cmd === currentStep.checkCommand) {
                    return currentStep.expectedOutput || 'Command executed successfully.';
                  }
                  // Return null or empty string to let Terminal handle it if it's a standard command
                  // But since Terminal handles standard commands in its own switch, 
                  // we only get here if it's NOT a standard command.
                  return `bash: ${cmd}: command executed.`;
                }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className={`w-4 h-4 ${isStarted ? 'text-amber-500' : 'text-zinc-600'}`} />
                <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Resource Usage</h5>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-2xl font-bold ${isStarted ? 'text-white' : 'text-zinc-700'}`}>{isStarted ? '12%' : '--'}</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">CPU Utilization</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Layout className={`w-4 h-4 ${isStarted ? 'text-blue-500' : 'text-zinc-600'}`} />
                <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Active Services</h5>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-2xl font-bold ${isStarted ? 'text-white' : 'text-zinc-700'}`}>{isStarted ? '4' : '--'}</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Running Containers</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className={`w-4 h-4 ${isStarted ? 'text-purple-500' : 'text-zinc-600'}`} />
                <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Network Traffic</h5>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-2xl font-bold ${isStarted ? 'text-white' : 'text-zinc-700'}`}>{isStarted ? '1.2' : '--'}</span>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">MB/s Inbound</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};
