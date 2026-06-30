import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CategoryFilter } from './CategoryFilter';
import { Rocket, Search } from 'lucide-react';
import { SquigglyArrow, ZigZag, DoodleWrapper, Sparkle, HandCircle } from './Doodles';

interface ProjectGridProps {
  onStartLab: (id: string, title: string) => void;
  completedLabs: string[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onStartLab, completedLabs }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = Array.from(new Set(projects.map(p => p.category)));

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Doodles */}
      <DoodleWrapper className="-top-10 -left-12 text-cyan-500/50 w-40 h-40 -rotate-12">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="top-1/2 -right-16 text-indigo-500/50 w-56 h-16 rotate-12">
        <ZigZag />
      </DoodleWrapper>
      <DoodleWrapper className="-bottom-10 left-1/4 text-emerald-500/50 w-32 h-32 rotate-45">
        <SquigglyArrow />
      </DoodleWrapper>

      <div className="mb-20 text-center max-w-3xl mx-auto relative z-10">
        <DoodleWrapper className="-top-8 -right-12 text-amber-500/80 w-12 h-12 rotate-12 animate-pulse">
          <Sparkle />
        </DoodleWrapper>
        <DoodleWrapper className="-top-12 left-10 text-purple-500/70 w-16 h-16 -rotate-45">
          <HandCircle />
        </DoodleWrapper>
        <DoodleWrapper className="bottom-0 -left-16 text-cyan-400/50 w-16 h-16 rotate-90">
          <SquigglyArrow />
        </DoodleWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-zinc-900 shadow-sm hover:scale-105 transition-all"
        >
          <Rocket className="w-3 h-3 text-cyan-400 animate-pulse" />
          Hands-on Practice
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8 tracking-tight leading-tight">
          Master Cloud, DevOps & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono font-medium tracking-tight">Data Technologies</span> with <br />
          Real-World Projects
        </h1>
        <p className="text-zinc-500 text-base max-w-2xl mx-auto leading-relaxed">
          Deploy production-grade infrastructure and applications. Filter by technology stack to find your next challenge.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-10 bg-zinc-50 p-2 rounded-full border border-zinc-200 relative z-10">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs text-zinc-800 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-zinc-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block h-5 w-px bg-zinc-250"></div>
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isCompleted={completedLabs.includes(project.id)}
            isLocked={false}
            onStart={() => onStartLab(project.id, project.title)} 
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-24">
          <p className="text-zinc-500 text-lg">No projects found in this category.</p>
        </div>
      )}

    </section>
  );
};
