import { LabContent } from '../types/content';

const CATEGORY_LABS: Record<string, { title: string; instruction: string }[]> = {
  docker: [
    { title: 'Dockerfile Architecture', instruction: 'Author a multi-stage Dockerfile to package the application with minimal footprint.' },
    { title: 'Image Composition', instruction: 'Build the OCI image and verify the layered filesystem for optimization.' },
    { title: 'Container Lifecycle', instruction: 'Run the containerized app with appropriate resource limits and logging.' },
  ],
  k8s: [
    { title: 'Manifest Orchestration', instruction: 'Define the desired state using declarative YAML manifests (Deployment/Service).' },
    { title: 'Cluster Deployment', instruction: 'Apply the configurations to the Kubernetes cluster and monitor rollout status.' },
    { title: 'Observability Audit', instruction: 'Verify pod health, service discovery, and endpoint connectivity.' },
  ],
  cyber: [
    { title: 'Surface Reconnaissance', instruction: 'Perform network discovery to identify active services and potential entry points.' },
    { title: 'Vulnerability Analysis', instruction: 'Scan targets for known CVEs and misconfigurations using automated tools.' },
    { title: 'Security Validation', instruction: 'Execute safe exploitation techniques to verify the impact of discovered flaws.' },
  ],
  db: [
    { title: 'Schema Initialization', instruction: 'Connect to the database instance and provision the required tables and constraints.' },
    { title: 'Data Manipulation', instruction: 'Perform CRUD operations and verify index performance on large datasets.' },
    { title: 'Integrity Verification', instruction: 'Audit the data state to ensure ACID compliance and referential integrity.' },
  ],
  azure: [
    { title: 'Identity & Governance', instruction: 'Configure Entra ID (Azure AD) service principals and assign appropriate RBAC roles.' },
    { title: 'Infrastructure Provisioning', instruction: 'Deploy the required Azure resources (App Service, SQL, etc.) via CLI or ARM templates.' },
    { title: 'Resource Monitoring', instruction: 'Set up Azure Monitor and Log Analytics to verify resource health and performance.' },
  ],
  networking: [
    { title: 'Topology Discovery', instruction: 'Map the network interfaces and verify local route tables for correct traffic flow.' },
    { title: 'Protocol Audit', instruction: 'Capture and analyze packets to ensure correct port usage and encrypted communication.' },
    { title: 'Connectivity Stress-Test', instruction: 'Verify latency and throughput across network segments to ensure SLA compliance.' },
  ],
  ai: [
    { title: 'Dataset Preparation', instruction: 'Clean and tokenize raw data to prepare it for ingestion into the training pipeline.' },
    { title: 'Model Inference Test', instruction: 'Load the pre-trained weights and execute a forward pass to verify output accuracy.' },
    { title: 'Optimization & Scaling', instruction: 'Implement quantization or caching to reduce inference latency for production use.' },
  ],
};

const GENERIC_LAB = [
  { title: 'Environment Prep', instruction: 'Initialize the local workspace and verify required toolchain availability.' },
  { title: 'Core Implementation', instruction: 'Execute the primary technical tasks defined in the project brief.' },
  { title: 'Production Validation', instruction: 'Verify the solution against the expected output and reliability standards.' },
];

const MISSION_BLUEPRINTS: { title: string; summary: string; pillar: string }[] = [
  { title: 'Environment Initialization', summary: 'Prepare baseline runtime and dependencies.', pillar: 'Operational Excellence' },
  { title: 'Access and Security Baseline', summary: 'Enforce least-privilege and secure defaults.', pillar: 'Security' },
  { title: 'Core Service Configuration', summary: 'Configure the primary service for the scenario.', pillar: 'Reliability' },
  { title: 'Automation and Repeatability', summary: 'Codify repeatable setup and operations.', pillar: 'Operational Excellence' },
  { title: 'Observability and Diagnostics', summary: 'Add diagnostics to verify behavior and triage issues.', pillar: 'Performance Efficiency' },
  { title: 'Resilience and Recovery', summary: 'Prepare rollback, restart, and incident-response controls.', pillar: 'Reliability' },
  { title: 'Final Validation and Handoff', summary: 'Run final checks and produce deployment-ready evidence.', pillar: 'Cost Optimization' },
];

