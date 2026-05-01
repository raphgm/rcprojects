export const conceptDictionary: Record<string, { title: string; description: string }> = {
  'Linux': {
    title: 'Linux Fundamentals',
    description: 'Linux is an open-source operating system that serves as the foundation for modern cloud computing. It manages the hardware resources and provides a stable environment where your applications and containers can run securely.'
  },
  'K8s': {
    title: 'Kubernetes (K8s)',
    description: 'Kubernetes is like an orchestra conductor for your containers. If you have hundreds of containerized applications running, K8s automatically manages them—restarting failed containers, scaling them up when traffic increases, and ensuring they can communicate with each other seamlessly.'
  },
  'Docker': {
    title: 'Containerization (Docker)',
    description: 'Docker allows you to package an application and all its dependencies into a single, standardized unit called a container. This ensures that the application runs exactly the same way on your laptop as it does in the production cloud environment, eliminating the "it works on my machine" problem.'
  },
  'CI/CD': {
    title: 'Continuous Integration / Continuous Deployment',
    description: 'CI/CD is an automated pipeline that takes the code a developer writes, tests it for bugs (Continuous Integration), and automatically deploys it to production (Continuous Deployment) without manual human intervention.'
  },
  'GitHub Actions': {
    title: 'GitHub Actions',
    description: 'GitHub Actions is an automation platform built directly into GitHub. It allows you to write scripts (workflows) that automatically build, test, and deploy your code every time someone pushes a change to the repository.'
  },
  'Istio': {
    title: 'Istio Service Mesh',
    description: 'When you have dozens of microservices talking to each other, managing the network traffic becomes chaotic. Istio is a "service mesh" that sits in the middle, providing automatic encryption (mTLS), traffic routing, and observability without requiring you to change your application code.'
  },
  'Envoy': {
    title: 'Envoy Proxy',
    description: 'Envoy is a high-performance proxy that runs alongside your applications (as a sidecar). It intercepts all incoming and outgoing network traffic, allowing tools like Istio to enforce security policies and route requests dynamically.'
  },
  'Service Mesh': {
    title: 'Service Mesh Architecture',
    description: 'A service mesh is a dedicated infrastructure layer that controls service-to-service communication over a network. It provides features like load balancing, encryption, and failure recovery to make distributed systems highly reliable.'
  },
  'Azure': {
    title: 'Microsoft Azure',
    description: 'Azure is Microsoft\'s public cloud computing platform. It provides on-demand access to virtual machines, databases, networking, and artificial intelligence services, allowing businesses to scale globally without buying physical servers.'
  },
  'Networking': {
    title: 'Cloud Networking',
    description: 'Cloud networking involves creating virtualized networks (like VNets or VPCs) that connect your cloud resources. It allows you to define private subnets, routing tables, and firewalls entirely through software.'
  },
  'VPN Gateway': {
    title: 'VPN Gateway',
    description: 'A Virtual Private Network (VPN) Gateway acts as a secure bridge between your company\'s physical office and the cloud. It encrypts all traffic traveling over the public internet, ensuring that sensitive data remains private during transit.'
  },
  'VNet': {
    title: 'Virtual Network (VNet)',
    description: 'A VNet is a logically isolated section of the Azure cloud dedicated to your account. You can think of it as your own private data center in the cloud where you can launch resources with custom IP addresses.'
  },
  'Kubeadm': {
    title: 'Kubeadm Bootstrap',
    description: 'Kubeadm is the official tool used to bootstrap a Kubernetes cluster from scratch. It handles the complex tasks of generating cryptographic certificates, configuring the control plane, and providing the commands needed to join worker nodes together.'
  },
  'Cluster': {
    title: 'Kubernetes Cluster',
    description: 'A cluster is a group of machines (nodes) that run containerized applications. It consists of a "Control Plane" that makes global decisions and "Worker Nodes" that actually run your application workloads.'
  },
  'Secrets': {
    title: 'Secret Management',
    description: 'Secrets refer to sensitive data like database passwords, API keys, and TLS certificates. Proper secret management ensures this data is encrypted at rest and injected into applications securely, rather than being hardcoded in plain text.'
  },
  'External Secrets': {
    title: 'External Secrets Operator',
    description: 'Instead of storing sensitive passwords directly in Kubernetes, the External Secrets Operator fetches them dynamically from enterprise vaults (like AWS Secrets Manager or HashiCorp Vault) and injects them into the cluster securely.'
  },
  'Security': {
    title: 'Cloud Security / Zero Trust',
    description: 'Cloud security relies on the "Zero Trust" principle: never assume traffic is safe just because it is inside your network. Every request must be authenticated, authorized, and encrypted.'
  },
  'Autoscaling': {
    title: 'Autoscaling Workloads',
    description: 'Autoscaling automatically adjusts the amount of computing resources allocated to your application based on current demand. It scales out during traffic spikes to maintain performance and scales in during quiet periods to save money.'
  },
  'HPA': {
    title: 'Horizontal Pod Autoscaler (HPA)',
    description: 'HPA monitors the CPU or memory usage of your application and automatically creates more identical copies (pods) of your application when demand is high, distributing the traffic across a wider fleet.'
  },
  'VPA': {
    title: 'Vertical Pod Autoscaler (VPA)',
    description: 'VPA monitors your application\'s resource usage and automatically increases the CPU and memory limits of individual pods if they are starving for resources, preventing out-of-memory crashes.'
  },
  'Ingress': {
    title: 'Kubernetes Ingress',
    description: 'An Ingress is an API object that manages external access to the services in a cluster, typically HTTP. It provides load balancing, SSL termination, and name-based virtual hosting.'
  },
  'NGINX': {
    title: 'NGINX Ingress Controller',
    description: 'NGINX is a highly performant web server acting as the front door for your Kubernetes cluster. It reads the Ingress routing rules and efficiently directs incoming internet traffic to the correct internal microservice.'
  },
  'Storage': {
    title: 'Persistent Storage',
    description: 'Containers are ephemeral—if they crash, any data stored inside them is lost forever. Persistent Storage provides independent, durable disk drives that survive container restarts, which is essential for databases.'
  },
  'CSI': {
    title: 'Container Storage Interface (CSI)',
    description: 'CSI is a standard that allows Kubernetes to connect to various external storage providers (like AWS EBS or Azure Disk) seamlessly, allowing developers to request storage dynamically without knowing the underlying hardware details.'
  },
  'PV': {
    title: 'Persistent Volume (PV)',
    description: 'A PV is a piece of storage in the cluster that has been provisioned by an administrator or dynamically via a storage class. It represents the actual physical or cloud storage drive.'
  },
  'PVC': {
    title: 'Persistent Volume Claim (PVC)',
    description: 'A PVC is a request for storage by a developer. You ask Kubernetes for a certain amount of space (e.g., 50GB), and the system automatically finds and binds an available PV to your application.'
  },
  'ArgoCD': {
    title: 'ArgoCD (GitOps)',
    description: 'ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It constantly watches your Git repository and automatically synchronizes those files into your cluster, ensuring the live state always matches the code.'
  },
  'GitOps': {
    title: 'GitOps Methodology',
    description: 'GitOps is an operational framework that takes DevOps best practices used for application development (like version control and pull requests) and applies them to infrastructure automation.'
  },
  'Helm': {
    title: 'Helm Package Manager',
    description: 'Helm is the package manager for Kubernetes. Just like `apt` for Linux or `npm` for Node.js, Helm allows you to package complex Kubernetes applications into reusable charts for easy installation and versioning.'
  },
  'Prowler': {
    title: 'Prowler Security Scanner',
    description: 'Prowler is an open-source security tool used to perform cloud security best practices assessments, audits, and incident response readiness checks against environments like AWS and Azure.'
  },
  'Compliance': {
    title: 'Cloud Compliance',
    description: 'Compliance ensures that your cloud environment adheres to strict regulatory frameworks (like HIPAA, SOC2, or CIS Benchmarks). Automated tools scan your infrastructure to detect misconfigurations before they result in a fine or breach.'
  },
  'AWS': {
    title: 'Amazon Web Services (AWS)',
    description: 'AWS is the world\'s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.'
  },
  'Prometheus': {
    title: 'Prometheus Monitoring',
    description: 'Prometheus is a time-series database and monitoring system. It "scrapes" metrics (like CPU usage, request counts) from your applications and stores them efficiently so you can set up alerts when things go wrong.'
  },
  'Grafana': {
    title: 'Grafana Dashboards',
    description: 'Grafana is an observability platform that connects to data sources like Prometheus and visualizes the metrics in beautiful, real-time graphs and dashboards.'
  },
  'Bash': {
    title: 'Bash Scripting',
    description: 'Bash is a command processor that runs in a text window where the user types commands. Bash scripting allows you to automate repetitive tasks by writing these commands into a reusable file.'
  },
  'Automation': {
    title: 'Infrastructure Automation',
    description: 'Automation involves using software scripts and tools to provision, configure, and manage infrastructure automatically, eliminating the need for manual, error-prone human intervention.'
  },
  'Cron': {
    title: 'Cron Job Scheduling',
    description: 'Cron is a time-based job scheduler in Linux. It allows administrators to schedule scripts or commands to run periodically at fixed times, dates, or intervals.'
  },
  'Functions': {
    title: 'Serverless Functions',
    description: 'Serverless functions (like Azure Functions) allow you to run small pieces of code in the cloud without managing any servers. You only pay for the time your code is actually running, making it highly cost-effective for event-driven tasks.'
  },
  'Event Hubs': {
    title: 'Azure Event Hubs',
    description: 'Event Hubs is a big data streaming platform and event ingestion service. It can receive and process millions of events per second, acting as a high-speed "front door" for data entering your analytics pipeline.'
  },
  'Cosmos DB': {
    title: 'Azure Cosmos DB',
    description: 'Cosmos DB is a globally distributed, multi-model database service. It is designed to provide low-latency access to data from anywhere in the world, automatically scaling to handle massive amounts of traffic.'
  },
  'Terraform': {
    title: 'Infrastructure as Code (Terraform)',
    description: 'Terraform is a tool that allows you to define your entire cloud infrastructure (servers, networks, databases) using a simple configuration language. This means you can "deploy" an entire data center with a single command.'
  },
  'Ansible': {
    title: 'Configuration Management (Ansible)',
    description: 'Ansible is an automation engine that automates software provisioning, configuration management, and application deployment. It uses "Playbooks" to ensure that all your servers are configured identically and correctly.'
  },
  'Vault': {
    title: 'HashiCorp Vault',
    description: 'Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret while providing tight access control and recording a detailed audit log.'
  },
  'AKS': {
    title: 'Azure Kubernetes Service (AKS)',
    description: 'AKS is a managed Kubernetes service that simplifies deploying, managing, and operations of Kubernetes. Microsoft handles the complex "Control Plane" management, while you focus on running your applications on the worker nodes.'
  },
  'App Service': {
    title: 'Azure App Service',
    description: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps. It supports multiple languages and handles infrastructure tasks like patching, security, and scaling automatically.'
  },
  'Azure SQL': {
    title: 'Azure SQL Database',
    description: 'Azure SQL is a fully managed relational database service. It provides high availability, data protection, and automated updates, allowing you to run powerful SQL Server databases without managing the underlying hardware.'
  },
  'Vulnerability Disclosure': {
    title: 'Vulnerability Disclosure',
    description: 'A Vulnerability Disclosure Program (VDP) is a structured way for ethical hackers to report security flaws they find in an organization\'s systems, allowing the organization to fix them before malicious actors can exploit them.'
  },
  'AppSec': {
    title: 'Application Security (AppSec)',
    description: 'AppSec focuses on making software more secure by finding, fixing, and preventing security vulnerabilities. It involves practices like secure coding, automated testing, and regular security audits throughout the development lifecycle.'
  },
  'Pipelines': {
    title: 'CI/CD Pipelines',
    description: 'A pipeline is a series of automated steps that your code goes through from the moment it is written to the moment it is deployed. This includes building, testing, and security scanning, ensuring only high-quality code reaches production.'
  },
  'Containers': {
    title: 'Containerization',
    description: 'Containers are lightweight, portable packages that include everything an application needs to run. They isolate software from its environment, ensuring it works consistently regardless of where it is deployed.'
  }
};
