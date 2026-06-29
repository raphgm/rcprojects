import { learningPaths } from './learningPaths';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Azure' | 'Kubernetes' | 'DevOps' | 'Security' | 'Data Science' | 'Python';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  image: string;
}

const staticProjects: Project[] = [
  {
    id: '1',
    title: 'Linux Web Server Setup & Security',
    description: 'Learn to deploy, configure and secure an Apache web server on Ubuntu Linux from the command line.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Linux', 'Apache', 'Security', 'UFW', 'DevOps Deep Dive'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Kubernetes Cluster Monitoring with Prometheus',
    description: 'Deploy a full monitoring stack on K8s and configure custom alerts for your services.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['Prometheus', 'Grafana', 'Helm', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-monitoring/800/600'
  },
  {
    id: '3',
    title: 'Serverless Data Pipeline with Azure Functions',
    description: 'Build a scalable data ingestion pipeline using Azure Functions, Event Hubs, and Cosmos DB.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Functions', 'Event Hubs', 'Cosmos DB'],
    image: 'https://picsum.photos/seed/azure-data-pipeline/800/600'
  },
  {
    id: '4',
    title: 'Enterprise Shell Automation & Backup',
    description: 'Master the art of Linux automation by building a complex backup and log rotation system using Bash.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Bash', 'Automation', 'Cron', 'Linux', 'DevOps Deep Dive'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'CI/CD Pipeline with GitHub Actions',
    description: 'Automate your build, test, and deployment workflow for a modern React application.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['GitHub Actions', 'Docker', 'CI/CD', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/github-actions/800/600'
  },
  {
    id: '9',
    title: 'Service Mesh Implementation with Istio',
    description: 'Enhance your Kubernetes microservices with traffic management, security, and observability using Istio.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Istio', 'K8s', 'Service Mesh', 'Envoy', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/istio-service-mesh/800/600'
  },
  {
    id: '10',
    title: 'GitOps Workflow with ArgoCD',
    description: 'Implement a modern GitOps continuous delivery pipeline for Kubernetes applications using ArgoCD.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['ArgoCD', 'GitOps', 'K8s', 'Helm', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/argocd-gitops/800/600'
  },
  {
    id: '11',
    title: 'Cloud Compliance Auditing with Prowler',
    description: 'Automate security best practices and compliance auditing for AWS environments using Prowler.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Prowler', 'Compliance', 'AWS', 'Security', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/aws-security-audit/800/600'
  },
  {
    id: '12',
    title: 'Hybrid Cloud Connectivity with Azure VPN',
    description: 'Set up a secure site-to-site VPN connection between on-premises data centers and Azure VNet.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['VPN Gateway', 'VNet', 'Networking', 'Azure', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/azure-networking-vpn/800/600'
  },
  {
    id: '19',
    title: 'Kubernetes Cluster Setup with Kubeadm',
    description: 'Learn to bootstrap a production-ready Kubernetes cluster from scratch using Kubeadm on Linux nodes.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Kubeadm', 'Linux', 'Cluster', 'K8s', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-cluster/800/600'
  },
  {
    id: '20',
    title: 'Managing Secrets with Kubernetes External Secrets',
    description: 'Integrate external secret managers like Azure Key Vault or HashiCorp Vault with Kubernetes.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Secrets', 'External Secrets', 'Security', 'K8s', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-security/800/600'
  },
  {
    id: '21',
    title: 'Advanced Autoscaling with HPA, VPA & KEDA',
    description: 'Master reactive and event-driven scaling using Horizontal and Vertical Pod Autoscalers combined with KEDA.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Autoscaling', 'HPA', 'VPA', 'K8s', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-autoscaling/800/600'
  },
  {
    id: '22',
    title: 'Kubernetes Ingress Controllers with NGINX',
    description: 'Set up and configure NGINX Ingress Controller for advanced traffic routing and SSL termination.',
    category: 'Kubernetes',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Ingress', 'NGINX', 'Networking', 'K8s', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-ingress/800/600'
  },
  {
    id: '23',
    title: 'Persistent Storage in Kubernetes with CSI',
    description: 'Implement dynamic volume provisioning using Container Storage Interface (CSI) drivers.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Storage', 'CSI', 'PV', 'PVC', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-storage/800/600'
  },
  {
    id: '24',
    title: 'Kubernetes Network Policies for Microservices Security',
    description: 'Secure your pod-to-pod communication using fine-grained Kubernetes Network Policies.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['Network Policy', 'Security', 'Calico', 'K8s', 'DevOps Deep Dive'],
    image: 'https://picsum.photos/seed/kubernetes-network-policy/800/600'
  },
  {
    id: '25',
    title: 'Deploying Stateful Applications on Kubernetes',
    description: 'Master StatefulSets for deploying databases and other stateful workloads with stable identities.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['StatefulSet', 'Databases', 'Storage', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-database/800/600'
  },
  {
    id: '26',
    title: 'Kubernetes Operator Development with SDK',
    description: 'Build custom Kubernetes Operators to automate complex application lifecycles using the Operator SDK.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Operator', 'Go', 'SDK', 'Automation'],
    image: 'https://picsum.photos/seed/kubernetes-automation/800/600'
  },
  {
    id: '27',
    title: 'Azure SQL Database Security & Encryption',
    description: 'Implement Transparent Data Encryption, Always Encrypted, and Dynamic Data Masking on Azure SQL.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Azure SQL', 'Security', 'Encryption', 'Azure'],
    image: 'https://picsum.photos/seed/azure-sql-security/800/600'
  },
  {
    id: '28',
    title: 'Azure App Service with Custom Domain & SSL',
    description: 'Deploy a web application to Azure App Service and configure a custom domain with SSL/TLS.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['App Service', 'DNS', 'SSL', 'Web'],
    image: 'https://picsum.photos/seed/azure-app-service/800/600'
  },
  {
    id: '29',
    title: 'Azure Kubernetes Service (AKS) Cluster Deployment',
    description: 'Provision a managed Kubernetes cluster in Azure and deploy a sample microservices application.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['AKS', 'Kubernetes', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-kubernetes-service/800/600'
  },
  {
    id: '30',
    title: 'Azure Data Factory ETL Pipeline',
    description: 'Build an end-to-end data integration pipeline using Azure Data Factory to move data from S3 to SQL.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Data Factory', 'ETL', 'Data Engineering', 'Azure'],
    image: 'https://picsum.photos/seed/azure-data-factory/800/600'
  },
  {
    id: '31',
    title: 'Azure Logic Apps Workflow Automation',
    description: 'Automate business processes and integrate apps using Azure Logic Apps with zero code.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Logic Apps', 'Automation', 'Serverless', 'Azure'],
    image: 'https://picsum.photos/seed/azure-logic-apps/800/600'
  },
  {
    id: '32',
    title: 'Azure Sentinel SIEM Implementation',
    description: 'Set up Azure Sentinel to collect data, detect threats, and respond to security incidents.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Sentinel', 'SIEM', 'Security', 'Azure'],
    image: 'https://picsum.photos/seed/azure-sentinel-security/800/600'
  },
  {
    id: '33',
    title: 'Azure Bastion Host for Secure SSH/RDP',
    description: 'Configure Azure Bastion to provide secure and seamless RDP and SSH access to your VMs.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '45 mins',
    tags: ['Bastion', 'Security', 'Networking', 'Azure'],
    image: 'https://picsum.photos/seed/azure-bastion-host/800/600'
  },
  {
    id: '34',
    title: 'Azure Front Door Global Load Balancing',
    description: 'Implement Azure Front Door to provide high availability and fast performance for your web apps.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Front Door', 'Load Balancing', 'CDN', 'Azure'],
    image: 'https://picsum.photos/seed/azure-front-door/800/600'
  },
  {
    id: '35',
    title: 'Azure Key Vault Integration for Secrets',
    description: 'Securely store and manage application secrets, keys, and certificates using Azure Key Vault.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Key Vault', 'Security', 'Secrets', 'Azure'],
    image: 'https://picsum.photos/seed/azure-key-vault/800/600'
  },
  {
    id: '36',
    title: 'Azure Monitor and Application Insights',
    description: 'Monitor the health and performance of your Azure resources and applications in real-time.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Monitor', 'App Insights', 'Observability', 'Azure'],
    image: 'https://picsum.photos/seed/azure-monitoring/800/600'
  },
  {
    id: '37',
    title: 'Azure Container Instances (ACI) Deployment',
    description: 'Run Docker containers on-demand in a managed, serverless Azure environment.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['ACI', 'Docker', 'Containers', 'Azure'],
    image: 'https://picsum.photos/seed/azure-container-instances/800/600'
  },
  {
    id: '38',
    title: 'Azure Batch for Large Scale Parallel Jobs',
    description: 'Run large-scale parallel and high-performance computing (HPC) applications efficiently in Azure.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Batch', 'HPC', 'Compute', 'Azure'],
    image: 'https://picsum.photos/seed/azure-batch-compute/800/600'
  },
  {
    id: '39',
    title: 'Azure Cognitive Services AI Integration',
    description: 'Add AI capabilities like vision, speech, and language to your apps using Azure Cognitive Services.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Cognitive Services', 'AI', 'ML', 'Azure'],
    image: 'https://picsum.photos/seed/azure-cognitive-services/800/600'
  },
  {
    id: '40',
    title: 'Azure IoT Hub Device Management',
    description: 'Connect, monitor, and manage billions of IoT assets using Azure IoT Hub.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['IoT Hub', 'IoT', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-iot-hub/800/600'
  },
  {
    id: '41',
    title: 'Azure Redis Cache Performance Optimization',
    description: 'Implement a high-performance caching layer for your applications using Azure Cache for Redis.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Redis', 'Cache', 'Performance', 'Azure'],
    image: 'https://picsum.photos/seed/azure-redis-cache/800/600'
  },
  {
    id: '42',
    title: 'Azure Traffic Manager Global Routing',
    description: 'Distribute traffic to your public-facing applications across global Azure regions.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Traffic Manager', 'DNS', 'Networking', 'Azure'],
    image: 'https://picsum.photos/seed/azure-traffic-manager/800/600'
  },
  {
    id: '43',
    title: 'Azure Site Recovery Disaster Recovery',
    description: 'Keep your applications running during outages by orchestrating replication and recovery of VMs.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Site Recovery', 'DR', 'Business Continuity', 'Azure'],
    image: 'https://picsum.photos/seed/azure-site-recovery/800/600'
  },
  {
    id: '44',
    title: 'Azure Virtual Desktop Implementation',
    description: 'Deploy and scale your Windows desktops and apps on Azure in minutes.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Virtual Desktop', 'VDI', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-virtual-desktop/800/600'
  },
  {
    id: '45',
    title: 'Azure API Management Gateway',
    description: 'Publish, secure, transform, maintain, and monitor APIs using Azure API Management.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['API Management', 'APIM', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-api-management/800/600'
  },
  {
    id: '46',
    title: 'Azure Service Bus Messaging Patterns',
    description: 'Implement reliable cloud messaging between applications and services using Azure Service Bus.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Service Bus', 'Messaging', 'Pub/Sub', 'Azure'],
    image: 'https://picsum.photos/seed/azure-service-bus/800/600'
  },
  {
    id: '47',
    title: 'Azure Event Grid Serverless Messaging',
    description: 'Build event-driven architectures with serverless event routing using Azure Event Grid.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Event Grid', 'Serverless', 'Events', 'Azure'],
    image: 'https://picsum.photos/seed/azure-event-grid/800/600'
  },
  {
    id: '48',
    title: 'Azure Synapse Analytics Data Warehousing',
    description: 'Limitless analytics service that brings together enterprise data warehousing and Big Data analytics.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Synapse', 'Analytics', 'Big Data', 'Azure'],
    image: 'https://picsum.photos/seed/azure-synapse-analytics/800/600'
  },
  {
    id: '49',
    title: 'Azure Machine Learning Studio Workflows',
    description: 'Build, train, and deploy machine learning models faster with Azure Machine Learning.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Machine Learning', 'AI', 'MLOps', 'Azure'],
    image: 'https://picsum.photos/seed/azure-machine-learning/800/600'
  },
  {
    id: '50',
    title: 'Azure DevOps CI/CD Pipelines',
    description: 'Automate your software delivery process using Azure Pipelines for any language or platform.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Azure DevOps', 'CI/CD', 'Pipelines', 'Azure'],
    image: 'https://picsum.photos/seed/azure-devops-pipeline/800/600'
  },
  {
    id: '51',
    title: 'Azure Policy Compliance Management',
    description: 'Enforce organizational standards and assess compliance at scale using Azure Policy.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Azure Policy', 'Compliance', 'Governance', 'Azure'],
    image: 'https://picsum.photos/seed/azure-policy-governance/800/600'
  },
  {
    id: '52',
    title: 'Azure Blueprints for Environment Setup',
    description: 'Define a repeatable set of Azure resources that implement and adhere to your standards.',
    category: 'Azure',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Blueprints', 'Governance', 'IaC', 'Azure'],
    image: 'https://picsum.photos/seed/azure-blueprints-setup/800/600'
  },
  {
    id: '53',
    title: 'Azure Resource Graph Explorer',
    description: 'Query your Azure resources at scale across subscriptions and management groups.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Resource Graph', 'Governance', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-resource-graph/800/600'
  },
  {
    id: '54',
    title: 'Azure Lighthouse for Multi-tenant Management',
    description: 'Manage Azure resources across multiple tenants with higher automation and scalability.',
    category: 'Azure',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Lighthouse', 'Multi-tenant', 'Azure', 'Cloud'],
    image: 'https://picsum.photos/seed/azure-lighthouse-management/800/600'
  },
  {
    id: '83',
    title: 'Jenkins Pipeline as Code with Groovy',
    description: 'Define and manage your CI/CD pipelines using Jenkinsfiles and Groovy scripts for better version control.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Jenkins', 'Groovy', 'CI/CD', 'Automation'],
    image: 'https://picsum.photos/seed/jenkins-pipeline/800/600'
  },
  {
    id: '84',
    title: 'Ansible Configuration Management for Web Servers',
    description: 'Automate the configuration and deployment of NGINX and Apache servers across multiple nodes using Ansible.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Ansible', 'Automation', 'Configuration', 'Linux'],
    image: 'https://picsum.photos/seed/ansible-automation/800/600'
  },
  {
    id: '85',
    title: 'Puppet Infrastructure Automation at Scale',
    description: 'Manage complex infrastructure configurations and ensure consistency using Puppet manifests and modules.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Puppet', 'Automation', 'IaC', 'Configuration'],
    image: 'https://picsum.photos/seed/puppet-infrastructure/800/600'
  },
  {
    id: '86',
    title: 'Chef Infrastructure as Code for Cloud Apps',
    description: 'Use Chef recipes and cookbooks to automate the deployment and management of cloud-native applications.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Chef', 'Automation', 'IaC', 'Ruby'],
    image: 'https://picsum.photos/seed/chef-automation/800/600'
  },
  {
    id: '87',
    title: 'Docker Swarm Orchestration for Microservices',
    description: 'Set up a Docker Swarm cluster and manage containerized microservices with high availability.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Docker Swarm', 'Docker', 'Orchestration', 'Containers'],
    image: 'https://picsum.photos/seed/docker-swarm/800/600'
  },
  {
    id: '88',
    title: 'Vagrant Development Environments for Teams',
    description: 'Create and share reproducible development environments using Vagrant and VirtualBox.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Vagrant', 'Virtualization', 'Development', 'Automation'],
    image: 'https://picsum.photos/seed/vagrant-environment/800/600'
  },
  {
    id: '89',
    title: 'Packer Machine Images for Multi-cloud',
    description: 'Build automated machine images for multiple cloud providers using a single configuration file with Packer.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Packer', 'Images', 'IaC', 'Automation'],
    image: 'https://picsum.photos/seed/packer-machine-images/800/600'
  },
  {
    id: '90',
    title: 'Consul Service Discovery and Health Checking',
    description: 'Implement dynamic service discovery and health monitoring for your microservices using HashiCorp Consul.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Consul', 'Service Discovery', 'Networking', 'HashiCorp'],
    image: 'https://picsum.photos/seed/consul-service-discovery/800/600'
  },
  {
    id: '91',
    title: 'Nomad Workload Orchestration for Any App',
    description: 'Deploy and manage containerized, non-containerized, and batch applications using HashiCorp Nomad.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Nomad', 'Orchestration', 'Compute', 'HashiCorp'],
    image: 'https://picsum.photos/seed/nomad-orchestration/800/600'
  },
  {
    id: '92',
    title: 'GitLab CI/CD for Modern Web Apps',
    description: 'Build, test, and deploy your applications using GitLab CI/CD pipelines and integrated container registry.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['GitLab', 'CI/CD', 'Pipelines', 'DevOps'],
    image: 'https://picsum.photos/seed/gitlab-ci-cd/800/600'
  },
  {
    id: '93',
    title: 'Bitbucket Pipelines for Cloud Deployment',
    description: 'Automate your software delivery process using Bitbucket Pipelines for integrated CI/CD.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Bitbucket', 'CI/CD', 'Pipelines', 'Atlassian'],
    image: 'https://picsum.photos/seed/bitbucket-pipelines/800/600'
  },
  {
    id: '94',
    title: 'CircleCI Automation for Fast Feedback',
    description: 'Implement high-performance CI/CD pipelines with CircleCI to accelerate your development cycle.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['CircleCI', 'CI/CD', 'Automation', 'DevOps'],
    image: 'https://picsum.photos/seed/circleci-automation/800/600'
  },
  {
    id: '95',
    title: 'Travis CI Integration for Open Source',
    description: 'Set up automated testing and deployment for your open-source projects using Travis CI.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Travis CI', 'CI/CD', 'Open Source', 'Automation'],
    image: 'https://picsum.photos/seed/travis-ci/800/600'
  },
  {
    id: '96',
    title: 'SonarQube Code Quality and Security Analysis',
    description: 'Integrate SonarQube into your CI/CD pipelines to ensure code quality and detect security vulnerabilities.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['SonarQube', 'Code Quality', 'Security', 'Static Analysis'],
    image: 'https://picsum.photos/seed/sonarqube-quality/800/600'
  },
  {
    id: '97',
    title: 'Artifactory Repository Management for Binaries',
    description: 'Manage your software binaries and dependencies across the entire development lifecycle with Artifactory.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Artifactory', 'Binary Management', 'DevOps', 'JFrog'],
    image: 'https://picsum.photos/seed/jfrog-artifactory/800/600'
  },
  {
    id: '98',
    title: 'Nexus Repository Manager for Artifacts',
    description: 'Set up a private repository for your Maven, npm, and Docker artifacts using Sonatype Nexus.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Nexus', 'Binary Management', 'DevOps', 'Sonatype'],
    image: 'https://picsum.photos/seed/sonatype-nexus/800/600'
  },
  {
    id: '99',
    title: 'Spinnaker Continuous Delivery for Multi-cloud',
    description: 'Implement advanced deployment strategies like Canary and Blue/Green using Spinnaker.',
    category: 'DevOps',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Spinnaker', 'CD', 'Multi-cloud', 'Deployment'],
    image: 'https://picsum.photos/seed/spinnaker-continuous-delivery/800/600'
  },
  {
    id: '100',
    title: 'Tekton Kubernetes-native Pipelines',
    description: 'Build, test, and deploy applications using Tekton, a powerful Kubernetes-native CI/CD framework.',
    category: 'DevOps',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['Tekton', 'Kubernetes', 'CI/CD', 'Cloud Native'],
    image: 'https://picsum.photos/seed/tekton-pipelines/800/600'
  },
  {
    id: '101',
    title: 'FluxCD GitOps for Kubernetes Clusters',
    description: 'Automate the state of your Kubernetes clusters using FluxCD and GitOps principles.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['FluxCD', 'GitOps', 'Kubernetes', 'Automation'],
    image: 'https://picsum.photos/seed/fluxcd-gitops/800/600'
  },
  {
    id: '102',
    title: 'Helm Chart Development for K8s Apps',
    description: 'Package and manage your Kubernetes applications using Helm charts for easier deployment.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Helm', 'Kubernetes', 'Packaging', 'DevOps'],
    image: 'https://picsum.photos/seed/helm-charts/800/600'
  },
  {
    id: '103',
    title: 'Kustomize Configuration Management for K8s',
    description: 'Customize Kubernetes resource configurations without templates using Kustomize.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Kustomize', 'Kubernetes', 'Configuration', 'DevOps'],
    image: 'https://picsum.photos/seed/kustomize-kubernetes/800/600'
  },
  {
    id: '104',
    title: 'Skaffold Development Workflow for K8s',
    description: 'Automate the workflow for building, pushing, and deploying your applications to Kubernetes.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Skaffold', 'Kubernetes', 'Development', 'Automation'],
    image: 'https://picsum.photos/seed/skaffold-workflow/800/600'
  },
  {
    id: '105',
    title: 'Kaniko Container Building without Docker',
    description: 'Build container images from a Dockerfile, inside a container or Kubernetes cluster, without Docker.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Kaniko', 'Docker', 'Containers', 'Kubernetes'],
    image: 'https://picsum.photos/seed/kaniko-container-build/800/600'
  },
  {
    id: '106',
    title: 'Cloud Native Buildpacks for Containerization',
    description: 'Transform your source code into production-ready container images using Cloud Native Buildpacks.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Buildpacks', 'Containers', 'Docker', 'Cloud Native'],
    image: 'https://picsum.photos/seed/cloud-native-buildpacks/800/600'
  },
  {
    id: '107',
    title: 'Prometheus Monitoring for Microservices',
    description: 'Implement a comprehensive monitoring and alerting system for your services using Prometheus.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Prometheus', 'Monitoring', 'Observability', 'DevOps'],
    image: 'https://picsum.photos/seed/prometheus-metrics/800/600'
  },
  {
    id: '108',
    title: 'Grafana Dashboards for Infrastructure Metrics',
    description: 'Visualize your infrastructure and application metrics using beautiful Grafana dashboards.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Grafana', 'Visualization', 'Monitoring', 'DevOps'],
    image: 'https://picsum.photos/seed/grafana-dashboards/800/600'
  },
  {
    id: '109',
    title: 'ELK Stack Centralized Logging',
    description: 'Collect, analyze, and visualize your application logs using Elasticsearch, Logstash, and Kibana.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['ELK Stack', 'Logging', 'Elasticsearch', 'DevOps'],
    image: 'https://picsum.photos/seed/elk-stack-logging/800/600'
  },
  {
    id: '110',
    title: 'Graylog Centralized Log Management',
    description: 'Implement a powerful and easy-to-use centralized log management platform using Graylog.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Graylog', 'Logging', 'Observability', 'DevOps'],
    image: 'https://picsum.photos/seed/graylog-logging/800/600'
  },
  {
    id: '111',
    title: 'OWASP Top 10 Vulnerability Mitigation',
    description: 'Learn to identify and mitigate the most critical web application security risks defined by OWASP.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['OWASP', 'Web Security', 'AppSec', 'Mitigation'],
    image: 'https://picsum.photos/seed/owasp-top-10/800/600'
  },
  {
    id: '112',
    title: 'Penetration Testing with Kali Linux',
    description: 'Master the tools and techniques used by ethical hackers for comprehensive penetration testing.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Kali Linux', 'Pentesting', 'Ethical Hacking', 'Security'],
    image: 'https://picsum.photos/seed/kali-linux-pentest/800/600'
  },
  {
    id: '113',
    title: 'Nmap Network Scanning and Discovery',
    description: 'Use Nmap to discover hosts and services on a computer network and perform security auditing.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Nmap', 'Networking', 'Scanning', 'Discovery'],
    image: 'https://picsum.photos/seed/nmap-network-scan/800/600'
  },
  {
    id: '114',
    title: 'Wireshark Network Traffic Analysis',
    description: 'Learn to capture and interactively browse the traffic running on a computer network using Wireshark.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Wireshark', 'Networking', 'Packet Analysis', 'Security'],
    image: 'https://picsum.photos/seed/wireshark-traffic-analysis/800/600'
  },
  {
    id: '115',
    title: 'Metasploit Framework for Exploitation',
    description: 'Learn to use the Metasploit Framework for developing and executing exploit code against a remote target.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Metasploit', 'Exploitation', 'Pentesting', 'Security'],
    image: 'https://picsum.photos/seed/metasploit-framework/800/600'
  },
  {
    id: '116',
    title: 'Burp Suite for Web Application Security',
    description: 'Master Burp Suite, the leading software for web application security testing and vulnerability scanning.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Burp Suite', 'Web Security', 'AppSec', 'Scanning'],
    image: 'https://picsum.photos/seed/burp-suite-security/800/600'
  },
  {
    id: '117',
    title: 'Snort IDS/IPS Implementation',
    description: 'Deploy Snort, an open-source network intrusion detection and prevention system, to protect your network.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Snort', 'IDS', 'IPS', 'Network Security'],
    image: 'https://picsum.photos/seed/snort-ids-ips/800/600'
  },
  {
    id: '118',
    title: 'Suricata Network Security Monitoring',
    description: 'Implement Suricata, a high-performance network IDS, IPS, and network security monitoring engine.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Suricata', 'IDS', 'IPS', 'NSM'],
    image: 'https://picsum.photos/seed/suricata-network-security/800/600'
  },
  {
    id: '119',
    title: 'Zeek Network Security Analysis',
    description: 'Learn to use Zeek (formerly Bro) for deep packet inspection and network security analysis.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['Zeek', 'NSM', 'Packet Analysis', 'Security'],
    image: 'https://picsum.photos/seed/zeek-network-analysis/800/600'
  },
  {
    id: '120',
    title: 'Wazuh HIDS for Endpoint Security',
    description: 'Deploy Wazuh, an open-source security platform that provides endpoint protection and threat detection.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Wazuh', 'HIDS', 'Endpoint Security', 'SIEM'],
    image: 'https://picsum.photos/seed/wazuh-endpoint-security/800/600'
  },
  {
    id: '121',
    title: 'OSSEC Host-based Intrusion Detection',
    description: 'Implement OSSEC for log analysis, file integrity checking, policy monitoring, and rootkit detection.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['OSSEC', 'HIDS', 'Security', 'Linux'],
    image: 'https://picsum.photos/seed/ossec-hids/800/600'
  },
  {
    id: '122',
    title: 'ClamAV Antivirus for Linux Servers',
    description: 'Set up ClamAV, an open-source antivirus engine, to scan and protect your Linux servers from malware.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['ClamAV', 'Antivirus', 'Malware', 'Linux'],
    image: 'https://picsum.photos/seed/clamav-antivirus/800/600'
  },
  {
    id: '123',
    title: 'Fail2Ban Brute Force Protection',
    description: 'Implement Fail2Ban to protect your servers from brute-force attacks by monitoring log files.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Fail2Ban', 'Security', 'Brute Force', 'Linux'],
    image: 'https://picsum.photos/seed/fail2ban-protection/800/600'
  },
  {
    id: '124',
    title: 'ModSecurity WAF for Web Servers',
    description: 'Deploy ModSecurity, an open-source web application firewall, to protect your NGINX or Apache servers.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['ModSecurity', 'WAF', 'Web Security', 'NGINX'],
    image: 'https://picsum.photos/seed/modsecurity-waf/800/600'
  },
  {
    id: '125',
    title: 'OpenVAS Vulnerability Scanning',
    description: 'Implement OpenVAS (GVM) for comprehensive vulnerability scanning and management across your network.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['OpenVAS', 'Vulnerability Scanning', 'Security', 'GVM'],
    image: 'https://picsum.photos/seed/openvas-vulnerability-scan/800/600'
  },
  {
    id: '126',
    title: 'Nessus Vulnerability Assessment Workflows',
    description: 'Learn to use Nessus, the industry-leading vulnerability scanner, for professional security assessments.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Nessus', 'Vulnerability Scanning', 'Security', 'Tenable'],
    image: 'https://picsum.photos/seed/nessus-vulnerability-scan/800/600'
  },
  {
    id: '127',
    title: 'Qualys Cloud Security and Compliance',
    description: 'Implement Qualys for continuous security monitoring and compliance auditing in cloud environments.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Qualys', 'Cloud Security', 'Compliance', 'Scanning'],
    image: 'https://picsum.photos/seed/qualys-cloud-security/800/600'
  },
  {
    id: '128',
    title: 'Checkmarx SAST for Secure Coding',
    description: 'Integrate Checkmarx Static Application Security Testing (SAST) into your development lifecycle.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Checkmarx', 'SAST', 'Secure Coding', 'AppSec'],
    image: 'https://picsum.photos/seed/checkmarx-sast/800/600'
  },
  {
    id: '129',
    title: 'Snyk Dependency Scanning and Remediation',
    description: 'Use Snyk to find and fix vulnerabilities in your open-source dependencies and container images.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Snyk', 'Dependency Scanning', 'Security', 'AppSec'],
    image: 'https://picsum.photos/seed/snyk-security/800/600'
  },
  {
    id: '130',
    title: 'Aqua Security for Container Protection',
    description: 'Implement Aqua Security to secure your containerized applications from build to production.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['Aqua Security', 'Container Security', 'Cloud Native', 'K8s'],
    image: 'https://picsum.photos/seed/aqua-container-security/800/600'
  },
  {
    id: '131',
    title: 'Sysdig Runtime Security and Monitoring',
    description: 'Use Sysdig for deep visibility and runtime security in your Kubernetes and container environments.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['Sysdig', 'Runtime Security', 'Monitoring', 'K8s'],
    image: 'https://picsum.photos/seed/sysdig-runtime-security/800/600'
  },
  {
    id: '132',
    title: 'Falco Runtime Threat Detection for K8s',
    description: 'Implement Falco, the open-source standard for runtime security and threat detection in Kubernetes.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '2.5 hours',
    tags: ['Falco', 'Runtime Security', 'Threat Detection', 'K8s'],
    image: 'https://picsum.photos/seed/falco-threat-detection/800/600'
  },
  {
    id: '133',
    title: 'Trivy Container Vulnerability Scanning',
    description: 'Use Trivy, a simple and comprehensive vulnerability scanner for containers and other artifacts.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Trivy', 'Container Security', 'Scanning', 'DevSecOps'],
    image: 'https://picsum.photos/seed/trivy-vulnerability-scan/800/600'
  },
  {
    id: '134',
    title: 'Clair Vulnerability Analysis for Containers',
    description: 'Implement Clair for static analysis of vulnerabilities in appc and docker containers.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Clair', 'Container Security', 'Scanning', 'CoreOS'],
    image: 'https://picsum.photos/seed/clair-vulnerability-scan/800/600'
  },
  {
    id: '135',
    title: 'Gitleaks Secret Scanning for Repositories',
    description: 'Use Gitleaks to scan your git repositories for secrets like passwords, api keys, and tokens.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Gitleaks', 'Secret Scanning', 'Security', 'Git'],
    image: 'https://picsum.photos/seed/gitleaks-secret-scan/800/600'
  },
  {
    id: '136',
    title: 'TruffleHog Secret Discovery in History',
    description: 'Search through git repositories for high entropy strings and secrets, digging deep into commit history.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['TruffleHog', 'Secret Scanning', 'Security', 'Git'],
    image: 'https://picsum.photos/seed/trufflehog-secret-scan/800/600'
  },
  {
    id: '137',
    title: 'HashiCorp Sentinel Policy as Code',
    description: 'Implement fine-grained, logic-based policy decisions using HashiCorp Sentinel across your cloud stack.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['Sentinel', 'Policy as Code', 'Governance', 'HashiCorp'],
    image: 'https://picsum.photos/seed/sentinel-policy-as-code/800/600'
  },
  {
    id: 'opa-gatekeeper',
    title: 'OPA Gatekeeper for Kubernetes Policy',
    description: 'Enforce policies on your Kubernetes clusters using Open Policy Agent (OPA) and Gatekeeper.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['OPA', 'Gatekeeper', 'Policy as Code', 'K8s'],
    image: 'https://picsum.photos/seed/opa-gatekeeper/800/600'
  },
  {
    id: '139',
    title: 'Kubernetes Cost Visibility with Kubecost',
    description: 'Implement Kubecost to gain real-time visibility into your Kubernetes spending and resource allocation.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Kubecost', 'FinOps', 'Cost Management', 'K8s'],
    image: 'https://picsum.photos/seed/kubecost-finops/800/600'
  },
  {
    id: '140',
    title: 'Optimizing Kubernetes Resource Quotas for FinOps',
    description: 'Learn to implement and manage Resource Quotas and LimitRanges to control costs and prevent resource waste.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Resource Quotas', 'FinOps', 'Optimization', 'K8s'],
    image: 'https://picsum.photos/seed/k8s-resource-quotas/800/600'
  },
  {
    id: '150',
    title: 'AI-Powered Chatbot with LangChain & Gemini',
    description: 'Build a production-grade RAG (Retrieval-Augmented Generation) chatbot using modern LLM orchestration frameworks.',
    category: 'DevOps',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['LangChain', 'OpenAI', 'Python', 'AI'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'crossplane-platform',
    title: 'Platform Engineering with Crossplane',
    description: 'Build a custom internal developer platform (IDP) by managing cloud resources directly through Kubernetes using Crossplane.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Crossplane', 'IaC', 'Platform Engineering', 'K8s'],
    image: 'https://picsum.photos/seed/crossplane/800/600'
  },
  {
    id: 'cilium-networking',
    title: 'Advanced Networking with Cilium',
    description: 'Implement high-performance networking, observability, and security using eBPF-powered Cilium.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Cilium', 'eBPF', 'Networking', 'Security'],
    image: 'https://picsum.photos/seed/cilium/800/600'
  },
  {
    id: 'kubeflow-ml',
    title: 'ML Pipelines with Kubeflow',
    description: 'Build and deploy end-to-end machine learning pipelines on Kubernetes using Kubeflow.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Kubeflow', 'MLOps', 'Machine Learning', 'K8s'],
    image: 'https://picsum.photos/seed/kubeflow/800/600'
  },
  {
    id: 'mlflow-tracking',
    title: 'Experiment Tracking with MLflow',
    description: 'Manage the machine learning lifecycle, including experimentation, reproducibility, and deployment on K8s.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['MLflow', 'MLOps', 'Tracking', 'K8s'],
    image: 'https://picsum.photos/seed/mlflow/800/600'
  },
  {
    id: 'kserve-inference',
    title: 'Model Serving with KServe',
    description: 'Deploy and scale machine learning models in production using KServe on top of Knative.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['KServe', 'Inference', 'Knative', 'K8s'],
    image: 'https://picsum.photos/seed/kserve/800/600'
  },
  {
    id: 'ollama-llm',
    title: 'Self-hosted LLMs with Ollama',
    description: 'Run large language models locally on your Kubernetes cluster using Ollama.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Ollama', 'LLM', 'AI', 'K8s'],
    image: 'https://picsum.photos/seed/ollama/800/600'
  },
  {
    id: 'inference-gateway',
    title: 'LLM Traffic Routing with Inference Gateway',
    description: 'Implement a specialized gateway for routing, load balancing, and rate-limiting LLM traffic.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Inference Gateway', 'AI', 'Gateway', 'Traffic Management'],
    image: 'https://picsum.photos/seed/inference-gateway/800/600'
  },
  {
    id: 'terraform-k8s',
    title: 'Kubernetes Provisioning with Terraform',
    description: 'Master the management of Kubernetes resources and infrastructure using Terraform providers.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Terraform', 'IaC', 'K8s', 'Automation'],
    image: 'https://picsum.photos/seed/terraform-k8s/800/600'
  },
  {
    id: 'pfsense-firewall',
    title: 'Enterprise Firewall Configuration',
    description: 'Configure and manage an enterprise-grade firewall with pfSense, implementing VLANs, NAT, and stateful inspection.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['pfSense', 'Firewall', 'Networking', 'Security'],
    image: 'https://picsum.photos/seed/pfsense-firewall/800/600'
  },
  {
    id: 'ssl-tls-setup',
    title: 'Implementing SSL/TLS',
    description: 'Master the deployment of SSL/TLS certificates using Certbot and OpenSSL to secure web traffic.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['SSL', 'TLS', 'Certbot', 'OpenSSL'],
    image: 'https://picsum.photos/seed/ssl-tls-security/800/600'
  },
  {
    id: 'honeypot-cowrie',
    title: 'Deploying a Cowrie Honeypot',
    description: 'Deploy a Cowrie SSH/Telnet honeypot to attract and analyze attacker behavior in a controlled environment.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Honeypot', 'Cowrie', 'Deception', 'Security'],
    image: 'https://picsum.photos/seed/cowrie-honeypot/800/600'
  },
  {
    id: 'mfa-implementation',
    title: 'Implementing Multi-Factor Auth',
    description: 'Configure multi-factor authentication (MFA) for Linux systems and applications using Google Authenticator.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['MFA', 'Authentication', 'Security', '2FA'],
    image: 'https://picsum.photos/seed/mfa-security/800/600'
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis in Sandbox',
    description: 'Perform behavioral analysis of malware samples in a safe, isolated Cuckoo Sandbox environment.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Malware Analysis', 'Reverse Engineering', 'Sandbox', 'Cuckoo'],
    image: 'https://picsum.photos/seed/malware-analysis/800/600'
  },
  {
    id: 'vpn-ipsec',
    title: 'IPsec VPN for Remote Access',
    description: 'Set up a secure IPsec VPN for remote workers using OpenSwan or Libreswan on Linux.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['VPN', 'IPsec', 'Remote Access', 'Security'],
    image: 'https://picsum.photos/seed/vpn-security/800/600'
  },
  {
    id: 'data-encryption',
    title: 'Data Encryption at Rest',
    description: 'Implement full-disk and file-level encryption using LUKS and VeraCrypt to protect sensitive data.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Encryption', 'LUKS', 'VeraCrypt', 'Privacy'],
    image: 'https://picsum.photos/seed/data-encryption/800/600'
  },
  {
    id: 'pki-openssl',
    title: 'PKI Setup with OpenSSL',
    description: 'Build a private Certificate Authority (CA) and manage the full certificate lifecycle with OpenSSL.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['PKI', 'CA', 'OpenSSL', 'Certificates'],
    image: 'https://picsum.photos/seed/pki-security/800/600'
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering Simulation',
    description: 'Use the Social-Engineer Toolkit (SET) to perform controlled phishing and spear-phishing simulations.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['Phishing', 'SET', 'Social Engineering', 'Security'],
    image: 'https://picsum.photos/seed/social-engineering/800/600'
  },
  {
    id: 'zero-trust',
    title: 'Zero Trust Architecture Design',
    description: 'Design and implement a Zero Trust network using Cloudflare Tunnels and Tailscale for secure access.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Zero Trust', 'Cloudflare', 'Tailscale', 'Security'],
    image: 'https://picsum.photos/seed/zero-trust-architecture/800/600'
  },
  {
    id: 'password-manager',
    title: 'Enterprise Password Management',
    description: 'Self-host and manage an enterprise-grade password manager using Vaultwarden (Bitwarden).',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['Password Management', 'Vaultwarden', 'Privacy', 'Security'],
    image: 'https://picsum.photos/seed/password-security/800/600'
  },
  {
    id: 'wifi-security',
    title: 'Wireless Security Auditing',
    description: 'Perform security assessments of wireless networks using the Aircrack-ng suite.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Wireless', 'Aircrack-ng', 'Auditing', 'Pentesting'],
    image: 'https://picsum.photos/seed/wifi-security/800/600'
  },
  {
    id: 'secure-boot',
    title: 'Implementing Secure Boot & TPM',
    description: 'Configure hardware-based security using UEFI Secure Boot and Trusted Platform Modules (TPM).',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Secure Boot', 'TPM', 'Hardware Security', 'UEFI'],
    image: 'https://picsum.photos/seed/secure-boot-tpm/800/600'
  },
  {
    id: 'bug-bounty',
    title: 'Setting up a Bug Bounty Program',
    description: 'Learn the operational and technical steps to launch and manage a corporate bug bounty program.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Bug Bounty', 'Vulnerability Disclosure', 'AppSec'],
    image: 'https://picsum.photos/seed/bug-bounty-program/800/600'
  },
  {
    id: 'forensic-analysis',
    title: 'Forensic Analysis of Disk Image',
    description: 'Perform deep-dive digital forensics on disk images using Autopsy and the Sleuth Kit.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Forensics', 'Autopsy', 'Incident Response', 'Sleuth Kit'],
    image: 'https://picsum.photos/seed/digital-forensics/800/600'
  },
  {
    id: 'dlp-config',
    title: 'Data Loss Prevention Setup',
    description: 'Configure and monitor data loss prevention (DLP) rules to prevent unauthorized data exfiltration.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['DLP', 'Data Privacy', 'Compliance', 'Security'],
    image: 'https://picsum.photos/seed/dlp-security/800/600'
  },
  {
    id: 'oauth2-oidc',
    title: 'Implementing OAuth2 & OIDC',
    description: 'Implement modern identity federation using OAuth2 and OpenID Connect with Keycloak.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['OAuth2', 'OIDC', 'Keycloak', 'Identity'],
    image: 'https://picsum.photos/seed/identity-federation/800/600'
  },
  {
    id: 'api-security',
    title: 'API Security Testing',
    description: 'Scan and test REST and GraphQL APIs for vulnerabilities using OWASP ZAP and Postman.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['API Security', 'OWASP ZAP', 'AppSec', 'Testing'],
    image: 'https://picsum.photos/seed/api-security-testing/800/600'
  },
  {
    id: 'nac-config',
    title: 'Network Access Control Config',
    description: 'Implement Network Access Control (NAC) using PacketFence to secure enterprise environments.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['NAC', 'PacketFence', 'Network Security', 'IEEE 802.1X'],
    image: 'https://picsum.photos/seed/nac-security/800/600'
  },
  {
    id: 'threat-intel',
    title: 'Threat Intelligence Platform',
    description: 'Set up and manage a Threat Intelligence Platform (TIP) using MISP for sharing indicators of compromise.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Threat Intel', 'MISP', 'IoC', 'Security Sharing'],
    image: 'https://picsum.photos/seed/threat-intelligence/800/600'
  },
  {
    id: 'incident-sim',
    title: 'Incident Response Simulation',
    description: 'Simulate a real-world security incident and manage the response using TheHive and Cortex.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Incident Response', 'TheHive', 'Cortex', 'Security Ops'],
    image: 'https://picsum.photos/seed/incident-response-sim/800/600'
  },
  {
    id: 'hash-cracking',
    title: 'Password Cracking with John the Ripper',
    description: 'Learn to use John the Ripper to crack various password hashes and understand the importance of strong hashing algorithms.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['John the Ripper', 'Password Cracking', 'Security', 'Kali'],
    image: 'https://picsum.photos/seed/john-the-ripper/800/600'
  },
  {
    id: 'social-toolkit',
    title: 'Social Engineering Toolkit (SET) Mastery',
    description: 'Master the Social-Engineer Toolkit (SET) to perform advanced phishing and credential harvesting simulations.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['SET', 'Social Engineering', 'Security', 'Kali'],
    image: 'https://picsum.photos/seed/social-engineering-toolkit/800/600'
  },
  {
    id: 'sqlmap-sqli',
    title: 'SQL Injection with Sqlmap',
    description: 'Use Sqlmap to automate the detection and exploitation of SQL injection vulnerabilities in web applications.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Sqlmap', 'SQLi', 'Web Security', 'Kali'],
    image: 'https://picsum.photos/seed/sqlmap-security/800/600'
  },
  {
    id: 'nikto-scan',
    title: 'Web Vulnerability Scanning with Nikto',
    description: 'Perform comprehensive web server scans using Nikto to find dangerous files, outdated software, and other security issues.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['Nikto', 'Web Security', 'Scanning', 'Kali'],
    image: 'https://picsum.photos/seed/nikto-web-scan/800/600'
  },
  {
    id: 'hashcat-recovery',
    title: 'Advanced Password Recovery with Hashcat',
    description: 'Use the power of GPU-accelerated password recovery with Hashcat to crack complex hashes and multi-stage encryptions.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Hashcat', 'Password Cracking', 'GPU', 'Security'],
    image: 'https://picsum.photos/seed/hashcat-security/800/600'
  },
  {
    id: 'linpeas-privesc',
    title: 'Linux Privilege Escalation with LinPEAS',
    description: 'Search for privilege escalation paths on Linux systems using automated tools like LinPEAS and manual enumeration techniques.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['PrivEsc', 'LinPEAS', 'Linux Security', 'Kali'],
    image: 'https://picsum.photos/seed/privilege-escalation/800/600'
  },
  {
    id: 'dvwa-exploit',
    title: 'Exploiting Web Vulnerabilities in DVWA',
    description: 'Learn to identify and exploit common web vulnerabilities like XSS, CSRF, and File Inclusion in the Damn Vulnerable Web App (DVWA).',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['DVWA', 'Web Security', 'XSS', 'CSRF'],
    image: 'https://picsum.photos/seed/dvwa-security/800/600'
  },
  {
    id: 'kali-hardening',
    title: 'Kali Linux Security Hardening',
    description: 'Secure your Kali Linux environment by configuring firewalls, disabling unnecessary services, and implementing full-disk encryption.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Hardening', 'Kali Linux', 'Linux Security', 'Security'],
    image: 'https://picsum.photos/seed/kali-hardening/800/600'
  },
  {
    id: 'ecommerce-db',
    title: 'E-commerce Database Schema',
    description: 'Design and implement a robust relational database schema for a complex e-commerce platform using PostgreSQL.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['PostgreSQL', 'SQL', 'Schema Design', 'Database'],
    image: 'https://picsum.photos/seed/ecommerce-db/800/600'
  },
  {
    id: 'blog-nosql',
    title: 'Blog Platform with MongoDB',
    description: 'Build a high-performance blog backend using MongoDB, focusing on document modeling and aggregation pipelines.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['MongoDB', 'NoSQL', 'Aggregation', 'Database'],
    image: 'https://picsum.photos/seed/blog-nosql/800/600'
  },
  {
    id: 'db-migration',
    title: 'Zero-Downtime DB Migration',
    description: 'Perform a complex database migration between versions or providers without interrupting service using blue-green techniques.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Migration', 'High Availability', 'Database', 'SRE'],
    image: 'https://picsum.photos/seed/db-migration/800/600'
  },
  {
    id: 'sharding-setup',
    title: 'Database Sharding Implementation',
    description: 'Implement horizontal scaling by sharding a large dataset across multiple database instances.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Sharding', 'Scalability', 'Distributed Systems', 'Database'],
    image: 'https://picsum.photos/seed/sharding-setup/800/600'
  },
  {
    id: 'query-optimization',
    title: 'Advanced Query Optimization',
    description: 'Analyze slow queries and implement indexing, caching, and rewriting strategies to improve performance by 10x.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Performance', 'Indexing', 'SQL', 'Optimization'],
    image: 'https://picsum.photos/seed/query-optimization/800/600'
  },
  {
    id: 'db-backup-recovery',
    title: 'Automated Backup & Recovery',
    description: 'Design and test an automated backup and disaster recovery system for mission-critical databases.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Backup', 'Disaster Recovery', 'Security', 'Database'],
    image: 'https://picsum.photos/seed/db-backup/800/600'
  },
  {
    id: 'graph-db-social',
    title: 'Social Graph with Neo4j',
    description: 'Model and query complex social relationships using Neo4j and the Cypher query language.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Neo4j', 'Graph Database', 'Social Network', 'Cypher'],
    image: 'https://picsum.photos/seed/neo4j-graph/800/600'
  },
  {
    id: 'influxdb-ts',
    title: 'Time-series with InfluxDB',
    description: 'Store and analyze high-velocity time-series data from IoT sensors using InfluxDB.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['InfluxDB', 'Time-series', 'IoT', 'Monitoring'],
    image: 'https://picsum.photos/seed/influxdb-ts/800/600'
  },
  {
    id: 'cockroachdb-dist',
    title: 'Distributed SQL with CockroachDB',
    description: 'Deploy and manage a globally distributed, resilient SQL database using CockroachDB.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['CockroachDB', 'Distributed SQL', 'High Availability', 'Database'],
    image: 'https://picsum.photos/seed/cockroachdb-security/800/600'
  },
  {
    id: 'elasticsearch-search',
    title: 'Full-text Search with Elasticsearch',
    description: 'Implement a powerful full-text search engine with autocomplete and relevance ranking using Elasticsearch.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Elasticsearch', 'Search', 'NoSQL', 'Indexing'],
    image: 'https://picsum.photos/seed/elasticsearch-search/800/600'
  },
  {
    id: 'clickhouse-analytics',
    title: 'Columnar DB with ClickHouse',
    description: 'Build a real-time analytics dashboard powered by the ClickHouse columnar database.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '7 hours',
    tags: ['ClickHouse', 'Analytics', 'OLAP', 'Big Data'],
    image: 'https://picsum.photos/seed/clickhouse-analytics/800/600'
  },
  {
    id: 'redis-kv',
    title: 'Key-Value Store with Redis',
    description: 'Master Redis data structures for caching, session management, and real-time pub/sub.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Redis', 'Caching', 'Key-Value', 'Database'],
    image: 'https://picsum.photos/seed/redis-kv/800/600'
  },
  {
    id: 'postgis-geo',
    title: 'Geospatial with PostGIS',
    description: 'Extend PostgreSQL with PostGIS to store and query complex geospatial data and perform spatial analysis.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['PostGIS', 'PostgreSQL', 'Geospatial', 'GIS'],
    image: 'https://picsum.photos/seed/postgis-geo/800/600'
  },
  {
    id: 'debezium-cdc',
    title: 'Change Data Capture with Debezium',
    description: 'Implement a real-time data streaming pipeline using Debezium to capture database changes and stream them to Kafka.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '9 hours',
    tags: ['Debezium', 'CDC', 'Kafka', 'Streaming'],
    image: 'https://picsum.photos/seed/debezium-cdc/800/600'
  },
  {
    id: 'milvus-vector',
    title: 'Vector DB for AI with Milvus',
    description: 'Store and search high-dimensional vector embeddings for AI applications using the Milvus vector database.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Milvus', 'Vector Database', 'AI', 'Embeddings'],
    image: 'https://picsum.photos/seed/milvus-vector/800/600'
  },
  {
    id: 'arangodb-multi',
    title: 'Multi-model with ArangoDB',
    description: 'Leverage the power of document, graph, and key-value models in a single database with ArangoDB.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['ArangoDB', 'Multi-model', 'NoSQL', 'Database'],
    image: 'https://picsum.photos/seed/arangodb-security/800/600'
  },
  {
    id: 'druid-analytics',
    title: 'Real-time Analytics with Druid',
    description: 'Implement low-latency analytics over large datasets using Apache Druid.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Druid', 'Analytics', 'OLAP', 'Big Data'],
    image: 'https://picsum.photos/seed/druid-analytics/800/600'
  },
  {
    id: 'pmm-monitor',
    title: 'DB Monitoring with PMM',
    description: 'Set up Percona Monitoring and Management (PMM) to gain deep visibility into your database performance.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['PMM', 'Monitoring', 'Database', 'Performance'],
    image: 'https://picsum.photos/seed/pmm-monitoring/800/600'
  },
  {
    id: 'postgres-hardening',
    title: 'PostgreSQL Security Hardening',
    description: 'Secure your PostgreSQL installations by implementing SSL, row-level security, and hardened configurations.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['PostgreSQL', 'Hardening', 'Security', 'Database'],
    image: 'https://picsum.photos/seed/postgres-security/800/600'
  },
  {
    id: 'planetscale-serverless',
    title: 'Serverless DB with PlanetScale',
    description: 'Learn to manage a serverless Vitess-powered database with branching and safe migrations using PlanetScale.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['PlanetScale', 'Vitess', 'Serverless', 'MySQL'],
    image: 'https://picsum.photos/seed/planetscale-security/800/600'
  },
  {
    id: 'titanic-analysis',
    title: 'Titanic Survivor Prediction',
    description: 'Build a classification model to predict passenger survival on the Titanic using the classic Kaggle dataset.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '5 hours',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Classification'],
    image: 'https://picsum.photos/seed/titanic-ds/800/600'
  },
  {
    id: 'stock-prediction',
    title: 'Stock Market Trend Analysis',
    description: 'Analyze historical stock data and build time-series forecasting models using LSTM networks.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['LSTM', 'Time Series', 'Finance', 'Keras'],
    image: 'https://picsum.photos/seed/stock-ds/800/600'
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation Analysis',
    description: 'Use unsupervised learning (K-Means) to segment customers based on their purchasing behavior.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['K-Means', 'Clustering', 'Marketing', 'Sklearn'],
    image: 'https://picsum.photos/seed/segmentation-ds/800/600'
  },
  {
    id: 'sentiment-analysis',
    title: 'Twitter Sentiment Analysis',
    description: 'Build a natural language processing pipeline to classify the sentiment of tweets in real-time.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '7 hours',
    tags: ['NLP', 'NLTK', 'Sentiment', 'Python'],
    image: 'https://picsum.photos/seed/sentiment-ds/800/600'
  },
  {
    id: 'house-price-pred',
    title: 'Real Estate Price Prediction',
    description: 'Predict housing prices using regression techniques and feature engineering on a large-scale dataset.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Regression', 'XGBoost', 'Housing', 'EDA'],
    image: 'https://picsum.photos/seed/housing-ds/800/600'
  },
  {
    id: 'fraud-detection',
    title: 'Credit Card Fraud Detection',
    description: 'Build a highly accurate fraud detection system using anomaly detection and class-balancing techniques.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Anomaly Detection', 'SMOTE', 'Finance', 'Security'],
    image: 'https://picsum.photos/seed/fraud-ds/800/600'
  },
  {
    id: 'image-classification-ds',
    title: 'Image Classification with CNNs',
    description: 'Train a convolutional neural network to classify images from the CIFAR-10 dataset.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Deep Learning', 'CNN', 'PyTorch', 'CV'],
    image: 'https://picsum.photos/seed/images-ds/800/600'
  },
  {
    id: 'recommender-system-ds',
    title: 'Product Recommendation Engine',
    description: 'Implement collaborative filtering and content-based recommendation systems for an e-commerce platform.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '10 hours',
    tags: ['Recommendation', 'Surprise', 'E-commerce', 'Python'],
    image: 'https://picsum.photos/seed/recommender-ds/800/600'
  },
  {
    id: 'movie-genre-classifier',
    title: 'Movie Genre Classifier',
    description: 'Predict movie genres based on plot summaries using multi-label classification and NLP.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['NLP', 'Multi-label', 'Classification', 'TF-IDF'],
    image: 'https://picsum.photos/seed/movies-ds/800/600'
  },
  {
    id: 'air-quality-forecast',
    title: 'Air Quality Forecasting',
    description: 'Analyze and predict air pollution levels using sensor data and time-series modeling.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Time Series', 'Environment', 'ARIMA', 'Prophet'],
    image: 'https://picsum.photos/seed/air-ds/800/600'
  },
  {
    id: 'spam-detector',
    title: 'Email Spam Detection',
    description: 'Build a robust spam classifier using Naive Bayes and text vectorization techniques.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Naive Bayes', 'NLP', 'Text Classification'],
    image: 'https://picsum.photos/seed/spam-ds/800/600'
  },
  {
    id: 'credit-scoring',
    title: 'Credit Scoring Model',
    description: 'Develop a credit risk assessment model to predict the likelihood of default for loan applicants.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Logistic Regression', 'Finance', 'Credit Risk'],
    image: 'https://picsum.photos/seed/credit-ds/800/600'
  },
  {
    id: 'fake-news-detector',
    title: 'Fake News Detector',
    description: 'Use machine learning to identify and flag deceptive news articles and misinformation.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['NLP', 'Social Media', 'Deep Learning'],
    image: 'https://picsum.photos/seed/news-ds/800/600'
  },
  {
    id: 'customer-churn',
    title: 'Customer Churn Prediction',
    description: 'Predict which customers are likely to cancel their subscriptions using ensemble methods.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Random Forest', 'Churn', 'Retention', 'Python'],
    image: 'https://picsum.photos/seed/churn-ds/800/600'
  },
  {
    id: 'diabetes-prediction',
    title: 'Diabetes Prediction Model',
    description: 'Analyze medical data to predict the onset of diabetes in patients using health indicators.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Healthcare', 'SVM', 'Binary Classification'],
    image: 'https://picsum.photos/seed/diabetes-ds/800/600'
  },
  {
    id: 'object-detection-ds',
    title: 'Object Detection with YOLO',
    description: 'Implement real-time object detection in videos using the YOLO (You Only Look Once) architecture.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['YOLO', 'Computer Vision', 'Deep Learning'],
    image: 'https://picsum.photos/seed/yolo-ds/800/600'
  },
  {
    id: 'music-recommendation',
    title: 'Music Recommendation System',
    description: 'Build a personalized music discovery engine based on listening history and audio features.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Recommendation', 'Spotify API', 'Clustering'],
    image: 'https://picsum.photos/seed/music-ds/800/600'
  },
  {
    id: 'traffic-sign-recognition',
    title: 'Traffic Sign Recognition',
    description: 'Train a deep learning model to accurately classify traffic signs for autonomous vehicle applications.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['CNN', 'Autonomous Driving', 'CV', 'TensorFlow'],
    image: 'https://picsum.photos/seed/traffic-ds/800/600'
  },
  {
    id: 'loan-approval-pred',
    title: 'Loan Approval Prediction',
    description: 'Automate the loan approval process using historical data and predictive modeling.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Decision Tree', 'Finance', 'Automation'],
    image: 'https://picsum.photos/seed/loan-ds/800/600'
  },
  {
    id: 'face-mask-detection',
    title: 'Face Mask Detection',
    description: 'Build a real-time face mask detection system using OpenCV and deep learning.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['OpenCV', 'Deep Learning', 'Public Safety'],
    image: 'https://picsum.photos/seed/mask-ds/800/600'
  },
  {
    id: 'wine-quality-ds',
    title: 'Wine Quality Analysis',
    description: 'Predict the quality of wine based on physicochemical tests using regression and decision trees.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Regression', 'Decision Tree', 'Food Science'],
    image: 'https://picsum.photos/seed/wine-ds/800/600'
  },
  {
    id: 'mnist-digit-recognition',
    title: 'Handwritten Digit Recognition',
    description: 'Build a neural network to recognize handwritten digits from the MNIST dataset with high accuracy.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Neural Networks', 'MNIST', 'TensorFlow'],
    image: 'https://picsum.photos/seed/mnist-ds/800/600'
  },
  {
    id: 'customer-lifetime-value',
    title: 'Customer Lifetime Value Prediction',
    description: 'Estimate the future value of customers using probabilistic models and historical transaction data.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Marketing', 'CLV', 'Regression'],
    image: 'https://picsum.photos/seed/clv-ds/800/600'
  },
  {
    id: 'dog-breed-classifier',
    title: 'Dog Breed Classifier',
    description: 'Use transfer learning with ResNet or Inception to classify different dog breeds from images.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Transfer Learning', 'CNN', 'PyTorch'],
    image: 'https://picsum.photos/seed/dogs-ds/800/600'
  },
  {
    id: 'sales-forecasting',
    title: 'Retail Sales Forecasting',
    description: 'Predict future sales for multiple retail stores using time-series analysis and exogenous variables.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Time Series', 'Retail', 'XGBoost'],
    image: 'https://picsum.photos/seed/sales-ds/800/600'
  },
  {
    id: 'chatbot-nlp',
    title: 'NLP-based Chatbot',
    description: 'Develop an intelligent chatbot using seq2seq models or Transformers for natural language understanding.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['NLP', 'Transformers', 'Chatbot', 'Keras'],
    image: 'https://picsum.photos/seed/chatbot-ds/800/600'
  },
  {
    id: 'credit-card-segmentation',
    title: 'Credit Card User Segmentation',
    description: 'Apply clustering algorithms to segment credit card users based on their usage patterns and credit limits.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Clustering', 'PCA', 'Finance'],
    image: 'https://picsum.photos/seed/cc-segmentation-ds/800/600'
  },
  {
    id: 'anomaly-detection-it',
    title: 'IT Infrastructure Anomaly Detection',
    description: 'Identify unusual patterns in server logs and metrics to detect potential hardware failures or security breaches.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Anomaly Detection', 'Isolation Forest', 'AIOps'],
    image: 'https://picsum.photos/seed/it-anomaly-ds/800/600'
  },
  {
    id: 'weather-prediction',
    title: 'Daily Weather Prediction',
    description: 'Build a model to predict daily weather conditions based on historical atmospheric data.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Regression', 'Meteorology', 'Ensemble Learning'],
    image: 'https://picsum.photos/seed/weather-ds/800/600'
  },
  {
    id: 'movie-recommendation-als',
    title: 'Movie Recommendations with ALS',
    description: 'Implement a scalable recommendation system using Alternating Least Squares (ALS) in Apache Spark.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Spark', 'Recommendation', 'Big Data'],
    image: 'https://picsum.photos/seed/spark-recommender-ds/800/600'
  },
  {
    id: 'heart-disease-pred',
    title: 'Heart Disease Prediction',
    description: 'Analyze patient health records to predict the presence of heart disease using classification models.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Healthcare', 'Logistic Regression', 'EDA'],
    image: 'https://picsum.photos/seed/heart-ds/800/600'
  },
  {
    id: 'nlp-resume-parser',
    title: 'NLP Resume Parser',
    description: 'Build a system to automatically extract key information from resumes using Named Entity Recognition (NER).',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['NLP', 'spaCy', 'NER', 'Automation'],
    image: 'https://picsum.photos/seed/resume-parser-ds/800/600'
  },
  {
    id: 'taxi-fare-prediction',
    title: 'Taxi Fare Prediction',
    description: 'Predict taxi fares based on pickup/dropoff locations and time of day using regression.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Regression', 'Geospatial', 'Feature Engineering'],
    image: 'https://picsum.photos/seed/taxi-ds/800/600'
  },
  {
    id: 'language-translator',
    title: 'Machine Language Translator',
    description: 'Build a neural machine translation system to translate text between languages using RNNs.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['NLP', 'NMT', 'RNN', 'Sequence Modeling'],
    image: 'https://picsum.photos/seed/translator-ds/800/600'
  },
  {
    id: 'air-passenger-forecast',
    title: 'Airline Passenger Forecasting',
    description: 'Analyze and forecast monthly airline passenger counts using classical time-series methods.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Time Series', 'Forecasting', 'Seasonality'],
    image: 'https://picsum.photos/seed/airline-ds/800/600'
  },
  {
    id: 'breast-cancer-classifier',
    title: 'Breast Cancer Classifier',
    description: 'Classify tumors as malignant or benign based on cell feature measurements.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '3 hours',
    tags: ['Healthcare', 'SVM', 'Binary Classification'],
    image: 'https://picsum.photos/seed/cancer-ds/800/600'
  },
  {
    id: 'toxic-comment-classifier',
    title: 'Toxic Comment Classifier',
    description: 'Identify and categorize toxic behavior in online comments using multi-label NLP models.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['NLP', 'Multi-label', 'Deep Learning'],
    image: 'https://picsum.photos/seed/toxic-ds/800/600'
  },
  {
    id: 'energy-consumption-pred',
    title: 'Energy Consumption Prediction',
    description: 'Forecast building energy consumption based on historical usage and weather patterns.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Regression', 'Time Series', 'Sustainability'],
    image: 'https://picsum.photos/seed/energy-ds/800/600'
  },
  {
    id: 'bird-species-classifier',
    title: 'Bird Species Classifier',
    description: 'Train a deep learning model to identify bird species from audio recordings of their songs.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Audio Analysis', 'Deep Learning', 'CNN'],
    image: 'https://picsum.photos/seed/birds-ds/800/600'
  },
  {
    id: 'market-basket-analysis',
    title: 'Market Basket Analysis',
    description: 'Discover association rules between products purchased together using the Apriori algorithm.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Association Rules', 'Mining', 'Retail'],
    image: 'https://picsum.photos/seed/basket-ds/800/600'
  },
  {
    id: 'predictive-maintenance-ds',
    title: 'Industrial Predictive Maintenance',
    description: 'Predict equipment failure before it happens using sensor data and survival analysis models.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['IoT', 'Predictive Maintenance', 'XGBoost'],
    image: 'https://picsum.photos/seed/maintenance-ds/800/600'
  },
  {
    id: 'supply-chain-opt',
    title: 'Supply Chain Optimization',
    description: 'Optimize inventory levels and distribution routes using linear programming and simulation.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Optimization', 'Operations Research', 'Python'],
    image: 'https://picsum.photos/seed/supply-chain-ds/800/600'
  },
  {
    id: 'facial-expression-recognition',
    title: 'Facial Expression Recognition',
    description: 'Classify human emotions from facial images using deep learning and real-time video processing.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['CNN', 'Deep Learning', 'Computer Vision'],
    image: 'https://picsum.photos/seed/emotions-ds/800/600'
  },
  {
    id: 'customer-segmentation-rfm',
    title: 'RFM Customer Segmentation',
    description: 'Perform Recency, Frequency, and Monetary (RFM) analysis to identify high-value customer segments.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Marketing', 'RFM', 'Analytics'],
    image: 'https://picsum.photos/seed/rfm-ds/800/600'
  },
  {
    id: 'cryptocurrency-price-pred',
    title: 'Cryptocurrency Price Prediction',
    description: 'Analyze crypto market trends and build short-term price prediction models using GRU networks.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['Crypto', 'GRU', 'Deep Learning', 'Finance'],
    image: 'https://picsum.photos/seed/crypto-ds/800/600'
  },
  {
    id: 'hand-gesture-recognition',
    title: 'Hand Gesture Recognition',
    description: 'Build a system to recognize hand gestures for human-computer interaction using MediaPipe and CNNs.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['OpenCV', 'Deep Learning', 'HCI'],
    image: 'https://picsum.photos/seed/gesture-ds/800/600'
  },
  {
    id: 'fake-profile-detection',
    title: 'Fake Social Profile Detection',
    description: 'Identify fraudulent social media accounts using network analysis and behavioral features.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Social Media', 'Graph Theory', 'Classification'],
    image: 'https://picsum.photos/seed/fake-profile-ds/800/600'
  },
  {
    id: 'wildfire-prediction',
    title: 'Wildfire Risk Prediction',
    description: 'Assess and predict wildfire risk using satellite imagery and historical climate data.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Remote Sensing', 'Environmental Science', 'Deep Learning'],
    image: 'https://picsum.photos/seed/wildfire-ds/800/600'
  },
  {
    id: 'resume-screening-automation',
    title: 'Automated Resume Screening',
    description: 'Build an end-to-end pipeline to rank job applicants based on resume content and job descriptions.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['NLP', 'Cosine Similarity', 'HR Tech'],
    image: 'https://picsum.photos/seed/resume-screen-ds/800/600'
  },
  {
    id: 'molecular-modeling',
    title: 'Molecular Property Prediction',
    description: 'Predict molecular properties for drug discovery using Graph Neural Networks (GNNs).',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Drug Discovery', 'GNN', 'Bioinformatics'],
    image: 'https://picsum.photos/seed/molecules-ds/800/600'
  },
  {
    id: 'smart-grid-stability',
    title: 'Smart Grid Stability Prediction',
    description: 'Analyze and predict the stability of a decentralized smart grid system.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Energy', 'Classification', 'Grid Tech'],
    image: 'https://picsum.photos/seed/smartgrid-ds/800/600'
  },
  {
    id: 'amazon-review-analysis',
    title: 'Amazon Product Review Sentiment',
    description: 'Perform large-scale sentiment analysis on millions of Amazon product reviews using Spark NLP.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Big Data', 'Spark NLP', 'Sentiment'],
    image: 'https://picsum.photos/seed/amazon-reviews-ds/800/600'
  },
  {
    id: 'credit-default-prediction',
    title: 'Credit Card Default Prediction',
    description: 'Build a deep learning model to predict the probability of default for credit card customers.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Deep Learning', 'Finance', 'Classification'],
    image: 'https://picsum.photos/seed/default-ds/800/600'
  },
  {
    id: 'object-tracking-video',
    title: 'Real-time Object Tracking',
    description: 'Implement multi-object tracking in video streams using DeepSORT and YOLO.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['DeepSORT', 'Computer Vision', 'Video Analytics'],
    image: 'https://picsum.photos/seed/tracking-ds/800/600'
  },
  {
    id: 'retail-store-optimization',
    title: 'Retail Store Layout Optimization',
    description: 'Analyze customer movement patterns to optimize store layout and product placement.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Spatial Analysis', 'Retail', 'Optimization'],
    image: 'https://picsum.photos/seed/store-ds/800/600'
  },
  {
    id: 'gan-image-generation',
    title: 'Generative Image Synthesis',
    description: 'Build and train a Generative Adversarial Network (GAN) to generate realistic images.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '20 hours',
    tags: ['GAN', 'Generative AI', 'Deep Learning'],
    image: 'https://picsum.photos/seed/gan-ds/800/600'
  },
  {
    id: 'reinforcement-learning-game',
    title: 'RL Agent for Classic Games',
    description: 'Train a reinforcement learning agent to master Atari games or chess using Q-Learning.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '18 hours',
    tags: ['Reinforcement Learning', 'OpenAI Gym', 'AI'],
    image: 'https://picsum.photos/seed/rl-ds/800/600'
  },
  {
    id: 'disease-outbreak-prediction',
    title: 'Disease Outbreak Prediction',
    description: 'Model the spread of infectious diseases and predict potential outbreaks using epidemiological data.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Epidemiology', 'SIR Models', 'Public Health'],
    image: 'https://picsum.photos/seed/outbreak-ds/800/600'
  },
  {
    id: 'geospatial-intelligence',
    title: 'Geospatial Intelligence Analysis',
    description: 'Leverage GIS data and satellite imagery to gain insights into urban development and land use.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['GIS', 'Geospatial', 'Remote Sensing'],
    image: 'https://picsum.photos/seed/gis-ds/800/600'
  },
  {
    id: 'customer-churn-telco',
    title: 'Telecom Churn Prediction',
    description: 'Build a high-performance churn prediction model for the telecommunications industry.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Telecom', 'Churn', 'Gradient Boosting'],
    image: 'https://picsum.photos/seed/telco-ds/800/600'
  },
  {
    id: 'movie-recommender-als',
    title: 'Scalable Movie Recommendations',
    description: 'Use Apache Spark and the ALS algorithm to build a recommendation engine that scales to millions of users.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Big Data', 'Spark', 'Recommendation'],
    image: 'https://picsum.photos/seed/movie-als-ds/800/600'
  },
  {
    id: 'credit-default-risk',
    title: 'Credit Default Risk Assessment',
    description: 'Predict the probability of a client defaulting on a loan using a large-scale financial dataset.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Finance', 'Credit Risk', 'XGBoost'],
    image: 'https://picsum.photos/seed/risk-ds/800/600'
  },
  {
    id: 'image-segmentation-medical',
    title: 'Medical Image Segmentation',
    description: 'Use U-Net architectures to segment tumors and anomalies in MRI and CT scan images.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '20 hours',
    tags: ['Healthcare', 'Deep Learning', 'Computer Vision'],
    image: 'https://picsum.photos/seed/medical-ds/800/600'
  },
  {
    id: 'stock-sentiment-analysis',
    title: 'Financial News Sentiment',
    description: 'Correlate financial news sentiment with stock price movements using NLP and time-series analysis.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['NLP', 'Finance', 'Sentiment'],
    image: 'https://picsum.photos/seed/stock-sentiment-ds/800/600'
  },
  {
    id: 'house-price-prediction-advanced',
    title: 'Advanced Housing Price Models',
    description: 'Implement stacked ensemble models and advanced feature engineering to win housing price prediction challenges.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Ensemble', 'Regression', 'Feature Engineering'],
    image: 'https://picsum.photos/seed/advanced-housing-ds/800/600'
  },
  {
    id: 'churn-prediction-subscription',
    title: 'SaaS Subscription Churn',
    description: 'Analyze user activity logs to predict churn in a subscription-based SaaS application.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['SaaS', 'Churn', 'Survival Analysis'],
    image: 'https://picsum.photos/seed/saas-churn-ds/800/600'
  },
  {
    id: 'real-time-fraud-detection',
    title: 'Real-time Fraud Monitoring',
    description: 'Build a streaming fraud detection system using Kafka and online learning models.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Streaming', 'Kafka', 'Fraud'],
    image: 'https://picsum.photos/seed/live-fraud-ds/800/600'
  },
  {
    id: 'product-categorization-ecommerce',
    title: 'E-commerce Product Classifier',
    description: 'Automatically categorize products into hierarchical taxonomies based on their descriptions and images.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Multi-modal', 'NLP', 'Computer Vision'],
    image: 'https://picsum.photos/seed/product-ds/800/600'
  },
  {
    id: 'anomaly-detection-cyber',
    title: 'Cybersecurity Threat Detection',
    description: 'Use unsupervised learning to identify network intrusions and malicious activity in traffic logs.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Security', 'Anomaly Detection', 'Network Analysis'],
    image: 'https://picsum.photos/seed/cyber-ds-ds/800/600'
  },
  {
    id: 'natural-disaster-response',
    title: 'Disaster Response NLP',
    description: 'Classify disaster-related messages to help emergency responders prioritize relief efforts.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '7 hours',
    tags: ['NLP', 'Social Good', 'Emergency'],
    image: 'https://picsum.photos/seed/disaster-ds/800/600'
  },
  {
    id: 'market-segmentation-unsupervised',
    title: 'Unsupervised Market Discovery',
    description: 'Discover hidden patterns in customer data to identify new market segments using manifold learning (t-SNE).',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['t-SNE', 'Clustering', 'Strategy'],
    image: 'https://picsum.photos/seed/market-ds/800/600'
  },
  {
    id: 'language-identification-nlp',
    title: 'Multi-lingual ID System',
    description: 'Build a system that can identify the language of a given text sample for over 100 languages.',
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['NLP', 'Naive Bayes', 'Global'],
    image: 'https://picsum.photos/seed/language-id-ds/800/600'
  },
  {
    id: 'inventory-demand-forecasting',
    title: 'Demand Forecasting for Logistics',
    description: 'Predict future product demand to optimize supply chain and inventory management.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Supply Chain', 'Forecasting', 'Regression'],
    image: 'https://picsum.photos/seed/logistics-ds/800/600'
  },
  {
    id: 'audio-sentiment-analysis',
    title: 'Voice Emotion Recognition',
    description: 'Detect emotions in spoken language using spectral features and neural networks.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Audio', 'Deep Learning', 'HCI'],
    image: 'https://picsum.photos/seed/voice-ds/800/600'
  },
  {
    id: 'facial-recognition-security',
    title: 'Facial Recognition Attendance',
    description: 'Implement a secure facial recognition system for automated attendance tracking.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '10 hours',
    tags: ['FaceNet', 'Security', 'Computer Vision'],
    image: 'https://picsum.photos/seed/attendance-ds/800/600'
  },
  {
    id: 'medical-diagnosis-ai',
    title: 'AI-assisted Diagnosis',
    description: 'Build a diagnostic tool for respiratory diseases using clinical data and sound analysis.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Healthcare', 'Deep Learning', 'Diagnosis'],
    image: 'https://picsum.photos/seed/med-ai-ds/800/600'
  },
  {
    id: 'weather-forecasting-lstm',
    title: 'Advanced Weather Forecasting',
    description: 'Use LSTM and Transformer architectures to predict complex weather patterns.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Weather', 'Deep Learning', 'Time Series'],
    image: 'https://picsum.photos/seed/weather-pro-ds/800/600'
  },
  {
    id: 'customer-journey-mapping',
    title: 'Customer Journey Analytics',
    description: 'Analyze path-to-purchase data to understand and optimize the customer journey.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Analytics', 'Marketing', 'Sequence Data'],
    image: 'https://picsum.photos/seed/journey-ds/800/600'
  },
  {
    id: 'ai-stock-trader',
    title: 'Automated AI Stock Trader',
    description: 'Build a reinforcement learning agent that learns to trade stocks in a simulated market.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '20 hours',
    tags: ['Finance', 'RL', 'Trading'],
    image: 'https://picsum.photos/seed/trader-ds/800/600'
  },
  {
    id: 'social-network-influence',
    title: 'Influence Maximization Analysis',
    description: 'Identify key influencers in a social network using centrality measures and information diffusion models.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['Graph Theory', 'Social Media', 'Network Science'],
    image: 'https://picsum.photos/seed/influence-ds/800/600'
  },
  {
    id: 'malware-detection-ds',
    title: 'ML-based Malware Detection',
    description: 'Detect malware in binary files using static analysis and machine learning features.',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Security', 'Binary Analysis', 'Deep Learning'],
    image: 'https://picsum.photos/seed/malware-ml-ds/800/600'
  },
  {
    id: 'docker-optimization',
    title: 'Multi-stage Build Optimization',
    description: 'Learn to use multi-stage builds to create tiny, secure, and efficient production Docker images.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Docker', 'Optimization', 'Security'],
    image: 'https://picsum.photos/seed/docker-opt/800/600'
  },
  {
    id: 'docker-volumes-persistent',
    title: 'Persistent Storage with Docker Volumes',
    description: 'Master Docker volumes and bind mounts to ensure data persistence across container restarts.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '2 hours',
    tags: ['Docker', 'Storage', 'Persistence'],
    image: 'https://picsum.photos/seed/docker-storage/800/600'
  },
  {
    id: 'docker-networking-custom',
    title: 'Container Networking with Bridges',
    description: 'Design and implement custom Docker bridge networks to isolate and connect your multi-container applications.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Docker', 'Networking', 'Security'],
    image: 'https://picsum.photos/seed/docker-net/800/600'
  },
  {
    id: 'docker-cicd-github',
    title: 'CI/CD with Docker & GitHub Actions',
    description: 'Automate the building, testing, and pushing of Docker images to registries using GitHub Actions.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Docker', 'CI/CD', 'GitHub Actions'],
    image: 'https://picsum.photos/seed/docker-cicd/800/600'
  },
  {
    id: 'docker-monitoring-prom',
    title: 'Monitoring Containers with Prometheus',
    description: 'Set up a monitoring stack using Prometheus and Grafana to track the health and performance of your Docker containers.',
    category: 'DevOps',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Docker', 'Monitoring', 'Prometheus'],
    image: 'https://picsum.photos/seed/docker-mon/800/600'
  },
  {
    id: 'docker-hardening-trivy',
    title: 'Hardening Docker Images with Trivy',
    description: 'Identify and remediate security vulnerabilities in your Docker images using the Trivy vulnerability scanner.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Docker', 'Security', 'Trivy'],
    image: 'https://picsum.photos/seed/docker-security/800/600'
  },
  {
    id: 'dockerizing-legacy-app',
    title: 'Dockerizing a Legacy Application',
    description: 'Learn the techniques for containerizing older applications with complex dependencies and environment requirements.',
    category: 'DevOps',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Docker', 'Legacy', 'Migration'],
    image: 'https://picsum.photos/seed/docker-legacy/800/600'
  },
  {
    id: 'web-scraper',
    title: 'Real-time Web Scraper',
    description: 'Build a high-performance web scraper using BeautifulSoup and Scrapy to extract and process data from multiple sources.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Python', 'BeautifulSoup', 'Scrapy', 'Web'],
    image: 'https://picsum.photos/seed/web-scraper/800/600'
  },
  {
    id: 'automation-bot',
    title: 'Discord Automation Bot',
    description: 'Create a feature-rich Discord bot with custom commands, automated moderation, and API integrations.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Python', 'Discord.py', 'API', 'Automation'],
    image: 'https://picsum.photos/seed/discord-bot/800/600'
  },
  {
    id: 'django-ecommerce',
    title: 'E-commerce with Django',
    description: 'Develop a full-scale e-commerce platform with product catalogs, shopping carts, and payment gateway integration.',
    category: 'Python',
    difficulty: 'Advanced',
    duration: '15 hours',
    tags: ['Django', 'Python', 'PostgreSQL', 'Payments'],
    image: 'https://picsum.photos/seed/django-shop/800/600'
  },
  {
    id: 'flask-api',
    title: 'REST API with Flask',
    description: 'Build and document a professional RESTful API with Flask-RESTful and Swagger.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '4 hours',
    tags: ['Flask', 'API', 'Python', 'Swagger'],
    image: 'https://picsum.photos/seed/flask-api/800/600'
  },
  {
    id: 'python-data-viz',
    title: 'Interactive Data Dashboard',
    description: 'Create dynamic data visualizations and dashboards using Plotly Dash and Streamlit.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Python', 'Dash', 'Streamlit', 'Data Viz'],
    image: 'https://picsum.photos/seed/py-viz/800/600'
  },
  {
    id: 'python-game',
    title: '2D Game with Pygame',
    description: 'Learn the fundamentals of game development by building a classic 2D arcade game.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '8 hours',
    tags: ['Python', 'Pygame', 'Game Dev'],
    image: 'https://picsum.photos/seed/pygame/800/600'
  },
  {
    id: 'python-ml-model',
    title: 'Linear Regression Model',
    description: 'Implement a linear regression model from scratch to predict house prices.',
    category: 'Python',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['Python', 'ML', 'Math', 'Sklearn'],
    image: 'https://picsum.photos/seed/py-ml/800/600'
  },
  {
    id: 'python-gui-app',
    title: 'Desktop App with Tkinter',
    description: 'Build a cross-platform desktop application with a modern graphical user interface.',
    category: 'Python',
    difficulty: 'Beginner',
    duration: '4 hours',
    tags: ['Python', 'Tkinter', 'GUI'],
    image: 'https://picsum.photos/seed/py-gui/800/600'
  },
  {
    id: 'python-network-scanner',
    title: 'Custom Network Scanner',
    description: 'Develop a security tool that scans networks for active hosts and open ports using Scapy.',
    category: 'Python',
    difficulty: 'Advanced',
    duration: '7 hours',
    tags: ['Python', 'Scapy', 'Security', 'Networking'],
    image: 'https://picsum.photos/seed/py-net/800/600'
  },
  {
    id: 'python-crypto-tracker',
    title: 'Crypto Price Tracker',
    description: 'Build a real-time cryptocurrency tracker with price alerts and historical analysis.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '5 hours',
    tags: ['Python', 'API', 'Crypto', 'Finance'],
    image: 'https://picsum.photos/seed/py-crypto/800/600'
  },
  {
    id: 'python-log-parser',
    title: 'Cloud Log Analytics Tool',
    description: 'Parse and analyze millions of cloud server logs to detect security threats and performance bottlenecks.',
    category: 'Python',
    difficulty: 'Intermediate',
    duration: '6 hours',
    tags: ['Python', 'Regex', 'Cloud', 'Logs'],
    image: 'https://picsum.photos/seed/py-logs/800/600'
  }
];

const derivedProjects: Project[] = [];

learningPaths.forEach(path => {
  if (path.id === 'kubernetes' || path.id.startsWith('k8s-')) {
    path.projects.forEach(proj => {
      const tags = path.title.split(' + ').map(t => t.trim());
      derivedProjects.push({
        id: proj.id,
        title: proj.title,
        description: `Hands-on lab project from the "${path.title}" learning tree. Solve step-by-step in the browser terminal.`,
        category: 'Kubernetes',
        difficulty: proj.difficulty || 'Intermediate',
        duration: proj.estimatedTime || '1 hour',
        tags: [...tags, 'Interactive Lab', 'Kubernetes'],
        image: `https://picsum.photos/seed/${proj.id}/800/600`
      });
    });
  }
});

export const projects: Project[] = [
  ...staticProjects,
  ...derivedProjects
];
