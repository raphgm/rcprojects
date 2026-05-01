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
  else if (lowerId.includes('azure') || lowerTitle.includes('azure')) bank = TOPIC_BANKS.azure;
  else if (lowerId.includes('net') || lowerTitle.includes('network')) bank = TOPIC_BANKS.networking;
  else if (lowerId.includes('ai') || lowerTitle.includes('intelligence') || lowerTitle.includes('ml')) bank = TOPIC_BANKS.ai;

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
