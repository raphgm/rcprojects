import { Lesson } from '../types/content';

// Course-specific topic banks. Each topic has a focus and a sandbox command.
type Topic = { topic: string; cmd: string; focus: string };

// Domain-specific topic banks.
const TOPIC_BANKS: Record<string, Topic[]> = {
  docker: [
    { topic: 'Runtime Architecture', cmd: 'docker version', focus: 'Understand the relationship between the Docker CLI, Host, and Daemon.' },
    { topic: 'Image Layer Analysis', cmd: 'docker history alpine', focus: 'Learn how Docker optimizes storage using immutable, cached layers.' },
    { topic: 'Storage Persistence', cmd: 'docker volume ls', focus: 'Master the lifecycle of persistent data using named volumes.' },
    { topic: 'Network Segmentation', cmd: 'docker network ls', focus: 'Explore how Docker isolates container traffic using bridge and overlay networks.' },
    { topic: 'Optimized Multi-stage Builds', cmd: 'docker images', focus: 'Understand how to separate build dependencies from production binaries.' },
    { topic: 'Service Orchestration', cmd: 'docker compose ps', focus: 'Manage complex, multi-container applications with a single manifest.' },
    { topic: 'Container Self-Healing', cmd: 'docker inspect --format "{{.State.Health.Status}}"', focus: 'Implement healthchecks to ensure containers automatically recover.' },
    { topic: 'Supply Chain Security', cmd: 'trivy --version', focus: 'Scan container images for known vulnerabilities before deployment.' },
    { topic: 'Resource Observability', cmd: 'docker stats --no-stream', focus: 'Monitor CPU and memory consumption across your container fleet.' },
    { topic: 'Log Aggregation', cmd: 'docker logs --tail 20', focus: 'Debug application failures by inspecting stdout and stderr streams.' },
    { topic: 'Registry Operations', cmd: 'docker search alpine', focus: 'Learn how to discover and manage images in remote repositories.' },
    { topic: 'Runtime Cleanup', cmd: 'docker system df', focus: 'Maintain system health by pruning unused images, containers, and networks.' },
  ],
  k8s: [
    { topic: 'Cluster Architecture', cmd: 'kubectl get nodes', focus: 'Understand the relationship between the control plane and worker nodes.' },
    { topic: 'Pod Lifecycle', cmd: 'kubectl get pods', focus: 'Master the smallest deployable unit and its ephemeral nature.' },
    { topic: 'Deployments & Replicas', cmd: 'kubectl get deployments', focus: 'Manage desired state and automated rollouts with controllers.' },
    { topic: 'Service Discovery', cmd: 'kubectl get svc', focus: 'Expose pods to the cluster or external traffic via stable IPs.' },
    { topic: 'Ingress Controllers', cmd: 'kubectl get ingress', focus: 'Route HTTP traffic using hostname and path-based rules.' },
    { topic: 'ConfigMaps & Secrets', cmd: 'kubectl get configmaps', focus: 'Externalize application configuration and sensitive data.' },
    { topic: 'Storage Classes & PVCs', cmd: 'kubectl get pvc', focus: 'Provision persistent storage dynamically for stateful workloads.' },
    { topic: 'RBAC & Identity', cmd: 'kubectl auth can-i create pods', focus: 'Implement fine-grained access control using ServiceAccounts.' },
  ],
  cyber: [
    { topic: 'Network Reconnaissance', cmd: 'nmap -sS localhost', focus: 'Identify active hosts and open ports on a target network.' },
    { topic: 'Vulnerability Scanning', cmd: 'nmap --script vuln localhost', focus: 'Automate the discovery of known security weaknesses.' },
    { topic: 'Traffic Analysis', cmd: 'tcpdump -i eth0 -c 5', focus: 'Inspect raw packets to identify insecure protocols and data leaks.' },
    { topic: 'Exploit Research', cmd: 'searchsploit drupal', focus: 'Map vulnerabilities to known proof-of-concept exploits.' },
    { topic: 'Password Cracking', cmd: 'john --list=formats', focus: 'Understand hashing algorithms and brute-force techniques.' },
    { topic: 'Privilege Escalation', cmd: 'find / -perm -4000 2>/dev/null', focus: 'Locate misconfigured SUID binaries to escalate local access.' },
  ],
  python: [
    { topic: 'Data Structures', cmd: 'python3 -c "print([x for x in range(10)])"', focus: 'Master lists, dictionaries, and list comprehensions.' },
    { topic: 'Asynchronous Programming', cmd: 'python3 -c "import asyncio"', focus: 'Build high-performance concurrent applications with async/await.' },
    { topic: 'Web APIs with Flask', cmd: 'pip show flask', focus: 'Develop microservices and RESTful endpoints.' },
    { topic: 'Automation Scripts', cmd: 'python3 -c "import os; print(os.listdir())"', focus: 'Automate system tasks and file manipulations.' },
    { topic: 'Data Analysis with Pandas', cmd: 'pip show pandas', focus: 'Clean, filter, and aggregate large datasets efficiently.' },
    { topic: 'Type Hinting & Pydantic', cmd: 'pip show pydantic', focus: 'Enforce data validation and improve code maintainability.' },
  ],
  db: [
    { topic: 'Relational Schemas', cmd: 'psql -c "\\dt"', focus: 'Design structured tables with strict integrity constraints.' },
    { topic: 'Index Optimization', cmd: 'psql -c "EXPLAIN ANALYZE SELECT..."', focus: 'Identify slow queries and speed them up with proper indexing.' },
    { topic: 'ACID Transactions', cmd: 'psql -c "BEGIN; ... COMMIT;"', focus: 'Ensure data consistency in multi-step operations.' },
    { topic: 'Document Modeling', cmd: 'mongosh --eval "db.stats()"', focus: 'Structure unstructured data for high scalability in NoSQL.' },
    { topic: 'Key-Value Caching', cmd: 'redis-cli info', focus: 'Reduce database load by caching frequently accessed data.' },
  ],
  linux: [
    { topic: 'Process Management', cmd: 'top -n 1', focus: 'Monitor system resources and manage process lifecycles.' },
    { topic: 'File System Hierarchy', cmd: 'ls -F /', focus: 'Navigate the standard Linux directory structure (FHS).' },
    { topic: 'Permissions & Ownership', cmd: 'ls -l /etc/shadow', focus: 'Understand UGO permissions and secure file access.' },
    { topic: 'Shell Scripting Basics', cmd: 'bash --version', focus: 'Automate repetitive tasks with portable Bash scripts.' },
    { topic: 'Systemd & Services', cmd: 'systemctl list-units --type=service', focus: 'Manage background daemons and system boot targets.' },
    { topic: 'Network Diagnostics', cmd: 'ip addr show', focus: 'Troubleshoot connectivity using modern iproute2 tools.' },
    { topic: 'Package Management (APT)', cmd: 'apt list --installed', focus: 'Manage software lifecycle using the Advanced Package Tool.' },
    { topic: 'User Account Management', cmd: 'whoami', focus: 'Manage user identities and understand the /etc/passwd structure.' },
    { topic: 'Text Processing (Grep)', cmd: 'grep "root" /etc/passwd', focus: 'Search through large text files using regular expressions.' },
    { topic: 'Log Analysis', cmd: 'journalctl -n 20', focus: 'Inspect system and application logs to debug failures.' },
    { topic: 'Storage Inspection', cmd: 'df -h', focus: 'Monitor disk space and understand mount points.' },
    { topic: 'Directory Traversal', cmd: 'pwd', focus: 'Master the concept of the Working Directory and path navigation.' },
    { topic: 'SSH & Remote Access', cmd: 'ssh-keygen -l -f /etc/ssh/ssh_host_rsa_key.pub', focus: 'Understand secure shell communication and key-based auth.' },
    { topic: 'Environment Variables', cmd: 'env | head', focus: 'Configure your shell environment and application secrets.' },
    { topic: 'Archive & Compression', cmd: 'tar --version', focus: 'Learn to bundle and compress files for transfer and backup.' },
    { topic: 'Crontab & Automation', cmd: 'crontab -l', focus: 'Schedule recurring tasks using the system cron daemon.' },
    { topic: 'Hardware Discovery', cmd: 'lsblk', focus: 'List all block devices and understand partitioning schemes.' },
    { topic: 'Kernel Inspection', cmd: 'uname -a', focus: 'Check kernel versions and understand system architecture.' },
    { topic: 'Network Sockets', cmd: 'ss -tuln', focus: 'Identify listening ports and active network connections.' },
    { topic: 'Text Stream Editing (Sed)', cmd: 'sed --version', focus: 'Perform non-interactive text transformations on the fly.' },
  ],
  terraform: [
    { topic: 'HCL Syntax & Providers', cmd: 'terraform version', focus: 'Understand declarative configuration and provider plugins.' },
    { topic: 'State Management', cmd: 'terraform state list', focus: 'Learn how Terraform tracks managed infrastructure in state files.' },
    { topic: 'Variable Interpolation', cmd: 'echo "var.region"', focus: 'Make configurations reusable using input variables and locals.' },
    { topic: 'Module Composition', cmd: 'ls modules/', focus: 'Organize infrastructure into reusable, logical components.' },
    { topic: 'Plan & Speculative Runs', cmd: 'terraform plan', focus: 'Preview infrastructure changes before applying them.' },
    { topic: 'Resource Dependencies', cmd: 'terraform graph', focus: 'Visualize and manage implicit and explicit resource dependencies.' },
  ],
  azure: [
    { topic: 'Resource Groups & RBAC', cmd: 'az group list', focus: 'Organize resources and manage permissions at the subscription level.' },
    { topic: 'Virtual Networks (VNet)', cmd: 'az network vnet list', focus: 'Design secure, isolated network topologies for cloud workloads.' },
    { topic: 'App Service & Serverless', cmd: 'az webapp list', focus: 'Deploy web applications and functions with managed scaling.' },
    { topic: 'Azure Kubernetes Service (AKS)', cmd: 'az aks list', focus: 'Provision and manage production-grade K8s clusters on Azure.' },
    { topic: 'Key Vault & Governance', cmd: 'az keyvault list', focus: 'Securely manage secrets, certificates, and compliance policies.' },
  ],
  networking: [
    { topic: 'OSI Model Layers', cmd: 'ping -c 3 google.com', focus: 'Understand packet travel from the Physical layer to the Application layer.' },
    { topic: 'TCP/UDP Protocols', cmd: 'netstat -tuln', focus: 'Differentiate between connection-oriented and stateless communications.' },
    { topic: 'DNS & Service Discovery', cmd: 'dig google.com', focus: 'Learn how hostnames are resolved to IP addresses across the web.' },
    { topic: 'Load Balancing & Proxying', cmd: 'curl -I localhost', focus: 'Distribute traffic across multiple backend servers for high availability.' },
    { topic: 'VPN & Tunneling', cmd: 'ip route show', focus: 'Secure remote access and site-to-site connectivity strategies.' },
  ],
  ai: [
    { topic: 'Model Training Loops', cmd: 'python3 -c "import torch; print(torch.__version__)"', focus: 'Implement forward and backward passes in deep learning models.' },
    { topic: 'Feature Engineering', cmd: 'pip show scikit-learn', focus: 'Transform raw data into meaningful signals for predictive models.' },
    { topic: 'Inference & LLM APIs', cmd: 'curl https://api.openai.com/v1/models', focus: 'Integrate pre-trained models into application workflows.' },
    { topic: 'Vector Embeddings', cmd: 'pip show qdrant-client', focus: 'Convert unstructured data into high-dimensional numerical vectors.' },
    { topic: 'Model Deployment & MLOps', cmd: 'mlflow --version', focus: 'Manage the full lifecycle of machine learning models in production.' },
  ],
  ansible: [
    { topic: 'Inventory Management', cmd: 'ansible-inventory --list', focus: 'Define and manage groups of hosts for automated configuration.' },
    { topic: 'Playbook Orchestration', cmd: 'ansible-playbook --syntax-check site.yml', focus: 'Master declarative configuration using YAML-based playbooks.' },
    { topic: 'Module Execution', cmd: 'ansible all -m ping', focus: 'Execute ad-hoc commands across your entire infrastructure fleet.' },
    { topic: 'Roles & Reusability', cmd: 'ansible-galaxy role list', focus: 'Organize complex automation tasks into modular, reusable roles.' },
    { topic: 'Variable Precedence', cmd: 'ansible-debug --version', focus: 'Understand how variables are merged and overridden in Ansible.' },
    { topic: 'Vault & Secret Encryption', cmd: 'ansible-vault --version', focus: 'Securely manage sensitive data like passwords and API keys.' },
  ],
  jenkins: [
    { topic: 'Pipeline as Code', cmd: 'jenkins-cli version', focus: 'Define end-to-end CI/CD workflows using Groovy-based Jenkinsfiles.' },
    { topic: 'Distributed Build Agents', cmd: 'echo "node { ... }"', focus: 'Scale your build infrastructure using remote worker nodes.' },
    { topic: 'Plugin Ecosystem', cmd: 'echo "install-plugin git"', focus: 'Extend Jenkins functionality with thousands of community-built plugins.' },
    { topic: 'Shared Libraries', cmd: 'echo "library \'my-shared-lib\'"', focus: 'Standardize pipeline logic across hundreds of repositories.' },
    { topic: 'Declarative vs Scripted', cmd: 'echo "pipeline { agent any }"', focus: 'Understand the two primary syntax styles for Jenkins pipelines.' },
  ],
  gitops: [
    { topic: 'Declarative State', cmd: 'argocd version', focus: 'Understand why Git should be the single source of truth for infrastructure.' },
    { topic: 'Application Synchronization', cmd: 'argocd app list', focus: 'Master automated reconciliation between Git and Kubernetes.' },
    { topic: 'Canary & Blue/Green', cmd: 'kubectl get rollouts', focus: 'Implement advanced deployment strategies using Argo Rollouts.' },
    { topic: 'Image Automation', cmd: 'flux version', focus: 'Automatically update your cluster when a new container image is pushed.' },
    { topic: 'Multi-cluster Management', cmd: 'argocd cluster list', focus: 'Scale GitOps workflows across dozens of distributed clusters.' },
  ],
  sre: [
    { topic: 'Observability Pillars', cmd: 'prometheus --version', focus: 'Master the three pillars: Metrics, Logs, and Traces.' },
    { topic: 'SLIs, SLOs & Error Budgets', cmd: 'echo "99.9% Availability"', focus: 'Quantify reliability and make data-driven deployment decisions.' },
    { topic: 'Distributed Tracing', cmd: 'echo "Jaeger/Zipkin"', focus: 'Track requests as they travel through complex microservices.' },
    { topic: 'Incident Response', cmd: 'echo "On-call Rotation"', focus: 'Build a repeatable process for detecting and resolving outages.' },
    { topic: 'Log Aggregation', cmd: 'echo "ELK / Loki"', focus: 'Centralize and index millions of logs for rapid troubleshooting.' },
  ],
  prom: [
    { topic: 'Time-Series Database Architecture', cmd: 'prometheus --version', focus: 'Understand how Prometheus stores multi-dimensional data as time series.' },
    { topic: 'Metric Collection (Scraping)', cmd: 'curl http://localhost:9090/metrics', focus: 'Explore how Prometheus pulls metrics from targets using HTTP.' },
    { topic: 'Configuration Validation', cmd: 'promtool check config prometheus.yml', focus: 'Use promtool to ensure your scrape configurations and global settings are valid.' },
    { topic: 'PromQL: Selection & Filtering', cmd: 'echo "up{job=\'prometheus\'}"', focus: 'Master basic label matching and metric selection in the Prometheus Query Language.' },
    { topic: 'PromQL: Rate & Increase', cmd: 'echo "rate(prometheus_http_requests_total[5m])"', focus: 'Learn to calculate the per-second average rate of increase for counters.' },
    { topic: 'PromQL: Aggregation Operators', cmd: 'echo "sum(up) by (instance)"', focus: 'Use operators like sum, min, max, and avg to aggregate metrics across dimensions.' },
    { topic: 'Recording & Alerting Rules', cmd: 'promtool check rules rules.yml', focus: 'Validate the syntax of your alerting and recording rules before deployment.' },
    { topic: 'Exporter Ecosystem', cmd: 'node_exporter --version', focus: 'Understand how exporters translate non-Prometheus metrics into the correct format.' },
    { topic: 'Service Discovery', cmd: 'prometheus --config.file=prometheus.yml', focus: 'Learn how Prometheus dynamically discovers targets in cloud environments.' },
    { topic: 'Storage Retention & WAL', cmd: 'ls -R /prometheus/data', focus: 'Inspect the Write-Ahead Log (WAL) and block structure of the TSDB.' },
  ],
};

