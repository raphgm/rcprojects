import React from 'react';
import { motion } from 'motion/react';
import {
  Clock, ArrowUpRight, Cloud, Box,
  Infinity, Shield, Server, Database,
  Cpu, Globe, Lock, Zap, Activity,
  Network, Brain, HardDrive,
  GitBranch, Layers, Radio,
  Hexagon, Key, ShieldCheck, Code,
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

const difficultyConfig = {
  Beginner: { label: 'Beginner', dot: 'bg-emerald-400', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  Intermediate: { label: 'Intermediate', dot: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50' },
  Advanced: { label: 'Advanced', dot: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStart, isCompleted, isLocked }) => {
  const config = categoryConfig[project.category] || { color: 'bg-zinc-500' };
  const Icon = getProjectIcon(project.title, project.category);
  const diff = difficultyConfig[project.difficulty];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={isLocked ? undefined : { y: -6, transition: { duration: 0.2 } }}
      onClick={() => { if (!isLocked) onStart(); }}
      className={`group bg-white border border-zinc-100 rounded-3xl overflow-hidden flex flex-col h-full relative transition-shadow duration-300 ${isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.14)] hover:border-zinc-200'}`}
    >
      {/* Cute lock badge */}
      {isLocked && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-zinc-100 pointer-events-none">
          <Lock className="w-2.5 h-2.5 text-zinc-400" />
          <span className="text-[9px] font-semibold text-zinc-400 tracking-wide">Coming soon</span>
        </div>
      )}

      {/* Coloured header band with icon */}
      <div className={`relative h-36 ${config.color} flex items-center justify-center overflow-hidden shrink-0`}>
        {/* Soft noise texture */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        {/* Glow blob */}
        <div className="absolute w-32 h-32 rounded-full bg-white/20 blur-2xl" />

        <motion.div
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="relative z-10 w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/25 shadow-lg"
        >
          <Icon className="w-8 h-8" />
        </motion.div>

        {/* Completed checkmark */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 p-1 bg-emerald-500 rounded-full shadow-md border border-emerald-400/60"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </motion.div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${diff.bg} ${diff.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
            {diff.label}
          </span>
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{project.category}</span>
          <span className="ml-auto flex items-center gap-1 text-zinc-400">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-semibold">{project.duration}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-zinc-900 leading-snug group-hover:text-brand-blue transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tags + CTA */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-50">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-400 uppercase tracking-wide">
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="px-2 py-0.5 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-400 uppercase tracking-wide">
                +{project.tags.length - 2}
              </span>
            )}
          </div>
          {!isLocked && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onStart(); }}
              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wide hover:bg-brand-blue transition-colors shadow-sm"
            >
              Start
              <ArrowUpRight className="w-3 h-3" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
