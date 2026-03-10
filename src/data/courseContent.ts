import { CourseContent } from '../types/content';

export const courseContents: CourseContent[] = [
  {
    courseId: 'linux-basics',
    lessons: [
      {
        id: 'linux-intro',
        title: 'Introduction to Linux',
        content: `
# What is Linux?
Linux is an open-source operating system kernel that serves as the foundation for many distributions like Ubuntu, CentOS, and Debian.

## Key Features
- **Open Source**: Anyone can view and modify the source code.
- **Multi-user**: Multiple users can access the system simultaneously.
- **Multi-tasking**: Can run multiple processes at once.
- **Secure**: Built-in security features and permissions.

## The Command Line
The terminal is where the magic happens in Linux. You interact with the system using commands.
        `,
        task: 'Explore the system by running `ls` to list files and `pwd` to see your current directory.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Welcome to the Linux Sandbox! Try typing "ls" or "pwd".',
          availableCommands: ['ls', 'pwd', 'whoami', 'date', 'clear']
        }
      },
      {
        id: 'package-management',
        title: 'Package Management',
        content: `
# Package Management in Linux
Linux distributions use package managers to install, update, and remove software. The commands differ depending on the "flavor" of Linux you are using.

## Popular Package Managers
- **Ubuntu/Debian**: Uses \`apt\`
- **CentOS/RHEL**: Uses \`yum\` or \`dnf\`
- **Alpine**: Uses \`apk\`

## Common Operations
- **Update lists**: \`apt update\` / \`yum check-update\` / \`apk update\`
- **Install package**: \`apt install\` / \`yum install\` / \`apk add\`
- **Remove package**: \`apt remove\` / \`yum remove\` / \`apk del\`
        `,
        task: 'Try updating your package lists using the appropriate command for your current flavor.',
        flavorContent: {
          ubuntu: {
            content: `
# Package Management (Ubuntu)
Ubuntu uses the **Advanced Package Tool (APT)**.

## Key Commands
- \`sudo apt update\`: Refresh package lists.
- \`sudo apt install <package>\`: Install new software.
- \`sudo apt upgrade\`: Update all installed packages.
            `,
            task: 'Run `apt update` to refresh your package repositories.'
          },
          centos: {
            content: `
# Package Management (CentOS)
CentOS uses **YUM (Yellowdog Updater, Modified)** or **DNF**.

## Key Commands
- \`sudo yum check-update\`: Check for available updates.
- \`sudo yum install <package>\`: Install new software.
- \`sudo yum update\`: Update all installed packages.
            `,
            task: 'Run `yum check-update` to see available package updates.'
          },
          alpine: {
            content: `
# Package Management (Alpine)
Alpine uses the **Alpine Package Keeper (APK)**.

## Key Commands
- \`apk update\`: Refresh package lists.
- \`apk add <package>\`: Install new software.
- \`apk upgrade\`: Update all installed packages.
            `,
            task: 'Run `apk update` to refresh your package repositories.'
          },
          rhel: {
            content: `
# Package Management (RHEL)
Red Hat Enterprise Linux (RHEL) uses **DNF (Dandified YUM)** or **YUM**.

## Key Commands
- \`sudo dnf check-update\`: Check for available updates.
- \`sudo dnf install <package>\`: Install new software.
- \`sudo dnf upgrade\`: Update all installed packages.
            `,
            task: 'Run `dnf check-update` to see available package updates on RHEL.'
          }
        },
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Try using your flavor\'s package manager (apt, yum, or apk).',
          availableCommands: ['apt', 'yum', 'dnf', 'apk', 'clear']
        }
      },
      {
        id: 'file-system',
        title: 'Navigating the File System',
        content: `
# Linux File System Hierarchy
Everything in Linux is a file. The root directory is denoted by \`/\`.

## Common Directories
- \`/bin\`: Essential user binaries.
- \`/etc\`: System configuration files.
- \`/home\`: User home directories.
- \`/var\`: Variable data files (logs, etc).

## Navigation Commands
- \`pwd\`: Print Working Directory.
- \`ls\`: List directory contents.
- \`cd\`: Change directory.
        `,
        task: 'Navigate to the `/etc` directory using `cd /etc` and list its contents with `ls`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Try navigating the file system using "cd" and "ls".',
          availableCommands: ['ls', 'pwd', 'cd', 'mkdir', 'touch', 'clear']
        }
      },
      // Programmatically generate 98 more lessons for Linux Basics
      ...Array.from({ length: 98 }, (_, i) => ({
        id: `linux-ext-${i + 1}`,
        title: `Linux Mastery: Part ${i + 3}`,
        content: `
# Advanced Linux Concept ${i + 3}
This lesson covers advanced administration and engineering topics in the Linux ecosystem.

## Topics Covered
- System Optimization
- Kernel Tuning
- Advanced Shell Scripting
- Network Hardening
- Performance Monitoring

Continue your journey to becoming a Linux Power User.
        `,
        task: `Execute \`top\` to monitor system processes and press 'q' to exit.`,
        demoType: 'terminal' as const,
        demoConfig: {
          initialMessage: `Lesson ${i + 3} Sandbox ready.`,
          availableCommands: ['ls', 'pwd', 'top', 'ps', 'df', 'free', 'clear']
        }
      }))
    ]
  },
  {
    courseId: 'devops-intro',
    lessons: [
      {
        id: 'devops-concepts',
        title: 'Core DevOps Concepts',
        content: `
# What is DevOps?
DevOps is a set of practices that combines software development (Dev) and IT operations (Ops).

## The Goal
To shorten the systems development life cycle and provide continuous delivery with high software quality.

## Key Pillars
1. **Culture**: Collaboration and shared responsibility.
2. **Automation**: CI/CD, IaC, and automated testing.
3. **Measurement**: Monitoring and logging.
4. **Sharing**: Open communication and feedback loops.
        `,
        task: 'Review the mock pipeline status in the cloud console demo below.',
        cloudContent: {
          aws: {
            content: `
# DevOps on AWS
AWS provides a robust set of tools for DevOps, including CodePipeline, CodeBuild, and CodeDeploy.

## Key Services
- **AWS CodePipeline**: Continuous delivery service.
- **AWS CodeBuild**: Fully managed build service.
- **AWS CodeDeploy**: Automated software deployment.
            `,
            task: 'Explore the AWS CodePipeline status in the sandbox.'
          },
          gcp: {
            content: `
# DevOps on Google Cloud
Google Cloud Platform (GCP) offers Cloud Build and Cloud Deploy for modern CI/CD.

## Key Services
- **Cloud Build**: Serverless CI/CD platform.
- **Cloud Deploy**: Managed CD service for GKE and Cloud Run.
- **Artifact Registry**: Store and manage build artifacts.
            `,
            task: 'Check the Google Cloud Build logs in the sandbox.'
          },
          azure: {
            content: `
# DevOps on Microsoft Azure
Azure DevOps provides a comprehensive suite of services for the entire lifecycle.

## Key Services
- **Azure Pipelines**: CI/CD that works with any language and platform.
- **Azure Repos**: Private Git repositories.
- **Azure Artifacts**: Package management for Maven, npm, and NuGet.
            `,
            task: 'Review the Azure Pipeline execution status.'
          }
        },
        demoType: 'cloud-console',
        demoConfig: {
          service: 'CI/CD Pipeline',
          mockData: {
            pipelineName: 'Production-Deploy',
            status: 'In Progress',
            stages: ['Source', 'Build', 'Test', 'Deploy']
          }
        }
      },
      // Programmatically generate 99 more lessons for DevOps Introduction
      ...Array.from({ length: 99 }, (_, i) => ({
        id: `devops-ext-${i + 1}`,
        title: `DevOps Engineering: Module ${i + 2}`,
        content: `
# Advanced DevOps Practice ${i + 2}
This module dives deep into modern DevOps engineering practices, focusing on automation, scalability, and reliability.

## Key Focus Areas
- Infrastructure as Code (Terraform, CloudFormation)
- Configuration Management (Ansible, Chef)
- Monitoring & Observability (Prometheus, ELK)
- Security Integration (DevSecOps)
- Site Reliability Engineering (SRE) principles

Building resilient and scalable systems for the modern cloud.
        `,
        demoType: 'cloud-console' as const,
        demoConfig: {
          provider: 'AWS' as const,
          service: 'CloudWatch',
          mockData: {
            metrics: ['CPU Utilization', 'Memory Usage', 'Request Count', 'Error Rate'],
            status: 'Healthy'
          }
        }
      }))
    ]
  },
  {
    courseId: 'linux-admin',
    lessons: [
      {
        id: 'user-mgmt',
        title: 'User and Group Management',
        content: `
# Managing Users in Linux
Linux is a multi-user system. Managing access is critical for security.

## Key Commands
- \`useradd\`: Create a new user.
- \`usermod\`: Modify user account.
- \`userdel\`: Delete a user.
- \`passwd\`: Change user password.

## Groups
Groups allow you to manage permissions for multiple users at once.
- \`groupadd\`: Create a group.
- \`gpasswd\`: Manage group members.
        `,
        task: 'Check the current users on the system by running `cat /etc/passwd`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Try creating a user or checking /etc/passwd.',
          availableCommands: ['useradd', 'ls', 'cat /etc/passwd', 'groups', 'clear']
        }
      },
      {
        id: 'permissions',
        title: 'Understanding Permissions',
        content: `
# Linux Permissions (chmod, chown)
Every file has an owner and a group, and three types of permissions: Read (r), Write (w), and Execute (x).

## Permission Levels
1. **User (u)**: The owner of the file.
2. **Group (g)**: Users in the file's group.
3. **Others (o)**: Everyone else.

## Numeric Notation
- 4: Read
- 2: Write
- 1: Execute
Example: \`chmod 755 file\` (rwxr-xr-x)
        `,
        task: 'Create a new file with `touch testfile` and then check its permissions with `ls -l testfile`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Check permissions with "ls -l".',
          availableCommands: ['ls -l', 'chmod', 'chown', 'touch', 'clear']
        }
      },
      // Programmatically generate 98 more lessons for System Administration
      ...Array.from({ length: 98 }, (_, i) => ({
        id: `admin-ext-${i + 1}`,
        title: `Advanced Administration: Part ${i + 3}`,
        content: `
# Advanced Linux Administration ${i + 3}
This lesson covers enterprise-grade system administration tasks, focusing on automation, security, and high availability.

## Topics Covered
- PAM (Pluggable Authentication Modules)
- SELinux / AppArmor Policies
- Advanced LVM & RAID Management
- System Auditing with Auditd
- Kernel Patching & Livepatch

Master the skills required for senior Linux administrator roles.
        `,
        demoType: 'terminal' as const,
        demoConfig: {
          initialMessage: `Admin Lesson ${i + 3} Sandbox ready.`,
          availableCommands: ['ls', 'pwd', 'sestatus', 'auditctl', 'clear']
        }
      }))
    ]
  },
  {
    courseId: 'iac-terraform',
    lessons: [
      {
        id: 'terraform-intro',
        title: 'Introduction to Terraform',
        content: `
# What is Terraform?
Terraform is an open-source Infrastructure as Code (IaC) tool created by HashiCorp.

## Key Concepts
- **Providers**: Plugins that interact with cloud APIs (AWS, Azure, GCP).
- **Resources**: The components of your infrastructure (EC2, S3, VPC).
- **State**: A record of your managed infrastructure.
- **Variables**: Make your configurations reusable.

## The Workflow
1. \`terraform init\`: Initialize the working directory.
2. \`terraform plan\`: Preview changes.
3. \`terraform apply\`: Execute the changes.
        `,
        task: 'Initialize your Terraform project by running `terraform init`.',
        demoType: 'terminal',
        demoConfig: {
          initialMessage: 'Terraform CLI initialized. Try "terraform init".',
          availableCommands: ['terraform init', 'terraform plan', 'terraform apply', 'ls', 'clear']
        }
      },
      // Programmatically generate 99 more lessons for Terraform
      ...Array.from({ length: 99 }, (_, i) => ({
        id: `terraform-ext-${i + 1}`,
        title: `Terraform Mastery: Module ${i + 2}`,
        content: `
# Advanced Terraform Concept ${i + 2}
This lesson explores advanced IaC patterns, focusing on modularity, state management, and multi-cloud strategies.

## Key Focus Areas
- Terraform Modules & Registry
- Remote State Management (S3, Terraform Cloud)
- Workspaces & Environments
- Sentinel Policy as Code
- Provider Development Basics

Building scalable and maintainable infrastructure with code.
        `,
        demoType: 'terminal' as const,
        demoConfig: {
          initialMessage: `Terraform Lesson ${i + 2} ready.`,
          availableCommands: ['terraform plan', 'terraform apply', 'terraform show', 'clear']
        }
      }))
    ]
  },
  {
    courseId: 'aws-solutions-architect',
    lessons: [
      {
        id: 'aws-vpc',
        title: 'Cloud Networking Fundamentals',
        content: `
# Virtual Private Cloud (VPC)
A VPC is a logically isolated section of the cloud where you can launch resources.
        `,
        cloudContent: {
          aws: {
            content: `
# Amazon VPC
Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud.

## Key Components
- **Subnets**: IP ranges within the VPC.
- **Route Tables**: Traffic routing rules.
- **Internet Gateway**: Connection to the public internet.
            `,
            task: 'Configure a public subnet in your AWS VPC.'
          },
          gcp: {
            content: `
# Google Cloud VPC
Google Cloud VPC provides networking functionality to Compute Engine VM instances, GKE clusters, and App Engine.

## Key Components
- **Subnetworks**: Regional resources with IP ranges.
- **Firewall Rules**: Control traffic to/from instances.
- **Cloud Router**: Dynamic routing using BGP.
            `,
            task: 'Create a regional subnet in your Google Cloud VPC.'
          },
          azure: {
            content: `
# Azure Virtual Network (VNet)
Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure.

## Key Components
- **Subnets**: Segments of the VNet address space.
- **Network Security Groups (NSG)**: Filter network traffic.
- **Azure Bastion**: Secure RDP/SSH access.
            `,
            task: 'Set up a Network Security Group (NSG) for your Azure VNet.'
          }
        },
        demoType: 'cloud-console',
        demoConfig: {
          service: 'VPC Console',
          mockData: {
            pipelineName: 'VPC-Production',
            stages: ['Create VPC', 'Add Subnets', 'Config Routing', 'Attach Gateway']
          }
        }
      },
      // Programmatically generate 99 more lessons for AWS Solutions Architect
      ...Array.from({ length: 99 }, (_, i) => ({
        id: `aws-sa-ext-${i + 1}`,
        title: `AWS Solutions Architecture: Part ${i + 2}`,
        content: `
# Advanced AWS Architecture ${i + 2}
This lesson covers enterprise-grade architecture on AWS, focusing on high availability, disaster recovery, and cost optimization.

## Topics Covered
- Multi-region Architectures
- AWS Direct Connect & Transit Gateway
- Advanced Security with AWS Shield & WAF
- Data Migration Strategies
- Cost Optimization with Spot Instances & Savings Plans

Designing robust and cost-effective solutions on the world's leading cloud platform.
        `,
        demoType: 'cloud-console' as const,
        demoConfig: {
          provider: 'AWS' as const,
          service: 'Architecture Center',
          mockData: {
            diagram: 'High-Availability-Web-App',
            status: 'Optimized',
            costEstimate: '$120/month'
          }
        }
      }))
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
        }
      },
      // Programmatically generate 99 more lessons for Kubernetes Fundamentals
      ...Array.from({ length: 99 }, (_, i) => ({
        id: `k8s-ext-${i + 1}`,
        title: `Kubernetes Deep Dive: Part ${i + 2}`,
        content: `
# Advanced Kubernetes Concept ${i + 2}
This lesson explores advanced orchestration, networking, and security within Kubernetes.

## Topics Covered
- Custom Resource Definitions (CRDs)
- Service Mesh (Istio/Linkerd)
- Cluster Hardening
- GitOps with ArgoCD
- Persistent Storage Strategies

Master the art of container orchestration at scale.
        `,
        demoType: 'terminal' as const,
        demoConfig: {
          initialMessage: `K8s Lesson ${i + 2} Sandbox ready.`,
          availableCommands: ['kubectl get all', 'kubectl describe node', 'kubectl top pods', 'clear']
        }
      }))
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
  }
];
