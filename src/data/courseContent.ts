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
        },
        commands: [
          { text: 'ls', explanation: 'List all files and folders in the current directory.' },
          { text: 'pwd', explanation: 'Show the absolute path of your current working directory.' },
          { text: 'whoami', explanation: 'Display the username of the current user.' }
        ]
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
        },
        commands: [
          { text: 'sudo apt update', explanation: 'Refresh the local package index to see new updates.' },
          { text: 'sudo apt list --upgradable', explanation: 'List all packages that have a newer version available.' },
          { text: 'sudo apt install -y curl', explanation: 'Install the curl utility non-interactively.' }
        ]
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
        },
        commands: [
          { text: 'cd /etc', explanation: 'Change the current directory to the system config folder.' },
          { text: 'ls -la', explanation: 'List all files, including hidden ones, with detailed metadata.' },
          { text: 'cd ~', explanation: 'Return to your home directory.' }
        ]
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
      // Curated DevOps Engineering missions — each is interactive and active
      ...[
        { topic: 'CI/CD Pipelines', cmd: 'git status', focus: 'Continuous Integration & Continuous Delivery with GitHub Actions and Azure Pipelines.' },
        { topic: 'Infrastructure as Code', cmd: 'terraform plan', focus: 'Declarative infrastructure provisioning with Terraform and Bicep.' },
        { topic: 'Configuration Management', cmd: 'ansible --version', focus: 'Idempotent configuration with Ansible and PowerShell DSC.' },
        { topic: 'Containerization', cmd: 'docker ps', focus: 'Packaging applications with Docker and OCI images.' },
        { topic: 'Container Orchestration', cmd: 'kubectl get nodes', focus: 'Running containers at scale with Kubernetes (AKS).' },
        { topic: 'Helm Charts', cmd: 'helm list', focus: 'Templating and versioning Kubernetes manifests with Helm.' },
        { topic: 'GitOps', cmd: 'flux get sources git', focus: 'Declarative cluster state with Flux and ArgoCD.' },
        { topic: 'Secrets Management', cmd: 'az keyvault secret list --vault-name demo', focus: 'Storing secrets securely in Azure Key Vault and HashiCorp Vault.' },
        { topic: 'Monitoring & Metrics', cmd: 'kubectl top nodes', focus: 'Collecting metrics with Prometheus and Azure Monitor.' },
        { topic: 'Log Aggregation', cmd: 'kubectl logs -l app=web --tail=20', focus: 'Centralized logs with Log Analytics and the ELK stack.' },
        { topic: 'Distributed Tracing', cmd: 'curl http://jaeger:16686/api/traces', focus: 'End-to-end tracing with OpenTelemetry and Jaeger.' },
        { topic: 'Alerting & On-Call', cmd: 'az monitor alert list', focus: 'Actionable alerts and rotation with PagerDuty.' },
        { topic: 'SRE Principles', cmd: 'echo "SLO: 99.9%"', focus: 'SLIs, SLOs, error budgets, and toil reduction.' },
        { topic: 'Chaos Engineering', cmd: 'chaos-mesh apply', focus: 'Resilience testing with Chaos Mesh and Azure Chaos Studio.' },
        { topic: 'Blue/Green Deployments', cmd: 'kubectl rollout status deploy/web', focus: 'Zero-downtime releases with Blue/Green strategy.' },
        { topic: 'Canary Releases', cmd: 'kubectl get canary', focus: 'Progressive delivery with Flagger and Argo Rollouts.' },
        { topic: 'Feature Flags', cmd: 'curl https://api.flags/v1/flags', focus: 'Runtime gating with LaunchDarkly and Azure App Configuration.' },
        { topic: 'Service Mesh', cmd: 'istioctl proxy-status', focus: 'Traffic management and mTLS with Istio and Linkerd.' },
        { topic: 'API Gateways', cmd: 'curl https://api.example.com/healthz', focus: 'Routing, throttling, and auth with Azure API Management.' },
        { topic: 'Load Balancing', cmd: 'az network lb list', focus: 'Layer-4 and Layer-7 load balancing strategies.' },
        { topic: 'Auto-scaling', cmd: 'kubectl get hpa', focus: 'Horizontal and vertical pod autoscaling on AKS.' },
        { topic: 'Cost Optimization', cmd: 'az consumption usage list', focus: 'FinOps tagging, reservations, and rightsizing.' },
        { topic: 'DevSecOps Basics', cmd: 'trivy image nginx:latest', focus: 'Shift-left security scanning in pipelines.' },
        { topic: 'SAST & SCA', cmd: 'semgrep --config=auto .', focus: 'Static analysis and dependency scanning.' },
        { topic: 'Container Image Scanning', cmd: 'docker scout cves nginx', focus: 'Vulnerability scanning of container images.' },
        { topic: 'Policy as Code', cmd: 'opa eval -d policy.rego "data.allow"', focus: 'Enforcing policies with OPA and Azure Policy.' },
        { topic: 'Compliance Automation', cmd: 'az policy state list', focus: 'Continuous compliance with Azure Policy and Defender for Cloud.' },
        { topic: 'Backup & DR', cmd: 'velero backup get', focus: 'Disaster recovery with Velero and Azure Backup.' },
        { topic: 'Multi-Region Architecture', cmd: 'az traffic-manager profile list', focus: 'Active/active and active/passive across regions.' },
        { topic: 'CDN & Edge', cmd: 'az afd profile list', focus: 'Global delivery with Azure Front Door and CDN.' },
        { topic: 'DNS Management', cmd: 'az network dns zone list', focus: 'Reliable DNS with Azure DNS and traffic routing.' },
        { topic: 'TLS Certificates', cmd: 'openssl s_client -connect example.com:443', focus: 'Automated cert management with cert-manager and Key Vault.' },
        { topic: 'Network Policies', cmd: 'kubectl get networkpolicy', focus: 'Pod-level network segmentation in AKS.' },
        { topic: 'Private Endpoints', cmd: 'az network private-endpoint list', focus: 'Securing PaaS access with Azure Private Link.' },
        { topic: 'Identity & RBAC', cmd: 'az role assignment list', focus: 'Least-privilege access with Entra ID and Azure RBAC.' },
        { topic: 'Managed Identities', cmd: 'az identity list', focus: 'Passwordless auth for workloads on Azure.' },
        { topic: 'Workload Identity', cmd: 'kubectl get sa', focus: 'Federated identity for pods on AKS.' },
        { topic: 'Service Principals', cmd: 'az ad sp list --show-mine', focus: 'Application-level credentials and rotation.' },
        { topic: 'Pipeline Templates', cmd: 'cat .github/workflows/reusable.yml', focus: 'DRY pipelines with reusable workflows.' },
        { topic: 'Self-Hosted Runners', cmd: 'gh runner list', focus: 'Private CI runners for compliance and performance.' },
        { topic: 'Artifact Registries', cmd: 'az acr repository list --name demo', focus: 'Private container and package registries.' },
        { topic: 'SBOM & Provenance', cmd: 'syft packages dir:.', focus: 'Software bill of materials and supply-chain security.' },
        { topic: 'Sigstore Cosign', cmd: 'cosign verify ghcr.io/demo/app', focus: 'Signing and verifying container images.' },
        { topic: 'Secrets Rotation', cmd: 'az keyvault secret rotate --name demo', focus: 'Automated credential rotation strategies.' },
        { topic: 'Database Migrations', cmd: 'flyway migrate', focus: 'Versioned schema migrations in CI/CD.' },
        { topic: 'Zero-Downtime Migrations', cmd: 'pg_dump --schema-only db', focus: 'Backwards-compatible migrations and dual writes.' },
        { topic: 'Caching Strategies', cmd: 'redis-cli ping', focus: 'Application caching with Redis and Azure Cache.' },
        { topic: 'Message Queues', cmd: 'az servicebus queue list', focus: 'Async processing with Service Bus and Event Hubs.' },
        { topic: 'Event-Driven Architecture', cmd: 'az eventgrid topic list', focus: 'Event Grid, EventBridge, and pub/sub patterns.' },
        { topic: 'Serverless Functions', cmd: 'func start', focus: 'Azure Functions and event-driven compute.' },
        { topic: 'Container Apps', cmd: 'az containerapp list', focus: 'Managed serverless containers on Azure.' },
        { topic: 'Static Web Apps', cmd: 'swa start', focus: 'Modern web hosting with built-in CI/CD.' },
        { topic: 'CDN Cache Headers', cmd: 'curl -I https://cdn.example.com/asset.js', focus: 'Optimizing edge caching with Cache-Control.' },
        { topic: 'Performance Testing', cmd: 'k6 run loadtest.js', focus: 'Load testing with k6 and Azure Load Testing.' },
        { topic: 'Synthetic Monitoring', cmd: 'curl https://app/healthz', focus: 'Active probes and uptime checks.' },
        { topic: 'Real User Monitoring', cmd: 'echo "Application Insights active"', focus: 'RUM and Core Web Vitals tracking.' },
        { topic: 'Postmortems', cmd: 'echo "Blameless postmortem template"', focus: 'Blameless culture and learning from incidents.' },
        { topic: 'Runbooks & Playbooks', cmd: 'cat runbook.md', focus: 'Operational documentation and automation.' },
        { topic: 'Capacity Planning', cmd: 'kubectl describe node aks-node-1', focus: 'Forecasting resources and quota management.' },
        { topic: 'Multi-Cluster Management', cmd: 'kubectl config get-contexts', focus: 'Federated AKS with Azure Arc and Fleet Manager.' },
        { topic: 'Edge & IoT DevOps', cmd: 'az iot hub list', focus: 'Deploying to Azure IoT Edge and constrained devices.' },
        { topic: 'ML/AI Pipelines (MLOps)', cmd: 'mlflow experiments list', focus: 'CI/CD for ML models with MLflow and Azure ML.' },
        { topic: 'Data Pipelines (DataOps)', cmd: 'az synapse pipeline list --workspace-name demo', focus: 'ETL/ELT orchestration with Data Factory and Synapse.' },
        { topic: 'Platform Engineering', cmd: 'backstage --version', focus: 'Internal developer platforms with Backstage and Radius.' },
        { topic: 'Developer Productivity', cmd: 'gh codespace list', focus: 'Cloud dev environments with Codespaces and Dev Containers.' },
        { topic: 'Trunk-Based Development', cmd: 'git log --oneline -5', focus: 'Short-lived branches and continuous integration.' },
        { topic: 'Code Review Automation', cmd: 'gh pr list', focus: 'Automated reviewers, CODEOWNERS, and policy gates.' },
        { topic: 'Pre-commit Hooks', cmd: 'pre-commit run --all-files', focus: 'Local quality gates before code reaches CI.' },
        { topic: 'Linting & Formatting', cmd: 'eslint . && prettier --check .', focus: 'Consistent code style enforced in CI.' },
        { topic: 'Test Automation', cmd: 'npm test -- --coverage', focus: 'Unit, integration, and contract tests.' },
        { topic: 'E2E Testing', cmd: 'playwright test', focus: 'Browser-level testing with Playwright and Cypress.' },
        { topic: 'Mutation Testing', cmd: 'stryker run', focus: 'Validating test suite quality.' },
        { topic: 'Test Data Management', cmd: 'cat fixtures/users.json', focus: 'Synthetic data and golden datasets.' },
        { topic: 'Environment Promotion', cmd: 'azd env list', focus: 'Promoting builds dev → staging → prod safely.' },
        { topic: 'Feature Branch Environments', cmd: 'kubectl get ns -l type=preview', focus: 'On-demand preview environments per PR.' },
        { topic: 'Rollback Strategies', cmd: 'kubectl rollout undo deploy/web', focus: 'Fast, safe rollbacks and deployment markers.' },
        { topic: 'Observability Pillars', cmd: 'echo "metrics, logs, traces"', focus: 'Unified telemetry strategy.' },
        { topic: 'eBPF Observability', cmd: 'sudo bpftool prog list', focus: 'Kernel-level visibility with eBPF and Cilium.' },
        { topic: 'Tracing with W3C', cmd: 'curl -H "traceparent: 00-..." https://api', focus: 'Standardized trace context propagation.' },
        { topic: 'Resilience Patterns', cmd: 'echo "circuit breaker, retry, bulkhead"', focus: 'Polly, retry-with-backoff, and bulkheads.' },
        { topic: 'Idempotency', cmd: 'curl -H "Idempotency-Key: 123" -X POST https://api', focus: 'Safe retries with idempotency keys.' },
        { topic: 'Distributed Locks', cmd: 'redis-cli SET lock:resource 1 NX EX 30', focus: 'Coordinating work across replicas.' },
        { topic: 'Saga Pattern', cmd: 'echo "Compensating transactions"', focus: 'Long-running distributed transactions.' },
        { topic: 'CQRS & Event Sourcing', cmd: 'echo "Read/Write separation"', focus: 'Architectural patterns for high scale.' },
        { topic: 'Database Sharding', cmd: 'echo "Hash and range partitioning"', focus: 'Horizontal scaling of relational databases.' },
        { topic: 'Read Replicas', cmd: 'az postgres flexible-server replica list-by-server', focus: 'Read-scaling with replicas and routing.' },
        { topic: 'Connection Pooling', cmd: 'pgbouncer --version', focus: 'Reducing connection overhead with PgBouncer.' },
        { topic: 'GraphQL Federation', cmd: 'rover supergraph compose', focus: 'Composing schemas across teams.' },
        { topic: 'gRPC Services', cmd: 'grpcurl -plaintext localhost:50051 list', focus: 'High-performance RPC with Protocol Buffers.' },
        { topic: 'WebSockets at Scale', cmd: 'az signalr list', focus: 'Real-time pub/sub with Azure SignalR.' },
        { topic: 'Edge Functions', cmd: 'az functionapp list --query "[?kind==\'edge\']"', focus: 'Compute close to users for low latency.' },
        { topic: 'WebAssembly Workloads', cmd: 'wasmtime run module.wasm', focus: 'Portable workloads with WASM and Spin.' },
        { topic: 'Confidential Computing', cmd: 'az confcom list', focus: 'Trusted execution environments and attestation.' },
        { topic: 'Quantum-Safe Crypto', cmd: 'openssl list -kdf-algorithms', focus: 'Preparing systems for post-quantum cryptography.' },
        { topic: 'Green Software', cmd: 'echo "Carbon-aware scheduling"', focus: 'Sustainability and carbon-aware deployments.' },
        { topic: 'AIOps', cmd: 'az monitor metrics alert list', focus: 'AI-assisted incident detection and triage.' },
        { topic: 'LLMOps', cmd: 'az ml model list', focus: 'Operating LLMs with evaluation and guardrails.' },
        { topic: 'Vector Databases', cmd: 'curl http://localhost:6333/collections', focus: 'Embeddings storage with Azure AI Search and Qdrant.' },
        { topic: 'RAG in Production', cmd: 'curl http://api/rag/query', focus: 'Retrieval-augmented generation pipelines.' },
        { topic: 'Agent Workflows', cmd: 'echo "Tool calls + planner"', focus: 'Production-grade agentic systems with Foundry.' },
        { topic: 'Capstone: Full DevOps Stack', cmd: 'azd up', focus: 'Bringing it all together: pipeline, infra, observability.' }
      ].map((m, i) => ({
        id: `devops-ext-${i + 1}`,
        title: `DevOps Engineering: ${m.topic}`,
        content: `
# ${m.topic}
${m.focus}

## Why It Matters
Mastering ${m.topic.toLowerCase()} is essential for shipping reliable, secure, and scalable software at modern engineering velocity.

## What You'll Practice
- Run real commands in the interactive sandbox
- Inspect outputs and reason about failure modes
- Apply the pattern to a representative scenario
        `,
        task: `Run \`${m.cmd}\` in the sandbox to explore ${m.topic.toLowerCase()}.`,
        demoType: 'terminal' as const,
        demoConfig: {
          initialMessage: `${m.topic} sandbox ready. Try \`${m.cmd}\`.`,
          availableCommands: [m.cmd.split(' ')[0], 'ls', 'pwd', 'help', 'clear']
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
- **Providers**: Plugins that interact with cloud APIs (Azure, Kubernetes, etc.).
- **Resources**: The components of your infrastructure (Virtual Machines, Storage Accounts, VNets).
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
        },
        commands: [
          { text: 'terraform init', explanation: 'Initialize the working directory and download providers.' },
          { text: 'terraform plan', explanation: 'Create an execution plan to see what will be changed.' },
          { text: 'terraform apply -auto-approve', explanation: 'Apply the changes to reach the desired state automatically.' }
        ]
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
- Remote State Management (Azure Storage, Terraform Cloud)
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
  }
];