const GENERIC: Topic[] = [
  { topic: 'Core Concepts', cmd: 'help', focus: 'Foundational ideas and terminology you will use throughout this course.' },
  { topic: 'Common Patterns', cmd: 'echo "pattern"', focus: 'Recurring patterns you will recognize in real systems.' },
  { topic: 'Best Practices', cmd: 'echo "best practices"', focus: 'Industry-standard practices and why they exist.' },
  { topic: 'Troubleshooting Basics', cmd: 'echo "check logs"', focus: 'A repeatable diagnostic loop for failures.' },
];

export function generateFallbackLessons(courseId: string, courseTitle: string, count: number): Lesson[] {
  const total = Math.max(1, count);
  const lessons: Lesson[] = [];
  
  // Determine the best bank to use based on the courseId or title
  let bank = GENERIC;
  const lowerTitle = courseTitle.toLowerCase();
  const lowerId = courseId.toLowerCase();
  
  if (lowerId.includes('docker') || lowerTitle.includes('docker')) bank = TOPIC_BANKS.docker;
  else if (lowerId.includes('k8s') || lowerId.includes('kubernetes') || lowerTitle.includes('kubernetes')) bank = TOPIC_BANKS.k8s;
  else if (lowerId.includes('python') || lowerTitle.includes('python')) bank = TOPIC_BANKS.python;
  else if (lowerId.includes('cyber') || lowerId.includes('security') || lowerTitle.includes('kali')) bank = TOPIC_BANKS.cyber;
  else if (lowerId.includes('db') || lowerId.includes('sql') || lowerId.includes('mongo') || lowerTitle.includes('database')) bank = TOPIC_BANKS.db;
  else if (lowerId.includes('linux') || lowerTitle.includes('linux')) bank = TOPIC_BANKS.linux;
  else if (lowerId.includes('terraform') || lowerTitle.includes('terraform')) bank = TOPIC_BANKS.terraform;
  else if (lowerId.includes('ansible') || lowerTitle.includes('ansible')) bank = TOPIC_BANKS.ansible;
  else if (lowerId.includes('jenkins') || lowerTitle.includes('jenkins')) bank = TOPIC_BANKS.jenkins;
  else if (lowerId.includes('gitops') || lowerTitle.includes('argo') || lowerTitle.includes('flux')) bank = TOPIC_BANKS.gitops;
  else if (lowerId.includes('sre') || lowerTitle.includes('reliability') || lowerTitle.includes('monitoring') || lowerTitle.includes('observability')) bank = TOPIC_BANKS.sre;
  else if (lowerId.includes('azure') || lowerTitle.includes('azure')) bank = TOPIC_BANKS.azure;
  else if (lowerId.includes('net') || lowerTitle.includes('network')) bank = TOPIC_BANKS.networking;
  else if (lowerId.includes('ai') || lowerTitle.includes('intelligence') || lowerTitle.includes('ml')) bank = TOPIC_BANKS.ai;
  else if (lowerId.includes('prom') || lowerTitle.includes('prometheus') || lowerTitle.includes('promql')) bank = TOPIC_BANKS.prom;

  for (let i = 0; i < total; i++) {
    const m = bank[i % bank.length];
    lessons.push({
      id: `${courseId}-lesson-${i + 1}`,
      title: i === 0 ? `Introduction to ${courseTitle}` : `${courseTitle}: ${m.topic}`,
      content: `\n# ${i === 0 ? `Welcome to ${courseTitle}` : m.topic}\n${m.focus}\n\n## Why It Matters\nUnderstanding ${m.topic.toLowerCase()} is a building block for mastering ${courseTitle}.\n\n## What You'll Practice\n- Run a real command in the interactive sandbox\n- Read the output and reason about it\n- Apply the idea to a representative scenario\n      `,
      task: `Run \`${m.cmd}\` in the sandbox to explore ${m.topic.toLowerCase()}.`,
      demoType: 'terminal' as const,
      demoConfig: {
        initialMessage: `${courseTitle} sandbox ready. Try \`${m.cmd}\`.`,
        availableCommands: [m.cmd.split(' ')[0], 'ls', 'pwd', 'help', 'clear'],
      },
    });
  }
  return lessons;
}
