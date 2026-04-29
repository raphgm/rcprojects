export interface Course {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
}

export interface Project {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

export interface LearningPath {
  id: string;
  title: string;
  icon: string;
  skills: number;
  coursesCount: number;
  projectsCount?: number;
  description: string;
  color: string;
  courses: Course[];
  projects: Project[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'linux',
    title: 'Linux',
    icon: 'Terminal',
    skills: 118,
    coursesCount: 7,
    projectsCount: 24,
    description: 'Master the foundation of cloud computing and server administration.',
    color: 'bg-orange-500',
    courses: [
      { id: 'linux-basics', title: 'Linux Fundamentals', duration: '4h', level: 'Beginner', lessons: 100 },
      { id: 'linux-admin', title: 'System Administration', duration: '8h', level: 'Intermediate', lessons: 100 },
      { id: 'linux-security', title: 'Hardening Linux Servers', duration: '6h', level: 'Advanced', lessons: 100 },
      { id: 'linux-networking', title: 'Linux Networking & Troubleshooting', duration: '7h', level: 'Intermediate', lessons: 100 },
      { id: 'linux-storage', title: 'Managing Storage & File Systems', duration: '5h', level: 'Intermediate', lessons: 100 },
      { id: 'linux-performance', title: 'Performance Tuning & Monitoring', duration: '6h', level: 'Advanced', lessons: 100 },
      { id: 'linux-kernel', title: 'Linux Kernel Internals', duration: '10h', level: 'Advanced', lessons: 100 }
    ],
    projects: [
      { id: 'web-server-setup', title: 'Deploy a LAMP Stack', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'shell-automation', title: 'Backup Automation Script', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'user-management-system', title: 'Automated User Onboarding', difficulty: 'Easy', estimatedTime: '1.5h' },
      { id: 'log-rotation-config', title: 'Custom Log Rotation Policy', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'firewall-iptables', title: 'Securing Servers with Iptables', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'nfs-share-setup', title: 'Configure Network File System', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'dns-bind-setup', title: 'Setup BIND DNS Server', difficulty: 'Hard', estimatedTime: '5h' },
      { id: 'mail-postfix-setup', title: 'Configure Postfix Mail Server', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'ssh-hardening', title: 'Advanced SSH Hardening', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'process-monitor', title: 'Real-time Process Monitor', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'linux-auditd', title: 'System Auditing with Auditd', difficulty: 'Hard', estimatedTime: '4h' },
      { id: 'raid-config', title: 'Software RAID Configuration', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'lvm-management', title: 'LVM Partition Management', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'systemd-service', title: 'Creating Custom Systemd Services', difficulty: 'Easy', estimatedTime: '1.5h' },
      { id: 'kernel-module', title: 'Simple Kernel Module Development', difficulty: 'Hard', estimatedTime: '8h' },
      // Programmatically generate remaining projects up to 100
      ...Array.from({ length: 85 }, (_, i) => ({
        id: `linux-proj-ext-${i + 1}`,
        title: `Linux Engineering Lab ${i + 16}: ${[
          'Kernel Debugging', 'Custom Distro Build', 'High Availability Cluster',
          'Load Balancing with IPVS', 'Advanced BGP Routing', 'Zero Trust Security',
          'Container Runtime from Scratch', 'Filesystem Driver Dev', 'Network Stack Tuning',
          'Real-time OS Patching', 'Embedded Linux Buildroot', 'Yocto Project Lab',
          'Systemtap Tracing', 'Perf Analysis', 'EBPF Observability', 'XDP Packet Processing'
        ][i % 16]}`,
        difficulty: 'Hard' as const,
        estimatedTime: '10h'
      }))
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: 'Infinity',
    skills: 360,
    coursesCount: 11,
    projectsCount: 30,
    description: 'Learn CI/CD, IaC, and automation for modern software delivery.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'devops-intro', title: 'Introduction to DevOps', duration: '3h', level: 'Beginner', lessons: 10 },
      { id: 'cicd-pipelines', title: 'Building CI/CD Pipelines', duration: '10h', level: 'Intermediate', lessons: 30 },
      { id: 'iac-terraform', title: 'Infrastructure as Code with Terraform', duration: '12h', level: 'Advanced', lessons: 25 },
      { id: 'ansible-config', title: 'Configuration Management with Ansible', duration: '8h', level: 'Intermediate', lessons: 20 },
      { id: 'jenkins-mastery', title: 'Jenkins CI/CD Mastery', duration: '15h', level: 'Advanced', lessons: 45 }
    ],
    projects: [
      { id: 'jenkins-pipeline', title: 'Automated Deployment Pipeline', difficulty: 'Hard', estimatedTime: '5h' },
      { id: 'ansible-webserver', title: 'Configuring Nginx with Ansible', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'docker-swarm-cluster', title: 'Deploying a Docker Swarm Cluster', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'gitlab-ci-node', title: 'GitLab CI for Node.js Apps', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'sonarqube-quality', title: 'Code Quality with SonarQube', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'packer-images', title: 'Golden Images with Packer', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'github-actions-react', title: 'GitHub Actions for React', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'vault-secrets', title: 'Secret Management with Vault', difficulty: 'Hard', estimatedTime: '5h' },
      { id: 'graylog-logs', title: 'Log Management with Graylog', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'spinnaker-cd', title: 'Continuous Delivery with Spinnaker', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'consul-discovery', title: 'Service Discovery with Consul', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'newrelic-apm', title: 'APM with New Relic', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'travis-ci-ruby', title: 'Travis CI for Ruby Apps', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'chef-infra', title: 'Infrastructure with Chef', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'puppet-config', title: 'Config Management with Puppet', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'azure-devops-net', title: 'Azure DevOps for .NET', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'splunk-analysis', title: 'Data Analysis with Splunk', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'datadog-monitoring', title: 'Full-stack Monitoring with Datadog', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'bitbucket-pipelines', title: 'Bitbucket Pipelines Setup', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'vagrant-local', title: 'Local Dev with Vagrant', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'rancher-k8s', title: 'K8s Management with Rancher', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'tekton-ci', title: 'Cloud-native CI/CD with Tekton', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'pulumi-iac', title: 'Modern IaC with Pulumi', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'grafana-dashboards', title: 'Custom Grafana Dashboards', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'chaos-gremlin', title: 'Chaos Engineering with Gremlin', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'sentry-errors', title: 'Error Tracking with Sentry', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'circleci-python', title: 'CircleCI for Python Apps', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'artifactory-repo', title: 'Repository Management with Artifactory', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'nagios-monitor', title: 'Infrastructure Monitoring with Nagios', difficulty: 'Medium', estimatedTime: '5h' }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    icon: 'Shield',
    skills: 229,
    coursesCount: 13,
    projectsCount: 30,
    description: 'Protect infrastructure and applications from modern threats.',
    color: 'bg-rose-600',
    courses: [
      { id: 'security-basics', title: 'Cybersecurity Essentials', duration: '5h', level: 'Beginner', lessons: 15 },
      { id: 'network-security', title: 'Network Security & Defense', duration: '9h', level: 'Intermediate', lessons: 22 },
      { id: 'ethical-hacking', title: 'Ethical Hacking Foundations', duration: '15h', level: 'Advanced', lessons: 40 },
      { id: 'incident-response', title: 'Incident Response & Handling', duration: '10h', level: 'Advanced', lessons: 25 },
      { id: 'cloud-security', title: 'Cloud Security Fundamentals', duration: '8h', level: 'Intermediate', lessons: 20 }
    ],
    projects: [
      { id: 'vulnerability-scan', title: 'Network Vulnerability Assessment', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'firewall-config', title: 'Enterprise Firewall Configuration', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'snort-ids', title: 'Intrusion Detection with Snort', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'ssl-tls-setup', title: 'Implementing SSL/TLS', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'honeypot-cowrie', title: 'Deploying a Cowrie Honeypot', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'metasploit-pen', title: 'Penetration Testing with Metasploit', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'waf-setup', title: 'Web Application Firewall Config', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'mfa-implementation', title: 'Implementing Multi-Factor Auth', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'siem-elk', title: 'SIEM Setup with ELK Stack', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'malware-analysis', title: 'Malware Analysis in Sandbox', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'vpn-ipsec', title: 'IPsec VPN for Remote Access', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'data-encryption', title: 'Data Encryption at Rest', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'pki-openssl', title: 'PKI Setup with OpenSSL', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'social-engineering', title: 'Social Engineering Simulation', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'edr-config', title: 'EDR Configuration & Monitoring', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'zero-trust', title: 'Zero Trust Architecture Design', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'password-manager', title: 'Enterprise Password Management', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'wifi-security', title: 'Wireless Security Auditing', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'cspm-cloud', title: 'Cloud Security Posture Management', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'secure-boot', title: 'Implementing Secure Boot & TPM', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'bug-bounty', title: 'Setting up a Bug Bounty Program', difficulty: 'Easy', estimatedTime: '3h' },
      { id: 'forensic-analysis', title: 'Forensic Analysis of Disk Image', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'dlp-config', title: 'Data Loss Prevention Setup', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'oauth2-oidc', title: 'Implementing OAuth2 & OIDC', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'vuln-management', title: 'Vulnerability Management Program', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'api-security', title: 'API Security Testing', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'nac-config', title: 'Network Access Control Config', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'secure-sdlc', title: 'Secure SDLC Practices', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'threat-intel', title: 'Threat Intelligence Platform', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'incident-sim', title: 'Incident Response Simulation', difficulty: 'Hard', estimatedTime: '10h' }
    ]
  },
  {
    id: 'kali-linux',
    title: 'Kali Linux',
    icon: 'Skull',
    skills: 22,
    coursesCount: 2,
    projectsCount: 15,
    description: 'Advanced penetration testing and security auditing.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'kali-intro', title: 'Kali Linux for Beginners', duration: '4h', level: 'Beginner', lessons: 12 },
      { id: 'pen-testing', title: 'Advanced Penetration Testing', duration: '20h', level: 'Advanced', lessons: 50 }
    ],
    projects: [
      { id: 'wifi-audit', title: 'Wireless Network Auditing', difficulty: 'Hard', estimatedTime: '4h' },
      { id: 'nmap-scan', title: 'Network Reconnaissance with Nmap', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'burp-suite-web', title: 'Web App Testing with Burp Suite', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'hash-cracking', title: 'Password Cracking with John', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'social-toolkit', title: 'Social Engineering Toolkit', difficulty: 'Medium', estimatedTime: '4h' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'Database',
    skills: 126,
    coursesCount: 5,
    projectsCount: 20,
    description: 'Master SQL, NoSQL, and database administration.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'sql-basics', title: 'SQL Fundamentals', duration: '6h', level: 'Beginner', lessons: 20 },
      { id: 'nosql-intro', title: 'NoSQL Databases with MongoDB', duration: '8h', level: 'Intermediate', lessons: 18 },
      { id: 'db-design', title: 'Advanced Database Design', duration: '10h', level: 'Advanced', lessons: 25 },
      { id: 'postgres-admin', title: 'PostgreSQL Administration', duration: '12h', level: 'Advanced', lessons: 30 },
      { id: 'redis-caching', title: 'Redis for High-Performance Caching', duration: '6h', level: 'Intermediate', lessons: 15 }
    ],
    projects: [
      { id: 'ecommerce-db', title: 'E-commerce Database Schema', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'blog-nosql', title: 'Blog Platform with MongoDB', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'db-migration', title: 'Zero-Downtime DB Migration', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'sharding-setup', title: 'Database Sharding Implementation', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'query-optimization', title: 'Advanced Query Optimization', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'db-backup-recovery', title: 'Automated Backup & Recovery', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'graph-db-social', title: 'Social Graph with Neo4j', difficulty: 'Hard', estimatedTime: '12h' }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: 'BarChart',
    skills: 192,
    coursesCount: 7,
    projectsCount: 91,
    description: 'Analyze data and build machine learning models.',
    color: 'bg-purple-600',
    courses: [
      { id: 'data-analysis', title: 'Data Analysis with Python', duration: '12h', level: 'Beginner', lessons: 35 },
      { id: 'statistics', title: 'Statistics for Data Science', duration: '10h', level: 'Intermediate', lessons: 25 },
      { id: 'ml-intro', title: 'Introduction to Machine Learning', duration: '15h', level: 'Advanced', lessons: 40 },
      { id: 'data-viz', title: 'Data Visualization with Tableau', duration: '8h', level: 'Intermediate', lessons: 20 },
      { id: 'big-data-spark', title: 'Big Data with Apache Spark', duration: '18h', level: 'Advanced', lessons: 45 }
    ],
    projects: [
      { id: 'titanic-analysis', title: 'Titanic Survivor Prediction', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'stock-prediction', title: 'Stock Market Trend Analysis', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'customer-segmentation', title: 'Customer Segmentation Analysis', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'sentiment-analysis', title: 'Twitter Sentiment Analysis', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'house-price-pred', title: 'Real Estate Price Prediction', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'fraud-detection', title: 'Credit Card Fraud Detection', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'image-classification-ds', title: 'Image Classification with CNNs', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'recommender-system-ds', title: 'Product Recommendation Engine', difficulty: 'Medium', estimatedTime: '10h' }
    ]
  },
  {
    id: 'docker',
    title: 'Docker',
    icon: 'Box',
    skills: 32,
    coursesCount: 3,
    projectsCount: 10,
    description: 'Containerize applications for consistent deployment.',
    color: 'bg-sky-500',
    courses: [
      { id: 'docker-basics', title: 'Docker Fundamentals', duration: '4h', level: 'Beginner', lessons: 12 },
      { id: 'docker-compose', title: 'Multi-Container Apps with Compose', duration: '6h', level: 'Intermediate', lessons: 15 },
      { id: 'docker-security', title: 'Securing Docker Containers', duration: '8h', level: 'Advanced', lessons: 20 }
    ],
    projects: [
      { id: 'microservices-docker', title: 'Dockerizing a Microservices App', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'docker-registry-setup', title: 'Private Docker Registry', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'docker-swarm-lb', title: 'Load Balancing with Swarm', difficulty: 'Hard', estimatedTime: '6h' }
    ]
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    icon: 'Ship',
    skills: 27,
    coursesCount: 2,
    projectsCount: 30,
    description: 'Orchestrate containers at scale in production.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'k8s-intro', title: 'Kubernetes Essentials', duration: '8h', level: 'Intermediate', lessons: 100 },
      { id: 'k8s-ops', title: 'Kubernetes in Production', duration: '12h', level: 'Advanced', lessons: 100 },
      { id: 'k8s-security', title: 'Securing Kubernetes Clusters', duration: '10h', level: 'Advanced', lessons: 100 },
      { id: 'k8s-networking', title: 'Advanced K8s Networking', duration: '9h', level: 'Intermediate', lessons: 100 }
    ],
    projects: [
      { id: 'k8s-cluster', title: 'Highly Available K8s Cluster', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'multi-tier-app', title: 'Deploy a Multi-tier Application', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'ingress-nginx', title: 'Configure Ingress with Nginx', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'hpa-setup', title: 'Implement Horizontal Pod Autoscaling', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'monitor-prom-graf', title: 'Prometheus & Grafana Monitoring', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'vault-k8s', title: 'Manage Secrets with HashiCorp Vault', difficulty: 'Hard', estimatedTime: '5h' },
      { id: 'statefulset-mongo', title: 'Deploy a StatefulSet MongoDB', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'netpol-micro', title: 'Network Policies for Microservices', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'rbac-isolation', title: 'Configure RBAC for Isolation', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'argocd-pipeline', title: 'CI/CD Pipeline with ArgoCD', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'istio-canary', title: 'Canary Deployments with Istio', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'pv-nfs', title: 'Persistent Volumes with NFS', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'helm-redis', title: 'Deploy a Helm Chart for Redis', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'pdb-setup', title: 'Implement Pod Disruption Budgets', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'elk-logging', title: 'Setup Logging with ELK Stack', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'affinity-taints', title: 'Configure Node Affinity & Taints', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'blue-green-k8s', title: 'Implement Blue-Green Deployments', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'private-registry', title: 'Setup a Private Container Registry', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'knative-serverless', title: 'Serverless App with Knative', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'linkerd-mesh', title: 'Service Mesh with Linkerd', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'resource-quotas', title: 'Configure Resource Quotas', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'velero-backups', title: 'Automated Backups with Velero', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'cockroachdb-k8s', title: 'Deploy Distributed CockroachDB', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'flux-gitops', title: 'Implement GitOps with Flux', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'k8s-crds', title: 'Configure Custom Resource Definitions', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'multi-cluster-k8s', title: 'Multi-cluster K8s Environment', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'security-contexts', title: 'Implement Security Contexts', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'externaldns-azure-dns', title: 'Configure ExternalDNS for Azure DNS', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'kubeflow-ml', title: 'ML Model with Kubeflow', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'admission-controllers', title: 'Implement Admission Controllers', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'local-k8s-kind', title: 'Local K8s Cluster with Kind', difficulty: 'Easy', estimatedTime: '1h' },
      { id: '139', title: 'Kubernetes Cost Visibility with Kubecost', difficulty: 'Medium', estimatedTime: '2h' },
      { id: '140', title: 'Optimizing Kubernetes Resource Quotas for FinOps', difficulty: 'Medium', estimatedTime: '1.5h' },
      // Programmatically generate remaining projects up to 100
      ...Array.from({ length: 70 }, (_, i) => ({
        id: `k8s-proj-ext-${i + 1}`,
        title: `Cloud Native Lab ${i + 31}: ${[
          'Service Mesh Security', 'Custom Controller Dev', 'Admission Webhooks',
          'Cluster API Management', 'Multi-cluster Federation', 'Serverless on K8s',
          'GPU Scheduling for ML', 'Edge Computing with K3s', 'Windows Container Support',
          'Advanced CNI Configuration', 'Storage Class Performance', 'Backup with Velero',
          'Policy Enforcement with OPA', 'Kyverno Rules Engine', 'Kube-bench Auditing'
        ][i % 15]}`,
        difficulty: 'Hard' as const,
        estimatedTime: '12h'
      }))
    ]
  },
  {
    id: 'python',
    title: 'Python',
    icon: 'Code',
    skills: 60,
    coursesCount: 4,
    projectsCount: 92,
    description: 'The most versatile language for cloud and data.',
    color: 'bg-yellow-500',
    courses: [
      { id: 'python-basics', title: 'Python for Beginners', duration: '10h', level: 'Beginner', lessons: 100 },
      { id: 'python-advanced', title: 'Advanced Python Patterns', duration: '12h', level: 'Advanced', lessons: 100 },
      { id: 'python-web-flask', title: 'Web Apps with Flask', duration: '8h', level: 'Intermediate', lessons: 100 },
      { id: 'python-django', title: 'Enterprise Apps with Django', duration: '15h', level: 'Advanced', lessons: 100 }
    ],
    projects: [
      { id: 'web-scraper', title: 'Real-time Web Scraper', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'automation-bot', title: 'Discord Automation Bot', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'django-ecommerce', title: 'E-commerce with Django', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'flask-api', title: 'REST API with Flask', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'python-data-viz', title: 'Interactive Data Dashboard', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'python-game', title: '2D Game with Pygame', difficulty: 'Medium', estimatedTime: '8h' },
      { id: 'python-ml-model', title: 'Simple Linear Regression Model', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'python-gui-app', title: 'Desktop App with Tkinter', difficulty: 'Easy', estimatedTime: '4h' },
      { id: 'python-network-scanner', title: 'Custom Network Scanner', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'python-crypto-tracker', title: 'Crypto Price Tracker', difficulty: 'Medium', estimatedTime: '5h' }
    ]
  },
  {
    id: 'git',
    title: 'Git',
    icon: 'GitBranch',
    skills: 31,
    coursesCount: 3,
    projectsCount: 10,
    description: 'Master version control and collaborative development.',
    color: 'bg-orange-600',
    courses: [
      { id: 'git-basics', title: 'Git Fundamentals', duration: '3h', level: 'Beginner', lessons: 100 },
      { id: 'git-workflow', title: 'Advanced Git Workflows', duration: '5h', level: 'Intermediate', lessons: 100 },
      { id: 'git-internals', title: 'Git Internals & Plumbing', duration: '6h', level: 'Advanced', lessons: 100 }
    ],
    projects: [
      { id: 'oss-contribution', title: 'First Open Source Contribution', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'git-hooks-automation', title: 'Pre-commit Hooks Automation', difficulty: 'Medium', estimatedTime: '3h' }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    skills: 99,
    coursesCount: 5,
    projectsCount: 130,
    icon: 'Globe',
    description: 'Build modern, responsive web applications.',
    color: 'bg-pink-600',
    courses: [
      { id: 'html-css', title: 'HTML5 & CSS3 Mastery', duration: '15h', level: 'Beginner', lessons: 100 },
      { id: 'js-basics', title: 'JavaScript Fundamentals', duration: '20h', level: 'Beginner', lessons: 100 },
      { id: 'responsive-design', title: 'Responsive Web Design', duration: '10h', level: 'Intermediate', lessons: 100 },
      { id: 'frontend-frameworks', title: 'Intro to Frontend Frameworks', duration: '12h', level: 'Intermediate', lessons: 100 }
    ],
    projects: [
      { id: 'portfolio', title: 'Personal Portfolio Website', difficulty: 'Easy', estimatedTime: '6h' },
      { id: 'saas-landing', title: 'SaaS Landing Page', difficulty: 'Medium', estimatedTime: '10h' },
      { id: 'weather-app', title: 'Real-time Weather Dashboard', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'task-manager', title: 'Collaborative Task Manager', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'blog-platform', title: 'Full-stack Blog Platform', difficulty: 'Hard', estimatedTime: '20h' },
      { id: 'recipe-app', title: 'Recipe Search & Save App', difficulty: 'Medium', estimatedTime: '8h' },
      { id: 'chat-app-web', title: 'Real-time Chat Application', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'quiz-app', title: 'Interactive Quiz Platform', difficulty: 'Easy', estimatedTime: '4h' },
      { id: 'movie-db-web', title: 'Movie Database Browser', difficulty: 'Medium', estimatedTime: '7h' },
      { id: 'fitness-tracker-web', title: 'Personal Fitness Tracker', difficulty: 'Hard', estimatedTime: '18h' }
    ]
  },
  {
    id: 'golang',
    title: 'Golang',
    skills: 45,
    coursesCount: 1,
    projectsCount: 15,
    icon: 'Zap',
    description: 'Efficient cloud-native systems programming.',
    color: 'bg-cyan-500',
    courses: [
      { id: 'go-intro', title: 'Go Programming Language', duration: '12h', level: 'Intermediate', lessons: 35 },
      { id: 'go-concurrency', title: 'Concurrency in Go', duration: '8h', level: 'Advanced', lessons: 20 },
      { id: 'go-microservices', title: 'Microservices with Go & gRPC', duration: '15h', level: 'Advanced', lessons: 40 }
    ],
    projects: [
      { id: 'go-api', title: 'High-Performance REST API', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'go-cli-tool', title: 'Custom CLI Tool with Cobra', difficulty: 'Easy', estimatedTime: '3h' },
      { id: 'go-web-crawler', title: 'Concurrent Web Crawler', difficulty: 'Hard', estimatedTime: '8h' }
    ]
  },
  {
    id: 'java',
    title: 'Java',
    skills: 156,
    coursesCount: 8,
    projectsCount: 42,
    icon: 'Coffee',
    description: 'Enterprise-grade application development and backend systems.',
    color: 'bg-red-600',
    courses: [
      { id: 'java-basics', title: 'Java Fundamentals', duration: '15h', level: 'Beginner', lessons: 45 },
      { id: 'spring-boot', title: 'Spring Boot Microservices', duration: '20h', level: 'Advanced', lessons: 55 },
      { id: 'java-concurrency', title: 'Advanced Java Concurrency', duration: '12h', level: 'Advanced', lessons: 30 },
      { id: 'hibernate-jpa', title: 'Data Persistence with Hibernate', duration: '10h', level: 'Intermediate', lessons: 25 }
    ],
    projects: [
      { id: 'banking-app', title: 'Secure Banking System', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'inventory-mgmt', title: 'Inventory Management System', difficulty: 'Medium', estimatedTime: '8h' },
      { id: 'chat-server-java', title: 'Multi-threaded Chat Server', difficulty: 'Medium', estimatedTime: '6h' }
    ]
  },
  {
    id: 'cpp',
    title: 'C++',
    skills: 112,
    coursesCount: 6,
    projectsCount: 15,
    icon: 'Cpu',
    description: 'High-performance systems and game development.',
    color: 'bg-blue-700',
    courses: [
      { id: 'cpp-basics', title: 'C++ for Beginners', duration: '18h', level: 'Beginner', lessons: 50 },
      { id: 'cpp-graphics', title: 'Computer Graphics with C++', duration: '25h', level: 'Advanced', lessons: 60 },
      { id: 'cpp-stl', title: 'Mastering the C++ STL', duration: '12h', level: 'Intermediate', lessons: 35 },
      { id: 'cpp-embedded', title: 'Embedded Systems with C++', duration: '20h', level: 'Advanced', lessons: 50 }
    ],
    projects: [
      { id: 'game-engine', title: 'Basic 2D Game Engine', difficulty: 'Hard', estimatedTime: '20h' },
      { id: 'ray-tracer', title: '3D Ray Tracer from Scratch', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'os-kernel-cpp', title: 'Simple OS Kernel in C++', difficulty: 'Hard', estimatedTime: '30h' }
    ]
  },
  {
    id: 'react',
    title: 'React',
    skills: 88,
    coursesCount: 4,
    projectsCount: 65,
    icon: 'Atom',
    description: 'Build modern user interfaces with the most popular frontend library.',
    color: 'bg-cyan-400',
    courses: [
      { id: 'react-basics', title: 'React Fundamentals', duration: '12h', level: 'Beginner', lessons: 35 },
      { id: 'react-advanced', title: 'Advanced React Patterns', duration: '15h', level: 'Advanced', lessons: 40 },
      { id: 'react-native-intro', title: 'Mobile Apps with React Native', duration: '20h', level: 'Intermediate', lessons: 50 },
      { id: 'nextjs-mastery', title: 'Fullstack Apps with Next.js', duration: '18h', level: 'Advanced', lessons: 45 }
    ],
    projects: [
      { id: 'dashboard', title: 'Admin Dashboard UI', difficulty: 'Medium', estimatedTime: '12h' },
      { id: 'social-media-react', title: 'Social Media Feed with React', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'ecommerce-frontend', title: 'E-commerce Storefront', difficulty: 'Medium', estimatedTime: '10h' }
    ]
  },
  {
    id: 'rust',
    title: 'Rust',
    skills: 76,
    coursesCount: 3,
    projectsCount: 12,
    icon: 'Wrench',
    description: 'Safe and fast systems programming for the modern era.',
    color: 'bg-stone-700',
    courses: [
      { id: 'rust-intro', title: 'Rust Programming Language', duration: '15h', level: 'Intermediate', lessons: 45 },
      { id: 'rust-web-actix', title: 'Web Services with Actix-web', duration: '12h', level: 'Advanced', lessons: 35 },
      { id: 'rust-wasm', title: 'WebAssembly with Rust', duration: '10h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'rust-os', title: 'Writing a Tiny OS in Rust', difficulty: 'Hard', estimatedTime: '40h' },
      { id: 'rust-blockchain', title: 'Building a Blockchain in Rust', difficulty: 'Hard', estimatedTime: '20h' },
      { id: 'rust-cli-grep', title: 'Custom Grep Tool in Rust', difficulty: 'Medium', estimatedTime: '5h' }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    skills: 210,
    coursesCount: 5,
    projectsCount: 10,
    icon: 'Binary',
    description: 'Master the core logic behind efficient software solutions.',
    color: 'bg-violet-600',
    courses: [
      { id: 'algo-basics', title: 'Algorithm Design & Analysis', duration: '20h', level: 'Intermediate', lessons: 50 },
      { id: 'algo-advanced', title: 'Advanced Graph Algorithms', duration: '15h', level: 'Advanced', lessons: 35 },
      { id: 'algo-dp', title: 'Dynamic Programming Mastery', duration: '12h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'pathfinding-viz', title: 'Pathfinding Visualizer', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'sorting-viz', title: 'Sorting Algorithm Visualizer', difficulty: 'Easy', estimatedTime: '4h' },
      { id: 'compression-tool', title: 'Huffman Coding Compression', difficulty: 'Hard', estimatedTime: '8h' }
    ]
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    skills: 145,
    coursesCount: 4,
    projectsCount: 10,
    icon: 'Layers',
    description: 'Learn how to organize and store data effectively.',
    color: 'bg-fuchsia-600',
    courses: [
      { id: 'ds-basics', title: 'Data Structures Fundamentals', duration: '15h', level: 'Beginner', lessons: 40 },
      { id: 'ds-advanced', title: 'Advanced Trees & Heaps', duration: '12h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'custom-hash-table', title: 'Implementing a Custom Hash Table', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'b-tree-filesystem', title: 'B-Tree Based File System', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'graph-db-engine', title: 'Mini Graph Database Engine', difficulty: 'Hard', estimatedTime: '15h' }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    skills: 180,
    coursesCount: 9,
    projectsCount: 45,
    icon: 'Brain',
    description: 'Build intelligent systems that learn from data.',
    color: 'bg-teal-600',
    courses: [
      { id: 'ml-math', title: 'Mathematics for ML', duration: '12h', level: 'Intermediate', lessons: 30 },
      { id: 'deep-learning', title: 'Deep Learning Specialization', duration: '40h', level: 'Advanced', lessons: 100 },
      { id: 'nlp-intro', title: 'Natural Language Processing', duration: '15h', level: 'Advanced', lessons: 40 },
      { id: 'computer-vision', title: 'Computer Vision with OpenCV', duration: '18h', level: 'Advanced', lessons: 45 }
    ],
    projects: [
      { id: 'nlp-chatbot', title: 'AI Customer Support Bot', difficulty: 'Hard', estimatedTime: '25h' },
      { id: 'face-recognition', title: 'Real-time Face Recognition', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'recommendation-engine', title: 'Movie Recommendation System', difficulty: 'Medium', estimatedTime: '10h' }
    ]
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    skills: 65,
    coursesCount: 3,
    projectsCount: 28,
    icon: 'FileCode',
    description: 'JavaScript with syntax for types for better development.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'ts-intro', title: 'TypeScript Fundamentals', duration: '8h', level: 'Beginner', lessons: 25 },
      { id: 'ts-advanced', title: 'Advanced TypeScript Types', duration: '10h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'ts-library', title: 'Type-Safe Utility Library', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'ts-orm', title: 'Building a Simple TS ORM', difficulty: 'Hard', estimatedTime: '12h' }
    ]
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    skills: 92,
    coursesCount: 5,
    projectsCount: 35,
    icon: 'Server',
    description: 'Scalable network applications with JavaScript on the server.',
    color: 'bg-green-600',
    courses: [
      { id: 'node-basics', title: 'Node.js Fundamentals', duration: '10h', level: 'Beginner', lessons: 30 },
      { id: 'express-api', title: 'Building APIs with Express', duration: '12h', level: 'Intermediate', lessons: 35 },
      { id: 'node-security', title: 'Securing Node.js Applications', duration: '8h', level: 'Advanced', lessons: 20 }
    ],
    projects: [
      { id: 'realtime-chat', title: 'Real-time Chat with Socket.io', difficulty: 'Medium', estimatedTime: '10h' },
      { id: 'node-streaming-server', title: 'Video Streaming Server', difficulty: 'Hard', estimatedTime: '15h' }
    ]
  },
  {
    id: 'shell',
    title: 'Shell Scripting',
    skills: 55,
    coursesCount: 4,
    projectsCount: 18,
    icon: 'Command',
    description: 'Automate tasks and manage systems with Bash and Zsh.',
    color: 'bg-zinc-700',
    courses: [
      { id: 'shell-basics', title: 'Bash Scripting Mastery', duration: '6h', level: 'Beginner', lessons: 20 },
      { id: 'shell-advanced', title: 'Advanced Shell Automation', duration: '10h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'log-analyzer', title: 'Automated Log Analyzer', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'system-health-check', title: 'System Health Dashboard Script', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'backup-rotation-shell', title: 'Incremental Backup Script', difficulty: 'Hard', estimatedTime: '6h' }
    ]
  },
  {
    id: 'azure',
    title: 'Azure',
    skills: 310,
    coursesCount: 12,
    projectsCount: 30,
    icon: 'CloudSun',
    description: 'Enterprise cloud solutions with Microsoft Azure.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'azure-basics', title: 'Azure Fundamentals (AZ-900)', duration: '10h', level: 'Beginner', lessons: 30 },
      { id: 'azure-architect', title: 'Azure Solutions Architect (AZ-305)', duration: '35h', level: 'Advanced', lessons: 90 },
      { id: 'azure-admin', title: 'Azure Administrator (AZ-104)', duration: '25h', level: 'Intermediate', lessons: 65 }
    ],
    projects: [
      { id: 'azure-web-app', title: 'Scalable Azure Web App', difficulty: 'Medium', estimatedTime: '8h' },
      { id: 'azure-vm-windows', title: 'Deploy a Windows Virtual Machine', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'azure-vnet-config', title: 'Configure Azure Virtual Network', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'azure-sql-db', title: 'Setup Azure SQL Database', difficulty: 'Medium', estimatedTime: '2h' },
      { id: 'azure-app-service-slots', title: 'App Service with Slots', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'azure-load-balancer', title: 'Configure Azure Load Balancer', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'azure-ad-entra', title: 'Manage Identity with Azure AD', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'azure-storage-blobs', title: 'Storage Account with Blobs', difficulty: 'Easy', estimatedTime: '1h' },
      { id: 'azure-functions-serverless', title: 'Implement Azure Functions', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'azure-firewall-config', title: 'Configure Azure Firewall', difficulty: 'Hard', estimatedTime: '6h' },
      { id: 'azure-aks-setup', title: 'Setup Azure Kubernetes Service', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'azure-devops-pipelines', title: 'Implement Azure DevOps Pipelines', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'azure-key-vault', title: 'Configure Azure Key Vault', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'azure-monitor-logs', title: 'Azure Monitor & Log Analytics', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'azure-site-recovery', title: 'Implement Azure Site Recovery', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'azure-front-door', title: 'Configure Azure Front Door', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'azure-cosmos-db', title: 'Setup Azure Cosmos DB', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'azure-logic-apps', title: 'Implement Azure Logic Apps', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'azure-bastion', title: 'Configure Azure Bastion', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'azure-acr-setup', title: 'Setup Azure Container Registry', difficulty: 'Easy', estimatedTime: '2h' },
      { id: 'azure-policy-compliance', title: 'Azure Policy for Compliance', difficulty: 'Hard', estimatedTime: '5h' },
      { id: 'azure-traffic-manager', title: 'Configure Azure Traffic Manager', difficulty: 'Medium', estimatedTime: '4h' },
      { id: 'azure-data-factory', title: 'Setup Azure Data Factory', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'azure-private-link', title: 'Implement Azure Private Link', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'azure-app-gateway', title: 'Configure Azure App Gateway', difficulty: 'Hard', estimatedTime: '7h' },
      { id: 'azure-virtual-desktop', title: 'Setup Azure Virtual Desktop', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'azure-sentinel-siem', title: 'Implement Azure Sentinel (SIEM)', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'azure-expressroute', title: 'Configure Azure ExpressRoute', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'azure-synapse-analytics', title: 'Setup Azure Synapse Analytics', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'azure-api-management', title: 'Implement Azure API Management', difficulty: 'Hard', estimatedTime: '8h' }
    ]
  },
  {
    id: 'c-lang',
    title: 'C Programming',
    skills: 95,
    coursesCount: 5,
    projectsCount: 10,
    icon: 'Cpu',
    description: 'The foundation of modern computing and systems.',
    color: 'bg-slate-600',
    courses: [
      { id: 'c-basics', title: 'C Programming Fundamentals', duration: '20h', level: 'Beginner', lessons: 60 },
      { id: 'c-pointers', title: 'Mastering C Pointers', duration: '10h', level: 'Advanced', lessons: 30 }
    ],
    projects: [
      { id: 'memory-allocator', title: 'Custom Memory Allocator', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'shell-c', title: 'Writing a Shell in C', difficulty: 'Hard', estimatedTime: '20h' },
      { id: 'http-server-c', title: 'Simple HTTP Server in C', difficulty: 'Hard', estimatedTime: '12h' }
    ]
  },
  {
    id: 'cloud-native',
    title: 'Cloud Native',
    skills: 145,
    coursesCount: 4,
    projectsCount: 12,
    icon: 'Cloud',
    description: 'Design and build resilient, scalable cloud-native systems.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'cloud-native-intro', title: 'Cloud Native Fundamentals', duration: '6h', level: 'Beginner', lessons: 15 },
      { id: 'microservices-design', title: 'Microservices Architecture Design', duration: '10h', level: 'Intermediate', lessons: 25 },
      { id: 'serverless-patterns', title: 'Advanced Serverless Patterns', duration: '8h', level: 'Advanced', lessons: 20 },
      { id: 'observability-mastery', title: 'Observability & Monitoring', duration: '7h', level: 'Intermediate', lessons: 18 }
    ],
    projects: [
      { id: 'event-driven-app', title: 'Event-Driven Microservices', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'service-mesh-istio', title: 'Istio Service Mesh Implementation', difficulty: 'Hard', estimatedTime: '8h' },
      { id: 'serverless-api-gateway', title: 'Global Serverless API Gateway', difficulty: 'Medium', estimatedTime: '5h' }
    ]
  },
  {
    id: 'devsecops',
    title: 'DevSecOps',
    skills: 130,
    coursesCount: 3,
    projectsCount: 8,
    icon: 'Shield',
    description: 'Integrate security into every stage of the software development lifecycle.',
    color: 'bg-red-500',
    courses: [
      { id: 'devsecops-intro', title: 'DevSecOps Principles', duration: '5h', level: 'Beginner', lessons: 12 },
      { id: 'vulnerability-scanning', title: 'Automated Vulnerability Scanning', duration: '8h', level: 'Intermediate', lessons: 20 },
      { id: 'compliance-as-code', title: 'Compliance as Code (InSpec)', duration: '7h', level: 'Advanced', lessons: 15 }
    ],
    projects: [
      { id: 'secure-pipeline', title: 'Building a Secure CI/CD Pipeline', difficulty: 'Hard', estimatedTime: '12h' },
      { id: 'container-security', title: 'Hardening Kubernetes Clusters', difficulty: 'Hard', estimatedTime: '10h' }
    ]
  },
  {
    id: 'sre',
    title: 'SRE',
    skills: 160,
    coursesCount: 4,
    projectsCount: 10,
    icon: 'Activity',
    description: 'Master Site Reliability Engineering to build highly available systems.',
    color: 'bg-indigo-500',
    courses: [
      { id: 'sre-fundamentals', title: 'SRE Fundamentals', duration: '6h', level: 'Beginner', lessons: 14 },
      { id: 'sli-slo-sla', title: 'Mastering SLIs, SLOs, and SLAs', duration: '4h', level: 'Intermediate', lessons: 10 },
      { id: 'incident-management', title: 'Modern Incident Management', duration: '7h', level: 'Intermediate', lessons: 18 },
      { id: 'chaos-engineering', title: 'Introduction to Chaos Engineering', duration: '9h', level: 'Advanced', lessons: 22 }
    ],
    projects: [
      { id: 'error-budget-policy', title: 'Implementing Error Budgets', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'chaos-mesh-lab', title: 'Chaos Mesh in Production', difficulty: 'Hard', estimatedTime: '12h' }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    skills: 110,
    coursesCount: 3,
    projectsCount: 6,
    icon: 'Link',
    description: 'Learn decentralized technologies and smart contract development.',
    color: 'bg-orange-500',
    courses: [
      { id: 'blockchain-basics', title: 'Blockchain Fundamentals', duration: '5h', level: 'Beginner', lessons: 12 },
      { id: 'solidity-dev', title: 'Smart Contract Dev with Solidity', duration: '12h', level: 'Intermediate', lessons: 30 },
      { id: 'web3-dapps', title: 'Building Web3 dApps', duration: '10h', level: 'Advanced', lessons: 25 }
    ],
    projects: [
      { id: 'nft-marketplace', title: 'Build an NFT Marketplace', difficulty: 'Hard', estimatedTime: '15h' },
      { id: 'dao-governance', title: 'DAO Governance System', difficulty: 'Hard', estimatedTime: '12h' }
    ]
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: 'Brain',
    skills: 150,
    coursesCount: 5,
    projectsCount: 20,
    description: 'Master Generative AI, LLMs, and Prompt Engineering.',
    color: 'bg-brand-blue',
    courses: [
      { id: 'ai-fundamentals', title: 'AI & LLM Fundamentals', duration: '6h', level: 'Beginner', lessons: 10 },
      { id: 'prompt-engineering', title: 'Prompt Engineering Mastery', duration: '8h', level: 'Intermediate', lessons: 15 },
      { id: 'generative-ai', title: 'Generative AI with Gemini', duration: '12h', level: 'Advanced', lessons: 20 },
      { id: 'ai-agents', title: 'Building AI Agents', duration: '15h', level: 'Advanced', lessons: 25 },
      { id: 'ai-ethics', title: 'AI Ethics & Safety', duration: '4h', level: 'Beginner', lessons: 8 }
    ],
    projects: [
      { id: 'ai-chatbot', title: 'Build a Custom AI Chatbot', difficulty: 'Medium', estimatedTime: '5h' },
      { id: 'image-gen-app', title: 'AI Image Generation App', difficulty: 'Medium', estimatedTime: '6h' },
      { id: 'rag-system', title: 'RAG System for Documents', difficulty: 'Hard', estimatedTime: '10h' },
      { id: 'ai-content-gen', title: 'Automated Content Generator', difficulty: 'Medium', estimatedTime: '4h' }
    ]
  },
  {
    id: 'finops',
    title: 'Cloud FinOps',
    icon: 'DollarSign',
    skills: 120,
    coursesCount: 3,
    projectsCount: 15,
    description: 'Master the art of cloud financial management and cost optimization.',
    color: 'bg-emerald-500',
    courses: [
      { id: 'finops-fundamentals', title: 'FinOps Fundamentals', duration: '4h', level: 'Beginner', lessons: 12 },
      { id: 'cloud-cost-optimization', title: 'Cloud Cost Optimization', duration: '8h', level: 'Intermediate', lessons: 20 },
      { id: 'k8s-finops-mastery', title: 'Kubernetes FinOps Mastery', duration: '10h', level: 'Advanced', lessons: 25 }
    ],
    projects: [
      { id: '139', title: 'Kubernetes Cost Visibility with Kubecost', difficulty: 'Medium', estimatedTime: '2h' },
      { id: '140', title: 'Optimizing Kubernetes Resource Quotas for FinOps', difficulty: 'Medium', estimatedTime: '1.5h' },
      { id: 'aws-cost-explorer', title: 'AWS Cost Explorer Automation', difficulty: 'Medium', estimatedTime: '3h' },
      { id: 'gcp-billing-export', title: 'GCP Billing Export to BigQuery', difficulty: 'Hard', estimatedTime: '5h' }
    ]
  }
];
