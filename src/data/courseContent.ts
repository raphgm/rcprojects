import { CourseContent } from '../types/content';
import { generateFallbackLessons } from './lessonGenerator';

export const courseContents: CourseContent[] = [
  {
    courseId: 'linux-basics',
    lessons: [
      {
        id: 'linux-intro',
        title: 'Linux for DevOps Engineers',
        content: `
# Linux: The Foundation of the Cloud
For a DevOps engineer, Linux is not just an OS; it is the substrate upon which all modern infrastructure is built. Whether it is a container, a virtual machine, or a serverless function, understanding the Linux kernel and userland is non-negotiable.

## Why Linux for DevOps?
- **Cloud Dominance**: Over 90% of the world's cloud infrastructure runs on Linux.
- **Containerization**: Technologies like Docker and Kubernetes are built on Linux-native primitives (cgroups, namespaces).
- **Automation Sovereignty**: The Linux shell is the ultimate interface for high-fidelity automation and scripting.

## The DevOps Toolkit
The terminal is your primary workspace. Mastering the command line allows you to orchestrate complex deployments with precision.
        `,
        task: 'Identify your current engineering context by running `whoami` and `uname -a`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Engineering Context Initialized. Verify your identity and kernel version.',
          availableCommands: ['ls', 'pwd', 'whoami', 'uname -a', 'date', 'clear']
        },
        commands: [
          { text: 'whoami', explanation: 'Displays the current user context.' },
          { text: 'uname -a', explanation: 'Provides detailed information about the system kernel and architecture.' },
          { text: 'pwd', explanation: 'Confirms your current working directory in the hierarchy.' }
        ]
      },
      {
        id: 'package-management',
        title: 'Automated Package Management',
        content: `
# Orchestrating Software Lifecycles
In a DevOps workflow, manual installations are a failure. Package managers provide the declarative foundation for automated builds and immutable infrastructure.

## Idempotency in Management
Using package managers like \`apt\`, \`yum\`, or \`apk\` allows you to define the desired state of a system. When integrated into CI/CD pipelines, these tools ensure that every environment is configured identically.

## The DevOps Choice
- **Ubuntu/Debian (apt)**: The standard for most CI/CD runners and application servers.
- **Alpine (apk)**: The lightweight choice for minimized container images, reducing attack surface and build times.
        `,
        task: 'Sync your local package metadata by executing `sudo apt update` or your flavor\'s equivalent.',
        flavorContent: {
          ubuntu: {
            content: `
# APT: The Debian Standard
Most production-grade DevOps pipelines use Ubuntu-based runners. Understanding APT is essential for managing these nodes.
            `,
            task: 'Run `sudo apt update` to refresh the package cache.'
          },
          centos: {
            content: `
# YUM/DNF: Enterprise Management
YUM and DNF are the backbone of RHEL-based systems, commonly used in high-compliance financial and government cloud environments.
            `,
            task: 'Run `sudo yum check-update` to verify system state.'
          },
          alpine: {
            content: `
# APK: Container Optimized
Alpine Linux is the "gold standard" for thin container images. Mastery of APK is critical for minimizing image bloat.
            `,
            task: 'Run `apk update` to refresh the lightweight repository index.'
          }
        },
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Package Manager Initialized. Execute the sync command to begin.',
          availableCommands: ['apt', 'yum', 'dnf', 'apk', 'clear']
        },
        commands: [
          { text: 'sudo apt update', explanation: 'Synchronizes local metadata with remote repositories.' },
          { text: 'sudo apt list --upgradable', explanation: 'Identifies packages requiring maintenance updates.' },
          { text: 'sudo apt install -y curl', explanation: 'Installs the curl utility to facilitate network troubleshooting.' }
        ]
      },
      {
        id: 'file-system',
        title: 'Cloud-Native File Hierarchy',
        content: `
# Navigating the Infrastructure Substrate
Understanding where critical system configurations and logs reside is vital for debugging distributed systems and hardening cloud nodes.

## Critical DevOps Paths
- **/etc**: The "Configuration Layer". This is where your Ansible or Chef scripts will inject system state.
- **/var/log**: The "Observability Layer". Centralized logging agents pull data from here.
- **/proc & /sys**: The "Kernel Interface". Real-time resource monitoring tools like \`top\` or \`Prometheus\` scrape data from these virtual file systems.
        `,
        task: 'Inspect the configuration directory using `cd /etc` and observe the system hierarchy.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Hierarchy Exploration Mode Active. Navigate to the configuration root.',
          availableCommands: ['ls', 'pwd', 'cd', 'mkdir', 'touch', 'clear']
        },
        commands: [
          { text: 'cd /etc', explanation: 'Navigate to the global configuration directory.' },
          { text: 'ls -la', explanation: 'Audit all files, including hidden dotfiles and permissions.' },
          { text: 'cd ~', explanation: 'Return to the home context.' }
        ]
      },
      ...generateFallbackLessons('linux-basics', 'Linux Basics', 98)
    ]
  },
  {
    courseId: 'devops-intro',
    lessons: [
      {
        id: 'devops-engineering-foundations',
        title: 'Modern DevOps Engineering',
        content: `
# Beyond the Buzzword: DevOps Engineering
Modern DevOps is not just "Dev + Ops"; it is the engineering discipline of building, deploying, and operating distributed systems at scale using high-fidelity automation and data-driven feedback loops.

## The Evolution of Delivery
- **Monolithic Silos**: Manual handoffs, snowflake servers, and infrequent, risky deployments.
- **Continuous Delivery**: Automated CI/CD pipelines that treat infrastructure as code (IaC) and deployments as repeatable events.
- **Site Reliability Engineering (SRE)**: Using software engineering practices to solve operational problems, balancing feature velocity with strict availability SLOs.

## Core Engineering Pillars
1. **Infrastructure as Code (IaC)**: Eliminating configuration drift by defining your entire environment in version-controlled manifests.
2. **GitOps & Reconciliation**: Using Git as the single source of truth and automated agents (like ArgoCD) to reconcile the live state with the desired state.
3. **Automated Governance**: Shifting security and compliance "left" by integrating policy engines directly into the delivery pipeline.
4. **Observability & SLIs**: Moving beyond "up/down" monitoring to deep introspection of system health using metrics, logs, and traces.
        `,
        task: 'Initialize your DevOps engineering workspace by verifying the presence of core toolchains (Terraform, Kubectl, and ArgoCD).',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Engineering Workspace Initialized. [Mission 1: Environment Verification]',
          availableCommands: ['terraform --version', 'kubectl version --client', 'argocd version --client', 'ls', 'clear']
        },
        commands: [
          { text: 'terraform --version', explanation: 'Verifies the Infrastructure as Code engine is ready for provisioning.' },
          { text: 'kubectl version --client', explanation: 'Ensures the Kubernetes control plane communicator is active.' },
          { text: 'argocd version --client', explanation: 'Validates the GitOps synchronization utility.' }
        ]
      },
      ...generateFallbackLessons('devops-intro', 'DevOps Engineering', 316)
    ]
  },
  {
    courseId: 'cicd-pipelines',
    lessons: [
      {
        id: 'cicd-foundations',
        title: 'High-Fidelity CI/CD Architectures',
        content: `
# The Pulse of Modern Engineering
A CI/CD pipeline is the central nervous system of any high-velocity engineering team. It transforms manual, error-prone releases into a predictable, automated, and auditable stream of value.

## The "Shift Left" Philosophy
- **Continuous Integration (CI)**: Automatically building and testing code on every commit to identify regressions before they reach the main branch.
- **Continuous Delivery (CD)**: Ensuring that the code is always in a deployable state, with automated staging environments that mirror production.
- **Automated Quality Gates**: Using static analysis (Sonarqube), security scanning (Trivy), and unit tests as mandatory blockers for low-quality code.

## Production-Grade Components
1. **Source Control (Git)**: The trigger for all automated workflows.
2. **Build Stage**: Compiling binaries or building container images in isolated, ephemeral environments.
3. **Verification Stage**: Running the test suite (Unit, Integration, E2E).
4. **Promotion Stage**: Moving artifacts through environments (Dev -> Staging -> Prod) based on automated approval criteria.
        `,
        task: 'Initialize a new CI/CD pipeline configuration by verifying the presence of the Jenkins and GitLab-CI runners.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Pipeline Runner Context Initialized. [Mission 1: Runner Verification]',
          availableCommands: ['jenkins-cli --version', 'git status', 'ls', 'clear']
        },
        commands: [
          { text: 'jenkins-cli --version', explanation: 'Verifies the primary automation controller is reachable.' },
          { text: 'git status', explanation: 'Checks the state of the local repository before triggering a build.' },
          { text: 'ls -R', explanation: 'Inspects the directory structure for pipeline manifest files (Jenkinsfile, .gitlab-ci.yml).' }
        ]
      },
      ...generateFallbackLessons('cicd-pipelines', 'CI/CD Engineering', 29)
    ]
  },
  {
    courseId: 'linux-admin',
    lessons: [
      {
        id: 'sre-user-governance',
        title: 'SRE: Identity & Access Governance',
        content: `
# Managing Human and Machine Identities
In a production-grade DevOps environment, user management is about more than just adding accounts; it is about enforcing the **Principle of Least Privilege (PoLP)** and managing service account lifecycles.

## Identity Primitives
- **Users**: Human operators with specific administrative scopes.
- **Groups**: Role-based access control (RBAC) containers that simplify permission management across large fleets.
- **Service Accounts**: Non-human identities used by CI/CD runners, monitoring agents, and application processes.

## Auditing and Compliance
Every engineering environment must be auditable. Understanding who has access and what they can do is a core requirement for SOC2 and ISO 27001 compliance.
        `,
        task: 'Audit the system identity database by inspecting `/etc/passwd` and identifying non-human service accounts.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Governance Audit Mode. Review system identities.',
          availableCommands: ['useradd', 'ls', 'cat /etc/passwd', 'groups', 'clear']
        },
        commands: [
          { text: 'cat /etc/passwd', explanation: 'Streams the primary identity database to verify active user shells and UIDs.' },
          { text: 'groups', explanation: 'Displays the current user\'s group memberships to verify RBAC alignment.' },
          { text: 'lastlog', explanation: 'Identifies the most recent login events for all system accounts.' }
        ]
      },
      {
        id: 'immutable-permissions',
        title: 'Immutable Resource Permissions',
        content: `
# Security Hardening: Chown & Chmod
Infrastructure as Code ensures that permissions are set correctly during provisioning. However, a DevOps engineer must be able to audit and troubleshoot these settings in real-time.

## The DevOps Security Model
- **Ownership (chown)**: Ensuring that application processes do not run as \`root\`.
- **Permissions (chmod)**: Restricting access to sensitive configuration files and SSH keys.

## Best Practices
- **Never 777**: Avoid broad permissions that allow any user to modify critical binaries or secrets.
- **Sticky Bits**: Use advanced permissions to prevent accidental deletion in shared directories like \`/tmp\`.
        `,
        task: 'Verify the security posture of a deployment manifest by checking its permissions and adjusting ownership.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Security Hardening Sandbox. Audit and restrict file access.',
          availableCommands: ['ls -l', 'chmod', 'chown', 'touch', 'clear']
        },
        commands: [
          { text: 'ls -l', explanation: 'Lists files with detailed metadata, including permission bits and ownership.' },
          { text: 'chmod 600 config.yaml', explanation: 'Restricts a file to be readable and writable only by the owner.' },
          { text: 'chown www-data:www-data index.html', explanation: 'Assigns file ownership to the web service account.' }
        ]
      },
      ...generateFallbackLessons('linux-admin', 'Advanced Administration', 98)
    ]
  },
  {
    courseId: 'iac-terraform',
    lessons: [
      {
        id: 'terraform-foundations',
        title: 'Declarative Infrastructure Engineering',
        content: `
# The IaC Paradigm Shift
Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

## Why Terraform?
- **Declarative State**: You define the *desired state* of your infrastructure, and Terraform handles the complex orchestration required to reach that state.
- **Immutable Infrastructure**: Instead of updating existing resources (and risking configuration drift), Terraform favors replacing resources to ensure a clean, predictable environment.
- **Provider Agnostic**: Orchestrate resources across AWS, Azure, GCP, Kubernetes, and SaaS providers like Cloudflare or Okta using a single, unified syntax (HCL).

## Core Engineering Pillars
1. **Providers**: The translation layer between HCL and the target cloud API.
2. **Resource Graph**: Terraform builds a dependency map to ensure resources are created in the correct order.
3. **State Sovereignty**: The \`terraform.tfstate\` file is the single source of truth that maps your configuration to real-world resources.
4. **Plan & Apply**: A strict two-phase execution model that provides a "speculative run" to audit changes before they are committed.
        `,
        task: 'Initialize your Terraform workspace and inspect the provider ecosystem by running `terraform init`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Terraform CLI Initialized. [Mission 1: Provider Provisioning]',
          availableCommands: ['terraform init', 'terraform plan', 'terraform apply', 'ls', 'clear']
        },
        commands: [
          { text: 'terraform init', explanation: 'Initializes the backend and downloads the required provider plugins.' },
          { text: 'terraform plan', explanation: 'Generates an execution plan, showing exactly what resources will be created, modified, or destroyed.' },
          { text: 'terraform version', explanation: 'Verifies the core engine and active provider versions.' }
        ]
      },
      ...generateFallbackLessons('iac-terraform', 'Terraform Mastery', 99)
    ]
  },
  {
    courseId: 'ansible-config',
    lessons: [
      {
        id: 'ansible-foundations',
        title: 'Orchestrating Idempotent Infrastructure',
        content: `
# The Power of Agentless Automation
Ansible is a powerful configuration management and orchestration engine that allows you to manage thousands of servers using simple, human-readable YAML.

## The Ansible Advantage
- **Agentless Architecture**: Unlike other tools, Ansible requires no software installed on the target nodes. It communicates over standard SSH or WinRM.
- **Idempotency**: Playbooks are designed to be executed multiple times without changing the system unless a change is required to reach the desired state.
- **Declarative YAML**: Describe *what* the system should look like, not *how* to get there.

## Engineering Primitives
1. **Inventory**: A source of truth for your managed hosts, organized into groups and subgroups.
2. **Playbooks**: The top-level orchestration files that map groups of hosts to specific tasks.
3. **Roles**: Modular, reusable units of automation that encapsulate variables, tasks, and templates.
4. **Ansible Vault**: A secure encryption layer for managing sensitive data (passwords, keys) within your playbooks.
        `,
        task: 'Verify your connectivity to the managed node fleet by executing the Ansible ad-hoc ping module.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Ansible Controller Initialized. [Mission 1: Fleet Verification]',
          availableCommands: ['ansible all -m ping', 'ansible-inventory --list', 'ls', 'clear']
        },
        commands: [
          { text: 'ansible all -m ping', explanation: 'Verifies that the controller can reach and authenticate with all managed nodes.' },
          { text: 'ansible-inventory --list', explanation: 'Inspects the active host inventory and group mappings.' },
          { text: 'ansible --version', explanation: 'Checks the installed version and core configuration paths.' }
        ]
      },
      ...generateFallbackLessons('ansible-config', 'Ansible Orchestration', 19)
    ]
  },
  {
    courseId: 'jenkins-mastery',
    lessons: [
      {
        id: 'jenkins-foundations',
        title: 'Architecting Distributed CI/CD Systems',
        content: `
# The Enterprise Automation Standard
Jenkins remains the industry standard for complex, highly-customizable CI/CD workflows. Mastering it requires understanding its distributed, agent-based architecture.

## Core Architectural Pillars
- **Controller/Agent Model**: The Jenkins Controller manages the UI and job scheduling, while ephemeral agents (often running in Docker or Kubernetes) execute the actual build tasks.
- **Pipeline-as-Code (DSL)**: Workflows are defined in a \`Jenkinsfile\` using a Groovy-based Domain Specific Language, ensuring they are version-controlled alongside the application code.
- **Ephemeral Build Environments**: To ensure build isolation and reproducibility, modern Jenkins pipelines leverage containerized agents that are destroyed after the mission completes.

## Engineering Objectives
1. **Mastering the Groovy DSL**: Understanding Declarative vs. Scripted pipeline syntax.
2. **Shared Libraries**: Standardizing pipeline logic across an entire organization to reduce boilerplate and enforce security.
3. **Plugin Governance**: Managing the ecosystem of 1800+ plugins without compromising system stability or security.
4. **Secret Management**: Integrating with HashiCorp Vault or native Jenkins Credentials to secure deployment keys.
        `,
        task: 'Verify the health of the distributed agent pool and inspect the Jenkins controller configuration using the CLI.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Jenkins Management Context Initialized. [Mission 1: Grid Verification]',
          availableCommands: ['jenkins-cli list-nodes', 'jenkins-cli version', 'ls', 'clear']
        },
        commands: [
          { text: 'jenkins-cli list-nodes', explanation: 'Audits the active build agent pool and identifies available capacity.' },
          { text: 'jenkins-cli version', explanation: 'Verifies the core automation engine version and connectivity.' },
          { text: 'cat Jenkinsfile', explanation: 'Inspects the declarative pipeline manifest for the current project.' }
        ]
      },
      ...generateFallbackLessons('jenkins-mastery', 'Jenkins Engineering', 44)
    ]
  },
  {
    courseId: 'k8s-fundamentals',
    lessons: [
      {
        id: 'k8s-intro',
        title: 'Introduction to Kubernetes',
        content: `
# What is Kubernetes?
Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.

## Key Concepts
- **Nodes**: Worker machines in the cluster.
- **Pods**: The smallest deployable units in K8s.
- **Deployments**: Manage the desired state of your pods.
- **Services**: Expose your pods to the network.

## Architecture
- **Control Plane**: Manages the cluster (API Server, Scheduler, etc).
- **Data Plane**: Where the applications run (Kubelet, Kube-proxy).
        `,
        task: 'Check the status of your cluster nodes by running `kubectl get nodes`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Kubernetes cluster ready. Try "kubectl get nodes".',
          availableCommands: ['kubectl get nodes', 'kubectl get pods', 'kubectl cluster-info', 'clear']
        },
        commands: [
          { text: 'kubectl get nodes', explanation: 'List all nodes currently active in the cluster.' },
          { text: 'kubectl cluster-info', explanation: 'Display endpoint information about the control plane and services.' },
          { text: 'kubectl get namespaces', explanation: 'List all isolated namespaces in the cluster.' }
        ]
      },
      ...generateFallbackLessons('k8s-fundamentals', 'Kubernetes Fundamentals', 99)
    ]
  },
  {
    courseId: 'linux-security',
    lessons: [
      {
        id: 'sec-intro',
        title: 'Linux Security Basics',
        content: `
# Securing your Linux System
Security is a multi-layered approach. In Linux, it starts with user permissions and extends to firewalls and encryption.

## Key Security Principles
- **Least Privilege**: Users should only have the permissions they need.
- **Regular Updates**: Keep your system patched.
- **Strong Passwords**: Use complex passwords and SSH keys.
        `,
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Security sandbox initialized.',
          availableCommands: ['ufw status', 'last', 'who', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'linux-networking',
    lessons: [
      {
        id: 'net-intro',
        title: 'Linux Networking Fundamentals',
        content: `
# Networking in Linux
Linux is the backbone of the internet. Understanding how it handles networking is crucial.

## Common Tools
- \`ip\`: Manage network interfaces.
- \`ping\`: Test connectivity.
- \`netstat\` / \`ss\`: View network connections.
        `,
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Networking sandbox initialized.',
          availableCommands: ['ip addr', 'ping -c 4 google.com', 'ss -tulpn', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'linux-storage',
    lessons: [
      {
        id: 'storage-intro',
        title: 'Linux Storage Management',
        content: `
# Managing Storage in Linux
Learn about partitions, filesystems, and logical volume management (LVM).

## Key Concepts
- **Partitions**: Dividing a disk into logical sections.
- **Filesystems**: How data is organized (ext4, xfs).
- **Mounting**: Attaching a filesystem to the directory tree.
        `,
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Storage sandbox initialized.',
          availableCommands: ['df -h', 'lsblk', 'mount', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'linux-performance',
    lessons: [
      {
        id: 'perf-intro',
        title: 'Linux Performance Tuning',
        content: `
# Performance Monitoring and Tuning
Identify bottlenecks in CPU, memory, and I/O.

## Monitoring Tools
- \`top\` / \`htop\`: Real-time process monitoring.
- \`iostat\`: I/O statistics.
- \`vmstat\`: Virtual memory statistics.
        `,
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Performance sandbox initialized.',
          availableCommands: ['top', 'vmstat 1 5', 'iostat', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'linux-kernel',
    lessons: [
      {
        id: 'kernel-intro',
        title: 'Introduction to the Linux Kernel',
        content: `
# The Linux Kernel
The heart of the operating system. It manages hardware and provides services to applications.

## Kernel Modules
- \`lsmod\`: List loaded modules.
- \`modprobe\`: Load or unload modules.
- \`uname -r\`: Check kernel version.
        `,
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Kernel sandbox initialized.',
          availableCommands: ['uname -a', 'lsmod', 'dmesg | tail', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'ai-fundamentals',
    lessons: [
      {
        id: 'ai-intro',
        title: 'Introduction to Artificial Intelligence',
        content: `
# What is Artificial Intelligence?
Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems.

## Key Concepts
- **Machine Learning**: Algorithms that improve through experience.
- **Neural Networks**: Computing systems inspired by biological brains.
- **Deep Learning**: Neural networks with many layers.
- **Generative AI**: AI that can create new content (text, images, code).

## Large Language Models (LLMs)
LLMs like Gemini are trained on vast amounts of text data to understand and generate human-like language.
        `,
        task: 'Ask the AI assistant in the demo below to explain a complex topic in simple terms.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'AI Assistant ready. Type your prompt.',
          availableCommands: ['help', 'clear']
        }
      },
      {
        id: 'prompt-basics',
        title: 'Prompt Engineering Basics',
        content: `
# The Art of Prompting
Prompt Engineering is the process of structuring text that can be interpreted and understood by a generative AI model.

## Effective Prompting Techniques
1. **Be Specific**: Provide clear instructions and context.
2. **Give Examples**: Use few-shot prompting to guide the model.
3. **Set Constraints**: Tell the model what NOT to do.
4. **Iterate**: Refine your prompts based on the output.

## Zero-Shot vs. Few-Shot
- **Zero-Shot**: Asking a question without examples.
- **Few-Shot**: Providing examples to show the desired pattern.
        `,
        task: 'Try writing a prompt that asks the AI to summarize a long text into three bullet points.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Prompt Sandbox. Try different prompting styles.',
          availableCommands: ['help', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'k8s-finops-mastery',
    lessons: [
      {
        id: 'k8s-cost-visibility',
        title: 'Kubernetes Cost Visibility',
        content: `
# Visibility: The First Step in FinOps
In Kubernetes, costs are often hidden behind shared resources. Gaining visibility is the "Inform" phase of the FinOps lifecycle.

## Why Visibility Matters
- **Accountability**: Assign costs to specific teams or projects.
- **Budgeting**: Predict future spending based on current trends.
- **Optimization**: Identify where resources are being wasted.

## Tools for Visibility
- **Kubecost**: Real-time cost monitoring and allocation.
- **Cloud Provider Billing**: Azure Cost Management, Azure Advisor.
- **Prometheus/Grafana**: Custom dashboards for resource usage.
        `,
        task: 'Explore the Kubecost dashboard in the lab to see cost allocation by namespace.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Kubecost API Sandbox. Try querying for cost data.',
          availableCommands: ['curl', 'kubectl', 'helm', 'clear']
        }
      },
      {
        id: 'k8s-resource-optimization',
        title: 'Optimizing Kubernetes Resources',
        content: `
# Optimization: Reducing Waste
Once you have visibility, the next step is the "Optimize" phase. This involves adjusting resources to match actual demand.

## Key Optimization Techniques
1. **Right-sizing**: Adjusting CPU/Memory requests and limits based on actual usage.
2. **Autoscaling**: Using HPA and VPA to scale pods dynamically.
3. **Resource Quotas**: Enforcing boundaries at the namespace level.
4. **Spot Instances**: Using cheaper, preemptible nodes for non-critical workloads.

## Resource Quotas and LimitRanges
- **ResourceQuotas**: Limit the total resources a namespace can consume.
- **LimitRanges**: Enforce default and max/min resource settings for individual pods.
        `,
        task: 'Apply a ResourceQuota to the "dev" namespace and verify it is enforced.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Kubernetes Optimization Sandbox. Try applying quotas.',
          availableCommands: ['kubectl', 'apply', 'describe', 'clear']
        }
      }
    ]
  },
  {
    courseId: 'devops-k8s',
    lessons: [
      {
        id: 'k8s-devops-foundations',
        title: 'Kubernetes Architecture for SREs',
        content: `
# Orchestration at the Edge
Kubernetes (K8s) is the de facto operating system of the cloud. For DevOps engineers, K8s is not just about running containers; it is about declarative state, automated reconciliation, and resilient distributed systems.

## The Control Plane Architecture
- **kube-apiserver**: The central nervous system. All communication flows through this REST API.
- **etcd**: The highly-available key-value store that acts as the single source of truth for cluster state.
- **kube-scheduler**: Determines which node a pod should run on based on resource availability and constraints.
- **kube-controller-manager**: Runs control loops that regulate the state of the cluster (e.g., node controller, replicaset controller).

## The Data Plane
- **kubelet**: The primary node agent that ensures containers are running in a Pod.
- **kube-proxy**: Maintains network rules on nodes, allowing network communication to your Pods from network sessions inside or outside of your cluster.
        `,
        task: 'Initialize your Kubernetes engineering context by validating the control plane health and verifying node availability.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'K8s Cluster Initialized. [Mission 1: Control Plane Verification]',
          availableCommands: ['kubectl get nodes', 'kubectl cluster-info', 'kubectl get componentstatuses', 'clear']
        },
        commands: [
          { text: 'kubectl cluster-info', explanation: 'Identifies the API server endpoint and core services.' },
          { text: 'kubectl get nodes -o wide', explanation: 'Verifies worker node readiness and IP allocations.' },
          { text: 'kubectl get componentstatuses', explanation: 'Audits the health of the etcd and scheduler subsystems.' }
        ]
      },
      ...generateFallbackLessons('devops-k8s', 'Kubernetes for DevOps Engineers', 34)
    ]
  },
  {
    courseId: 'sre-fundamentals',
    lessons: [
      {
        id: 'sre-foundations',
        title: 'SLIs, SLOs & Error Budgets',
        content: `
# Engineering Reliability as a Feature
Site Reliability Engineering (SRE) originated at Google as the practice of applying software engineering discipline to infrastructure and operations. The central insight: **reliability is a product feature**, and it must be quantified, budgeted, and traded off against velocity.

## The SRE Reliability Hierarchy

### Service Level Indicators (SLIs)
An SLI is a carefully defined quantitative measure of some aspect of the level of service provided. The most common SLIs:
- **Availability**: \`successful_requests / total_requests\`
- **Latency**: \`requests_under_300ms / total_requests\`
- **Throughput**: Requests per second served successfully
- **Error Rate**: \`5xx_responses / total_responses\`

### Service Level Objectives (SLOs)
An SLO is a target value or range of values for an SLI. Example: *"99.9% of requests must complete in under 300ms over a 28-day rolling window."*

### Error Budgets
The error budget is the inverse of your SLO. If your SLO is 99.9%, your error budget is **0.1% downtime** (~43 minutes/month). When the budget is exhausted, you halt feature releases and focus on reliability.

## The SRE Operational Toolkit
- **prometheus**: Metric collection and alerting engine
- **alertmanager**: Routes alerts to on-call channels (PagerDuty, Slack)
- **promtool**: CLI for validating Prometheus configs and rules
- **logcli**: Query Loki for distributed log aggregation
        `,
        task: 'Validate your observability stack by checking your Prometheus configuration and querying your current SLI metrics.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'SRE Observability Stack Initialized. [Mission 1: Baseline Instrumentation]',
          availableCommands: ['prometheus --version', 'promtool check config prometheus.yml', 'alertmanager --version', 'logcli version', 'clear']
        },
        commands: [
          { text: 'promtool check config prometheus.yml', explanation: 'Validates the scrape config and alerting rules for syntax errors before hot-reload.' },
          { text: 'prometheus --version', explanation: 'Verifies the monitoring engine version and confirms the binary is present.' },
          { text: 'alertmanager --version', explanation: 'Checks the alerting pipeline is configured and ready to route on-call notifications.' }
        ]
      },
      {
        id: 'sre-incident-response',
        title: 'Incident Response & Postmortems',
        content: `
# When Things Break at 3am
A mature SRE practice treats incidents as learning opportunities. The goal is not to prevent all failures (impossible), but to detect them fast, recover quickly, and prevent recurrence.

## The Incident Lifecycle

### 1. Detection
Automated alerting triggers when an SLI breaches its threshold. An alert should be **actionable** — if it wakes someone up and there is nothing they can do, it is a bug in your alerting, not a real incident.

### 2. Triage (Is this an incident?)
Use the **STAR framework**: Severity, Time-to-impact, Affected users, Response required.

### 3. Mitigation (Stop the bleeding)
The first goal is to restore service, not to find the root cause. Rollback, reroute traffic, or apply a hotfix.

### 4. Resolution & Postmortem
A **blameless postmortem** documents the timeline, root cause, and action items. The emphasis is on **systemic fixes**, not individual blame.

## Key Metrics (DORA)
- **MTTR** (Mean Time to Recover): How quickly can you restore service?
- **MTTD** (Mean Time to Detect): How fast does your alerting fire?
- **Change Failure Rate**: What percentage of deployments cause incidents?
        `,
        task: 'Inspect the active alert queue and identify any firing alerts that require immediate triage.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Incident Response Console. Check active alert status.',
          availableCommands: ['curl http://localhost:9093/api/v2/alerts', 'promtool check rules alerts.yml', 'logcli query', 'clear']
        },
        commands: [
          { text: 'curl http://localhost:9093/api/v2/alerts', explanation: 'Queries the Alertmanager API for all currently firing alerts.' },
          { text: 'promtool check rules alerts.yml', explanation: 'Validates the syntax and logic of alerting rules before applying them.' },
          { text: 'logcli query \'{level="error"}\' --limit 20', explanation: 'Streams the most recent error-level logs to assist with triage.' }
        ]
      },
      ...generateFallbackLessons('sre-fundamentals', 'Site Reliability Engineering', 23)
    ]
  },
  {
    courseId: 'devops-monitoring',
    lessons: [
      {
        id: 'observability-triad',
        title: 'The Observability Triad: Metrics, Logs & Traces',
        content: `
# Full-Stack Observability Engineering
In a distributed system, you cannot rely on a developer sitting at a terminal watching a running process. Observability is the discipline of instrumenting systems so they can be understood entirely from their external outputs.

## The Three Pillars

### 1. Metrics (Prometheus + Grafana)
Metrics are numeric measurements sampled over time. They are the most efficient way to track aggregate system health.
- **Counters**: Always increase (e.g., \`http_requests_total\`)
- **Gauges**: Can go up or down (e.g., \`memory_usage_bytes\`)
- **Histograms**: Track distribution of values (e.g., request latency buckets)

### 2. Logs (Loki / ELK Stack)
Logs provide the detailed, event-level narrative of what happened and when. In a K8s environment, logs are streamed from pod stdout/stderr and aggregated by agents like Promtail or Fluentd.

### 3. Traces (Jaeger / Tempo)
A distributed trace follows a single request as it travels through multiple microservices. Each unit of work is a **span**, and the collection of spans forms a **trace**. Traces are critical for identifying latency bottlenecks in complex systems.

## The Stack in Practice
- **Prometheus**: Scrapes metrics from exporters every 15s
- **Grafana**: Visualizes metrics with configurable dashboards and alerts
- **Loki**: Log aggregation queried via \`logcli\`
- **Jaeger**: Distributed tracing UI and query API
        `,
        task: 'Initialize the observability stack by verifying all three pillars — check Prometheus metrics, query Loki logs, and inspect the Jaeger tracing endpoint.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Observability Stack Initialized. [Mission 1: Full-Stack Instrumentation Audit]',
          availableCommands: ['prometheus --version', 'promtool check config prometheus.yml', 'logcli version', 'curl http://localhost:16686/api/services', 'clear']
        },
        commands: [
          { text: 'promtool check config prometheus.yml', explanation: 'Validates the metric scrape configuration and alerting rules before reload.' },
          { text: 'logcli version', explanation: 'Verifies the Loki query CLI is available for log streaming.' },
          { text: 'curl http://localhost:16686/api/services', explanation: 'Queries the Jaeger API to list all traced services in the environment.' }
        ]
      },
      {
        id: 'prometheus-alerting',
        title: 'Alerting Rules & PromQL Engineering',
        content: `
# Turning Metrics Into Actionable Alerts
A metric is useless without an alert. PromQL (Prometheus Query Language) is what transforms raw time-series data into SLI dashboards and on-call triggers.

## PromQL Fundamentals
- **Instant Vector**: \`up\` — Returns the current value of the \`up\` metric for all targets
- **Range Vector**: \`rate(http_requests_total[5m])\` — Computes per-second request rate over 5 minutes
- **Aggregation**: \`sum(rate(http_requests_total[5m])) by (service)\` — Groups rate by service label

## Writing High-Quality Alert Rules
A good alert rule has four properties:
1. **Accuracy**: It fires only when something is actually wrong
2. **Actionability**: The on-call engineer knows what to do
3. **Context**: Labels provide enough information to triage
4. **Deduplication**: Routing in Alertmanager prevents alert storms

\`\`\`yaml
# Example: SLO Breach Alert
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
  for: 5m
  labels:
    severity: page
  annotations:
    summary: "Error rate above 1% SLO threshold"
\`\`\`
        `,
        task: 'Validate your alerting rule file and check whether any rules are currently in a firing or pending state.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'PromQL & Alerting Sandbox. Validate your rules and query metrics.',
          availableCommands: ['promtool check rules alerts.yml', 'curl http://localhost:9090/api/v1/alerts', 'promtool query instant http://localhost:9090 up', 'clear']
        },
        commands: [
          { text: 'promtool check rules alerts.yml', explanation: 'Parses the alerting rule YAML and reports any syntax or logic errors.' },
          { text: 'curl http://localhost:9090/api/v1/alerts', explanation: 'Queries the Prometheus API for all currently active alerts and their state.' },
          { text: 'promtool query instant http://localhost:9090 up', explanation: 'Executes an instant PromQL query to verify target scrape health.' }
        ]
      },
      ...generateFallbackLessons('devops-monitoring', 'Monitoring & Observability', 18)
    ]
  },
  {
    courseId: 'devsecops-pipeline',
    lessons: [
      {
        id: 'devsecops-shift-left',
        title: 'Shift-Left Security: The DevSecOps Philosophy',
        content: `
# Security Is an Engineering Problem
Traditional security was a gate at the end of the delivery pipeline — a final audit before release. This model is incompatible with the velocity of modern DevOps. **DevSecOps** embeds security at every stage of the development lifecycle, treating it as code, not bureaucracy.

## The "Shift Left" Principle
"Shifting left" means moving security verification earlier in the pipeline, where fixes are **10x cheaper** and faster:
- **Pre-commit**: Git hooks running \`gitleaks\` or \`detect-secrets\` to prevent credential exposure
- **Build Stage**: SAST scanning with \`Semgrep\` or \`SonarQube\`
- **Artefact Stage**: Container image scanning with \`Trivy\` or \`Grype\`
- **Deployment Stage**: IaC scanning with \`Checkov\` and runtime threat detection with \`Falco\`

## The DevSecOps Toolchain
| Stage | Tool | Purpose |
|---|---|---|
| Code | Semgrep | Static analysis for security patterns |
| Dependencies | Snyk / OWASP | Software composition analysis (SCA) |
| Container | Trivy | CVE scanning for images and filesystems |
| IaC | Checkov | Misconfiguration detection in Terraform/K8s |
| Runtime | Falco | Kernel-level threat detection in containers |
| Secrets | Gitleaks | Prevent credential leaks before commit |
        `,
        task: 'Initialize your DevSecOps toolchain by verifying all scanning utilities are available and operational.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'DevSecOps Pipeline Initialized. [Mission 1: Security Toolchain Verification]',
          availableCommands: ['trivy --version', 'snyk --version', 'checkov --version', 'gitleaks version', 'semgrep --version', 'clear']
        },
        commands: [
          { text: 'trivy --version', explanation: 'Verifies the container and filesystem vulnerability scanner is ready.' },
          { text: 'checkov --version', explanation: 'Confirms the IaC misconfiguration scanner is installed for Terraform and K8s audits.' },
          { text: 'gitleaks version', explanation: 'Validates the secret detection tool is active to prevent credential leaks in commits.' }
        ]
      },
      {
        id: 'devsecops-scanning',
        title: 'SAST, SCA & Container Scanning in CI/CD',
        content: `
# Automating Security Gates in Your Pipeline
Security scanning must be automated, not manual. Every pull request should trigger a suite of security checks that act as mandatory quality gates — a build that fails a critical CVE check should not be promoted.

## Static Application Security Testing (SAST)
SAST analyses source code **without executing it**, identifying insecure coding patterns:
- SQL injection vulnerabilities
- Hardcoded credentials
- Insecure cryptographic functions
- Path traversal risks

\`\`\`bash
# Scan a Python codebase for security issues
semgrep --config=p/python-security ./src
\`\`\`

## Software Composition Analysis (SCA)
SCA inventories your third-party dependencies and maps them against the **National Vulnerability Database (NVD)**:
\`\`\`bash
# Check for CVEs in project dependencies
snyk test --severity-threshold=high
\`\`\`

## Container Image Scanning
Before pushing an image to a registry, scan all OS packages and application libraries:
\`\`\`bash
# Scan a container image for critical vulnerabilities
trivy image --exit-code 1 --severity CRITICAL nginx:latest
\`\`\`
The \`--exit-code 1\` flag ensures the pipeline **fails** if critical CVEs are found, making this a true security gate.
        `,
        task: 'Run a full security scan of a container image and check the IaC manifests for misconfigurations.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Security Scanning Pipeline Active. [Mission 2: Automated Vulnerability Audit]',
          availableCommands: ['trivy image nginx:latest', 'trivy fs .', 'checkov -d .', 'snyk test', 'semgrep --version', 'clear']
        },
        commands: [
          { text: 'trivy image nginx:latest', explanation: 'Scans the nginx container image for known OS and library CVEs.' },
          { text: 'checkov -d .', explanation: 'Audits all Terraform and Kubernetes YAML files in the current directory for security misconfigurations.' },
          { text: 'trivy fs .', explanation: 'Scans the local filesystem for vulnerabilities in application dependencies.' }
        ]
      },
      ...generateFallbackLessons('devsecops-pipeline', 'DevSecOps Engineering', 28)
    ]
  },
  {
    courseId: 'gitops-argo-flux',
    lessons: [
      {
        id: 'gitops-declarative-state',
        title: 'Git as the Single Source of Truth',
        content: `
# GitOps: Declarative Desired-State Management
GitOps is an operational framework where Git is the single source of truth for both application code **and** infrastructure state. Instead of running imperative commands against a cluster, you commit declarative manifests to a repository, and an automated agent ensures the live environment matches.

## Why GitOps?
- **Auditability**: Every change is a Git commit with an author, timestamp, and diff.
- **Rollback**: Reverting infrastructure is as simple as \`git revert\`.
- **Security**: No direct \`kubectl\` access needed — the reconciliation agent handles it.
- **Consistency**: Drift between desired and actual state is automatically detected and corrected.

## The Two GitOps Models

### Push-based (Traditional CI/CD)
The pipeline pushes changes to the cluster after build. Requires cluster credentials in the CI system.

### Pull-based (ArgoCD / Flux)
An in-cluster agent continuously watches the Git repo and **pulls** changes into the cluster. No external system needs cluster access.

## Core Tools
- **ArgoCD**: Declarative application delivery with a rich UI and RBAC
- **Flux**: Lightweight, composable GitOps toolkit from the CNCF
        `,
        task: 'Initialize the GitOps control plane by verifying both ArgoCD and Flux are operational and connected to the target cluster.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'GitOps Control Plane Initialized. [Mission 1: Reconciliation Engine Verification]',
          availableCommands: ['argocd version --client', 'argocd app list', 'flux version', 'flux get kustomizations', 'kubectl get ns argocd', 'clear']
        },
        commands: [
          { text: 'argocd version --client', explanation: 'Verifies the ArgoCD CLI is installed and reports the client version.' },
          { text: 'flux version', explanation: 'Confirms the Flux CLI and its in-cluster controllers are running.' },
          { text: 'kubectl get ns argocd', explanation: 'Validates that the ArgoCD namespace exists in the target cluster.' }
        ]
      },
      {
        id: 'gitops-argocd-sync',
        title: 'ArgoCD Application Synchronization',
        content: `
# Managing Applications with ArgoCD
In ArgoCD, an "Application" is a custom resource that maps a Git repository path to a Kubernetes namespace. ArgoCD continuously compares the **desired state** (Git) with the **live state** (cluster) and reports the sync status.

## Application Sync States
- **Synced**: The live state matches Git — everything is healthy.
- **OutOfSync**: Someone made a manual change, or a new commit hasn't been applied yet.
- **Unknown**: ArgoCD cannot determine the state (usually a connectivity issue).

## Sync Strategies
1. **Manual Sync**: An operator explicitly triggers reconciliation.
2. **Auto-Sync**: ArgoCD automatically applies any new Git commits.
3. **Self-Heal**: If someone makes a manual \`kubectl\` change, ArgoCD reverts it to match Git.

## Practical Workflow
\`\`\`bash
# Create an ArgoCD Application pointing to a Git repo
argocd app create web-app \\
  --repo https://github.com/org/k8s-manifests.git \\
  --path apps/web \\
  --dest-server https://kubernetes.default.svc \\
  --dest-namespace production

# Trigger a sync
argocd app sync web-app

# Check sync and health status
argocd app get web-app
\`\`\`
        `,
        task: 'List the current ArgoCD applications, identify any that are OutOfSync, and trigger a reconciliation.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'ArgoCD Application Manager. [Mission 2: Sync Reconciliation]',
          availableCommands: ['argocd app list', 'argocd app get web-app', 'argocd app sync web-app', 'argocd app diff web-app', 'clear']
        },
        commands: [
          { text: 'argocd app list', explanation: 'Lists all registered applications and their current sync/health status.' },
          { text: 'argocd app sync web-app', explanation: 'Triggers a reconciliation to bring the live cluster state in line with Git.' },
          { text: 'argocd app diff web-app', explanation: 'Shows the exact differences between the Git manifests and the live cluster resources.' }
        ]
      },
      ...generateFallbackLessons('gitops-argo-flux', 'GitOps Engineering', 20)
    ]
  },
  {
    courseId: 'pulumi-automation',
    lessons: [
      {
        id: 'pulumi-foundations',
        title: 'IaC with Real Programming Languages',
        content: `
# Beyond HCL: Infrastructure in TypeScript, Python & Go
Pulumi is a modern Infrastructure as Code platform that lets you define cloud resources using **general-purpose programming languages** instead of domain-specific configuration languages like HCL or YAML.

## Why Pulumi?
- **Full Language Power**: Use loops, conditionals, functions, classes, and package managers you already know.
- **Type Safety**: Catch misconfigurations at compile time, not at \`apply\` time.
- **Testing**: Write unit tests for your infrastructure using standard testing frameworks (Jest, pytest, Go testing).
- **Reusability**: Publish infrastructure components as npm packages, PyPI modules, or Go modules.

## Pulumi vs Terraform
| Feature | Pulumi | Terraform |
|---|---|---|
| Language | TypeScript, Python, Go, C#, Java | HCL (proprietary DSL) |
| State | Managed (Pulumi Cloud) or self-hosted | Remote backend (S3, Azure Blob) |
| Testing | Native unit/integration tests | Limited (Terratest external) |
| IDE Support | Full IntelliSense, type checking | Basic HCL syntax highlighting |

## Core Concepts
1. **Projects**: A directory with a \`Pulumi.yaml\` manifest
2. **Stacks**: Environment-specific instances (dev, staging, prod)
3. **Resources**: Cloud objects declared as code (\`new aws.s3.Bucket()\`)
4. **Outputs**: Values exported for use by other stacks or downstream systems
        `,
        task: 'Initialize a new Pulumi project and verify your cloud provider credentials are configured.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Pulumi CLI Initialized. [Mission 1: Project Bootstrapping]',
          availableCommands: ['pulumi version', 'pulumi new', 'pulumi stack ls', 'pulumi config', 'ls', 'clear']
        },
        commands: [
          { text: 'pulumi version', explanation: 'Verifies the Pulumi CLI is installed and reports the engine version.' },
          { text: 'pulumi stack ls', explanation: 'Lists all available stacks (environments) for the current project.' },
          { text: 'pulumi config', explanation: 'Displays the configuration values for the active stack, including cloud provider settings.' }
        ]
      },
      {
        id: 'pulumi-stacks-state',
        title: 'Stack Management & State Operations',
        content: `
# Managing Environments with Pulumi Stacks
Each Pulumi stack represents an isolated deployment of your infrastructure — typically mapped to environments like \`dev\`, \`staging\`, and \`prod\`. Unlike Terraform workspaces, Pulumi stacks are first-class citizens with their own configuration and secrets.

## Stack Lifecycle
\`\`\`bash
# Create a new stack
pulumi stack init staging

# Switch between stacks
pulumi stack select prod

# Preview changes before applying
pulumi preview

# Deploy the infrastructure
pulumi up

# Tear down all resources
pulumi destroy
\`\`\`

## State Management
Pulumi state can be stored in:
- **Pulumi Cloud** (default): Managed backend with encryption, history, and RBAC
- **Self-managed**: S3, Azure Blob, GCS, or local filesystem

## Secrets Encryption
Pulumi encrypts secrets in state by default. You can use:
- Pulumi Cloud encryption (default)
- AWS KMS, Azure Key Vault, GCP KMS
- Passphrase-based encryption for local development

\`\`\`bash
# Set a secret configuration value
pulumi config set --secret dbPassword SuperSecret123

# View the encrypted config
pulumi config
\`\`\`
        `,
        task: 'Create a new stack, preview the infrastructure changes, and inspect the current state.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Stack Management Console. [Mission 2: Multi-Environment Orchestration]',
          availableCommands: ['pulumi stack ls', 'pulumi stack init dev', 'pulumi preview', 'pulumi up', 'pulumi stack export', 'clear']
        },
        commands: [
          { text: 'pulumi preview', explanation: 'Generates a detailed execution plan showing resources to be created, updated, or deleted.' },
          { text: 'pulumi stack export', explanation: 'Exports the current stack state for backup or migration purposes.' },
          { text: 'pulumi config set --secret dbPassword test123', explanation: 'Stores an encrypted secret in the stack configuration.' }
        ]
      },
      ...generateFallbackLessons('pulumi-automation', 'Pulumi IaC Mastery', 26)
    ]
  }
];
