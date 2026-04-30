import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, ArrowUpRight, Cloud, Box, 
  Infinity, Shield, Server, Database,
  Cpu, Globe, Lock, Zap, Activity,
  BarChart3, Network, Brain, HardDrive,
  GitBranch, Terminal, Search, Settings,
  MessageSquare, Layout, Layers, Radio,
  Hexagon, Key, ShieldCheck, Code, Workflow,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onStart: () => void;
  isCompleted?: boolean;
  isLocked?: boolean;
}

const categoryConfig: Record<string, { color: string }> = {
  AWS: { color: 'bg-orange-500' },
  Azure: { color: 'bg-blue-500' },
  GCP: { color: 'bg-red-500' },
  Kubernetes: { color: 'bg-brand-blue' },
  DevOps: { color: 'bg-brand-blue' },
  Security: { color: 'bg-rose-500' },
};

const getProjectIcon = (title: string, category: string) => {
  const t = title.toLowerCase();
  
  // Specific technologies & patterns
  if (t.includes('terraform') || t.includes('ansible') || t.includes('pulumi') || t.includes('cdk') || t.includes('cloudformation') || t.includes('iac')) return Code;
  if (t.includes('prometheus') || t.includes('grafana') || t.includes('monitor') || t.includes('observability') || t.includes('logging') || t.includes('trace')) return Activity;
  if (t.includes('kubernetes') || t.includes('k8s') || t.includes('kubeadm') || t.includes('helm') || t.includes('aks') || t.includes('eks') || t.includes('gke') || t.includes('cluster')) return Hexagon;
  if (t.includes('docker') || t.includes('container') || t.includes('ecs') || t.includes('fargate') || t.includes('aci')) return Box;
  if (t.includes('ci/cd') || t.includes('pipeline') || t.includes('github actions') || t.includes('workflow') || t.includes('automation')) return Infinity;
  if (t.includes('gitops') || t.includes('argocd') || t.includes('flux')) return GitBranch;
  if (t.includes('vault') || t.includes('secret') || t.includes('key vault') || t.includes('kms') || t.includes('encryption')) return Key;
  if (t.includes('security') || t.includes('compliance') || t.includes('audit') || t.includes('shield') || t.includes('prowler') || t.includes('sentinel')) return ShieldCheck;
  if (t.includes('network') || t.includes('vpn') || t.includes('dns') || t.includes('vpc') || t.includes('vnet') || t.includes('bastion') || t.includes('front door')) return Network;
  if (t.includes('serverless') || t.includes('lambda') || t.includes('functions') || t.includes('logic app') || t.includes('event')) return Zap;
  if (t.includes('database') || t.includes('sql') || t.includes('rds') || t.includes('dynamodb') || t.includes('cosmos') || t.includes('bigquery') || t.includes('spanner')) return Database;
  if (t.includes('ai') || t.includes('machine learning') || t.includes('sagemaker') || t.includes('vertex') || t.includes('cognitive')) return Brain;
  if (t.includes('storage') || t.includes('s3') || t.includes('bucket') || t.includes('blob') || t.includes('harddrive')) return HardDrive;
  if (t.includes('api') || t.includes('gateway') || t.includes('endpoint')) return Globe;
  if (t.includes('mesh') || t.includes('istio') || t.includes('envoy') || t.includes('service mesh')) return Layers;
  if (t.includes('iot')) return Radio;
  if (t.includes('compute') || t.includes('ec2') || t.includes('vm') || t.includes('instance')) return Cpu;
  
  // Category fallbacks
  if (category === 'AWS') return Cloud;
  if (category === 'Azure') return Cloud;
  if (category === 'GCP') return Cloud;
  if (category === 'Kubernetes') return Hexagon;
  if (category === 'DevOps') return Infinity;
  if (category === 'Security') return Shield;
  
  return Server;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStart, isCompleted, isLocked }) => {
  const config = categoryConfig[project.category] || { color: 'bg-zinc-500' };
  const Icon = getProjectIcon(project.title, project.category);

  const difficultyColor = {
    Beginner: 'text-brand-blue bg-brand-blue/10',
    Intermediate: 'text-amber-600 bg-amber-50',
    Advanced: 'text-rose-600 bg-rose-50',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={isLocked ? undefined : { y: -8 }}
      onClick={() => { if (!isLocked) onStart(); }}
      className={`group bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-[0_16px_32px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full relative after:absolute after:inset-0 after:rounded-[2.5rem] after:shadow-[inset_0_-1px_1px_rgba(255,255,255,0.6),inset_0_-4px_0_0_rgba(0,0,0,0.02)] ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.18)] hover:border-zinc-200 hover:after:shadow-[inset_0_-1px_1px_rgba(255,255,255,0.6),inset_0_-8px_0_0_rgba(0,0,0,0.04)]'}`}
    >
      {isLocked && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-zinc-100 pointer-events-none">
          <Lock className="w-2.5 h-2.5 text-zinc-400" />
          <span className="text-[9px] font-semibold text-zinc-400 tracking-wide">Coming soon</span>
        </div>
      )}
      {/* Bottom Depth Layer */}
      <div className="absolute bottom-0 left-6 right-6 h-2 bg-zinc-100/50 rounded-b-[2.5rem] -mb-1 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className={`relative aspect-[16/10] ${config.color} flex items-center justify-center overflow-hidden`}>
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-white shadow-2xl border border-white/20"
        >
          <Icon className="w-12 h-12" />
        </motion.div>

        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/40 bg-white/20 text-white backdrop-blur-md shadow-sm">
            {project.difficulty}
          </span>
          {isCompleted && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-1.5 bg-emerald-500 text-white rounded-full shadow-lg border border-emerald-400/50"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-6 right-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 flex flex-col gap-2 items-end">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); onStart(); }}
            className="bg-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:bg-brand-blue hover:text-white transition-all cursor-pointer w-full justify-center"
          >
            Start Lab
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${difficultyColor[project.difficulty]}`}>
            {project.difficulty}
          </span>
          <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{project.category}</span>
          <div className="w-1 h-1 rounded-full bg-zinc-200"></div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{project.duration}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-brand-blue transition-colors leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
