import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft, Check, Share2,
  Terminal as TerminalIcon, Play,
  BookOpen, Target, Lightbulb,
  MessageSquare, ThumbsUp, Send,
  ChevronDown, Monitor, Shield, Copy
} from 'lucide-react';
import { LabContent, LabStep } from '../types/content';
import { Terminal } from './Terminal';
import { ExcelGrid } from './ExcelGrid';
import { SapSandbox } from './SapSandbox';
import { PowerBiSandbox } from './PowerBiSandbox';
import { EspSandbox } from './EspSandbox';
import { SquigglyArrow, Sparkle, DoodleWrapper } from './Doodles';
import { projects } from '../data/projects';
import { conceptDictionary } from '../data/conceptDictionary';
import Markdown from 'react-markdown';

const getOSCommand = (cmd: string, os: 'macos' | 'windows' | 'linux'): string => {
  if (os === 'linux') return cmd;
  
  // Normalize apt-get to apt first to simplify matching
  let normalized = cmd.replace(/apt-get/g, 'apt');

  if (os === 'macos') {
    let newCmd = normalized;
    // Replace apt update
    newCmd = newCmd.replace(/sudo\s+apt\s+update/g, 'brew update');
    // Replace apt install (e.g. sudo apt install -y pkg, sudo apt install pkg -y, sudo apt install pkg)
    newCmd = newCmd.replace(/sudo\s+apt\s+install\s+(-y\s+)?([a-zA-Z0-9\-\s]+)(\s+-y)?/g, 'brew install $2');
    
    // Replace systemctl start/restart
    newCmd = newCmd.replace(/sudo\s+systemctl\s+start\s+(\w+)/g, 'brew services start $1');
    newCmd = newCmd.replace(/sudo\s+systemctl\s+restart\s+(\w+)/g, 'brew services restart $1');
    newCmd = newCmd.replace(/systemctl\s+is-active\s+(\w+)/g, 'brew services list | grep $1');
    return newCmd;
  }
  
  if (os === 'windows') {
    let newCmd = normalized;
    // Strip leading and inner sudo
    newCmd = newCmd.replace(/^sudo\s+/, '');
    newCmd = newCmd.replace(/\s+sudo\s+/g, ' ');
    
    // Replace apt update
    newCmd = newCmd.replace(/apt\s+update/g, 'winget upgrade');
    // Replace apt install
    newCmd = newCmd.replace(/apt\s+install\s+(-y\s+)?([a-zA-Z0-9\-\s]+)(\s+-y)?/g, 'winget install $2');
    
    // Replace systemctl start/restart/status
    newCmd = newCmd.replace(/systemctl\s+start\s+(\w+)/g, 'Start-Service $1');
    newCmd = newCmd.replace(/systemctl\s+restart\s+(\w+)/g, 'Restart-Service $1');
    newCmd = newCmd.replace(/systemctl\s+is-active\s+(\w+)/g, 'Get-Service $1');
    
    // Common basic commands
    if (newCmd.startsWith('ls -la')) {
      newCmd = newCmd.replace('ls -la', 'Get-ChildItem -Force');
    } else if (newCmd.startsWith('ls')) {
      newCmd = newCmd.replace('ls', 'Get-ChildItem');
    } else if (newCmd.startsWith('pwd')) {
      newCmd = 'Get-Location';
    } else if (newCmd.startsWith('cat ')) {
      newCmd = newCmd.replace(/^cat\s+/, 'Get-Content ');
    } else if (newCmd.includes('| tee')) {
      newCmd = newCmd.replace(/echo\s+(["'].*?["'])\s*\|\s*tee\s+(.*)/g, '$1 | Out-File -FilePath $2');
      newCmd = newCmd.replace(/echo\s+(["'].*?["'])\s*\|\s*sudo\s+tee\s+(.*)/g, '$1 | Out-File -FilePath $2');
    } else if (newCmd.startsWith('curl ')) {
      newCmd = newCmd.replace(/curl\s+-s\s+(.*)/g, 'Invoke-WebRequest -Uri http://$1 -UseBasicParsing');
      newCmd = newCmd.replace(/curl\s+(.*)/g, 'Invoke-WebRequest -Uri $1');
    }
    return newCmd;
  }
  return cmd;
};

const getCommandBreakdown = (cmd: string): { term: string; explanation: string }[] => {
  const breakdown: { term: string; explanation: string }[] = [];
  const cleanCmd = (cmd || '').trim();

  if (cleanCmd.includes('echo') && cleanCmd.includes('>>')) {
    breakdown.push({
      term: "echo '...'",
      explanation: "Prints the specified string/text to the standard output."
    });
    breakdown.push({
      term: ">>",
      explanation: "Appends the output to the end of the target file instead of displaying it on the screen."
    });
  } else if (cleanCmd.includes('echo') && cleanCmd.includes('>')) {
    breakdown.push({
      term: "echo '...'",
      explanation: "Prints the specified string/text to the standard output."
    });
    breakdown.push({
      term: ">",
      explanation: "Redirects the output, overwriting the target file's content entirely."
    });
  }

  if (cleanCmd.includes('tar ')) {
    breakdown.push({
      term: "tar",
      explanation: "Tape Archive utility: bundles multiple files or directories into a single archive file."
    });
    if (cleanCmd.includes('-c') || cleanCmd.includes(' c')) {
      breakdown.push({
        term: "-c",
        explanation: "Tells tar to CREATE a new archive."
      });
    }
    if (cleanCmd.includes('-z') || cleanCmd.includes(' z')) {
      breakdown.push({
        term: "-z",
        explanation: "Compresses the archive file using gzip compression to save space."
      });
    }
    if (cleanCmd.includes('-f') || cleanCmd.includes(' f')) {
      breakdown.push({
        term: "-f",
        explanation: "Specifies the filename of the archive file to create."
      });
    }
    if (cleanCmd.includes('/etc')) {
      breakdown.push({
        term: "/etc",
        explanation: "The target system folder containing system-wide configuration files to backup."
      });
    }
  }

  if (cleanCmd.includes('date +%F') || cleanCmd.includes('$(date +%F)')) {
    breakdown.push({
      term: "$(date +%F)",
      explanation: "Command substitution: runs 'date +%F' which prints the current date in YYYY-MM-DD format and embeds it dynamically into the filename."
    });
  }

  if (cleanCmd.includes('crontab')) {
    breakdown.push({
      term: "crontab -l",
      explanation: "Lists the active cron jobs for the current user."
    });
    breakdown.push({
      term: "| crontab -",
      explanation: "Pipes the text output into crontab to install/update the crontab configuration."
    });
    breakdown.push({
      term: "0 0 * * *",
      explanation: "Cron schedule expression: runs the command daily at exactly midnight (00:00)."
    });
  }

  if (cleanCmd.includes('kubectl')) {
    breakdown.push({
      term: "kubectl",
      explanation: "The official command-line tool for controlling Kubernetes clusters."
    });
    if (cleanCmd.includes('create namespace') || cleanCmd.includes('create ns')) {
      breakdown.push({
        term: "create namespace",
        explanation: "Creates a new virtual boundary/workspace inside the cluster to isolate resources."
      });
    }
    if (cleanCmd.includes('apply -f') || cleanCmd.includes('apply')) {
      breakdown.push({
        term: "apply -f",
        explanation: "Deploys or updates resources defined in a local or remote YAML manifest configuration file."
      });
    }
    if (cleanCmd.includes('get nodes')) {
      breakdown.push({
        term: "get nodes",
        explanation: "Queries the cluster control plane to list all active worker and master nodes."
      });
    }
    if (cleanCmd.includes('cluster-info')) {
      breakdown.push({
        term: "cluster-info",
        explanation: "Displays connection endpoints and status information for master and core services."
      });
    }
  }

  if (cleanCmd.includes('swapoff')) {
    breakdown.push({
      term: "swapoff -a",
      explanation: "Disables all swap paging/virtual memory space instantly to satisfy Kubernetes cluster installation prerequisites."
    });
  }

  if (cleanCmd.includes('sed ')) {
    breakdown.push({
      term: "sed",
      explanation: "Stream Editor: used to search, find, replace, or edit text in files programmatically."
    });
    if (cleanCmd.includes('-i')) {
      breakdown.push({
        term: "-i",
        explanation: "In-place: saves the modified changes directly back to the original file."
      });
    }
    if (cleanCmd.includes('/etc/fstab')) {
      breakdown.push({
        term: "/etc/fstab",
        explanation: "File System Table: system file that controls static disk partition mount settings."
      });
    }
    if (cleanCmd.includes('/ swap /')) {
      breakdown.push({
        term: '"/ swap / ..."',
        explanation: "Finds the line containing 'swap' and comments it out by adding a hash (#) prefix, preventing it from mounting on system boot."
      });
    }
  }

  if (cleanCmd.includes('mkdir -p')) {
    breakdown.push({
      term: "mkdir -p",
      explanation: "Creates directories recursively, ensuring parent directories are created if they do not exist."
    });
  }

  if (cleanCmd.includes('sudo cp -i')) {
    breakdown.push({
      term: "sudo",
      explanation: "Superuser Do: Executes the command with administrator (root) privileges."
    });
    breakdown.push({
      term: "cp -i",
      explanation: "Copies files or directories, prompting before overwriting any existing files."
    });
  }

  if (cleanCmd.includes('chown')) {
    breakdown.push({
      term: "chown",
      explanation: "Changes the owner and/or group ownership of files and directories."
    });
    breakdown.push({
      term: "$(id -u):$(id -g)",
      explanation: "Dynamically gets the current user's numeric User ID and Group ID to apply permissions."
    });
  }

  if (cleanCmd.includes('docker ')) {
    breakdown.push({
      term: "docker",
      explanation: "Docker containerisation engine command line interface."
    });
    if (cleanCmd.includes('run')) {
      breakdown.push({
        term: "run",
        explanation: "Creates and starts a new container instance from a Docker image."
      });
    }
    if (cleanCmd.includes('-d')) {
      breakdown.push({
        term: "-d",
        explanation: "Detached mode: runs the container in the background, leaving the terminal free."
      });
    }
    if (cleanCmd.includes('-p ')) {
      breakdown.push({
        term: "-p",
        explanation: "Port forwarding: maps a port on the host machine to a port inside the container."
      });
    }
    if (cleanCmd.includes('build')) {
      breakdown.push({
        term: "build",
        explanation: "Builds a Docker image from a local Dockerfile configuration."
      });
    }
    if (cleanCmd.includes('-t ')) {
      breakdown.push({
        term: "-t",
        explanation: "Tag: specifies a name and optional tag version for the built image."
      });
    }
  }

  if (cleanCmd.includes('curl ')) {
    breakdown.push({
      term: "curl",
      explanation: "Client URL: utility for transferring data to/from a network server using protocols like HTTP."
    });
    if (cleanCmd.includes('-I') || cleanCmd.includes('-i')) {
      breakdown.push({
        term: "-I / -i",
        explanation: "Fetches and displays HTTP header response information from the server."
      });
    }
  }

  if (cleanCmd.includes('&&')) {
    breakdown.push({
      term: "&&",
      explanation: "Logical AND operator: executes the second command only if the first command succeeds."
    });
  }

  return breakdown;
};

interface LabViewProps {
  lab: LabContent;
  onClose: () => void;
  onComplete: (xp?: number) => void;
  projectTitle: string;
  currentXp?: number;
}

const RANKS = [
  { min: 0,     title: 'Trainee',               icon: '🎓' },
  { min: 250,   title: 'Cloud Apprentice',       icon: '🌱' },
  { min: 750,   title: 'Cloud Engineer I',       icon: '⚡' },
  { min: 1500,  title: 'Cloud Engineer II',      icon: '🔧' },
  { min: 3000,  title: 'Senior Cloud Engineer',  icon: '🚀' },
  { min: 5000,  title: 'Cloud Architect',        icon: '🏛️' },
  { min: 8000,  title: 'Principal Engineer',     icon: '💎' },
  { min: 12000, title: 'Distinguished Engineer', icon: '👑' },
];
const getRank = (xp: number) => [...RANKS].reverse().find(r => xp >= r.min) ?? RANKS[0];

const PARTICLES = [
  { x: 25, y: 20, color: '#3B82F6', dy: -70 },
  { x: 45, y: 15, color: '#F59E0B', dy: -90 },
  { x: 65, y: 22, color: '#10B981', dy: -65 },
  { x: 80, y: 18, color: '#EF4444', dy: -80 },
  { x: 15, y: 30, color: '#8B5CF6', dy: -60 },
  { x: 35, y: 25, color: '#F59E0B', dy: -75 },
  { x: 55, y: 12, color: '#3B82F6', dy: -85 },
  { x: 75, y: 28, color: '#10B981', dy: -70 },
  { x: 20, y: 35, color: '#EF4444', dy: -55 },
  { x: 50, y: 10, color: '#8B5CF6', dy: -95 },
  { x: 70, y: 32, color: '#3B82F6', dy: -62 },
  { x: 88, y: 25, color: '#F59E0B', dy: -78 },
];

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  tag: 'tip' | 'issue' | 'recommendation' | 'general';
  likes: number;
  liked: boolean;
  timestamp: string;
}

const SEED_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Amara O.', avatar: 'https://picsum.photos/seed/amara/40/40', text: 'Make sure your kubectl context is set correctly before starting — cost me 20 min debugging!', tag: 'tip', likes: 14, liked: false, timestamp: '2 days ago' },
  { id: 'c2', author: 'Jonas K.', avatar: 'https://picsum.photos/seed/jonas/40/40', text: 'Step 3 is a bit tricky if you\'re on an ARM machine. Use the amd64 binary explicitly.', tag: 'recommendation', likes: 9, liked: false, timestamp: '5 days ago' },
];

const TAG_STYLES: Record<Comment['tag'], string> = {
  tip:            'bg-amber-50 text-amber-600 border-amber-100',
  issue:          'bg-rose-50 text-rose-600 border-rose-100',
  recommendation: 'bg-blue-50 text-blue-600 border-blue-100',
  general:        'bg-zinc-50 text-zinc-500 border-zinc-100',
};

const QUEST_THEMES: Record<string, {
  label: string;
  callsign: string;
  briefing: string;
  winCondition: string;
  icon: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  headerBg: string;
}> = {
  '5': { label: 'DevOps Quest', callsign: 'Pipeline Fire Drill', briefing: 'Release traffic is backing up. Restore the CI/CD path before the deploy window closes.', winCondition: 'Ship a repeatable GitHub Actions workflow and prove the build path is green.', icon: '🚦', accentText: 'text-cyan-300', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_34%),linear-gradient(135deg,#06111f,#101935)]' },
  '83': { label: 'DevOps Quest', callsign: 'Jenkins War Room', briefing: 'The controller is waiting for pipeline-as-code discipline. Turn the release room from manual clicks into versioned automation.', winCondition: 'Author the Jenkins pipeline flow and validate agent-ready delivery.', icon: '🧩', accentText: 'text-amber-300', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_34%),linear-gradient(135deg,#1c1206,#101935)]' },
  '84': { label: 'DevOps Quest', callsign: 'Config Drift Hunt', briefing: 'The fleet is drifting. Bring every web node back under declarative control before small differences become outages.', winCondition: 'Apply Ansible configuration management and verify consistent service state.', icon: '🛰️', accentText: 'text-emerald-300', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,#061a14,#101935)]' },
  '1': { label: 'DevOps Quest', callsign: 'Harden The Edge', briefing: 'Public traffic is touching an exposed web tier. Lock down the service before it becomes the easiest target in the stack.', winCondition: 'Stand up the Linux web server and apply the required security posture.', icon: '🛡️', accentText: 'text-rose-300', accentBg: 'bg-rose-500/10', accentBorder: 'border-rose-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.22),transparent_34%),linear-gradient(135deg,#220914,#101935)]' },
  '4': { label: 'DevOps Quest', callsign: 'Backup Blackout', briefing: 'The restore path is untrusted. Build the automation that turns backup panic into operational muscle memory.', winCondition: 'Create the backup workflow and prove the routine can be repeated safely.', icon: '💾', accentText: 'text-purple-300', accentBg: 'bg-purple-500/10', accentBorder: 'border-purple-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.22),transparent_34%),linear-gradient(135deg,#170b25,#101935)]' },
  '10': { label: 'DevOps Quest', callsign: 'GitOps Takeover', briefing: 'The cluster should obey Git, not shell history. Move desired state into a controller-driven deployment loop.', winCondition: 'Connect GitOps workflow controls and verify the target state converges.', icon: '🔁', accentText: 'text-cyan-300', accentBg: 'bg-cyan-500/10', accentBorder: 'border-cyan-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_34%),linear-gradient(135deg,#06111f,#101935)]' },
  'docker-swarm-cluster': { label: 'DevOps Quest', callsign: 'Swarm Surge', briefing: 'Traffic is about to spike. Give container services a resilient swarm before one host becomes the bottleneck.', winCondition: 'Build the swarm path and validate service resilience.', icon: '🌐', accentText: 'text-emerald-300', accentBg: 'bg-emerald-500/10', accentBorder: 'border-emerald-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,#061a14,#101935)]' },
  'gitlab-ci-node': { label: 'DevOps Quest', callsign: 'Merge Train Express', briefing: 'Node builds need fast feedback before broken commits pile up. Wire the delivery lane and keep the train moving.', winCondition: 'Build the GitLab CI path and validate the Node delivery flow.', icon: '🚄', accentText: 'text-amber-300', accentBg: 'bg-amber-500/10', accentBorder: 'border-amber-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.24),transparent_34%),linear-gradient(135deg,#1c1206,#101935)]' },
  'sonarqube-quality': { label: 'DevOps Quest', callsign: 'Quality Gate Lockdown', briefing: 'Risky code is slipping through the pipeline. Put a quality gate in front of production.', winCondition: 'Configure the scan path and confirm the gate can block bad releases.', icon: '🔎', accentText: 'text-rose-300', accentBg: 'bg-rose-500/10', accentBorder: 'border-rose-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.22),transparent_34%),linear-gradient(135deg,#220914,#101935)]' },
  'grafana-dashboards': { label: 'DevOps Quest', callsign: 'Dashboard Command Post', briefing: 'The system is talking, but nobody can see the signal. Turn raw telemetry into an operating picture.', winCondition: 'Launch the dashboard path and surface useful infrastructure metrics.', icon: '📊', accentText: 'text-purple-300', accentBg: 'bg-purple-500/10', accentBorder: 'border-purple-400/30', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.22),transparent_34%),linear-gradient(135deg,#170b25,#101935)]' },
  'excel-fundamentals': { label: 'Excel Quest', callsign: 'Spreadsheet Launchpad', briefing: 'The analytics team needs trustworthy workbook basics before dashboards can depend on the numbers.', winCondition: 'Enter the required values, formulas, and ranges to prove the workbook can calculate cleanly.', icon: '📗', accentText: 'text-emerald-700', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(16,124,65,0.25),transparent_34%),linear-gradient(135deg,#06351f,#101935)]' },
  'excel-formatting': { label: 'Excel Quest', callsign: 'Executive Report Polish', briefing: 'The numbers are present, but the report is hard to read. Give the workbook structure, emphasis, and visual hierarchy.', winCondition: 'Apply the required formats so the report can be scanned under pressure.', icon: '🧾', accentText: 'text-cyan-700', accentBg: 'bg-cyan-50', accentBorder: 'border-cyan-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_34%),linear-gradient(135deg,#06313a,#101935)]' },
  'excel-basic-formulas': { label: 'Excel Quest', callsign: 'Formula Control Room', briefing: 'Manual math is dragging the operation. Replace repeated calculations with reliable formulas.', winCondition: 'Build formula references that recalculate instead of relying on static values.', icon: '🧮', accentText: 'text-amber-700', accentBg: 'bg-amber-50', accentBorder: 'border-amber-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_34%),linear-gradient(135deg,#3a2506,#101935)]' },
  'excel-essential-functions': { label: 'Excel Quest', callsign: 'Function Arsenal', briefing: 'The workbook needs real decision logic. Bring aggregate, text, date, and conditional functions online.', winCondition: 'Complete the function suite and unlock a more capable analysis workbook.', icon: '⚙️', accentText: 'text-purple-700', accentBg: 'bg-purple-50', accentBorder: 'border-purple-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.22),transparent_34%),linear-gradient(135deg,#24103f,#101935)]' },
  'pbi-intro': { label: 'Power BI Quest', callsign: 'BI Command Briefing', briefing: 'Leadership needs a shared report, not another spreadsheet attachment. Stand up the first BI publishing path.', winCondition: 'Connect the Power BI workspace flow and publish the first usable report.', icon: '📈', accentText: 'text-cyan-700', accentBg: 'bg-cyan-50', accentBorder: 'border-cyan-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(242,200,17,0.24),transparent_34%),linear-gradient(135deg,#342a05,#101935)]' },
  'pbi-getdata': { label: 'Power BI Quest', callsign: 'Connector Scramble', briefing: 'Data is scattered across sources. Bring ingestion under control before stale inputs corrupt the dashboard.', winCondition: 'Connect, refresh, and resolve the target source path.', icon: '🔌', accentText: 'text-emerald-700', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,#07301e,#101935)]' },
  'pbi-modeling': { label: 'Power BI Quest', callsign: 'Star Schema Forge', briefing: 'The semantic model is the battlefield map. Shape facts and dimensions before measures become unreliable.', winCondition: 'Define the relationship model that gives reports trustworthy filter behavior.', icon: '🧱', accentText: 'text-amber-700', accentBg: 'bg-amber-50', accentBorder: 'border-amber-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_34%),linear-gradient(135deg,#3a2506,#101935)]' },
  'pbi-dax-fund': { label: 'Power BI Quest', callsign: 'KPI Engine Room', briefing: 'Static totals are not enough. Build the DAX measure layer that powers live decisions.', winCondition: 'Create the target measure and validate the KPI calculation path.', icon: '📐', accentText: 'text-purple-700', accentBg: 'bg-purple-50', accentBorder: 'border-purple-200', headerBg: 'bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.22),transparent_34%),linear-gradient(135deg,#24103f,#101935)]' },
};

const getExcelHint = (check: string, currentStep?: any): string => {
  if (currentStep?.instruction) return currentStep.instruction;
  switch (check) {
    // Excel Fundamentals Hints
    case 'check_a1': return 'Click cell A1, type 100, and press Enter or click "Check Formula Progress".';
    case 'check_b1': return 'Click cell B1, type 50, and press Enter.';
    case 'check_c1': return 'Click cell C1, type "=A1+B1" and press Enter to sum A1 and B1.';
    case 'check_range_sum': return 'Fill cell A2 with 10, A3 with 20, and A4 with 30.';
    case 'check_sum_a1_a4': return 'Click cell B2, type "=SUM(A1:A4)" and press Enter.';
    case 'check_row5': return 'Fill cell A5 with 5 and B5 with 5.';
    case 'check_c5': return 'Click cell C5, type "=A5+B5" and press Enter.';
    case 'check_d1_e1': return 'Enter 100 in cell D1 and 50 in cell E1.';
    case 'check_undo': return 'Click the "Undo" button in the green ribbon of the spreadsheet to revert the last edit.';

    // Excel Formatting Hints
    case 'format_bold_a1': return 'Select cell A1, type "Sales Report", press Enter, then click the Bold (B) icon in the formatting toolbar.';
    case 'format_number_a2': return 'Select cell A2, type "1500", press Enter, and choose "Number" from the Format dropdown in the toolbar.';
    case 'format_date_a3': return 'Select cell A3, type "2026-06-30", press Enter, and choose "Short Date" from the Format dropdown in the toolbar.';
    case 'format_currency_a4': return 'Select cell A4, type "250", press Enter, and choose "Currency" from the Format dropdown in the toolbar.';
    case 'format_italic_b1': return 'Select cell B1, type "Q2 Summary", press Enter, and click the Italic (I) icon in the formatting toolbar.';
    case 'format_align_b1': return 'Select B1 and click the Center Align button in the toolbar.';
    case 'format_border_a1': return 'Select A1 and click the Grid border icon in the formatting toolbar to enable dark borders.';
    case 'format_style_a1': return 'Select A1 and choose "Heading 1" from the Style preset dropdown in the toolbar.';
    case 'format_color_a4': return 'Select A4 and click the Palette color icon in the toolbar to fill it with green.';
    case 'format_theme_b1': return 'Select B1 and choose "Accent Fill" from the Style preset dropdown in the toolbar.';
    default: return 'Review instructions carefully to edit spreadsheet cells and apply correct styles.';
  }
};

export const LabView: React.FC<LabViewProps> = ({ lab, onClose, onComplete, projectTitle, currentXp = 0 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState<Comment['tag']>('general');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [selectedOS, setSelectedOS] = useState<'macos' | 'windows' | 'linux'>('linux');
  const [shareText, setShareText] = useState('Share Lab');
  const [runCommandTrigger, setRunCommandTrigger] = useState<{ command: string; timestamp: number } | null>(null);
  const [checkProgressTrigger, setCheckProgressTrigger] = useState<number>(0);
  const [isCheckingProgress, setIsCheckingProgress] = useState(false);
  const [isQuickRefOpen, setIsQuickRefOpen] = useState(false);
  const [isQuestBriefOpen, setIsQuestBriefOpen] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [activeParticles, setActiveParticles] = useState<{ id: number; x: number; y: number; color: string; scale: number; rotation: number }[]>([]);
  const [floatingXp, setFloatingXp] = useState<{ id: number; amount: number; x: number; y: number } | null>(null);
  const earnedXp = lab.xpReward ?? 250;

  useEffect(() => {
    setShowHint(false);
  }, [currentStepIndex]);

  const [prevProjectId, setPrevProjectId] = useState(lab.projectId);
  if (lab.projectId !== prevProjectId) {
    setPrevProjectId(lab.projectId);
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setIsStarted(false);
    setIsConnecting(false);
    setConnectionProgress(0);
    setConnectionStatus('');
    setProgressPercentage(0);
    setIsQuestBriefOpen(true);
  }

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?lab=${encodeURIComponent(lab.projectId)}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShareText('Copied!');
        setTimeout(() => setShareText('Share Lab'), 2000);
      })
      .catch(err => {
        console.error('Failed to copy share link:', err);
      });
  };

  const submitComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setComments(prev => [{
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'https://picsum.photos/seed/you/40/40',
      text,
      tag: newTag,
      likes: 0,
      liked: false,
      timestamp: 'just now',
    }, ...prev]);
    setNewComment('');
    setNewTag('general');
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c =>
      c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
    ));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const triggerConfettiAndXp = (amount = 25) => {
    const colors = ['#107c41', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    const newParticles = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 80,
      y: 35 + (Math.random() - 0.5) * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 360,
    }));
    setActiveParticles(newParticles);
    
    setFloatingXp({
      id: Date.now(),
      amount,
      x: 50,
      y: 50
    });
    
    setTimeout(() => {
      setActiveParticles([]);
    }, 2000);
    
    setTimeout(() => {
      setFloatingXp(null);
    }, 1500);
  };

  const handleVerifyExcelStep = (gridData: { [key: string]: string }, formats: { [key: string]: any } = {}, lastAction = ''): boolean => {
    const step = lab.steps[currentStepIndex];
    if (!step) return false;
    
    switch (step.checkCommand) {
      // Excel Fundamentals validations
      case 'check_a1':
        return gridData['A1'] === '100';
      case 'check_b1':
        return gridData['B1'] === '50';
      case 'check_c1':
        const c1Val = gridData['C1']?.replace(/\s/g, '').toUpperCase() || '';
        return c1Val === '=A1+B1' || c1Val === '=B1+A1' || c1Val === '150';
      case 'check_range_sum':
        return gridData['A2'] === '10' && gridData['A3'] === '20' && gridData['A4'] === '30';
      case 'check_sum_a1_a4':
        return gridData['B2']?.replace(/\s/g, '').toUpperCase() === '=SUM(A1:A4)';
      case 'check_row5':
        return gridData['A5'] === '5' && gridData['B5'] === '5';
      case 'check_c5':
        const c5Val = gridData['C5']?.replace(/\s/g, '').toUpperCase() || '';
        return c5Val === '=A5+B5' || c5Val === '=B5+A5' || c5Val === '10';
      case 'check_d1_e1':
        return gridData['D1'] === '100' && gridData['E1'] === '50';
      case 'check_undo':
        return lastAction === 'undo' && (!gridData['D1'] || gridData['D1'] === '0' || gridData['D1'] === '');

      // Excel Formatting validations
      case 'format_bold_a1':
        return gridData['A1']?.trim().toLowerCase() === 'sales report' && Boolean(formats['A1']?.bold);
      case 'format_number_a2':
        return gridData['A2'] === '1500' && formats['A2']?.numberFormat === 'number';
      case 'format_date_a3':
        return gridData['A3'] === '2026-06-30' && formats['A3']?.numberFormat === 'date';
      case 'format_currency_a4':
        return gridData['A4'] === '250' && formats['A4']?.numberFormat === 'currency';
      case 'format_italic_b1':
        return gridData['B1']?.trim().toLowerCase() === 'q2 summary' && Boolean(formats['B1']?.italic);
      case 'format_align_b1':
        return formats['B1']?.align === 'center';
      case 'format_border_a1':
        return Boolean(formats['A1']?.border);
      case 'format_style_a1':
        return formats['A1']?.style === 'heading';
      case 'format_color_a4':
        return formats['A4']?.color === '#e1f0e7';
      case 'format_theme_b1':
        return formats['B1']?.style === 'accent';
      // Worksheets & Formulas
      case 'sheet_rename':
        return gridData['A1'] === 'Sheet Renamed';
      case 'ref_relative':
        return gridData['A1']?.replace(/\s/g, '') === '=B1+C1';
      case 'func_average':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=AVERAGE(A2:A5)';
      case 'func_vlookup':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=VLOOKUP(B1,C1:D3,2,FALSE)';
      case 'func_filter':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=FILTER(B1:B5,C1:C5=1)';
      case 'table_header':
        return gridData['A1'] === 'Table Header';
      case 'chart_title':
        return gridData['A1'] === 'Chart Title';
      case 'pivot_source':
        return gridData['A1'] === 'Pivot Source';
      case 'unique_list':
        return gridData['A1'] === 'Unique List';
      case 'valid_option':
        return gridData['A1'] === 'Valid Option';
      case 'highlight_rules':
        return gridData['A1'] === 'Highlight';
      case 'data_source':
        return gridData['A1'] === 'Data Source';
      case 'dax_measure':
        return gridData['A1'] === 'DAX Measure';
      case 'func_pmt':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=PMT(0.05/12,60,-15000)';
      case 'func_median':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=MEDIAN(A2:A5)';
      case 'func_lambda':
        return gridData['A1']?.replace(/\s/g, '').toUpperCase() === '=LAMBDA(X,X+1)';
      case 'macro_run':
        return gridData['A1'] === 'Macro Run';
      case 'review_done':
        return gridData['A1'] === 'Review Done';
      case 'csv_data':
        return gridData['A1'] === 'csv_data';
      case 'page_title':
        return gridData['A1'] === 'Page Title';
      case 'kpi_score':
        return gridData['A1'] === '98%';
      case 'budget_total':
        return gridData['A1'] === '1200';
      case 'regression_r2':
        return gridData['A1'] === '0.95';
      default:
        return false;
    }
  };

  const handleVerifySapStep = (
    action: string,
    inputs: { [key: string]: string },
    currentTCode: string,
    environment: 'gui' | 'fiori'
  ): boolean => {
    const step = lab.steps[currentStepIndex];
    if (!step) return false;

    const expected = step.expectedOutput?.trim();
    const check = step.checkCommand?.trim();

    if (action === 'check_progress') {
      if (check === 'sap_fiori_gui') {
        return environment === 'fiori';
      }
      if (check === 'sap_nav_menu' || check === 'sap_menus' || check === 'sap_easy_access') {
        return currentTCode === 'EASY_ACCESS';
      }
      if (check === 'sap_login' || check === 'sap_tcode_su01' || check === 'sec_su01_tcode' || check === 'tr_req') {
        return currentTCode === 'SU01' || currentTCode === 'STMS';
      }
      if (check === 'sap_profiles' || check === 'sec_user') {
        return inputs.username?.toUpperCase() === expected?.toUpperCase();
      }
      if (check === 'sec_role') {
        return inputs.roleName?.toUpperCase() === expected?.toUpperCase();
      }
      if (check === 'sec_password') {
        return inputs.password === expected;
      }
      if (check === 'sd_sales_orders') {
        return currentTCode === 'VA01' && inputs.soldTo === '100240' && inputs.material === 'MAT-01';
      }
      if (check === 'mm_po' || check === 'cap_p2p_po') {
        return currentTCode === 'ME21N' && inputs.vendor === 'VEND-01' && inputs.purchOrg === '1000';
      }
      if (check === 'cap_o2c_order') {
        return currentTCode === 'VA01' && inputs.soldTo === '100240' && inputs.material === 'MAT-01';
      }
      
      if (check && currentTCode === expected) {
        return true;
      }
      if (check && inputs.validationRule === expected) {
        return true;
      }
      return false;
    }

    if (action === 'save_su01' && (check === 'sec_su01_save' || check === 'sec_su01_basics')) {
      return inputs.username !== '' && inputs.password !== '';
    }
    if (action === 'save_va01' && check === 'sd_sales_orders') {
      return inputs.soldTo === '100240' && inputs.material === 'MAT-01';
    }
    if (action === 'save_me21n' && (check === 'mm_po' || check === 'cap_p2p_po')) {
      return inputs.vendor === 'VEND-01' && inputs.purchOrg === '1000';
    }
    if (action === 'run_abap' && (check?.startsWith('ab_') || check?.startsWith('ap_') || check?.startsWith('rep_'))) {
      return true;
    }
    if (action === 'release_tr' && (check === 'tr_release' || check === 'cap_p2p_release')) {
      return true;
    }

    return false;
  };

  const handleVerifyPowerBiStep = (
    action: string,
    inputs: { [key: string]: string },
    currentView: 'report' | 'data' | 'model',
    daxFormula: string
  ): boolean => {
    const step = lab.steps[currentStepIndex];
    if (!step) return false;

    const expected = step.expectedOutput?.trim();
    const check = step.checkCommand?.trim();

    if (action === 'check_progress') {
      if (check === 'pbi_install' || check === 'pbi_template') {
        return inputs.dataSourceType === expected;
      }
      if (check === 'pbi_view_report' || check === 'pbi_view_data' || check === 'pbi_view_model') {
        return currentView === expected;
      }
      if (check === 'pbi_connect') {
        return inputs.dataSourceType === expected;
      }
      if (check === 'pbi_etl') {
        return inputs.etlStep === expected;
      }
      if (check === 'pbi_relationship') {
        return inputs.relationshipType === expected;
      }
      if (check === 'pbi_dax') {
        return daxFormula.replace(/\s/g, '').toUpperCase() === expected?.replace(/\s/g, '').toUpperCase();
      }
      return false;
    }

    if (action === 'apply_dax' && check === 'pbi_dax') {
      return daxFormula.replace(/\s/g, '').toUpperCase() === expected?.replace(/\s/g, '').toUpperCase();
    }
    if (action === 'apply_etl' && check === 'pbi_etl') {
      return inputs.etlStep === expected;
    }
    if (action === 'connect_source' && check === 'pbi_connect') {
      return inputs.dataSourceType === expected;
    }
    if (action === 'save_relationship' && check === 'pbi_relationship') {
      return inputs.relationshipType === expected;
    }
    if (action === 'refresh_data' && (check === 'pbi_refresh' || check === 'pbi_gateway')) {
      return true;
    }
    if (action === 'publish_report' && (check === 'pbi_publish' || check.startsWith('pbi_publish_'))) {
      return true;
    }

    return false;
  };

  const handleVerifyEspStep = (
    action: string,
    inputs: { [key: string]: string },
    currentTab: 'inbox' | 'mfa' | 'desk' | 'url',
    score: number
  ): boolean => {
    const step = lab.steps[currentStepIndex];
    if (!step) return false;

    const expected = step.expectedOutput?.trim();
    const check = step.checkCommand?.trim();

    if (action === 'check_progress') {
      if (check === 'esp_action_inbox') {
        return currentTab === 'inbox' && inputs.selectedAction === 'report_phishing';
      }
      if (check === 'esp_action_mfa') {
        return currentTab === 'mfa' && inputs.mfaInputToken === '124056';
      }
      if (check === 'esp_action_desk') {
        return currentTab === 'desk' && inputs.stickyPasswordSecure === 'true' && inputs.laptopLockSecure === 'true';
      }
      if (check === 'esp_action_url') {
        return currentTab === 'url' && (inputs.reportedDomain === 'microsoft-security-auth.net' || inputs.reportedDomain.includes('microsoft-security'));
      }
      return false;
    }

    if (action === 'report_phishing' && check === 'esp_action_inbox') {
      inputs.selectedAction = 'report_phishing';
      return true;
    }
    if (action === 'setup_mfa' && check === 'esp_action_mfa') {
      return inputs.mfaInputToken === '124056';
    }
    if (action === 'secure_desk' && check === 'esp_action_desk') {
      return inputs.stickyPasswordSecure === 'true' && inputs.laptopLockSecure === 'true';
    }
    if (action === 'verify_url' && check === 'esp_action_url') {
      return inputs.reportedDomain === 'microsoft-security-auth.net' || inputs.reportedDomain.includes('microsoft-security');
    }

    return false;
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

  const currentStep = lab?.steps?.[currentStepIndex];
  if (!currentStep) return null; // Defensive bail-out if data is malformed

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === (lab?.steps?.length || 0) - 1;

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

  const handleLabComplete = () => {
    onComplete(earnedXp);
    setShowReward(true);
  };

  const newTotalXp = currentXp + earnedXp;
  const oldRank = getRank(currentXp);
  const newRank = getRank(newTotalXp);
  const didRankUp = newRank.title !== oldRank.title;

  const handleCommandClick = (cmdText: string) => {
    setRunCommandTrigger({
      command: cmdText,
      timestamp: Date.now()
    });
  };

  const handleCheckProgress = () => {
    setCheckProgressTrigger(prev => prev + 1);
  };

  // Find category/concepts
  const project = projects.find(p => p.id === String(lab.projectId));
  const tags = project?.tags || [];
  const concepts = tags
    .map(tag => conceptDictionary[tag])
    .filter((c): c is { title: string; description: string } => 
      Boolean(c && typeof c === 'object' && 'title' in c && 'description' in c)
    );

  const stepCommands = currentStep?.commands || [];

  // Dynamically inject command-specific concept notes
  stepCommands.forEach(cmd => {
    if (cmd.text.includes('kubectl config current-context')) {
      const c = conceptDictionary['kubectl config current-context'];
      if (c) concepts.push(c);
    }
  });

  const uniqueConcepts = Array.from(
    new Map(concepts.map(c => [c.title, c])).values()
  );

  const stepBreakdowns = stepCommands.map(cmd => getCommandBreakdown(cmd.text)).filter(b => b.length > 0);
  const hasBreakdown = stepBreakdowns.length > 0;
  const hasQuickRefContent = uniqueConcepts.length > 0 || hasBreakdown;
  const questTheme = QUEST_THEMES[String(lab.projectId)];
  const activeAccentText = questTheme?.accentText || 'text-blue-300';
  const activeAccentBg = questTheme?.accentBg || 'bg-brand-blue/10';
  const activeAccentBorder = questTheme?.accentBorder || 'border-brand-blue/20';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-zinc-50 flex flex-col h-screen w-screen overflow-hidden font-sans"
    >
      {/* 1. Step Indicator Bar */}
      <div className="bg-white border-b border-zinc-200 py-4 px-8 flex justify-center items-center shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          {lab.steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = completedSteps.includes(step.id);
            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div 
                    className={`h-0.5 w-6 sm:w-10 md:w-12 transition-colors duration-200 ${
                      idx <= currentStepIndex ? 'bg-brand-blue' : 'bg-zinc-200'
                    }`}
                  />
                )}
                <button
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 transition-all cursor-pointer hover:scale-110 ${
                    isActive
                      ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_12px_rgba(59,130,246,0.4)] animate-pulse-active'
                      : isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  ) : (
                    idx + 1
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Main content split/unsplit based on isStarted */}
      {!isStarted ? (
        <div className={`flex-1 overflow-y-auto flex items-center justify-center p-8 ${questTheme ? 'bg-zinc-950 bg-grid-cyber' : 'bg-zinc-50/50'}`}>
          <div className={`${questTheme ? 'bg-zinc-950/90 border-cyan-500/20 text-white shadow-cyan-950/40' : 'bg-white border-zinc-200/80'} max-w-2xl w-full rounded-3xl border shadow-xl p-10 text-center relative overflow-hidden`}>
            {questTheme && (
              <>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              </>
            )}
            <AnimatePresence mode="wait">
              {isConnecting ? (
                <motion.div 
                  key="connecting"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <div className={`w-20 h-20 ${questTheme ? activeAccentBg : 'bg-brand-blue/10'} rounded-full flex items-center justify-center mb-8 mx-auto relative`}>
                    <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin"></div>
                    <TerminalIcon className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h2 className={`text-xl font-bold mb-4 ${questTheme ? 'text-white' : 'text-zinc-900'}`}>
                    {questTheme ? `Loading ${questTheme.callsign}...` : 'Connecting to Cloud...'}
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
                  <div className={`w-20 h-20 ${questTheme ? `${activeAccentBg} ${activeAccentBorder}` : 'bg-brand-blue/10 border-brand-blue/20'} rounded-full flex items-center justify-center mb-6 ring-1 border text-4xl`}>
                    {questTheme ? questTheme.icon : <Play className="w-10 h-10 text-brand-blue fill-brand-blue/20 ml-1" />}
                  </div>
                  {questTheme && (
                    <div className={`mb-3 px-3 py-1 rounded-full border ${activeAccentBorder} ${activeAccentBg} ${activeAccentText} text-[10px] font-black uppercase tracking-[0.2em]`}>
                      {questTheme.label}
                    </div>
                  )}
                  <h2 className={`text-2xl font-black mb-3 tracking-tight ${questTheme ? 'text-white' : 'text-zinc-900'}`}>
                    {questTheme ? questTheme.callsign : 'Initialize Cloud Sandbox'}
                  </h2>
                  <p className={`${questTheme ? 'text-zinc-300' : 'text-zinc-500'} text-sm max-w-md mb-8 leading-relaxed`}>
                    {questTheme ? questTheme.briefing : 'This will provision a dedicated container with all required cloud tools and configuration pre-installed for this lab.'}
                  </p>
                  <button 
                    onClick={startLabSession}
                    className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20 flex items-center gap-3 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {questTheme ? 'Accept Quest' : 'Start Lab Session'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-row overflow-hidden">
          {/* Left Column: Guide */}
          <div className="w-[45%] min-w-[360px] max-w-[55%] border-r border-zinc-200 bg-[#f8fafc] h-full overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-zinc-200">
            {/* Top Navigation Row */}
            <div className="flex justify-between items-center px-6 py-4 bg-zinc-950 border-b border-zinc-800 shrink-0">
              <button 
                onClick={onClose}
                className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
                Exit Lab
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                {shareText}
              </button>
            </div>

            {/* Header Card */}
            <div className={`${questTheme?.headerBg || 'bg-[#101935]'} text-white px-6 pb-6 pt-6 m-6 mt-4 rounded-2xl flex flex-col justify-between relative shadow-lg overflow-hidden`}>
              {/* Decorative background glow */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -top-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">

                {/* Mission Info & Title */}
                <div className="flex justify-between items-end gap-4">
                  <div className="min-w-0">
                    <span className={`text-[10px] font-black ${questTheme ? activeAccentText : 'text-blue-300'} uppercase tracking-[0.2em] block mb-1`}>
                      {questTheme ? questTheme.label : 'Mission'} {currentStepIndex + 1} OF {lab.steps.length}
                    </span>
                    <h2 className="text-xl font-black tracking-tight leading-tight flex items-center gap-2 truncate">
                      {questTheme ? questTheme.icon : '💻'} {questTheme?.callsign || projectTitle}
                    </h2>
                    <p className="text-white/70 text-xs mt-1 truncate">
                      {questTheme ? projectTitle : currentStep.title}
                    </p>
                  </div>
                  {lab.xpReward && (
                    <div className="flex flex-col items-center px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl shrink-0">
                      <span className="text-sm font-black leading-none">{lab.xpReward} XP</span>
                      <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">Reward</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {questTheme && (
              <div className="px-6 mb-6">
                <div className={`rounded-2xl border ${activeAccentBorder} ${activeAccentBg} overflow-hidden shadow-sm`}>
                  <button
                    type="button"
                    onClick={() => setIsQuestBriefOpen(prev => !prev)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/30 transition-colors cursor-pointer"
                    aria-expanded={isQuestBriefOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-xl shrink-0">
                        {questTheme.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeAccentText}`}>Quest Briefing</h3>
                        <p className="text-[10px] text-zinc-500 font-bold truncate">{isQuestBriefOpen ? 'Hide mission context' : questTheme.callsign}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 ${activeAccentText} transition-transform duration-200 ${isQuestBriefOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isQuestBriefOpen && (
                    <div className="flex items-start gap-3 px-4 pb-4 border-t border-white/40">
                    <div className="w-10 h-10 rounded-xl bg-white/70 border border-white/60 flex items-center justify-center text-xl shrink-0">
                      {questTheme.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeAccentText} mb-1 pt-4`}>Mission Context</h3>
                      <p className="text-zinc-700 text-xs leading-relaxed font-semibold mb-3">{questTheme.briefing}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-white/70 border border-white/60 rounded-xl p-3">
                          <div className="font-black text-zinc-400 uppercase tracking-wider mb-1">Win Condition</div>
                          <div className="font-bold text-zinc-700 leading-snug">{questTheme.winCondition}</div>
                        </div>
                        <div className="bg-white/70 border border-white/60 rounded-xl p-3">
                          <div className="font-black text-zinc-400 uppercase tracking-wider mb-1">Current Objective</div>
                          <div className="font-bold text-zinc-700 leading-snug">{currentStep.title}</div>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Reference Notes */}
            {/* Quick Reference Notes */}
            {hasQuickRefContent && (
              <div className="px-6 mb-6">
                <div className="border border-amber-200/60 bg-amber-50/30 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setIsQuickRefOpen(!isQuickRefOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-amber-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-amber-500 text-white rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-black text-amber-900 text-xs tracking-wider block">QUICK REFERENCE NOTES</span>
                        <span className="text-[10px] text-amber-700 font-medium">Learn key architectural concepts and command syntax</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-200/60 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {uniqueConcepts.length + stepBreakdowns.length} items
                      </span>
                      <span className={`transition-transform duration-200 ${isQuickRefOpen ? 'rotate-185' : ''}`}>
                        <ChevronDown className="w-4 h-4 text-amber-600" />
                      </span>
                    </div>
                  </button>
                  {isQuickRefOpen && (
                    <div className="px-4 pb-4 border-t border-amber-100 bg-white">
                      <div className="space-y-4 pt-4">
                        {uniqueConcepts.length > 0 && uniqueConcepts.map((concept, idx) => (
                          <div key={idx} className="border-b border-zinc-100 last:border-0 pb-3 last:pb-0">
                            <h5 className="text-xs font-bold text-zinc-900 mb-1 flex items-center gap-2">
                              <Sparkle className="w-3.5 h-3.5 text-brand-blue" />
                              {concept.title}
                            </h5>
                            <div className="text-zinc-600 text-[11px] leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-headings:text-xs prose-headings:font-bold prose-headings:mt-2 prose-headings:mb-1 prose-ul:my-1 prose-li:my-0.5">
                              <Markdown>
                                {concept.description}
                              </Markdown>
                            </div>
                          </div>
                        ))}

                        {hasBreakdown && (
                          <div className={`pt-4 ${uniqueConcepts.length > 0 ? 'border-t border-zinc-200 mt-4' : ''}`}>
                            <h5 className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Monitor className="w-3.5 h-3.5 text-amber-700" />
                              Command Syntax Breakdown
                            </h5>
                            <div className="space-y-3">
                              {stepCommands.map((cmd, cIdx) => {
                                const breakdown = getCommandBreakdown(cmd.text);
                                if (breakdown.length === 0) return null;
                                return (
                                  <div key={cIdx} className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-3">
                                    <div className="font-mono text-[10px] text-zinc-800 bg-zinc-200/50 px-2 py-1 rounded mb-2 border border-zinc-300/30 overflow-x-auto">
                                      {cmd.text}
                                    </div>
                                    <div className="space-y-2">
                                      {breakdown.map((item, iIdx) => (
                                        <div key={iIdx} className="text-[11px] leading-relaxed flex items-start gap-1.5">
                                          <span className="font-mono font-bold text-brand-blue bg-blue-50 border border-blue-100/50 px-1 rounded shrink-0">{item.term}</span>
                                          <span className="text-zinc-600">— {item.explanation}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OS Selector Card */}
            {!['excel-', 'sap-', 'pbi-', 'esp-'].some(prefix => lab.projectId.startsWith(prefix)) && (
              <div className="px-6 mb-6">
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-500 shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Select Your Operating System</h4>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Commands and terminal syntax will adapt to your platform.</p>
                    </div>
                  </div>
                  <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 self-start sm:self-auto">
                    {(['macos', 'windows', 'linux'] as const).map((os) => (
                      <button
                        key={os}
                        onClick={() => setSelectedOS(os)}
                        className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all ${
                          selectedOS === os 
                            ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/30'
                            : 'text-zinc-400 hover:text-zinc-600'
                        }`}
                      >
                        {os}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Implementation Guide */}
            <div className="px-6 mb-8 flex-1">
              <div className="flex items-center gap-2 border-l-4 border-brand-blue pl-3 mb-6">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">{questTheme ? 'Quest Playbook' : 'Implementation Guide'}</h3>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm shrink-0 border border-brand-blue/30 shadow-[0_0_12px_rgba(59,130,246,0.5)] animate-pulse-active transition-all cursor-default">
                  {currentStepIndex + 1}
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <h3 className="text-base font-bold text-zinc-900 leading-tight">{currentStep.title}</h3>
                  
                  {/* Summary / Instruction */}
                  <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                      {questTheme ? 'Mission Move' : 'Instruction Summary'}
                    </h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {currentStep.summary || currentStep.instruction}
                    </p>
                  </div>

                  {/* Excel Assignment Guide */}
                  {lab.projectId.startsWith('excel-') && (
                    <div className="bg-[#e1f0e7]/40 border border-[#107c41]/20 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-[#107c41] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-[#107c41]" />
                        Excel Assignment Guide
                      </h4>
                      <p className="text-zinc-700 text-xs leading-relaxed font-semibold">
                        {getExcelHint(currentStep.checkCommand, currentStep)}
                      </p>
                    </div>
                  )}

                  {/* SAP Assignment Guide */}
                  {lab.projectId.startsWith('sap-') && (
                    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-sky-700 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-sky-650" />
                        SAP Assignment Guide
                      </h4>
                      <p className="text-zinc-700 text-xs leading-relaxed font-semibold">
                        {currentStep.instruction}
                      </p>
                    </div>
                  )}

                  {/* Power BI Assignment Guide */}
                  {lab.projectId.startsWith('pbi-') && (
                    <div className="bg-amber-50/50 border border-amber-200/40 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-amber-600" />
                        Power BI Assignment Guide
                      </h4>
                      <p className="text-zinc-700 text-xs leading-relaxed font-semibold">
                        {currentStep.instruction}
                      </p>
                    </div>
                  )}

                  {/* ESP Assignment Guide */}
                  {lab.projectId.startsWith('esp-') && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-emerald-650" />
                        ESP Assignment Guide
                      </h4>
                      <p className="text-zinc-700 text-xs leading-relaxed font-semibold">
                        {currentStep.instruction}
                      </p>
                    </div>
                  )}

                  {/* Hint Section */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        Need a Hint?
                      </h4>
                      <button 
                        onClick={() => setShowHint(prev => !prev)}
                        className="px-2.5 py-1 bg-white border border-amber-200 text-amber-700 hover:text-amber-800 hover:bg-amber-100/50 rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                      >
                        {showHint ? 'Hide Hint' : 'Reveal Hint'}
                      </button>
                    </div>
                    {showHint && (
                      <p className="text-zinc-600 text-xs mt-3 leading-relaxed border-t border-amber-100/50 pt-2 font-mono">
                        {getExcelHint(currentStep.checkCommand, currentStep)}
                      </p>
                    )}
                  </div>

                  {/* Why It's Needed */}
                  {currentStep.whyNeeded && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-amber-500" />
                        Why It's Needed
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {currentStep.whyNeeded}
                      </p>
                    </div>
                  )}

                  {/* Pillar Connection */}
                  {currentStep.pillarConnection && (
                    <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />
                        Pillar Connection
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {currentStep.pillarConnection}
                      </p>
                    </div>
                  )}

                  {/* Target Commands */}
                  {currentStep.commands && currentStep.commands.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Target Commands (Click to Run)</h4>
                      {currentStep.commands.map((cmd, idx) => {
                        const translatedCmd = getOSCommand(cmd.text, selectedOS);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleCommandClick(translatedCmd)}
                            disabled={isCheckingProgress}
                            className="w-full text-left bg-zinc-950 p-4 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all group cursor-pointer disabled:cursor-not-allowed flex justify-between items-start gap-4"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-xs text-brand-blue mb-1 group-hover:text-white transition-colors break-all">
                                {translatedCmd}
                              </div>
                              <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                {cmd.explanation}
                              </p>
                            </div>
                            <div className="shrink-0 text-zinc-500 hover:text-white transition-colors p-1" onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(translatedCmd, `cmd-${idx}`);
                            }}>
                              {copied === `cmd-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Action controls inside Left Column */}
                  <div className="pt-6 border-t border-zinc-100 flex flex-col gap-3">
                    <button
                      onClick={handleCheckProgress}
                      disabled={isCheckingProgress}
                      className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5 relative overflow-hidden flex justify-center items-center gap-2 ${
                        isCheckingProgress 
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200' 
                          : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                      }`}
                    >
                      {isCheckingProgress && (
                        <div className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                      )}
                      <span>
                        {isCheckingProgress ? `Validating... ${progressPercentage}%` : 'Check Progress'}
                      </span>
                    </button>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={prevStep}
                        disabled={isFirstStep}
                        className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${(isFirstStep) ? 'text-zinc-300 bg-zinc-50 border-zinc-200 cursor-not-allowed' : 'text-zinc-500 border-zinc-200 hover:bg-zinc-50 bg-white'}`}
                      >
                        Back
                      </button>
                      <button
                        onClick={isLastStep ? handleLabComplete : nextStep}
                        disabled={!completedSteps.includes(currentStep.id)}
                        className={`flex-[2] py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                          completedSteps.includes(currentStep.id)
                            ? 'bg-brand-blue hover:bg-brand-blue/90 text-white shadow-brand-blue/20'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                        }`}
                      >
                        {isLastStep ? 'Complete Lab' : 'Next Step'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal or Excel Grid */}
          <div className={(lab.projectId.startsWith('excel-') || lab.projectId.startsWith('sap-') || lab.projectId.startsWith('pbi-') || lab.projectId.startsWith('esp-')) ? "flex-1 bg-white flex flex-col h-full overflow-hidden" : "flex-1 bg-zinc-900 p-6 flex flex-col h-full overflow-hidden justify-center"}>
            {lab.projectId.startsWith('excel-') ? (
              <ExcelGrid 
                currentStepIndex={currentStepIndex}
                onVerifyStep={handleVerifyExcelStep}
                onStepSuccess={() => {
                  if (!completedSteps.includes(currentStep.id)) {
                    setCompletedSteps(prev => [...prev, currentStep.id]);
                    triggerConfettiAndXp(25);
                  }
                }}
              />
            ) : lab.projectId.startsWith('sap-') ? (
              <SapSandbox 
                currentStepIndex={currentStepIndex}
                onVerifyStep={handleVerifySapStep}
                onStepSuccess={() => {
                  if (!completedSteps.includes(currentStep.id)) {
                    setCompletedSteps(prev => [...prev, currentStep.id]);
                    triggerConfettiAndXp(25);
                  }
                }}
              />
            ) : lab.projectId.startsWith('pbi-') ? (
              <PowerBiSandbox 
                currentStepIndex={currentStepIndex}
                onVerifyStep={handleVerifyPowerBiStep}
                onStepSuccess={() => {
                  if (!completedSteps.includes(currentStep.id)) {
                    setCompletedSteps(prev => [...prev, currentStep.id]);
                    triggerConfettiAndXp(25);
                  }
                }}
              />
            ) : lab.projectId.startsWith('esp-') ? (
              <EspSandbox 
                currentStepIndex={currentStepIndex}
                onVerifyStep={handleVerifyEspStep}
                onStepSuccess={() => {
                  if (!completedSteps.includes(currentStep.id)) {
                    setCompletedSteps(prev => [...prev, currentStep.id]);
                    triggerConfettiAndXp(25);
                  }
                }}
              />
            ) : (
              <Terminal 
                initialMessage={`Connected to ${lab.environment} instance... Ready for lab: ${projectTitle}`}
                hideSidebar={true}
                runCommandTrigger={runCommandTrigger}
                checkProgressTrigger={checkProgressTrigger}
                onCheckingProgressChange={(checking, progress) => {
                  setIsCheckingProgress(checking);
                  setProgressPercentage(progress);
                }}
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
                    triggerConfettiAndXp(25);
                  }
                }}
                onComplete={handleLabComplete}
                xpReward={lab.xpReward || 250}
                flavor="ubuntu"
              />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 px-8 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
          <div>{lab.projectId.startsWith('excel-') ? 'EXCEL SANDBOX READY' : lab.projectId.startsWith('sap-') ? 'SAP SANDBOX READY' : lab.projectId.startsWith('pbi-') ? 'POWER BI SANDBOX READY' : lab.projectId.startsWith('esp-') ? 'ESP WORKSTATION READY' : `${(lab?.environment || 'LINUX').toUpperCase()} ENVIRONMENT READY`}</div>
          <div className="flex items-center gap-4">
            <span className={isStarted ? "text-emerald-500" : "text-zinc-300"}>
              {isStarted ? "● LIVE SESSION ACTIVE" : "○ SESSION IDLE"}
            </span>
          </div>
        </div>
      </footer>

      {/* XP + Rank Reward Overlay */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[70] bg-zinc-900/75 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.75, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
              className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center relative overflow-hidden shadow-2xl"
            >
              {/* Confetti particles */}
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.color }}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{ scale: [0, 1, 0.8, 0], opacity: [1, 1, 0.6, 0], y: p.dy }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 1.1, ease: 'easeOut' }}
                />
              ))}

              <motion.div
                animate={{ rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.15, 1] }}
                transition={{ delay: 0.25, duration: 0.7, ease: 'easeInOut' }}
                className="text-6xl select-none mb-4"
              >
                🏆
              </motion.div>

              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-1">Lab Complete!</h2>
              <p className="text-zinc-400 text-sm mb-7 truncate px-4">{projectTitle}</p>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                className="bg-amber-50 border-2 border-amber-100 rounded-2xl py-5 px-6 mb-5"
              >
                <div className="text-4xl font-black text-amber-500 leading-none">+{earnedXp}</div>
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] mt-1">XP Earned</div>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="bg-zinc-50 border border-zinc-100 rounded-2xl py-4 px-6 mb-7"
              >
                <div className="text-3xl mb-1">{newRank.icon}</div>
                <div className="text-base font-black text-zinc-900">{newRank.title}</div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">{newTotalXp.toLocaleString()} XP total</div>
                {didRankUp && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 400 }}
                    className="mt-3 inline-block px-3 py-1 bg-brand-blue text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full"
                  >
                    ✦ Rank Up!
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { setShowReward(false); onClose(); }}
                className="w-full py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating XP Success Badge */}
      <AnimatePresence>
        {floatingXp && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5, x: '-50%' }}
            animate={{ opacity: 1, y: -100, scale: 1.2, x: '-50%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-y-1/2 z-[100] bg-emerald-500 text-white font-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-emerald-400"
          >
            <Sparkle className="w-5 h-5 text-amber-300 animate-spin" />
            +{floatingXp.amount} XP SUCCESS!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Explosion particles */}
      {activeParticles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 0, x: '50vw', y: '50vh' }}
          animate={{
            opacity: [1, 1, 0],
            scale: p.scale,
            x: `calc(${p.x}vw)`,
            y: `calc(${p.y}vh + 200px)`,
            rotate: p.rotation + 720
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="fixed w-2.5 h-3 z-[99] pointer-events-none rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </motion.div>
  );
};
