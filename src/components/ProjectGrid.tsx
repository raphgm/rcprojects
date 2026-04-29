import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CategoryFilter } from './CategoryFilter';
import { Rocket, Search } from 'lucide-react';
import { SquigglyArrow, ZigZag, DoodleWrapper } from './Doodles';

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
      <DoodleWrapper className="-top-10 left-0 text-zinc-200 w-32 h-32 -rotate-12">
        <SquigglyArrow />
      </DoodleWrapper>
      <DoodleWrapper className="top-1/2 -right-10 text-zinc-100 w-48 h-12 rotate-90">
        <ZigZag />
      </DoodleWrapper>
      <DoodleWrapper className="bottom-0 left-1/4 text-zinc-100 w-24 h-24 rotate-45">
        <SquigglyArrow />
      </DoodleWrapper>

      <div className="mb-20 text-center max-w-3xl mx-auto relative">
        <DoodleWrapper className="-top-4 -right-8 text-indigo-500/20 w-16 h-16 rotate-12">
          <ZigZag />
        </DoodleWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-zinc-200"
        >
          <Rocket className="w-3 h-3 text-zinc-600" />
          Hands-on Practice
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-8 tracking-tight leading-[0.95]">
          Master Cloud with <br />
          <span className="text-zinc-400 font-mono font-medium tracking-tight">Real-World</span> Projects
        </h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto leading-relaxed">
          Deploy production-grade infrastructure and applications. Filter by technology stack to find your next challenge.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 bg-zinc-50 p-8 rounded-[2.5rem] border border-zinc-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search projects, tools, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="hidden sm:block h-8 w-px bg-zinc-200"></div>
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isCompleted={completedLabs.includes(project.id)}
              isLocked={index >= 4}
              onStart={() => onStartLab(project.id, project.title)} 
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-24">
          <p className="text-zinc-500 text-lg">No projects found in this category.</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-24 bg-zinc-900 rounded-[2.5rem] p-12 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Guided Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Azure Labs</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-zinc-400 uppercase tracking-widest text-xs font-bold">Expert Support</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      </div>
    </section>
  );
};
