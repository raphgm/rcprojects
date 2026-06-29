import React from 'react';
import { motion } from 'motion/react';
import {
  Clock, ArrowUpRight, Cloud, Box,
  Infinity, Shield, Server, Database,
  Cpu, Globe, Lock, Zap, Activity,
  Network, Brain, HardDrive,
  GitBranch, Layers, Radio,
  Hexagon, Key, ShieldCheck, Code,
  CheckCircle2, Sparkles, Check, Play, Hash
} from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onStart: () => void;
  isCompleted?: boolean;
  isLocked?: boolean;
}

const getProjectIcon = (title: string, category: string) => {
  const t = title.toLowerCase();
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
  if (category === 'AWS') return Cloud;
  if (category === 'Azure') return Cloud;
  if (category === 'GCP') return Cloud;
  if (category === 'Kubernetes') return Hexagon;
  if (category === 'DevOps') return Infinity;
  if (category === 'Security') return Shield;
  return Server;
};

const difficultyConfig = {
  Beginner: { label: 'Beginner', text: 'text-emerald-500', bg: 'bg-emerald-50' },
  Intermediate: { label: 'Intermediate', text: 'text-blue-500', bg: 'bg-blue-50' },
  Advanced: { label: 'Advanced', text: 'text-purple-500', bg: 'bg-purple-50' },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onStart, isCompleted, isLocked }) => {
  const Icon = getProjectIcon(project.title, project.category);
  const diff = difficultyConfig[project.difficulty];
  const missionsCount = project.duration.includes('1') ? 5 : (project.duration.includes('2') ? 6 : 10);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={isLocked ? {} : { y: -4, transition: { duration: 0.2 } }}
      onClick={() => { if (!isLocked) onStart(); }}
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full relative transition-all shadow-sm ${isLocked ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-md'}`}
    >
      {/* Top Header Section */}
      <div className="relative h-[170px] bg-[#283593] flex items-center justify-center shrink-0">
        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
        
        {/* Missions Badge (Bottom Left) */}
        <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-wider">
          {missionsCount} missions
        </div>

        {/* Free Badge (Top Right) */}
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-widest">
          <Check className="w-3 h-3 stroke-[3]" />
          Free
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 bg-white">
        {/* Pills */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${diff.bg} ${diff.text}`}>
            {diff.label}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {project.category} ENGINEER
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-4 flex-1">
          <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
            🚀 {project.description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-1.5 tracking-widest">
            <span>PROGRESS</span>
            <span>0/{missionsCount}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] w-0" />
          </div>
        </div>

        {/* Start Lab Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onStart(); }}
          disabled={isLocked}
          className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            isLocked 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              Locked
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Start Lab
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