const CATEGORY_COMMANDS: Record<string, string[]> = {
  docker: [
    'docker --version',
    'docker build -t lab-app:latest .',
    'docker run --rm -p 8080:80 lab-app:latest',
    'docker ps --format "table {{.Names}}\t{{.Status}}"',
    'docker logs --tail 50 $(docker ps -q | head -n 1)',
    'docker stop $(docker ps -q | head -n 1)',
    'docker image ls | head -n 10'
  ],
  k8s: [
    'kubectl config current-context',
    'kubectl apply -f manifests/',
    'kubectl get pods -A',
    'kubectl rollout status deploy/app -n default',
    'kubectl logs deploy/app --tail=50',
    'kubectl describe pod $(kubectl get pod -n default -o name | head -n 1)',
    'kubectl get svc -n default'
  ],
  cyber: [
    'sudo systemctl status ssh --no-pager',
    'sudo ufw status verbose',
    'sudo ss -tulpn | head -n 20',
    'sudo grep -E "PermitRootLogin|PasswordAuthentication" /etc/ssh/sshd_config',
    'sudo tail -n 40 /var/log/auth.log',
    'sudo fail2ban-client status || true',
    'sudo passwd -S root'
  ],
  db: [
    'psql --version',
    'psql -c "SELECT now();"',
    'psql -c "\\dt"',
    'psql -c "EXPLAIN SELECT 1;"',
    'psql -c "SELECT count(*) FROM information_schema.tables;"',
    'psql -c "SELECT current_database();"',
    'psql -c "SELECT version();"'
  ],
  azure: [
    'az account show --output table',
    'az group list --top 5 --output table',
    'az resource list --top 5 --output table',
    'az deployment group what-if --help',
    'az monitor metrics list-definitions --resource "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Web/sites/<app>" || true',
    'az role assignment list --assignee <principal-id> --output table || true',
    'az configure --list-defaults'
  ],
  networking: [
    'ip -br a',
    'ip route',
    'nslookup example.com',
    'curl -I https://example.com',
    'ss -tulpn | head -n 20',
    'ping -c 3 8.8.8.8',
    'traceroute example.com | head -n 15 || true'
  ],
  ai: [
    'python -V',
    'python -c "print(\"dataset loaded\")"',
    'python -c "print(\"inference complete\")"',
    'python -c "print(\"latency baseline captured\")"',
    'python -c "print(\"metrics exported\")"',
    'python -c "print(\"rollback checkpoint saved\")"',
    'python -c "print(\"validation complete\")"'
  ],
  generic: [
    'pwd',
    'ls -la',
    'mkdir -p workspace && cd workspace',
    'echo "automation check" > checklist.txt',
    'cat checklist.txt',
    'date',
    'echo "final validation passed"'
  ]
};

const resolveCategoryKey = (lowerCat: string): keyof typeof CATEGORY_COMMANDS => {
  if (lowerCat.includes('docker')) return 'docker';
  if (lowerCat.includes('k8s') || lowerCat.includes('kubernetes')) return 'k8s';
  if (lowerCat.includes('cyber') || lowerCat.includes('security')) return 'cyber';
  if (lowerCat.includes('db') || lowerCat.includes('data') || lowerCat.includes('sql')) return 'db';
  if (lowerCat.includes('azure')) return 'azure';
  if (lowerCat.includes('net') || lowerCat.includes('network')) return 'networking';
  if (lowerCat.includes('ai') || lowerCat.includes('intelligence') || lowerCat.includes('ml')) return 'ai';
  return 'generic';
};

export function generateFallbackLab(projectId: string, projectTitle: string, category: string): LabContent {
  const lowerCat = category.toLowerCase();
  let steps = GENERIC_LAB;
  
  if (lowerCat.includes('docker')) steps = CATEGORY_LABS.docker;
  else if (lowerCat.includes('k8s') || lowerCat.includes('kubernetes')) steps = CATEGORY_LABS.k8s;
  else if (lowerCat.includes('cyber') || lowerCat.includes('security')) steps = CATEGORY_LABS.cyber;
  else if (lowerCat.includes('db') || lowerCat.includes('data') || lowerCat.includes('sql')) steps = CATEGORY_LABS.db;
  else if (lowerCat.includes('azure')) steps = CATEGORY_LABS.azure;
  else if (lowerCat.includes('net') || lowerCat.includes('network')) steps = CATEGORY_LABS.networking;
  else if (lowerCat.includes('ai') || lowerCat.includes('intelligence') || lowerCat.includes('ml')) steps = CATEGORY_LABS.ai;

  const commandSet = CATEGORY_COMMANDS[resolveCategoryKey(lowerCat)];

  const expandedSteps = MISSION_BLUEPRINTS.map((mission, index) => {
    const sourceStep = steps[index % steps.length];
    const command = commandSet[index % commandSet.length];

    return {
      id: `step-${index + 1}`,
      title: sourceStep?.title || mission.title,
      instruction: `${sourceStep?.instruction || mission.summary} (${projectTitle})`,
      summary: mission.summary,
      whyNeeded: `Completing this mission ensures ${projectTitle} meets production-grade standards for ${mission.pillar.toLowerCase()}.`,
      pillarConnection: `${mission.pillar} - enforced through reproducible hands-on validation.`,
      commands: [
        {
          text: command,
          explanation: `Run this verification command to complete mission ${index + 1}.`
        }
      ],
      checkCommand: command,
      expectedOutput: 'success'
    };
  });

  return {
    projectId,
    environment: 'linux',
    description: `${projectTitle} hands-on sandbox with mission-driven guidance, live terminal validation, and production-focused checks.`,
    objective: `Complete all ${MISSION_BLUEPRINTS.length} missions to validate ${projectTitle} end-to-end in an interactive environment.`,
    missionNumber: 1,
    totalMissions: MISSION_BLUEPRINTS.length,
    xpReward: 300,
    steps: expandedSteps
  };
}
