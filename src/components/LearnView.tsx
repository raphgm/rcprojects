import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Infinity, Shield, Skull, Database, 
  BarChart, Box, Ship, Code, GitBranch, 
  Globe, Zap, ArrowRight, BookOpen, Star,
  Coffee, Cpu, Atom, Cloud, Wrench, Binary,
  Layers, Brain, FileCode, Server, Command,
  CloudFog, CloudSun, X, Clock, BarChart3,
  CheckCircle2, PlayCircle, Lock
} from 'lucide-react';
import { learningPaths, LearningPath, Course, Project } from '../data/learningPaths';
import { SquigglyArrow, Sparkle, ZigZag, DoodleWrapper } from './Doodles';

const iconMap: Record<string, any> = {
  Terminal, Infinity, Shield, Skull, Database, 
  BarChart, Box, Ship, Code, GitBranch, 
  Globe, Zap, Coffee, Cpu, Atom, Cloud, 
  Wrench, Binary, Layers, Brain, FileCode, 
  Server, Command, CloudFog, CloudSun
};

const PathCard: React.FC<{ path: LearningPath; onClick: () => void; isLocked?: boolean }> = ({ path, onClick, isLocked }) => {
  const Icon = iconMap[path.icon] || BookOpen;

  return (
    <motion.div
      whileHover={isLocked ? undefined : { y: -5 }}
      onClick={() => { if (!isLocked) onClick(); }}
      className={`relative bg-white border border-zinc-200 rounded-2xl p-6 transition-all group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
    >
      {isLocked && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-zinc-100 pointer-events-none">
          <Lock className="w-2.5 h-2.5 text-zinc-400" />
          <span className="text-[9px] font-semibold text-zinc-400 tracking-wide">Coming soon</span>
        </div>
      )}
      <div className={`w-12 h-12 ${path.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
        {path.title}
      </h3>
      <p className="text-zinc-500 text-sm mb-6 line-clamp-2">
        {path.description}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-zinc-900">{path.skills}</span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Skills</span>
        </div>
        <div className="w-px h-8 bg-zinc-100"></div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-zinc-900">{path.coursesCount}</span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Courses</span>
        </div>
        {path.projectsCount !== undefined && (
          <>
            <div className="w-px h-8 bg-zinc-100"></div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900">{path.projectsCount}</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Projects</span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center text-zinc-900 font-bold text-sm group-hover:gap-2 transition-all">
        Start Learning <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
};

const PathDetail: React.FC<{ 
  path: LearningPath; 
  onClose: () => void;
  onStartCourse: (id: string, title: string) => void;
  onStartLab: (id: string, title: string) => void;
  isEnrolled: boolean;
  onEnroll: () => void;
  completedLabs: string[];
}> = ({ path, onClose, onStartCourse, onStartLab, isEnrolled, onEnroll, completedLabs }) => {
  const Icon = iconMap[path.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-8 ${path.color} text-white relative`}>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{path.title}</h2>
              <p className="text-white/80 max-w-xl">{path.description}</p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-white/60" />
              <span className="font-bold">{path.coursesCount} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-white/60" />
              <span className="font-bold">{path.projectsCount || 0} Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-white/60" />
              <span className="font-bold">{path.skills} Skills</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-zinc-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Courses Column */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-zinc-400" />
                Learning Courses
              </h3>
              <div className="space-y-4">
                {path.courses.map((course) => (
                  <div 
                    key={course.id} 
                    onClick={() => {
                      onStartCourse(course.id, course.title);
                      onClose();
                    }}
                    className="bg-white p-5 rounded-2xl border border-zinc-200 hover:border-zinc-900 hover:shadow-lg transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-zinc-900 group-hover:text-zinc-900 transition-colors">{course.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                        course.level === 'Beginner' ? 'bg-brand-blue/10 text-brand-blue' :
                        course.level === 'Intermediate' ? 'bg-brand-blue/20 text-brand-blue' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} Lessons
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Column */}
            <div>
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-zinc-400" />
                Hands-on Projects
              </h3>
              <div className="space-y-4">
                {path.projects.length > 0 ? (
                  path.projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="bg-white p-5 rounded-2xl border border-zinc-200 hover:border-zinc-900 hover:shadow-lg transition-all group relative"
                    >
                      {completedLabs.includes(project.id) && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg z-10">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-zinc-900 group-hover:text-zinc-900 transition-colors">{project.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                          project.difficulty === 'Easy' ? 'bg-brand-blue/10 text-brand-blue' :
                          project.difficulty === 'Medium' ? 'bg-brand-blue/20 text-brand-blue' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {project.estimatedTime}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            onStartLab(project.id, project.title);
                            onClose();
                          }}
                          className="w-full py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                          Start Lab
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-zinc-100/50 border border-dashed border-zinc-200 rounded-2xl p-8 text-center">
                    <p className="text-zinc-400 text-sm font-medium">No projects available for this path yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100 bg-white flex justify-end">
          <button 
            onClick={onEnroll}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              isEnrolled 
                ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20' 
                : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10'
            }`}
          >
            {isEnrolled ? 'Continue Learning' : 'Enroll in Path'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface LearnViewProps {
  onStartCourse: (id: string, title: string) => void;
  onStartLab: (id: string, title: string) => void;
  completedLabs: string[];
}

export const LearnView: React.FC<LearnViewProps> = ({ onStartCourse, onStartLab, completedLabs }) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>([]);

  const handleEnroll = (pathId: string) => {
    if (!enrolledPaths.includes(pathId)) {
      setEnrolledPaths(prev => [...prev, pathId]);
    } else if (selectedPath) {
      // If already enrolled, start the first course
      const firstCourse = selectedPath.courses[0];
      if (firstCourse) {
        onStartCourse(firstCourse.id, firstCourse.title);
        setSelectedPath(null);
      }
    }
  };

  const paths = learningPaths;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Background Doodles */}
      <DoodleWrapper className="top-40 left-0 text-zinc-100 w-32 h-32 rotate-12">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-20 right-0 text-zinc-100 w-48 h-12 -rotate-12">
        <ZigZag />
      </DoodleWrapper>
      <DoodleWrapper className="top-1/2 right-4 text-zinc-50 w-24 h-24">
        <Sparkle />
      </DoodleWrapper>

      <AnimatePresence>
        {selectedPath && (
          <PathDetail 
            path={selectedPath} 
            onClose={() => setSelectedPath(null)} 
            onStartCourse={onStartCourse}
            onStartLab={onStartLab}
            isEnrolled={enrolledPaths.includes(selectedPath.id)}
            onEnroll={() => handleEnroll(selectedPath.id)}
            completedLabs={completedLabs}
          />
        )}
      </AnimatePresence>
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Star className="w-3 h-3 fill-zinc-600" />
          Interactive Learning
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
          Start Learning with <span className="text-zinc-500">Hands-On Courses</span>
        </h1>
        <p className="text-zinc-500 text-lg">
          Master Linux, DevOps, Cybersecurity & More with Interactive Labs — Learn by Doing!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paths.map((path, index) => (
          <div key={path.id} className="relative">
            <PathCard 
              path={path} 
              onClick={() => setSelectedPath(path)}
              isLocked={index >= 4}
            />
            {enrolledPaths.includes(path.id) && (
              <div className="absolute top-4 right-4 bg-brand-blue text-white p-1 rounded-full shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-24 bg-zinc-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Active Learners</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1,200+</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Interactive Labs</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">98%</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Completion Rate</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>
    </div>
  );
};
