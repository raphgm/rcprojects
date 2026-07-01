import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { CategoryFilter } from './CategoryFilter';
import { ArrowUpRight, Gauge, Rocket, Search, ShieldCheck } from 'lucide-react';
import { SquigglyArrow, ZigZag, DoodleWrapper, Sparkle, HandCircle } from './Doodles';

interface ProjectGridProps {
  onStartLab: (id: string, title: string) => void;
  completedLabs: string[];
}

const devopsQuests = [
  {
    projectId: '5',
    title: 'Ship the Broken Frontend',
    prompt: 'A release branch is stuck with no repeatable build. Create the CI workflow, preserve artifacts, then containerize the app for handoff.',
    signal: 'CI/CD',
    pressure: 'Release window closes in 2h'
  },
  {
    projectId: '83',
    title: 'Rescue the Jenkins Controller',
    prompt: 'The controller is doing everything itself. Move the team toward pipeline-as-code, credentials hygiene, agent capacity, and archived outputs.',
    signal: 'Jenkins',
    pressure: 'Build queue is backing up'
  },
  {
    projectId: '84',
    title: 'Stop Configuration Drift',
    prompt: 'Three web nodes no longer match. Use inventory, playbooks, variables, loops, and roles to make the fleet reproducible again.',
    signal: 'Ansible',
    pressure: 'Patch audit starts tomorrow'
  },
  {
    projectId: '10',
    title: 'Turn Deploys into GitOps',
    prompt: 'Manual kubectl changes keep slipping through. Put delivery behind ArgoCD so the cluster follows the repo, not hallway instructions.',
    signal: 'ArgoCD',
    pressure: 'Prod drift detected'
  },
  {
    projectId: '87',
    title: 'Stabilize the Container Fleet',
    prompt: 'A microservice rollout needs orchestration without a managed cluster. Build a Swarm path with availability, services, and failover checks.',
    signal: 'Docker',
    pressure: 'One node is overloaded'
  },
  {
    projectId: '101',
    title: 'Recover the Cluster Source of Truth',
    prompt: 'A Kubernetes environment has changed by hand. Rebuild the deployment loop with FluxCD and force state back through Git.',
    signal: 'FluxCD',
    pressure: 'Audit wants commit history'
  },
  {
    projectId: '102',
    title: 'Package the App for Repeat Deploys',
    prompt: 'The same manifests are copied between environments. Create a Helm packaging workflow that gives teams one deployable unit.',
    signal: 'Helm',
    pressure: 'Staging and prod diverged'
  },
  {
    projectId: '105',
    title: 'Build Images Without Docker Access',
    prompt: 'The CI runner cannot use a Docker daemon. Move the image build into a daemonless path and keep the pipeline moving.',
    signal: 'Kaniko',
    pressure: 'Runner permissions locked down'
  },
  {
    projectId: '107',
    title: 'Page Before Users Notice',
    prompt: 'Service health is invisible until customers complain. Add Prometheus metrics and alerting so incidents surface early.',
    signal: 'Prometheus',
    pressure: 'Latency spike underway'
  },
  {
    projectId: '109',
    title: 'Find the Failure in the Logs',
    prompt: 'Errors are scattered across hosts. Centralize logs with an ELK workflow so responders can search the blast radius fast.',
    signal: 'ELK',
    pressure: 'Incident bridge is live'
  }
];

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onStartLab, completedLabs }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestId, setSelectedQuestId] = useState(devopsQuests[0].projectId);
  
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const selectedQuest = devopsQuests.find(quest => quest.projectId === selectedQuestId) || devopsQuests[0];
  const selectedQuestProject = projects.find(project => project.id === selectedQuest.projectId);

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

      <div className="mb-12 rounded-[2rem] border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm relative z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400" />
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-6 lg:gap-8 items-stretch">
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-zinc-950 p-6 text-white min-h-[300px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200 border border-white/10">
                <Gauge className="w-3.5 h-3.5" />
                DevOps Quest Stack
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl font-black tracking-tight leading-none">
                Choose the outage, then fix the system.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Ten scenario-driven quests built from labs already in the catalog. Pick a card to jump into the matching hands-on lab.
              </p>
            </div>
            <button
              type="button"
              onClick={() => selectedQuestProject && onStartLab(selectedQuestProject.id, selectedQuestProject.title)}
              disabled={!selectedQuestProject}
              className="w-full sm:w-fit inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-zinc-950 hover:bg-cyan-100 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Selected Quest
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative min-h-[340px] lg:min-h-[360px]">
            <div className="absolute left-4 right-4 top-5 h-[300px] rounded-3xl bg-zinc-100 border border-zinc-200 rotate-[-2deg]" />
            <div className="absolute left-8 right-2 top-10 h-[300px] rounded-3xl bg-blue-50 border border-blue-100 rotate-[2deg]" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {devopsQuests.map((quest, index) => {
                const project = projects.find(item => item.id === quest.projectId);
                const isSelected = quest.projectId === selectedQuestId;
                const isCompleted = completedLabs.includes(quest.projectId);

                return (
                  <motion.button
                    type="button"
                    key={quest.projectId}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                    onClick={() => setSelectedQuestId(quest.projectId)}
                    onDoubleClick={() => project && onStartLab(project.id, project.title)}
                    className={`text-left rounded-2xl border p-4 min-h-[168px] flex flex-col justify-between transition-all shadow-sm ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xl shadow-zinc-900/15 scale-[1.01]'
                        : 'bg-white text-zinc-900 border-zinc-200 hover:border-blue-300 hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${isSelected ? 'bg-cyan-400 text-zinc-950' : 'bg-cyan-50 text-cyan-700'}`}>
                          {quest.signal}
                        </span>
                        {isCompleted && <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                      <h3 className="text-base font-black leading-tight">{quest.title}</h3>
                      <p className={`mt-2 text-xs leading-5 line-clamp-3 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        {quest.prompt}
                      </p>
                    </div>
                    <div className={`mt-4 text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-cyan-200' : 'text-zinc-400'}`}>
                      {quest.pressure}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
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
