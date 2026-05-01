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

  return {
    projectId,
    environment: 'linux',
    steps: steps.map((s, i) => ({
      id: `step-${i + 1}`,
      title: s.title,
      instruction: `${s.instruction} (${projectTitle})`,
      summary: s.title,
      whyNeeded: `This step is critical for ${projectTitle} to ensure structural integrity and professional standards.`,
      pillarConnection: 'Operational Excellence — maintaining high-fidelity workflows even in fallback scenarios.',
    }))
  };
}
