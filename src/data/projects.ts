export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AWS' | 'Azure' | 'GCP' | 'Kubernetes' | 'DevOps' | 'Security';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  image: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Deploy a High-Availability Web App on AWS',
    description: 'Learn to set up an Auto Scaling Group with an Application Load Balancer and RDS database.',
    category: 'AWS',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['EC2', 'RDS', 'ALB', 'Auto Scaling'],
    image: 'https://picsum.photos/seed/aws-architecture/800/600'
  },
  {
    id: '2',
    title: 'Kubernetes Cluster Monitoring with Prometheus',
    description: 'Deploy a full monitoring stack on K8s and configure custom alerts for your services.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '3 hours',
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
    title: 'Infrastructure as Code with Terraform & GCP',
    description: 'Provision a complete Google Cloud environment using Terraform modules and state management.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Terraform', 'GCE', 'VPC', 'IAM'],
    image: 'https://picsum.photos/seed/terraform-gcp/800/600'
  },
  {
    id: '5',
    title: 'CI/CD Pipeline with GitHub Actions',
    description: 'Automate your build, test, and deployment workflow for a modern React application.',
    category: 'DevOps',
    difficulty: 'Beginner',
    duration: '45 mins',
    tags: ['GitHub Actions', 'Docker', 'CI/CD'],
    image: 'https://picsum.photos/seed/github-actions/800/600'
  },
  {
    id: '6',
    title: 'Securing Cloud Native Apps with Vault',
    description: 'Implement secret management and dynamic credentials using HashiCorp Vault on AWS.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Vault', 'Secrets', 'Security', 'AWS'],
    image: 'https://picsum.photos/seed/hashicorp-vault/800/600'
  },
  {
    id: '7',
    title: 'Serverless Image Processing with AWS Lambda',
    description: 'Build an automated image processing workflow using S3 triggers, Lambda, and Amazon Rekognition.',
    category: 'AWS',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Lambda', 'S3', 'Rekognition', 'Python'],
    image: 'https://picsum.photos/seed/aws-lambda-serverless/800/600'
  },
  {
    id: '8',
    title: 'Data Warehousing with Google BigQuery',
    description: 'Design and implement a scalable data warehouse for e-commerce analytics using BigQuery and Dataflow.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['BigQuery', 'Dataflow', 'SQL', 'GCP'],
    image: 'https://picsum.photos/seed/google-bigquery/800/600'
  },
  {
    id: '9',
    title: 'Service Mesh Implementation with Istio',
    description: 'Enhance your Kubernetes microservices with traffic management, security, and observability using Istio.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Istio', 'K8s', 'Service Mesh', 'Envoy'],
    image: 'https://picsum.photos/seed/istio-service-mesh/800/600'
  },
  {
    id: '10',
    title: 'GitOps Workflow with ArgoCD',
    description: 'Implement a modern GitOps continuous delivery pipeline for Kubernetes applications using ArgoCD.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['ArgoCD', 'GitOps', 'K8s', 'Helm'],
    image: 'https://picsum.photos/seed/argocd-gitops/800/600'
  },
  {
    id: '11',
    title: 'Cloud Compliance Auditing with Prowler',
    description: 'Automate security best practices and compliance auditing for AWS environments using Prowler.',
    category: 'Security',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Prowler', 'Compliance', 'AWS', 'Security'],
    image: 'https://picsum.photos/seed/aws-security-audit/800/600'
  },
  {
    id: '12',
    title: 'Hybrid Cloud Connectivity with Azure VPN',
    description: 'Set up a secure site-to-site VPN connection between on-premises data centers and Azure VNet.',
    category: 'Azure',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['VPN Gateway', 'VNet', 'Networking', 'Azure'],
    image: 'https://picsum.photos/seed/azure-networking-vpn/800/600'
  },
  {
    id: '13',
    title: 'Containerizing Microservices with Amazon ECS & Fargate',
    description: 'Deploy and manage scalable containerized applications without managing servers using ECS Fargate.',
    category: 'AWS',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['ECS', 'Fargate', 'Docker', 'AWS'],
    image: 'https://picsum.photos/seed/amazon-ecs-fargate/800/600'
  },
  {
    id: '14',
    title: 'Scalable NoSQL Design with Amazon DynamoDB',
    description: 'Master single-table design patterns and global secondary indexes for high-performance NoSQL databases.',
    category: 'AWS',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['DynamoDB', 'NoSQL', 'Serverless', 'AWS'],
    image: 'https://picsum.photos/seed/amazon-dynamodb/800/600'
  },
  {
    id: '15',
    title: 'Infrastructure as Code with AWS CDK',
    description: 'Define your cloud infrastructure using familiar programming languages like TypeScript with AWS CDK.',
    category: 'AWS',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['CDK', 'CloudFormation', 'TypeScript', 'IaC'],
    image: 'https://picsum.photos/seed/aws-cdk-infrastructure/800/600'
  },
  {
    id: '16',
    title: 'Real-time Log Analysis with Amazon Kinesis & OpenSearch',
    description: 'Build a real-time streaming data pipeline to analyze application logs and visualize them in dashboards.',
    category: 'AWS',
    difficulty: 'Advanced',
    duration: '3.5 hours',
    tags: ['Kinesis', 'OpenSearch', 'CloudWatch', 'Streaming'],
    image: 'https://picsum.photos/seed/aws-kinesis-streaming/800/600'
  },
  {
    id: '17',
    title: 'Machine Learning Model Deployment with Amazon SageMaker',
    description: 'Train, deploy, and scale machine learning models using SageMaker endpoints and built-in algorithms.',
    category: 'AWS',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['SageMaker', 'MLOps', 'Python', 'AI'],
    image: 'https://picsum.photos/seed/amazon-sagemaker-ml/800/600'
  },
  {
    id: '18',
    title: 'Multi-Region Disaster Recovery with AWS Route 53',
    description: 'Implement a robust disaster recovery strategy using Route 53 health checks and failover routing.',
    category: 'AWS',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['Route 53', 'CloudFront', 'S3', 'Disaster Recovery'],
    image: 'https://picsum.photos/seed/aws-disaster-recovery/800/600'
  },
  {
    id: '19',
    title: 'Kubernetes Cluster Setup with Kubeadm',
    description: 'Learn to bootstrap a production-ready Kubernetes cluster from scratch using Kubeadm on Linux nodes.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Kubeadm', 'Linux', 'Cluster', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-cluster/800/600'
  },
  {
    id: '20',
    title: 'Managing Secrets with Kubernetes External Secrets',
    description: 'Integrate external secret managers like AWS Secrets Manager or HashiCorp Vault with Kubernetes.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Secrets', 'External Secrets', 'Security', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-security/800/600'
  },
  {
    id: '21',
    title: 'Autoscaling Kubernetes Workloads with HPA & VPA',
    description: 'Configure Horizontal and Vertical Pod Autoscalers to handle dynamic traffic loads efficiently.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Autoscaling', 'HPA', 'VPA', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-autoscaling/800/600'
  },
  {
    id: '22',
    title: 'Kubernetes Ingress Controllers with NGINX',
    description: 'Set up and configure NGINX Ingress Controller for advanced traffic routing and SSL termination.',
    category: 'Kubernetes',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Ingress', 'NGINX', 'Networking', 'K8s'],
    image: 'https://picsum.photos/seed/kubernetes-ingress/800/600'
  },
  {
    id: '23',
    title: 'Persistent Storage in Kubernetes with CSI',
    description: 'Implement dynamic volume provisioning using Container Storage Interface (CSI) drivers.',
    category: 'Kubernetes',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Storage', 'CSI', 'PV', 'PVC'],
    image: 'https://picsum.photos/seed/kubernetes-storage/800/600'
  },
  {
    id: '24',
    title: 'Kubernetes Network Policies for Microservices Security',
    description: 'Secure your pod-to-pod communication using fine-grained Kubernetes Network Policies.',
    category: 'Kubernetes',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['Network Policy', 'Security', 'Calico', 'K8s'],
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
    id: '55',
    title: 'GCP Cloud Run Serverless Deployment',
    description: 'Deploy and scale containerized applications on a fully managed serverless platform using Cloud Run.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Cloud Run', 'Serverless', 'Docker', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-run/800/600'
  },
  {
    id: '56',
    title: 'GCP Cloud Spanner Relational Database',
    description: 'Implement a globally distributed, strongly consistent relational database using Cloud Spanner.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Cloud Spanner', 'SQL', 'Databases', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-spanner/800/600'
  },
  {
    id: '57',
    title: 'GCP Cloud Functions Event-driven Logic',
    description: 'Build and deploy event-driven functions that scale automatically with Cloud Functions.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Cloud Functions', 'Serverless', 'Events', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-functions/800/600'
  },
  {
    id: '58',
    title: 'GCP Anthos Multi-cloud Management',
    description: 'Manage applications across on-premises and multiple clouds using Anthos.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['Anthos', 'Hybrid Cloud', 'Kubernetes', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-anthos/800/600'
  },
  {
    id: '59',
    title: 'GCP Cloud Armor Web Security',
    description: 'Protect your applications from DDoS and web attacks using Cloud Armor security policies.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Cloud Armor', 'WAF', 'Security', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-armor/800/600'
  },
  {
    id: '60',
    title: 'GCP Cloud Build CI/CD Pipelines',
    description: 'Automate your build, test, and deployment process using Cloud Build.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Cloud Build', 'CI/CD', 'DevOps', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-build/800/600'
  },
  {
    id: '61',
    title: 'GCP Cloud Pub/Sub Messaging',
    description: 'Implement reliable, many-to-many asynchronous messaging using Cloud Pub/Sub.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Pub/Sub', 'Messaging', 'Events', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-pubsub/800/600'
  },
  {
    id: '62',
    title: 'GCP Cloud Storage Lifecycle Management',
    description: 'Optimize storage costs by automating object lifecycle transitions in Cloud Storage.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Cloud Storage', 'Storage', 'Cost Optimization', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-storage/800/600'
  },
  {
    id: '63',
    title: 'GCP Cloud SQL Database Administration',
    description: 'Set up, manage, and scale relational databases (MySQL, PostgreSQL, SQL Server) on Cloud SQL.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Cloud SQL', 'SQL', 'Databases', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-sql/800/600'
  },
  {
    id: '64',
    title: 'GCP Compute Engine Managed Instance Groups',
    description: 'Configure autoscaling and self-healing for your VM workloads using Managed Instance Groups.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Compute Engine', 'Autoscaling', 'VMs', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-compute/800/600'
  },
  {
    id: '65',
    title: 'GCP VPC Network Peering',
    description: 'Connect two Virtual Private Cloud (VPC) networks together for private communication.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['VPC', 'Networking', 'Peering', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-vpc/800/600'
  },
  {
    id: '66',
    title: 'GCP Cloud Interconnect Implementation',
    description: 'Establish direct, high-speed physical connections between your on-premises network and GCP.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Cloud Interconnect', 'Networking', 'Hybrid', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-interconnect/800/600'
  },
  {
    id: '67',
    title: 'GCP Cloud DNS Management',
    description: 'Manage your domain names and DNS records using a reliable, low-latency DNS service.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Cloud DNS', 'DNS', 'Networking', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-dns/800/600'
  },
  {
    id: '68',
    title: 'GCP Cloud CDN Content Delivery',
    description: 'Speed up content delivery for your websites and applications using Cloud CDN.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Cloud CDN', 'CDN', 'Networking', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-cdn/800/600'
  },
  {
    id: '69',
    title: 'GCP Cloud IAM Roles and Permissions',
    description: 'Implement fine-grained access control for your GCP resources using IAM roles.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['IAM', 'Security', 'Access Control', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-iam/800/600'
  },
  {
    id: '70',
    title: 'GCP Cloud Logging and Monitoring',
    description: 'Gain visibility into the performance, uptime, and overall health of your GCP applications.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Cloud Logging', 'Cloud Monitoring', 'Observability', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-logging/800/600'
  },
  {
    id: '71',
    title: 'GCP Cloud Trace Performance Analysis',
    description: 'Collect latency data from your applications and visualize it to find performance bottlenecks.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Cloud Trace', 'Performance', 'Observability', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-trace/800/600'
  },
  {
    id: '72',
    title: 'GCP Cloud Debugger for Live Apps',
    description: 'Inspect the state of your application at any code location without stopping or slowing it down.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    tags: ['Cloud Debugger', 'Debugging', 'Observability', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-debugger/800/600'
  },
  {
    id: '73',
    title: 'GCP Cloud Profiler Resource Optimization',
    description: 'Analyze the CPU and memory consumption of your applications to optimize resource usage.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2 hours',
    tags: ['Cloud Profiler', 'Optimization', 'Observability', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-profiler/800/600'
  },
  {
    id: '74',
    title: 'GCP Cloud Deployment Manager IaC',
    description: 'Automate the creation and management of your GCP resources using infrastructure as code.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Deployment Manager', 'IaC', 'Automation', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-deployment/800/600'
  },
  {
    id: '75',
    title: 'GCP Cloud Composer (Managed Airflow)',
    description: 'Orchestrate complex data workflows using a fully managed Apache Airflow service.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '4 hours',
    tags: ['Cloud Composer', 'Airflow', 'Data Engineering', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-composer/800/600'
  },
  {
    id: '76',
    title: 'GCP Cloud Dataflow Stream Processing',
    description: 'Build and run data processing pipelines for both batch and streaming data using Dataflow.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '4.5 hours',
    tags: ['Dataflow', 'Apache Beam', 'Big Data', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-dataflow/800/600'
  },
  {
    id: '77',
    title: 'GCP Cloud Dataproc Managed Spark/Hadoop',
    description: 'Run Apache Spark and Hadoop clusters in a fast, easy, and cost-effective way.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '3 hours',
    tags: ['Dataproc', 'Spark', 'Hadoop', 'Big Data'],
    image: 'https://picsum.photos/seed/google-cloud-dataproc/800/600'
  },
  {
    id: '78',
    title: 'GCP Vertex AI Platform Workflows',
    description: 'Build, deploy, and scale machine learning models faster with a unified AI platform.',
    category: 'GCP',
    difficulty: 'Advanced',
    duration: '5 hours',
    tags: ['Vertex AI', 'Machine Learning', 'AI', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-vertex-ai/800/600'
  },
  {
    id: '79',
    title: 'GCP Cloud Vision API Integration',
    description: 'Derive insights from your images with powerful pre-trained machine learning models.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Cloud Vision', 'AI', 'ML', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-vision/800/600'
  },
  {
    id: '80',
    title: 'GCP Cloud Natural Language API',
    description: 'Analyze text and derive insights like sentiment, entities, and syntax using ML.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1.5 hours',
    tags: ['Natural Language', 'AI', 'ML', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-language/800/600'
  },
  {
    id: '81',
    title: 'GCP Cloud Translation API Implementation',
    description: 'Dynamically translate text between thousands of language pairs using Google ML.',
    category: 'GCP',
    difficulty: 'Beginner',
    duration: '1 hour',
    tags: ['Cloud Translation', 'AI', 'ML', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-translation/800/600'
  },
  {
    id: '82',
    title: 'GCP Cloud Video Intelligence API',
    description: 'Make your videos searchable and discoverable by extracting metadata with ML.',
    category: 'GCP',
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    tags: ['Video Intelligence', 'AI', 'ML', 'GCP'],
    image: 'https://picsum.photos/seed/google-cloud-video-intelligence/800/600'
  },
  {
    id: '83',
    title: 'Jenkins Pipeline as Code with Groovy',
    description: 'Define and manage your CI/CD pipelines using Jenkinsfiles and Groovy scripts for better version control.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    duration: '2 hours',
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
    duration: '3 hours',
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
    id: '138',
    title: 'OPA Gatekeeper for Kubernetes Policy',
    description: 'Enforce policies on your Kubernetes clusters using Open Policy Agent (OPA) and Gatekeeper.',
    category: 'Security',
    difficulty: 'Advanced',
    duration: '3 hours',
    tags: ['OPA', 'Gatekeeper', 'Policy as Code', 'K8s'],
    image: 'https://picsum.photos/seed/opa-gatekeeper/800/600'
  }
];
