import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play, CheckCircle, BookOpen, Terminal as TerminalIcon, Layout, Code, Settings2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Lesson } from '../types/content';
import { Terminal } from './Terminal';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';
import { LinuxFlavor, CloudProvider } from '../App';

interface LessonViewProps {
  lessons: Lesson[];
  onClose: () => void;
  courseTitle: string;
  linuxFlavor?: LinuxFlavor;
  onFlavorChange?: (flavor: LinuxFlavor) => void;
  cloudProvider?: CloudProvider;
  onCloudProviderChange?: (provider: CloudProvider) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ 
  lessons, 
  onClose, 
  courseTitle,
  linuxFlavor = 'ubuntu',
  onFlavorChange,
  cloudProvider = 'aws',
  onCloudProviderChange
}) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [showFlavorSelector, setShowFlavorSelector] = useState(false);
  const [showCloudSelector, setShowCloudSelector] = useState(false);
  
  const currentLesson = lessons[currentLessonIndex];
  
  const isCloudCourse = courseTitle.toLowerCase().includes('azure') ||
                        courseTitle.toLowerCase().includes('cloud');

  // Get flavor-specific content if available
  const displayContent = isCloudCourse 
    ? (currentLesson.cloudContent?.[cloudProvider]?.content || currentLesson.content)
    : (currentLesson.flavorContent?.[linuxFlavor]?.content || currentLesson.content);
    
  const displayTask = isCloudCourse
    ? (currentLesson.cloudContent?.[cloudProvider]?.task || currentLesson.task)
    : (currentLesson.flavorContent?.[linuxFlavor]?.task || currentLesson.task);

  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  const nextLesson = () => {
    if (!isLastLesson) {
      setCurrentLessonIndex(prev => prev + 1);
      setIsSandboxOpen(false);
    }
  };

  const prevLesson = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(prev => prev - 1);
      setIsSandboxOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-50 w-full max-w-6xl max-h-full rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Doodles */}
      <DoodleWrapper className="top-20 left-10 text-zinc-200 w-24 h-24">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-20 right-10 text-zinc-200 w-16 h-16">
        <Sparkle />
      </DoodleWrapper>

      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
          <div className="h-6 w-px bg-zinc-200"></div>
          <div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-0.5">
              {courseTitle}
            </span>
            <h1 className="text-lg font-bold text-zinc-900 leading-tight">
              {currentLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {courseTitle.toLowerCase().includes('linux') && (
            <div className="relative">
              <button 
                onClick={() => setShowFlavorSelector(!showFlavorSelector)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors text-xs font-bold text-zinc-600"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Flavor: <span className="text-brand-blue uppercase">{linuxFlavor}</span>
              </button>

              <AnimatePresence>
                {showFlavorSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 p-2 z-50"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 mb-1">
                      Choose Linux Flavor
                    </div>
                    {(['ubuntu', 'centos', 'alpine', 'rhel'] as LinuxFlavor[]).map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => {
                          onFlavorChange?.(flavor);
                          setShowFlavorSelector(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${linuxFlavor === flavor ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-zinc-50 text-zinc-600'}`}
                      >
                        {flavor === 'rhel' ? 'Red Hat (RHEL)' : flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                        {linuxFlavor === flavor && <CheckCircle className="w-3.5 h-3.5 inline ml-2" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {isCloudCourse && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600">
              <Settings2 className="w-3.5 h-3.5" />
              Cloud: <span className="text-brand-blue uppercase">Azure</span>
            </div>
          )}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1">
              {lessons.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentLessonIndex ? 'w-8 bg-zinc-900' : 'w-1.5 bg-zinc-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-500 ml-2 uppercase tracking-widest">
              {currentLessonIndex + 1} / {lessons.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/10"
          >
            Finish Course
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-zinc prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-p:text-zinc-600 prose-p:leading-relaxed prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-zinc-900 prose-code:font-mono prose-code:before:content-none prose-code:after:content-none">
              <Markdown>{displayContent}</Markdown>
            </div>

            {/* Sandbox Trigger */}
            <div className="mt-12 p-8 bg-zinc-50 rounded-3xl border border-zinc-200 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Ready to Practice?</h3>
                <p className="text-zinc-500 text-sm">
                  Launch the interactive sandbox to apply the concepts from this lesson in a live environment.
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsSandboxOpen(true)}
                className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 flex items-center gap-3 shrink-0 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white" />
                Launch Sandbox
              </motion.button>
            </div>
            
            <div className="mt-12 flex items-center justify-between pt-8 border-t border-zinc-100">
              <button 
                onClick={prevLesson}
                disabled={isFirstLesson}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isFirstLesson ? 'text-zinc-300 cursor-not-allowed' : 'text-zinc-900 hover:bg-zinc-100'}`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Lesson
              </button>
              <button 
                onClick={nextLesson}
                disabled={isLastLesson}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isLastLesson ? 'bg-brand-blue/10 text-brand-blue cursor-not-allowed' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/20'}`}
              >
                {isLastLesson ? 'Course Completed' : 'Next Lesson'}
                {!isLastLesson && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Sandbox Modal */}
      <AnimatePresence>
        {isSandboxOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSandboxOpen(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-50 rounded-[32px] shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 bg-white border-b border-zinc-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-900 rounded-xl">
                    {currentLesson.demoType === 'terminal' ? <TerminalIcon className="w-5 h-5 text-white" /> : 
                     currentLesson.demoType === 'cloud-console' ? <Layout className="w-5 h-5 text-white" /> : 
                     <Code className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Interactive Sandbox</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                      <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Live Environment</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSandboxOpen(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Sandbox Area */}
                <div className="flex-1 p-8 overflow-hidden flex flex-col">
                  {currentLesson.demoType === 'terminal' ? (
                    <Terminal 
                      initialMessage={currentLesson.demoConfig?.initialMessage}
                      availableCommands={currentLesson.demoConfig?.availableCommands}
                      flavor={linuxFlavor}
                      currentStep={currentLesson as any}
                      allSteps={lessons.map(l => ({
                        id: l.id,
                        title: l.title,
                        instruction: l.task || '',
                      })) as any}
                      currentStepIndex={currentLessonIndex}
                    />
                  ) : (
                    <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden flex-1 flex flex-col">
                      <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white uppercase">{isCloudCourse ? cloudProvider : (currentLesson.demoConfig?.provider || 'AWS')}</span>
                          </div>
                          <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{currentLesson.demoConfig?.service || 'Cloud Console'}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
                        <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mb-6">
                          <Layout className="w-10 h-10 text-zinc-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2">{currentLesson.demoConfig?.mockData?.pipelineName || 'Interactive Demo'}</h3>
                        <p className="text-zinc-500 mb-8 max-w-md">This is a simulated cloud interface to help you visualize the concepts.</p>
                        <div className="w-full max-w-lg space-y-3">
                          {currentLesson.demoConfig?.mockData?.stages?.map((stage: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-brand-blue text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                                {i + 1}
                              </div>
                              <span className="text-sm font-bold text-zinc-700 uppercase tracking-widest">{stage}</span>
                              <div className="ml-auto">
                                {i === 0 ? <CheckCircle className="w-5 h-5 text-brand-blue" /> : <div className="w-5 h-5 rounded-full border-2 border-zinc-200" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Task Sidebar */}
                <div className="w-full md:w-80 bg-zinc-100 p-8 border-l border-zinc-200 flex flex-col gap-6 shrink-0 overflow-y-auto">
                  {displayTask && (
                    <div className="bg-brand-blue rounded-2xl p-6 text-white shadow-xl shadow-brand-blue/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <TerminalIcon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-black uppercase tracking-[0.2em] text-[10px]">Current Task</h4>
                      </div>
                      <p className="text-white font-medium leading-relaxed text-sm">
                        {displayTask}
                      </p>
                    </div>
                  )}

                  <div className="bg-zinc-900 rounded-2xl p-6 text-white shadow-xl shadow-zinc-900/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Play className="w-4 h-4 text-brand-blue" />
                      </div>
                      <h4 className="font-bold uppercase tracking-widest text-[10px]">Sandbox Guide</h4>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                      Practice what you've learned. The environment is safe and resets with each lesson.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold text-zinc-400 uppercase tracking-widest border border-white/10">Real-time</span>
                      <span className="px-2 py-1 bg-white/5 rounded text-[8px] font-bold text-zinc-400 uppercase tracking-widest border border-white/10">Isolated</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
