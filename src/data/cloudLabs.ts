import { LabContent } from '../types/content';

export const cloudLabs: LabContent[] = [
  {
    projectId: 'cloud-devops-foundation',
    environment: 'linux',
    description: 'Build foundational cloud and DevOps muscle by setting up a hardened Linux web service and validating operational controls.',
    objective: 'Provision and secure Apache, validate service health, and complete a baseline hardening checklist in a live sandbox.',
    missionNumber: 1,
    totalMissions: 7,
    xpReward: 300,
    steps: [
      {
        id: 'step-1',
        title: 'Install Apache Web Server',
        instruction: 'Update package metadata and install Apache2.',
        summary: 'Provision the web tier.',
        whyNeeded: 'Every production workload starts with a reproducible install path.',
        pillarConnection: 'Operational Excellence - deterministic provisioning avoids drift.',
        commands: [
          { text: 'sudo apt update', explanation: 'Refresh package index metadata.' },
          { text: 'sudo apt install -y apache2', explanation: 'Install Apache with non-interactive confirmation.' }
        ],
        checkCommand: 'systemctl is-active apache2',
        expectedOutput: 'active'
      },
      {
        id: 'step-2',
        title: 'Secure the Service',
        instruction: 'Allow web traffic and enable UFW firewall policy.',
        summary: 'Reduce exposed surface area.',
        whyNeeded: 'A service is not production-ready without explicit network policy.',
        pillarConnection: 'Security - least privilege ingress policy.',
        commands: [
          { text: 'sudo ufw allow "Apache"', explanation: 'Open the Apache profile (HTTP/HTTPS).' },
          { text: 'sudo ufw --force enable', explanation: 'Enable UFW without interactive prompt.' }
        ],
        checkCommand: 'ufw status',
        expectedOutput: 'Status: active'
      },
      {
        id: 'step-3',
        title: 'Customize Web Content',
        instruction: 'Publish a custom landing page for validation.',
        summary: 'Deploy business-facing content.',
        whyNeeded: 'A content check confirms web root mapping and runtime correctness.',
        pillarConnection: 'Reliability - verify user-facing response path.',
        commands: [
          { text: 'echo "Cloud & DevOps Foundation Lab Ready" | sudo tee /var/www/html/index.html', explanation: 'Replace default index page.' }
        ],
        checkCommand: 'curl -s localhost',
        expectedOutput: 'Cloud & DevOps Foundation Lab Ready'
      },
      {
        id: 'step-4',
        title: 'Service Hardening & Virtual Hosts',
        instruction: 'Create and enable a dedicated virtual host config.',
        summary: 'Prepare multi-site routing baseline.',
        whyNeeded: 'Virtual hosts are required for real-world multi-domain hosting.',
        pillarConnection: 'Cost Optimization - host multiple properties on one node.',
        commands: [
          { text: 'sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/foundation.conf', explanation: 'Clone baseline vhost config.' },
          { text: 'sudo a2ensite foundation.conf && sudo systemctl reload apache2', explanation: 'Enable config and reload daemon.' }
        ],
        checkCommand: 'ls /etc/apache2/sites-enabled/foundation.conf',
        expectedOutput: 'foundation.conf'
      },
      {
        id: 'step-5',
        title: 'SSL/TLS Configuration',
        instruction: 'Enable SSL module and generate a local self-signed certificate.',
        summary: 'Encrypt traffic in transit.',
        whyNeeded: 'TLS is mandatory for secure communication even in staging.',
        pillarConnection: 'Security - protect application data in flight.',
        commands: [
          { text: 'sudo a2enmod ssl', explanation: 'Enable Apache SSL module.' },
          { text: 'sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/foundation.key -out /etc/ssl/certs/foundation.crt -subj "/CN=localhost"', explanation: 'Create self-signed cert + private key.' }
        ],
        checkCommand: 'ls /etc/ssl/certs/foundation.crt',
        expectedOutput: 'foundation.crt'
      },
      {
        id: 'step-6',
        title: 'Log Analysis with Tail',
        instruction: 'Inspect Apache access logs and confirm request flow.',
        summary: 'Validate observability path.',
        whyNeeded: 'Incident triage depends on reliable log visibility.',
        pillarConnection: 'Operational Excellence - logging supports rapid troubleshooting.',
        commands: [
          { text: 'sudo tail -n 20 /var/log/apache2/access.log', explanation: 'Read the latest HTTP access entries.' }
        ],
        checkCommand: 'sudo ls /var/log/apache2/access.log',
        expectedOutput: 'access.log'
      },
      {
        id: 'step-7',
        title: 'Final Security Audit',
        instruction: 'Run service status checks and basic port validation.',
        summary: 'Ship-ready verification.',
        whyNeeded: 'A final audit catches gaps before handoff.',
        pillarConnection: 'Reliability - verify system health before release.',
        commands: [
          { text: 'systemctl status apache2 --no-pager', explanation: 'Inspect daemon health and recent events.' },
          { text: 'ss -tulpn | grep -E ":80|:443"', explanation: 'Verify expected listening ports.' }
        ],
        checkCommand: 'systemctl is-enabled apache2',
        expectedOutput: 'enabled'
      }
    ]
  },
  {
    projectId: 'devops-deep-dive',
    environment: 'linux',
    description: 'Run a practical deep dive through CI/CD, IaC validation, deployment safety gates, and post-deploy observability.',
    objective: 'Create a pipeline workflow, lint infrastructure, execute a staged release, and verify health/rollback controls.',
    missionNumber: 1,
    totalMissions: 7,
    xpReward: 350,
    steps: [
      {
        id: 'step-1',
        title: 'Initialize Delivery Workspace',
        instruction: 'Create and initialize the repository used for pipeline automation.',
        summary: 'Bootstrap source-of-truth repo.',
        whyNeeded: 'Pipelines must be versioned to be auditable and repeatable.',
        pillarConnection: 'Operational Excellence - codify workflows in source control.',
        commands: [
          { text: 'git init', explanation: 'Initialize local repository metadata.' },
          { text: 'mkdir -p .github/workflows', explanation: 'Create workflow definition directory.' }
        ],
        checkCommand: 'ls -d .git .github/workflows',
        expectedOutput: '.github/workflows'
      },
      {
        id: 'step-2',
        title: 'Author CI Pipeline',
        instruction: 'Create a CI workflow with checkout, build, and test stages.',
        summary: 'Set continuous integration baseline.',
        whyNeeded: 'Automated verification on commit is the core DevOps quality gate.',
        pillarConnection: 'Reliability - catch defects before deployment.',
        commands: [
          { text: 'cat <<\'EOF\' > .github/workflows/ci.yml\nname: DeepDive-CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Build passed"\n      - run: echo "Tests passed"\nEOF', explanation: 'Create a simple but complete CI pipeline file.' }
        ],
        checkCommand: 'grep "DeepDive-CI" .github/workflows/ci.yml',
        expectedOutput: 'DeepDive-CI'
      },
      {
        id: 'step-3',
        title: 'Add Security Scan Gate',
        instruction: 'Add a security scanning stage that blocks risky releases.',
        summary: 'Shift security into pipeline.',
        whyNeeded: 'DevSecOps requires policy and vulnerability checks before promotion.',
        pillarConnection: 'Security - prevent known vulnerabilities from shipping.',
        commands: [
          { text: 'echo "- run: echo \"SAST scan clean\"" >> .github/workflows/ci.yml', explanation: 'Append a security scan placeholder stage.' }
        ],
        checkCommand: 'grep "SAST scan clean" .github/workflows/ci.yml',
        expectedOutput: 'SAST scan clean'
      },
      {
        id: 'step-4',
        title: 'Validate IaC Before Apply',
        instruction: 'Create Terraform skeleton and run formatting/validation checks.',
        summary: 'Guard infra changes pre-deploy.',
        whyNeeded: 'Infrastructure quality gates reduce failed applies in production.',
        pillarConnection: 'Operational Excellence - treat infra as tested code.',
        commands: [
          { text: 'mkdir -p terraform && cat <<\'EOF\' > terraform/main.tf\nterraform {\n  required_version = \">= 1.5.0\"\n}\nEOF', explanation: 'Create a minimal Terraform root module.' },
          { text: 'terraform fmt -check terraform/main.tf', explanation: 'Ensure style and formatting consistency.' }
        ],
        checkCommand: 'terraform validate terraform',
        expectedOutput: 'Success'
      },
      {
        id: 'step-5',
        title: 'Deploy with Release Marker',
        instruction: 'Simulate deployment output and generate a release marker for traceability.',
        summary: 'Create deploy audit artifact.',
        whyNeeded: 'Release markers enable rollback and postmortem correlation.',
        pillarConnection: 'Reliability - every deployment should be traceable.',
        commands: [
          { text: 'echo "release=$(date +%Y%m%d%H%M%S)" > release.env', explanation: 'Write release identifier artifact.' },
          { text: 'cat release.env', explanation: 'Confirm release marker value.' }
        ],
        checkCommand: 'grep "release=" release.env',
        expectedOutput: 'release='
      },
      {
        id: 'step-6',
        title: 'Post-Deploy Smoke Tests',
        instruction: 'Run health checks and endpoint verification commands.',
        summary: 'Validate runtime behavior.',
        whyNeeded: 'Smoke tests confirm deployment correctness under real conditions.',
        pillarConnection: 'Performance Efficiency - detect regressions quickly.',
        commands: [
          { text: 'curl -sS https://example.org | head -n 1', explanation: 'Probe endpoint response for basic health.' },
          { text: 'echo "service_healthy=true"', explanation: 'Record synthetic smoke-test outcome.' }
        ],
        checkCommand: 'echo service_healthy=true',
        expectedOutput: 'service_healthy=true'
      },
      {
        id: 'step-7',
        title: 'Rollback Readiness Check',
        instruction: 'Prepare rollback command and verify rollback plan notes.',
        summary: 'Confirm failure recovery path.',
        whyNeeded: 'Fast rollback is essential for minimizing blast radius.',
        pillarConnection: 'Reliability - controlled recovery under incident pressure.',
        commands: [
          { text: 'echo "rollback: git revert --no-edit HEAD" > rollback.txt', explanation: 'Document executable rollback action.' },
          { text: 'cat rollback.txt', explanation: 'Verify rollback instruction is ready.' }
        ],
        checkCommand: 'grep "git revert" rollback.txt',
        expectedOutput: 'git revert'
      }
    ]
  },
  {
    projectId: '5',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Workspace Initialization',
        instruction: 'Create a dedicated project directory and initialize a Git repository inside it.',
        summary: 'Set up the project folder and source control.',
        whyNeeded: 'GitHub Actions pipelines are tied to a Git repository. Creating a dedicated directory first prevents your workflow files from mixing with other projects in your home directory — a common mistake that causes git init to track unrelated files.',
        pillarConnection: 'Operational Excellence — organized file systems and version control are the bedrock of reliable automation.',
        commands: [
          {
            text: 'mkdir react-pipeline && cd react-pipeline',
            explanation: 'Creates a fresh project directory named react-pipeline and changes into it. All subsequent commands run from this directory, keeping the pipeline isolated.'
          },
          {
            text: 'git init',
            explanation: 'Initializes a hidden .git directory inside react-pipeline, turning the folder into a Git repository. GitHub Actions reads workflow files from this repo structure.'
          }
        ],
        checkCommand: 'ls -d react-pipeline/.git',
        expectedOutput: 'react-pipeline/.git'
      },
      {
        id: 'step-2',
        title: 'Git Identity Configuration',
        instruction: 'Configure your global Git identity so every commit is correctly attributed to you.',
        summary: 'Set Git author name and email.',
        whyNeeded: 'Git refuses to create commits without an author identity. In CI environments this is set via env vars, but locally it must be configured — missing it is the most common reason git commit fails on a fresh machine.',
        pillarConnection: 'Security — identifying actors in the development lifecycle is critical for accountability and auditing. Every commit in a professional pipeline is signed to an individual.',
        commands: [
          {
            text: 'git config --global user.email "student@cloud-labs.com"',
            explanation: 'Sets the email address embedded in every future commit. The --global flag applies this to all repositories on the machine, not just react-pipeline.'
          },
          {
            text: 'git config --global user.name "Cloud Student"',
            explanation: 'Sets the display name shown in git log, GitHub, and pull request author fields.'
          }
        ],
        checkCommand: 'git config user.email',
        expectedOutput: 'student@cloud-labs.com'
      },
      {
        id: 'step-3',
        title: 'Workflow Infrastructure Setup',
        instruction: 'Create the .github/workflows directory structure that GitHub Actions requires to discover your pipeline.',
        summary: 'Scaffold the Actions directory.',
        whyNeeded: 'GitHub Actions scans specifically for YAML files inside .github/workflows/ — this path is non-negotiable. Any file outside this directory is ignored by the runner, so the structure must be exact before writing any workflow logic.',
        pillarConnection: 'Operational Excellence — defining standard directory conventions prevents misconfiguration and ensures the platform can auto-discover and execute your pipelines.',
        commands: [
          {
            text: 'mkdir -p react-pipeline/.github/workflows',
            explanation: 'Creates the full nested directory path in one command. The -p flag creates all intermediate directories (react-pipeline, .github, workflows) without error if they already exist.'
          },
          {
            text: 'touch react-pipeline/.github/workflows/main.yml',
            explanation: 'Creates an empty main.yml file as the entry point for your CI/CD pipeline. GitHub Actions will parse this file on every trigger event.'
          }
        ],
        checkCommand: 'ls react-pipeline/.github/workflows/ | grep main.yml',
        expectedOutput: 'main.yml'
      },
      {
        id: 'step-4',
        title: 'Continuous Integration Build Job',
        instruction: 'Write the core CI workflow — check out code, set up Node.js, install dependencies, run tests, and build the React app.',
        summary: 'Define the full CI pipeline.',
        whyNeeded: 'A real CI job must install the correct Node version, install dependencies reproducibly with npm ci (not npm install), run the test suite, and produce a build artifact. Placeholder echo commands do not catch broken code.',
        pillarConnection: 'Operational Excellence — automation of install, test, and build phases is the core DevOps practice that catches regressions before they reach production.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\nEOF',
            explanation: 'Writes a production-quality CI workflow. actions/checkout@v4 fetches the repo. actions/setup-node@v4 installs the exact Node 20 LTS version. npm ci installs from package-lock.json for reproducible installs (faster and stricter than npm install). --if-present skips the test script gracefully if it is not defined yet.'
          }
        ],
        checkCommand: 'grep "actions/setup-node" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'actions/setup-node'
      },
      {
        id: 'step-5',
        title: 'Artifact Management',
        instruction: 'Upload the compiled build output so it can be downloaded by later jobs or used in a deployment step.',
        summary: 'Persist the build artifact.',
        whyNeeded: 'Each GitHub Actions job runs in an isolated VM that is discarded after completion. Without uploading the build output, the next job (like containerize or deploy) cannot access what was built. The artifact is the handoff between jobs.',
        pillarConnection: 'Reliability — using immutable build artifacts ensures that exactly what was tested is what gets deployed, eliminating "works on my machine" discrepancies.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: react-build\n          path: dist/\n          retention-days: 7\nEOF',
            explanation: 'Adds actions/upload-artifact@v4 after the build step. path: dist/ uploads only the compiled output — not node_modules or source files. retention-days: 7 auto-expires the artifact after a week to control storage costs.'
          }
        ],
        checkCommand: 'grep "upload-artifact" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'upload-artifact'
      },
      {
        id: 'step-6',
        title: 'Global Environment Variables',
        instruction: 'Inject environment variables and reference GitHub Secrets to configure the pipeline for different deployment targets without hardcoding values.',
        summary: 'Parameterise the workflow with env vars.',
        whyNeeded: 'Hardcoding values like API keys, registry URLs, or environment names directly in the YAML is a security risk and makes the pipeline inflexible. env: variables are visible in logs; secrets: variables are masked and never exposed.',
        pillarConnection: 'Security — separating configuration from code is a core Twelve-Factor App principle. Secrets stored in GitHub Settings are encrypted at rest and masked in all log output.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\nenv:\n  DEPLOY_ENV: production\n  NODE_ENV: production\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: react-build\n          path: dist/\n          retention-days: 7\nEOF',
            explanation: 'Moves env vars to the top-level env: block so they are available to all jobs. NODE_ENV: production tells bundlers like Vite and Webpack to enable production optimisations. Sensitive values such as API tokens should be stored in GitHub Settings → Secrets and referenced as ${{ secrets.MY_SECRET }} — never as plain env vars.'
          }
        ],
        checkCommand: 'grep "DEPLOY_ENV" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'DEPLOY_ENV'
      },
      {
        id: 'step-7',
        title: 'Workflow Triggers & Caching',
        instruction: 'Add a manual trigger, restrict push events to specific branches, and cache npm dependencies to cut install time by up to 90%.',
        summary: 'Optimise triggers and restore speed with caching.',
        whyNeeded: 'npm ci downloads all packages on every run, which can take 60–90 seconds. actions/cache stores the npm cache directory between runs so subsequent installs restore from cache in under 5 seconds. workflow_dispatch adds a manual "Run workflow" button in the GitHub UI for on-demand deployments.',
        pillarConnection: 'Performance Efficiency — CI feedback loops under 2 minutes keep developers in flow. Caching is the single highest-impact optimisation you can make to a Node.js pipeline.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n  workflow_dispatch:\nenv:\n  DEPLOY_ENV: production\n  NODE_ENV: production\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Cache npm dependencies\n        uses: actions/cache@v4\n        with:\n          path: ~/.npm\n          key: npm-${{ runner.os }}-${{ hashFiles(\'**/package-lock.json\') }}\n          restore-keys: |\n            npm-${{ runner.os }}-\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: react-build\n          path: dist/\n          retention-days: 7\nEOF',
            explanation: 'Adds pull_request trigger so the pipeline also runs on PRs before merging. The cache key is hashed from package-lock.json — if dependencies change, the hash changes and a fresh install runs. restore-keys provides a fallback to the most recent cache if an exact match is unavailable, still saving partial install time.'
          }
        ],
        checkCommand: 'grep "actions/cache" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'actions/cache'
      },
      {
        id: 'step-8',
        title: 'Containerization Strategy',
        instruction: 'Write a production-grade Dockerfile using layer caching, then add a containerize job that builds and tags the Docker image using the commit SHA.',
        summary: 'Build an immutable Docker image per commit.',
        whyNeeded: 'Container images are the standard deployment unit for modern cloud infrastructure. Tagging with the commit SHA creates a 1-to-1 trace between what runs in production and the exact code that was reviewed — critical for rollbacks and incident investigation.',
        pillarConnection: 'Reliability — immutable image tags prevent silent updates and ensure every deployment is reproducible and auditable.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]\nEOF',
            explanation: 'Uses a multi-stage build: the builder stage compiles the React app, and the final nginx:alpine stage serves only the compiled static files — no Node.js runtime, no source code, no dev dependencies. This produces a ~25MB image instead of ~400MB. COPY package*.json ./ before COPY . . is intentional — Docker layer caching re-uses the npm ci layer as long as package files do not change, which dramatically speeds up rebuilds.'
          },
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n  workflow_dispatch:\nenv:\n  DEPLOY_ENV: production\n  NODE_ENV: production\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Cache npm dependencies\n        uses: actions/cache@v4\n        with:\n          path: ~/.npm\n          key: npm-${{ runner.os }}-${{ hashFiles(\'**/package-lock.json\') }}\n          restore-keys: |\n            npm-${{ runner.os }}-\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: react-build\n          path: dist/\n          retention-days: 7\n  containerize:\n    runs-on: ubuntu-latest\n    needs: build\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Build Docker image\n        run: docker build -t cloud-app:${{ github.sha }} .\n      - name: Tag image as latest\n        run: docker tag cloud-app:${{ github.sha }} cloud-app:latest\nEOF',
            explanation: 'Adds the containerize job with needs: build so it only runs after a successful build. if: github.ref == refs/heads/main restricts it to main branch pushes only — PRs run the build and test but do not build production images. The image is tagged with ${{ github.sha }} for full traceability and also with latest for convenience.'
          }
        ],
        checkCommand: 'grep "docker build" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'docker build'
      },
      {
        id: 'step-9',
        title: 'Automated Alerting',
        instruction: 'Add a failure notification step that posts a Slack message via webhook whenever the build job fails.',
        summary: 'Alert the team on pipeline failure.',
        whyNeeded: 'A broken main branch costs the team every minute it goes unnoticed. A Slack notification via curl and a webhook fires in seconds and requires no third-party Actions — just a secret stored in your repo settings.',
        pillarConnection: 'Operational Excellence — proactive alerting reduces Mean Time To Repair (MTTR) by surfacing failures immediately rather than waiting for a developer to check the Actions tab.',
        commands: [
          {
            text: 'cat <<\'EOF\' > react-pipeline/.github/workflows/main.yml\nname: React CI/CD\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n  workflow_dispatch:\nenv:\n  DEPLOY_ENV: production\n  NODE_ENV: production\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Set up Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "20"\n      - name: Cache npm dependencies\n        uses: actions/cache@v4\n        with:\n          path: ~/.npm\n          key: npm-${{ runner.os }}-${{ hashFiles(\'**/package-lock.json\') }}\n          restore-keys: |\n            npm-${{ runner.os }}-\n      - name: Install dependencies\n        run: npm ci\n      - name: Run tests\n        run: npm test --if-present\n      - name: Build application\n        run: npm run build\n      - name: Upload build artifact\n        uses: actions/upload-artifact@v4\n        with:\n          name: react-build\n          path: dist/\n          retention-days: 7\n      - name: Notify Slack on failure\n        if: failure()\n        run: |\n          curl -s -X POST "${{ secrets.SLACK_WEBHOOK_URL }}" \\\n            -H "Content-type: application/json" \\\n            -d \'{"text":"Pipeline failed on `${{ github.ref_name }}` — <${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View run>"}\'\n  containerize:\n    runs-on: ubuntu-latest\n    needs: build\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n      - name: Build Docker image\n        run: docker build -t cloud-app:${{ github.sha }} .\n      - name: Tag image as latest\n        run: docker tag cloud-app:${{ github.sha }} cloud-app:latest\nEOF',
            explanation: 'Adds the Slack notification step inside the build job with if: failure() — this condition means the step runs ONLY when a previous step fails, and is skipped on success. The curl command posts a JSON payload to a Slack Incoming Webhook URL stored as SLACK_WEBHOOK_URL in repo Secrets. The message includes the branch name and a direct link to the failed run. To enable: go to GitHub repo → Settings → Secrets → Actions → New secret, name it SLACK_WEBHOOK_URL, paste your webhook URL.'
          }
        ],
        checkCommand: 'grep "if: failure()" react-pipeline/.github/workflows/main.yml',
        expectedOutput: 'if: failure()'
      }
    ]
  },
  {
    projectId: '1',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Install Apache Web Server',
        instruction: 'Update the system package repository and install the Apache2 web server.',
        summary: 'Install the core web server engine.',
        whyNeeded: 'Apache is a stable, industry-standard web server. Installation is the first step in hosting any web application on Linux.',
        pillarConnection: 'Reliability — using official repositories for installation ensures security patches and stable binaries.',
        commands: [
          {
            text: 'sudo apt update',
            explanation: 'Synchronizes your local package index with the remote mirrors to ensure you get the latest metadata.'
          },
          {
            text: 'sudo apt install apache2 -y',
            explanation: 'Installs the Apache web server package automatically skipping confirmation prompts.'
          }
        ],
        checkCommand: 'systemctl is-active apache2',
        expectedOutput: 'active'
      },
      {
        id: 'step-2',
        title: 'Secure the Service',
        instruction: 'Configure the Uncomplicated Firewall (UFW) to allow web traffic while blocking other vulnerabilities.',
        summary: 'Configure the firewall for HTTP access.',
        whyNeeded: 'By default, production servers should block all incoming traffic. Enabling specific ports for Apache is essential to serve content while keeping the system secure.',
        pillarConnection: 'Security — Principle of Least Privilege. Only opening port 80/443 for web traffic minimizes the attack surface.',
        commands: [
          {
            text: 'sudo ufw allow ssh',
            explanation: 'Allows SSH traffic first to prevent being locked out when the firewall is enabled.'
          },
          {
            text: 'sudo ufw allow "Apache"',
            explanation: 'Opens port 80 (HTTP) using UFW\'s built-in Apache application profile.'
          },
          {
            text: 'sudo ufw enable',
            explanation: 'Activates the firewall with the configured rules.'
          }
        ],
        checkCommand: 'sudo ufw status',
        expectedOutput: 'Apache'
      },
      {
        id: 'step-3',
        title: 'Customize Web Content',
        instruction: 'Replace the default landing page with a custom corporate index file.',
        summary: 'Deploy custom HTML content.',
        whyNeeded: 'The default Apache page is for testing only. Deploying actual index files validates that the server is correctly mapping file system paths to URL requests.',
        pillarConnection: 'Performance Efficiency — optimizing static content delivery through proper file placement.',
        commands: [
          {
            text: 'echo "Welcome to Cloud Labs Production Server" | sudo tee /var/www/html/index.html',
            explanation: 'Overwrite the default index.html with a custom message using a privileged pipe.'
          }
        ],
        checkCommand: 'curl -s localhost',
        expectedOutput: 'Welcome to Cloud Labs'
      },
      {
        id: 'step-4',
        title: 'Service Hardening & Virtual Hosts',
        instruction: 'Disable the server signature, create a dedicated Virtual Host configuration, and enable it.',
        summary: 'Harden Apache and set up a Virtual Host.',
        whyNeeded: 'Virtual Hosts allow you to host multiple websites on a single server. Disabling the server signature prevents Apache from advertising its version in responses, reducing information leakage.',
        pillarConnection: 'Cost Optimization & Security — hosting multiple sites on one instance reduces infrastructure overhead; removing version banners limits attacker reconnaissance.',
        commands: [
          {
            text: 'echo -e "ServerTokens Prod\\nServerSignature Off" | sudo tee -a /etc/apache2/conf-available/security.conf && sudo a2enconf security',
            explanation: 'Disables the version banner in HTTP response headers and error pages — a basic but important hardening step.'
          },
          {
            text: 'sudo bash -c \'cat > /etc/apache2/sites-available/cloudlabs.conf <<EOF\n<VirtualHost *:80>\n    ServerName cloudlabs.local\n    DocumentRoot /var/www/html\n    ErrorLog ${APACHE_LOG_DIR}/cloudlabs-error.log\n    CustomLog ${APACHE_LOG_DIR}/cloudlabs-access.log combined\n</VirtualHost>\nEOF\'',
            explanation: 'Creates a complete Virtual Host config with a ServerName and DocumentRoot instead of just copying the default blank template.'
          },
          {
            text: 'sudo a2ensite cloudlabs.conf && sudo systemctl reload apache2',
            explanation: 'Enables the new site and reloads Apache to apply the configuration without downtime.'
          }
        ],
        checkCommand: 'ls /etc/apache2/sites-enabled/ | grep cloudlabs.conf',
        expectedOutput: 'cloudlabs.conf'
      },
      {
        id: 'step-5',
        title: 'SSL/TLS Configuration',
        instruction: 'Enable the SSL module, generate a self-signed certificate, and wire it into the Virtual Host so Apache actually serves HTTPS.',
        summary: 'Enforce HTTPS on the web server.',
        whyNeeded: 'Unencrypted HTTP traffic is vulnerable to eavesdropping. SSL/TLS encrypts data between the client and server. The certificate must be referenced in a VHost config — generating the file alone is not enough.',
        pillarConnection: 'Security — protection of data in transit is a core security requirement.',
        commands: [
          { text: 'sudo a2enmod ssl', explanation: 'Enables the Apache SSL module (mod_ssl).' },
          { text: 'sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt -subj "/CN=localhost"', explanation: 'Generates a 2048-bit RSA private key and a self-signed X.509 certificate valid for one year.' },
          { text: 'sudo bash -c \'cat > /etc/apache2/sites-available/cloudlabs-ssl.conf <<EOF\n<VirtualHost *:443>\n    ServerName cloudlabs.local\n    DocumentRoot /var/www/html\n    SSLEngine on\n    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt\n    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key\n</VirtualHost>\nEOF\'', explanation: 'Creates an HTTPS VirtualHost that references the generated certificate and key — this is the step that actually enables HTTPS.' },
          { text: 'sudo a2ensite cloudlabs-ssl.conf && sudo systemctl reload apache2', explanation: 'Activates the SSL VHost and reloads Apache to start serving HTTPS on port 443.' }
        ],
        checkCommand: 'curl -sk https://localhost | grep -o "Welcome to Cloud Labs"',
        expectedOutput: 'Welcome to Cloud Labs'
      },
      {
        id: 'step-6',
        title: 'Log Analysis with Tail',
        instruction: 'Examine the Apache access logs in real-time to monitor incoming requests.',
        summary: 'Monitor server logs.',
        whyNeeded: 'Log monitoring is essential for debugging and security auditing. Seeing live traffic helps identify malicious patterns or performance bottlenecks.',
        pillarConnection: 'Operational Excellence — real-time monitoring enables faster incident response.',
        commands: [
          {
            text: 'sudo tail -f /var/log/apache2/access.log',
            explanation: 'Outputs the last 10 lines of the access log and waits for new entries.'
          }
        ],
        checkCommand: 'ls /var/log/apache2/ | grep access.log',
        expectedOutput: 'access.log'
      },
      {
        id: 'step-7',
        title: 'Final Security Audit',
        instruction: 'Run a security scan on the open ports to ensure only authorized services are reachable.',
        summary: 'Audit system exposure.',
        whyNeeded: 'A final audit verifies that the security rules you applied are actually working as intended before the server goes into full production.',
        pillarConnection: 'Security — regular auditing is key to maintaining a zero-trust architecture.',
        commands: [
          {
            text: 'ss -tulpn | grep LISTEN',
            explanation: 'Lists all programs currently listening on network ports.'
          }
        ],
        checkCommand: 'sudo ss -tulpn | grep apache2',
        expectedOutput: 'apache2'
      },
      {
        id: 'step-8',
        title: 'HTTP/2 Performance Optimization',
        instruction: 'Switch Apache to the event MPM (required for HTTP/2), enable mod_http2, and declare the Protocols directive in the SSL VHost.',
        summary: 'Optimize for modern web performance.',
        whyNeeded: 'HTTP/2 allows multiplexing of requests over a single TCP connection. Apache\'s default mpm_prefork does NOT support HTTP/2 — you must switch to mpm_event first, otherwise the protocol silently falls back to HTTP/1.1.',
        pillarConnection: 'Performance Efficiency — utilizing modern network protocols ensures the lowest possible latency for global users.',
        commands: [
          {
            text: 'sudo a2dismod mpm_prefork && sudo a2enmod mpm_event',
            explanation: 'Switches from the single-threaded prefork MPM to the event-driven event MPM, which is required for HTTP/2 support.'
          },
          {
            text: 'sudo a2enmod http2',
            explanation: 'Enables mod_http2 now that a compatible MPM is active.'
          },
          {
            text: 'sudo sed -i "/SSLCertificateKeyFile/a \\    Protocols h2 http\\/1.1" /etc/apache2/sites-available/cloudlabs-ssl.conf',
            explanation: 'Adds the Protocols directive to the cloudlabs SSL VHost (the one created in step 5) to advertise HTTP/2 preference.'
          },
          {
            text: 'sudo systemctl restart apache2',
            explanation: 'Restarts Apache to apply the new MPM and HTTP/2 module changes.'
          }
        ],
        checkCommand: 'curl -sI -k --http2 https://localhost',
        expectedOutput: 'HTTP/2 200'
      }
    ]
  },
  {
    projectId: '4',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Script Initialization',
        instruction: 'Create a new shell script file and add the required shebang line.',
        summary: 'Initialize the backup automation script.',
        whyNeeded: 'Automated backups are critical for disaster recovery. Starting with a proper shell script structure ensures the system knows which interpreter to use (Bash).',
        pillarConnection: 'Reliability — automated, consistent backups are a fundamental requirement for the backup and restore strategy.',
        commands: [
          {
            text: 'echo "#!/bin/bash" > backup.sh',
            explanation: 'Creates the script file and adds the shebang line to specify the Bash interpreter.'
          }
        ],
        checkCommand: 'head -n 1 backup.sh',
        expectedOutput: '#!/bin/bash'
      },
      {
        id: 'step-2',
        title: 'Permission Management',
        instruction: 'Grant execute permissions to the script so it can be run as a standalone program.',
        summary: 'Make the script executable.',
        whyNeeded: 'Linux systems require explicit execution bits for security. Without this, the script remains a plain text file that cannot be executed by the system scheduler.',
        pillarConnection: 'Security — managing specific file permissions follows the principle of providing only the necessary rights for operation.',
        commands: [
          {
            text: 'chmod +x backup.sh',
            explanation: 'Modified the file mode to add the executable bit for the current user.'
          }
        ],
        checkCommand: 'ls -l backup.sh',
        expectedOutput: '-rwxr'
      },
      {
        id: 'step-3',
        title: 'Implement Backup Logic',
        instruction: 'Add commands to archive the /etc configuration directory into a compressed tarball.',
        summary: 'Add archiving logic to the script.',
        whyNeeded: 'Compression reduces storage costs and transfer times. Archiving ensures all related configuration files are kept together in a single point-in-time snapshot.',
        pillarConnection: 'Cost Optimization — using compression (gzip) reduces the storage footprint of automated backups.',
        commands: [
          {
            text: 'echo \'tar -czf backup_$(date +%F).tar.gz /etc\' >> backup.sh',
            explanation: 'Appends a tar command that creates a compressed archive with a dynamic date-based filename.'
          }
        ],
        checkCommand: 'grep "tar" backup.sh',
        expectedOutput: 'tar -czf'
      },
      {
        id: 'step-4',
        title: 'Automated Scheduling with Cron',
        instruction: 'Schedule the backup script to run every day at midnight using the system crontab.',
        summary: 'Schedule the script via Crontab.',
        whyNeeded: 'Manual backups are prone to human error and forgetfulness. Automating them via Cron ensures that the task happens reliably without human intervention.',
        pillarConnection: 'Reliability — consistent, scheduled processes are the hallmark of robust operational infrastructure.',
        commands: [
          {
            text: '(crontab -l 2>/dev/null; echo "0 0 * * * $(pwd)/backup.sh") | crontab -',
            explanation: 'Appends a new line to the users crontab to execute the script at 00:00 every day.'
          }
        ],
        checkCommand: 'crontab -l',
        expectedOutput: 'backup.sh'
      },
      {
        id: 'step-5',
        title: 'Log Rotation Setup',
        instruction: 'Configure logrotate for your custom application logs to prevent disk space exhaustion.',
        summary: 'Set up log management.',
        whyNeeded: 'Application logs can grow indefinitely. Log rotation ensures that old logs are compressed and eventually deleted, keeping disk usage stable.',
        pillarConnection: 'Cost Optimization — preventing resource exhaustion reduces emergency maintenance overhead.',
        commands: [
          { text: 'sudo bash -c \'cat > /etc/logrotate.d/myapp <<EOF\n/var/log/myapp/*.log {\n    daily\n    rotate 7\n    compress\n    delaycompress\n    missingok\n    notifempty\n}\nEOF\'', explanation: 'Writes a properly formatted multi-line logrotate config. daily rotates once per day; rotate 7 keeps one week of history; compress gzips old logs; delaycompress skips compressing the most recent rotated file so the app can still write to it; missingok silently skips if the log path does not exist yet; notifempty skips rotation when the log file is empty.' }
        ],
        checkCommand: 'ls /etc/logrotate.d/ | grep myapp',
        expectedOutput: 'myapp'
      },
      {
        id: 'step-6',
        title: 'Modular Script Refactoring',
        instruction: 'Refactor your backup script to use functions, making it more readable and maintainable.',
        summary: 'Implement shell script functions.',
        whyNeeded: 'As scripts grow in complexity, linear execution becomes hard to debug. Functions allow you to isolate logic and reuse components across the script.',
        pillarConnection: 'Operational Excellence — clean, modular code is easier to maintain and troubleshoot during service incidents.',
        commands: [
          {
            text: 'cat <<\'EOF\' > backup.sh\n#!/bin/bash\nlog_message() { echo "[$(date)] $1"; }\ncreate_backup() {\n  log_message "Starting backup..."\n  tar -czf backup_$(date +%F).tar.gz /etc\n  log_message "Backup completed."\n}\ncreate_backup\nEOF',
            explanation: 'Rewrites the script using a modular approach with logging and backup functions.'
          }
        ],
        checkCommand: 'grep "log_message" backup.sh',
        expectedOutput: 'log_message'
      },
      {
        id: 'step-7',
        title: 'Remote Disaster Recovery Sync',
        instruction: 'Incorporate rsync logic to mirror your backups to a secondary storage location.',
        summary: 'Implement off-site backup synchronization.',
        whyNeeded: 'Local backups alone are a "single point of failure". If the server hardware fails, you lose both the data and the backup. Remote syncing ensures data survival.',
        pillarConnection: 'Reliability — off-site data replication is a critical component of a robust Disaster Recovery (DR) plan.',
        commands: [
          {
            text: 'echo \'if rsync -avz /var/backups/app/*.tar.gz backup-server:/vault/; then echo "Remote sync OK"; else echo "Remote sync FAILED" >&2; fi\' >> backup.sh',
            explanation: 'Appends a conditional rsync that mirrors compressed archives to a remote vault. Wrapping in if/else means a failed sync is reported to stderr without masking the backup exit code — the script can still complete its local backup even when the remote is unreachable.'
          }
        ],
        checkCommand: 'grep "rsync" backup.sh',
        expectedOutput: 'rsync'
      },
      {
        id: 'step-8',
        title: 'Success Notification Webhooks',
        instruction: 'Add a CURL notification that alerts your monitoring system when a backup cycle completes successfully.',
        summary: 'Add success heartbeat notifications.',
        whyNeeded: 'Silent failures are dangerous. A positive confirmation (heartbeat) ensures that your backup system is healthy and active.',
        pillarConnection: 'Operational Excellence — measuring the health of automated processes via external monitoring integrations.',
        commands: [
          {
            text: 'echo \'curl -s -X POST -d "status=success&host=$(hostname)" https://monitor.internal/webhook\' >> backup.sh',
            explanation: 'Appends a curl heartbeat POST to an internal monitoring endpoint using HTTPS. The $(hostname) variable identifies which server sent the backup so alerts are actionable. In production, replace the URL with a real Dead Man\'s Snitch, Healthchecks.io, or Slack webhook URL stored in an environment variable.'
          }
        ],
        checkCommand: 'grep "curl" backup.sh',
        expectedOutput: 'curl'
      },
      {
        id: 'step-9',
        title: 'Restoration Verification',
        instruction: 'Develop a secondary script that automatically verifies the integrity of the latest backup file.',
        summary: 'Automate backup integrity checks.',
        whyNeeded: 'A backup is only as good as its last successful restore. Regularly testing the integrity of archives prevents the surprise of "corrupt backups" during a real crisis.',
        pillarConnection: 'Reliability — automated testing of recovery procedures ensures that the recovery time objective (RTO) can be met.',
        commands: [
          {
            text: 'cat <<\'EOF\' > verify.sh\n#!/bin/bash\nLATEST=$(ls -t *.tar.gz 2>/dev/null | head -1)\nif [ -z "$LATEST" ]; then\n  echo "ERROR: No backup archive found." && exit 1\nfi\nif tar -tzf "$LATEST" > /dev/null 2>&1; then\n  echo "Integrity OK: $LATEST is valid."\nelse\n  echo "ERROR: $LATEST is corrupt!" && exit 1\nfi\nEOF',
            explanation: 'Creates a proper verification script with a shebang, error handling for missing archives, and a meaningful exit code. tar -tzf lists the archive table of contents without extracting — if the archive is corrupt or truncated, tar exits non-zero and the ERROR branch fires. The exit 1 propagates failure to any calling cron job or CI system.'
          },
          {
            text: 'chmod +x verify.sh',
            explanation: 'Makes the verification utility executable.'
          }
        ],
        checkCommand: 'ls verify.sh',
        expectedOutput: 'verify.sh'
      }
    ]
  },
  {
    projectId: '84',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Install Configuration Engine',
        instruction: 'Install Ansible on the control node to begin managing infrastructure state.',
        summary: 'Install the Ansible automation platform.',
        whyNeeded: 'Ansible allows for idempotent infrastructure management. Installation on the control node is required to orchestrate tasks across multiple remote servers.',
        pillarConnection: 'Operational Excellence — using configuration management tools like Ansible ensures environment consistency and reduces configuration drift.',
        commands: [
          {
            text: 'sudo apt update && sudo apt install ansible -y',
            explanation: 'Updates repositories and installs the latest stable version of Ansible.'
          }
        ],
        checkCommand: 'ansible --version',
        expectedOutput: 'ansible'
      },
      {
        id: 'step-2',
        title: 'Inventory Configuration',
        instruction: 'Define the target hosts in a local inventory file.',
        summary: 'Create an Ansible inventory file.',
        whyNeeded: 'Ansible needs to know which servers to manage. An inventory file organizes your infrastructure into logical groups (e.g., webservers, databases).',
        pillarConnection: 'Operational Excellence — standardized inventory management facilitates clear organizational structure of cloud resources.',
        commands: [
          {
            text: 'echo "[webservers]\nlocalhost ansible_connection=local" > inventory.ini',
            explanation: 'Creates a simple inventory file targeting the local machine for demonstration purposes.'
          }
        ],
        checkCommand: 'ls inventory.ini',
        expectedOutput: 'inventory.ini'
      },
      {
        id: 'step-3',
        title: 'Orchestrate Configuration',
        instruction: 'Execute a playbook to ensure the target webservers are configured correctly.',
        summary: 'Run a configuration playbook.',
        whyNeeded: 'Playbooks are the heart of Ansible. They allow you to describe the desired state of your system in a human-readable YAML format.',
        pillarConnection: 'Reliability — idempotent playbooks ensure that re-running configuration tasks always results in the same, predictable state.',
        commands: [
          {
            text: 'ansible-playbook -i inventory.ini main.yml',
            explanation: 'Executes the main configuration logic against all hosts defined in the inventory.'
          }
        ],
        checkCommand: 'ansible-playbook --version',
        expectedOutput: 'ansible-playbook'
      },
      {
        id: 'step-4',
        title: 'Variables & Templates',
        instruction: 'Modularize your configuration using variables and Jinja2 templates for dynamic content.',
        summary: 'Implement Ansible Variables.',
        whyNeeded: 'Hardcoding values makes automation brittle. Templates allow you to inject environment-specific data (like server IPs or port numbers) into config files at runtime.',
        pillarConnection: 'Operational Excellence — template-driven configuration management reduces duplication and simplifies environment scaling.',
        commands: [
          {
            text: 'echo "server_name: CloudLabs-Demo" > vars.yml',
            explanation: 'Creates a variable file to store configuration parameters.'
          }
        ],
        checkCommand: 'ls vars.yml',
        expectedOutput: 'vars.yml'
      },
      {
        id: 'step-5',
        title: 'Ansible Loops & Conditionals',
        instruction: 'Implement loops to manage multiple resources efficiently and conditionals to handle environment-specific logic.',
        summary: 'Add complex logic to playbooks.',
        whyNeeded: 'Real-world infrastructure isn\'t static. Loops allow you to install multiple packages in one task, and conditionals ensure scripts only run on the correct operating systems.',
        pillarConnection: 'Performance Efficiency — vectorized tasks in Ansible reduce the overhead of multiple SSH connections for similar operations.',
        commands: [
          {
            text: 'cat <<EOF >> main.yml\n- name: Install multiple packages\n  apt:\n    name: "{{ item }}"\n    state: present\n  loop:\n    - git\n    - vim\n    - curl\nEOF',
            explanation: 'Appends a looped task to the playbook for bulk package management.'
          }
        ],
        checkCommand: 'grep "loop:" main.yml',
        expectedOutput: 'loop:'
      },
      {
        id: 'step-6',
        title: 'Ansible Galaxy Roles',
        instruction: 'Initialize a new Ansible Role to organize your automation into reusable and shareable components.',
        summary: 'Modularize configuration with Roles.',
        whyNeeded: 'Single-file playbooks become unmanageable at scale. Roles provide a standardized directory structure for separating tasks, handlers, variables, and templates.',
        pillarConnection: 'Operational Excellence — using the Galaxy standard for Roles ensures that your automation is portable and follows community best practices.',
        commands: [
          {
            text: 'ansible-galaxy role init common_config',
            explanation: 'Generates the full scaffold directory for a production-grade Ansible role.'
          }
        ],
        checkCommand: 'ls common_config/tasks/main.yml',
        expectedOutput: 'main.yml'
      }
    ]
  },
  {
    projectId: '83',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Service Provisioning',
        instruction: 'Install the Jenkins automation server and its core dependencies.',
        summary: 'Install Jenkins on the application server.',
        whyNeeded: 'Jenkins is the central hub for CI/CD. It coordinates builds, tests, and deployments, making it the heartbeat of software delivery.',
        pillarConnection: 'Operational Excellence — centralized automation is key to maintaining a high deployment frequency.',
        commands: [
          {
            text: 'sudo apt update && sudo apt install openjdk-17-jdk jenkins -y',
            explanation: 'Installs the Java runtime (required by Jenkins) and the Jenkins server itself.'
          }
        ],
        checkCommand: 'systemctl is-active jenkins',
        expectedOutput: 'active'
      },
      {
        id: 'step-2',
        title: 'Pipeline as Code',
        instruction: 'Create a Jenkinsfile to define the delivery pipeline stages.',
        summary: 'Define a declarative CI/CD pipeline.',
        whyNeeded: 'Storing pipeline definitions as code alongside the application allows for versioned, reproducible build processes.',
        pillarConnection: 'Operational Excellence — "Pipeline as Code" ensures that the build process is as visible and auditable as the application code.',
        commands: [
          {
            text: 'cat <<EOF > Jenkinsfile\npipeline {\n    agent any\n    stages {\n        stage("Build") {\n            steps { echo "Compiling Source..." }\n        }\n        stage("Test") {\n            steps { echo "Running Unit Tests..." }\n        }\n        stage("Deploy") {\n            steps { echo "Shipping to Staging..." }\n        }\n    }\n}\nEOF',
            explanation: 'Creates a standard 3-stage pipeline (Build, Test, Deploy) using Jenkins Declarative syntax.'
          }
        ],
        checkCommand: 'ls Jenkinsfile',
        expectedOutput: 'Jenkinsfile'
      },
      {
        id: 'step-3',
        title: 'Credential Management',
        instruction: 'Learn how to secure sensitive information like API keys using the Jenkins Credentials Store.',
        summary: 'Integrate Jenkins Credentials.',
        whyNeeded: 'Security is paramount in CI/CD. Never hardcode passwords in Jenkinsfiles. Using the built-in credentials store ensures secrets are encrypted and only accessible to authorized jobs.',
        pillarConnection: 'Security — proper secret management prevents credential leakage in CI/CD logs and source code.',
        commands: [
          {
            text: 'sudo touch /var/lib/jenkins/secrets/custom_secret',
            explanation: 'Creates a placeholder for a secure credential file within the protected Jenkins filesystem.'
          },
          {
            text: 'echo "MY_TOP_SECRET_KEY" | sudo tee /var/lib/jenkins/secrets/custom_secret > /dev/null',
            explanation: 'Securely writes sensitive data to a file that only the Jenkins service account can access.'
          }
        ],
        checkCommand: 'sudo ls /var/lib/jenkins/secrets/custom_secret',
        expectedOutput: 'custom_secret'
      },
      {
        id: 'step-4',
        title: 'Jenkins Agent Scaling',
        instruction: 'Configure a new SSH-based build agent to distribute workloads away from the controller.',
        summary: 'Add a remote build agent.',
        whyNeeded: 'Running builds on the Jenkins controller (master) is risky; it can slow down the UI and poses a security risk. Agents allow for horizontal scaling of build capacity.',
        pillarConnection: 'Reliability — distributing builds across multiple nodes ensures the controller remains responsive and stable.',
        commands: [
          {
            text: 'sudo mkdir -p /home/jenkins/agent && sudo chown -R jenkins:jenkins /home/jenkins/agent',
            explanation: 'Sets up the home directory and permissions for a remote execution agent.'
          }
        ],
        checkCommand: 'ls -d /home/jenkins/agent',
        expectedOutput: 'agent'
      },
      {
        id: 'step-5',
        title: 'Artifact Archiving',
        instruction: 'Update your Jenkinsfile to archive post-build artifacts for long-term storage.',
        summary: 'Preserve build outputs.',
        whyNeeded: 'You need a record of what was actually built. Archiving allows you to download and inspect historical binaries even if the build environment is wiped.',
        pillarConnection: 'Reliability — formal artifact management ensures traceability between code commits and deployed binaries.',
        commands: [
          {
            text: 'sed -i \'/Unit Tests/a \        stage("Archive") { steps { archiveArtifacts artifacts: "**/*.jar", fingerprint: true } }\' Jenkinsfile',
            explanation: 'Injects an archiving stage into the declarative pipeline.'
          }
        ],
        checkCommand: 'grep "archiveArtifacts" Jenkinsfile',
        expectedOutput: 'archiveArtifacts'
      },
      {
        id: 'step-6',
        title: 'Parallel Pipeline Execution',
        instruction: 'Optimize your pipeline by running independent stages like "Lint" and "Unit Tests" in parallel.',
        summary: 'Parallelize CI tasks.',
        whyNeeded: 'Linear pipelines are slow. If tasks don\'t depend on each other, running them at the same time reduces the overall cycle time for developers.',
        pillarConnection: 'Performance Efficiency — parallel execution significantly reduces the mean-time-to-feedback (MTTF) for engineering teams.',
        commands: [
          {
            text: 'sed -i \'s/stage("Test") {/stage("Analysis") { \n            parallel { \n                stage("Lint") { steps { echo "Linting..." } } \n                stage("Test") { /\' Jenkinsfile',
            explanation: 'Refactors the pipeline into a parallel execution block using Jenkins DSL.'
          }
        ],
        checkCommand: 'grep "parallel" Jenkinsfile',
        expectedOutput: 'parallel'
      }
    ]
  },
  {
    projectId: '2',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Artifact Manager Installation',
        instruction: 'Verify your kubectl context is pointing at the correct cluster, then install Helm using the architecture-aware official script.',
        summary: 'Verify cluster context and install Helm.',
        whyNeeded: 'Helm is the industry-standard package manager for Kubernetes. Before installing anything, confirming the kubectl context prevents accidentally deploying into the wrong cluster — a common and costly mistake.',
        pillarConnection: 'Operational Excellence — using standardized package managers ensures repeatable and predictable deployments across all environments.',
        commands: [
          {
            text: 'kubectl config current-context && kubectl cluster-info',
            explanation: 'Confirms which cluster kubectl is currently targeting. If this shows the wrong cluster, run "kubectl config use-context <name>" before continuing — every subsequent command will run against whatever cluster is shown here.'
          },
          {
            text: 'curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && chmod 700 get_helm.sh && ./get_helm.sh',
            explanation: 'Downloads and runs the official Helm installer. The script auto-detects your OS and CPU architecture (amd64 or arm64), so it installs the correct binary on both Intel and Apple Silicon / ARM Linux machines.'
          }
        ],
        checkCommand: 'helm version',
        expectedOutput: 'version.BuildInfo'
      },
      {
        id: 'step-2',
        title: 'Observability Stack Preparation',
        instruction: 'Add the Prometheus community repository and update your local chart index.',
        summary: 'Prepare the monitoring chart repository.',
        whyNeeded: 'Keeping repository indices up-to-date ensures that you are deploying the latest security patches and feature updates for your monitoring components.',
        pillarConnection: 'Reliability — using the latest stable versions of monitoring tools ensures you have access to the most robust data collection mechanisms.',
        commands: [
          {
            text: 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
            explanation: 'Registers the official community-maintained repository for Prometheus and Grafana charts.'
          },
          {
            text: 'helm repo update',
            explanation: 'Synchronizes your local cache with the remote repository to fetch the latest metadata.'
          }
        ],
        checkCommand: 'helm repo list',
        expectedOutput: 'prometheus-community'
      },
      {
        id: 'step-3',
        title: 'Full-Stack Monitoring Deployment',
        instruction: 'Deploy the kube-prometheus-stack into a dedicated namespace. On local clusters (Docker Desktop, minikube, kind) one extra flag is required.',
        summary: 'Provision the Prometheus and Grafana stack.',
        whyNeeded: 'A full-stack monitoring solution provides end-to-end visibility, from low-level node metrics to high-level application dashboards and alerting rules.',
        pillarConnection: 'Operational Excellence — comprehensive monitoring is the foundation of the "Measure" phase in the DevOps lifecycle.',
        commands: [
          {
            text: 'kubectl create namespace monitoring',
            explanation: 'Creates a logical boundary to isolate monitoring resources from application workloads.'
          },
          {
            text: 'helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --set prometheus-node-exporter.hostRootFsMount.enabled=false --wait',
            explanation: 'Deploys Prometheus, Grafana, and Alertmanager. The hostRootFsMount flag is required on local clusters (Docker Desktop, minikube, kind) where the node-exporter cannot mount the host root filesystem — without it the DaemonSet stays in CrashLoopBackOff. Works on amd64 and arm64. --wait blocks until all pods are Ready so the check command below is meaningful.'
          }
        ],
        checkCommand: 'helm status monitoring -n monitoring',
        expectedOutput: 'deployed'
      },
      {
        id: 'step-4',
        title: 'Customizing Dashboards',
        instruction: 'Expose the Grafana service and log in to explore the pre-built Kubernetes dashboards.',
        summary: 'Expose and access the Grafana dashboard.',
        whyNeeded: 'Raw metrics are hard to interpret. Dashboards provide visual maps of cluster health, helping you spot trends and anomalies quickly.',
        pillarConnection: 'Operational Excellence — visual observability allows for faster incident response and better capacity planning.',
        commands: [
          {
            text: 'kubectl get svc -n monitoring | grep grafana',
            explanation: 'Locates the Grafana service name deployed by the Helm chart.'
          },
          {
            text: 'kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80 &',
            explanation: 'Runs a port-forward in the background to map localhost:3000 to the Grafana service. Access the UI at http://localhost:3000.'
          },
          {
            text: 'kubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 --decode && echo',
            explanation: 'Retrieves the auto-generated Grafana admin password from the Kubernetes secret. The default username is "admin".'
          }
        ],
        checkCommand: 'kubectl get svc -n monitoring',
        expectedOutput: 'monitoring-grafana'
      },
      {
        id: 'step-5',
        title: 'Application Service Monitoring',
        instruction: 'Define a ServiceMonitor resource to tell Prometheus to start scraping metrics from your custom application.',
        summary: 'Implement custom metric scraping.',
        whyNeeded: 'Prometheus doesn\'t automatically know about your app. ServiceMonitors are the Kubernetes-native way to configure target discovery in a dynamic environment.',
        pillarConnection: 'Reliability — automated discovery of new application instances ensures monitoring coverage scales with your application.',
        commands: [
          {
            text: 'cat <<EOF > service-monitor.yaml\napiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: app-monitor\n  namespace: monitoring\n  labels:\n    release: monitoring\nspec:\n  selector:\n    matchLabels:\n      app: web-server\n  endpoints:\n  - port: web\nEOF\nkubectl apply -f service-monitor.yaml',
            explanation: 'Creates a Prometheus Operator resource that identifies any service labeled "web-server" as a metrics source.'
          }
        ],
        checkCommand: 'kubectl get servicemonitor -n monitoring',
        expectedOutput: 'app-monitor'
      },
      {
        id: 'step-6',
        title: 'AlertManager & Slack Integration',
        instruction: 'Configure AlertManager to send high-priority notifications to a Slack channel when high memory usage is detected.',
        summary: 'Implement automated paging/alerting.',
        whyNeeded: 'Passive monitoring is useless if nobody sees the errors. Alerting closes the loop between "knowing there is a problem" and "fixing the problem".',
        pillarConnection: 'Operational Excellence — proactive alerting reduces the Mean Time to Repair (MTTR) by notifying the on-call team instantly.',
        commands: [
          {
            text: 'cat <<EOF > alertmanager-config.yaml\nalertmanager:\n  config:\n    global:\n      slack_api_url: "https://hooks.slack.com/services/T0000/B0000/XXXX"\n    route:\n      receiver: "slack-notifications"\n      group_by: [alertname, namespace]\n      group_wait: 30s\n      group_interval: 5m\n      repeat_interval: 12h\n    receivers:\n    - name: "slack-notifications"\n      slack_configs:\n      - channel: "#alerts"\n        send_resolved: true\nEOF\nhelm upgrade monitoring prometheus-community/kube-prometheus-stack --namespace monitoring -f alertmanager-config.yaml --set prometheus-node-exporter.hostRootFsMount.enabled=false',
            explanation: 'Updates the Helm release with AlertManager Slack configuration. Note: the webhook URL must use https. The route section is required to map alerts to the receiver — without it, the receiver is defined but never triggered. The hostRootFsMount flag is carried forward from the initial install to prevent node-exporter from crashing on local clusters after the upgrade.'
          }
        ],
        checkCommand: 'helm get values monitoring -n monitoring',
        expectedOutput: 'slack_api_url'
      },
      {
        id: 'step-7',
        title: 'Long-term Retention with Thanos',
        instruction: 'Enable the Thanos sidecar in the Prometheus pod. In a local environment this validates the sidecar configuration — actual S3/Blob upload requires real bucket credentials added separately.',
        summary: 'Enable long-term metrics storage.',
        whyNeeded: 'Standard Prometheus keeps metrics for 15 days. Thanos allows you to store years of data in cheap object storage, enabling long-term trend analysis and compliance audits.',
        pillarConnection: 'Cost Optimization — moving historical data to object storage is significantly cheaper than keeping it in high-performance block storage.',
        commands: [
          {
            text: 'cat <<EOF > thanos-values.yaml\nprometheus:\n  prometheusSpec:\n    thanos:\n      image: quay.io/thanos/thanos:v0.34.0\n      version: v0.34.0\n    retention: 6h\n    retentionSize: ""\nEOF',
            explanation: 'Creates a Helm values file enabling the Thanos sidecar. Retention is shortened to 6h since Thanos handles long-term storage. Note: on a local cluster the sidecar will run but cannot upload blocks until you add a Kubernetes Secret with your S3/Azure Blob/GCS credentials and reference it via objectStorageConfig.'
          },
          {
            text: 'helm upgrade monitoring prometheus-community/kube-prometheus-stack --namespace monitoring -f thanos-values.yaml --set prometheus-node-exporter.hostRootFsMount.enabled=false',
            explanation: 'Applies the Thanos sidecar configuration, keeping the local-cluster hostRootFsMount fix from step 3 so node-exporter does not crash after the upgrade.'
          }
        ],
        checkCommand: 'kubectl get pod -n monitoring -l app.kubernetes.io/name=prometheus -o jsonpath="{.items[0].spec.containers[*].name}"',
        expectedOutput: 'thanos-sidecar'
      },
      {
        id: 'step-8',
        title: 'Logging Aggregation with Loki',
        instruction: 'Deploy Grafana Loki and Promtail into the monitoring namespace, then add Loki as a data source in Grafana.',
        summary: 'Implement centralized logging.',
        whyNeeded: 'Metrics tell you *when* something is wrong; logs tell you *why*. Seeing them together in Grafana drastically speeds up root cause analysis.',
        pillarConnection: 'Operational Excellence — correlated metrics and logs provide a holistic view of system health and performance.',
        commands: [
          {
            text: 'helm repo add grafana https://grafana.github.io/helm-charts && helm repo update',
            explanation: 'Adds the Grafana chart repository and refreshes the local index. Run this even if you added it before — a stale index can pull outdated chart versions.'
          },
          {
            text: 'helm install loki grafana/loki-stack --namespace monitoring --set grafana.enabled=false --set prometheus.enabled=false',
            explanation: 'Installs Loki (log storage) and Promtail (log collection agent). Grafana and Prometheus are disabled here because they are already running from the kube-prometheus-stack installed in step 3 — enabling them again would create duplicate services and port conflicts.'
          },
          {
            text: 'kubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 --decode && echo',
            explanation: 'Retrieves your Grafana admin password. Open http://localhost:3000, go to Connections → Data Sources → Add, choose Loki, and set the URL to http://loki:3100 to correlate logs with your Prometheus dashboards.'
          }
        ],
        checkCommand: 'kubectl get pods -n monitoring | grep loki',
        expectedOutput: 'loki-0'
      }
    ]
  },
  {
    projectId: '19',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'System Pre-requisites',
        instruction: 'Disable swap, load kernel modules (overlay, br_netfilter), and enable IPv4 forwarding.',
        summary: 'Prepare the OS for Kubernetes.',
        whyNeeded: 'Kubernetes requires swap to be disabled for predictable resource management. Kernel modules and IP forwarding are essential for bridge networking and container communication.',
        pillarConnection: 'Reliability — a correctly tuned base OS prevents networking failures and memory mismanagement in the cluster.',
        commands: [
          {
            text: 'sudo swapoff -a && sudo sed -i "/ swap / s/^\\(.*\\)$/#\\1/g" /etc/fstab',
            explanation: 'Disables swap immediately and permanently.'
          },
          {
            text: 'cat <<\'EOF\' | sudo tee /etc/modules-load.d/k8s.conf\noverlay\nbr_netfilter\nEOF\nsudo modprobe overlay && sudo modprobe br_netfilter',
            explanation: 'Loads modules required for the bridge network to work correctly with iptables.'
          },
          {
            text: 'cat <<\'EOF\' | sudo tee /etc/sysctl.d/k8s.conf\nnet.bridge.bridge-nf-call-iptables  = 1\nnet.bridge.bridge-nf-call-ip6tables = 1\nnet.ipv4.ip_forward                 = 1\nEOF\nsudo sysctl --system',
            explanation: 'Applies system parameters to enable bridging and packet forwarding.'
          }
        ],
        checkCommand: 'sysctl net.ipv4.ip_forward',
        expectedOutput: '1'
      },
      {
        id: 'step-2',
        title: 'Container Runtime (containerd)',
        instruction: 'Install containerd and configure it to use the systemd cgroup driver.',
        summary: 'Provision the container runtime engine.',
        whyNeeded: 'Kubelet needs a runtime to manage containers. The systemd cgroup driver ensures that both the OS and Kubernetes use the same mechanism to manage resource slices.',
        pillarConnection: 'Performance Efficiency — systemd cgroup integration provides better resource isolation and overall system stability.',
        commands: [
          {
            text: 'sudo apt-get update && sudo apt-get install -y containerd',
            explanation: 'Installs the containerd package.'
          },
          {
            text: 'sudo mkdir -p /etc/containerd && containerd config default | sudo tee /etc/containerd/config.toml > /dev/null\nsudo sed -i "s/SystemdCgroup = false/SystemdCgroup = true/g" /etc/containerd/config.toml\nsudo systemctl restart containerd',
            explanation: 'Generates default config and enables systemd cgroup driver, which is mandatory for production clusters.'
          }
        ],
        checkCommand: 'systemctl is-active containerd',
        expectedOutput: 'active'
      },
      {
        id: 'step-3',
        title: 'Kubernetes Binaries',
        instruction: 'Add the Kubernetes APT repository and install kubeadm, kubelet, and kubectl.',
        summary: 'Install cluster management tools.',
        whyNeeded: 'These are the three standard tools for any Kubernetes administrator. Kubelet runs on every node, Kubeadm bootstraps, and Kubectl controls.',
        pillarConnection: 'Operational Excellence — using the official repository ensures you receive signed, verified binaries and timely security updates.',
        commands: [
          {
            text: 'sudo mkdir -p /etc/apt/keyrings && curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg',
            explanation: 'Downloads and installs the public signing key for the Kubernetes package repository.'
          },
          {
            text: 'echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list',
            explanation: 'Adds the official Kubernetes community-hosted deb repository.'
          },
          {
            text: 'sudo apt-get update && sudo apt-get install -y kubelet kubeadm kubectl && sudo apt-mark hold kubelet kubeadm kubectl',
            explanation: 'Installs the tools and locks their versions to prevent accidental rolling updates.'
          }
        ],
        checkCommand: 'kubeadm version',
        expectedOutput: 'v1.30'
      },
      {
        id: 'step-4',
        title: 'Pre-pull Images',
        instruction: 'Use kubeadm to download the required container images (Etcd, CoreDNS, API Server) before initialization.',
        summary: 'Download control plane images.',
        whyNeeded: 'Pulling images ahead of time reduces the risk of "kubeadm init" failing due to network timeouts or registry issues during the sensitive bootstrap phase.',
        pillarConnection: 'Reliability — pre-verifying image availability reduces the blast radius of network-related install failures.',
        commands: [
          {
            text: 'sudo kubeadm config images pull',
            explanation: 'Fetches all required system images from the registry.'
          }
        ],
        checkCommand: 'sudo crictl images | grep kube-apiserver',
        expectedOutput: 'kube-apiserver'
      },
      {
        id: 'step-5',
        title: 'Control Plane Initialization',
        instruction: 'Initialize the master node with a specified Pod Network CIDR for network plugins.',
        summary: 'Bootstrap the master node.',
        whyNeeded: 'This creates the certificate authority, generates keys, and starts the core services. The CIDR parameter is vital for CNI plugins to assign IP addresses to pods.',
        pillarConnection: 'Security — Kubeadm automatically generates unique, encrypted certificates for all control plane components.',
        commands: [
          {
            text: 'sudo kubeadm init --pod-network-cidr=192.168.0.0/16',
            explanation: 'Starts the initialization process. Note down the join command provided at the end of the output.'
          }
        ],
        checkCommand: 'ls /etc/kubernetes/ | grep admin',
        expectedOutput: 'admin.conf'
      },
      {
        id: 'step-6',
        title: 'Kubeconfig Setup',
        instruction: 'Configure the local user to access the cluster using the administrative credentials.',
        summary: 'Configure cluster access.',
        whyNeeded: 'To run kubectl commands as a non-root user, you must copy the cluster configuration to your home directory.',
        pillarConnection: 'Operational Excellence — providing scoped administrative access without requiring root password usage is a standard security practice.',
        commands: [
          {
            text: 'mkdir -p $HOME/.kube && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config',
            explanation: 'Copies the secure config file to your local directory and sets the correct ownership.'
          }
        ],
        checkCommand: 'kubectl get nodes',
        expectedOutput: 'NotReady'
      },
      {
        id: 'step-7',
        title: 'Pod Network (CNI - Calico)',
        instruction: 'Deploy the Calico CNI to enable networking between your pods.',
        summary: 'Establish the virtual network fabric.',
        whyNeeded: 'Without a CNI, pods cannot communicate with each other, and the control plane cannot manage them across nodes. Calico is a high-performance, industry-standard choice.',
        pillarConnection: 'Reliability — a robust CNI ensures high-availability networking for distributed microservices.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml',
            explanation: 'Installs the Calico networking agents on all nodes. v3.28 is the current stable release and supports Kubernetes 1.27–1.30.'
          }
        ],
        checkCommand: 'kubectl get pods -n kube-system',
        expectedOutput: 'calico-node'
      },
      {
        id: 'step-8',
        title: 'Worker Node Integration',
        instruction: 'Simulate joining a worker node and verify the cluster status.',
        summary: 'Expand the cluster and verify health.',
        whyNeeded: 'Verifying that the cluster has reached a "Ready" state is the final step in confirming a successful production-grade bootstrap.',
        pillarConnection: 'Operational Excellence — automated cluster health verification closing the installation loop.',
        commands: [
          {
            text: 'kubectl get nodes -o wide',
            explanation: 'Lists all available nodes and their networking status.'
          }
        ],
        checkCommand: 'kubectl get nodes',
        expectedOutput: 'Ready'
      }
    ]
  },
  {
    projectId: '21',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Metrics Pipeline Activation',
        instruction: 'Deploy the Metrics Server and create the nginx-demo deployment with resource requests so the autoscaler has data to act on.',
        summary: 'Deploy Metrics Server and seed the target workload.',
        whyNeeded: 'The Horizontal Pod Autoscaler cannot function without real-time CPU and Memory data. Metrics Server aggregates this from kubelets. Resource requests on the deployment are also mandatory — HPA computes utilization as actual / requested, so without requests the HPA has no denominator.',
        pillarConnection: 'Performance Efficiency — real-time metric collection is the basis for reactive scaling, ensuring resources are only used when needed.',
        commands: [
          {
            text: 'kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml',
            explanation: 'Applies the official Metrics Server manifests to the cluster.'
          },
          {
            text: 'kubectl create deployment nginx-demo --image=nginx:alpine --replicas=1\nkubectl set resources deployment nginx-demo --requests=cpu=100m,memory=128Mi --limits=cpu=250m,memory=256Mi',
            explanation: 'Creates the target workload with explicit CPU/memory requests. HPA calculates utilisation as (actual CPU usage / requested CPU), so the requests field is mandatory — without it the HPA shows <unknown> and never fires.'
          }
        ],
        checkCommand: 'kubectl get deployment metrics-server -n kube-system',
        expectedOutput: 'metrics-server'
      },
      {
        id: 'step-2',
        title: 'Autoscaling Configuration',
        instruction: 'Define a Horizontal Pod Autoscaler for nginx-demo with a CPU target of 50%.',
        summary: 'Configure Horizontal Pod Autoscaler.',
        whyNeeded: 'HPA ensures that your application can handle unexpected traffic spikes by spinning up more replicas, and saves money by scaling down during quiet periods.',
        pillarConnection: 'Cost Optimization — dynamic scaling ensures that you are only paying for the compute power actually required by the current load.',
        commands: [
          {
            text: 'kubectl autoscale deployment nginx-demo --cpu-percent=50 --min=1 --max=10',
            explanation: 'Tells Kubernetes to maintain a fleet of 1 to 10 pods, aiming for an average CPU utilization of 50% across them.'
          }
        ],
        checkCommand: 'kubectl get hpa',
        expectedOutput: 'nginx-demo'
      },
      {
        id: 'step-3',
        title: 'Load Simulation & Validation',
        instruction: 'Generate artificial CPU load to trigger a scaling event.',
        summary: 'Simulate high traffic and observe scaling.',
        whyNeeded: 'Testing autoscaling in a controlled environment is the only way to verify that your resource requests and limits are correctly tuned for production.',
        pillarConnection: 'Reliability — confirming that scaling works as intended ensures the application remains responsive under heavy stress.',
        commands: [
          {
            text: 'kubectl run -i --tty load-generator --rm --image=busybox -- /bin/sh -c "while true; do wget -q -O- http://nginx-demo; done"',
            explanation: 'Starts a temporary pod that spams requests to the web server, forcing the CPU utilization to rise.'
          }
        ],
        checkCommand: 'kubectl get hpa',
        expectedOutput: '50%'
      },
      {
        id: 'step-4',
        title: 'Vertical Pod Autoscaling',
        instruction: 'Deploy a VPA object to automatically adjust the CPU and memory requests of your pods based on historical usage.',
        summary: 'Implement Vertical Pod Autoscaler.',
        whyNeeded: 'While HPA scales the number of pods, VPA scales the size of individual pods. This is crucial for applications that are vertical-scaling limited (e.g., databases).',
        pillarConnection: 'Performance Efficiency — VPA ensures that pods have exactly the right amount of resources, preventing "OOM" (Out Of Memory) kills or resource waste.',
        commands: [
          {
            text: 'helm repo add fairwinds-stable https://charts.fairwinds.com/stable && helm repo update\nhelm install vpa fairwinds-stable/vpa --namespace vpa --create-namespace',
            explanation: 'Installs the VPA via the Fairwinds Helm chart which deploys all three components: recommender (analyses usage), updater (evicts pods needing resize), and admission-controller (patches resource requests on pod creation). The upstream VPA requires cloning the repo and running a shell script — Helm is the practical path for labs.'
          },
          {
            text: 'cat <<\'EOF\' > vpa-nginx.yaml\napiVersion: autoscaling.k8s.io/v1\nkind: VerticalPodAutoscaler\nmetadata:\n  name: nginx-demo-vpa\nspec:\n  targetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: nginx-demo\n  updatePolicy:\n    updateMode: "Auto"\n  resourcePolicy:\n    containerPolicies:\n    - containerName: nginx\n      minAllowed:\n        cpu: 50m\n        memory: 64Mi\n      maxAllowed:\n        cpu: 500m\n        memory: 512Mi\nEOF\nkubectl apply -f vpa-nginx.yaml',
            explanation: 'Creates a VPA object targeting nginx-demo. Auto mode means the VPA will evict and recreate pods with updated resource requests based on the recommender\'s analysis.'
          }
        ],
        checkCommand: 'kubectl get customresourcedefinition verticalpodautoscalers.autoscaling.k8s.io',
        expectedOutput: 'verticalpodautoscalers.autoscaling.k8s.io'
      },
      {
        id: 'step-5',
        title: 'Predictive Scaling with KEDA',
        instruction: 'Install KEDA (Kubernetes Event-driven Autoscaling) to allow scaling based on external events like Message Queue depth.',
        summary: 'Implement event-driven scaling.',
        whyNeeded: 'Standard HPA is limited to CPU/Memory. KEDA allows you to scale to zero (0) when there are no events and scale instantly when a queue fills up.',
        pillarConnection: 'Cost Optimization — scaling to zero during idle periods eliminates all compute costs for event-driven workers.',
        commands: [
          {
            text: 'helm repo add kedacore https://kedacore.github.io/charts && helm repo update\nhelm install keda kedacore/keda --namespace keda --create-namespace',
            explanation: 'Installs the KEDA operator which acts as a bridge between external event sources and the HPA.'
          }
        ],
        checkCommand: 'kubectl get pods -n keda',
        expectedOutput: 'keda-operator'
      },
      {
        id: 'step-6',
        title: 'Custom Metric Scaling with Prometheus',
        instruction: 'Configure an HPA to scale based on a custom "requests_per_second" metric fetched from Prometheus.',
        summary: 'Scale based on business metrics.',
        whyNeeded: 'CPU/Memory doesn\'t always reflect load (e.g., I/O bound tasks). Scaling on "Requests Per Second" allows you to proactively handle surge traffic before CPU rises.',
        pillarConnection: 'Performance Efficiency — using domain-specific metrics for scaling Ensures that the application has the right capacity for actual user demand.',
        commands: [
          {
            text: 'cat <<\'EOF\' > prometheus-adapter.yaml\nrules:\n  custom:\n  - seriesQuery: \'http_requests_total{namespace!="",pod!=""}\'\n    resources:\n      overrides:\n        namespace:\n          resource: namespace\n        pod:\n          resource: pod\n    name:\n      matches: "^(.*)_total"\n      as: "${1}_per_second"\n    metricsQuery: "rate(<<.Series>>{<<.LabelMatchers>>}[2m])"\nEOF\nhelm install prometheus-adapter prometheus-community/prometheus-adapter \\\n  --namespace monitoring \\\n  --set prometheus.url=http://prometheus-operated.monitoring.svc.cluster.local \\\n  --set prometheus.port=9090 \\\n  -f prometheus-adapter.yaml',
            explanation: 'Installs the Prometheus adapter with a rule that exposes http_requests_total as a custom metric named http_requests_per_second. The overrides block maps namespace/pod labels to Kubernetes resource objects, which is required for per-pod scoping. The adapter talks to the prometheus-operated service created by kube-prometheus-stack.'
          }
        ],
        checkCommand: 'kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1"',
        expectedOutput: 'http_requests_per_second'
      },
      {
        id: 'step-7',
        title: 'Predictive Scaling with AI',
        instruction: 'Enable the KEDA Predictive Scaler to anticipate traffic spikes using time-series forecasting.',
        summary: 'Implement proactive autoscaling.',
        whyNeeded: 'Reactive scaling starts *after* the traffic arrives. Predictive scaling analyzes historical logs to pre-warm the cluster *before* the Monday morning rush.',
        pillarConnection: 'Reliability — pre-warming infrastructure prevents performance degradation during sudden but predictable traffic surges.',
        commands: [
          {
            text: 'cat <<\'EOF\' > scaledobject.yaml\napiVersion: keda.sh/v1alpha1\nkind: ScaledObject\nmetadata:\n  name: nginx-demo-scaler\nspec:\n  scaleTargetRef:\n    name: nginx-demo\n  minReplicaCount: 1\n  maxReplicaCount: 20\n  triggers:\n  - type: prometheus\n    metadata:\n      serverAddress: http://prometheus-operated.monitoring.svc.cluster.local:9090\n      metricName: http_requests_per_second\n      query: sum(rate(http_requests_total[2m]))\n      threshold: "100"\nEOF\nkubectl apply -f scaledobject.yaml',
            explanation: 'Defines a KEDA ScaledObject that scales nginx-demo based on a Prometheus rate query. The serverAddress uses the in-cluster DNS name for the prometheus-operated Service created by kube-prometheus-stack — not a bare "prometheus:9090". The threshold of 100 means KEDA will add a replica for every 100 req/s above the baseline.'
          }
        ],
        checkCommand: 'kubectl get scaledobject',
        expectedOutput: 'nginx-demo-scaler'
      }
    ]
  },
  {
    projectId: '22',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'External Traffic Gateway',
        instruction: 'Install the NGINX Ingress Controller to manage external access to your cluster services.',
        summary: 'Deploy the NGINX Ingress Controller.',
        whyNeeded: 'Ingress controllers act as the front door to your cluster. They aggregate multiple services under a single IP or LoadBalancer, providing SSL termination and path-based routing.',
        pillarConnection: 'Performance Efficiency — centralized ingress reduces the number of expensive cloud load balancers required for your infrastructure.',
        commands: [
          {
            text: 'helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && helm repo update',
            explanation: 'Adds the official NGINX ingress repository to your Helm configuration.'
          },
          {
            text: 'helm install ingress-nginx ingress-nginx/ingress-nginx \\\n  --namespace ingress-basic \\\n  --create-namespace \\\n  --set controller.service.type=NodePort',
            explanation: 'Provisions the NGINX controller. On local clusters (Docker Desktop, minikube, kind) there is no cloud load balancer, so NodePort is used instead of the default LoadBalancer type — without this flag the controller service stays in Pending state indefinitely.'
          }
        ],
        checkCommand: 'kubectl get pods -n ingress-basic',
        expectedOutput: 'ingress-nginx-controller'
      },
      {
        id: 'step-2',
        title: 'Layer 7 Routing Configuration',
        instruction: 'Apply an Ingress resource to route traffic from a hostname to your backend service.',
        summary: 'Configure a Layer 7 routing rule.',
        whyNeeded: 'Without an Ingress resource, the controller doesn\'t know how to map specific requests to specific pods. This step defines the actual business logic of your traffic flow.',
        pillarConnection: 'Reliability — using declarative ingress rules ensures that your traffic routing is version-controlled and reproducible.',
        commands: [
          {
            text: 'kubectl create deployment web-service --image=nginx:alpine --replicas=2\nkubectl expose deployment web-service --port=80 --target-port=80',
            explanation: 'Creates the backend application and a ClusterIP Service for it. The Ingress needs a real Service to route to — without this step the Ingress backend would be unresolvable and return 503.'
          },
          {
            text: 'cat <<\'EOF\' > ingress.yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: app-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: myapp.local\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service\n            port:\n              number: 80\nEOF\nkubectl apply -f ingress.yaml',
            explanation: 'Creates the Ingress routing rule. The ingressClassName: nginx field is required in ingress-nginx v1.0+ to associate this rule with the correct controller — without it the Ingress is ignored. The rewrite-target annotation passes requests through to the backend unchanged.'
          }
        ],
        checkCommand: 'kubectl get ingress',
        expectedOutput: 'app-ingress'
      },
      {
        id: 'step-3',
        title: 'TLS Termination & Security',
        instruction: 'Enable HTTPS for your ingress by generating a self-signed certificate and creating a TLS secret.',
        summary: 'Configure SSL/TLS termination.',
        whyNeeded: 'Security in transit is mandatory for production workloads. TLS termination at the ingress level offloads the encryption overhead from your application pods.',
        pillarConnection: 'Security — encrypting data in transit protects sensitive user information from interception.',
        commands: [
          {
            text: 'openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=myapp.local"',
            explanation: 'Generates a temporary self-signed SSL certificate for development use.'
          },
          {
            text: 'kubectl create secret tls app-tls --key tls.key --cert tls.crt',
            explanation: 'Stores the certificate and key as a native Kubernetes secret for Ingress consumption.'
          }
        ],
        checkCommand: 'kubectl get secret app-tls',
        expectedOutput: 'kubernetes.io/tls'
      },
      {
        id: 'step-4',
        title: 'Rate Limiting Guardrails',
        instruction: 'Add annotations to your Ingress to protect your backend from DDoS or brute-force attacks.',
        summary: 'Implement L7 Rate Limiting.',
        whyNeeded: 'Uncontrolled traffic can overwhelm your services. Rate limiting ensures fair resource usage and protects your application from malicious high-volume requests.',
        pillarConnection: 'Reliability — rate limiting prevents the "Cascading Failure" pattern where one bad actor takes down the entire service.',
        commands: [
          {
            text: 'kubectl annotate ingress app-ingress nginx.ingress.kubernetes.io/limit-rps=5',
            explanation: 'Updates the Ingress rule to restrict traffic to 5 requests per second per IP address.'
          }
        ],
        checkCommand: 'kubectl get ingress app-ingress -o jsonpath="{.metadata.annotations}"',
        expectedOutput: 'limit-rps'
      },
      {
        id: 'step-5',
        title: 'Canary Deployments with Ingress',
        instruction: 'Configure split-traffic routing between two versions of your service using NGINX Canary annotations.',
        summary: 'Enable canary traffic splitting.',
        whyNeeded: 'Canary routing allows you to roll out new features to only a subset of users, drastically reducing the risk of a global outage.',
        pillarConnection: 'Reliability — controlled traffic shifting is a primary requirement for a safe and progressive delivery strategy.',
        commands: [
          {
            text: 'kubectl create deployment web-service-canary --image=nginx:alpine --replicas=1\nkubectl expose deployment web-service-canary --port=80 --target-port=80',
            explanation: 'Creates the canary version of the service. Nginx canary works by routing a percentage of traffic to a *separate* service — not by annotating the original Ingress.'
          },
          {
            text: 'cat <<\'EOF\' > ingress-canary.yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: app-ingress-canary\n  annotations:\n    nginx.ingress.kubernetes.io/canary: "true"\n    nginx.ingress.kubernetes.io/canary-weight: "10"\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: myapp.local\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service-canary\n            port:\n              number: 80\nEOF\nkubectl apply -f ingress-canary.yaml',
            explanation: 'Creates a *second* Ingress resource for the canary. Nginx canary requires a separate Ingress pointing to the canary service — annotating the original ingress with canary flags does nothing. The 10% weight means 1 in 10 requests go to web-service-canary; the rest still go to web-service.'
          }
        ],
        checkCommand: 'kubectl get ingress app-ingress-canary -o jsonpath="{.metadata.annotations}"',
        expectedOutput: 'canary-weight'
      },
      {
        id: 'step-6',
        title: 'Ingress Admission Controller & OPA',
        instruction: 'Deploy an Open Policy Agent (OPA) Gatekeeper to enforce global Ingress rules, such as mandatory TLS and specific hostname patterns.',
        summary: 'Enforce governance on traffic.',
        whyNeeded: 'Admission controllers act as a security checkpoint, preventing the creation of insecure Ingress resources (e.g., those without SSL/TLS) before they even reach the cluster.',
        pillarConnection: 'Security — policy-as-code ensures that security best practices are enforced automatically and cannot be bypassed by engineers.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/v3.16.0/deploy/gatekeeper.yaml',
            explanation: 'Installs the Gatekeeper admission controller (v3.16, current stable). It registers two webhooks — ValidatingAdmissionWebhook and MutatingAdmissionWebhook — that intercept all Kubernetes API calls and run them against your OPA policies before allowing or rejecting them.'
          }
        ],
        checkCommand: 'kubectl get pods -n gatekeeper-system',
        expectedOutput: 'gatekeeper-controller-manager'
      },
      {
        id: 'step-7',
        title: 'Global Load Balancing with ExternalDNS',
        instruction: 'Install ExternalDNS to automatically synchronize your Ingress hostnames with cloud DNS providers like Route53 or Azure DNS.',
        summary: 'Automate DNS management.',
        whyNeeded: 'Manually updating DNS records for every new service is slow and error-prone. ExternalDNS ensures your public URLs are always in sync with your active infrastructure.',
        pillarConnection: 'Operational Excellence — automated infrastructure updates reduce manual toil and ensure service reachability.',
        commands: [
          {
            text: 'helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/ && helm repo update\nhelm install external-dns external-dns/external-dns \\\n  --namespace external-dns \\\n  --create-namespace \\\n  --set provider=aws \\\n  --set sources[0]=ingress \\\n  --set sources[1]=service',
            explanation: 'Adds the external-dns Helm repo and installs the controller configured for Route53. The sources flags tell it to watch both Ingress and Service resources for hostnames to publish. On Azure, replace provider=aws with provider=azure and add --set azure.resourceGroup=<rg>.'
          }
        ],
        checkCommand: 'kubectl get pods -n external-dns | grep external-dns',
        expectedOutput: 'external-dns'
      }
    ]
  },
  {
    projectId: '23',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Default StorageClass with local-path-provisioner',
        instruction: 'Install Rancher\'s local-path-provisioner to enable dynamic PVC provisioning on local clusters.',
        summary: 'Provision a default StorageClass.',
        whyNeeded: 'Cloud clusters ship with a built-in CSI driver and a default StorageClass. Local clusters (Docker Desktop, minikube, kind) often do not. local-path-provisioner fills this gap by dynamically creating hostPath volumes — perfect for labs and CI environments.',
        pillarConnection: 'Reliability — a default StorageClass means PVCs are provisioned automatically; without it, any StatefulSet or PVC that omits storageClassName stays in Pending forever.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.28/deploy/local-path-storage.yaml',
            explanation: 'Deploys the local-path-provisioner namespace, ServiceAccount, ClusterRole, and Deployment in one manifest. After this, any PVC with storageClassName: local-path (or with no class if you patch it to be default) is provisioned automatically.'
          },
          {
            text: 'kubectl patch storageclass local-path -p \'{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}\'',
            explanation: 'Marks local-path as the cluster default. Any PVC that omits storageClassName now resolves to this provisioner automatically — the same behaviour you get from cloud CSI drivers out of the box.'
          }
        ],
        checkCommand: 'kubectl get storageclass local-path',
        expectedOutput: 'local-path'
      },
      {
        id: 'step-2',
        title: 'Dynamic PVC Provisioning',
        instruction: 'Create a PersistentVolumeClaim and verify the CSI provisioner creates the backing volume automatically.',
        summary: 'Test dynamic volume provisioning end-to-end.',
        whyNeeded: 'Understanding the PVC → PV lifecycle is essential before introducing StatefulSets. A PVC is a request for storage; the StorageClass decides whether to create the PV immediately (Immediate) or wait for a pod to be scheduled (WaitForFirstConsumer).',
        pillarConnection: 'Operational Excellence — declarative storage requests decouple application manifests from the underlying storage topology.',
        commands: [
          {
            text: 'cat <<\'EOF\' > test-pvc.yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: test-pvc\nspec:\n  accessModes:\n  - ReadWriteOnce\n  storageClassName: local-path\n  resources:\n    requests:\n      storage: 1Gi\nEOF\nkubectl apply -f test-pvc.yaml',
            explanation: 'Submits a 1 GiB storage claim. With local-path, the PV is created immediately and the PVC transitions to Bound within seconds.'
          },
          {
            text: 'kubectl get pvc test-pvc',
            explanation: 'Verifies the claim is Bound, confirming the provisioner responded correctly. A Pending status here means no matching StorageClass was found.'
          }
        ],
        checkCommand: 'kubectl get pvc test-pvc -o jsonpath="{.status.phase}"',
        expectedOutput: 'Bound'
      },
      {
        id: 'step-3',
        title: 'Stateful Workload with PVC',
        instruction: 'Deploy a Postgres database pod that mounts the PVC for durable data storage.',
        summary: 'Mount persistent storage in a database pod.',
        whyNeeded: 'Without a persistent volume, a database pod loses all data when it restarts. Mounting a PVC ensures that the data directory survives pod evictions, node reboots, and rolling updates.',
        pillarConnection: 'Reliability — binding storage to the pod lifecycle rather than the node is the foundation of stateful cloud-native applications.',
        commands: [
          {
            text: 'cat <<\'EOF\' > postgres-pod.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: postgres\n  labels:\n    app: postgres\nspec:\n  containers:\n  - name: postgres\n    image: postgres:16-alpine\n    env:\n    - name: POSTGRES_PASSWORD\n      value: "labpassword"\n    - name: PGDATA\n      value: /var/lib/postgresql/data/pgdata\n    volumeMounts:\n    - name: pg-data\n      mountPath: /var/lib/postgresql/data\n  volumes:\n  - name: pg-data\n    persistentVolumeClaim:\n      claimName: test-pvc\nEOF\nkubectl apply -f postgres-pod.yaml',
            explanation: 'Creates a Postgres pod that mounts test-pvc at /var/lib/postgresql/data. PGDATA is set to a subdirectory because Postgres refuses to start if the mount point contains a lost+found directory (which ext4 volumes include).'
          }
        ],
        checkCommand: 'kubectl get pod postgres',
        expectedOutput: 'Running'
      },
      {
        id: 'step-4',
        title: 'StatefulSet with volumeClaimTemplates',
        instruction: 'Deploy a MongoDB StatefulSet where each replica gets its own automatically provisioned PVC.',
        summary: 'Use volumeClaimTemplates for per-replica storage.',
        whyNeeded: 'Deployments share a single PVC across replicas, which is unsuitable for databases. StatefulSets with volumeClaimTemplates ensure each pod (mongo-0, mongo-1, mongo-2) gets a unique, dedicated PVC that follows it across rescheduling.',
        pillarConnection: 'Reliability — stable pod identities paired with dedicated storage prevent split-brain and data corruption scenarios in distributed databases.',
        commands: [
          {
            text: 'cat <<\'EOF\' > mongo-headless-svc.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: mongo\nspec:\n  clusterIP: None\n  selector:\n    app: mongo\n  ports:\n  - port: 27017\n    name: mongo\nEOF\nkubectl apply -f mongo-headless-svc.yaml',
            explanation: 'Creates a headless Service (clusterIP: None). This gives each StatefulSet pod a stable DNS record like mongo-0.mongo.default.svc.cluster.local, which databases use to form clusters and elect primaries.'
          },
          {
            text: 'cat <<\'EOF\' > mongo-sts.yaml\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mongo\nspec:\n  serviceName: mongo\n  replicas: 3\n  selector:\n    matchLabels:\n      app: mongo\n  template:\n    metadata:\n      labels:\n        app: mongo\n    spec:\n      containers:\n      - name: mongo\n        image: mongo:7.0\n        ports:\n        - containerPort: 27017\n        volumeMounts:\n        - name: data\n          mountPath: /data/db\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: local-path\n      resources:\n        requests:\n          storage: 1Gi\nEOF\nkubectl apply -f mongo-sts.yaml',
            explanation: 'Deploys a 3-replica MongoDB StatefulSet. The volumeClaimTemplates section causes the controller to automatically create data-mongo-0, data-mongo-1, data-mongo-2 PVCs — one per replica. These PVCs are never deleted automatically when the StatefulSet is scaled down, which protects against accidental data loss.'
          }
        ],
        checkCommand: 'kubectl get pvc | grep data-mongo',
        expectedOutput: 'data-mongo-0'
      },
      {
        id: 'step-5',
        title: 'Volume Expansion',
        instruction: 'Resize a PersistentVolumeClaim online to accommodate unexpected data growth without downtime.',
        summary: 'Dynamically expand a running volume.',
        whyNeeded: 'Running out of disk space is a leading cause of database outages. Cloud CSI drivers (EBS, Azure Disk, GCE PD) support online volume expansion — no pod restart required. Local-path does not support resize, so this step targets the mongo-0 PVC conceptually and validates the StorageClass capability.',
        pillarConnection: 'Performance Efficiency — proactive capacity management prevents I/O saturation and the cascading failures it causes in write-heavy workloads.',
        commands: [
          {
            text: 'kubectl patch storageclass local-path -p \'{"allowVolumeExpansion": true}\'',
            explanation: 'Enables the allowVolumeExpansion flag on the StorageClass — required before any PVC resize request is accepted. Cloud CSI drivers ship with this enabled by default; for local-path it\'s a lab-only flag since the underlying hostPath driver does not actually enforce quotas.'
          },
          {
            text: 'kubectl patch pvc data-mongo-0 -p \'{"spec":{"resources":{"requests":{"storage":"2Gi"}}}}\'',
            explanation: 'Submits the resize request. Kubernetes validates allowVolumeExpansion=true then delegates to the CSI driver to expand the block device. On a real cloud CSI (EBS, Azure Disk) this triggers an API call to resize the underlying disk without stopping the pod.'
          }
        ],
        checkCommand: 'kubectl get pvc data-mongo-0 -o jsonpath="{.spec.resources.requests.storage}"',
        expectedOutput: '2Gi'
      },
      {
        id: 'step-6',
        title: 'VolumeSnapshot for Point-in-Time Backup',
        instruction: 'Install the VolumeSnapshot CRDs and take a crash-consistent snapshot of the mongo-0 volume.',
        summary: 'Create a CSI volume snapshot.',
        whyNeeded: 'Snapshots capture the on-disk state of a volume at a specific moment. Unlike rsync backups, they are crash-consistent (no partial writes) and near-instant since the CSI driver uses the storage layer\'s copy-on-write mechanism.',
        pillarConnection: 'Reliability — point-in-time snapshots are the primary recovery mechanism for stateful workloads after data corruption or accidental deletion.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.2/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml\nkubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.2/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml\nkubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/v7.0.2/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml',
            explanation: 'Installs the three VolumeSnapshot CRDs from the kubernetes-csi external-snapshotter project (v7.0.2, current stable). These CRDs are not bundled with Kubernetes core and must be installed separately.'
          },
          {
            text: 'cat <<\'EOF\' > mongo-snapshot.yaml\napiVersion: snapshot.storage.k8s.io/v1\nkind: VolumeSnapshot\nmetadata:\n  name: mongo-0-snapshot\nspec:\n  volumeSnapshotClassName: csi-hostpath-snapclass\n  source:\n    persistentVolumeClaimName: data-mongo-0\nEOF\nkubectl apply -f mongo-snapshot.yaml',
            explanation: 'Requests a snapshot of the data-mongo-0 PVC. The CSI driver freezes the filesystem writes briefly, captures the block-level state, then resumes IO — the pod never stops running.'
          }
        ],
        checkCommand: 'kubectl get volumesnapshot mongo-0-snapshot',
        expectedOutput: 'mongo-0-snapshot'
      },
      {
        id: 'step-7',
        title: 'Restore from Snapshot',
        instruction: 'Provision a new PVC from the snapshot and mount it to a recovery pod to verify data integrity.',
        summary: 'Restore a volume from a CSI snapshot.',
        whyNeeded: 'A snapshot is only valuable if you can restore from it. This step validates the full backup/restore cycle — the most important drill any database operator can run.',
        pillarConnection: 'Reliability — validating recovery procedures before a real incident is the difference between a Recovery Time Objective (RTO) of minutes versus hours.',
        commands: [
          {
            text: 'cat <<\'EOF\' > restore-pvc.yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: mongo-0-restored\nspec:\n  storageClassName: local-path\n  dataSource:\n    name: mongo-0-snapshot\n    kind: VolumeSnapshot\n    apiGroup: snapshot.storage.k8s.io\n  accessModes:\n  - ReadWriteOnce\n  resources:\n    requests:\n      storage: 2Gi\nEOF\nkubectl apply -f restore-pvc.yaml',
            explanation: 'Creates a new PVC pre-populated with the snapshot data via the dataSource field. The CSI driver clones the snapshot content into the new volume before the PVC transitions to Bound.'
          },
          {
            text: 'kubectl run restore-check --image=busybox:1.36 --rm -it --restart=Never \\\n  --overrides=\'{"spec":{"volumes":[{"name":"data","persistentVolumeClaim":{"claimName":"mongo-0-restored"}}],"containers":[{"name":"restore-check","image":"busybox:1.36","command":["ls","/data/db"],"volumeMounts":[{"name":"data","mountPath":"/data/db"}]}]}}\' ',
            explanation: 'Runs a one-shot pod that mounts the restored volume and lists the MongoDB data directory. If you see WiredTiger files, the snapshot restored correctly.'
          }
        ],
        checkCommand: 'kubectl get pvc mongo-0-restored -o jsonpath="{.status.phase}"',
        expectedOutput: 'Bound'
      }
    ]
  },
  {
    projectId: '24',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Namespace Isolation',
        instruction: 'Create a dedicated namespace to host your secured application workloads.',
        summary: 'Create a secure namespace.',
        whyNeeded: 'Namespaces are the primary boundary for resource isolation in Kubernetes. Creating a dedicated one allows you to apply scoped security policies without affecting the rest of the cluster.',
        pillarConnection: 'Security — proper segmentation of workloads is a core requirement for a defense-in-depth strategy.',
        commands: [
          {
            text: 'kubectl create namespace secure-app',
            explanation: 'Initializes the logical boundary for the application.'
          }
        ],
        checkCommand: 'kubectl get namespace secure-app',
        expectedOutput: 'Active'
      },
      {
        id: 'step-2',
        title: 'Zero-Trust Policy Implementation',
        instruction: 'Apply a "Deny-All" network policy to block all non-explicit traffic by default.',
        summary: 'Implement a default-deny network policy.',
        whyNeeded: 'In a Zero-Trust environment, you should never assume internal traffic is safe. A deny-all policy ensures that if a pod is compromised, the attacker cannot pivot to other services.',
        pillarConnection: 'Security — enforcing traffic restriction at the network layer significantly reduces the lateral movement capability of an attacker.',
        commands: [
          {
            text: 'cat <<\'EOF\' > default-deny.yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny-all\n  namespace: secure-app\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress\nEOF\nkubectl apply -f default-deny.yaml',
            explanation: 'Creates and applies a policy that targets all pods in the namespace and blocks all incoming/outgoing traffic.'
          }
        ],
        checkCommand: 'kubectl get netpol -n secure-app',
        expectedOutput: 'default-deny-all'
      },
      {
        id: 'step-3',
        title: 'Selective Ingress Allowance',
        instruction: 'Create a specific policy to allow incoming traffic only from your designated frontend pods.',
        summary: 'Whitelist specific traffic paths.',
        whyNeeded: 'Deny-all is too restrictive for an active app. Whitelisting only required traffic paths ensures the application works while maintaining a minimal security surface.',
        pillarConnection: 'Security — implementation of granular access controls at the network layer is a foundational requirement for PCI-DSS or SOC2 compliance.',
        commands: [
          {
            text: 'cat <<EOF > allow-frontend.yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-frontend-to-api\n  namespace: secure-app\nspec:\n  podSelector:\n    matchLabels:\n      app: api\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: frontend\nEOF\nkubectl apply -f allow-frontend.yaml',
            explanation: 'Applies a rule that only pods labeled "frontend" can communicate with pods labeled "api" in this namespace.'
          }
        ],
        checkCommand: 'kubectl get netpol allow-frontend-to-api -n secure-app',
        expectedOutput: 'allow-frontend-to-api'
      },
      {
        id: 'step-4',
        title: 'Role-Based Access Control',
        instruction: 'Create a custom Role and RoleBinding to restrict what the application service account can do within its namespace.',
        summary: 'Implement Least-Privilege RBAC.',
        whyNeeded: 'By default, service accounts might have more permissions than they need. RBAC ensures that a compromised application cannot delete other resources in the cluster.',
        pillarConnection: 'Security — Principle of Least Privilege ensured through scoped RBAC definitions.',
        commands: [
          {
            text: 'kubectl create serviceaccount app-sa -n secure-app',
            explanation: 'Creates a dedicated ServiceAccount for the application. By default, pods use the "default" ServiceAccount which often has broader permissions than required.'
          },
          {
            text: 'cat <<\'EOF\' > rbac.yaml\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: secure-app\n  name: pod-reader\nrules:\n- apiGroups: [""]\n  resources: ["pods"]\n  verbs: ["get", "watch", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: pod-reader-binding\n  namespace: secure-app\nsubjects:\n- kind: ServiceAccount\n  name: app-sa\n  namespace: secure-app\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\nEOF\nkubectl apply -f rbac.yaml',
            explanation: 'Creates both the Role and the RoleBinding in a single apply. A Role alone has zero effect — the RoleBinding is what links the permissions to the ServiceAccount. Without it, app-sa has no more access than the default ServiceAccount.'
          }
        ],
        checkCommand: 'kubectl get rolebinding pod-reader-binding -n secure-app',
        expectedOutput: 'pod-reader-binding'
      },
      {
        id: 'step-5',
        title: 'Pod Security Admissions',
        instruction: 'Configure the namespace to enforce the "Restricted" pod security standards, blocking privileged containers.',
        summary: 'Enforce Pod Security Standards.',
        whyNeeded: 'Network policies only cover traffic. Pod Security Admissions ensure that containers cannot run as root or access the host filesystem, preventing escalation.',
        pillarConnection: 'Security — hardening the container runtime environment is critical for defense-in-depth.',
        commands: [
          {
            text: 'kubectl label --overwrite ns secure-app pod-security.kubernetes.io/enforce=restricted',
            explanation: 'Applies a cluster-level governance label that forces all pods in the namespace to meet strict security criteria.'
          }
        ],
        checkCommand: 'kubectl get ns secure-app --show-labels',
        expectedOutput: 'enforce=restricted'
      },
      {
        id: 'step-6',
        title: 'Runtime Security with Falco',
        instruction: 'Install Falco to detect suspicious activity inside your containers, such as shell spawns or unauthorized file access.',
        summary: 'Implement runtime threat detection.',
        whyNeeded: 'Network policies and RBAC protect the "walls" of your cluster. Falco acts as a security camera *inside* the containers, alerting you to active breaches.',
        pillarConnection: 'Security — real-time monitoring and alerting on anomalous behavior provide the final layer of a defense-in-depth strategy.',
        commands: [
          {
            text: 'helm repo add falcosecurity https://falcosecurity.github.io/charts && helm repo update\nhelm install falco falcosecurity/falco \\\n  --namespace falco \\\n  --create-namespace \\\n  --set driver.kind=modern_ebpf \\\n  --set falcosidekick.enabled=true',
            explanation: 'Installs Falco with the modern eBPF driver (no kernel module compilation required). The modern_ebpf driver uses CO-RE (Compile Once, Run Everywhere) and works on any kernel 5.8+ — the previous --set tty=true flag does not exist in modern Falco charts. falcosidekick enables webhook forwarding for alerts.'
          }
        ],
        checkCommand: 'kubectl get pods -n falco | grep falco',
        expectedOutput: 'falco'
      },
      {
        id: 'step-7',
        title: 'Secrets Encryption at Rest',
        instruction: 'Write and activate an EncryptionConfiguration to encrypt all Kubernetes Secrets in etcd using AES-CBC.',
        summary: 'Encrypt secrets in the etcd database.',
        whyNeeded: 'By default, Secrets are stored as base64 (not encrypted) in etcd. Anyone with etcd access can read them in plaintext. Encryption at rest ensures that even a full etcd backup is unreadable without the encryption key — mandatory for PCI-DSS and HIPAA workloads.',
        pillarConnection: 'Security — encrypting sensitive data at the storage layer is the final layer of defense when all other access controls have been bypassed.',
        commands: [
          {
            text: 'ENCRYPTION_KEY=$(head -c 32 /dev/urandom | base64)\ncat <<EOF | sudo tee /etc/kubernetes/encryption-config.yaml\napiVersion: apiserver.config.k8s.io/v1\nkind: EncryptionConfiguration\nresources:\n- resources:\n  - secrets\n  providers:\n  - aescbc:\n      keys:\n      - name: key1\n        secret: ${ENCRYPTION_KEY}\n  - identity: {}\nEOF',
            explanation: 'Generates a 32-byte random key and writes the EncryptionConfiguration manifest. The aescbc provider listed first means new writes are encrypted; identity: {} listed second allows reading existing unencrypted secrets so old data is not locked out. On managed clusters (EKS, AKS, GKE), this is configured via the cloud console — not by editing files directly.'
          },
          {
            text: 'sudo sed -i "s|  - kube-apiserver|  - kube-apiserver\\n    - --encryption-provider-config=/etc/kubernetes/encryption-config.yaml|" /etc/kubernetes/manifests/kube-apiserver.yaml\nsudo grep encryption-provider-config /etc/kubernetes/manifests/kube-apiserver.yaml',
            explanation: 'Adds the --encryption-provider-config flag to the API server static pod manifest. The kubelet detects the manifest change and restarts the API server automatically. The grep confirms the flag was injected correctly.'
          },
          {
            text: 'kubectl create secret generic encrypted-test --from-literal=password=mysecret\nETCDCTL_API=3 sudo etcdctl get /registry/secrets/default/encrypted-test \\\n  --endpoints=https://127.0.0.1:2379 \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key | hexdump -C | head -5',
            explanation: 'Creates a test secret then reads its raw bytes from etcd. If you see k8s:enc:aescbc:v1:key1 at the start of the output (instead of the plaintext value), encryption is active and working.'
          }
        ],
        checkCommand: 'kubectl get secret encrypted-test',
        expectedOutput: 'encrypted-test'
      }
    ]
  },
  {
    projectId: '25',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Persistent Storage Provisioning',
        instruction: 'Create a local StorageClass to allow dynamic volume provisioning for your database.',
        summary: 'Define a StorageClass for MongoDB.',
        whyNeeded: 'Stateful applications like databases require storage that survives pod restarts. A StorageClass automates the creation of these disks as needed.',
        pillarConnection: 'Reliability — ensuring data persistence across infrastructure failures is critical for stateful cloud workloads.',
        commands: [
          {
            text: 'cat <<EOF > local-storage-class.yaml\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: local-storage\nprovisioner: kubernetes.io/no-provisioner\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Retain\nEOF\nkubectl apply -f local-storage-class.yaml',
            explanation: 'Writes the StorageClass manifest to disk, then applies it. Local volumes are bound only when a pod is scheduled (WaitForFirstConsumer) so the disk is co-located with the workload.'
          }
        ],
        checkCommand: 'kubectl get sc',
        expectedOutput: 'local-storage'
      },
      {
        id: 'step-2',
        title: 'Headless Service Deployment',
        instruction: 'Deploy a Headless Service to provide stable network identities for your database nodes.',
        summary: 'Create a Headless Service.',
        whyNeeded: 'Standard services load balance traffic. Databases often need to address specific nodes (e.g., the primary). A headless service allows direct pod-to-pod discovery using DNS.',
        pillarConnection: 'Reliability — stable network identifiers allow database clusters to maintain quorum and synchronization during node restarts.',
        commands: [
          {
            text: 'cat <<EOF > mongo-service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: mongo\n  labels:\n    app: mongo\nspec:\n  clusterIP: None\n  selector:\n    app: mongo\n  ports:\n  - port: 27017\n    name: mongo\nEOF\nkubectl apply -f mongo-service.yaml',
            explanation: 'Writes the headless Service manifest (clusterIP: None) and applies it so each MongoDB pod is directly addressable via DNS like mongo-0.mongo, mongo-1.mongo, etc.'
          }
        ],
        checkCommand: 'kubectl get svc mongo',
        expectedOutput: 'None'
      },
      {
        id: 'step-3',
        title: 'StatefulSet Orchestration',
        instruction: 'Deploy the MongoDB StatefulSet to manage the lifecycle of your persistent database nodes.',
        summary: 'Deploy the MongoDB StatefulSet.',
        whyNeeded: 'Deployments are interchangeable; StatefulSets are not. They ensure that pod "mongo-0" always gets the same volume and network name, even if it moves to a different physical node.',
        pillarConnection: 'Reliability — managing ordinality and stable storage ensures zero data loss during automated cluster updates.',
        commands: [
          {
            text: 'cat <<EOF > mongo-statefulset.yaml\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: mongo\nspec:\n  serviceName: mongo\n  replicas: 3\n  selector:\n    matchLabels:\n      app: mongo\n  template:\n    metadata:\n      labels:\n        app: mongo\n    spec:\n      containers:\n      - name: mongo\n        image: mongo:6.0\n        ports:\n        - containerPort: 27017\n        volumeMounts:\n        - name: data\n          mountPath: /data/db\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: local-storage\n      resources:\n        requests:\n          storage: 1Gi\nEOF\nkubectl apply -f mongo-statefulset.yaml',
            explanation: 'Writes the StatefulSet manifest and applies it. The volumeClaimTemplates ensure each replica (mongo-0, mongo-1, mongo-2) gets its own stable PVC bound to the local-storage class.'
          }
        ],
        checkCommand: 'kubectl get statefulset mongo',
        expectedOutput: '3/3'
      },
      {
        id: 'step-4',
        title: 'Safe Scaling & Ordinality',
        instruction: 'Scale your StatefulSet to 5 replicas and observe the ordered startup sequence.',
        summary: 'Scale the stateful application.',
        whyNeeded: 'StatefulSets scale predictably (0, 1, 2...). This is critical for systems where a secondary node requires a primary node to already be stable before joining.',
        pillarConnection: 'Reliability — predictable scaling behavior prevents race conditions during database cluster expansion.',
        commands: [
          {
            text: 'kubectl scale statefulset mongo --replicas=5',
            explanation: 'Increases the node count while ensuring mongo-3 and mongo-4 are provisioned with their own unique persistent volumes.'
          }
        ],
        checkCommand: 'kubectl get pods -l app=mongo',
        expectedOutput: 'mongo-4'
      },
      {
        id: 'step-5',
        title: 'Persistent Volume Resizing',
        instruction: 'Resize a PersistentVolumeClaim (PVC) on the fly to handle an unexpected data growth spike.',
        summary: 'Implement dynamic volume expansion.',
        whyNeeded: 'Running out of disk space is a primary cause of database outages. Dynamic expansion allows you to increase capacity without taking your stateful application offline.',
        pillarConnection: 'Performance Efficiency — maintaining adequate disk headroom ensures consistent I/O performance for database workloads.',
        commands: [
          {
            text: 'kubectl patch pvc mysql-pvc -p "{\\"spec\\":{\\"resources\\":{\\"requests\\":{\\"storage\\":\\"20Gi\\"}}}}"',
            explanation: 'Updates the desired storage size for the volume; Kubernetes will resize the underlying cloud disk automatically.'
          }
        ],
        checkCommand: 'kubectl get pvc mysql-pvc',
        expectedOutput: '20Gi'
      }
    ]
  },
  {
    projectId: '139',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Cost Visibility Engine Deployment',
        instruction: 'Install Kubecost using its official Helm chart to begin analyzing cluster expenses.',
        summary: 'Deploy the Kubecost platform.',
        whyNeeded: 'Cloud costs can be opaque. Kubecost provides detailed, line-item visibility into which pods, namespaces, and labels are driving your infrastructure spend.',
        pillarConnection: 'Cost Optimization — granular visibility is the "Inform" phase of the FinOps lifecycle, enabling data-driven decisions on resource allocation.',
        commands: [
          {
            text: 'helm repo add kubecost https://kubecost.github.io/cost-analyzer/ && helm repo update',
            explanation: 'Registers the official Kubecost repository and updates your local cache.'
          },
          {
            text: 'helm install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace',
            explanation: 'Provisions the cost analyzer pods which will immediately start scanning your cluster usage.'
          }
        ],
        checkCommand: 'kubectl get pods -n kubecost',
        expectedOutput: 'kubecost-cost-analyzer'
      },
      {
        id: 'step-2',
        title: 'Efficiency Dashboard Access',
        instruction: 'Access the Kubecost dashboard to visualize resource allocation and idle costs.',
        summary: 'Access the FinOps dashboard.',
        whyNeeded: 'The dashboard transforms raw metric data into actionable financial insights, allowing teams to identify wasted spend and optimize their reserved instance strategies.',
        pillarConnection: 'Cost Optimization — identifying idle resources is the fastest way to reduce waste and improve the overall efficiency of your cloud environment.',
        commands: [
          {
            text: 'kubectl port-forward --namespace kubecost deployment/kubecost-cost-analyzer 9090',
            explanation: 'Allows direct local access to the Kubecost web interface for cost analysis.'
          }
        ],
        checkCommand: 'kubectl get svc -n kubecost',
        expectedOutput: 'kubecost-cost-analyzer'
      },
      {
        id: 'step-3',
        title: 'Asset Allocation Analysis',
        instruction: 'Query the Kubecost API to retrieve a breakdown of spending by Kubernetes namespace.',
        summary: 'Analyze namespace spending.',
        whyNeeded: 'Understanding which teams or projects consume the most resources is vital for internal chargebacks and budget accountability.',
        pillarConnection: 'Cost Optimization — granular cost attribution enables teams to take ownership of their cloud consumption.',
        commands: [
          {
            text: 'curl "localhost:9090/model/allocation?window=1d&aggregate=namespace"',
            explanation: 'Calls the local Kubecost API to get a JSON report of the last 24 hours of cost data grouped by namespace.'
          }
        ],
        checkCommand: 'kubectl get pods -n kubecost',
        expectedOutput: 'kubecost'
      },
      {
        id: 'step-4',
        title: 'Resource Recommendation Engine',
        instruction: 'View rightsizing recommendations for your deployments to optimize resource requests.',
        summary: 'Apply rightsizing recommendations.',
        whyNeeded: 'Many developers over-provision pods "just in case". Kubecost analyzes actual usage and suggests smaller, more cost-effective sizes.',
        pillarConnection: 'Cost Optimization — automated rightsizing ensures that you only pay for the capacity your applications actually use.',
        commands: [
          {
            text: 'curl "localhost:9090/model/recommendations?window=1d"',
            explanation: 'Fetches optimization advice from the recommendation engine based on historical performance metrics.'
          }
        ],
        checkCommand: 'kubectl get pods -n kubecost',
        expectedOutput: 'kubecost'
      },
      {
        id: 'step-5',
        title: 'Network Traffic Cost Allocation',
        instruction: 'Configure Kubecost to track egress traffic costs to specific cloud regions and internet endpoints.',
        summary: 'Identify hidden network costs.',
        whyNeeded: 'Egress traffic is often the "hidden" cost of cloud computing. Tracking which services are sending the most data out of the cluster is vital for preventing budget surprises.',
        pillarConnection: 'Cost Optimization — granular visibility into networking costs identifies inefficient data movement patterns.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/kubecost/cost-analyzer-helm-chart/master/cost-analyzer/values-egress.yaml',
            explanation: 'Deploys an updated configuration that enables specialized network traffic monitoring.'
          }
        ],
        checkCommand: 'kubectl get pods -n kubecost | grep network-efficiency',
        expectedOutput: 'network-efficiency'
      },
      {
        id: 'step-6',
        title: 'Spot Instance Optimization',
        instruction: 'Install the AWS Target Group Binding or Azure Spot Spotter to migrate non-critical workloads to discounted Spot instances.',
        summary: 'Reduce costs with Spot instances.',
        whyNeeded: 'Spot instances are up to 90% cheaper than On-Demand. Managing them through K8s allows you to scale cost-effectively while handling preemption grace period.',
        pillarConnection: 'Cost Optimization — utilizing surplus cloud capacity for fault-tolerant workloads provides the most significant compute cost reductions.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/aws/amazon-vpc-cni-k8s/master/config/master/spot-interrupt-handler.yaml',
            explanation: 'Deploys a handler that monitors for Spot termination notices and drains pods gracefully.'
          }
        ],
        checkCommand: 'kubectl get pods | grep spot-handler',
        expectedOutput: 'spot-interrupt-handler'
      },
      {
        id: 'step-7',
        title: 'Kube-Green Carbon Reduction',
        instruction: 'Deploy kube-green to automatically shut down development environments during non-working hours.',
        summary: 'Implement green computing.',
        whyNeeded: 'Dev clusters are often idle 70% of the time. Scaling them to zero at night reduces both cloud costs and the environmental footprint of your infrastructure.',
        pillarConnection: 'Cost Optimization — extreme cost avoidance through scheduled resource termination during idle periods.',
        commands: [
          {
            text: 'kubectl apply -f https://github.com/kube-green/kube-green/releases/latest/download/kube-green.yaml',
            explanation: 'Installs the operator that manages sleep schedules for your namespaces.'
          }
        ],
        checkCommand: 'kubectl get pods -n kube-green',
        expectedOutput: 'kube-green-controller-manager'
      }
    ]
  },
  {
    projectId: '140',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Governance & Limits',
        instruction: 'Apply a ResourceQuota to the development namespace to prevent budget overruns.',
        summary: 'Implement Namespace-level resource limits.',
        whyNeeded: 'Without quotas, a single runaway process or developer error could consume the entire cluster capacity, leading to unexpected cloud billing spikes.',
        pillarConnection: 'Cost Optimization — quotas are an essential "Guardrail" in the FinOps journey to prevent runaway resource consumption.',
        commands: [
          {
            text: 'cat <<EOF > quota.yaml\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: dev-limit\n  namespace: dev\nspec:\n  hard:\n    requests.cpu: "4"\n    requests.memory: 8Gi\n    limits.cpu: "8"\n    limits.memory: 16Gi\nEOF\nkubectl apply -f quota.yaml',
            explanation: 'Defines a strict ceiling for aggregate CPU and Memory usage across the entire development namespace.'
          }
        ],
        checkCommand: 'kubectl get quota -n dev',
        expectedOutput: 'dev-limit'
      },
      {
        id: 'step-2',
        title: 'Standardizing Requests',
        instruction: 'Establish a LimitRange to ensure every pod has a minimum and maximum resource definition.',
        summary: 'Apply a LimitRange for standard pod sizing.',
        whyNeeded: 'LimitRanges prevent "Noisy Neighbor" syndrome where one pod takes all available CPU, slowing down others. They also help in accurate cost distribution calculations.',
        pillarConnection: 'Performance Efficiency — ensuring every workload has a guaranteed baseline of resources minimizes performance variability.',
        commands: [
          {
            text: 'cat <<EOF > limit-range.yaml\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: cpu-limit-range\nspec:\n  limits:\n  - default:\n      cpu: 500m\n    defaultRequest:\n      cpu: 200m\n    type: Container\nEOF\nkubectl apply -f limit-range.yaml',
            explanation: 'Creates a policy that automatically assigns CPU requests and limits to any container that doesn\'t specify them.'
          }
        ],
        checkCommand: 'kubectl get limitrange',
        expectedOutput: 'cpu-limit-range'
      },
      {
        id: 'step-3',
        title: 'Budget Alerting Policy',
        instruction: 'Define a custom budget alert to notify admins when namespace usage exceeds 80% of the quota.',
        summary: 'Set up usage alerts.',
        whyNeeded: 'Passive quotas just block deployments. Active alerting allows teams to respond to budget issues before they cause service interruptions.',
        pillarConnection: 'Operational Excellence — proactive monitoring of resource usage prevents capacity-related failures.',
        commands: [
          {
            text: 'echo "Budget alert configured: 80% threshold reached."',
            explanation: 'Simulates the configuration of an external alerting service connected to Kubernetes resource events.'
          }
        ],
        checkCommand: 'echo "OK"',
        expectedOutput: 'OK'
      },
      {
        id: 'step-4',
        title: 'Namespace Termination Policies',
        instruction: 'Configure a Terminating state limit for the dev namespace to ensure quick resource reclamation.',
        summary: 'Optimize resource reclamation.',
        whyNeeded: 'When namespaces are deleted, they can sometimes hang in "Terminating" state, holding onto cloud resources. Proper policies ensure fast cleanup.',
        pillarConnection: 'Cost Optimization — fast reclamation of cloud resources directly impacts the bottom line by stopping billing for unused assets.',
        commands: [
          {
            text: 'kubectl get namespace dev -o json | jq ".spec.finalizers = []" | kubectl replace --raw "/api/v1/namespaces/dev/finalize" -f -',
            explanation: 'Demonstrates a forced cleanup of finalizers to expedite namespace deletion and resource release.'
          }
        ],
        checkCommand: 'kubectl get ns dev',
        expectedOutput: 'NotFound'
      },
      {
        id: 'step-5',
        title: 'PriorityClass Cost Management',
        instruction: 'Create PriorityClasses to ensure critical production workloads are never evicted by low-priority development pods.',
        summary: 'Implement workload prioritization.',
        whyNeeded: 'In a resource-constrained cluster, PriorityClasses allow Kubernetes to make intelligent decisions about which pods to kill first if the node runs out of memory.',
        pillarConnection: 'Reliability — ensuring that mission-critical pods have higher priority prevents production outages during resource contention.',
        commands: [
          {
            text: 'cat <<EOF > priority.yaml\napiVersion: scheduling.k8s.io/v1\nkind: PriorityClass\nmetadata:\n  name: high-priority-prod\nvalue: 1000000\nglobalDefault: false\ndescription: "Mission critical production service."\nEOF\nkubectl apply -f priority.yaml',
            explanation: 'Defines a high-value priority weight that gives labeled pods precedence over standard workloads.'
          }
        ],
        checkCommand: 'kubectl get priorityclass',
        expectedOutput: 'high-priority-prod'
      },
      {
        id: 'step-6',
        title: 'Horizontal Pod Autoscaler (HPA) Quotas',
        instruction: 'Configure an HPA to ensure that autoscaling events do not exceed the set namespace resource quotas.',
        summary: 'Synchronize scaling and quotas.',
        whyNeeded: 'If autoscaling triggers too many pods, they will fail to start once they hit the ResourceQuota. Coordinating these two ensures your app stays within budget while still scaling.',
        pillarConnection: 'Cost Optimization — tight integration between autoscaling and budget guardrails prevents "surprising" cloud costs.',
        commands: [
          {
            text: 'kubectl autoscale deployment web-app --cpu-percent=50 --min=1 --max=5',
            explanation: 'Ensures the deployment scales up to 5 replicas but will be halted by the 16Gi memory quota if exceeded.'
          }
        ],
        checkCommand: 'kubectl get hpa',
        expectedOutput: '50%'
      },
      {
        id: 'step-7',
        title: 'Egress Cost Reduction Policies',
        instruction: 'Implement an Egress-specific Network Policy to block pods from communicating with expensive external endpoints unless whitelisted.',
        summary: 'Control external data costs.',
        whyNeeded: 'Unauthorized data transfers to the internet or across regions can significantly increase cloud spending. Controlling egress is both a security and a cost-saving measure.',
        pillarConnection: 'Cost Optimization — preventing non-essential data egress reduces variable cloud networking charges.',
        commands: [
          {
            text: 'cat <<EOF > egress-policy.yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: restrict-egress\nspec:\n  podSelector: {}\n  policyTypes:\n  - Egress\n  egress:\n  - to:\n    - ipBlock:\n        cidr: 0.0.0.0/0\n        except:\n        - 10.0.0.0/8\nEOF\nkubectl apply -f egress-policy.yaml',
            explanation: 'Defines a policy that blocks all outgoing traffic except to internal IPs by default.'
          }
        ],
        checkCommand: 'kubectl get netpol restrict-egress',
        expectedOutput: 'restrict-egress'
      }
    ]
  },
  {
    projectId: '150',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'AI Environment Preparation',
        instruction: 'Isolate your AI project dependencies using a Python virtual environment.',
        summary: 'Set up a isolated Python environment.',
        whyNeeded: 'AI libraries like LangChain and OpenAI are updated frequently. Using a virtual environment prevents version conflicts with other system-level tools.',
        pillarConnection: 'Operational Excellence — maintaining clean, isolated development environments ensures reproducible builds and easier debugging.',
        commands: [
          {
            text: 'python3 -m venv ai-env && source ai-env/bin/activate',
            explanation: 'Creates a dedicated directory for project binaries and activates the path redirection.'
          }
        ],
        checkCommand: 'ls ai-env',
        expectedOutput: 'bin'
      },
      {
        id: 'step-2',
        title: 'SDK Integration',
        instruction: 'Install the core LLM orchestration and API communication libraries.',
        summary: 'Install AI and SDK libraries.',
        whyNeeded: 'To build a functional chatbot, you need SDKs that handle the low-level API calls, retry logic, and prompt management.',
        pillarConnection: 'Reliability — using official SDKs ensures built-in handling of rate limits and API retries.',
        commands: [
          {
            text: 'pip install openai langchain langchain_community',
            explanation: 'Downloads and installs the required packages for building modern AI applications.'
          }
        ],
        checkCommand: 'pip list',
        expectedOutput: 'openai'
      },
      {
        id: 'step-3',
        title: 'Prompt Engineering & Logic',
        instruction: 'Implement a basic ChatPromptTemplate and LLMChain to handle user queries.',
        summary: 'Define the LLM interaction logic.',
        whyNeeded: 'Prompt templates allow you to define the "Persona" and "Context" of the AI, ensuring consistent and useful responses across different user sessions.',
        pillarConnection: 'Operational Excellence — using templated prompts allows for versioning and testing of AI logic without changing the core application code.',
        commands: [
          {
            text: 'cat <<EOF > chatbot.py\nfrom langchain.prompts import ChatPromptTemplate\nfrom langchain_openai import ChatOpenAI\n\ntemplate = "You are a helpful cloud architect. User says: {text}"\nprompt = ChatPromptTemplate.from_template(template)\nprint("Logic initialized.")\nEOF',
            explanation: 'Writes a Python script structure that defines the prompt engineering logic for the chatbot.'
          }
        ],
        checkCommand: 'ls chatbot.py',
        expectedOutput: 'chatbot.py'
      },
      {
        id: 'step-4',
        title: 'Vector Database Integration',
        instruction: 'Install ChromaDB to provide your AI with long-term memory and document retrieval capabilities.',
        summary: 'Set up a Vector Database.',
        whyNeeded: 'LLMs have a limited context window. Vector databases allow the AI to "search" through thousands of documents to find relevant facts before answering a question.',
        pillarConnection: 'Reliability — using RAG (Retrieval-Augmented Generation) ensures the AI provides factually grounded responses based on your own data.',
        commands: [
          {
            text: 'pip install chromadb',
            explanation: 'Installs the persistence layer for storing and querying text embeddings.'
          }
        ],
        checkCommand: 'pip list',
        expectedOutput: 'chromadb'
      },
      {
        id: 'step-5',
        title: 'RAG Pipeline Implementation',
        instruction: 'Configure a basic retrieval chain to fetch information from a local knowledge base.',
        summary: 'Implement Retrieval-Augmented Generation.',
        whyNeeded: 'RAG is the industry standard for enterprise AI. It prevents "hallucinations" by forcing the model to cite its sources from a trusted database.',
        pillarConnection: 'Security — by using local RAG, you can ensure sensitive company data is retrieved securely without sending the entire database to the LLM vendor.',
        commands: [
          {
            text: 'echo "from langchain_community.vectorstores import Chroma" >> chatbot.py',
            explanation: 'Appends vector store support to the main application script.'
          }
        ],
        checkCommand: 'grep "Chroma" chatbot.py',
        expectedOutput: 'Chroma'
      },
      {
        id: 'step-6',
        title: 'Streamlit UI for AI Interaction',
        instruction: 'Install Streamlit and build a web interface to allow users to interact with your cloud-aware chatbot.',
        summary: 'Build a user-friendly AI interface.',
        whyNeeded: 'A command-line script is hard for non-technical users. Streamlit allows you to deploy a professional chat interface in just a few lines of Python code.',
        pillarConnection: 'Operational Excellence — providing intuitive interfaces for internal tools increases adoption and user efficiency.',
        commands: [
          {
            text: 'pip install streamlit\ncat <<EOF > app.py\nimport streamlit as st\nst.title("Cloud AI Assistant")\nst.text_input("How can I help you today?")\nEOF',
            explanation: 'Installs the web framework and initializes a simple chat UI script.'
          }
        ],
        checkCommand: 'ls app.py',
        expectedOutput: 'app.py'
      },
      {
        id: 'step-7',
        title: 'AI Deployment with Docker',
        instruction: 'Containarize your AI application to ensure consistent behavior across development and production environments.',
        summary: 'Package the AI for production.',
        whyNeeded: 'AI applications have complex system-level dependencies. Docker ensures that the same version of ChromaDB, Python, and the SDKs run everywhere.',
        pillarConnection: 'Operational Excellence — containerized deployments simplify the promotion of AI models from staging to production.',
        commands: [
          {
            text: 'cat <<EOF > Dockerfile\nFROM python:3.9-slim\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD ["streamlit", "run", "app.py"]\nEOF',
            explanation: 'Defines the build steps for a production-ready AI application container.'
          }
        ],
        checkCommand: 'ls Dockerfile',
        expectedOutput: 'Dockerfile'
      }
    ]
  },
  {
    projectId: '10',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'ArgoCD Operator Installation',
        instruction: 'Install the ArgoCD operator in your cluster to manage GitOps lifecycles.',
        summary: 'Deploy ArgoCD components.',
        whyNeeded: 'ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It automates the deployment of applications by keeping the cluster state in sync with a Git repository.',
        pillarConnection: 'Operational Excellence — GitOps provides a single source of truth for both infrastructure and applications, making deployments observable and reproducible.',
        commands: [
          {
            text: 'kubectl create namespace argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
            explanation: 'Creates a dedicated namespace and applies the full suite of ArgoCD controllers and services.'
          }
        ],
        checkCommand: 'kubectl get pods -n argocd',
        expectedOutput: 'argocd-server'
      },
      {
        id: 'step-2',
        title: 'ArgoCD CLI & Authentication',
        instruction: 'Install the ArgoCD CLI, securely retrieve the initial admin password, and log in to the server.',
        summary: 'Install CLI and authenticate.',
        whyNeeded: 'While ArgoCD has a web UI, the CLI is essential for automation and CI/CD pipelines. Authenticating allows you to securely manage applications from the terminal.',
        pillarConnection: 'Security — securely managing administrative credentials is a critical component of cluster security.',
        commands: [
          {
            text: 'ARCH=$(uname -m | sed \'s/x86_64/amd64/;s/aarch64/arm64/\') && curl -sSL -o argocd "https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-${ARCH}" && sudo install -m 555 argocd /usr/local/bin/argocd',
            explanation: 'Detects the CPU architecture (amd64 for Intel/AMD, arm64 for Apple Silicon and ARM Linux) and downloads the matching binary. Hardcoding amd64 would silently install the wrong binary on ARM machines.'
          },
          {
            text: 'kubectl wait --for=condition=Available deployment/argocd-server -n argocd --timeout=300s',
            explanation: 'Blocks until the argocd-server Deployment reports Available=True — safer than a fixed sleep because it exits as soon as the server is ready rather than waiting an arbitrary number of seconds.'
          },
          {
            text: 'kubectl port-forward svc/argocd-server -n argocd 8080:443 > /dev/null 2>&1 &',
            explanation: 'Forwards localhost:8080 to the ArgoCD server HTTPS port in the background so the CLI can reach it at localhost:8080.'
          },
          {
            text: 'PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d) && argocd login localhost:8080 --username admin --password "$PASSWORD" --insecure',
            explanation: 'Decodes the auto-generated admin password from the Kubernetes secret and logs in. --insecure skips TLS verification for the self-signed cert on the local port-forward. The password is quoted to handle any special characters.'
          }
        ],
        checkCommand: 'argocd account get-user-info --insecure',
        expectedOutput: 'admin'
      },
      {
        id: 'step-3',
        title: 'Git Repository Integration',
        instruction: 'Connect ArgoCD to a sample application repository and create a new Application resource.',
        summary: 'Create an ArgoCD Application.',
        whyNeeded: 'The core of GitOps is the association between a Git path and a cluster namespace. This step tells ArgoCD exactly which manifest files it should be monitoring.',
        pillarConnection: 'Reliability — tracking state in Git ensures that the cluster configuration is versioned and reviewable.',
        commands: [
          {
            text: 'argocd app create guestbook --repo https://github.com/argoproj/argocd-example-apps.git --path guestbook --dest-server https://kubernetes.default.svc --dest-namespace default --insecure',
            explanation: 'Creates an ArgoCD Application object that tracks a sample guestbook repo.'
          }
        ],
        checkCommand: 'argocd app list --insecure',
        expectedOutput: 'guestbook'
      },
      {
        id: 'step-4',
        title: 'Manual Synchronization',
        instruction: 'Trigger a manual sync to deploy the application manifests from Git into your Kubernetes cluster.',
        summary: 'Deploy the application.',
        whyNeeded: 'By default, applications are created with a manual sync policy. This ensures that you have full control over when changes are applied to the live environment.',
        pillarConnection: 'Operational Excellence — explicit synchronization allows for validation before changing production state.',
        commands: [
          {
            text: 'argocd app sync guestbook --insecure',
            explanation: 'Instructs ArgoCD to apply the manifests from the Git repository to the Kubernetes cluster.'
          }
        ],
        checkCommand: 'argocd app get guestbook --insecure',
        expectedOutput: 'Synced'
      },
      {
        id: 'step-5',
        title: 'Configuration Drift Analysis',
        instruction: 'Simulate unauthorized changes by manually scaling the deployment, and observe how ArgoCD detects the drift.',
        summary: 'Identify environment drift.',
        whyNeeded: 'Drift happens when someone manually edits resources using kubectl instead of updating Git. ArgoCD continuously monitors for these discrepancies.',
        pillarConnection: 'Security — identifying unauthorized changes (drift) is a key part of operational auditing and security posture management.',
        commands: [
          {
            text: 'kubectl scale deployment guestbook-ui --replicas=3',
            explanation: 'Manually scales the application, creating a divergence from the Git repository state (which specifies 1 replica).'
          },
          {
            text: 'argocd app diff guestbook --insecure || true',
            explanation: 'Displays the exact differences between the live cluster and the Git manifests.'
          }
        ],
        checkCommand: 'argocd app get guestbook --insecure',
        expectedOutput: 'OutOfSync'
      },
      {
        id: 'step-6',
        title: 'Self-Healing Implementation',
        instruction: 'Enable automated sync and self-healing policies to automatically revert the manual changes.',
        summary: 'Enforce configuration immutability.',
        whyNeeded: 'Self-healing ensures that Git remains the absolute source of truth. Any manual hotfixes are immediately overwritten, forcing engineers to use the proper GitOps workflow.',
        pillarConnection: 'Reliability — automated drift correction prevents Snowflake Clusters and ensures the environment matches the audited Git history.',
        commands: [
          {
            text: 'argocd app set guestbook --sync-policy automated --self-heal --insecure',
            explanation: 'Configures the application to automatically correct any detected drift.'
          },
          {
            text: 'sleep 5 && argocd app sync guestbook --insecure',
            explanation: 'Forces a sync to ensure the self-heal policy takes effect immediately.'
          }
        ],
        checkCommand: 'argocd app get guestbook --insecure',
        expectedOutput: 'Synced'
      },
      {
        id: 'step-7',
        title: 'ArgoCD Rollouts Installation',
        instruction: 'Install the Argo Rollouts controller to enable advanced deployment strategies like Blue-Green and Canary.',
        summary: 'Enhance deployment capabilities.',
        whyNeeded: 'Standard Kubernetes Deployments lack built-in progressive delivery. Rollouts allow for fine-grained control over traffic shifting and automated rollbacks.',
        pillarConnection: 'Reliability — progressive delivery reduces the blast radius of failed deployments by testing in production with small subsets of traffic.',
        commands: [
          {
            text: 'kubectl create namespace argo-rollouts && kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml',
            explanation: 'Installs the specialized controller required for managing complex deployment strategies.'
          }
        ],
        checkCommand: 'kubectl get pods -n argo-rollouts',
        expectedOutput: 'argo-rollouts'
      },
      {
        id: 'step-8',
        title: 'Rollouts CLI Integration',
        instruction: 'Install the kubectl plugin for Argo Rollouts to manage and monitor progressive delivery.',
        summary: 'Install the Rollouts plugin.',
        whyNeeded: 'The Kubectl plugin provides a visual dashboard and specialized commands to promote or abort canary rollouts directly from the terminal.',
        pillarConnection: 'Operational Excellence — specialized tooling provides deeper visibility into complex deployment lifecycles.',
        commands: [
          {
            text: 'ARCH=$(uname -m | sed \'s/x86_64/amd64/;s/aarch64/arm64/\') && curl -LO "https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-${ARCH}" && sudo install -m 555 "kubectl-argo-rollouts-linux-${ARCH}" /usr/local/bin/kubectl-argo-rollouts',
            explanation: 'Detects CPU architecture and downloads the matching Argo Rollouts kubectl plugin binary. Once installed as kubectl-argo-rollouts, it integrates with kubectl so you can run "kubectl argo rollouts get rollout <name>" to monitor canary progress.'
          }
        ],
        checkCommand: 'kubectl-argo-rollouts version',
        expectedOutput: 'kubectl-argo-rollouts'
      }
    ]
  },
  {
    projectId: '111',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Security Scanning with Nikto',
        instruction: 'Run a Nikto scan against your web server to identify common vulnerabilities and misconfigurations.',
        summary: 'Perform a web vulnerability scan.',
        whyNeeded: 'Nikto is a comprehensive web server scanner that tests for over 6700 potentially dangerous files/programs and outdated server versions.',
        pillarConnection: 'Security — regular vulnerability scanning is a proactive measure to identify weaknesses before they can be exploited by attackers.',
        commands: [
          {
            text: 'sudo apt update && sudo apt install nikto -y',
            explanation: 'Installs the Nikto vulnerability scanner.'
          },
          {
            text: 'nikto -h http://localhost',
            explanation: 'Executes a thorough security audit of the local web server, reporting on header issues and known flaws.'
          }
        ],
        checkCommand: 'nikto -version',
        expectedOutput: 'Nikto'
      },
      {
        id: 'step-2',
        title: 'SQL Injection Prevention',
        instruction: 'Implement input validation logic in your back-end handler to mitigate SQL injection risks.',
        summary: 'Harden code against SQLi.',
        whyNeeded: 'SQL Injection allows attackers to interfere with the queries that an application makes to its database. Proper sanitization is the primary defense.',
        pillarConnection: 'Security — defense at the application layer is critical for protecting data integrity and confidentiality.',
        commands: [
          {
            text: 'echo "Implementing parameterized queries..."',
            explanation: 'Simulates the transition from vulnerable string concatenation to secure prepared statements.'
          }
        ],
        checkCommand: 'echo "Done"',
        expectedOutput: 'Done'
      },
      {
        id: 'step-3',
        title: 'Cross-Site Scripting (XSS) Mitigation',
        instruction: 'Configure Content Security Policy (CSP) headers to prevent unauthorized script execution.',
        summary: 'Set up CSP headers.',
        whyNeeded: 'XSS allows attackers to inject malicious scripts into web pages. CSP provides a declarative way to tell the browser which scripts are trusted.',
        pillarConnection: 'Security — defense-in-depth through browser-side security controls.',
        commands: [
          { text: 'sudo a2enmod headers', explanation: 'Enables the Apache headers module.' },
          { text: 'echo "Header set Content-Security-Policy \"default-src \'self\';\"" | sudo tee /etc/apache2/conf-available/security.conf', explanation: 'Restricts script execution to the same origin by default.' }
        ],
        checkCommand: 'apachectl -M | grep headers',
        expectedOutput: 'headers'
      },
      {
        id: 'step-4',
        title: 'Brute Force Protection',
        instruction: 'Install Fail2Ban to automatically block IP addresses that show signs of malicious activity.',
        summary: 'Implement intrusion prevention.',
        whyNeeded: 'Exposed services are constantly probed for weak passwords. Fail2Ban monitors logs and bans IPs that repeatedly fail authentication.',
        pillarConnection: 'Security — automated response to brute-force attacks reduces the risk of credential compromise.',
        commands: [
          {
            text: 'sudo apt install fail2ban -y',
            explanation: 'Installs the service that monitors log files and updates firewall rules to block attackers.'
          },
          {
            text: 'sudo systemctl start fail2ban',
            explanation: 'Activates the intrusion prevention service.'
          }
        ],
        checkCommand: 'systemctl is-active fail2ban',
        expectedOutput: 'active'
      },
      {
        id: 'step-5',
        title: 'Encrypted Credential Storage',
        instruction: 'Use GPG to encrypt sensitive deployment keys or configuration blocks on the local disk.',
        summary: 'Encrypt files at rest.',
        whyNeeded: 'If your server is compromised, unencrypted secret files are easily stolen. Encryption at rest ensures that even if files are accessed, they remain unreadable without the key.',
        pillarConnection: 'Security — protecting data at rest is a foundational requirement for sensitive workloads.',
        commands: [
          {
            text: 'echo "SecretPassword123" > secrets.txt && gpg -c secrets.txt',
            explanation: 'Creates a secret file and then uses symmetric encryption (GPG) to lock it with a passphrase.'
          }
        ],
        checkCommand: 'ls secrets.txt.gpg',
        expectedOutput: 'secrets.txt.gpg'
      },
      {
        id: 'step-6',
        title: 'Security Headers Hardening',
        instruction: 'Configure X-Frame-Options and X-Content-Type-Options to prevent UI redressing and MIME-sniffing attacks.',
        summary: 'Add browser security headers.',
        whyNeeded: 'Browsers rely on headers to enforce security policies. Hardening these headers prevents entire classes of client-side attacks like Clickjacking.',
        pillarConnection: 'Security — defense-in-depth through secure server configurations.',
        commands: [
          {
            text: 'echo "Header set X-Frame-Options \"DENY\"\nHeader set X-Content-Type-Options \"nosniff\"" | sudo tee -a /etc/apache2/conf-available/security.conf',
            explanation: 'Appends strict security headers to the global Apache security configuration.'
          }
        ],
        checkCommand: 'apachectl -t',
        expectedOutput: 'Syntax OK'
      },
      {
        id: 'step-7',
        title: 'Vulnerability Database (CVE) Scanning',
        instruction: 'Use the "debsecan" tool to identify installed packages with known security vulnerabilities (CVEs).',
        summary: 'Audit system for known CVEs.',
        whyNeeded: 'Even a perfectly configured server is vulnerable if the software itself has bugs. Regular CVE scanning identifies packages that need urgent security updates.',
        pillarConnection: 'Security — maintaining a clean security posture through continuous vulnerability assessment.',
        commands: [
          {
            text: 'sudo apt install debsecan -y && debsecan --suite $(lsb_release -cs) --format report',
            explanation: 'Installs the Debian Security Analyzer and generates a report of all unpatched vulnerabilities on the system.'
          }
        ],
        checkCommand: 'debsecan --help',
        expectedOutput: 'Usage'
      }
    ]
  },
  {
    projectId: '3',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Function App Initialization',
        instruction: 'Create a localized Azure Functions project for data processing using the Core Tools.',
        summary: 'Initialize a Functions project.',
        whyNeeded: 'Azure Functions allow you to run small pieces of code (functions) without worrying about application infrastructure. Initializing the project locally ensures all necessary scaffolding is in place.',
        pillarConnection: 'Cost Optimization — serverless functions only incur costs when code is executing, providing massive savings for asynchronous data workloads.',
        commands: [
          {
            text: 'func init DataPipeline --worker-runtime python',
            explanation: 'Creates a new Python-based Azure Functions project directory with host.json, local.settings.json, and requirements.txt scaffolding. The --worker-runtime flag is the correct form for Core Tools v4+.'
          }
        ],
        checkCommand: 'ls DataPipeline/ | grep host.json',
        expectedOutput: 'host.json'
      },
      {
        id: 'step-2',
        title: 'Event Hub Trigger Configuration',
        instruction: 'Define a new function that triggers on incoming messages from an Azure Event Hub.',
        summary: 'Configure a streaming event trigger.',
        whyNeeded: 'Event Hubs can ingest millions of events per second. Connecting a Function to this stream allows for real-time reactivity to high-velocity telemetry or log data.',
        pillarConnection: 'Performance Efficiency — event-driven scaling allows the processing layer to match the ingest volume of the stream precisely.',
        commands: [
          {
            text: 'cd DataPipeline && func new --name ProcessEvents --template "EventHubTrigger"',
            explanation: 'Generates the EventHubTrigger function template inside the project. The template name must match exactly — "EventHubTrigger" (no spaces) is the canonical name in Core Tools v4.'
          }
        ],
        checkCommand: 'ls ProcessEvents/ | grep __init__',
        expectedOutput: '__init__.py'
      },
      {
        id: 'step-3',
        title: 'Cosmos DB Persistence Layer',
        instruction: 'Configure an output binding for Azure Cosmos DB to store the processed telemetry data.',
        summary: 'Bind function output to a database.',
        whyNeeded: 'A data pipeline must store results for downstream analysis. Cosmos DB provides global distribution and horizontal scaling that matches the serverless nature of Functions.',
        pillarConnection: 'Reliability — using managed output bindings offloads connection management and retry logic to the Azure Functions runtime.',
        commands: [
          {
            text: 'cat <<EOF > ProcessEvents/function.json\n{\n  "scriptFile": "__init__.py",\n  "bindings": [\n    {\n      "type": "eventHubTrigger",\n      "name": "event",\n      "direction": "in",\n      "eventHubName": "myeventhub",\n      "connection": "EventHubConnection"\n    },\n    {\n      "type": "cosmosDB",\n      "direction": "out",\n      "name": "outputDocument",\n      "databaseName": "TelemetryDB",\n      "collectionName": "Events",\n      "createIfNotExists": true,\n      "connectionStringSetting": "CosmosDBConnection"\n    }\n  ]\n}\nEOF',
            explanation: 'Replaces the default function.json with one containing both the Event Hub trigger and Cosmos DB output binding. Run this from inside the DataPipeline directory (after cd in step 2).'
          }
        ],
        checkCommand: 'grep "cosmosDB" ProcessEvents/function.json',
        expectedOutput: 'cosmosDB'
      },
      {
        id: 'step-4',
        title: 'Data Transformation Logic',
        instruction: 'Implement the Python logic to process incoming event data and prepare it for database storage.',
        summary: 'Write processing and storage logic.',
        whyNeeded: 'Raw event data often needs cleaning, enrichment, or transformation before being useful for business intelligence or application state.',
        pillarConnection: 'Performance Efficiency — performing lightweight transformations in-flight reduces the need for expensive post-processing jobs.',
        commands: [
          {
            text: 'cat <<EOF > ProcessEvents/__init__.py\nimport logging\nimport azure.functions as func\n\ndef main(event: func.EventHubEvent, outputDocument: func.Out[func.Document]):\n    body = event.get_body().decode("utf-8")\n    logging.info(f"Processing event: {body}")\n    outputDocument.set(func.Document.from_json(body))\nEOF',
            explanation: 'Implements a message handler that decodes Event Hub bytes and saves them as JSON documents in Cosmos DB.'
          }
        ],
        checkCommand: 'grep "outputDocument.set" ProcessEvents/__init__.py',
        expectedOutput: 'outputDocument.set'
      },
      {
        id: 'step-5',
        title: 'Scaling & Performance Tuning',
        instruction: 'Configure batch settings in host.json to optimize the throughput of the serverless pipeline.',
        summary: 'Tune high-scale processing parameters.',
        whyNeeded: 'For high-velocity streams, processing messages one-by-one is inefficient. Batching allows the function to handle multiple events in a single execution context.',
        pillarConnection: 'Performance Efficiency — proper batch size tuning ensures maximum resource utilization and lowest latency for data processing.',
        commands: [
          {
            text: 'cat <<EOF > host.json\n{\n  "version": "2.0",\n  "logging": {\n    "applicationInsights": {\n      "samplingSettings": {\n        "isEnabled": true,\n        "excludedTypes": "Request"\n      }\n    }\n  },\n  "extensionBundle": {\n    "id": "Microsoft.Azure.Functions.ExtensionBundle",\n    "version": "[4.*, 5.0.0)"\n  },\n  "extensions": {\n    "eventHubs": {\n      "maxBatchSize": 100,\n      "prefetchCount": 200\n    }\n  }\n}\nEOF',
            explanation: 'Overwrites host.json with Event Hubs performance settings. Bundle v4 matches the Functions v4 runtime. maxBatchSize (renamed from batchSize in extension v5+) controls how many events are passed to a single function invocation.'
          }
        ],
        checkCommand: 'grep "maxBatchSize" host.json',
        expectedOutput: 'maxBatchSize'
      },
      {
        id: 'step-6',
        title: 'Application Insights Observability',
        instruction: 'Wire Application Insights into the local settings so the Functions runtime emits traces, dependencies, and exceptions automatically.',
        summary: 'Add end-to-end observability.',
        whyNeeded: 'Monitoring is essential for serverless apps where you don\'t have access to the underlying server. App Insights gives you a "map" of your data flow and highlights performance bottlenecks.',
        pillarConnection: 'Operational Excellence — using distributed tracing ensures you can troubleshoot complex event-driven architectures efficiently.',
        commands: [
          {
            text: 'cat <<EOF > local.settings.json\n{\n  "IsEncrypted": false,\n  "Values": {\n    "AzureWebJobsStorage": "UseDevelopmentStorage=true",\n    "FUNCTIONS_WORKER_RUNTIME": "python",\n    "APPINSIGHTS_INSTRUMENTATIONKEY": "<your-instrumentation-key>"\n  }\n}\nEOF',
            explanation: 'Sets the APPINSIGHTS_INSTRUMENTATIONKEY in local settings. The Azure Functions host automatically detects this key and routes all telemetry — invocations, exceptions, and dependencies — to Application Insights without any code changes.'
          }
        ],
        checkCommand: 'grep "APPINSIGHTS_INSTRUMENTATIONKEY" local.settings.json',
        expectedOutput: 'APPINSIGHTS_INSTRUMENTATIONKEY'
      },
      {
        id: 'step-7',
        title: 'Managed Identity Security',
        instruction: 'Assign a system-managed identity to the Function App and grant it the Cosmos DB data contributor role, eliminating the need for connection strings.',
        summary: 'Secure data access with Identity.',
        whyNeeded: 'Keys and connection strings can be leaked. Azure Managed Identities allow resources to authenticate with each other using Entra ID (Azure AD), which is more secure and easier to manage.',
        pillarConnection: 'Security — using identity-based access instead of static secrets follows the Zero-Trust security model.',
        commands: [
          {
            text: 'az functionapp identity assign --name CloudLabs-Function --resource-group Labs-RG',
            explanation: 'Enables the system-assigned managed identity on the Function App. This creates a service principal in Entra ID automatically.'
          },
          {
            text: 'PRINCIPAL_ID=$(az functionapp identity show --name CloudLabs-Function --resource-group Labs-RG --query principalId -o tsv)\nCOSMOS_ID=$(az cosmosdb show --name cloudlabs-cosmos --resource-group Labs-RG --query id -o tsv)\naz cosmosdb sql role assignment create --account-name cloudlabs-cosmos --resource-group Labs-RG --role-definition-id 00000000-0000-0000-0000-000000000002 --principal-id $PRINCIPAL_ID --scope $COSMOS_ID',
            explanation: 'Grants the function identity the built-in "Cosmos DB Built-in Data Contributor" role (id: ...0002) on the Cosmos DB account. Without this step, the identity exists but has no permissions — the binding will still fail.'
          }
        ],
        checkCommand: 'az functionapp identity show --name CloudLabs-Function --resource-group Labs-RG --query type -o tsv',
        expectedOutput: 'SystemAssigned'
      },
      {
        id: 'step-8',
        title: 'CD Pipeline Deployment',
        instruction: 'Initialize a local Azure DevOps pipeline file to automate the deployment of your function code.',
        summary: 'Automate serverless deployments.',
        whyNeeded: 'Manual deployments via Core Tools are fine for dev, but production requires automated CI/CD to ensure consistent code quality and environmental audit trails.',
        pillarConnection: 'Operational Excellence — automated release pipelines ensure that infrastructure changes are predictable and reversible.',
        commands: [
          {
            text: 'cat <<EOF > azure-pipelines.yml\ntrigger:\n- main\npool:\n  vmImage: ubuntu-latest\nsteps:\n- task: UsePythonVersion@0\n  inputs:\n    versionSpec: "3.11"\n- script: |\n    pip install -r DataPipeline/requirements.txt --target=".python_packages/lib/site-packages"\n  displayName: "Install dependencies"\n- task: ArchiveFiles@2\n  inputs:\n    rootFolderOrFile: "DataPipeline"\n    includeRootFolder: false\n    archiveFile: "$(Build.ArtifactStagingDirectory)/DataPipeline.zip"\n- task: AzureFunctionApp@1\n  inputs:\n    azureSubscription: "Labs-Service-Connection"\n    appType: "functionAppLinux"\n    appName: "CloudLabs-Function"\n    package: "$(Build.ArtifactStagingDirectory)/DataPipeline.zip"\nEOF',
            explanation: 'Creates a complete pipeline: sets the Python version, installs dependencies into the expected .python_packages path, zips the function app, then deploys. Without the build steps, AzureFunctionApp@1 has no artifact to deploy and the pipeline fails.'
          }
        ],
        checkCommand: 'ls azure-pipelines.yml',
        expectedOutput: 'azure-pipelines.yml'
      }
    ]
  },
  {
    projectId: '9',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Istio Control Plane Installation',
        instruction: 'Download the Istio binary and install the minimal "default" profile into your cluster.',
        summary: 'Deploy Istio service mesh.',
        whyNeeded: 'Istio provides a dedicated infrastructure layer for managing service-to-service communication, including security and observability.',
        pillarConnection: 'Reliability — service meshes provide automatic retries and circuit breakers to handle distributed failures gracefully.',
        commands: [
          { text: 'curl -sL https://istio.io/downloadIstio | sh - && sudo cp istio-*/bin/istioctl /usr/local/bin/', explanation: 'Downloads the latest Istio package and installs the command line tool globally.' },
          { text: 'istioctl install --set profile=demo -y', explanation: 'Installs the Istio components into the cluster using the demo configuration.' }
        ],
        checkCommand: 'kubectl get pods -n istio-system',
        expectedOutput: 'istiod'
      },
      {
        id: 'step-2',
        title: 'Sidecar Proxy Injection',
        instruction: 'Enable automatic sidecar injection for the "default" namespace to intercept all traffic.',
        summary: 'Enable Istio sidecars.',
        whyNeeded: 'Istio works by injecting an Envoy proxy alongside every pod. This proxy intercepts and controls all incoming and outgoing network traffic.',
        pillarConnection: 'Security — sidecars allow for transparent mutual TLS (mTLS) between services without modifying app code.',
        commands: [
          { text: 'kubectl label namespace default istio-injection=enabled', explanation: 'Adds a label to the namespace that tells Istio to inject proxies into new pods.' }
        ],
        checkCommand: 'kubectl get namespace default --show-labels',
        expectedOutput: 'istio-injection=enabled'
      },
      {
        id: 'step-3',
        title: 'Traffic Management with VirtualServices',
        instruction: 'Apply a VirtualService to route 80% of traffic to v1 and 20% to v2 (Canary Deployment).',
        summary: 'Configure canary routing.',
        whyNeeded: 'Canary deployments allow you to test new features on a small percentage of users before a full rollout, minimizing the impact of potential bugs.',
        pillarConnection: 'Reliability — Istio enables advanced traffic steering without requiring application code changes.',
        commands: [
          { text: 'cat <<\'EOF\' > canary-virtualservice.yaml\napiVersion: networking.istio.io/v1beta1\nkind: VirtualService\nmetadata:\n  name: canary-route\nspec:\n  hosts:\n  - my-service\n  http:\n  - route:\n    - destination:\n        host: my-service\n        subset: v1\n      weight: 80\n    - destination:\n        host: my-service\n        subset: v2\n      weight: 20\nEOF', explanation: 'Generates the declarative manifest defining the canary routing percentages. Uses the v1beta1 API version — v1alpha3 is deprecated in Istio 1.22+.' },
          { text: 'kubectl apply -f canary-virtualservice.yaml', explanation: 'Applies the routing rule that splits traffic between two versions of your service.' }
        ],
        checkCommand: 'kubectl get virtualservice',
        expectedOutput: 'canary-route'
      },
      {
        id: 'step-4',
        title: 'Mutual TLS (mTLS) Enforcement',
        instruction: 'Apply a PeerAuthentication policy to enforce encrypted communication between all services in the mesh.',
        summary: 'Enforce cluster-wide mTLS.',
        whyNeeded: 'Zero-Trust networking requires that every connection is encrypted and authenticated. mTLS handles this automatically for every pod in the mesh.',
        pillarConnection: 'Security — encrypting service-to-service traffic protects against internal sniffing and spoofing attacks.',
        commands: [
          {
            text: 'cat <<\'EOF\' > mtls-strict.yaml\napiVersion: security.istio.io/v1beta1\nkind: PeerAuthentication\nmetadata:\n  name: default\n  namespace: istio-system\nspec:\n  mtls:\n    mode: STRICT\nEOF\nkubectl apply -f mtls-strict.yaml',
            explanation: 'Forces all services to communicate via encrypted mutual TLS, rejecting any unencrypted (plaintext) traffic.'
          }
        ],
        checkCommand: 'kubectl get peerauthentication -n istio-system',
        expectedOutput: 'default'
      },
      {
        id: 'step-5',
        title: 'Circuit Breaking for Resilience',
        instruction: 'Configure a DestinationRule with a circuit breaker to prevent cascading failures during service outages.',
        summary: 'Implement circuit breaking.',
        whyNeeded: 'If a service becomes slow or unresponsive, many incoming requests will pile up and potentially crash the calling service. A circuit breaker "trips" and fails fast to protect the rest of the system.',
        pillarConnection: 'Reliability — circuit breakers isolate unhealthy instances and prevent small failures from collapsing the entire microservices architecture.',
        commands: [
          {
            text: 'cat <<\'EOF\' > circuit-breaker.yaml\napiVersion: networking.istio.io/v1beta1\nkind: DestinationRule\nmetadata:\n  name: web-cb\nspec:\n  host: web-service\n  trafficPolicy:\n    connectionPool:\n      http:\n        http1MaxPendingRequests: 1\n        maxRequestsPerConnection: 1\nEOF\nkubectl apply -f circuit-breaker.yaml',
            explanation: 'Limits the number of concurrent connections to the service, forcing a failure response if the system is overloaded.'
          }
        ],
        checkCommand: 'kubectl get destinationrule',
        expectedOutput: 'web-cb'
      },
      {
        id: 'step-6',
        title: 'Observability with Kiali',
        instruction: 'Install the Kiali dashboard to visualize your service mesh topology and traffic health.',
        summary: 'Visualize the service mesh.',
        whyNeeded: 'Understanding complex microservice interactions is impossible through logs alone. Kiali provides a real-time map of how services talk to each other.',
        pillarConnection: 'Operational Excellence — clear visualization of architecture reduces MTTR (Mean Time To Recovery) during network incidents.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.22/samples/addons/kiali.yaml',
            explanation: 'Deploys the Kiali server and web interface into the istio-system namespace. Uses the release-1.22 branch to match the current stable Istio version.'
          }
        ],
        checkCommand: 'kubectl get pods -n istio-system',
        expectedOutput: 'kiali'
      },
      {
        id: 'step-7',
        title: 'Egress Traffic Control',
        instruction: 'Configure an Egress Gateway to strictly control how services communicate with external APIs.',
        summary: 'Hardened egress security.',
        whyNeeded: 'By default, pods can call any internet address. An Egress Gateway forces all external traffic through a single exit point for auditing and filtering.',
        pillarConnection: 'Security — controlling egress prevents data exfiltration and ensures compliance with strict regulatory requirements.',
        commands: [
          {
            text: 'cat <<\'EOF\' > egress-gateway.yaml\napiVersion: networking.istio.io/v1beta1\nkind: Gateway\nmetadata:\n  name: istio-egressgateway\nspec:\n  selector:\n    istio: egressgateway\n  servers:\n  - port:\n      number: 80\n      name: http\n      protocol: HTTP\n    hosts:\n    - "edition.cnn.com"\nEOF\nkubectl apply -f egress-gateway.yaml',
            explanation: 'Defines a controlled exit point for traffic authorized to reach the specified external host.'
          }
        ],
        checkCommand: 'kubectl get gateway istio-egressgateway',
        expectedOutput: 'egressgateway'
      }
    ]
  },
  {
    projectId: '11',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Prowler Engine Installation',
        instruction: 'Install Prowler using the Python package manager to prepare the auditing environment.',
        summary: 'Install the Prowler security tool.',
        whyNeeded: 'Prowler is a powerful open-source tool for cloud security best practices and compliance auditing. Installation is the prerequisite for all scanning operations.',
        pillarConnection: 'Security — automation of security audits is a core principle for maintaining a secure environment at scale.',
        commands: [
          {
            text: 'pip install prowler',
            explanation: 'Installs the Prowler security auditing engine and its dependencies.'
          }
        ],
        checkCommand: 'prowler --version',
        expectedOutput: 'Prowler'
      },
      {
        id: 'step-2',
        title: 'AWS Identity Provisioning',
        instruction: 'Configure the necessary AWS credentials file to allow Prowler to authenticate against the target cloud environment.',
        summary: 'Configure AWS credentials.',
        whyNeeded: 'Prowler requires programmatic access to AWS APIs to inspect resources. Securely managing these credentials is vital for the tool to function.',
        pillarConnection: 'Security — using dedicated, scoped IAM roles or credentials for auditing follows the principle of least privilege.',
        commands: [
          {
            text: 'mkdir -p ~/.aws && cat <<\'EOF\' > ~/.aws/credentials\n[default]\naws_access_key_id = AKIAIOSFODNN7EXAMPLE\naws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\nEOF',
            explanation: 'Creates a standard AWS credentials profile for Prowler to use during execution.'
          }
        ],
        checkCommand: 'cat ~/.aws/credentials',
        expectedOutput: 'AKIAIOSFODNN7EXAMPLE'
      },
      {
        id: 'step-3',
        title: 'Compliance Framework Audit',
        instruction: 'List the available compliance frameworks to verify the CIS AWS Foundations Benchmark is loaded, then save the output.',
        summary: 'Verify CIS benchmark modules.',
        whyNeeded: 'CIS benchmarks are industry-standard safety guidelines. Verifying that these modules are loaded ensures the scan will cover critical misconfigurations.',
        pillarConnection: 'Security — regular auditing against gold-standard benchmarks reduces the overall risk of a breach.',
        commands: [
          {
            text: 'prowler aws --list-compliance > compliance_modules.txt',
            explanation: 'Queries the engine for all supported compliance frameworks (like CIS, HIPAA, SOC2) and writes them to a file.'
          }
        ],
        checkCommand: 'grep "cis" compliance_modules.txt',
        expectedOutput: 'cis'
      },
      {
        id: 'step-4',
        title: 'Targeted Resource Scanning',
        instruction: 'Run a targeted scan specifically for S3 bucket public access vulnerabilities and output the logs.',
        summary: 'Scan for S3 vulnerabilities.',
        whyNeeded: 'Full account scans can take hours. Targeted scanning allows security engineers to quickly verify the posture of high-risk services like S3 after a deployment.',
        pillarConnection: 'Performance Efficiency — targeting specific services drastically reduces scan time and API rate limiting issues.',
        commands: [
          {
            text: 'prowler aws --services s3 > s3_scan.log 2>&1 || true',
            explanation: 'Executes a security scan restricted entirely to Amazon S3 buckets and policies.'
          }
        ],
        checkCommand: 'ls s3_scan.log',
        expectedOutput: 's3_scan.log'
      },
      {
        id: 'step-5',
        title: 'Security Hub Integration',
        instruction: 'Export scan results using the ASFF format so they can be ingested directly into AWS Security Hub.',
        summary: 'Generate ASFF security reports.',
        whyNeeded: 'HTML reports are hard to track over time. Sending data in Amazon Security Finding Format (ASFF) allows centralized tracking and automated remediation via EventBridge.',
        pillarConnection: 'Operational Excellence — using standardized security endpoints ensures that findings are actionable and integrated into the broader IT governance framework.',
        commands: [
          {
            text: 'prowler aws --services ec2 -M json-asff > asff_export.log 2>&1 || true',
            explanation: 'Generates a machine-readable JSON output natively formatted for AWS Security Hub.'
          }
        ],
        checkCommand: 'ls asff_export.log',
        expectedOutput: 'asff_export.log'
      },
      {
        id: 'step-6',
        title: 'Custom Security Checks',
        instruction: 'Create a custom Prowler check definition to enforce internal corporate tagging standards.',
        summary: 'Implement tailored compliance rules.',
        whyNeeded: 'Generic benchmarks don\'t catch everything. Custom checks allow you to enforce specific internal standards, such as mandatory tagging or restricted instance types.',
        pillarConnection: 'Operational Excellence — customizing security tools to the specific needs of the business ensures better alignment with corporate policies.',
        commands: [
          {
            text: 'mkdir -p custom_checks && echo "check_description: Verify private subnet tagging" > custom_checks/subnet_tag_check.yaml',
            explanation: 'Sets up the directory structure and definition for user-defined auditing logic.'
          }
        ],
        checkCommand: 'ls custom_checks/ | grep subnet_tag_check',
        expectedOutput: 'subnet_tag_check.yaml'
      },
      {
        id: 'step-7',
        title: 'Multi-Account Role Assumption',
        instruction: 'Define a shell script that automates Prowler scanning across multiple AWS accounts using cross-account IAM roles.',
        summary: 'Scale compliance auditing.',
        whyNeeded: 'Enterprise environments often have hundreds of accounts. Cross-account IAM roles allow a central security hub to automatically audit the entire organization without managing multiple keys.',
        pillarConnection: 'Security — centralizing security oversight ensures that no "Dark Accounts" or unmanaged environments exist without audit coverage.',
        commands: [
          {
            text: 'cat <<\'EOF\' > multi_account_scan.sh\n#!/bin/bash\nfor account in "111111111111" "222222222222"; do\n  echo "Scanning $account..."\n  prowler aws --role arn:aws:iam::$account:role/ProwlerAuditRole\ndone\nEOF\nchmod +x multi_account_scan.sh',
            explanation: 'Creates an automation script that loops through target accounts and assumes their respective audit roles.'
          }
        ],
        checkCommand: 'grep "prowler aws --role" multi_account_scan.sh',
        expectedOutput: 'ProwlerAuditRole'
      }
    ]
  },
  {
    projectId: '12',
    environment: 'azure',
    steps: [
      {
        id: 'step-1',
        title: 'Gateway Subnet Allocation',
        instruction: 'Create the mandatory GatewaySubnet in your Azure VNet to host the VPN infrastructure.',
        summary: 'Prepare the network for VPN termination.',
        whyNeeded: 'Azure VPN Gateways requires a very specific subnet name. Setting this up correctly is a fundamental requirement for site-to-site connectivity.',
        pillarConnection: 'Reliability — following cloud vendor architectural requirements ensures service stability and supportability.',
        commands: [
          {
            text: 'az network vnet subnet create -g Labs-RG --vnet-name HubVNet -n GatewaySubnet --address-prefix 10.0.255.0/27',
            explanation: 'Creates a dedicated network segment for the encrypted VPN gateway components.'
          }
        ],
        checkCommand: 'az network vnet subnet show -g Labs-RG --vnet-name HubVNet -n GatewaySubnet',
        expectedOutput: 'GatewaySubnet'
      },
      {
        id: 'step-2',
        title: 'Virtual Network Gateway Deployment',
        instruction: 'Deploy the VpnGw1 SKU to handle incoming encrypted traffic from your remote site.',
        summary: 'Deploy the VPN endpoint.',
        whyNeeded: 'The gateway engine manages the tunnels, encryption, and routing for your hybrid cloud traffic.',
        pillarConnection: 'Security — the gateway ensures all traffic entering your cloud network over the public internet is AES-256 encrypted.',
        commands: [
          {
            text: 'az network vnet-gateway create -g Labs-RG --name HubVPNGW --vnet HubVNet --public-ip-address HubGWIP --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --no-wait',
            explanation: 'Triggers the background deployment of the managed VPN service in Azure.'
          }
        ],
        checkCommand: 'az network vnet-gateway show -g Labs-RG --name HubVPNGW',
        expectedOutput: 'HubVPNGW'
      },
      {
        id: 'step-3',
        title: 'Local Network Gateway definition',
        instruction: 'Define the configuration of your on-premises VPN device within Azure.',
        summary: 'Represent the remote site in Azure.',
        whyNeeded: 'Azure needs to know the public IP and the local address space of your on-premises network to establish the tunnel correctly.',
        pillarConnection: 'Reliability — precise definition of remote networking parameters is essential for stable site-to-site connectivity.',
        commands: [
          {
            text: 'az network local-gateway create -g Labs-RG --name OnPremLNG --gateway-ip-address 203.0.113.1 --address-prefixes 192.168.1.0/24',
            explanation: 'Creates a logical object representing the physical VPN hardware at your remote office.'
          }
        ],
        checkCommand: 'az network local-gateway show -g Labs-RG --name OnPremLNG',
        expectedOutput: 'OnPremLNG'
      },
      {
        id: 'step-4',
        title: 'Secure Connection Establishment',
        instruction: 'Create the site-to-site connection between your Azure Gateway and the Local Gateway using a pre-shared key (PSK).',
        summary: 'Initialize the encrypted tunnel.',
        whyNeeded: 'This step binds the Azure side and the on-prem side together, finalizing the IPSec tunnel parameters.',
        pillarConnection: 'Security — the use of strong pre-shared keys and transit encryption ensures private communication over public infrastructure.',
        commands: [
          {
            text: 'az network vpn-connection create -g Labs-RG --name HubToOnPrem --vnet-gateway1 HubVPNGW --local-network-gateway2 OnPremLNG --shared-key "MyVerySecretKey123"',
            explanation: 'Establishes the logical connection and starts the IKE phase negotiation.'
          }
        ],
        checkCommand: 'az network vpn-connection show -g Labs-RG --name HubToOnPrem',
        expectedOutput: 'HubToOnPrem'
      },
      {
        id: 'step-5',
        title: 'BGP Dynamic Routing',
        instruction: 'Configure Border Gateway Protocol (BGP) on your connection to enable automatic route propagation between on-prem and Azure.',
        summary: 'Enable dynamic routing.',
        whyNeeded: 'Static routes are hard to manage and prone to human error. BGP allows your networks to "talk" to each other and automatically update routing tables as your infrastructure grows.',
        pillarConnection: 'Reliability — dynamic routing protocols automatically reroute traffic during path failures, improving hybrid cloud resilience.',
        commands: [
          {
            text: 'az network vpn-connection update -g Labs-RG --name HubToOnPrem --enable-bgp true',
            explanation: 'Enables BGP protocol for the specified VPN connection.'
          }
        ],
        checkCommand: 'az network vpn-connection show -g Labs-RG --name HubToOnPrem | grep enableBgp',
        expectedOutput: 'true'
      },
      {
        id: 'step-6',
        title: 'VPN ExpressRoute Failover',
        instruction: 'Configure the VPN Gateway to use a specific ASN to act as a backup path for an existing ExpressRoute circuit.',
        summary: 'Implement hybrid network redundancy.',
        whyNeeded: 'ExpressRoute provides high speed, but if the physical cable is cut, your business stops. VPN acting as a failover ensures that critical traffic can still reach Azure over the public internet.',
        pillarConnection: 'Reliability — multi-path connectivity via different providers/technologies is the only way to achieve 99.99% network availability.',
        commands: [
          {
            text: 'az network vnet-gateway update -g Labs-RG --name HubVPNGW --asn 65010',
            explanation: 'Updates the BGP Autonomous System Number (ASN) on the gateway, which is essential for routing failover scenarios.'
          }
        ],
        checkCommand: 'az network vnet-gateway show -g Labs-RG --name HubVPNGW | grep asn',
        expectedOutput: '65010'
      },
      {
        id: 'step-7',
        title: 'VNet Peering & Transit Routing',
        instruction: 'Configure VNet Peering to allow other virtual networks to use the VPN Gateway as a transit hub.',
        summary: 'Enable Hub-and-Spoke networking.',
        whyNeeded: 'You don\'t want to build a VPN for every VNet. Hub-and-Spoke architecture allows multiple VNets to share a single, expensive VPN gateway, significantly reducing costs.',
        pillarConnection: 'Cost Optimization — sharing high-cost networking infrastructure across multiple environments reduces the total cost of ownership (TCO).',
        commands: [
          {
            text: 'az network vnet peering create -g Labs-RG --name HubToSpoke --vnet-name HubVNet --remote-vnet SpokeVNet --allow-vnet-access --allow-gateway-transit',
            explanation: 'Connects two networks and allows the "Spoke" network to use the "Hub\'s" existing VPN connection.'
          }
        ],
        checkCommand: 'az network vnet peering show -g Labs-RG --name HubToSpoke --vnet-name HubVNet',
        expectedOutput: 'HubToSpoke'
      }
    ]
  },
  {
    projectId: '128',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Checkmarx CLI Installation',
        instruction: 'Download and install the Checkmarx AST (Application Security Testing) CLI tool.',
        summary: 'Install the secure coding scanner.',
        whyNeeded: 'Checkmarx provides static analysis capabilities to identify vulnerabilities in source code before it is compiled or deployed.',
        pillarConnection: 'Security — identifying vulnerabilities early in the software development life cycle (SDLC) is a key part of Shift-Left security.',
        commands: [
          {
            text: 'curl -L https://github.com/Checkmarx/ast-cli/releases/latest/download/ast-cli_linux_x64.tar.gz | tar -xz',
            explanation: 'Downloads the latest Checkmarx AST CLI and extracts the binary to the current directory.'
          }
        ],
        checkCommand: './cx version',
        expectedOutput: 'Checkmarx AST CLI'
      },
      {
        id: 'step-2',
        title: 'Project Authentication',
        instruction: 'Configure the CLI with your API key to authenticate with the Checkmarx Cloud tenant.',
        summary: 'Authenticate the security scanner.',
        whyNeeded: 'Secure communication with the Checkmarx platform is required to upload code for analysis and retrieve security reports.',
        pillarConnection: 'Security — proper authentication ensures that only authorized security tools can interact with your source code audit records.',
        commands: [
          {
            text: './cx configure set --prop "base_uri=https://ast.checkmarx.net" --prop "api_key=$CX_API_KEY"',
            explanation: 'Sets the connection parameters for the Checkmarx platform.'
          }
        ],
        checkCommand: './cx configure show',
        expectedOutput: 'https://ast.checkmarx.net'
      },
      {
        id: 'step-3',
        title: 'Source Code Scanning',
        instruction: 'Initiate a full SAST scan on your project directory, targeting key high-risk languages.',
        summary: 'Perform a static analysis scan.',
        whyNeeded: 'SAST scans analyze every possible execution path in your code, finding flaws like SQL Injection, XSS, and hardcoded credentials.',
        pillarConnection: 'Security — deep code analysis prevents logical and syntax-based security flaws from reaching production.',
        commands: [
          {
            text: './cx scan create --project-name "CloudLabs-App" --sources . --branch "main"',
            explanation: 'Starts a new scanning job for the current directory and tracks it under the specified project and branch.'
          }
        ],
        checkCommand: './cx scan list --project-name "CloudLabs-App"',
        expectedOutput: 'Completed'
      },
      {
        id: 'step-4',
        title: 'Vulnerability Analysis',
        instruction: 'Retrieve and analyze the scan results, focusing on "High" and "Critical" findings.',
        summary: 'Review security findings.',
        whyNeeded: 'Scanning is only the first part. Security engineers must review findings to separate true vulnerabilities from false positives and prioritize remediation.',
        pillarConnection: 'Security — prioritized risk management ensures that the most dangerous flaws are fixed first.',
        commands: [
          {
            text: './cx results show --scan-id $(./cx scan list --project-name "CloudLabs-App" --format json | jq -r ".[0].ID") --format list',
            explanation: 'Displays the found vulnerabilities in a human-readable list format from the latest successful scan.'
          }
        ],
        checkCommand: 'echo "Review complete"',
        expectedOutput: 'Review complete'
      },
      {
        id: 'step-5',
        title: 'CI/CD Pipeline Integration',
        instruction: 'Add Checkmarx gate-keeping to your build script to fail builds if critical vulnerabilities are found.',
        summary: 'Implement security gatekeeping.',
        whyNeeded: 'Automated security gates prevent developers from merging insecure code into the main branch, enforcing a "Security by Default" culture.',
        pillarConnection: 'Operational Excellence — integrating security into the CI/CD pipeline ensures consistent compliance monitoring without manual effort.',
        commands: [
          {
            text: 'export CX_SCAN_ID=$(./cx scan create --project-name "CloudLabs-App" --sources . --branch "main" --format json | jq -r ".ID")\n./cx results show --scan-id $CX_SCAN_ID --format list | grep -i "High"',
            explanation: 'Runs a scan and then searches the results for any "High" severity issues, which can be used to return a non-zero exit code to fail a build.'
          }
        ],
        checkCommand: 'echo "Pipeline integration verified"',
        expectedOutput: 'Pipeline integration verified'
      },
      {
        id: 'step-6',
        title: 'Software Composition Analysis (SCA)',
        instruction: 'Trigger a Snyk/Checkmarx SCA scan to identify vulnerabilities in your third-party dependencies.',
        summary: 'Sanitize transitive dependencies.',
        whyNeeded: 'Modern apps are 80% open-source libraries. SCA ensures that the packages you import are not bringing known vulnerabilities into your application.',
        pillarConnection: 'Security — managing supply chain risk is vital for end-to-end application protection.',
        commands: [
          {
            text: './cx scan create --project-name "CloudLabs-App" --sources . --sca-scan --branch "main"',
            explanation: 'Initiates a Software Composition Analysis (SCA) scan alongside the standard SAST audit.'
          }
        ],
        checkCommand: './cx scan list --project-name "CloudLabs-App"',
        expectedOutput: 'SCA'
      },
      {
        id: 'step-7',
        title: 'Infrastructure as Code (IaC) Scanning',
        instruction: 'Use Checkmarx KICS to identify security vulnerabilities in your Terraform, Kubernetes, and Docker files.',
        summary: 'Implement IaC security scanning.',
        whyNeeded: 'Vulnerabilities in infrastructure code can lead to exposed databases or open ports. Scanning IaC ensures that your "environment" is as secure as your "code".',
        pillarConnection: 'Security — identifying misconfigurations in infrastructure templates before they are deployed prevents environmental security gaps.',
        commands: [
          {
            text: 'docker run -v $(pwd):/path checkmarx/kics:latest scan -p /path -o /path/results.json',
            explanation: 'Executes the Keeping Infrastructure as Code Secure (KICS) scanner to find cloud misconfigurations in your manifests.'
          }
        ],
        checkCommand: 'ls results.json',
        expectedOutput: 'results.json'
      },
      {
        id: 'step-8',
        title: 'API Security Testing',
        instruction: 'Initiate a Checkmarx API Security scan to discover all exposed endpoints and verify their authentication status.',
        summary: 'Audit API surface area.',
        whyNeeded: 'Undocumented or "shadow" APIs are a major security risk. Automated API discovery ensures every touchpoint is identified and properly protected.',
        pillarConnection: 'Security — comprehensive visibility into the API attack surface prevents unauthorized access to application data.',
        commands: [
          {
            text: './cx api-security scan --project-name "CloudLabs-App" --apispec swagger.json',
            explanation: 'Analyzes your API definition file to identify broken object-level authorization (BOLA) and other API-specific risks.'
          }
        ],
        checkCommand: 'echo "API Security Verified"',
        expectedOutput: 'API Security Verified'
      }
    ]
  },
  {
    projectId: 'web-server-setup',
    environment: 'linux',
    description: 'Build a production-style LAMP stack on a fresh Ubuntu host: install and harden Apache, MySQL, and PHP, create a least-privilege application database, and validate the full request path with a real PHP page.',
    objective: 'By the end of this lab you will have a working Linux + Apache + MySQL + PHP server with HTTP firewall rules, a hardened database, an app-scoped DB user, and an end-to-end smoke test confirming the stack serves dynamic content.',
    steps: [
      {
        id: 'step-1',
        title: 'Update Package Index',
        instruction: 'Refresh the local package index so APT can install the latest versions of Apache, MySQL, and PHP.',
        summary: 'Sync the package metadata before installing the LAMP components.',
        whyNeeded: 'Installing software without an up-to-date package index can pull in stale or missing packages and break dependency resolution.',
        pillarConnection: 'Operational Excellence — keeping package metadata current is the first guardrail against drifted, unreproducible builds.',
        commands: [
          {
            text: 'sudo apt-get update',
            explanation: 'Downloads the latest package lists from the configured Ubuntu/Debian repositories.'
          }
        ],
        checkCommand: 'echo "package index refreshed"',
        expectedOutput: 'package index refreshed'
      },
      {
        id: 'step-2',
        title: 'Install Apache HTTP Server',
        instruction: 'Install the Apache2 web server — the "A" in LAMP — and enable it to start on boot.',
        summary: 'Provision the HTTP layer that will serve your PHP application.',
        whyNeeded: 'Apache is the web server that accepts HTTP requests on port 80 and routes them to your application. Without it, the stack has no front door.',
        pillarConnection: 'Reliability — running Apache as a managed systemd service ensures it auto-restarts after a crash or reboot.',
        commands: [
          {
            text: 'sudo apt-get install -y apache2',
            explanation: 'Installs Apache2 and its default configuration.'
          },
          {
            text: 'sudo systemctl enable --now apache2',
            explanation: 'Starts Apache immediately and enables it to launch on every boot.'
          }
        ],
        checkCommand: 'systemctl is-active apache2',
        expectedOutput: 'active'
      },
      {
        id: 'step-3',
        title: 'Open the Web Firewall',
        instruction: 'Allow inbound HTTP and HTTPS traffic through UFW so Apache can be reached from the network.',
        summary: 'Permit web traffic at the host firewall.',
        whyNeeded: 'A LAMP server with a closed firewall serves nothing. UFW rules explicitly authorize the ports your application listens on.',
        pillarConnection: 'Security — least-privilege firewall rules limit exposure to only the services that must be reachable.',
        commands: [
          {
            text: 'sudo ufw allow "Apache Full"',
            explanation: 'Opens TCP 80 and 443 using UFW\'s built-in Apache profile.'
          }
        ],
        checkCommand: 'sudo ufw status | grep "Apache Full"',
        expectedOutput: 'Apache Full'
      },
      {
        id: 'step-4',
        title: 'Install MySQL Server',
        instruction: 'Install MySQL — the "M" in LAMP — to act as the application\'s relational database.',
        summary: 'Provision the database layer.',
        whyNeeded: 'Most LAMP applications persist state (users, posts, sessions) in MySQL. The database must be running before the PHP code can connect to it.',
        pillarConnection: 'Reliability — a managed database service ensures durable storage with crash recovery built in.',
        commands: [
          {
            text: 'sudo apt-get install -y mysql-server',
            explanation: 'Installs the MySQL server package and starts the mysql.service unit.'
          },
          {
            text: 'sudo systemctl enable --now mysql',
            explanation: 'Ensures MySQL is started now and on every boot.'
          }
        ],
        checkCommand: 'systemctl is-active mysql',
        expectedOutput: 'active'
      },
      {
        id: 'step-5',
        title: 'Harden MySQL',
        instruction: 'Run the bundled security script to remove anonymous users, disable remote root login, and drop the test database.',
        summary: 'Apply baseline database hardening.',
        whyNeeded: 'Default MySQL installs ship with insecure settings that are common targets for automated scanners and bots.',
        pillarConnection: 'Security — eliminating default credentials and unused accounts shrinks the attack surface dramatically.',
        commands: [
          {
            text: 'sudo mysql_secure_installation',
            explanation: 'Interactive helper that walks through password policy, anonymous user removal, and the test schema cleanup.'
          }
        ],
        checkCommand: 'echo "mysql hardened"',
        expectedOutput: 'mysql hardened'
      },
      {
        id: 'step-6',
        title: 'Create Application Database & User',
        instruction: 'Create a dedicated database and a least-privilege user for the application instead of using the root account.',
        summary: 'Provision an app-scoped MySQL identity.',
        whyNeeded: 'Applications should never connect as root. A dedicated user with grants limited to a single schema contains the blast radius of any compromise.',
        pillarConnection: 'Security — least-privilege database credentials are a core LAMP best practice.',
        commands: [
          {
            text: 'sudo mysql -e "CREATE DATABASE lampapp; CREATE USER \'lampuser\'@\'localhost\' IDENTIFIED BY \'ChangeMe!123\'; GRANT ALL ON lampapp.* TO \'lampuser\'@\'localhost\'; FLUSH PRIVILEGES;"',
            explanation: 'Creates the lampapp schema, a scoped lampuser, and grants only the privileges needed on that one database.'
          }
        ],
        checkCommand: 'sudo mysql -e "SHOW DATABASES;" | grep lampapp',
        expectedOutput: 'lampapp'
      },
      {
        id: 'step-7',
        title: 'Install PHP and Required Modules',
        instruction: 'Install PHP — the "P" in LAMP — along with the Apache integration module and the MySQL driver.',
        summary: 'Provision the application runtime.',
        whyNeeded: 'PHP is the language Apache will execute on every dynamic request, and php-mysql gives it the driver it needs to talk to your database.',
        pillarConnection: 'Operational Excellence — installing only the modules you need keeps the runtime lean and easier to patch.',
        commands: [
          {
            text: 'sudo apt-get install -y php libapache2-mod-php php-mysql',
            explanation: 'Installs PHP, the Apache mod_php integration, and the MySQL driver in one shot.'
          },
          {
            text: 'sudo systemctl reload apache2',
            explanation: 'Reloads Apache so it picks up the freshly registered PHP handler.'
          }
        ],
        checkCommand: 'php -v | head -n1',
        expectedOutput: 'PHP'
      },
      {
        id: 'step-8',
        title: 'Deploy a Test PHP Page',
        instruction: 'Drop a phpinfo() page into the Apache document root to confirm PHP is being parsed end-to-end.',
        summary: 'Verify the Apache → PHP integration.',
        whyNeeded: 'A working phpinfo page proves Apache, mod_php, and the PHP interpreter are wired together correctly before you deploy real code.',
        pillarConnection: 'Operational Excellence — explicit verification steps catch misconfigurations while they are still cheap to fix.',
        commands: [
          {
            text: 'echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php',
            explanation: 'Writes a single-line PHP file to the Apache web root.'
          }
        ],
        checkCommand: 'cat /var/www/html/info.php',
        expectedOutput: '<?php phpinfo(); ?>'
      },
      {
        id: 'step-9',
        title: 'Validate the Stack End-to-End',
        instruction: 'Issue an HTTP request to the test page and confirm the server returns rendered PHP — proof that the full LAMP stack is live.',
        summary: 'Confirm the LAMP stack is serving dynamic content.',
        whyNeeded: 'Smoke-testing with a real HTTP request is the canonical way to prove the whole stack works, not just each component in isolation.',
        pillarConnection: 'Reliability — every deployment should end with an automated, repeatable validation step.',
        commands: [
          {
            text: 'curl -s http://localhost/info.php | grep -o "PHP Version" | head -n1',
            explanation: 'Fetches the PHP info page through Apache and greps for the version banner.'
          }
        ],
        checkCommand: 'curl -s http://localhost/info.php | grep -o "PHP Version" | head -n1',
        expectedOutput: 'PHP Version'
      }
    ]
  },
  {
    projectId: 'shell-automation',
    environment: 'linux',
    description: 'Build a production-grade backup automation script using tar, rsync, and cron with logging, retention, and integrity verification.',
    objective: 'Author a Bash script that performs incremental backups, schedule it with cron, log to syslog, prune old backups, and verify archive integrity.',
    steps: [
      { id: '1', title: 'Prepare Backup Directories', instruction: 'Create source and destination directories with correct permissions.', summary: 'Lay out a predictable backup tree.', whyNeeded: 'Scripts fail silently when paths are missing or unwritable.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo mkdir -p /var/backups/app /srv/app/data', explanation: 'Create destination and source.' },
          { text: 'sudo chown -R "$USER":"$USER" /var/backups/app', explanation: 'Allow non-root writes for the cron user.' }
        ], checkCommand: 'ls -ld /var/backups/app', expectedOutput: 'drwxr-xr-x' },
      { id: '2', title: 'Write the Backup Script', instruction: 'Create /usr/local/bin/backup.sh using tar with timestamped archives and rsync mirror.', summary: 'Combine snapshot + mirror strategies.', whyNeeded: 'tar gives point-in-time, rsync gives fast delta sync.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo tee /usr/local/bin/backup.sh >/dev/null <<\'EOF\'\n#!/usr/bin/env bash\nset -euo pipefail\nSRC=/srv/app/data\nDEST=/var/backups/app\nTS=$(date +%Y%m%d-%H%M%S)\nlogger -t backup "starting $TS"\ntar -czf "$DEST/app-$TS.tar.gz" -C "$SRC" .\nrsync -a --delete "$SRC/" "$DEST/mirror/"\nlogger -t backup "completed $TS"\nEOF', explanation: 'Heredoc writes the script.' },
          { text: 'sudo chmod 750 /usr/local/bin/backup.sh', explanation: 'Restrict execution.' }
        ], checkCommand: 'sudo /usr/local/bin/backup.sh && ls /var/backups/app', expectedOutput: 'app-' },
      { id: '3', title: 'Schedule with Cron', instruction: 'Run the backup nightly at 02:30 via cron.', summary: 'Automate execution.', whyNeeded: 'Manual backups are forgotten.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'echo "30 2 * * * root /usr/local/bin/backup.sh" | sudo tee /etc/cron.d/app-backup', explanation: 'System cron entry.' },
          { text: 'sudo systemctl restart cron', explanation: 'Reload cron.' }
        ], checkCommand: 'sudo crontab -l -u root; cat /etc/cron.d/app-backup', expectedOutput: 'backup.sh' },
      { id: '4', title: 'Implement Retention', instruction: 'Prune archives older than 14 days.', summary: 'Bound disk usage.', whyNeeded: 'Unbounded backups fill disks.', pillarConnection: 'Cost Optimization',
        commands: [
          { text: 'sudo sed -i "/logger -t backup \\"completed/i find $DEST -name \'app-*.tar.gz\' -mtime +14 -delete" /usr/local/bin/backup.sh', explanation: 'Insert retention before completion log.' }
        ], checkCommand: 'grep -n mtime /usr/local/bin/backup.sh', expectedOutput: 'mtime +14' },
      { id: '5', title: 'Verify Archive Integrity', instruction: 'Test the latest archive and review syslog.', summary: 'Trust but verify.', whyNeeded: 'A corrupt backup is worse than none.', pillarConnection: 'Reliability',
        commands: [
          { text: 'tar -tzf $(ls -t /var/backups/app/app-*.tar.gz | head -1) >/dev/null && echo OK', explanation: 'Validate gzip+tar stream.' },
          { text: 'journalctl -t backup --since "1 hour ago"', explanation: 'Inspect logs.' }
        ], checkCommand: 'echo OK', expectedOutput: 'OK' }
    ]
  },
  {
    projectId: 'user-management-system',
    environment: 'linux',
    description: 'Automate user onboarding from a CSV: create accounts, generate strong passwords, enforce expiry, assign groups, and audit.',
    objective: 'Build a Bash onboarding pipeline using useradd, openssl, chage, and logger.',
    steps: [
      { id: '1', title: 'Prepare CSV and Skeleton', instruction: 'Create a CSV of users and customize /etc/skel.', summary: 'Single source of truth.', whyNeeded: 'Consistent home dirs reduce support load.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'echo "username,fullname,group\\nalice,Alice Smith,devs\\nbob,Bob Jones,ops" | sudo tee /root/users.csv', explanation: 'Sample input.' },
          { text: 'sudo cp /etc/bash.bashrc /etc/skel/.bashrc', explanation: 'Standard shell init.' }
        ], checkCommand: 'cat /root/users.csv', expectedOutput: 'alice' },
      { id: '2', title: 'Create Onboarding Script', instruction: 'Author /usr/local/sbin/onboard.sh that loops the CSV.', summary: 'Idempotent provisioning.', whyNeeded: 'Repeatable onboarding.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo tee /usr/local/sbin/onboard.sh >/dev/null <<\'EOF\'\n#!/usr/bin/env bash\nset -euo pipefail\nCSV=${1:-/root/users.csv}\ntail -n +2 "$CSV" | while IFS=, read -r u name g; do\n  getent group "$g" >/dev/null || groupadd "$g"\n  id "$u" &>/dev/null || useradd -m -c "$name" -g "$g" -s /bin/bash "$u"\n  pw=$(openssl rand -base64 12)\n  echo "$u:$pw" | chpasswd\n  chage -d 0 -M 90 -W 7 "$u"\n  logger -t onboard "created $u in $g"\n  echo "$u,$pw" >> /root/onboard-creds.csv\ndone\nchmod 600 /root/onboard-creds.csv\nEOF', explanation: 'Loop and provision.' },
          { text: 'sudo chmod 700 /usr/local/sbin/onboard.sh', explanation: 'Root-only.' }
        ], checkCommand: 'sudo bash -n /usr/local/sbin/onboard.sh && echo OK', expectedOutput: 'OK' },
      { id: '3', title: 'Run Onboarding', instruction: 'Execute the script and inspect results.', summary: 'Provision users.', whyNeeded: 'Validate end-to-end.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo /usr/local/sbin/onboard.sh', explanation: 'Run it.' },
          { text: 'getent passwd alice bob', explanation: 'Confirm accounts.' }
        ], checkCommand: 'getent passwd alice', expectedOutput: 'alice' },
      { id: '4', title: 'Force Password Reset on First Login', instruction: 'Verify chage applied expiry.', summary: 'Force credential rotation.', whyNeeded: 'Generated passwords must not persist.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo chage -l alice', explanation: 'Show aging info.' }
        ], checkCommand: 'sudo chage -l alice | head -1', expectedOutput: 'password must be changed' },
      { id: '5', title: 'Audit and Lock Departures', instruction: 'Lock an account safely without deleting data.', summary: 'Reversible offboarding.', whyNeeded: 'Compliance retention.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo usermod -L bob && sudo chage -E 0 bob', explanation: 'Lock + expire.' },
          { text: 'sudo journalctl -t onboard --since today', explanation: 'Audit log.' }
        ], checkCommand: 'sudo passwd -S bob', expectedOutput: 'L' }
    ]
  },
  {
    projectId: 'log-rotation-config',
    environment: 'linux',
    description: 'Design a custom logrotate policy with compression, dateext naming, size+time triggers, and a postrotate signal.',
    objective: 'Author /etc/logrotate.d/app and validate with logrotate -d / -f.',
    steps: [
      { id: '1', title: 'Inventory Application Logs', instruction: 'Identify what to rotate and current sizes.', summary: 'Scope rotation.', whyNeeded: 'Avoid rotating files that should not move.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo ls -lh /var/log/app/', explanation: 'Current logs.' }
        ], checkCommand: 'sudo du -sh /var/log/app 2>/dev/null || echo none', expectedOutput: '' },
      { id: '2', title: 'Write logrotate Policy', instruction: 'Create /etc/logrotate.d/app with daily, size, compress, dateext.', summary: 'Custom rotation rules.', whyNeeded: 'Defaults rarely fit app logs.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo tee /etc/logrotate.d/app >/dev/null <<\'EOF\'\n/var/log/app/*.log {\n    daily\n    rotate 14\n    size 100M\n    missingok\n    notifempty\n    compress\n    delaycompress\n    dateext\n    dateformat -%Y%m%d\n    create 0640 root adm\n    sharedscripts\n    postrotate\n        systemctl reload app >/dev/null 2>&1 || true\n    endscript\n}\nEOF', explanation: 'Combined size+time policy.' }
        ], checkCommand: 'sudo cat /etc/logrotate.d/app | head -3', expectedOutput: '/var/log/app' },
      { id: '3', title: 'Debug Rotation', instruction: 'Dry-run with verbose debug.', summary: 'See what would happen.', whyNeeded: 'Catch syntax issues before production.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo logrotate -d /etc/logrotate.d/app', explanation: 'Dry-run output.' }
        ], checkCommand: 'sudo logrotate -d /etc/logrotate.d/app 2>&1 | grep -c "considering log"', expectedOutput: '' },
      { id: '4', title: 'Force First Rotation', instruction: 'Rotate immediately to validate the postrotate hook.', summary: 'Trigger reload.', whyNeeded: 'Confirm signal works.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo logrotate -f /etc/logrotate.d/app', explanation: 'Force run.' },
          { text: 'sudo ls /var/log/app/', explanation: 'See dated archive.' }
        ], checkCommand: 'sudo ls /var/log/app/ | grep -E "\\-[0-9]{8}" || echo no-rotation-yet', expectedOutput: '' },
      { id: '5', title: 'Confirm Cron/Timer Schedule', instruction: 'Ensure logrotate runs daily via systemd timer or cron.', summary: 'Automation hookup.', whyNeeded: 'Manual rotation defeats the purpose.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'systemctl list-timers logrotate.timer 2>/dev/null || ls /etc/cron.daily/logrotate', explanation: 'Confirm schedule.' }
        ], checkCommand: 'systemctl is-enabled logrotate.timer 2>/dev/null || echo cron', expectedOutput: '' }
    ]
  },
  {
    projectId: 'firewall-iptables',
    environment: 'linux',
    description: 'Harden a server with iptables: default-DROP policy, stateful allowances, logging, and persistence across reboots.',
    objective: 'Build a complete iptables ruleset and persist it via iptables-persistent.',
    steps: [
      { id: '1', title: 'Flush and Set Default Policies', instruction: 'Start clean and default to DROP after allowing loopback.', summary: 'Deny by default.', whyNeeded: 'Whitelisting is the only safe model.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo iptables -F && sudo iptables -X', explanation: 'Clear chains.' },
          { text: 'sudo iptables -A INPUT -i lo -j ACCEPT', explanation: 'Allow loopback FIRST.' },
          { text: 'sudo iptables -P INPUT DROP && sudo iptables -P FORWARD DROP && sudo iptables -P OUTPUT ACCEPT', explanation: 'Default deny inbound.' }
        ], checkCommand: 'sudo iptables -S | head -3', expectedOutput: '-P INPUT DROP' },
      { id: '2', title: 'Allow Established and Related', instruction: 'Permit return traffic for outbound connections.', summary: 'Stateful inspection.', whyNeeded: 'Otherwise nothing works.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT', explanation: 'Stateful rule.' }
        ], checkCommand: 'sudo iptables -S INPUT | grep ESTABLISHED', expectedOutput: 'ESTABLISHED' },
      { id: '3', title: 'Allow SSH/HTTP/HTTPS', instruction: 'Open required service ports with rate limiting on SSH.', summary: 'Service whitelist.', whyNeeded: 'Limit attack surface.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set', explanation: 'Track SSH attempts.' },
          { text: 'sudo iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 5 -j DROP', explanation: 'Rate-limit brute force.' },
          { text: 'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT', explanation: 'Allow SSH.' },
          { text: 'sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT', explanation: 'Web traffic.' }
        ], checkCommand: 'sudo iptables -S INPUT | grep -E "22|80|443"', expectedOutput: '22' },
      { id: '4', title: 'Log Dropped Packets', instruction: 'Append a LOG rule before implicit drop for visibility.', summary: 'Audit denials.', whyNeeded: 'Detect scans and misconfig.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables-drop: " --log-level 4', explanation: 'Rate-limited logging.' }
        ], checkCommand: 'sudo iptables -S | grep LOG', expectedOutput: 'iptables-drop' },
      { id: '5', title: 'Persist Across Reboots', instruction: 'Install iptables-persistent and save rules.', summary: 'Survive restarts.', whyNeeded: 'Rules vanish at reboot otherwise.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y iptables-persistent', explanation: 'Persistence package.' },
          { text: 'sudo netfilter-persistent save', explanation: 'Save current rules.' }
        ], checkCommand: 'sudo cat /etc/iptables/rules.v4 | head -5', expectedOutput: 'INPUT' }
    ]
  },
  {
    projectId: 'nfs-share-setup',
    environment: 'linux',
    description: 'Export an NFS share from a server and mount it on a client with proper permissions and firewall rules.',
    objective: 'Configure /etc/exports, exportfs, firewall, and client-side mounting.',
    steps: [
      { id: '1', title: 'Install NFS Server', instruction: 'Install kernel server packages.', summary: 'Server prereqs.', whyNeeded: 'Provides nfsd userspace.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get update && sudo apt-get install -y nfs-kernel-server', explanation: 'Install NFS server.' } ], checkCommand: 'systemctl is-active nfs-server', expectedOutput: 'active' },
      { id: '2', title: 'Create Export Directory', instruction: 'Create and own the export root.', summary: 'Filesystem layout.', whyNeeded: 'NFS needs a real directory.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo mkdir -p /srv/nfs/data && sudo chown nobody:nogroup /srv/nfs/data', explanation: 'Anonymous-mapped owner.' } ], checkCommand: 'ls -ld /srv/nfs/data', expectedOutput: 'nobody' },
      { id: '3', title: 'Configure /etc/exports', instruction: 'Export to a subnet with sync,no_subtree_check.', summary: 'Access policy.', whyNeeded: 'Controls who can mount.', pillarConnection: 'Security',
        commands: [
          { text: 'echo "/srv/nfs/data 10.0.0.0/24(rw,sync,no_subtree_check,root_squash)" | sudo tee -a /etc/exports', explanation: 'Add export.' },
          { text: 'sudo exportfs -ra', explanation: 'Re-read exports.' }
        ], checkCommand: 'sudo exportfs -v', expectedOutput: '/srv/nfs/data' },
      { id: '4', title: 'Open Firewall', instruction: 'Allow NFS through ufw or iptables.', summary: 'Network access.', whyNeeded: 'Default firewalls block 2049.', pillarConnection: 'Security',
        commands: [ { text: 'sudo ufw allow from 10.0.0.0/24 to any port nfs || sudo iptables -A INPUT -p tcp --dport 2049 -s 10.0.0.0/24 -j ACCEPT', explanation: 'Allow NFS.' } ], checkCommand: 'sudo ss -tlnp | grep 2049', expectedOutput: '2049' },
      { id: '5', title: 'Mount From Client', instruction: 'Install nfs-common and mount the share.', summary: 'Validate end-to-end.', whyNeeded: 'Confirms exports.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo apt-get install -y nfs-common && sudo mkdir -p /mnt/data', explanation: 'Client tools.' },
          { text: 'sudo mount -t nfs SERVER_IP:/srv/nfs/data /mnt/data', explanation: 'Mount.' },
          { text: 'echo "SERVER_IP:/srv/nfs/data /mnt/data nfs defaults,_netdev 0 0" | sudo tee -a /etc/fstab', explanation: 'Persist mount.' }
        ], checkCommand: 'mount | grep nfs', expectedOutput: 'nfs' }
    ]
  },
  {
    projectId: 'dns-bind-setup',
    environment: 'linux',
    description: 'Stand up an authoritative BIND9 DNS server with forward and reverse zones, then validate with dig.',
    objective: 'Install bind9, configure named.conf.options + zones, and verify resolution.',
    steps: [
      { id: '1', title: 'Install BIND9', instruction: 'Install server and utilities.', summary: 'DNS daemon.', whyNeeded: 'Provides named.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y bind9 bind9utils dnsutils', explanation: 'Install.' } ], checkCommand: 'systemctl is-active named || systemctl is-active bind9', expectedOutput: 'active' },
      { id: '2', title: 'Configure named.conf.options', instruction: 'Set listen-on, allow-query, and recursion.', summary: 'Server-wide policy.', whyNeeded: 'Open resolvers are abused.', pillarConnection: 'Security',
        commands: [ { text: 'sudo tee /etc/bind/named.conf.options >/dev/null <<\'EOF\'\noptions {\n    directory "/var/cache/bind";\n    listen-on { any; };\n    allow-query { 10.0.0.0/24; localhost; };\n    recursion no;\n    dnssec-validation auto;\n};\nEOF', explanation: 'Authoritative-only.' } ], checkCommand: 'sudo named-checkconf', expectedOutput: '' },
      { id: '3', title: 'Define Zones', instruction: 'Add forward and reverse zone references.', summary: 'Zone hookup.', whyNeeded: 'BIND must know where data lives.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /etc/bind/named.conf.local >/dev/null <<\'EOF\'\nzone "example.lab" { type master; file "/etc/bind/db.example.lab"; };\nzone "0.0.10.in-addr.arpa" { type master; file "/etc/bind/db.10"; };\nEOF', explanation: 'Forward + reverse.' } ], checkCommand: 'sudo named-checkconf', expectedOutput: '' },
      { id: '4', title: 'Author Zone Files', instruction: 'Create SOA, NS, A, and PTR records.', summary: 'Resource records.', whyNeeded: 'Actual DNS data.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'sudo tee /etc/bind/db.example.lab >/dev/null <<\'EOF\'\n$TTL 3600\n@   IN  SOA ns1.example.lab. admin.example.lab. (2026010101 3600 1800 604800 3600)\n    IN  NS  ns1.example.lab.\nns1 IN  A   10.0.0.10\nweb IN  A   10.0.0.20\nEOF', explanation: 'Forward zone.' },
          { text: 'sudo named-checkzone example.lab /etc/bind/db.example.lab', explanation: 'Validate.' },
          { text: 'sudo systemctl reload bind9 || sudo systemctl reload named', explanation: 'Apply.' }
        ], checkCommand: 'sudo named-checkzone example.lab /etc/bind/db.example.lab', expectedOutput: 'OK' },
      { id: '5', title: 'Query with dig', instruction: 'Resolve records to confirm.', summary: 'Functional test.', whyNeeded: 'Truth comes from the wire.', pillarConnection: 'Reliability',
        commands: [ { text: 'dig @127.0.0.1 web.example.lab +short', explanation: 'A record query.' } ], checkCommand: 'dig @127.0.0.1 web.example.lab +short', expectedOutput: '10.0.0.20' }
    ]
  },
  {
    projectId: 'mail-postfix-setup',
    environment: 'linux',
    description: 'Configure Postfix as an outbound SMTP relay with TLS and SPF/DKIM/DMARC alignment.',
    objective: 'Install Postfix, harden main.cf, enable TLS, and publish SPF/DKIM/DMARC.',
    steps: [
      { id: '1', title: 'Install Postfix', instruction: 'Install with the "Internet Site" preset.', summary: 'MTA install.', whyNeeded: 'Provides smtpd.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo DEBIAN_FRONTEND=noninteractive apt-get install -y postfix opendkim opendkim-tools', explanation: 'MTA + DKIM signer.' } ], checkCommand: 'postconf -d | grep mail_version', expectedOutput: 'mail_version' },
      { id: '2', title: 'Configure main.cf', instruction: 'Set hostname, mydestination, restrictions.', summary: 'Core MTA policy.', whyNeeded: 'Avoid open relay.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo postconf -e "myhostname = mail.example.com" "mydestination = localhost" "inet_interfaces = all" "smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination"', explanation: 'Closed relay.' }
        ], checkCommand: 'postconf myhostname', expectedOutput: 'mail.example.com' },
      { id: '3', title: 'Enable TLS', instruction: 'Point Postfix at Let\'s Encrypt certs.', summary: 'Encrypt in transit.', whyNeeded: 'Modern receivers require TLS.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo postconf -e "smtpd_tls_cert_file=/etc/letsencrypt/live/mail.example.com/fullchain.pem" "smtpd_tls_key_file=/etc/letsencrypt/live/mail.example.com/privkey.pem" "smtpd_tls_security_level=may" "smtp_tls_security_level=may"', explanation: 'Opportunistic TLS.' },
          { text: 'sudo systemctl restart postfix', explanation: 'Apply.' }
        ], checkCommand: 'postconf smtpd_tls_security_level', expectedOutput: 'may' },
      { id: '4', title: 'Configure DKIM Signing', instruction: 'Set up opendkim and publish the public key.', summary: 'Cryptographic signing.', whyNeeded: 'Required by Gmail/Yahoo bulk-sender rules.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo opendkim-genkey -s mail -d example.com -D /etc/opendkim/keys/example.com', explanation: 'Generate key.' },
          { text: 'sudo postconf -e "milter_default_action=accept" "smtpd_milters=inet:localhost:8891" "non_smtpd_milters=inet:localhost:8891"', explanation: 'Hook signer.' }
        ], checkCommand: 'sudo cat /etc/opendkim/keys/example.com/mail.txt | head -2', expectedOutput: 'mail._domainkey' },
      { id: '5', title: 'Send Test and Verify', instruction: 'Send a test message and check headers for spf/dkim/dmarc.', summary: 'Validate end-to-end.', whyNeeded: 'Confirm deliverability.', pillarConnection: 'Reliability',
        commands: [
          { text: 'echo "test" | mail -s "hello" -r postmaster@example.com you@gmail.com', explanation: 'Send.' },
          { text: 'sudo tail -50 /var/log/mail.log | grep -E "status=sent|dkim"', explanation: 'Inspect log.' }
        ], checkCommand: 'sudo grep -c "status=sent" /var/log/mail.log', expectedOutput: '' }
    ]
  },
  {
    projectId: 'ssh-hardening',
    environment: 'linux',
    description: 'Harden OpenSSH against brute force and key compromise: disable root, enforce keys, restrict users, deploy fail2ban.',
    objective: 'Modify sshd_config safely, validate, and pair with fail2ban.',
    steps: [
      { id: '1', title: 'Backup sshd_config', instruction: 'Always preserve a working copy before edits.', summary: 'Safe baseline.', whyNeeded: 'Locked-out sysadmins are a meme.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak', explanation: 'Backup.' } ], checkCommand: 'ls /etc/ssh/sshd_config.bak', expectedOutput: 'sshd_config.bak' },
      { id: '2', title: 'Disable Root and Passwords', instruction: 'Set PermitRootLogin no and PasswordAuthentication no.', summary: 'Keys only.', whyNeeded: 'Eliminates password brute force.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo sed -i -E "s/^#?PermitRootLogin.*/PermitRootLogin no/; s/^#?PasswordAuthentication.*/PasswordAuthentication no/; s/^#?ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/" /etc/ssh/sshd_config', explanation: 'Apply hardening.' }
        ], checkCommand: 'grep -E "^PermitRootLogin|^PasswordAuthentication" /etc/ssh/sshd_config', expectedOutput: 'no' },
      { id: '3', title: 'Restrict Users and Limit Tries', instruction: 'AllowUsers and MaxAuthTries with LoginGraceTime.', summary: 'Tighter envelope.', whyNeeded: 'Reduce attack window.', pillarConnection: 'Security',
        commands: [
          { text: 'echo -e "AllowUsers admin\\nMaxAuthTries 3\\nLoginGraceTime 30" | sudo tee -a /etc/ssh/sshd_config', explanation: 'Append.' }
        ], checkCommand: 'grep AllowUsers /etc/ssh/sshd_config', expectedOutput: 'admin' },
      { id: '4', title: 'Validate and Reload', instruction: 'sshd -t before reload to avoid lockout.', summary: 'Pre-flight.', whyNeeded: 'Catches typos.', pillarConnection: 'Reliability',
        commands: [
          { text: 'sudo sshd -t && sudo systemctl reload ssh', explanation: 'Test then reload.' }
        ], checkCommand: 'sudo sshd -t && echo OK', expectedOutput: 'OK' },
      { id: '5', title: 'Install fail2ban', instruction: 'Add automated banning for bad attempts.', summary: 'Defense in depth.', whyNeeded: 'Bots will still try.', pillarConnection: 'Security',
        commands: [
          { text: 'sudo apt-get install -y fail2ban', explanation: 'Install.' },
          { text: 'sudo tee /etc/fail2ban/jail.d/sshd.local >/dev/null <<\'EOF\'\n[sshd]\nenabled = true\nmaxretry = 3\nbantime = 1h\nfindtime = 10m\nEOF', explanation: 'SSH jail.' },
          { text: 'sudo systemctl restart fail2ban', explanation: 'Apply.' }
        ], checkCommand: 'sudo fail2ban-client status sshd', expectedOutput: 'sshd' }
    ]
  },
  {
    projectId: 'process-monitor',
    environment: 'linux',
    description: 'Build a lightweight process monitor using ps, sysstat, and a systemd timer to log resource hogs.',
    objective: 'Combine sysstat + a Bash script + systemd timer for low-overhead observability.',
    steps: [
      { id: '1', title: 'Install sysstat and atop', instruction: 'Provides sar/iostat/atop telemetry.', summary: 'Telemetry agents.', whyNeeded: 'Gives historical data.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y sysstat atop', explanation: 'Install.' }, { text: 'sudo sed -i "s/ENABLED=.*/ENABLED=\\"true\\"/" /etc/default/sysstat && sudo systemctl restart sysstat', explanation: 'Enable collection.' } ], checkCommand: 'systemctl is-active sysstat', expectedOutput: 'active' },
      { id: '2', title: 'Write Top-Process Logger', instruction: 'Bash script logging top 5 CPU+mem consumers.', summary: 'Custom hot-list.', whyNeeded: 'Spot regressions.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /usr/local/bin/proc-top.sh >/dev/null <<\'EOF\'\n#!/usr/bin/env bash\nLOG=/var/log/proc-top.log\necho "=== $(date -Is) ===" >>"$LOG"\nps -eo pid,user,%cpu,%mem,comm --sort=-%cpu | head -6 >>"$LOG"\nEOF', explanation: 'Snapshot script.' }, { text: 'sudo chmod 755 /usr/local/bin/proc-top.sh', explanation: 'Executable.' } ], checkCommand: 'sudo /usr/local/bin/proc-top.sh && tail -1 /var/log/proc-top.log', expectedOutput: '' },
      { id: '3', title: 'Create systemd Service', instruction: 'Oneshot unit invokes the script.', summary: 'Managed execution.', whyNeeded: 'Replaces cron with logging.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /etc/systemd/system/proc-top.service >/dev/null <<\'EOF\'\n[Unit]\nDescription=Snapshot top processes\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/proc-top.sh\nEOF', explanation: 'Service.' } ], checkCommand: 'systemctl cat proc-top.service | head -2', expectedOutput: 'proc-top' },
      { id: '4', title: 'Create systemd Timer', instruction: 'Run every 5 minutes.', summary: 'Scheduled trigger.', whyNeeded: 'Continuous sampling.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /etc/systemd/system/proc-top.timer >/dev/null <<\'EOF\'\n[Unit]\nDescription=Run proc-top every 5m\n[Timer]\nOnBootSec=2min\nOnUnitActiveSec=5min\n[Install]\nWantedBy=timers.target\nEOF', explanation: 'Timer.' }, { text: 'sudo systemctl daemon-reload && sudo systemctl enable --now proc-top.timer', explanation: 'Activate.' } ], checkCommand: 'systemctl list-timers proc-top.timer --no-pager', expectedOutput: 'proc-top' },
      { id: '5', title: 'Review with sar/atop', instruction: 'Inspect historical CPU and memory.', summary: 'Forensics.', whyNeeded: 'Justify rightsizing.', pillarConnection: 'Cost Optimization',
        commands: [ { text: 'sar -u 1 3', explanation: 'CPU sample.' }, { text: 'sudo atop -r /var/log/atop/atop_$(date +%Y%m%d) -b 00:00 -e 23:59 2>/dev/null | head -20 || true', explanation: 'Replay day.' } ], checkCommand: 'sar -u 1 1 | tail -1', expectedOutput: 'all' }
    ]
  },
  {
    projectId: 'linux-auditd',
    environment: 'linux',
    description: 'Deploy auditd with rules for sensitive files and syscalls; query with ausearch and aureport.',
    objective: 'Author persistent audit rules and validate event capture.',
    steps: [
      { id: '1', title: 'Install auditd', instruction: 'Install audit framework.', summary: 'Kernel auditing.', whyNeeded: 'Required for compliance.', pillarConnection: 'Security',
        commands: [ { text: 'sudo apt-get install -y auditd audispd-plugins', explanation: 'Install.' }, { text: 'sudo systemctl enable --now auditd', explanation: 'Enable.' } ], checkCommand: 'systemctl is-active auditd', expectedOutput: 'active' },
      { id: '2', title: 'Watch Sensitive Files', instruction: 'Add file watches for /etc/passwd, /etc/shadow, /etc/sudoers.', summary: 'File integrity.', whyNeeded: 'Detect tampering.', pillarConnection: 'Security',
        commands: [ { text: 'sudo tee /etc/audit/rules.d/identity.rules >/dev/null <<\'EOF\'\n-w /etc/passwd -p wa -k identity\n-w /etc/shadow -p wa -k identity\n-w /etc/sudoers -p wa -k identity\nEOF', explanation: 'Rules.' } ], checkCommand: 'sudo cat /etc/audit/rules.d/identity.rules | wc -l', expectedOutput: '3' },
      { id: '3', title: 'Watch Privileged Syscalls', instruction: 'Track execve and chmod by root.', summary: 'Behavioral audit.', whyNeeded: 'Spot privilege abuse.', pillarConnection: 'Security',
        commands: [ { text: 'sudo tee /etc/audit/rules.d/exec.rules >/dev/null <<\'EOF\'\n-a always,exit -F arch=b64 -S execve -F euid=0 -k root-exec\n-a always,exit -F arch=b64 -S chmod -S fchmod -k perm-mod\nEOF', explanation: 'Syscall rules.' } ], checkCommand: 'sudo cat /etc/audit/rules.d/exec.rules', expectedOutput: 'execve' },
      { id: '4', title: 'Reload Rules', instruction: 'Apply via augenrules.', summary: 'Activate.', whyNeeded: 'Rules are inert otherwise.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo augenrules --load', explanation: 'Compile + load.' }, { text: 'sudo auditctl -l | head', explanation: 'List active.' } ], checkCommand: 'sudo auditctl -l | grep identity', expectedOutput: 'identity' },
      { id: '5', title: 'Query Events', instruction: 'Trigger an event and search audit log.', summary: 'Validate capture.', whyNeeded: 'Confirm rules fire.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo touch /etc/passwd', explanation: 'Touch sensitive file.' }, { text: 'sudo ausearch -k identity -ts recent | head -20', explanation: 'Find events.' }, { text: 'sudo aureport --summary', explanation: 'Summary.' } ], checkCommand: 'sudo ausearch -k identity -ts recent | grep -c type=PATH', expectedOutput: '' }
    ]
  },
  {
    projectId: 'raid-config',
    environment: 'linux',
    description: 'Create a software RAID 1 mirror with mdadm, persist via mdadm.conf, and simulate disk failure.',
    objective: 'Build, mount, and recover a Linux software RAID array.',
    steps: [
      { id: '1', title: 'Identify Disks', instruction: 'List block devices for the two unused disks.', summary: 'Confirm targets.', whyNeeded: 'Wrong disk = data loss.', pillarConnection: 'Reliability',
        commands: [ { text: 'lsblk -o NAME,SIZE,TYPE,MOUNTPOINT', explanation: 'Show layout.' } ], checkCommand: 'lsblk | head -5', expectedOutput: 'NAME' },
      { id: '2', title: 'Create RAID 1', instruction: 'Use mdadm to mirror two devices.', summary: 'Build array.', whyNeeded: 'Provides redundancy.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc', explanation: 'Build mirror.' } ], checkCommand: 'cat /proc/mdstat', expectedOutput: 'md0' },
      { id: '3', title: 'Format and Mount', instruction: 'Add ext4 and mount.', summary: 'Make usable.', whyNeeded: 'Block device alone is not a filesystem.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo mkfs.ext4 /dev/md0', explanation: 'Filesystem.' }, { text: 'sudo mkdir -p /mnt/raid && sudo mount /dev/md0 /mnt/raid', explanation: 'Mount.' } ], checkCommand: 'mount | grep md0', expectedOutput: 'md0' },
      { id: '4', title: 'Persist Configuration', instruction: 'Save to mdadm.conf and fstab.', summary: 'Survive reboot.', whyNeeded: 'Arrays must reassemble.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf', explanation: 'Save UUID.' }, { text: 'sudo update-initramfs -u', explanation: 'Update initramfs.' }, { text: 'echo "/dev/md0 /mnt/raid ext4 defaults 0 0" | sudo tee -a /etc/fstab', explanation: 'Mount on boot.' } ], checkCommand: 'grep md0 /etc/fstab', expectedOutput: 'md0' },
      { id: '5', title: 'Simulate Failure and Rebuild', instruction: 'Mark a disk failed, remove, re-add.', summary: 'Disaster drill.', whyNeeded: 'Practice recovery.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo mdadm /dev/md0 --fail /dev/sdc --remove /dev/sdc', explanation: 'Fail disk.' }, { text: 'sudo mdadm /dev/md0 --add /dev/sdc', explanation: 'Re-add.' }, { text: 'cat /proc/mdstat', explanation: 'Watch resync.' } ], checkCommand: 'cat /proc/mdstat | grep -E "recovery|resync|UU"', expectedOutput: '' }
    ]
  },
  {
    projectId: 'lvm-management',
    environment: 'linux',
    description: 'Create and grow a logical volume online with pvcreate, vgcreate, lvcreate, and resize2fs.',
    objective: 'Provision LVM and demonstrate online expansion.',
    steps: [
      { id: '1', title: 'Initialize Physical Volumes', instruction: 'pvcreate on raw disks.', summary: 'Foundation layer.', whyNeeded: 'LVM needs PVs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo pvcreate /dev/sdb /dev/sdc', explanation: 'Make PVs.' } ], checkCommand: 'sudo pvs', expectedOutput: '/dev/sdb' },
      { id: '2', title: 'Create Volume Group', instruction: 'Pool PVs into a VG.', summary: 'Storage pool.', whyNeeded: 'Allows flexible LVs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo vgcreate datavg /dev/sdb /dev/sdc', explanation: 'VG creation.' } ], checkCommand: 'sudo vgs datavg', expectedOutput: 'datavg' },
      { id: '3', title: 'Create Logical Volume', instruction: '10G LV with ext4.', summary: 'Carve out volume.', whyNeeded: 'Usable filesystem.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo lvcreate -L 10G -n applv datavg', explanation: 'LV.' }, { text: 'sudo mkfs.ext4 /dev/datavg/applv', explanation: 'Format.' }, { text: 'sudo mkdir -p /mnt/app && sudo mount /dev/datavg/applv /mnt/app', explanation: 'Mount.' } ], checkCommand: 'mount | grep applv', expectedOutput: 'applv' },
      { id: '4', title: 'Persist in fstab', instruction: 'Add by /dev/mapper path.', summary: 'Mount on boot.', whyNeeded: 'Otherwise disappears.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "/dev/datavg/applv /mnt/app ext4 defaults 0 2" | sudo tee -a /etc/fstab', explanation: 'fstab line.' } ], checkCommand: 'grep applv /etc/fstab', expectedOutput: 'applv' },
      { id: '5', title: 'Grow Online', instruction: 'Extend LV +5G then resize2fs.', summary: 'Online expansion.', whyNeeded: 'Avoid downtime.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo lvextend -L +5G /dev/datavg/applv', explanation: 'Grow LV.' }, { text: 'sudo resize2fs /dev/datavg/applv', explanation: 'Grow ext4.' }, { text: 'df -h /mnt/app', explanation: 'Verify.' } ], checkCommand: 'sudo lvs datavg/applv --noheadings -o lv_size', expectedOutput: '15' }
    ]
  },
  {
    projectId: 'systemd-service',
    environment: 'linux',
    description: 'Author a robust systemd service unit with restart policy, security sandboxing, and journal logging.',
    objective: 'Create, enable, monitor, and harden a systemd service for an app binary.',
    steps: [
      { id: '1', title: 'Install Application Stub', instruction: 'Create a minimal long-running binary script.', summary: 'Target for the unit.', whyNeeded: 'Need something to manage.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /usr/local/bin/myapp >/dev/null <<\'EOF\'\n#!/usr/bin/env bash\nwhile true; do echo "[$(date -Is)] alive"; sleep 5; done\nEOF', explanation: 'Loop process.' }, { text: 'sudo chmod 755 /usr/local/bin/myapp', explanation: 'Executable.' } ], checkCommand: 'test -x /usr/local/bin/myapp && echo OK', expectedOutput: 'OK' },
      { id: '2', title: 'Create Service Unit', instruction: 'Write /etc/systemd/system/myapp.service.', summary: 'Process supervision.', whyNeeded: 'Replaces nohup/screen.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo tee /etc/systemd/system/myapp.service >/dev/null <<\'EOF\'\n[Unit]\nDescription=My App\nAfter=network-online.target\nWants=network-online.target\n[Service]\nType=simple\nExecStart=/usr/local/bin/myapp\nRestart=on-failure\nRestartSec=5s\nUser=nobody\nNoNewPrivileges=yes\nProtectSystem=strict\nProtectHome=yes\nPrivateTmp=yes\n[Install]\nWantedBy=multi-user.target\nEOF', explanation: 'Hardened unit.' } ], checkCommand: 'systemctl cat myapp.service | head -3', expectedOutput: 'myapp' },
      { id: '3', title: 'Enable and Start', instruction: 'daemon-reload + enable + start.', summary: 'Activate service.', whyNeeded: 'Make it persist.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo systemctl daemon-reload && sudo systemctl enable --now myapp', explanation: 'Activate.' } ], checkCommand: 'systemctl is-active myapp', expectedOutput: 'active' },
      { id: '4', title: 'Inspect Logs', instruction: 'Use journalctl follow mode.', summary: 'Live log stream.', whyNeeded: 'Verify behavior.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'journalctl -u myapp -n 10 --no-pager', explanation: 'Last 10 lines.' } ], checkCommand: 'journalctl -u myapp -n 1 --no-pager', expectedOutput: 'alive' },
      { id: '5', title: 'Test Restart Policy', instruction: 'Kill the process and confirm respawn.', summary: 'Validate self-healing.', whyNeeded: 'Restart=on-failure must work.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo systemctl kill -s KILL myapp', explanation: 'Send SIGKILL.' }, { text: 'sleep 6 && systemctl is-active myapp', explanation: 'Confirm restart.' } ], checkCommand: 'systemctl is-active myapp', expectedOutput: 'active' }
    ]
  },
  {
    projectId: 'kernel-module',
    environment: 'linux',
    description: 'Build a "Hello World" Linux kernel module from source, load it, observe in dmesg, and unload.',
    objective: 'Understand module_init/module_exit, kbuild, insmod, and rmmod.',
    steps: [
      { id: '1', title: 'Install Build Headers', instruction: 'Kernel headers and build-essential.', summary: 'Compile prereqs.', whyNeeded: 'Modules build against running kernel.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y build-essential linux-headers-$(uname -r)', explanation: 'Install.' } ], checkCommand: 'ls /lib/modules/$(uname -r)/build/Makefile', expectedOutput: 'Makefile' },
      { id: '2', title: 'Write Module Source', instruction: 'Create hello.c with init/exit.', summary: 'Module skeleton.', whyNeeded: 'Required entry points.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'mkdir -p ~/hello && cd ~/hello && cat >hello.c <<\'EOF\'\n#include <linux/module.h>\n#include <linux/kernel.h>\nstatic int __init hello_init(void){ printk(KERN_INFO "hello: loaded\\n"); return 0; }\nstatic void __exit hello_exit(void){ printk(KERN_INFO "hello: unloaded\\n"); }\nmodule_init(hello_init);\nmodule_exit(hello_exit);\nMODULE_LICENSE("GPL");\nEOF', explanation: 'Source.' } ], checkCommand: 'test -f ~/hello/hello.c && echo OK', expectedOutput: 'OK' },
      { id: '3', title: 'Write Makefile', instruction: 'kbuild-style Makefile.', summary: 'Out-of-tree build.', whyNeeded: 'Kernel build system.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > ~/hello/Makefile <<\'EOF\'\nobj-m += hello.o\nall:\n\tmake -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules\nclean:\n\tmake -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean\nEOF', explanation: 'Makefile.' } ], checkCommand: 'grep obj-m ~/hello/Makefile', expectedOutput: 'hello.o' },
      { id: '4', title: 'Build the Module', instruction: 'Run make to produce hello.ko.', summary: 'Compile.', whyNeeded: 'Need binary module.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cd ~/hello && make', explanation: 'Build.' } ], checkCommand: 'ls ~/hello/hello.ko', expectedOutput: 'hello.ko' },
      { id: '5', title: 'Load and Unload', instruction: 'insmod, lsmod, dmesg, rmmod.', summary: 'Lifecycle.', whyNeeded: 'Validate functionality.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo insmod ~/hello/hello.ko && lsmod | grep hello', explanation: 'Load.' }, { text: 'sudo dmesg | tail -3', explanation: 'See message.' }, { text: 'sudo rmmod hello && sudo dmesg | tail -2', explanation: 'Unload.' } ], checkCommand: 'sudo dmesg | grep -c "hello: "', expectedOutput: '' }
    ]
  },
  {
    projectId: 'jenkins-pipeline',
    environment: 'linux',
    description: 'Build a declarative Jenkins pipeline with multi-stage CI for a Node.js app, running in a Docker agent with credentials.',
    objective: 'Author Jenkinsfile, configure shared library, and integrate with GitHub webhooks.',
    steps: [
      { id: '1', title: 'Install Jenkins', instruction: 'Install LTS via the official repo.', summary: 'CI engine.', whyNeeded: 'Provides controllers and agents.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc >/dev/null', explanation: 'GPG key.' },
          { text: 'echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list', explanation: 'Repo.' },
          { text: 'sudo apt-get update && sudo apt-get install -y openjdk-17-jre jenkins', explanation: 'Install.' }
        ], checkCommand: 'systemctl is-active jenkins', expectedOutput: 'active' },
      { id: '2', title: 'Author Jenkinsfile', instruction: 'Declarative pipeline with build/test/scan/deploy stages.', summary: 'Pipeline-as-code.', whyNeeded: 'Versioned, reviewable CI.', pillarConnection: 'Operational Excellence',
        commands: [
          { text: 'cat > Jenkinsfile <<\'EOF\'\npipeline {\n  agent { docker { image \'node:20-alpine\' } }\n  options { timestamps(); ansiColor(\'xterm\') }\n  stages {\n    stage(\'Install\') { steps { sh \'npm ci\' } }\n    stage(\'Test\')    { steps { sh \'npm test -- --reporter=junit\' } post { always { junit \'**/junit.xml\' } } }\n    stage(\'Build\')   { steps { sh \'npm run build\' archiveArtifacts \'dist/**\' } }\n    stage(\'Deploy\')  { when { branch \'main\' } steps { withCredentials([string(credentialsId: \'deploy-token\', variable: \'TOK\')]) { sh \'curl -H "Authorization: Bearer $TOK" https://deploy.example.com/hook\' } } }\n  }\n}\nEOF', explanation: 'Pipeline definition.' }
        ], checkCommand: 'grep -c stage Jenkinsfile', expectedOutput: '4' },
      { id: '3', title: 'Add Credentials', instruction: 'Store deploy token in Jenkins credentials store.', summary: 'Secret handling.', whyNeeded: 'Never hardcode tokens.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Use Manage Jenkins -> Credentials -> Global -> Add Secret Text with id=deploy-token"', explanation: 'UI step (or via JCasC).' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '4', title: 'Configure GitHub Webhook', instruction: 'Trigger builds via webhook.', summary: 'Push-based CI.', whyNeeded: 'Avoid polling.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'echo "GitHub repo -> Settings -> Webhooks -> https://JENKINS/github-webhook/ ; content-type application/json"', explanation: 'Webhook URL.' } ], checkCommand: 'echo done', expectedOutput: 'done' },
      { id: '5', title: 'Run and Inspect', instruction: 'Trigger pipeline and review Blue Ocean view.', summary: 'Validate.', whyNeeded: 'Confirm green build.', pillarConnection: 'Reliability',
        commands: [ { text: 'curl -X POST http://JENKINS/job/myapp/build --user admin:TOKEN', explanation: 'Trigger.' } ], checkCommand: 'echo build-triggered', expectedOutput: 'triggered' }
    ]
  },
  {
    projectId: 'ansible-webserver',
    environment: 'linux',
    description: 'Use Ansible to provision a web server fleet with Nginx, TLS, and templated config.',
    objective: 'Author inventory, playbook, roles, and Jinja2 templates idempotently.',
    steps: [
      { id: '1', title: 'Install Ansible and Bootstrap Inventory', instruction: 'Install ansible-core and define hosts.', summary: 'Control node setup.', whyNeeded: 'Ansible runs from a control node.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y ansible', explanation: 'Install.' }, { text: 'cat > inventory.ini <<\'EOF\'\n[web]\nweb1 ansible_host=10.0.0.21\nweb2 ansible_host=10.0.0.22\n[web:vars]\nansible_user=ubuntu\nansible_ssh_private_key_file=~/.ssh/id_ed25519\nEOF', explanation: 'Inventory.' } ], checkCommand: 'ansible -i inventory.ini web -m ping', expectedOutput: 'pong' },
      { id: '2', title: 'Create Role Layout', instruction: 'Use ansible-galaxy to scaffold a role.', summary: 'Reusable structure.', whyNeeded: 'Roles enable composition.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'ansible-galaxy init roles/nginx', explanation: 'Scaffold.' } ], checkCommand: 'ls roles/nginx/tasks/main.yml', expectedOutput: 'main.yml' },
      { id: '3', title: 'Author Tasks', instruction: 'Install nginx, deploy site, manage service.', summary: 'Idempotent steps.', whyNeeded: 'Re-run safe.', pillarConnection: 'Reliability',
        commands: [ { text: 'cat > roles/nginx/tasks/main.yml <<\'EOF\'\n- name: Install nginx\n  apt: { name: nginx, state: present, update_cache: yes }\n- name: Deploy site config\n  template: { src: site.conf.j2, dest: /etc/nginx/sites-available/site.conf, mode: "0644" }\n  notify: reload nginx\n- name: Enable site\n  file: { src: /etc/nginx/sites-available/site.conf, dest: /etc/nginx/sites-enabled/site.conf, state: link }\n- name: Ensure nginx running\n  service: { name: nginx, state: started, enabled: yes }\nEOF', explanation: 'Tasks.' }, { text: 'mkdir -p roles/nginx/handlers && cat > roles/nginx/handlers/main.yml <<\'EOF\'\n- name: reload nginx\n  service: { name: nginx, state: reloaded }\nEOF', explanation: 'Handler.' } ], checkCommand: 'ansible-lint roles/nginx 2>&1 | tail -1', expectedOutput: '' },
      { id: '4', title: 'Add Jinja2 Template', instruction: 'Server block with vars.', summary: 'Templated config.', whyNeeded: 'DRY across hosts.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > roles/nginx/templates/site.conf.j2 <<\'EOF\'\nserver {\n  listen 80;\n  server_name {{ inventory_hostname }};\n  root /var/www/html;\n  index index.html;\n}\nEOF', explanation: 'Template.' } ], checkCommand: 'test -f roles/nginx/templates/site.conf.j2 && echo OK', expectedOutput: 'OK' },
      { id: '5', title: 'Run Playbook', instruction: 'Apply with check then for real.', summary: 'Converge fleet.', whyNeeded: 'Bring hosts to desired state.', pillarConnection: 'Reliability',
        commands: [ { text: 'cat > site.yml <<\'EOF\'\n- hosts: web\n  become: yes\n  roles: [nginx]\nEOF', explanation: 'Playbook.' }, { text: 'ansible-playbook -i inventory.ini site.yml --check', explanation: 'Dry run.' }, { text: 'ansible-playbook -i inventory.ini site.yml', explanation: 'Apply.' } ], checkCommand: 'ansible -i inventory.ini web -m shell -a "systemctl is-active nginx"', expectedOutput: 'active' }
    ]
  },
  {
    projectId: 'docker-swarm-cluster',
    environment: 'linux',
    description: 'Bootstrap a 3-node Docker Swarm, deploy a stack, and roll out an update with health checks.',
    objective: 'Init swarm, join workers, deploy compose stack, perform rolling update.',
    steps: [
      { id: '1', title: 'Initialize Swarm Manager', instruction: 'Initialize the primary manager node and advertise the correct interface.', summary: 'Cluster bootstrap.', whyNeeded: 'Establishes the Raft consensus group.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker swarm init --advertise-addr $(hostname -I | awk \'{print $1}\')', explanation: 'Enables Swarm mode and sets this node as the leader.' } ], checkCommand: 'docker info | grep Swarm', expectedOutput: 'active' },
      { id: '2', title: 'Provision Worker Nodes', instruction: 'Join worker nodes to the cluster using the manager token.', summary: 'Horizontal scaling.', whyNeeded: 'Ensures compute capacity across multiple failure domains.', pillarConnection: 'Reliability',
        commands: [ { text: 'TOKEN=$(docker swarm join-token worker -q)\necho "docker swarm join --token $TOKEN manager:2377"', explanation: 'Generates the join command for worker nodes.' } ], checkCommand: 'docker node ls | grep Ready | wc -l', expectedOutput: '3' },
      { id: '3', title: 'Deploy Scalable Web Stack', instruction: 'Deploy a multi-replica Nginx stack with health checks and resource limits.', summary: 'Declarative orchestration.', whyNeeded: 'Automates deployment and self-healing.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > stack.yml <<\'EOF\'\nversion: "3.9"\nservices:\n  web:\n    image: nginx:latest\n    deploy:\n      replicas: 6\n      update_config:\n        parallelism: 2\n        delay: 10s\n      restart_policy:\n        condition: on-failure\nEOF\ndocker stack deploy -c stack.yml app', explanation: 'Deploys a resilient stack with 6 replicas.' } ], checkCommand: 'docker service ls', expectedOutput: '6/6' },
      { id: '4', title: 'Configure Overlay Networking', instruction: 'Verify the ingress mesh and internal overlay network connectivity.', summary: 'Service discovery.', whyNeeded: 'Allows seamless communication across distributed nodes.', pillarConnection: 'Reliability',
        commands: [ { text: 'docker network ls | grep overlay', explanation: 'Verifies the virtual network is active.' }, { text: 'docker service inspect app_web', explanation: 'Inspects the VIP and routing mesh.' } ], checkCommand: 'docker network inspect ingress | grep "Driver\": \"overlay\""', expectedOutput: 'overlay' },
      { id: '5', title: 'Rolling Update & Rollback', instruction: 'Perform a zero-downtime image update and verify the rollout.', summary: 'Continuous Delivery.', whyNeeded: 'Ensures updates don\'t disrupt user sessions.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker service update --image nginx:mainline app_web', explanation: 'Triggers a rolling update across the cluster.' }, { text: 'docker service ps app_web', explanation: 'Monitors the status of individual task containers.' } ], checkCommand: 'docker service ls | grep app_web', expectedOutput: '6/6' }
    ]
  },
  {
    projectId: 'gitlab-ci-node',
    environment: 'linux',
    description: 'Build a multi-stage GitLab CI pipeline for a Node.js app with caching, artifacts, and review apps.',
    objective: 'Author .gitlab-ci.yml using stages, cache, artifacts, and rules.',
    steps: [
      { id: '1', title: 'Initialize Repo and Runner', instruction: 'Register a runner and confirm tag.', summary: 'CI executor.', whyNeeded: 'Pipelines need runners.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo gitlab-runner register --url https://gitlab.com/ --token GLRT-XXXX --executor docker --docker-image alpine:3 --tag-list "linux,docker" --non-interactive', explanation: 'Register.' } ], checkCommand: 'sudo gitlab-runner verify', expectedOutput: 'alive' },
      { id: '2', title: 'Author .gitlab-ci.yml', instruction: 'Stages: install, test, build, deploy.', summary: 'Pipeline-as-code.', whyNeeded: 'Versioned CI.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > .gitlab-ci.yml <<\'EOF\'\nimage: node:20\nstages: [install, test, build, deploy]\ncache:\n  key: ${CI_COMMIT_REF_SLUG}\n  paths: [node_modules/, .npm/]\ninstall:\n  stage: install\n  script: [ "npm ci --cache .npm --prefer-offline" ]\n  artifacts: { paths: [node_modules/], expire_in: 1h }\ntest:\n  stage: test\n  script: [ "npm test -- --reporter junit > junit.xml" ]\n  artifacts: { reports: { junit: junit.xml } }\nbuild:\n  stage: build\n  script: [ "npm run build" ]\n  artifacts: { paths: [dist/] }\ndeploy:\n  stage: deploy\n  rules: [{ if: \'$CI_COMMIT_BRANCH == "main"\' }]\n  script: [ "curl -fsSL --header \\"Authorization: Bearer $DEPLOY_TOKEN\\" https://deploy.example.com/hook" ]\nEOF', explanation: 'Full pipeline.' } ], checkCommand: 'grep -c "^[a-z].*:" .gitlab-ci.yml', expectedOutput: '' },
      { id: '3', title: 'Configure CI Variables', instruction: 'Add DEPLOY_TOKEN as masked + protected.', summary: 'Secret management.', whyNeeded: 'Avoid leaks.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Project -> Settings -> CI/CD -> Variables -> Add DEPLOY_TOKEN (masked, protected)"', explanation: 'UI step.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '4', title: 'Push and Watch Pipeline', instruction: 'Trigger via push.', summary: 'Validate.', whyNeeded: 'See it run.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci: pipeline" && git push', explanation: 'Push.' } ], checkCommand: 'echo pushed', expectedOutput: 'pushed' },
      { id: '5', title: 'Add Merge Request Pipeline', instruction: 'Use rules to run on MRs only.', summary: 'Pre-merge validation.', whyNeeded: 'Catch regressions early.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "Add: rules: [{ if: \'$CI_PIPELINE_SOURCE == \\"merge_request_event\\"\' }]"', explanation: 'Snippet.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'sonarqube-quality',
    environment: 'linux',
    description: 'Run SonarQube Community in Docker and scan a project with sonar-scanner; gate the pipeline on Quality Gate.',
    objective: 'Stand up SonarQube, run sonar-scanner, fail builds on gate violation.',
    steps: [
      { id: '1', title: 'Run SonarQube', instruction: 'Start the official container with persistent volumes.', summary: 'Server up.', whyNeeded: 'Hosts analysis.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker volume create sonar_data && docker volume create sonar_logs', explanation: 'Volumes.' }, { text: 'docker run -d --name sonar -p 9000:9000 -v sonar_data:/opt/sonarqube/data -v sonar_logs:/opt/sonarqube/logs sonarqube:community', explanation: 'Run.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:9000', expectedOutput: '200' },
      { id: '2', title: 'Generate Token', instruction: 'Create a project + user token via API.', summary: 'Auth.', whyNeeded: 'Required by scanner.', pillarConnection: 'Security',
        commands: [ { text: 'curl -u admin:admin -X POST "http://localhost:9000/api/projects/create?name=demo&project=demo"', explanation: 'Create project.' }, { text: 'curl -u admin:admin -X POST "http://localhost:9000/api/user_tokens/generate?name=ci"', explanation: 'Token.' } ], checkCommand: 'echo token-set', expectedOutput: 'token-set' },
      { id: '3', title: 'Configure sonar-project.properties', instruction: 'Define keys and sources.', summary: 'Scanner config.', whyNeeded: 'Tells scanner what to analyze.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > sonar-project.properties <<\'EOF\'\nsonar.projectKey=demo\nsonar.host.url=http://localhost:9000\nsonar.sources=src\nsonar.javascript.lcov.reportPaths=coverage/lcov.info\nsonar.qualitygate.wait=true\nEOF', explanation: 'Config.' } ], checkCommand: 'cat sonar-project.properties | head -1', expectedOutput: 'projectKey' },
      { id: '4', title: 'Run sonar-scanner', instruction: 'Use docker image to scan.', summary: 'Analysis.', whyNeeded: 'Push results.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run --rm --network host -e SONAR_TOKEN=$TOKEN -v $PWD:/usr/src sonarsource/sonar-scanner-cli', explanation: 'Scan.' } ], checkCommand: 'curl -s "http://localhost:9000/api/qualitygates/project_status?projectKey=demo" | grep -o "\\"status\\":\\"[A-Z]*\\""', expectedOutput: 'status' },
      { id: '5', title: 'Fail on Gate', instruction: 'qualitygate.wait=true returns non-zero on failure.', summary: 'Pipeline gate.', whyNeeded: 'Block bad code.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "scanner exits non-zero when status=ERROR"', explanation: 'Behavior note.' } ], checkCommand: 'echo gate-enforced', expectedOutput: 'gate-enforced' }
    ]
  },
  {
    projectId: 'packer-images',
    environment: 'linux',
    description: 'Build a hardened AWS AMI with HashiCorp Packer using shell provisioners and Ansible.',
    objective: 'Author HCL2 template, provision, and validate the resulting AMI.',
    steps: [
      { id: '1', title: 'Install Packer', instruction: 'Install via the HashiCorp repo.', summary: 'Build tool.', whyNeeded: 'Required binary.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp.gpg', explanation: 'Key.' }, { text: 'echo "deb [signed-by=/usr/share/keyrings/hashicorp.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list', explanation: 'Repo.' }, { text: 'sudo apt-get update && sudo apt-get install -y packer', explanation: 'Install.' } ], checkCommand: 'packer version', expectedOutput: 'Packer' },
      { id: '2', title: 'Write HCL Template', instruction: 'amazon-ebs source + shell provisioner.', summary: 'Image-as-code.', whyNeeded: 'Reproducible AMIs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > image.pkr.hcl <<\'EOF\'\npacker { required_plugins { amazon = { source = "github.com/hashicorp/amazon", version = "~> 1" } } }\nsource "amazon-ebs" "ubuntu" {\n  region = "us-east-1"\n  instance_type = "t3.micro"\n  ssh_username = "ubuntu"\n  ami_name = "hardened-ubuntu-{{timestamp}}"\n  source_ami_filter {\n    filters = { name = "ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*", virtualization-type = "hvm", root-device-type = "ebs" }\n    most_recent = true\n    owners = ["099720109477"]\n  }\n}\nbuild {\n  sources = ["source.amazon-ebs.ubuntu"]\n  provisioner "shell" { inline = ["sudo apt-get update", "sudo apt-get install -y unattended-upgrades fail2ban", "sudo systemctl enable fail2ban"] }\n}\nEOF', explanation: 'Template.' } ], checkCommand: 'packer init image.pkr.hcl && packer validate image.pkr.hcl', expectedOutput: 'successfully' },
      { id: '3', title: 'Authenticate to AWS', instruction: 'Configure credentials.', summary: 'Cloud auth.', whyNeeded: 'Required to call EC2.', pillarConnection: 'Security',
        commands: [ { text: 'aws configure', explanation: 'Set keys.' } ], checkCommand: 'aws sts get-caller-identity --query Arn --output text', expectedOutput: 'arn:aws' },
      { id: '4', title: 'Build AMI', instruction: 'Run packer build.', summary: 'Bake image.', whyNeeded: 'Produce artifact.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'packer build image.pkr.hcl', explanation: 'Build.' } ], checkCommand: 'aws ec2 describe-images --owners self --query "Images[?starts_with(Name, \\"hardened-ubuntu\\")].ImageId" --output text', expectedOutput: 'ami-' },
      { id: '5', title: 'Smoke-Test the AMI', instruction: 'Launch instance from AMI and verify fail2ban.', summary: 'Validate baking.', whyNeeded: 'Confirm provisioner ran.', pillarConnection: 'Reliability',
        commands: [ { text: 'aws ec2 run-instances --image-id $AMI_ID --instance-type t3.micro --count 1', explanation: 'Launch.' }, { text: 'ssh ubuntu@$IP systemctl is-enabled fail2ban', explanation: 'Check.' } ], checkCommand: 'echo enabled', expectedOutput: 'enabled' }
    ]
  },
  {
    projectId: 'github-actions-react',
    environment: 'linux',
    description: 'Author a GitHub Actions workflow for a React app with caching, artifact upload, and Pages deployment.',
    objective: 'Build a CI pipeline using setup-node cache, upload-pages-artifact, and deploy-pages.',
    steps: [
      { id: '1', title: 'Create Workflow Skeleton', instruction: 'Add .github/workflows/ci.yml.', summary: 'Workflow file.', whyNeeded: 'Required path.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'mkdir -p .github/workflows', explanation: 'Dir.' } ], checkCommand: 'ls .github/workflows', expectedOutput: '' },
      { id: '2', title: 'Author Build Job', instruction: 'Use actions/setup-node with cache.', summary: 'Fast installs.', whyNeeded: 'Reduces minutes.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'cat > .github/workflows/ci.yml <<\'EOF\'\nname: ci\non: { push: { branches: [main] }, pull_request: {} }\npermissions: { contents: read, pages: write, id-token: write }\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: npm }\n      - run: npm ci\n      - run: npm test --if-present\n      - run: npm run build\n      - uses: actions/upload-pages-artifact@v3\n        with: { path: dist }\nEOF', explanation: 'Build job.' } ], checkCommand: 'grep -c "uses:" .github/workflows/ci.yml', expectedOutput: '' },
      { id: '3', title: 'Add Deploy Job', instruction: 'Deploy to GitHub Pages on main only.', summary: 'CD.', whyNeeded: 'Publish artifact.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat >> .github/workflows/ci.yml <<\'EOF\'\n  deploy:\n    needs: build\n    if: github.ref == \'refs/heads/main\'\n    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }\n    runs-on: ubuntu-latest\n    steps:\n      - id: deployment\n        uses: actions/deploy-pages@v4\nEOF', explanation: 'Deploy job.' } ], checkCommand: 'grep deploy-pages .github/workflows/ci.yml', expectedOutput: 'deploy-pages' },
      { id: '4', title: 'Enable Pages', instruction: 'Repo settings -> Pages -> Source = GitHub Actions.', summary: 'Hosting.', whyNeeded: 'Required to deploy.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "Repo Settings -> Pages -> Build and deployment -> Source: GitHub Actions"', explanation: 'UI step.' } ], checkCommand: 'echo enabled', expectedOutput: 'enabled' },
      { id: '5', title: 'Push and Verify', instruction: 'Push to main and watch Actions tab.', summary: 'Run pipeline.', whyNeeded: 'See green run.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci(actions): pages workflow" && git push', explanation: 'Trigger.' } ], checkCommand: 'git remote -v | grep github.com', expectedOutput: 'github.com' }
    ]
  },
  {
    projectId: 'vault-secrets',
    environment: 'linux',
    description: 'Run HashiCorp Vault, initialize, unseal, write KV secrets, and read with an AppRole.',
    objective: 'Stand up Vault, configure KV v2, set up AppRole auth, and rotate.',
    steps: [
      { id: '1', title: 'Run Vault Server', instruction: 'Use file storage backend for the lab.', summary: 'Start daemon.', whyNeeded: 'Required service.', pillarConnection: 'Security',
        commands: [ { text: 'cat > vault.hcl <<\'EOF\'\nstorage "file" { path = "/var/lib/vault" }\nlistener "tcp" { address = "0.0.0.0:8200" tls_disable = true }\nui = true\napi_addr = "http://127.0.0.1:8200"\nEOF', explanation: 'Config.' }, { text: 'sudo mkdir -p /var/lib/vault && sudo chown vault:vault /var/lib/vault', explanation: 'Storage dir.' }, { text: 'vault server -config=vault.hcl &', explanation: 'Start.' } ], checkCommand: 'curl -s http://127.0.0.1:8200/v1/sys/health | grep -o initialized', expectedOutput: 'initialized' },
      { id: '2', title: 'Initialize and Unseal', instruction: 'Generate keys and unseal with 3 of 5.', summary: 'Cryptographic bootstrap.', whyNeeded: 'Vault is sealed by default.', pillarConnection: 'Security',
        commands: [ { text: 'export VAULT_ADDR=http://127.0.0.1:8200', explanation: 'Address.' }, { text: 'vault operator init -key-shares=5 -key-threshold=3 > init.txt', explanation: 'Init.' }, { text: 'for i in 1 2 3; do vault operator unseal $(awk -v n=$i \'/Unseal Key/ {c++; if (c==n) print $4}\' init.txt); done', explanation: 'Unseal.' } ], checkCommand: 'vault status -format=json | grep -c \'"sealed":false\'', expectedOutput: '1' },
      { id: '3', title: 'Enable KV v2 and Write', instruction: 'Mount kv-v2 and write a secret.', summary: 'Secret store.', whyNeeded: 'Versioning + soft delete.', pillarConnection: 'Security',
        commands: [ { text: 'vault login $(awk \'/Initial Root Token/ {print $4}\' init.txt)', explanation: 'Login.' }, { text: 'vault secrets enable -path=secret kv-v2', explanation: 'Mount.' }, { text: 'vault kv put secret/app/db password=s3cret user=app', explanation: 'Write.' } ], checkCommand: 'vault kv get -field=user secret/app/db', expectedOutput: 'app' },
      { id: '4', title: 'AppRole for Apps', instruction: 'Enable AppRole and create role.', summary: 'Machine identity.', whyNeeded: 'Apps shouldn\'t use root token.', pillarConnection: 'Security',
        commands: [ { text: 'vault auth enable approle', explanation: 'Auth method.' }, { text: 'vault policy write app - <<\'EOF\'\npath "secret/data/app/*" { capabilities = ["read"] }\nEOF', explanation: 'Policy.' }, { text: 'vault write auth/approle/role/app token_policies=app', explanation: 'Role.' } ], checkCommand: 'vault read -field=role_id auth/approle/role/app/role-id', expectedOutput: '' },
      { id: '5', title: 'Read with AppRole', instruction: 'Issue secret-id, login, read secret.', summary: 'End-to-end auth.', whyNeeded: 'Validate flow.', pillarConnection: 'Reliability',
        commands: [ { text: 'RID=$(vault read -field=role_id auth/approle/role/app/role-id) && SID=$(vault write -field=secret_id -f auth/approle/role/app/secret-id)', explanation: 'Credentials.' }, { text: 'TOK=$(vault write -field=token auth/approle/login role_id=$RID secret_id=$SID)', explanation: 'Login.' }, { text: 'VAULT_TOKEN=$TOK vault kv get secret/app/db', explanation: 'Read.' } ], checkCommand: 'echo ok', expectedOutput: 'ok' }
    ]
  },
  {
    projectId: 'graylog-logs',
    environment: 'linux',
    description: 'Stand up Graylog with MongoDB and Elasticsearch/OpenSearch, ingest syslog, and define streams + alerts.',
    objective: 'Run the stack via Docker Compose, configure inputs, streams, and alert conditions.',
    steps: [
      { id: '1', title: 'Compose the Stack', instruction: 'Mongo + OpenSearch + Graylog containers.', summary: 'Three services.', whyNeeded: 'Graylog requires both backends.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > docker-compose.yml <<\'EOF\'\nversion: "3.8"\nservices:\n  mongo: { image: mongo:6, volumes: [mongo:/data/db] }\n  opensearch:\n    image: opensearchproject/opensearch:2\n    environment: { discovery.type: single-node, plugins.security.disabled: "true", OPENSEARCH_JAVA_OPTS: "-Xms1g -Xmx1g", OPENSEARCH_INITIAL_ADMIN_PASSWORD: "Strong-Pass-1!" }\n    volumes: [os:/usr/share/opensearch/data]\n  graylog:\n    image: graylog/graylog:5.2\n    environment:\n      GRAYLOG_PASSWORD_SECRET: somepasswordpepper\n      GRAYLOG_ROOT_PASSWORD_SHA2: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918\n      GRAYLOG_HTTP_EXTERNAL_URI: http://127.0.0.1:9000/\n      GRAYLOG_ELASTICSEARCH_HOSTS: http://opensearch:9200\n      GRAYLOG_MONGODB_URI: mongodb://mongo:27017/graylog\n    depends_on: [mongo, opensearch]\n    ports: ["9000:9000", "1514:1514/udp", "12201:12201/udp"]\nvolumes: { mongo: {}, os: {} }\nEOF', explanation: 'Compose.' }, { text: 'docker compose up -d', explanation: 'Run.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:9000', expectedOutput: '200' },
      { id: '2', title: 'Login and Create Input', instruction: 'Default admin/admin then create Syslog UDP input on 1514.', summary: 'Ingestion.', whyNeeded: 'Receive logs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "UI: System -> Inputs -> Syslog UDP -> bind 0.0.0.0:1514"', explanation: 'UI step.' } ], checkCommand: 'echo ok', expectedOutput: 'ok' },
      { id: '3', title: 'Forward Logs', instruction: 'Configure rsyslog on a host to send to Graylog.', summary: 'Wire source.', whyNeeded: 'Need data to stream.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "*.* @127.0.0.1:1514" | sudo tee /etc/rsyslog.d/90-graylog.conf', explanation: 'Forward.' }, { text: 'sudo systemctl restart rsyslog', explanation: 'Apply.' }, { text: 'logger "graylog test"', explanation: 'Send a message.' } ], checkCommand: 'echo sent', expectedOutput: 'sent' },
      { id: '4', title: 'Create Stream', instruction: 'Stream rule: source matches host pattern.', summary: 'Routing.', whyNeeded: 'Segment data.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "UI: Streams -> Create Stream -> Rule: field source matches regex .* -> Save & Start"', explanation: 'UI step.' } ], checkCommand: 'curl -s -u admin:admin http://127.0.0.1:9000/api/streams | grep -o "stream_rules"', expectedOutput: 'stream_rules' },
      { id: '5', title: 'Define Alert', instruction: 'Event Definition on stream when count > N in 5m.', summary: 'Alerting.', whyNeeded: 'Detect anomalies.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "UI: Alerts -> Event Definitions -> Create -> Aggregation count() > 100 in 5m -> Notification: Email"', explanation: 'UI step.' } ], checkCommand: 'echo ok', expectedOutput: 'ok' }
    ]
  },
  {
    projectId: 'spinnaker-cd',
    environment: 'linux',
    description: 'Deploy Spinnaker via Halyard against a local Kubernetes cluster and run a basic pipeline.',
    objective: 'Use halyard to configure providers, deploy Spinnaker, and create a pipeline.',
    steps: [
      { id: '1', title: 'Install Halyard', instruction: 'Run halyard in Docker.', summary: 'Spinnaker config CLI.', whyNeeded: 'Authoritative config tool.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run -d --name halyard --rm -v $HOME/.hal:/home/spinnaker/.hal -v $HOME/.kube:/home/spinnaker/.kube us-docker.pkg.dev/spinnaker-community/docker/halyard:stable', explanation: 'Halyard.' } ], checkCommand: 'docker exec halyard hal --version', expectedOutput: '' },
      { id: '2', title: 'Add Kubernetes Provider', instruction: 'Register the kube context.', summary: 'Target platform.', whyNeeded: 'Where deploys land.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker exec halyard hal config provider kubernetes enable', explanation: 'Enable.' }, { text: 'docker exec halyard hal config provider kubernetes account add my-k8s --context $(kubectl config current-context)', explanation: 'Account.' } ], checkCommand: 'docker exec halyard hal config provider kubernetes', expectedOutput: 'enabled: true' },
      { id: '3', title: 'Choose Deployment and Storage', instruction: 'Distributed install + S3/MinIO storage.', summary: 'Operational backend.', whyNeeded: 'Spinnaker needs persistence.', pillarConnection: 'Reliability',
        commands: [ { text: 'docker exec halyard hal config deploy edit --type distributed --account-name my-k8s', explanation: 'Distributed.' }, { text: 'docker exec halyard hal config storage s3 edit --endpoint http://minio:9000 --access-key-id KEY --secret-access-key SECRET --bucket spinnaker', explanation: 'Storage.' }, { text: 'docker exec halyard hal config storage edit --type s3', explanation: 'Select.' } ], checkCommand: 'docker exec halyard hal config storage', expectedOutput: 's3' },
      { id: '4', title: 'Deploy Spinnaker', instruction: 'Apply the config.', summary: 'Install services.', whyNeeded: 'Brings up Deck/Gate/etc.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker exec halyard hal deploy apply', explanation: 'Apply.' } ], checkCommand: 'kubectl -n spinnaker get pods', expectedOutput: 'spin-' },
      { id: '5', title: 'Create Pipeline', instruction: 'Use Deck UI: Bake -> Deploy stages.', summary: 'CD pipeline.', whyNeeded: 'Automate releases.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "Open http://localhost:9000 -> Applications -> Create -> Pipelines -> Add Stage Deploy (Manifest)"', explanation: 'UI.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'consul-discovery',
    environment: 'linux',
    description: 'Run a Consul cluster, register services, and use DNS/HTTP discovery from clients.',
    objective: 'Bootstrap servers, register a service with health check, query via DNS and HTTP.',
    steps: [
      { id: '1', title: 'Install Consul', instruction: 'Install from HashiCorp repo.', summary: 'Service mesh + discovery.', whyNeeded: 'Provides agents.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y consul', explanation: 'Install.' } ], checkCommand: 'consul version', expectedOutput: 'Consul' },
      { id: '2', title: 'Bootstrap Server', instruction: 'Run a single-server dev cluster.', summary: 'Lab cluster.', whyNeeded: 'Need a server.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /etc/consul.d/server.hcl >/dev/null <<\'EOF\'\nserver = true\nbootstrap_expect = 1\ndata_dir = "/var/lib/consul"\nclient_addr = "0.0.0.0"\nui_config { enabled = true }\nEOF', explanation: 'Config.' }, { text: 'sudo systemctl enable --now consul', explanation: 'Run.' } ], checkCommand: 'consul members', expectedOutput: 'alive' },
      { id: '3', title: 'Register Service', instruction: 'Service definition with HTTP health check.', summary: 'Catalog entry.', whyNeeded: 'Discovery requires registration.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /etc/consul.d/web.json >/dev/null <<\'EOF\'\n{ "service": { "name": "web", "port": 80, "check": { "http": "http://localhost/", "interval": "10s" } } }\nEOF', explanation: 'Service.' }, { text: 'sudo systemctl reload consul', explanation: 'Reload.' } ], checkCommand: 'consul catalog services', expectedOutput: 'web' },
      { id: '4', title: 'Query via DNS', instruction: 'Use dig against the Consul DNS port 8600.', summary: 'DNS discovery.', whyNeeded: 'Apps resolve via DNS.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'dig @127.0.0.1 -p 8600 web.service.consul SRV', explanation: 'SRV lookup.' } ], checkCommand: 'dig @127.0.0.1 -p 8600 web.service.consul +short', expectedOutput: '' },
      { id: '5', title: 'Query via HTTP API', instruction: 'curl /v1/health/service/web?passing=true.', summary: 'Programmatic discovery.', whyNeeded: 'Apps without DNS.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -s http://127.0.0.1:8500/v1/health/service/web?passing=true | jq .[0].Service.Address', explanation: 'API.' } ], checkCommand: 'curl -s http://127.0.0.1:8500/v1/status/leader', expectedOutput: ':' }
    ]
  },
  {
    projectId: 'newrelic-apm',
    environment: 'linux',
    description: 'Instrument a Node.js app with New Relic APM and the infrastructure agent on the host.',
    objective: 'Install both agents, set NEW_RELIC_LICENSE_KEY, and verify telemetry.',
    steps: [
      { id: '1', title: 'Install Infrastructure Agent', instruction: 'Use the official install script.', summary: 'Host telemetry.', whyNeeded: 'CPU/mem/process metrics.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash', explanation: 'Install CLI.' }, { text: 'sudo NEW_RELIC_API_KEY=$NR_KEY NEW_RELIC_ACCOUNT_ID=$NR_ACC newrelic install -n infrastructure-agent-installer', explanation: 'Install agent.' } ], checkCommand: 'systemctl is-active newrelic-infra', expectedOutput: 'active' },
      { id: '2', title: 'Add APM Package', instruction: 'npm install newrelic.', summary: 'App-level tracing.', whyNeeded: 'Code-level visibility.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'npm install --save newrelic', explanation: 'Install.' } ], checkCommand: 'node -e "require(\'newrelic\')" 2>&1 | head -1', expectedOutput: '' },
      { id: '3', title: 'Configure newrelic.js', instruction: 'Set app_name and license_key via env vars.', summary: 'Agent config.', whyNeeded: 'Identifies app in UI.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > newrelic.js <<\'EOF\'\nexports.config = { app_name: [process.env.NR_APP || \'demo\'], license_key: process.env.NEW_RELIC_LICENSE_KEY, logging: { level: \'info\' }, distributed_tracing: { enabled: true } };\nEOF', explanation: 'Config.' } ], checkCommand: 'test -f newrelic.js && echo OK', expectedOutput: 'OK' },
      { id: '4', title: 'Start App with Agent', instruction: 'node -r newrelic preloads the agent.', summary: 'Activate APM.', whyNeeded: 'Agent must initialize first.', pillarConnection: 'Reliability',
        commands: [ { text: 'NEW_RELIC_LICENSE_KEY=$LIC NR_APP=demo node -r newrelic server.js &', explanation: 'Start.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', expectedOutput: '200' },
      { id: '5', title: 'Verify in NR One', instruction: 'Confirm host + APM service appear.', summary: 'Validate telemetry.', whyNeeded: 'No data = misconfig.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "one.newrelic.com -> APM & Services -> demo and Hosts"', explanation: 'UI step.' } ], checkCommand: 'echo ok', expectedOutput: 'ok' }
    ]
  },
  {
    projectId: 'travis-ci-ruby',
    environment: 'linux',
    description: 'Configure Travis CI for a Ruby project with bundler caching, multiple Ruby versions, and deploy.',
    objective: 'Author .travis.yml using rvm matrix, bundler caching, and conditional deploy.',
    steps: [
      { id: '1', title: 'Initialize Project', instruction: 'Ensure Gemfile and tests exist.', summary: 'Build inputs.', whyNeeded: 'CI needs a project.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'bundle init && echo "gem \\"rspec\\"" >> Gemfile && bundle install', explanation: 'Bootstrap.' } ], checkCommand: 'test -f Gemfile.lock && echo OK', expectedOutput: 'OK' },
      { id: '2', title: 'Author .travis.yml', instruction: 'rvm matrix + bundler cache.', summary: 'Pipeline.', whyNeeded: 'Test on multiple Rubies.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > .travis.yml <<\'EOF\'\nlanguage: ruby\nrvm: [3.0, 3.1, 3.2]\ncache: bundler\nscript:\n  - bundle exec rspec\nbranches: { only: [main] }\ndeploy:\n  provider: script\n  script: bash scripts/deploy.sh\n  on: { branch: main }\nEOF', explanation: 'Config.' } ], checkCommand: 'grep rvm .travis.yml', expectedOutput: 'rvm' },
      { id: '3', title: 'Enable Repo on Travis', instruction: 'Sign in at travis-ci.com and toggle repo.', summary: 'Repo activation.', whyNeeded: 'Travis needs permission.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "travis-ci.com -> Settings -> enable repo"', explanation: 'UI step.' } ], checkCommand: 'echo ok', expectedOutput: 'ok' },
      { id: '4', title: 'Add Encrypted Variables', instruction: 'Use travis CLI to encrypt deploy token.', summary: 'Secret handling.', whyNeeded: 'Avoid leaking tokens.', pillarConnection: 'Security',
        commands: [ { text: 'gem install travis && travis encrypt DEPLOY_TOKEN=xyz --add env.global', explanation: 'Encrypt.' } ], checkCommand: 'grep secure .travis.yml', expectedOutput: 'secure' },
      { id: '5', title: 'Push and Watch Build', instruction: 'Commit, push, and watch build status.', summary: 'Validate.', whyNeeded: 'Confirm matrix runs.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci: travis" && git push', explanation: 'Push.' } ], checkCommand: 'echo pushed', expectedOutput: 'pushed' }
    ]
  },
  {
    projectId: 'chef-infra',
    environment: 'linux',
    description: 'Use Chef Infra Client (chef-zero/local mode) to converge a cookbook installing nginx.',
    objective: 'Author a cookbook with recipe + template, then converge with chef-client --local-mode.',
    steps: [
      { id: '1', title: 'Install Chef Workstation', instruction: 'Install chef-workstation deb.', summary: 'Authoring toolset.', whyNeeded: 'Provides chef and knife.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -Ls https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chef-workstation', explanation: 'Install.' } ], checkCommand: 'chef --version', expectedOutput: 'Chef' },
      { id: '2', title: 'Generate Cookbook', instruction: 'chef generate cookbook web.', summary: 'Scaffold.', whyNeeded: 'Standard layout.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'chef generate cookbook cookbooks/web', explanation: 'Generate.' } ], checkCommand: 'ls cookbooks/web/recipes/default.rb', expectedOutput: 'default.rb' },
      { id: '3', title: 'Author Recipe', instruction: 'Install + start nginx and template index.html.', summary: 'Resources.', whyNeeded: 'Declarative state.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > cookbooks/web/recipes/default.rb <<\'EOF\'\npackage \'nginx\'\nservice \'nginx\' do\n  action [:enable, :start]\nend\ntemplate \'/var/www/html/index.html\' do\n  source \'index.html.erb\'\n  variables(host: node[\'hostname\'])\nend\nEOF', explanation: 'Recipe.' }, { text: 'mkdir -p cookbooks/web/templates && cat > cookbooks/web/templates/index.html.erb <<\'EOF\'\n<h1>Hello from <%= @host %></h1>\nEOF', explanation: 'Template.' } ], checkCommand: 'cookstyle cookbooks/web 2>&1 | tail -1', expectedOutput: '' },
      { id: '4', title: 'Converge in Local Mode', instruction: 'chef-client --local-mode applies the run_list.', summary: 'Apply state.', whyNeeded: 'No Chef server needed for the lab.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo chef-client --local-mode --runlist "recipe[web]" --chef-license accept-silent', explanation: 'Converge.' } ], checkCommand: 'systemctl is-active nginx', expectedOutput: 'active' },
      { id: '5', title: 'Test with InSpec', instruction: 'Author a control and run.', summary: 'Compliance test.', whyNeeded: 'Verify desired state.', pillarConnection: 'Reliability',
        commands: [ { text: 'mkdir -p test/controls && cat > test/controls/web.rb <<\'EOF\'\ncontrol \'nginx-running\' do\n  describe service(\'nginx\') do it { should be_running } end\n  describe port(80) do it { should be_listening } end\nend\nEOF', explanation: 'Control.' }, { text: 'inspec exec test', explanation: 'Run.' } ], checkCommand: 'inspec exec test 2>&1 | grep -c "0 failures"', expectedOutput: '1' }
    ]
  },
  {
    projectId: 'puppet-config',
    environment: 'linux',
    description: 'Use Puppet apply with a module to manage NTP across a host.',
    objective: 'Install puppet-agent, write a manifest using a module, and converge.',
    steps: [
      { id: '1', title: 'Install Puppet Agent', instruction: 'Use the puppet release deb.', summary: 'Install.', whyNeeded: 'Provides puppet binary.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'wget https://apt.puppet.com/puppet8-release-$(lsb_release -cs).deb && sudo dpkg -i puppet8-release-$(lsb_release -cs).deb', explanation: 'Repo deb.' }, { text: 'sudo apt-get update && sudo apt-get install -y puppet-agent', explanation: 'Install.' }, { text: 'echo "export PATH=/opt/puppetlabs/bin:$PATH" | sudo tee /etc/profile.d/puppet.sh', explanation: 'PATH.' } ], checkCommand: '/opt/puppetlabs/bin/puppet --version', expectedOutput: '' },
      { id: '2', title: 'Install Module', instruction: 'puppet module install puppetlabs-ntp.', summary: 'Reusable code.', whyNeeded: 'Battle-tested module.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo /opt/puppetlabs/bin/puppet module install puppetlabs-ntp', explanation: 'Install module.' } ], checkCommand: '/opt/puppetlabs/bin/puppet module list | grep ntp', expectedOutput: 'ntp' },
      { id: '3', title: 'Write Manifest', instruction: 'site.pp invoking the ntp class.', summary: 'Declarative config.', whyNeeded: 'Defines desired state.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > site.pp <<\'EOF\'\nclass { \'ntp\':\n  servers => [\'time.cloudflare.com\', \'pool.ntp.org\'],\n  restrict => [\'default ignore\', \'127.0.0.1\'],\n}\nEOF', explanation: 'Manifest.' } ], checkCommand: '/opt/puppetlabs/bin/puppet parser validate site.pp && echo OK', expectedOutput: 'OK' },
      { id: '4', title: 'Apply Manifest', instruction: 'puppet apply with --noop first.', summary: 'Converge.', whyNeeded: 'See changes before applying.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo /opt/puppetlabs/bin/puppet apply --noop site.pp', explanation: 'Dry run.' }, { text: 'sudo /opt/puppetlabs/bin/puppet apply site.pp', explanation: 'Apply.' } ], checkCommand: 'systemctl is-active ntp || systemctl is-active chrony || systemctl is-active ntpsec', expectedOutput: 'active' },
      { id: '5', title: 'Idempotency Check', instruction: 'Re-apply and confirm zero changes.', summary: 'Convergence proof.', whyNeeded: 'Validates declarative model.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo /opt/puppetlabs/bin/puppet apply --detailed-exitcodes site.pp; echo exit=$?', explanation: 'Exit 0 means no changes.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'azure-devops-net',
    environment: 'linux',
    description: 'Build and deploy a .NET app via Azure DevOps Pipelines using azure-pipelines.yml.',
    objective: 'Author a multi-stage YAML pipeline with build, test, and deploy to Azure Web App.',
    steps: [
      { id: '1', title: 'Create Service Connection', instruction: 'Add Azure Resource Manager connection in DevOps project.', summary: 'Cloud auth.', whyNeeded: 'Pipeline needs to deploy.', pillarConnection: 'Security',
        commands: [ { text: 'echo "DevOps -> Project Settings -> Service connections -> New -> Azure Resource Manager (Workload identity federation)"', explanation: 'UI step.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '2', title: 'Author azure-pipelines.yml', instruction: 'Stages: Build, Test, Deploy.', summary: 'Pipeline-as-code.', whyNeeded: 'Versioned with code.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > azure-pipelines.yml <<\'EOF\'\ntrigger: [main]\npool: { vmImage: ubuntu-latest }\nvariables: { buildConfiguration: Release }\nstages:\n  - stage: Build\n    jobs:\n      - job: BuildJob\n        steps:\n          - task: UseDotNet@2\n            inputs: { packageType: sdk, version: 8.x }\n          - script: dotnet restore\n          - script: dotnet build --configuration $(buildConfiguration) --no-restore\n          - script: dotnet test --configuration $(buildConfiguration) --logger trx\n          - task: PublishTestResults@2\n            inputs: { testResultsFormat: VSTest, testResultsFiles: \'**/*.trx\' }\n          - script: dotnet publish -c $(buildConfiguration) -o $(Build.ArtifactStagingDirectory)\n          - publish: $(Build.ArtifactStagingDirectory)\n            artifact: drop\n  - stage: Deploy\n    dependsOn: Build\n    jobs:\n      - deployment: Web\n        environment: prod\n        strategy:\n          runOnce:\n            deploy:\n              steps:\n                - download: current\n                  artifact: drop\n                - task: AzureWebApp@1\n                  inputs: { azureSubscription: \'azure-rm-sc\', appName: my-app, package: $(Pipeline.Workspace)/drop }\nEOF', explanation: 'Pipeline.' } ], checkCommand: 'grep -c stage: azure-pipelines.yml', expectedOutput: '' },
      { id: '3', title: 'Create Environment', instruction: 'Add prod environment with approval.', summary: 'Approvals.', whyNeeded: 'Gate production.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Pipelines -> Environments -> New -> prod -> Approvals & Checks -> Approvals"', explanation: 'UI step.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '4', title: 'Run Pipeline', instruction: 'Push and observe runs.', summary: 'Trigger.', whyNeeded: 'Validate.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci: azure devops pipeline" && git push', explanation: 'Trigger.' } ], checkCommand: 'echo pushed', expectedOutput: 'pushed' },
      { id: '5', title: 'Verify Deployment', instruction: 'Hit the web app and check Application Insights.', summary: 'Validate.', whyNeeded: 'Confirm live.', pillarConnection: 'Reliability',
        commands: [ { text: 'curl -s -o /dev/null -w "%{http_code}" https://my-app.azurewebsites.net', explanation: 'HTTP check.' } ], checkCommand: 'echo 200', expectedOutput: '200' }
    ]
  },
  {
    projectId: 'splunk-analysis',
    environment: 'linux',
    description: 'Run Splunk Free in Docker, ingest via universal forwarder, and run searches.',
    objective: 'Stand up Splunk, configure HEC + UF, and craft SPL searches.',
    steps: [
      { id: '1', title: 'Run Splunk', instruction: 'docker run with admin password.', summary: 'Start indexer.', whyNeeded: 'Needed to ingest.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run -d --name splunk -p 8000:8000 -p 8089:8089 -p 8088:8088 -p 9997:9997 -e SPLUNK_START_ARGS=--accept-license -e SPLUNK_PASSWORD=Strong-Pass-1! splunk/splunk:latest', explanation: 'Run.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8000', expectedOutput: '200' },
      { id: '2', title: 'Enable HTTP Event Collector', instruction: 'Create an HEC token.', summary: 'HTTP ingest.', whyNeeded: 'Easiest API ingest.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker exec splunk /opt/splunk/bin/splunk http-event-collector enable -uri https://localhost:8089 -auth admin:Strong-Pass-1!', explanation: 'Enable HEC.' }, { text: 'docker exec splunk /opt/splunk/bin/splunk http-event-collector create demo -uri https://localhost:8089 -auth admin:Strong-Pass-1!', explanation: 'Token.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '3', title: 'Send Sample Events', instruction: 'curl HEC endpoint.', summary: 'Push data.', whyNeeded: 'Validate ingest.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -k https://localhost:8088/services/collector -H "Authorization: Splunk $TOKEN" -d \'{"event":"hello","sourcetype":"demo"}\'', explanation: 'Send event.' } ], checkCommand: 'echo sent', expectedOutput: 'sent' },
      { id: '4', title: 'Install Universal Forwarder', instruction: 'On a host, run UF and forward syslog.', summary: 'Agent ingest.', whyNeeded: 'Ship logs from servers.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'wget -O splunkforwarder.deb \'https://download.splunk.com/...\' && sudo dpkg -i splunkforwarder.deb', explanation: 'Install (URL placeholder).' }, { text: 'sudo /opt/splunkforwarder/bin/splunk add forward-server SPLUNK_HOST:9997 -auth admin:Strong-Pass-1!', explanation: 'Forward.' }, { text: 'sudo /opt/splunkforwarder/bin/splunk add monitor /var/log/syslog -auth admin:Strong-Pass-1!', explanation: 'Monitor.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '5', title: 'Run SPL Search', instruction: 'Search and stats by sourcetype.', summary: 'Analytics.', whyNeeded: 'Extract value.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "search: index=* | stats count by sourcetype | sort - count"', explanation: 'SPL example.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'datadog-monitoring',
    environment: 'linux',
    description: 'Install the Datadog agent, enable APM/log collection, and create a monitor + dashboard.',
    objective: 'Configure agent, send logs, and build a CPU monitor.',
    steps: [
      { id: '1', title: 'Install Agent', instruction: 'Use the one-liner installer.', summary: 'Telemetry agent.', whyNeeded: 'Source of truth.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'DD_API_KEY=$DD_API_KEY DD_SITE=datadoghq.com bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"', explanation: 'Install.' } ], checkCommand: 'sudo systemctl is-active datadog-agent', expectedOutput: 'active' },
      { id: '2', title: 'Enable Log Collection', instruction: 'Set logs_enabled and add a log integration.', summary: 'Logs to DD.', whyNeeded: 'Unified backend.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo sed -i "s/^# logs_enabled.*/logs_enabled: true/" /etc/datadog-agent/datadog.yaml', explanation: 'Enable.' }, { text: 'sudo tee /etc/datadog-agent/conf.d/syslog.d/conf.yaml >/dev/null <<\'EOF\'\nlogs:\n  - type: file\n    path: /var/log/syslog\n    service: host\n    source: syslog\nEOF', explanation: 'Source.' }, { text: 'sudo systemctl restart datadog-agent', explanation: 'Apply.' } ], checkCommand: 'sudo datadog-agent status | grep -A1 "Logs Agent" | head -2', expectedOutput: 'Logs' },
      { id: '3', title: 'Enable APM', instruction: 'Set apm_config.enabled and instrument app.', summary: 'Trace ingest.', whyNeeded: 'Code-level tracing.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo sed -i "/^# apm_config:/,/^# *enabled:/ s/.*/apm_config:\\n  enabled: true/" /etc/datadog-agent/datadog.yaml', explanation: 'Enable apm.' }, { text: 'npm install dd-trace --save && DD_SERVICE=demo DD_ENV=prod node -r dd-trace/init server.js', explanation: 'Node example.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8126', expectedOutput: '404' },
      { id: '4', title: 'Create Monitor', instruction: 'CPU > 80% for 5m via API.', summary: 'Alerting.', whyNeeded: 'Detect issues.', pillarConnection: 'Reliability',
        commands: [ { text: 'curl -X POST "https://api.datadoghq.com/api/v1/monitor" -H "DD-API-KEY: $DD_API_KEY" -H "DD-APPLICATION-KEY: $DD_APP_KEY" -H "Content-Type: application/json" -d \'{ "name": "High CPU", "type": "metric alert", "query": "avg(last_5m):avg:system.cpu.user{*} > 80", "message": "CPU high @pagerduty" }\'', explanation: 'Create.' } ], checkCommand: 'echo monitor-created', expectedOutput: 'monitor-created' },
      { id: '5', title: 'Build Dashboard', instruction: 'Import a JSON dashboard via API.', summary: 'Visualization.', whyNeeded: 'See trends.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "Use /api/v1/dashboard with a JSON body containing widgets[].definition (timeseries on system.cpu.user)"', explanation: 'API.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'bitbucket-pipelines',
    environment: 'linux',
    description: 'Configure Bitbucket Pipelines for a Python/Django project with caching, parallel steps, and deploy.',
    objective: 'Author bitbucket-pipelines.yml using definitions, caches, and deployment steps.',
    steps: [
      { id: '1', title: 'Enable Pipelines', instruction: 'Repo settings -> Pipelines -> Enable.', summary: 'Activate CI.', whyNeeded: 'Required toggle.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "Repository settings -> Pipelines -> Settings -> Enable"', explanation: 'UI.' } ], checkCommand: 'echo enabled', expectedOutput: 'enabled' },
      { id: '2', title: 'Author Pipelines YAML', instruction: 'Use python image with pip cache.', summary: 'Pipeline-as-code.', whyNeeded: 'Versioned CI.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > bitbucket-pipelines.yml <<\'EOF\'\nimage: python:3.12\ndefinitions:\n  caches: { pipenv: ~/.cache/pip }\npipelines:\n  default:\n    - parallel:\n        - step:\n            name: Lint\n            caches: [pipenv]\n            script: [ "pip install ruff", "ruff check ." ]\n        - step:\n            name: Test\n            caches: [pipenv]\n            script: [ "pip install -r requirements.txt", "pytest --junitxml=test-results.xml" ]\n  branches:\n    main:\n      - step:\n          name: Deploy\n          deployment: production\n          script: [ "pip install awscli", "aws s3 sync ./build s3://$BUCKET --delete" ]\nEOF', explanation: 'YAML.' } ], checkCommand: 'grep -c step: bitbucket-pipelines.yml', expectedOutput: '' },
      { id: '3', title: 'Configure Variables', instruction: 'Add BUCKET/AWS keys as repo variables.', summary: 'Secrets.', whyNeeded: 'Avoid hardcoding.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Repo settings -> Pipelines -> Repository variables -> add BUCKET, AWS_ACCESS_KEY_ID (secured), AWS_SECRET_ACCESS_KEY (secured)"', explanation: 'UI.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '4', title: 'Add Deployment Environment', instruction: 'Define production environment with approval.', summary: 'Gated deploy.', whyNeeded: 'Manual gate.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Deployments -> production -> require manual approval"', explanation: 'UI.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '5', title: 'Run Pipeline', instruction: 'Push commit and watch.', summary: 'Validate.', whyNeeded: 'See it run.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci: bitbucket pipelines" && git push', explanation: 'Push.' } ], checkCommand: 'echo pushed', expectedOutput: 'pushed' }
    ]
  },
  {
    projectId: 'vagrant-local',
    environment: 'linux',
    description: 'Use Vagrant with VirtualBox to manage a local multi-VM dev environment with provisioning.',
    objective: 'Author a Vagrantfile with multiple machines and a shell provisioner.',
    steps: [
      { id: '1', title: 'Install Vagrant + VirtualBox', instruction: 'Install both packages.', summary: 'VM toolchain.', whyNeeded: 'Required.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y virtualbox vagrant', explanation: 'Install.' } ], checkCommand: 'vagrant --version', expectedOutput: 'Vagrant' },
      { id: '2', title: 'Author Vagrantfile', instruction: 'Two VMs (web/db) on a private network.', summary: 'Multi-machine.', whyNeeded: 'Realistic topology.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > Vagrantfile <<\'EOF\'\nVagrant.configure("2") do |config|\n  config.vm.box = "ubuntu/jammy64"\n  config.vm.define "web" do |w|\n    w.vm.hostname = "web"\n    w.vm.network "private_network", ip: "192.168.56.10"\n    w.vm.provision "shell", inline: "apt-get update && apt-get install -y nginx"\n  end\n  config.vm.define "db" do |d|\n    d.vm.hostname = "db"\n    d.vm.network "private_network", ip: "192.168.56.11"\n    d.vm.provision "shell", inline: "apt-get update && apt-get install -y postgresql"\n  end\nend\nEOF', explanation: 'Vagrantfile.' } ], checkCommand: 'vagrant validate', expectedOutput: 'valid' },
      { id: '3', title: 'Bring Up VMs', instruction: 'vagrant up.', summary: 'Provision.', whyNeeded: 'Create the lab.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'vagrant up', explanation: 'Up.' } ], checkCommand: 'vagrant status | grep running | wc -l', expectedOutput: '2' },
      { id: '4', title: 'SSH and Verify', instruction: 'Confirm services.', summary: 'Validate provisioner.', whyNeeded: 'Spot failures.', pillarConnection: 'Reliability',
        commands: [ { text: 'vagrant ssh web -c "systemctl is-active nginx"', explanation: 'Check web.' }, { text: 'vagrant ssh db -c "systemctl is-active postgresql"', explanation: 'Check db.' } ], checkCommand: 'echo active', expectedOutput: 'active' },
      { id: '5', title: 'Snapshot and Destroy', instruction: 'Snapshot for fast rollback then destroy.', summary: 'Lifecycle.', whyNeeded: 'Manage state.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'vagrant snapshot save web baseline', explanation: 'Snapshot.' }, { text: 'vagrant destroy -f', explanation: 'Tear down.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'rancher-k8s',
    environment: 'linux',
    description: 'Deploy Rancher in Docker, import an existing Kubernetes cluster, and manage workloads.',
    objective: 'Run Rancher, configure SSL, import cluster, and deploy a workload via UI/API.',
    steps: [
      { id: '1', title: 'Run Rancher', instruction: 'Use the official rancher/rancher image.', summary: 'Multi-cluster manager.', whyNeeded: 'Provides UI.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged --name rancher rancher/rancher:latest', explanation: 'Run.' } ], checkCommand: 'curl -sk -o /dev/null -w "%{http_code}" https://localhost', expectedOutput: '200' },
      { id: '2', title: 'Initial Bootstrap', instruction: 'Read bootstrap password and set admin.', summary: 'First login.', whyNeeded: 'Required setup.', pillarConnection: 'Security',
        commands: [ { text: 'docker logs rancher 2>&1 | grep "Bootstrap Password" | tail -1', explanation: 'Initial password.' } ], checkCommand: 'echo done', expectedOutput: 'done' },
      { id: '3', title: 'Import Cluster', instruction: 'Run the import yaml on a kube context.', summary: 'Onboarding.', whyNeeded: 'Manage existing cluster.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "UI: Cluster Management -> Import Existing -> Generic -> kubectl apply -f https://rancher/.../import.yaml"', explanation: 'UI.' }, { text: 'kubectl apply -f https://rancher/.../import.yaml', explanation: 'Apply.' } ], checkCommand: 'kubectl -n cattle-system get pods', expectedOutput: 'cattle-cluster-agent' },
      { id: '4', title: 'Deploy Workload', instruction: 'Use Rancher UI or kubectl.', summary: 'Smoke test.', whyNeeded: 'Confirm management.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl create deploy hello --image=nginx && kubectl expose deploy hello --port 80 --type ClusterIP', explanation: 'Workload.' } ], checkCommand: 'kubectl get deploy hello -o jsonpath={.status.readyReplicas}', expectedOutput: '1' },
      { id: '5', title: 'Configure RBAC and Projects', instruction: 'Create a Project and assign users.', summary: 'Multi-tenancy.', whyNeeded: 'Org alignment.', pillarConnection: 'Security',
        commands: [ { text: 'echo "UI: Cluster -> Projects/Namespaces -> Create Project -> Members -> Add"', explanation: 'UI.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'tekton-ci',
    environment: 'linux',
    description: 'Install Tekton Pipelines on Kubernetes and run a Task + Pipeline that builds and pushes an image.',
    objective: 'Apply Tekton CRDs, write Task/Pipeline/PipelineRun, and observe.',
    steps: [
      { id: '1', title: 'Install Tekton', instruction: 'Apply the latest release manifest.', summary: 'CRDs + controller.', whyNeeded: 'Required to run pipelines.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml', explanation: 'Install.' } ], checkCommand: 'kubectl -n tekton-pipelines get deploy tekton-pipelines-controller -o jsonpath={.status.readyReplicas}', expectedOutput: '1' },
      { id: '2', title: 'Write Task', instruction: 'Task that runs git-clone + kaniko.', summary: 'Reusable step.', whyNeeded: 'Atomic build steps.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > task-build.yaml <<\'EOF\'\napiVersion: tekton.dev/v1\nkind: Task\nmetadata: { name: build-image }\nspec:\n  params: [{ name: image, type: string }, { name: url, type: string }]\n  workspaces: [{ name: source }]\n  steps:\n    - name: clone\n      image: alpine/git\n      script: git clone $(params.url) $(workspaces.source.path)\n    - name: build\n      image: gcr.io/kaniko-project/executor:latest\n      args: ["--dockerfile=Dockerfile","--context=$(workspaces.source.path)","--destination=$(params.image)"]\nEOF', explanation: 'Task.' }, { text: 'kubectl apply -f task-build.yaml', explanation: 'Apply.' } ], checkCommand: 'kubectl get task build-image -o name', expectedOutput: 'task.tekton.dev/build-image' },
      { id: '3', title: 'Write Pipeline', instruction: 'Pipeline composing the task.', summary: 'Workflow.', whyNeeded: 'Multi-task orchestration.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > pipeline.yaml <<\'EOF\'\napiVersion: tekton.dev/v1\nkind: Pipeline\nmetadata: { name: ci }\nspec:\n  params: [{ name: image }, { name: url }]\n  workspaces: [{ name: shared }]\n  tasks:\n    - name: build\n      taskRef: { name: build-image }\n      params:\n        - { name: image, value: $(params.image) }\n        - { name: url,   value: $(params.url) }\n      workspaces: [{ name: source, workspace: shared }]\nEOF', explanation: 'Pipeline.' }, { text: 'kubectl apply -f pipeline.yaml', explanation: 'Apply.' } ], checkCommand: 'kubectl get pipeline ci -o name', expectedOutput: 'pipeline.tekton.dev/ci' },
      { id: '4', title: 'PipelineRun', instruction: 'Run with a PVC workspace.', summary: 'Execute.', whyNeeded: 'Trigger pipeline.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > run.yaml <<\'EOF\'\napiVersion: tekton.dev/v1\nkind: PipelineRun\nmetadata: { generateName: ci- }\nspec:\n  pipelineRef: { name: ci }\n  params:\n    - { name: image, value: registry.example.com/app:1 }\n    - { name: url,   value: https://github.com/me/app.git }\n  workspaces:\n    - name: shared\n      volumeClaimTemplate:\n        spec: { accessModes: [ReadWriteOnce], resources: { requests: { storage: 1Gi } } }\nEOF', explanation: 'Run spec.' }, { text: 'kubectl create -f run.yaml', explanation: 'Submit.' } ], checkCommand: 'kubectl get pipelinerun --sort-by=.metadata.creationTimestamp -o name | tail -1', expectedOutput: 'pipelinerun' },
      { id: '5', title: 'Observe with tkn CLI', instruction: 'Install tkn and follow logs.', summary: 'Inspection.', whyNeeded: 'Debug runs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'tkn pipelinerun logs --last -f', explanation: 'Stream.' } ], checkCommand: 'tkn pipelinerun describe --last | grep Succeeded || true', expectedOutput: '' }
    ]
  },
  {
    projectId: 'pulumi-iac',
    environment: 'linux',
    description: 'Provision an Azure Resource Group + Storage Account using Pulumi (TypeScript).',
    objective: 'Author program, preview, deploy, and destroy with state in Pulumi Cloud or local backend.',
    steps: [
      { id: '1', title: 'Install Pulumi', instruction: 'Use the install script.', summary: 'CLI.', whyNeeded: 'Required.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -fsSL https://get.pulumi.com | sh', explanation: 'Install.' }, { text: 'export PATH=$HOME/.pulumi/bin:$PATH', explanation: 'PATH.' } ], checkCommand: 'pulumi version', expectedOutput: 'v' },
      { id: '2', title: 'New Project', instruction: 'pulumi new azure-typescript.', summary: 'Scaffold.', whyNeeded: 'Boilerplate.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'pulumi login --local', explanation: 'Local backend.' }, { text: 'mkdir infra && cd infra && pulumi new azure-typescript -y --force', explanation: 'New project.' } ], checkCommand: 'test -f Pulumi.yaml && echo OK', expectedOutput: 'OK' },
      { id: '3', title: 'Author Program', instruction: 'Define RG + Storage Account.', summary: 'IaC code.', whyNeeded: 'Declarative resources.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > index.ts <<\'EOF\'\nimport * as resources from "@pulumi/azure-native/resources";\nimport * as storage from "@pulumi/azure-native/storage";\nconst rg = new resources.ResourceGroup("rg");\nconst sa = new storage.StorageAccount("sa", { resourceGroupName: rg.name, sku: { name: "Standard_LRS" }, kind: "StorageV2" });\nexport const accountName = sa.name;\nEOF', explanation: 'Program.' } ], checkCommand: 'grep StorageAccount index.ts', expectedOutput: 'StorageAccount' },
      { id: '4', title: 'Preview and Deploy', instruction: 'pulumi up.', summary: 'Deploy.', whyNeeded: 'Apply state.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'pulumi preview', explanation: 'Plan.' }, { text: 'pulumi up -y', explanation: 'Apply.' } ], checkCommand: 'pulumi stack output accountName', expectedOutput: '' },
      { id: '5', title: 'Destroy', instruction: 'Tear down resources cleanly.', summary: 'Lifecycle.', whyNeeded: 'Avoid cost.', pillarConnection: 'Cost Optimization',
        commands: [ { text: 'pulumi destroy -y && pulumi stack rm dev -y', explanation: 'Destroy.' } ], checkCommand: 'echo destroyed', expectedOutput: 'destroyed' }
    ]
  },
  {
    projectId: 'grafana-dashboards',
    environment: 'linux',
    description: 'Run Grafana with Prometheus, scrape node_exporter, and import a hardware dashboard.',
    objective: 'Stand up the stack via Docker Compose, configure datasource, import dashboard 1860.',
    steps: [
      { id: '1', title: 'Compose Prom + Grafana + node_exporter', instruction: 'docker-compose.yml with three services.', summary: 'Observability stack.', whyNeeded: 'Self-hosted lab.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cat > docker-compose.yml <<\'EOF\'\nversion: "3.8"\nservices:\n  prom:\n    image: prom/prometheus\n    volumes: ["./prom.yml:/etc/prometheus/prometheus.yml"]\n    ports: ["9090:9090"]\n  node:\n    image: prom/node-exporter\n    pid: host\n    network_mode: host\n  grafana:\n    image: grafana/grafana\n    ports: ["3000:3000"]\n    environment: { GF_SECURITY_ADMIN_PASSWORD: admin }\nEOF', explanation: 'Compose.' }, { text: 'cat > prom.yml <<\'EOF\'\nscrape_configs:\n  - job_name: node\n    static_configs: [{ targets: ["host.docker.internal:9100"] }]\nEOF', explanation: 'Prom config.' }, { text: 'docker compose up -d', explanation: 'Up.' } ], checkCommand: 'curl -s http://localhost:9090/-/ready', expectedOutput: 'Ready' },
      { id: '2', title: 'Login and Add Datasource', instruction: 'Provision Prometheus datasource via API.', summary: 'Datasource.', whyNeeded: 'Connect Grafana to Prom.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -u admin:admin -H "Content-Type: application/json" -X POST http://localhost:3000/api/datasources -d \'{"name":"Prom","type":"prometheus","access":"proxy","url":"http://prom:9090"}\'', explanation: 'Create datasource.' } ], checkCommand: 'curl -u admin:admin -s http://localhost:3000/api/datasources/name/Prom | grep -o \'"name":"Prom"\'', expectedOutput: 'Prom' },
      { id: '3', title: 'Import Dashboard 1860', instruction: 'Use the dashboard import API.', summary: 'Pre-built panels.', whyNeeded: 'Saves time.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'curl -s https://grafana.com/api/dashboards/1860/revisions/latest/download -o nodefull.json', explanation: 'Download.' }, { text: 'jq \'{dashboard:., overwrite:true, inputs:[{name:"DS_PROMETHEUS",type:"datasource",pluginId:"prometheus",value:"Prom"}]}\' nodefull.json > import.json', explanation: 'Wrap.' }, { text: 'curl -u admin:admin -H "Content-Type: application/json" -X POST http://localhost:3000/api/dashboards/import -d @import.json', explanation: 'Import.' } ], checkCommand: 'curl -u admin:admin -s "http://localhost:3000/api/search?query=node" | grep -c title', expectedOutput: '' },
      { id: '4', title: 'Add Alert Rule', instruction: 'Create alert on high CPU.', summary: 'Alerting.', whyNeeded: 'Notify on issues.', pillarConnection: 'Reliability',
        commands: [ { text: 'echo "UI: Alerting -> Alert rules -> New -> expr: 100 - avg by (instance)(rate(node_cpu_seconds_total{mode=\\"idle\\"}[5m])) * 100 > 80"', explanation: 'Rule.' } ], checkCommand: 'echo created', expectedOutput: 'created' },
      { id: '5', title: 'Add Notification Channel', instruction: 'Configure contact point (Slack webhook).', summary: 'Delivery.', whyNeeded: 'Reach humans.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "UI: Alerting -> Contact points -> New -> Slack -> Webhook URL"', explanation: 'UI.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' }
    ]
  },
  {
    projectId: 'chaos-gremlin',
    environment: 'linux',
    description: 'Install the Gremlin agent and run controlled CPU, latency, and shutdown attacks against a target host.',
    objective: 'Register a host, define and run resource + state attacks, and observe blast radius.',
    steps: [
      { id: '1', title: 'Install Gremlin Agent', instruction: 'Add repo and install gremlind.', summary: 'Chaos agent.', whyNeeded: 'Required executor.', pillarConnection: 'Reliability',
        commands: [ { text: 'curl https://rpm.gremlin.com/gremlin.pub | sudo apt-key add -', explanation: 'Key.' }, { text: 'echo "deb https://deb.gremlin.com/ release non-free" | sudo tee /etc/apt/sources.list.d/gremlin.list', explanation: 'Repo.' }, { text: 'sudo apt-get update && sudo apt-get install -y gremlin gremlind', explanation: 'Install.' } ], checkCommand: 'systemctl is-active gremlind', expectedOutput: 'active' },
      { id: '2', title: 'Register Host', instruction: 'gremlin init with team and secret.', summary: 'Cloud registration.', whyNeeded: 'Linked to team.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo gremlin init', explanation: 'Interactive.' } ], checkCommand: 'sudo gremlin --help | head -1', expectedOutput: 'Usage' },
      { id: '3', title: 'Run CPU Attack', instruction: 'Saturate cores for 30s.', summary: 'Resource attack.', whyNeeded: 'Test autoscaling.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo gremlin attack cpu -l 30 -c 4 -p 100', explanation: 'CPU attack.' } ], checkCommand: 'sudo gremlin attack list | head', expectedOutput: '' },
      { id: '4', title: 'Run Latency Attack', instruction: 'Inject 200ms RTT toward an IP.', summary: 'Network attack.', whyNeeded: 'Test timeouts.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo gremlin attack latency -l 60 -h 1.1.1.1 -m 200', explanation: 'Latency.' } ], checkCommand: 'echo running', expectedOutput: 'running' },
      { id: '5', title: 'Halt and Review', instruction: 'Halt running attacks and review in UI.', summary: 'Cleanup.', whyNeeded: 'Always halt.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo gremlin halt', explanation: 'Stop all.' } ], checkCommand: 'sudo gremlin attack list', expectedOutput: '' }
    ]
  },
  {
    projectId: 'sentry-errors',
    environment: 'linux',
    description: 'Initialize Sentry in a Node.js app and a React frontend; verify a captured error and configure releases.',
    objective: 'Install the SDK, set DSN, capture exceptions, and tie events to a release.',
    steps: [
      { id: '1', title: 'Create Sentry Project', instruction: 'On sentry.io create node + react projects.', summary: 'Get DSN.', whyNeeded: 'Required to ingest events.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "sentry.io -> Projects -> Create Project (node and react)"', explanation: 'UI.' } ], checkCommand: 'echo done', expectedOutput: 'done' },
      { id: '2', title: 'Install Node SDK', instruction: 'Add @sentry/node to server.', summary: 'Backend SDK.', whyNeeded: 'Captures unhandled errors.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'npm install --save @sentry/node @sentry/profiling-node', explanation: 'Install.' }, { text: 'cat > sentry.js <<\'EOF\'\nimport * as Sentry from "@sentry/node";\nSentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.2, environment: process.env.NODE_ENV });\nEOF', explanation: 'Init.' } ], checkCommand: 'grep dsn sentry.js', expectedOutput: 'dsn' },
      { id: '3', title: 'Wire Express Middleware', instruction: 'Add request + error handlers.', summary: 'Integration.', whyNeeded: 'Capture HTTP context.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "app.use(Sentry.Handlers.requestHandler()); ... app.use(Sentry.Handlers.errorHandler());"', explanation: 'Snippet.' } ], checkCommand: 'echo wired', expectedOutput: 'wired' },
      { id: '4', title: 'Install React SDK', instruction: '@sentry/react with browser tracing.', summary: 'Frontend SDK.', whyNeeded: 'JS errors.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'npm install --save @sentry/react', explanation: 'Install.' }, { text: 'echo "Sentry.init({ dsn: REACT_DSN, integrations:[new Sentry.BrowserTracing()], tracesSampleRate: 0.1 })"', explanation: 'Init.' } ], checkCommand: 'echo installed', expectedOutput: 'installed' },
      { id: '5', title: 'Trigger and Verify Release', instruction: 'Throw error and create release with sourcemaps.', summary: 'Validate end-to-end.', whyNeeded: 'Confirm visibility.', pillarConnection: 'Reliability',
        commands: [ { text: 'npx @sentry/cli releases new $VERSION && npx @sentry/cli releases files $VERSION upload-sourcemaps ./dist && npx @sentry/cli releases finalize $VERSION', explanation: 'Release.' }, { text: 'curl http://localhost:3000/throw', explanation: 'Trigger.' } ], checkCommand: 'echo verified', expectedOutput: 'verified' }
    ]
  },
  {
    projectId: 'circleci-python',
    environment: 'linux',
    description: 'Build a CircleCI 2.1 config for a Python app with orbs, caching, parallel test splitting, and deploy.',
    objective: 'Author .circleci/config.yml using the python orb, workspaces, and approval job.',
    steps: [
      { id: '1', title: 'Enable Project on CircleCI', instruction: 'Sign in and "Set Up Project" with existing config.', summary: 'Project activation.', whyNeeded: 'Required.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'echo "app.circleci.com -> Projects -> Set Up Project -> use existing config"', explanation: 'UI.' } ], checkCommand: 'echo activated', expectedOutput: 'activated' },
      { id: '2', title: 'Author config.yml', instruction: 'Use python orb, parallelism, and split tests.', summary: 'Pipeline.', whyNeeded: 'Speed via parallelism.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'mkdir -p .circleci && cat > .circleci/config.yml <<\'EOF\'\nversion: 2.1\norbs:\n  python: circleci/python@2.1\njobs:\n  test:\n    docker: [{ image: cimg/python:3.12 }]\n    parallelism: 4\n    steps:\n      - checkout\n      - python/install-packages: { pkg-manager: pip }\n      - run:\n          name: Run tests\n          command: |\n            TESTFILES=$(circleci tests glob "tests/**/test_*.py" | circleci tests split --split-by=timings)\n            pytest --junitxml=test-results/junit.xml $TESTFILES\n      - store_test_results: { path: test-results }\n  hold:\n    type: approval\n  deploy:\n    docker: [{ image: cimg/python:3.12 }]\n    steps:\n      - checkout\n      - run: ./scripts/deploy.sh\nworkflows:\n  build_test_deploy:\n    jobs:\n      - test\n      - hold: { requires: [test], filters: { branches: { only: main } } }\n      - deploy: { requires: [hold] }\nEOF', explanation: 'Config.' } ], checkCommand: 'circleci config validate .circleci/config.yml', expectedOutput: 'is valid' },
      { id: '3', title: 'Add Context for Secrets', instruction: 'Create org context with AWS keys.', summary: 'Secret share.', whyNeeded: 'Reusable across projects.', pillarConnection: 'Security',
        commands: [ { text: 'echo "Org Settings -> Contexts -> Create -> add AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"', explanation: 'UI.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' },
      { id: '4', title: 'Push and Watch', instruction: 'Trigger pipeline.', summary: 'Validate.', whyNeeded: 'See it run.', pillarConnection: 'Reliability',
        commands: [ { text: 'git add . && git commit -m "ci(circle): pipeline" && git push', explanation: 'Push.' } ], checkCommand: 'echo pushed', expectedOutput: 'pushed' },
      { id: '5', title: 'Approve and Deploy', instruction: 'Approve hold job in UI.', summary: 'Manual gate.', whyNeeded: 'Production safety.', pillarConnection: 'Security',
        commands: [ { text: 'echo "UI: Pipeline -> hold -> Approve"', explanation: 'UI.' } ], checkCommand: 'echo done', expectedOutput: 'done' }
    ]
  },
  {
    projectId: 'artifactory-repo',
    environment: 'linux',
    description: 'Run JFrog Artifactory OSS, create local + remote + virtual Docker repos, and push/pull via JFrog CLI.',
    objective: 'Stand up Artifactory, configure repos, authenticate, and validate image flow.',
    steps: [
      { id: '1', title: 'Run Artifactory OSS', instruction: 'docker run with persistent volume.', summary: 'Server up.', whyNeeded: 'Required service.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker volume create artifactory_data', explanation: 'Volume.' }, { text: 'docker run -d --name artifactory -p 8081:8081 -p 8082:8082 -v artifactory_data:/var/opt/jfrog/artifactory releases-docker.jfrog.io/jfrog/artifactory-oss:latest', explanation: 'Run.' } ], checkCommand: 'curl -s -o /dev/null -w "%{http_code}" http://localhost:8082', expectedOutput: '200' },
      { id: '2', title: 'Create Repos via REST', instruction: 'Local + remote + virtual Docker repos.', summary: 'Repo topology.', whyNeeded: 'Caching + custom images.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'curl -u admin:password -X PUT http://localhost:8081/artifactory/api/repositories/docker-local -H "Content-Type: application/json" -d \'{"key":"docker-local","rclass":"local","packageType":"docker","dockerApiVersion":"V2"}\'', explanation: 'Local.' }, { text: 'curl -u admin:password -X PUT http://localhost:8081/artifactory/api/repositories/docker-remote -H "Content-Type: application/json" -d \'{"key":"docker-remote","rclass":"remote","url":"https://registry-1.docker.io/","packageType":"docker"}\'', explanation: 'Remote.' }, { text: 'curl -u admin:password -X PUT http://localhost:8081/artifactory/api/repositories/docker-virtual -H "Content-Type: application/json" -d \'{"key":"docker-virtual","rclass":"virtual","packageType":"docker","repositories":["docker-local","docker-remote"],"defaultDeploymentRepo":"docker-local"}\'', explanation: 'Virtual.' } ], checkCommand: 'curl -s -u admin:password http://localhost:8081/artifactory/api/repositories | jq length', expectedOutput: '3' },
      { id: '3', title: 'Configure JFrog CLI', instruction: 'Install and configure jf.', summary: 'Client tooling.', whyNeeded: 'Push/pull artifacts.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -fL https://install-cli.jfrog.io | sh', explanation: 'Install.' }, { text: 'jf c add demo --url=http://localhost:8081 --user=admin --password=password --interactive=false', explanation: 'Config.' } ], checkCommand: 'jf rt ping', expectedOutput: 'OK' },
      { id: '4', title: 'Push Docker Image', instruction: 'Tag and push to docker-virtual.', summary: 'Workflow.', whyNeeded: 'Validate.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker login localhost:8082 -u admin -p password', explanation: 'Login.' }, { text: 'docker tag nginx:latest localhost:8082/docker-virtual/nginx:1', explanation: 'Tag.' }, { text: 'docker push localhost:8082/docker-virtual/nginx:1', explanation: 'Push.' } ], checkCommand: 'curl -u admin:password -s "http://localhost:8081/artifactory/api/repositories/docker-local" | grep -o key', expectedOutput: 'key' },
      { id: '5', title: 'Audit and Cleanup Policy', instruction: 'Add a delete policy for old artifacts.', summary: 'Lifecycle mgmt.', whyNeeded: 'Bound storage.', pillarConnection: 'Cost Optimization',
        commands: [ { text: 'echo "UI: Administration -> Repositories -> docker-local -> Advanced -> Max Unique Tags"', explanation: 'UI.' } ], checkCommand: 'echo configured', expectedOutput: 'configured' }
    ]
  },
  {
    projectId: 'nagios-monitor',
    environment: 'linux',
    description: 'Install Nagios Core, define a host + HTTP service, set up notifications, and view in the web UI.',
    objective: 'Compile Nagios, define objects in /usr/local/nagios/etc, and validate with -v.',
    steps: [
      { id: '1', title: 'Install Build Dependencies', instruction: 'Required for compilation.', summary: 'Toolchain.', whyNeeded: 'Nagios builds from source.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y autoconf gcc libc6 make wget unzip apache2 php libapache2-mod-php libgd-dev openssl libssl-dev unzip', explanation: 'Deps.' } ], checkCommand: 'which gcc', expectedOutput: 'gcc' },
      { id: '2', title: 'Build and Install Nagios Core', instruction: 'Configure, make, install.', summary: 'Core install.', whyNeeded: 'Provides daemon + UI.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'wget -O nagios.tar.gz https://github.com/NagiosEnterprises/nagioscore/releases/download/nagios-4.5.0/nagios-4.5.0.tar.gz && tar -xf nagios.tar.gz && cd nagios-4.5.0', explanation: 'Source.' }, { text: 'sudo ./configure --with-httpd-conf=/etc/apache2/sites-enabled && sudo make all && sudo make install-groups-users && sudo usermod -a -G nagios www-data && sudo make install install-daemoninit install-commandmode install-config install-webconf', explanation: 'Build.' } ], checkCommand: 'test -x /usr/local/nagios/bin/nagios && echo OK', expectedOutput: 'OK' },
      { id: '3', title: 'Install Plugins', instruction: 'Compile nagios-plugins for check_http etc.', summary: 'Check executables.', whyNeeded: 'Required by service definitions.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'wget -O plugins.tar.gz https://nagios-plugins.org/download/nagios-plugins-2.4.6.tar.gz && tar -xf plugins.tar.gz && cd nagios-plugins-2.4.6 && ./configure --with-nagios-user=nagios --with-nagios-group=nagios && make && sudo make install', explanation: 'Plugins.' } ], checkCommand: 'ls /usr/local/nagios/libexec/check_http', expectedOutput: 'check_http' },
      { id: '4', title: 'Define Host and Service', instruction: 'Create /usr/local/nagios/etc/objects/web.cfg.', summary: 'Monitoring objects.', whyNeeded: 'What to monitor.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo tee /usr/local/nagios/etc/objects/web.cfg >/dev/null <<\'EOF\'\ndefine host { use linux-server; host_name web1; alias web1; address 10.0.0.21 }\ndefine service { use generic-service; host_name web1; service_description HTTP; check_command check_http }\nEOF', explanation: 'Objects.' }, { text: 'echo "cfg_file=/usr/local/nagios/etc/objects/web.cfg" | sudo tee -a /usr/local/nagios/etc/nagios.cfg', explanation: 'Reference.' } ], checkCommand: 'sudo /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg | tail -5 | grep "Things look okay"', expectedOutput: 'okay' },
      { id: '5', title: 'Restart and View UI', instruction: 'Restart daemon and Apache; log in to /nagios.', summary: 'Live monitoring.', whyNeeded: 'See state in UI.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo systemctl restart nagios apache2', explanation: 'Restart.' }, { text: 'curl -u nagiosadmin:admin -s -o /dev/null -w "%{http_code}" http://localhost/nagios/', explanation: 'UI check.' } ], checkCommand: 'systemctl is-active nagios', expectedOutput: 'active' }
    ]
  },
  {
    projectId: 'crossplane-platform',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Crossplane Control Plane Setup',
        instruction: 'Install the Crossplane CLI and deploy the Crossplane control plane using Helm.',
        summary: 'Bootstrap Crossplane on your cluster.',
        whyNeeded: 'Crossplane turns your Kubernetes cluster into a universal control plane that can manage any infrastructure resource.',
        pillarConnection: 'Operational Excellence — using K8s as the control plane for all infrastructure simplifies the management of hybrid and multi-cloud environments.',
        commands: [
          { text: 'curl -sL https://raw.githubusercontent.com/crossplane/crossplane/master/install.sh | sh', explanation: 'Installs the Crossplane CLI helper.' },
          { text: 'helm repo add crossplane-stable https://charts.crossplane.io/stable && helm repo update', explanation: 'Adds the official Crossplane chart repo.' },
          { text: 'helm install crossplane --namespace crossplane-system --create-namespace crossplane-stable/crossplane', explanation: 'Deploys the Crossplane controllers.' }
        ],
        checkCommand: 'kubectl get pods -n crossplane-system',
        expectedOutput: 'crossplane'
      },
      {
        id: 'step-2',
        title: 'Cloud Provider Configuration',
        instruction: 'Install a Crossplane Provider (e.g., AWS, Azure, or GCP) and configure credentials.',
        summary: 'Connect Crossplane to your cloud provider.',
        whyNeeded: 'Providers allow Crossplane to interact with specific cloud APIs to provision resources like S3 buckets, SQL databases, or VPCs.',
        pillarConnection: 'Security — Crossplane uses native K8s secrets to manage cloud credentials, ensuring they are stored and accessed securely.',
        commands: [
          { text: 'kubectl crossplane update configuration install crossplane/provider-aws:v0.40.0', explanation: 'Installs the AWS provider package.' },
          { text: 'kubectl apply -f https://raw.githubusercontent.com/crossplane/crossplane/master/examples/provider/aws/provider-config.yaml', explanation: 'Applies the configuration to link the provider to your cloud account.' }
        ],
        checkCommand: 'kubectl get providers',
        expectedOutput: 'provider-aws'
      },
      {
        id: 'step-3',
        title: 'Resource Composition',
        instruction: 'Create a CompositeResourceDefinition (XRD) to define a custom infrastructure abstraction.',
        summary: 'Define your own internal infrastructure API.',
        whyNeeded: 'XRDs allow platform teams to hide the complexity of cloud resources from developers, providing a simplified, "opinionated" interface.',
        pillarConnection: 'Performance Efficiency — abstracting infrastructure allows developers to provision resources faster without needing to know low-level cloud details.',
        commands: [
          { text: 'cat <<EOF > cluster-xrd.yaml\napiVersion: apiextensions.crossplane.io/v1\nkind: CompositeResourceDefinition\nmetadata:\n  name: xclusters.example.org\nspec:\n  group: example.org\n  names:\n    kind: XCluster\n    plural: xclusters\n  versions:\n  - name: v1alpha1\n    served: true\n    referenceable: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              nodeCount:\n                type: integer\nEOF\nkubectl apply -f cluster-xrd.yaml', explanation: 'Defines a new "XCluster" resource type that developers can use.' }
        ],
        checkCommand: 'kubectl get xrd',
        expectedOutput: 'xclusters.example.org'
      }
    ]
  },
  {
    projectId: 'cilium-networking',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Cilium eBPF Installation',
        instruction: 'Install the Cilium CLI and deploy Cilium as the CNI for your cluster.',
        summary: 'Replace standard networking with eBPF-powered Cilium.',
        whyNeeded: 'Cilium uses eBPF to provide high-performance networking, deep observability, and transparent security for containerized workloads.',
        pillarConnection: 'Performance Efficiency — eBPF bypasses the traditional Linux networking stack, significantly reducing latency and overhead.',
        commands: [
          { text: 'curl -L --remote-name-all https://github.com/cilium/cilium-cli/releases/latest/download/cilium-linux-amd64.tar.gz && sudo tar xzvf cilium-linux-amd64.tar.gz -C /usr/local/bin', explanation: 'Installs the Cilium CLI.' },
          { text: 'cilium install', explanation: 'Automates the deployment of Cilium components into the cluster.' }
        ],
        checkCommand: 'cilium status',
        expectedOutput: 'Ok'
      },
      {
        id: 'step-2',
        title: 'Hubble Observability Enablement',
        instruction: 'Enable Hubble to gain deep visibility into your network traffic.',
        summary: 'Activate the Hubble observability engine.',
        whyNeeded: 'Hubble allows you to visualize your service dependencies, monitor connectivity issues, and audit security policies in real-time.',
        pillarConnection: 'Operational Excellence — deep network visibility is essential for troubleshooting complex microservice interactions.',
        commands: [
          { text: 'cilium hubble enable', explanation: 'Enables the Hubble component within the Cilium daemonset.' },
          { text: 'cilium hubble ui', explanation: 'Starts the Hubble web interface for visual traffic analysis.' }
        ],
        checkCommand: 'cilium status | grep Hubble',
        expectedOutput: 'Enabled'
      }
    ]
  },
  {
    projectId: 'kubeflow-ml',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Kubeflow Deployment',
        instruction: 'Deploy the Kubeflow manifests using Kustomize.',
        summary: 'Bootstrap the Kubeflow ML platform.',
        whyNeeded: 'Kubeflow provides a complete toolkit for ML workflows on Kubernetes, including notebooks, pipelines, and training controllers.',
        pillarConnection: 'Operational Excellence — standardizing ML infrastructure on K8s ensures reproducibility and scalability across the entire ML lifecycle.',
        commands: [
          { text: 'git clone https://github.com/kubeflow/manifests.git && cd manifests', explanation: 'Clones the official Kubeflow manifests repo.' },
          { text: 'while ! kustomize build example | kubectl apply -f -; do echo "Retrying..."; sleep 10; done', explanation: 'Iteratively applies the complex set of Kubeflow resources until the API server accepts all CRDs.' }
        ],
        checkCommand: 'kubectl get pods -n kubeflow',
        expectedOutput: 'centraldashboard'
      }
    ]
  },
  {
    projectId: 'kserve-inference',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'KServe Control Plane Installation',
        instruction: 'Install the KServe operator and its dependencies (Knative and Cert-Manager).',
        summary: 'Provision the model serving infrastructure.',
        whyNeeded: 'KServe provides a standardized way to serve ML models across different frameworks, handling scaling, health checks, and request routing.',
        pillarConnection: 'Performance Efficiency — KServe uses Knative to provide serverless-like scaling, ensuring you only consume compute when requests are active.',
        commands: [
          { text: 'kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml', explanation: 'Installs cert-manager for internal TLS.' },
          { text: 'kubectl apply -f https://github.com/kserve/kserve/releases/download/v0.11.0/kserve.yaml', explanation: 'Deploys the KServe controllers.' }
        ],
        checkCommand: 'kubectl get pods -n kserve',
        expectedOutput: 'kserve-controller-manager'
      },
      {
        id: 'step-2',
        title: 'Deploy an InferenceService',
        instruction: 'Define and deploy an InferenceService for a pre-trained Scikit-Learn model.',
        summary: 'Expose a model for inference.',
        whyNeeded: 'InferenceServices encapsulate the model location and the runtime needed to serve predictions via a standardized API.',
        pillarConnection: 'Reliability — KServe manages the lifecycle of the inference pods, ensuring high availability and seamless updates.',
        commands: [
          { text: 'cat <<EOF > sklearn-isvc.yaml\napiVersion: serving.kserve.io/v1beta1\nkind: InferenceService\nmetadata:\n  name: sklearn-iris\nspec:\n  predictor:\n    model:\n      modelFormat:\n        name: sklearn\n      storageUri: gs://kfserving-examples/models/sklearn/1.0/model\nEOF\nkubectl apply -f sklearn-isvc.yaml', explanation: 'Deploys a sample Iris model from a public bucket.' }
        ],
        checkCommand: 'kubectl get isvc sklearn-iris',
        expectedOutput: 'True'
      }
    ]
  },
  {
    projectId: 'ollama-llm',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Ollama Deployment',
        instruction: 'Deploy Ollama as a stateful service to host LLMs on your cluster.',
        summary: 'Launch the Ollama LLM engine.',
        whyNeeded: 'Ollama makes it easy to run open-source LLMs like Llama 3 or Mistral in a self-hosted environment.',
        pillarConnection: 'Cost Optimization — running LLMs on your own infrastructure can be significantly cheaper than using commercial APIs for high-volume workloads.',
        commands: [
          { text: 'helm repo add ollama-helm https://otwld.github.io/ollama-helm/ && helm repo update', explanation: 'Adds the community Ollama chart.' },
          { text: 'helm install ollama ollama-helm/ollama --set runtime.gpu.enabled=false', explanation: 'Installs Ollama (CPU mode for this lab).' }
        ],
        checkCommand: 'kubectl get pods | grep ollama',
        expectedOutput: 'ollama'
      },
      {
        id: 'step-2',
        title: 'Model Ingestion',
        instruction: 'Use the Ollama API to pull the Llama3 model into your cluster.',
        summary: 'Download a model for inference.',
        whyNeeded: 'Models must be downloaded to the local storage of the Ollama pods before they can be queried.',
        pillarConnection: 'Reliability — pre-pulling models ensures that they are ready to serve requests as soon as the service is accessed.',
        commands: [
          { text: 'kubectl exec $(kubectl get pods -l app.kubernetes.io/name=ollama -o jsonpath="{.items[0].metadata.name}") -- ollama pull llama3', explanation: 'Commands the Ollama pod to fetch the Llama3 weights.' }
        ],
        checkCommand: 'kubectl exec $(kubectl get pods -l app.kubernetes.io/name=ollama -o jsonpath="{.items[0].metadata.name}") -- ollama list',
        expectedOutput: 'llama3'
      }
    ]
  },
  {
    projectId: 'inference-gateway',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Inference Gateway Deployment',
        instruction: 'Deploy an Envoy-based Inference Gateway to manage LLM traffic.',
        summary: 'Provision the AI-aware traffic router.',
        whyNeeded: 'Inference Gateways provide specialized features like prompt caching, token-based rate limiting, and model-based routing.',
        pillarConnection: 'Operational Excellence — centralizing LLM traffic management provides better observability and control over AI costs and performance.',
        commands: [
          { text: 'helm install inference-gateway ./charts/inference-gateway', explanation: 'Deploys the gateway controllers and Envoy proxies.' }
        ],
        checkCommand: 'kubectl get pods -n inference-gateway',
        expectedOutput: 'gateway'
      }
    ]
  },
  {
    projectId: 'terraform-k8s',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Terraform Provider Configuration',
        instruction: 'Configure the Terraform Kubernetes provider to communicate with your cluster.',
        summary: 'Link Terraform to Kubernetes.',
        whyNeeded: 'Terraform can manage not just the infrastructure (VMs, VPCs) but also the resources *inside* the cluster (Namespaces, Deployments).',
        pillarConnection: 'Operational Excellence — managing both cloud and cluster resources with a single tool ensures consistent configuration state across the stack.',
        commands: [
          { text: 'cat <<EOF > main.tf\nprovider "kubernetes" {\n  config_path = "~/.kube/config"\n}\nresource "kubernetes_namespace" "tf-lab" {\n  metadata {\n    name = "terraform-namespace"\n  }\n}\nEOF\nterraform init', explanation: 'Initializes Terraform with the Kubernetes provider.' }
        ],
        checkCommand: 'terraform version',
        expectedOutput: 'Terraform'
      },
      {
        id: 'step-2',
        title: 'Resource Provisioning',
        instruction: 'Apply the Terraform plan to create a namespace and a deployment.',
        summary: 'Deploy resources using IaC.',
        whyNeeded: 'Using code to manage Kubernetes resources makes them versionable, reviewable, and easily reproducible across different environments.',
        pillarConnection: 'Reliability — Terraform provides a dry-run (plan) phase that allows you to see exactly what will change in your cluster before applying it.',
        commands: [
          { text: 'terraform apply -auto-approve', explanation: 'Executes the plan and creates the defined resources in your cluster.' }
        ],
        checkCommand: 'kubectl get ns terraform-namespace',
        expectedOutput: 'Active'
      }
    ]
  },
  {
    projectId: 'vault-k8s',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Vault on K8s Installation',
        instruction: 'Install HashiCorp Vault on Kubernetes using the official Helm chart.',
        summary: 'Deploy Vault in your cluster.',
        whyNeeded: 'Vault provides a centralized, secure way to manage secrets, certificates, and encryption keys for Kubernetes workloads.',
        pillarConnection: 'Security — Vault-on-K8s integrates with native K8s auth, allowing pods to retrieve secrets without long-lived credentials.',
        commands: [
          { text: 'helm repo add hashicorp https://helm.releases.hashicorp.com && helm repo update', explanation: 'Adds the HashiCorp repo.' },
          { text: 'helm install vault hashicorp/vault --set "server.dev.enabled=true"', explanation: 'Installs Vault in development mode for the lab.' }
        ],
        checkCommand: 'kubectl get pods | grep vault',
        expectedOutput: 'vault-0'
      },
      {
        id: 'step-2',
        title: 'K8s Auth Method Enablement',
        instruction: 'Configure the Kubernetes authentication method in Vault.',
        summary: 'Link Vault auth to K8s service accounts.',
        whyNeeded: 'This allows Vault to verify the identity of pods based on their ServiceAccount tokens.',
        pillarConnection: 'Security — identity-based auth is more secure than using static API keys or passwords.',
        commands: [
          { text: 'kubectl exec vault-0 -- vault auth enable kubernetes', explanation: 'Enables the K8s auth engine.' },
          { text: 'kubectl exec vault-0 -- vault write auth/kubernetes/config kubernetes_host="https://$KUBERNETES_SERVICE_HOST:$KUBERNETES_SERVICE_PORT"', explanation: 'Configures Vault to talk to the K8s API.' }
        ],
        checkCommand: 'kubectl exec vault-0 -- vault auth list | grep kubernetes',
        expectedOutput: 'kubernetes'
      }
    ]
  },
  {
    projectId: 'helm-redis',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Helm Repository Configuration',
        instruction: 'Add the Bitnami chart repository and search for the Redis chart.',
        summary: 'Access the Redis package library.',
        whyNeeded: 'Bitnami provides production-ready, hardened Helm charts for many popular open-source applications.',
        pillarConnection: 'Operational Excellence — using curated charts reduces the time spent writing boilerplate manifests.',
        commands: [
          { text: 'helm repo add bitnami https://charts.bitnami.com/bitnami && helm repo update', explanation: 'Adds the Bitnami repository.' },
          { text: 'helm search repo redis', explanation: 'Searches for available Redis chart versions.' }
        ],
        checkCommand: 'helm repo list',
        expectedOutput: 'bitnami'
      },
      {
        id: 'step-2',
        title: 'Redis Deployment',
        instruction: 'Install Redis with custom values to enable persistence and a specific password.',
        summary: 'Deploy a persistent Redis instance.',
        whyNeeded: 'Persistence ensures that your cache data survives pod restarts or node failures.',
        pillarConnection: 'Reliability — configuring explicit passwords and persistent storage is a baseline requirement for production databases.',
        commands: [
          { text: 'helm install my-redis bitnami/redis --set auth.password=secretpassword --set master.persistence.enabled=true', explanation: 'Deploys Redis with a specified password and PVC support.' }
        ],
        checkCommand: 'kubectl get pods -l app.kubernetes.io/name=redis-master',
        expectedOutput: 'Running'
      }
    ]
  },
  {
    projectId: '138',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'OPA Gatekeeper Installation',
        instruction: 'Deploy the Gatekeeper admission controller to your cluster.',
        summary: 'Provision the policy enforcement engine.',
        whyNeeded: 'Gatekeeper allows you to enforce custom policies on Kubernetes resources, ensuring compliance and security at the API level.',
        pillarConnection: 'Security — policy enforcement prevents insecure configurations from entering the cluster.',
        commands: [
          { text: 'kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml', explanation: 'Installs the Gatekeeper controller and CRDs.' }
        ],
        checkCommand: 'kubectl get pods -n gatekeeper-system',
        expectedOutput: 'gatekeeper-controller-manager'
      },
      {
        id: 'step-2',
        title: 'Constraint Template Creation',
        instruction: 'Define a ConstraintTemplate that requires specific labels on all namespaces.',
        summary: 'Define a reusable policy template.',
        whyNeeded: 'ConstraintTemplates allow you to define the logic (in Rego) and the schema for a policy.',
        pillarConnection: 'Operational Excellence — reusable templates simplify the management of complex policies across multiple teams.',
        commands: [
          { text: 'cat <<EOF > label-template.yaml\napiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8srequiredlabels\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sRequiredLabels\n      validation:\n        openAPIV3Schema:\n          type: object\n          properties:\n            labels:\n              type: array\n              items:\n                type: string\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8srequiredlabels\n        violation[{"msg": msg}] {\n          provided := {label | input.review.object.metadata.labels[label]}\n          required := {label | label := input.parameters.labels[_]}\n          missing := required - provided\n          count(missing) > 0\n          msg := sprintf("you must provide labels: %v", [missing])\n        }\nEOF\nkubectl apply -f label-template.yaml', explanation: 'Deploys the policy logic to require specific labels.' }
        ],
        checkCommand: 'kubectl get constrainttemplate',
        expectedOutput: 'k8srequiredlabels'
      }
    ]
  },
  {
    projectId: 'elk-logging',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Elasticsearch Cluster Deployment',
        instruction: 'Deploy a stateful Elasticsearch cluster to store and index your logs.',
        summary: 'Provision the logging storage backend.',
        whyNeeded: 'Elasticsearch provides the powerful search and analytics capabilities needed to query millions of log lines in real-time.',
        pillarConnection: 'Operational Excellence — centralized logging is the foundation of modern observability and incident response.',
        commands: [
          { text: 'helm repo add elastic https://helm.elastic.co && helm repo update', explanation: 'Adds the official Elastic repository.' },
          { text: 'helm install elasticsearch elastic/elasticsearch --set replicas=1', explanation: 'Deploys a single-node Elasticsearch instance for the lab.' }
        ],
        checkCommand: 'kubectl get pods -l app=elasticsearch-master',
        expectedOutput: 'Running'
      },
      {
        id: 'step-2',
        title: 'Fluentd Log Collection',
        instruction: 'Deploy Fluentd as a DaemonSet to collect logs from every node in the cluster.',
        summary: 'Configure the log shipper.',
        whyNeeded: 'Fluentd automatically scrapes logs from all containers and routes them to Elasticsearch with the correct metadata (pod name, namespace, etc.).',
        pillarConnection: 'Reliability — automated log collection ensures that logs are preserved even if pods are deleted or nodes fail.',
        commands: [
          { text: 'kubectl apply -f https://raw.githubusercontent.com/fluent/fluentd-kubernetes-daemonset/master/fluentd-daemonset-elasticsearch.yaml', explanation: 'Deploys the Fluentd agents to the cluster.' }
        ],
        checkCommand: 'kubectl get ds -n kube-system | grep fluentd',
        expectedOutput: 'fluentd'
      }
    ]
  },
  {
    projectId: 'pfsense-firewall',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'pfSense Installation & Interface Setup',
        instruction: 'Configure the WAN and LAN interfaces on your pfSense virtual appliance.',
        summary: 'Initialize the firewall interfaces.',
        whyNeeded: 'Interfaces are the foundational building blocks of a firewall, defining the "inside" and "outside" of your network.',
        pillarConnection: 'Security — proper interface separation is the first step in network segmentation.',
        commands: [
          { text: 'echo "Interface -> WAN -> DHCP; Interface -> LAN -> 192.168.1.1/24"', explanation: 'Configures basic connectivity.' }
        ],
        checkCommand: 'ping -c 1 192.168.1.1',
        expectedOutput: '1 packets transmitted'
      },
      {
        id: 'step-2',
        title: 'NAT and Port Forwarding',
        instruction: 'Configure a NAT rule to forward external HTTP traffic (port 80) to an internal web server.',
        summary: 'Expose internal services securely.',
        whyNeeded: 'NAT allows multiple internal devices to share a single public IP while controlling external access.',
        pillarConnection: 'Reliability — NAT ensures internal services are reachable while maintaining a secure perimeter.',
        commands: [
          { text: 'echo "Firewall -> NAT -> Port Forward -> Add rule: WAN, TCP, Port 80 -> Redirect 192.168.1.10"', explanation: 'Sets up the forwarding rule.' }
        ],
        checkCommand: 'echo "Rule Active"',
        expectedOutput: 'Rule Active'
      }
    ]
  },
  {
    projectId: 'ssl-tls-setup',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Certbot Installation',
        instruction: 'Install Certbot and the Nginx plugin to manage Let\'s Encrypt certificates.',
        summary: 'Prepare the certificate automation tool.',
        whyNeeded: 'Certbot automates the obtaining and renewing of SSL/TLS certificates, ensuring encryption doesn\'t lapse.',
        pillarConnection: 'Security — encryption in transit is a baseline requirement for any public-facing application.',
        commands: [
          { text: 'sudo apt update && sudo apt install certbot python3-certbot-nginx -y', explanation: 'Installs the Certbot client.' }
        ],
        checkCommand: 'certbot --version',
        expectedOutput: 'certbot'
      },
      {
        id: 'step-2',
        title: 'Certificate Issuance',
        instruction: 'Request a new SSL certificate for your domain using the Nginx challenge.',
        summary: 'Obtain a valid TLS certificate.',
        whyNeeded: 'A valid certificate from a trusted CA is required for browsers to establish secure connections.',
        pillarConnection: 'Reliability — automated certificate management prevents downtime caused by expired credentials.',
        commands: [
          { text: 'sudo certbot --nginx -d example.com --non-interactive --agree-tos --register-unsafely-without-email', explanation: 'Requests and installs the certificate.' }
        ],
        checkCommand: 'sudo ls /etc/letsencrypt/live/example.com/fullchain.pem',
        expectedOutput: 'fullchain.pem'
      }
    ]
  },
  {
    projectId: 'honeypot-cowrie',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Cowrie Dependency Setup',
        instruction: 'Install Python dependencies and virtualenv for the Cowrie honeypot.',
        summary: 'Prepare the execution environment.',
        whyNeeded: 'Cowrie requires a specific set of libraries to simulate a realistic SSH server.',
        pillarConnection: 'Operational Excellence — using isolated environments (virtualenv) prevents dependency conflicts.',
        commands: [
          { text: 'sudo apt-get install git python3-virtualenv libssl-dev libffi-dev build-essential -y', explanation: 'Installs build tools and dependencies.' }
        ],
        checkCommand: 'virtualenv --version',
        expectedOutput: 'virtualenv'
      },
      {
        id: 'step-2',
        title: 'Cowrie Configuration',
        instruction: 'Clone the Cowrie repository and start the honeypot on port 2222.',
        summary: 'Launch the deception engine.',
        whyNeeded: 'Honeypots provide early warning of attacker activity and valuable intelligence on their techniques.',
        pillarConnection: 'Security — proactive deception helps divert attackers from real production assets.',
        commands: [
          { text: 'git clone https://github.com/cowrie/cowrie && cd cowrie\nvirtualenv --python=python3 cowrie-env\nsource cowrie-env/bin/activate\npip install --upgrade pip && pip install -r requirements.txt\nbin/cowrie start', explanation: 'Sets up and starts the honeypot.' }
        ],
        checkCommand: 'netstat -tuln | grep 2222',
        expectedOutput: '2222'
      }
    ]
  },
  {
    projectId: 'mfa-implementation',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Google Authenticator PAM Setup',
        instruction: 'Install the Google Authenticator PAM module on your Linux server.',
        summary: 'Enable MFA capabilities.',
        whyNeeded: 'Passwords alone are vulnerable. MFA adds a critical second layer of defense.',
        pillarConnection: 'Security — multi-factor authentication significantly reduces the risk of credential-based attacks.',
        commands: [
          { text: 'sudo apt install libpam-google-authenticator -y', explanation: 'Installs the PAM module.' }
        ],
        checkCommand: 'ls /lib/x86_64-linux-gnu/security/pam_google_authenticator.so',
        expectedOutput: 'pam_google_authenticator.so'
      },
      {
        id: 'step-2',
        title: 'MFA Configuration for SSH',
        instruction: 'Configure SSH to require both a password and an MFA token.',
        summary: 'Enforce MFA for remote access.',
        whyNeeded: 'SSH is a primary target for brute force. MFA makes these attacks exponentially harder.',
        pillarConnection: 'Security — hardening remote access is a top priority for any server administrator.',
        commands: [
          { text: 'sudo sed -i "s/KbdInteractiveAuthentication no/KbdInteractiveAuthentication yes/" /etc/ssh/sshd_config\necho "auth required pam_google_authenticator.so" | sudo tee -a /etc/pam.d/sshd\nsudo systemctl restart ssh', explanation: 'Enables interactive auth and links it to the PAM module.' }
        ],
        checkCommand: 'grep "pam_google_authenticator.so" /etc/pam.d/sshd',
        expectedOutput: 'pam_google_authenticator.so'
      }
    ]
  },
  {
    projectId: 'malware-analysis',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Cuckoo Sandbox Installation',
        instruction: 'Install the Cuckoo Sandbox and its dependencies for automated malware analysis.',
        summary: 'Prepare the analysis environment.',
        whyNeeded: 'Automated sandboxing is essential for safely detonating and analyzing suspicious files without risking host systems.',
        pillarConnection: 'Security — behavioral analysis helps identify zero-day threats that signature-based tools might miss.',
        commands: [
          { text: 'pip install -U cuckoo', explanation: 'Installs the Cuckoo engine.' }
        ],
        checkCommand: 'cuckoo --version',
        expectedOutput: 'Cuckoo'
      }
    ]
  },
  {
    projectId: 'vpn-ipsec',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'OpenVPN Server Setup',
        instruction: 'Install and configure an OpenVPN server to provide secure remote access.',
        summary: 'Establish a secure tunnel.',
        whyNeeded: 'VPNs are the standard for securing remote connections to internal company resources.',
        pillarConnection: 'Security — encrypting remote access protects against data interception on untrusted networks.',
        commands: [
          { text: 'sudo apt install openvpn easy-rsa -y', explanation: 'Installs the VPN server and PKI tools.' }
        ],
        checkCommand: 'openvpn --version',
        expectedOutput: 'OpenVPN'
      }
    ]
  },
  {
    projectId: 'data-encryption',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'LUKS Partition Encryption',
        instruction: 'Initialize a LUKS partition on a block device to encrypt data at rest.',
        summary: 'Protect physical storage.',
        whyNeeded: 'Full-disk encryption protects data even if the physical storage device is lost or stolen.',
        pillarConnection: 'Security — encryption at rest is mandatory for regulatory compliance (e.g., GDPR, HIPAA).',
        commands: [
          { text: 'sudo cryptsetup luksFormat /dev/sdb1', explanation: 'Initializes the LUKS partition.' }
        ],
        checkCommand: 'sudo cryptsetup isLuks /dev/sdb1 && echo OK',
        expectedOutput: 'OK'
      }
    ]
  },
  {
    projectId: 'pki-openssl',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Private CA Initialization',
        instruction: 'Create the directory structure and root certificate for a private Certificate Authority.',
        summary: 'Bootstrap the PKI.',
        whyNeeded: 'Managing your own CA allows you to issue trusted internal certificates for services, VPNs, and users.',
        pillarConnection: 'Security — a robust PKI is the foundation of trust in a modern enterprise network.',
        commands: [
          { text: 'openssl genrsa -out rootCA.key 4096\nopenssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt', explanation: 'Generates the CA private key and self-signed root certificate.' }
        ],
        checkCommand: 'openssl x509 -in rootCA.crt -text -noout | grep "Self Signed"',
        expectedOutput: 'Self Signed'
      }
    ]
  },
  {
    projectId: 'social-engineering',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'SET Installation',
        instruction: 'Install the Social-Engineer Toolkit (SET) for security awareness simulations.',
        summary: 'Prepare the simulation tool.',
        whyNeeded: 'Social engineering is often the weakest link. Controlled simulations are vital for employee training.',
        pillarConnection: 'Operational Excellence — automated simulation tools help quantify and reduce human-centric risks.',
        commands: [
          { text: 'git clone https://github.com/trustedsec/social-engineer-toolkit/ setoolkit/\ncd setoolkit && pip3 install -r requirements.txt\nsudo python3 setup.py install', explanation: 'Clones and installs SET.' }
        ],
        checkCommand: 'setoolkit --version',
        expectedOutput: 'Social-Engineer Toolkit'
      }
    ]
  },
  {
    projectId: 'zero-trust',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Cloudflare Tunnel Setup',
        instruction: 'Install cloudflared and create a secure tunnel to expose a local service without opening firewall ports.',
        summary: 'Establish a Zero Trust perimeter.',
        whyNeeded: 'Tunnels provide a secure way to access internal services without exposing them directly to the public internet.',
        pillarConnection: 'Security — Zero Trust assumes the network is compromised and requires explicit verification for every connection.',
        commands: [
          { text: 'curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cloudflared.deb', explanation: 'Installs the Cloudflare Tunnel daemon.' }
        ],
        checkCommand: 'cloudflared --version',
        expectedOutput: 'cloudflared'
      }
    ]
  },
  {
    projectId: 'password-manager',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Vaultwarden Deployment',
        instruction: 'Deploy a Vaultwarden (Bitwarden compatible) server using Docker.',
        summary: 'Self-host a password manager.',
        whyNeeded: 'Passwords are the keys to the kingdom. A centralized, secure manager is essential for enterprise security.',
        pillarConnection: 'Security — strong, unique passwords for every service significantly reduce the impact of a single breach.',
        commands: [
          { text: 'docker run -d --name vaultwarden -p 80:80 -v /vw-data/:/data/ vaultwarden/server:latest', explanation: 'Starts the Vaultwarden container.' }
        ],
        checkCommand: 'docker ps | grep vaultwarden',
        expectedOutput: 'vaultwarden'
      }
    ]
  },
  {
    projectId: 'wifi-security',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Aircrack-ng Installation',
        instruction: 'Install the Aircrack-ng suite for wireless security auditing.',
        summary: 'Prepare the wireless assessment tools.',
        whyNeeded: 'Wireless networks are a common entry point. Auditing them ensures that encryption and passwords are robust.',
        pillarConnection: 'Security — understanding how wireless attacks work is key to defending against them.',
        commands: [
          { text: 'sudo apt install aircrack-ng -y', explanation: 'Installs the aircrack-ng suite.' }
        ],
        checkCommand: 'aircrack-ng --help',
        expectedOutput: 'Aircrack-ng'
      }
    ]
  },
  {
    projectId: 'secure-boot',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Secure Boot Status Check',
        instruction: 'Use mokutil to check the status of Secure Boot on your system.',
        summary: 'Verify hardware security status.',
        whyNeeded: 'Secure Boot ensures that only trusted, signed bootloaders and kernels are allowed to run on the hardware.',
        pillarConnection: 'Security — hardware-rooted trust is the foundation of a secure computing environment.',
        commands: [
          { text: 'sudo apt install mokutil -y && mokutil --sb-state', explanation: 'Installs mokutil and queries the Secure Boot state.' }
        ],
        checkCommand: 'mokutil --sb-state',
        expectedOutput: 'SecureBoot'
      }
    ]
  },
  {
    projectId: 'bug-bounty',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'VDP Policy Creation',
        instruction: 'Draft a Vulnerability Disclosure Policy (VDP) for your organization.',
        summary: 'Establish a legal reporting channel.',
        whyNeeded: 'A VDP provides a safe and legal way for researchers to report security bugs before they are exploited.',
        pillarConnection: 'Operational Excellence — formalizing communication with the security community reduces risk and improves posture.',
        commands: [
          { text: 'cat <<EOF > SECURITY.md\n# Vulnerability Disclosure Policy\nWe welcome reports from researchers. Please email security@example.com...\nEOF', explanation: 'Creates a basic security policy file.' }
        ],
        checkCommand: 'ls SECURITY.md',
        expectedOutput: 'SECURITY.md'
      }
    ]
  },
  {
    projectId: 'forensic-analysis',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Autopsy Forensic Browser Setup',
        instruction: 'Install the Autopsy forensic browser and the Sleuth Kit.',
        summary: 'Prepare the digital forensics workstation.',
        whyNeeded: 'Forensic tools are required to analyze disk images and recover evidence after a security breach.',
        pillarConnection: 'Reliability — formal investigation processes are critical for root cause analysis and legal proceedings.',
        commands: [
          { text: 'sudo apt install sleuthkit -y', explanation: 'Installs the foundational forensic tools.' }
        ],
        checkCommand: 'fls -V',
        expectedOutput: 'The Sleuth Kit'
      }
    ]
  },
  {
    projectId: 'dlp-config',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'DLP Agent Configuration',
        instruction: 'Configure a basic data loss prevention rule to monitor for sensitive patterns (e.g., credit cards).',
        summary: 'Implement data exfiltration prevention.',
        whyNeeded: 'DLP helps prevent the accidental or intentional loss of sensitive organizational data.',
        pillarConnection: 'Security — protecting sensitive data is a core component of confidentiality.',
        commands: [
          { text: 'echo "Rule: Match [0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4} -> Alert"', explanation: 'Defines a simple DLP pattern.' }
        ],
        checkCommand: 'echo "DLP Rule Set"',
        expectedOutput: 'DLP Rule Set'
      }
    ]
  },
  {
    projectId: 'oauth2-oidc',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Keycloak IAM Deployment',
        instruction: 'Deploy a Keycloak server using Docker to manage identity and access.',
        summary: 'Provision a modern IAM solution.',
        whyNeeded: 'Keycloak provides advanced identity federation features like SSO, OAuth2, and OIDC.',
        pillarConnection: 'Security — centralized identity management reduces the attack surface and improves user experience.',
        commands: [
          { text: 'docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev', explanation: 'Starts a development instance of Keycloak.' }
        ],
        checkCommand: 'docker ps | grep keycloak',
        expectedOutput: 'keycloak'
      }
    ]
  },
  {
    projectId: 'api-security',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'OWASP ZAP API Scan',
        instruction: 'Use the OWASP ZAP baseline scan to identify vulnerabilities in a sample REST API.',
        summary: 'Audit your API endpoints.',
        whyNeeded: 'APIs are often overlooked in security scans but are a major target for modern attacks.',
        pillarConnection: 'Security — automated security testing should be integrated into every API deployment pipeline.',
        commands: [
          { text: 'docker run -t owasp/zap2docker-stable zap-baseline.py -t http://example.com/api', explanation: 'Runs a baseline security scan against the target API.' }
        ],
        checkCommand: 'echo "Scan Complete"',
        expectedOutput: 'Scan Complete'
      }
    ]
  },
  {
    projectId: 'nac-config',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'PacketFence NAC Setup',
        instruction: 'Install PacketFence to manage network access control for your enterprise environment.',
        summary: 'Control network admission.',
        whyNeeded: 'NAC ensures that only authorized, compliant devices can connect to your internal network.',
        pillarConnection: 'Security — device-level verification is a key component of the Zero Trust model.',
        commands: [
          { text: 'sudo apt-get update && sudo apt-get install packetfence -y', explanation: 'Installs the PacketFence platform.' }
        ],
        checkCommand: 'pfcmd version',
        expectedOutput: 'PacketFence'
      }
    ]
  },
  {
    projectId: 'threat-intel',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'MISP Platform Deployment',
        instruction: 'Install the MISP (Malware Information Sharing Platform) for threat intelligence management.',
        summary: 'Manage Indicators of Compromise (IoCs).',
        whyNeeded: 'Sharing threat intelligence with the wider community helps everyone stay ahead of emerging threats.',
        pillarConnection: 'Operational Excellence — collaborative security operations improve collective defense.',
        commands: [
          { text: 'curl -s https://raw.githubusercontent.com/MISP/MISP/2.4/INSTALL/INSTALL.sh | bash', explanation: 'Runs the MISP installation script.' }
        ],
        checkCommand: 'ls /var/www/MISP',
        expectedOutput: 'MISP'
      }
    ]
  },
  {
    projectId: 'incident-sim',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'TheHive Case Management',
        instruction: 'Deploy TheHive to manage security incident responses and investigations.',
        summary: 'Streamline your SOC workflow.',
        whyNeeded: 'A dedicated case management platform ensures that investigations are thorough, documented, and collaborative.',
        pillarConnection: 'Reliability — consistent incident response processes reduce MTTR (Mean Time To Recovery).',
        commands: [
          { text: 'docker run -d --name thehive -p 9000:9000 strangebee/thehive:latest', explanation: 'Starts TheHive container.' }
        ],
        checkCommand: 'docker ps | grep thehive',
        expectedOutput: 'thehive'
      }
    ]
  },
  {
    projectId: 'hash-cracking',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Wordlist Preparation',
        instruction: 'Locate and prepare the RockYou wordlist for the password cracking lab.',
        summary: 'Prepare the dictionary.',
        whyNeeded: 'A good wordlist is essential for dictionary-based attacks. RockYou is the industry standard for common passwords.',
        pillarConnection: 'Security — understanding how weak passwords are easily cracked highlights the need for complex, unique credentials.',
        commands: [
          { text: 'ls /usr/share/wordlists/rockyou.txt.gz && gunzip -c /usr/share/wordlists/rockyou.txt.gz > rockyou.txt', explanation: 'Extracts the RockYou wordlist.' }
        ],
        checkCommand: 'ls rockyou.txt',
        expectedOutput: 'rockyou.txt'
      },
      {
        id: 'step-2',
        title: 'Cracking with John the Ripper',
        instruction: 'Use John the Ripper to crack a set of MD5 hashes using the RockYou wordlist.',
        summary: 'Execute the cracking attack.',
        whyNeeded: 'John the Ripper is a versatile tool for detecting weak passwords across many different hash formats.',
        pillarConnection: 'Security — demonstrating the speed of modern cracking tools emphasizes the importance of secure hashing algorithms (e.g., Argon2).',
        commands: [
          { text: 'echo "user:e10adc3949ba59abbe56e057f20f883e" > hashes.txt\njohn --format=raw-md5 --wordlist=rockyou.txt hashes.txt', explanation: 'Cracks the sample MD5 hash.' }
        ],
        checkCommand: 'john --show hashes.txt',
        expectedOutput: '1 password cracked'
      }
    ]
  },
  {
    projectId: 'sqlmap-sqli',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Sqlmap Target Scanning',
        instruction: 'Use Sqlmap to scan a target URL for potential SQL injection vulnerabilities.',
        summary: 'Identify the injection point.',
        whyNeeded: 'SQL injection is one of the most critical web vulnerabilities. Automation with Sqlmap allows for rapid and deep assessment.',
        pillarConnection: 'Security — identifying injection vulnerabilities early prevents catastrophic data breaches.',
        commands: [
          { text: 'sqlmap -u "http://example.com/products.php?id=1" --batch --banner', explanation: 'Scans the target and retrieves the database banner.' }
        ],
        checkCommand: 'echo "Scan Complete"',
        expectedOutput: 'Scan Complete'
      }
    ]
  },
  {
    projectId: 'linpeas-privesc',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'LinPEAS Enumeration',
        instruction: 'Download and run LinPEAS to find potential privilege escalation paths on a Linux host.',
        summary: 'Automate host enumeration.',
        whyNeeded: 'After gaining initial access, privilege escalation is the next step. LinPEAS automates the search for misconfigurations.',
        pillarConnection: 'Security — identifying local misconfigurations (e.g., SUID bits, writable /etc/passwd) is key to system hardening.',
        commands: [
          { text: 'curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh', explanation: 'Downloads and executes the enumeration script.' }
        ],
        checkCommand: 'echo "Enumeration Done"',
        expectedOutput: 'Enumeration Done'
      }
    ]
  },
  {
    projectId: 'ecommerce-db',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'PostgreSQL Schema Design',
        instruction: 'Create an e-commerce database and define tables for products, users, and orders.',
        summary: 'Initialize the relational schema.',
        whyNeeded: 'Proper relational modeling is the bedrock of data integrity and query performance in enterprise applications.',
        pillarConnection: 'Reliability — using foreign keys and constraints ensures that the database remains in a consistent state.',
        commands: [
          { text: 'psql -c "CREATE DATABASE ecommerce;"\npsql -d ecommerce -c "CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE);"\npsql -d ecommerce -c "CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC);"\npsql -d ecommerce -c "CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), product_id INT REFERENCES products(id));"', explanation: 'Creates the database and core tables.' }
        ],
        checkCommand: 'psql -d ecommerce -c "\\dt" | grep -c "table"',
        expectedOutput: '3'
      }
    ]
  },
  {
    projectId: 'blog-nosql',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'MongoDB Document Modeling',
        instruction: 'Insert a complex blog post document into the "posts" collection.',
        summary: 'Leverage NoSQL flexibility.',
        whyNeeded: 'NoSQL databases like MongoDB allow for rapid development by supporting flexible, nested data structures.',
        pillarConnection: 'Performance Efficiency — embedding comments directly in a post document avoids expensive joins at read time.',
        commands: [
          { text: 'mongosh --eval \'db.posts.insertOne({ title: "My First Post", body: "Hello World", tags: ["tech", "nosql"], comments: [{ user: "bob", text: "Great post!" }] })\'', explanation: 'Inserts a document with nested arrays.' }
        ],
        checkCommand: 'mongosh --eval "db.posts.countDocuments()" --quiet',
        expectedOutput: '1'
      }
    ]
  },
  {
    projectId: 'influxdb-ts',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'InfluxDB Data Ingestion',
        instruction: 'Create a bucket and write a temperature measurement from an IoT sensor.',
        summary: 'Store time-series data.',
        whyNeeded: 'Time-series databases are optimized for high-write loads and efficient time-based range queries.',
        pillarConnection: 'Cost Optimization — InfluxDB\'s compression algorithms significantly reduce the storage footprint for telemetry data.',
        commands: [
          { text: 'influx bucket create -n iot_data\ninflux write --bucket iot_data "temperature,sensor_id=tlm01 value=22.5"', explanation: 'Creates a bucket and writes a point in Line Protocol.' }
        ],
        checkCommand: 'influx bucket list | grep iot_data',
        expectedOutput: 'iot_data'
      }
    ]
  },
  {
    projectId: 'redis-kv',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Redis Caching Operations',
        instruction: 'Set a session token with a 60-second expiration time.',
        summary: 'Implement temporary data storage.',
        whyNeeded: 'Caching session data in Redis offloads the primary database and provides sub-millisecond response times.',
        pillarConnection: 'Performance Efficiency — in-memory storage is orders of magnitude faster than disk-based databases for hot data.',
        commands: [
          { text: 'redis-cli set session:user123 "token_xyz" EX 60', explanation: 'Sets a key with an expiration (TTL).' }
        ],
        checkCommand: 'redis-cli ttl session:user123',
        expectedOutput: '5'
      }
    ]
  },
  {
    projectId: 'postgres-hardening',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'PostgreSQL HBA Configuration',
        instruction: 'Restrict database access to specific IP ranges using the pg_hba.conf file.',
        summary: 'Implement network-level security.',
        whyNeeded: 'The Host-Based Authentication (HBA) file is the first line of defense for a PostgreSQL server.',
        pillarConnection: 'Security — restricting access to known IPs prevents unauthorized remote connection attempts.',
        commands: [
          { text: 'echo "host all all 10.0.0.0/24 scram-sha-256" | sudo tee -a /etc/postgresql/15/main/pg_hba.conf\nsudo systemctl reload postgresql', explanation: 'Adds a restrictive HBA rule and reloads the service.' }
        ],
        checkCommand: 'sudo grep "10.0.0.0/24" /etc/postgresql/15/main/pg_hba.conf',
        expectedOutput: 'scram-sha-256'
      }
    ]
  },
  {
    projectId: 'titanic-analysis',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Exploratory Data Analysis (EDA)',
        instruction: 'Load the Titanic dataset using Pandas and visualize the survival distribution.',
        summary: 'Understand the data structure.',
        whyNeeded: 'EDA is the most critical first step to identify patterns, outliers, and missing values before modeling.',
        pillarConnection: 'Operational Excellence — clean, well-understood data is the foundation of any reliable AI system.',
        commands: [
          { text: 'pip install pandas matplotlib seaborn\npython3 -c "import pandas as pd; df = pd.read_csv(\'titanic.csv\'); print(df.describe())"', explanation: 'Installs data science libraries and performs initial analysis.' }
        ],
        checkCommand: 'python3 -c "import pandas as pd; print(\'Pandas OK\')"',
        expectedOutput: 'Pandas OK'
      },
      {
        id: 'step-2',
        title: 'Model Training (Random Forest)',
        instruction: 'Train a Random Forest classifier to predict survival based on age, gender, and class.',
        summary: 'Build the predictive model.',
        whyNeeded: 'Random Forests are robust against overfitting and provide excellent performance on tabular data.',
        pillarConnection: 'Performance Efficiency — ensemble methods provide high accuracy while maintaining manageable training times.',
        commands: [
          { text: 'python3 -c "from sklearn.ensemble import RandomForestClassifier; import pandas as pd; df = pd.read_csv(\'titanic.csv\'); rf = RandomForestClassifier(); rf.fit(df[[\'Pclass\', \'Age\', \'SibSp\']], df[\'Survived\']); print(\'Model Trained\')"', explanation: 'Trains the classification model using Scikit-learn.' }
        ],
        checkCommand: 'echo "Model Trained"',
        expectedOutput: 'Model Trained'
      }
    ]
  },
  {
    projectId: 'sentiment-analysis',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Text Preprocessing with NLTK',
        instruction: 'Download the NLTK stopword list and tokenize a sample tweet.',
        summary: 'Prepare text for analysis.',
        whyNeeded: 'Raw text contains noise. Tokenization and stopword removal focus the model on meaningful words.',
        pillarConnection: 'Security — NLP pipelines must handle untrusted user input safely to avoid injection attacks.',
        commands: [
          { text: 'pip install nltk\npython3 -c "import nltk; nltk.download(\'punkt\'); nltk.download(\'stopwords\'); print(\'NLTK Ready\')"', explanation: 'Prepares the NLP environment.' }
        ],
        checkCommand: 'python3 -c "import nltk; print(\'Ready\')"',
        expectedOutput: 'Ready'
      }
    ]
  },
  {
    projectId: 'mnist-digit-recognition',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Neural Network Architecture',
        instruction: 'Define a simple Feedforward Neural Network using TensorFlow Keras.',
        summary: 'Design the brain.',
        whyNeeded: 'Handwritten digit recognition is the "Hello World" of deep learning, teaching the basics of backpropagation.',
        pillarConnection: 'Reliability — well-defined architectures ensure consistent learning across different training sessions.',
        commands: [
          { text: 'pip install tensorflow\npython3 -c \"import tensorflow as tf; model = tf.keras.models.Sequential([tf.keras.layers.Flatten(), tf.keras.layers.Dense(128, activation=\'relu\'), tf.keras.layers.Dense(10)]); print(\'Architecture OK\')\"', explanation: 'Creates a sequential neural network model.' }
        ],
        checkCommand: 'python3 -c "import tensorflow as tf; print(tf.__version__)"',
        expectedOutput: '2'
      }
    ]
  },
  {
    projectId: 'docker-optimization',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Multi-stage Dockerfile Design',
        instruction: 'Create a multi-stage Dockerfile for a Go application to reduce image size.',
        summary: 'Optimize the build process.',
        whyNeeded: 'Smaller images are faster to pull, require less storage, and have a smaller attack surface.',
        pillarConnection: 'Performance Efficiency — multi-stage builds separate build-time dependencies from the final runtime image.',
        commands: [
          { text: 'cat <<EOF > Dockerfile\nFROM golang:1.20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o main .\n\nFROM alpine:latest\nWORKDIR /root/\nCOPY --from=builder /app/main .\nCMD ["./main"]\nEOF', explanation: 'Defines a two-stage build process.' }
        ],
        checkCommand: 'grep "FROM .* AS builder" Dockerfile',
        expectedOutput: 'AS builder'
      }
    ]
  },
  {
    projectId: 'docker-volumes-persistent',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Volume Creation & Mounting',
        instruction: 'Create a named Docker volume and mount it to a MySQL container.',
        summary: 'Ensure data persistence.',
        whyNeeded: 'Containers are ephemeral. Volumes are required to persist data like databases beyond the container lifecycle.',
        pillarConnection: 'Reliability — persistent volumes prevent data loss during container updates or failures.',
        commands: [
          { text: 'docker volume create mysql_data\ndocker run -d --name db -v mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root mysql:latest', explanation: 'Creates a volume and attaches it to the database container.' }
        ],
        checkCommand: 'docker volume inspect mysql_data',
        expectedOutput: 'mysql_data'
      }
    ]
  },
  {
    projectId: 'docker-hardening-trivy',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Vulnerability Scanning with Trivy',
        instruction: 'Install Trivy and scan a public image for security vulnerabilities.',
        summary: 'Audit container security.',
        whyNeeded: 'Docker images often contain outdated packages with known vulnerabilities. Scanning is vital for production safety.',
        pillarConnection: 'Security — proactive vulnerability scanning is a core component of a secure software supply chain.',
        commands: [
          { text: 'curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin\ntrivy image --severity HIGH,CRITICAL alpine:3.10', explanation: 'Installs Trivy and scans an old (vulnerable) Alpine image.' }
        ],
        checkCommand: 'trivy --version',
        expectedOutput: 'Version'
      }
    ]
  },
  {
    projectId: 'ingress-nginx',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Ingress Controller Installation',
        instruction: 'Install the NGINX Ingress Controller using Helm.',
        summary: 'Deploy the traffic entry point.',
        whyNeeded: 'An Ingress Controller is required to route external HTTP/S traffic to services inside the cluster based on hostnames or paths.',
        pillarConnection: 'Performance Efficiency — NGINX provides high-performance load balancing and SSL termination at the edge of your cluster.',
        commands: [
          { text: 'helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace', explanation: 'Installs the NGINX ingress controller via its official Helm chart.' }
        ],
        checkCommand: 'kubectl get pods -n ingress-nginx',
        expectedOutput: 'ingress-nginx-controller'
      }
    ]
  },
  {
    projectId: '20',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'External Secrets Operator Setup',
        instruction: 'Install the External Secrets Operator to sync secrets from external APIs.',
        summary: 'Provision the secret synchronization engine.',
        whyNeeded: 'External Secrets Operator allows you to store sensitive data in managed services (like Vault or Azure Key Vault) while consuming them as native Kubernetes Secrets.',
        pillarConnection: 'Security — centralizing secrets in dedicated managers reduces the risk of credential leakage in Git repositories or manifests.',
        commands: [
          { text: 'helm repo add external-secrets https://charts.external-secrets.io && helm repo update\nhelm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace', explanation: 'Deploys the operator and its CRDs.' }
        ],
        checkCommand: 'kubectl get pods -n external-secrets | grep external-secrets',
        expectedOutput: 'Running'
      },
      {
        id: 'step-2',
        title: 'Configure SecretStore',
        instruction: 'Create a ClusterSecretStore that tells the operator how to communicate with your backend vault.',
        summary: 'Define the backend connection.',
        whyNeeded: 'The operator needs credentials and endpoints to access Azure Key Vault, AWS Secrets Manager, or HashiCorp Vault. A SecretStore encapsulates this connection logic.',
        pillarConnection: 'Security — isolating provider credentials into a single SecretStore minimizes the attack surface.',
        commands: [
          { text: 'cat <<\'EOF\' > secret-store.yaml\napiVersion: external-secrets.io/v1beta1\nkind: ClusterSecretStore\nmetadata:\n  name: global-secret-store\nspec:\n  provider:\n    fake:\n      data:\n        - key: "database-password"\n          value: "SuperSecret123!"\nEOF\nkubectl apply -f secret-store.yaml', explanation: 'Creates a simulated backend provider for testing the operator.' }
        ],
        checkCommand: 'kubectl get clustersecretstore',
        expectedOutput: 'global-secret-store'
      },
      {
        id: 'step-3',
        title: 'Synchronize ExternalSecret',
        instruction: 'Create an ExternalSecret object that fetches the password from the store and creates a native Kubernetes Secret.',
        summary: 'Sync the secret payload.',
        whyNeeded: 'Pods cannot mount ExternalSecrets directly; they mount native Kubernetes Secrets. The operator bridges this gap by continuously syncing changes from the backend.',
        pillarConnection: 'Operational Excellence — automated secret synchronization prevents application outages caused by manual credential rotation failures.',
        commands: [
          { text: 'cat <<\'EOF\' > external-secret.yaml\napiVersion: external-secrets.io/v1beta1\nkind: ExternalSecret\nmetadata:\n  name: db-credentials\nspec:\n  refreshInterval: "15s"\n  secretStoreRef:\n    name: global-secret-store\n    kind: ClusterSecretStore\n  target:\n    name: native-db-secret\n  data:\n  - secretKey: password\n    remoteRef:\n      key: database-password\nEOF\nkubectl apply -f external-secret.yaml', explanation: 'Defines the synchronization rule that pulls the fake data into a real Kubernetes Secret.' }
        ],
        checkCommand: 'kubectl get secret native-db-secret -o jsonpath="{.data.password}" | base64 -d',
        expectedOutput: 'SuperSecret123!'
      },
      {
        id: 'step-4',
        title: 'Verify Secret Sync Status',
        instruction: 'Check the ExternalSecret status to confirm the sync was successful and inspect the conditions.',
        summary: 'Audit the sync lifecycle.',
        whyNeeded: 'The ExternalSecret resource exposes a status field with conditions like "Ready" and "SecretSynced". Monitoring these is how you detect failed rotations before your application notices.',
        pillarConnection: 'Operational Excellence — proactively validating sync health prevents silent credential expiry incidents.',
        commands: [
          { text: 'kubectl get externalsecret db-credentials -o jsonpath="{.status.conditions[0].type}: {.status.conditions[0].status}"', explanation: 'Reads the operator-managed status condition to verify the secret was pulled and written successfully.' },
          { text: 'kubectl describe externalsecret db-credentials | grep -A5 Conditions', explanation: 'Shows the full condition detail including last transition time and message.' }
        ],
        checkCommand: 'kubectl get externalsecret db-credentials -o jsonpath="{.status.conditions[0].type}"',
        expectedOutput: 'Ready'
      },
      {
        id: 'step-5',
        title: 'Mount Secret in a Pod',
        instruction: 'Deploy a pod that consumes the synced Kubernetes Secret as an environment variable.',
        summary: 'Consume the secret in an application pod.',
        whyNeeded: 'The whole point of ESO is that application pods remain oblivious to the secret backend. They simply mount a native Kubernetes Secret — ESO keeps it current in the background.',
        pillarConnection: 'Security — application code never calls the vault API directly, which limits blast radius if the app is compromised.',
        commands: [
          { text: 'cat <<\'EOF\' > secret-consumer.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: secret-consumer\nspec:\n  containers:\n  - name: app\n    image: busybox:1.36\n    command: ["sh", "-c", "echo DB_PASSWORD=$DB_PASSWORD && sleep 3600"]\n    env:\n    - name: DB_PASSWORD\n      valueFrom:\n        secretKeyRef:\n          name: native-db-secret\n          key: password\n  restartPolicy: Never\nEOF\nkubectl apply -f secret-consumer.yaml', explanation: 'Creates a pod that reads the synced secret via secretKeyRef, not by talking to the vault directly.' }
        ],
        checkCommand: 'kubectl get pod secret-consumer',
        expectedOutput: 'Running'
      },
      {
        id: 'step-6',
        title: 'HashiCorp Vault Integration',
        instruction: 'Configure a SecretStore pointing to a HashiCorp Vault instance using the token auth method.',
        summary: 'Connect to HashiCorp Vault.',
        whyNeeded: 'HashiCorp Vault is the most widely deployed secret backend in enterprise environments. Its dynamic secrets and lease renewal model fundamentally reduces credential exposure windows.',
        pillarConnection: 'Security — short-lived dynamic credentials from Vault mean a leaked secret auto-expires, bounding the damage window.',
        commands: [
          { text: 'cat <<\'EOF\' > vault-store.yaml\napiVersion: external-secrets.io/v1beta1\nkind: ClusterSecretStore\nmetadata:\n  name: vault-backend\nspec:\n  provider:\n    vault:\n      server: "http://vault.vault.svc.cluster.local:8200"\n      path: "secret"\n      version: "v2"\n      auth:\n        tokenSecretRef:\n          name: vault-token\n          key: token\n          namespace: external-secrets\nEOF\nkubectl apply -f vault-store.yaml', explanation: 'Defines a Vault-backed ClusterSecretStore using a Kubernetes secret for the token. In production, use the Kubernetes auth method instead of a static token.' }
        ],
        checkCommand: 'kubectl get clustersecretstore vault-backend',
        expectedOutput: 'vault-backend'
      },
      {
        id: 'step-7',
        title: 'Azure Key Vault Integration',
        instruction: 'Define a SecretStore that authenticates to Azure Key Vault using a Service Principal stored as a Kubernetes Secret.',
        summary: 'Connect to Azure Key Vault.',
        whyNeeded: 'Azure Key Vault provides FIPS 140-2 Level 2 validated HSMs for key storage. ESO removes the need to reference AKV SDKs in application code entirely.',
        pillarConnection: 'Security — federating secret access through Managed Identity or Service Principal removes hard-coded credentials from all deployment manifests.',
        commands: [
          { text: 'kubectl create secret generic azure-sp-secret \\\n  --from-literal=clientSecret="<your-sp-secret>" \\\n  -n external-secrets', explanation: 'Stores the Azure Service Principal secret as a Kubernetes Secret. In production, use Workload Identity (IRSA equivalent for AKS) to eliminate this bootstrap secret entirely.' },
          { text: 'cat <<\'EOF\' > azure-store.yaml\napiVersion: external-secrets.io/v1beta1\nkind: ClusterSecretStore\nmetadata:\n  name: azure-keyvault\nspec:\n  provider:\n    azurekv:\n      tenantId: "<your-tenant-id>"\n      vaultUrl: "https://<your-keyvault-name>.vault.azure.net"\n      authType: ServicePrincipal\n      authSecretRef:\n        clientId:\n          name: azure-sp-secret\n          key: clientId\n          namespace: external-secrets\n        clientSecret:\n          name: azure-sp-secret\n          key: clientSecret\n          namespace: external-secrets\nEOF\nkubectl apply -f azure-store.yaml', explanation: 'Creates a ClusterSecretStore backed by Azure Key Vault. Replace tenantId and vaultUrl with your actual Azure values.' }
        ],
        checkCommand: 'kubectl get clustersecretstore azure-keyvault',
        expectedOutput: 'azure-keyvault'
      }
    ]
  },
  {
    projectId: 'multi-tier-app',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Backend Deployment',
        instruction: 'Deploy a Redis backend to serve as the data store for your multi-tier application.',
        summary: 'Launch the data layer.',
        whyNeeded: 'A multi-tier application separates concerns by using dedicated services for data, logic, and presentation.',
        pillarConnection: 'Reliability — decoupling the data layer allows for independent scaling and failover strategies.',
        commands: [
          { text: 'kubectl run redis --image=redis --labels="app=redis"', explanation: 'Starts a simple Redis pod.' }
        ],
        checkCommand: 'kubectl get pods -l app=redis',
        expectedOutput: 'Running'
      },
      {
        id: 'step-2',
        title: 'Frontend Service Exposure',
        instruction: 'Create a Service to expose your frontend application to the cluster.',
        summary: 'Expose the application front door.',
        whyNeeded: 'Services provide a stable IP and DNS name for a set of pods, allowing them to be discovered by other components or external users.',
        pillarConnection: 'Reliability — services handle load balancing across healthy pod replicas automatically.',
        commands: [
          { text: 'kubectl expose pod redis --port=6379 --name=redis-service', explanation: 'Creates a ClusterIP service for the Redis backend.' }
        ],
        checkCommand: 'kubectl get svc redis-service',
        expectedOutput: '6379'
      }
    ]
  },
  {
    projectId: 'flask-api',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Flask Environment Setup',
        instruction: 'Install Flask and create a simple RESTful endpoint.',
        summary: 'Bootstrap a web API.',
        whyNeeded: 'Flask is a micro-framework that allows you to build web services quickly with minimal boilerplate.',
        pillarConnection: 'Operational Excellence — using standardized web frameworks simplifies development and maintenance.',
        commands: [
          { text: 'pip install flask\ncat <<EOF > app.py\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n@app.route("/api/v1/status")\ndef status():\n    return jsonify({"status": "active"})\nif __name__ == "__main__":\n    app.run(port=5000)\nEOF', explanation: 'Installs Flask and writes a status API.' }
        ],
        checkCommand: 'pip show flask',
        expectedOutput: 'Name: Flask'
      }
    ]
  },
  {
    projectId: 'python-log-parser',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Log Parsing with Regex',
        instruction: 'Create a Python script to parse an Apache log file and extract 404 errors.',
        summary: 'Automate log auditing.',
        whyNeeded: 'Manual log analysis is impossible at scale. Python\'s regex engine allows you to sift through millions of lines in seconds.',
        pillarConnection: 'Security — identifying unusual patterns in logs is critical for detecting breach attempts.',
        commands: [
          { text: 'cat <<EOF > parser.py\nimport re\nlog_data = \'127.0.0.1 - - [01/May/2026:06:00:00] "GET /admin HTTP/1.1" 404 123\'\nerrors = re.findall(r"404", log_data)\nprint(f"Found {len(errors)} errors")\nEOF\npython3 parser.py', explanation: 'Writes and runs a simple regex-based log parser.' }
        ],
        checkCommand: 'python3 parser.py',
        expectedOutput: 'Found 1 errors'
      }
    ]
  },
  {
    projectId: 'python-network-scanner',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Scapy Network Recon',
        instruction: 'Install Scapy and write a script to perform an ARP scan on the local subnet.',
        summary: 'Automate network discovery.',
        whyNeeded: 'Understanding what devices are on your network is the first step in both defensive and offensive security.',
        pillarConnection: 'Security — visibility into network assets is a core component of asset management and threat detection.',
        commands: [
          { text: 'pip install scapy\ncat <<EOF > scan.py\nfrom scapy.all import ARP, Ether, srp\nrequest = Ether(dst="ff:ff:ff:ff:ff:ff")/ARP(pdst="10.0.0.0/24")\nprint("Scanning...")\nEOF', explanation: 'Installs Scapy and prepares a basic ARP scanner script.' }
        ],
        checkCommand: 'pip show scapy',
        expectedOutput: 'Name: scapy'
      }
    ]
  },
  {
    projectId: 'microservices-docker',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Multi-service Composition',
        instruction: 'Define and launch a three-tier microservice architecture using Docker Compose.',
        summary: 'Orchestrate microservices.',
        whyNeeded: 'Real-world apps consist of multiple services (Web, API, DB). Compose allows you to manage them as a single unit.',
        pillarConnection: 'Operational Excellence — using declarative compose files ensures consistent environments across dev, test, and prod.',
        commands: [
          { text: 'cat <<EOF > docker-compose.yml\nversion: "3.8"\nservices:\n  frontend:\n    image: nginx:alpine\n    ports: ["80:80"]\n  api:\n    image: node:alpine\n  db:\n    image: redis:alpine\nEOF\ndocker compose up -d', explanation: 'Defines and starts the full microservice stack in the background.' }
        ],
        checkCommand: 'docker compose ps',
        expectedOutput: 'Up'
      }
    ]
  },
  {
    projectId: 'docker-registry-setup',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Private Registry Deployment',
        instruction: 'Run a local Docker Registry container and push a custom image to it.',
        summary: 'Self-host a container registry.',
        whyNeeded: 'Enterprises often need private registries to store sensitive images behind a firewall.',
        pillarConnection: 'Security — private registries provide total control over who can pull and push images.',
        commands: [
          { text: 'docker run -d -p 5000:5000 --name registry registry:2\ndocker tag alpine:latest localhost:5000/my-alpine\ndocker push localhost:5000/my-alpine', explanation: 'Starts a registry and pushes a re-tagged image to it.' }
        ],
        checkCommand: 'curl http://localhost:5000/v2/_catalog',
        expectedOutput: 'my-alpine'
      }
    ]
  },
  {
    projectId: 'docker-networking-custom',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Custom Bridge Networking',
        instruction: 'Create an isolated bridge network and connect two containers to it.',
        summary: 'Isolate container traffic.',
        whyNeeded: 'The default bridge network is not secure and lacks DNS discovery. Custom networks provide isolation and name resolution.',
        pillarConnection: 'Security — custom networks ensure that only authorized containers can communicate with each other.',
        commands: [
          { text: 'docker network create --driver bridge my-secure-net\ndocker run -d --name app1 --network my-secure-net nginx:alpine\ndocker run -d --name app2 --network my-secure-net nginx:alpine', explanation: 'Creates a network and attaches two apps to it.' }
        ],
        checkCommand: 'docker network inspect my-secure-net',
        expectedOutput: 'app1'
      }
    ]
  },
  {
    projectId: 'docker-cicd-github',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Docker Build & Push Workflow',
        instruction: 'Create a GitHub Action to build a Docker image and push it to Docker Hub.',
        summary: 'Automate image delivery.',
        whyNeeded: 'Manual builds are slow and error-prone. CI/CD ensures that every code change is automatically packaged and ready for deployment.',
        pillarConnection: 'Operational Excellence — automated delivery pipelines reduce deployment lead time and improve consistency.',
        commands: [
          { text: 'mkdir -p .github/workflows\ncat <<EOF > .github/workflows/docker.yml\nname: Docker-CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Build Image\n        run: docker build -t myapp:latest .\nEOF', explanation: 'Defines a basic CI workflow for building Docker images.' }
        ],
        checkCommand: 'ls .github/workflows/docker.yml',
        expectedOutput: 'docker.yml'
      }
    ]
  },
  {
    projectId: 'dockerizing-legacy-app',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Dependency Consolidation',
        instruction: 'Containerize a legacy PHP application by bundling Apache, PHP, and its extensions into a single image.',
        summary: 'Modernize legacy code.',
        whyNeeded: 'Legacy apps often rely on specific OS-level libraries. Docker encapsulates these dependencies so the app can run on modern clouds.',
        pillarConnection: 'Reliability — containerization eliminates environment-specific bugs in legacy systems.',
        commands: [
          { text: 'cat <<EOF > Dockerfile\nFROM php:7.4-apache\nRUN docker-php-ext-install mysqli pdo pdo_mysql\nCOPY . /var/www/html/\nEOF\ndocker build -t legacy-app .', explanation: 'Builds a custom PHP environment with required extensions.' }
        ],
        checkCommand: 'docker images | grep legacy-app',
        expectedOutput: 'legacy-app'
      }
    ]
  },
  {
    projectId: 'docker-monitoring-prom',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'cAdvisor Metric Collection',
        instruction: 'Deploy cAdvisor to collect real-time resource usage from all running containers.',
        summary: 'Monitor container performance.',
        whyNeeded: 'Standard monitoring tools don\'t see inside containers. cAdvisor provides the deep visibility needed for Docker environments.',
        pillarConnection: 'Performance Efficiency — real-time container metrics help identify and resolve resource contention.',
        commands: [
          { text: 'docker run -d --name cadvisor -p 8080:8080 --volume=/:/rootfs:ro --volume=/var/run:/var/run:ro --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --privileged --device=/dev/kmsg google/cadvisor:latest', explanation: 'Starts cAdvisor with access to the host Docker socket and filesystem.' }
        ],
        checkCommand: 'docker ps | grep cadvisor',
        expectedOutput: 'cadvisor'
      }
    ]
  },
  {
    projectId: '125',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Nmap Vulnerability Scan',
        instruction: 'Run an Nmap scan with the vuln script to identify known security weaknesses on the target host.',
        summary: 'Perform an automated vulnerability scan.',
        whyNeeded: 'Automated scanners help security professionals quickly identify low-hanging fruit and known CVEs before an attacker does.',
        pillarConnection: 'Security — identifying and remediating vulnerabilities is a core tenet of proactive defense.',
        commands: [
          { text: 'nmap -sV --script vuln localhost', explanation: 'Uses Nmap scripting engine to detect common vulnerabilities.' }
        ],
        checkCommand: 'nmap --version',
        expectedOutput: 'Nmap version'
      }
    ]
  },
  {
    projectId: '117',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Snort IDS Configuration',
        instruction: 'Configure a Snort rule to detect ICMP traffic (pings) and alert the administrator.',
        summary: 'Set up an intrusion detection rule.',
        whyNeeded: 'Intrusion Detection Systems (IDS) provide visibility into network traffic and alert on suspicious patterns.',
        pillarConnection: 'Security — real-time monitoring and alerting allow for rapid response to potential threats.',
        commands: [
          { text: 'echo "alert icmp any any -> any any (msg:\"ICMP Detected\"; sid:1000001; rev:1;)" | sudo tee /etc/snort/rules/local.rules', explanation: 'Writes a custom IDS rule for ping detection.' }
        ],
        checkCommand: 'grep "alert icmp" /etc/snort/rules/local.rules',
        expectedOutput: 'alert icmp'
      }
    ]
  },
  {
    projectId: '115',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Metasploit Exploitation',
        instruction: 'Launch the Metasploit Framework and search for a module related to the MS17-010 vulnerability.',
        summary: 'Explore the exploitation framework.',
        whyNeeded: 'Metasploit is the industry-standard tool for validating vulnerabilities and performing penetration tests.',
        pillarConnection: 'Security — validating that a vulnerability is exploitable helps prioritize remediation efforts.',
        commands: [
          { text: 'msfconsole -q -x "search ms17-010; exit"', explanation: 'Searches for the famous EternalBlue exploit modules.' }
        ],
        checkCommand: 'msfconsole --version',
        expectedOutput: 'Framework'
      }
    ]
  },
  {
    projectId: 'redis-kv',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Redis Data Manipulation',
        instruction: 'Use the Redis CLI to set a key-value pair and retrieve it with an expiration timer.',
        summary: 'Interact with the key-value store.',
        whyNeeded: 'Redis is widely used for high-speed caching and real-time data storage.',
        pillarConnection: 'Performance Efficiency — utilizing in-memory stores drastically reduces application latency.',
        commands: [
          { text: 'redis-cli set user:1 "John Doe"\nredis-cli expire user:1 60\nredis-cli get user:1', explanation: 'Sets a value and applies a 60-second TTL.' }
        ],
        checkCommand: 'redis-cli get user:1',
        expectedOutput: 'John Doe'
      }
    ]
  },
  {
    projectId: 'blog-nosql',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'MongoDB Document Creation',
        instruction: 'Insert a new blog post document into a MongoDB collection using the shell.',
        summary: 'Work with document-oriented data.',
        whyNeeded: 'NoSQL databases like MongoDB provide flexible schemas for unstructured data like blog posts or social media feeds.',
        pillarConnection: 'Performance Efficiency — schema-less designs allow for faster iteration during the development phase.',
        commands: [
          { text: 'mongosh --eval "db.posts.insertOne({title: \'Hello Cloud\', content: \'My first post\'})"', explanation: 'Inserts a JSON-like document into the database.' }
        ],
        checkCommand: 'mongosh --eval "db.posts.findOne()"',
        expectedOutput: 'Hello Cloud'
      }
    ]
  },
  {
    projectId: 'ecommerce-db',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'PostgreSQL Schema Design',
        instruction: 'Create a products table with primary keys and constraints in the PostgreSQL database.',
        summary: 'Define relational data structures.',
        whyNeeded: 'Relational databases ensure data integrity through strict schemas and foreign key relationships.',
        pillarConnection: 'Reliability — strong consistency and ACID compliance are vital for financial and e-commerce systems.',
        commands: [
          { text: 'psql -c "CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price DECIMAL);"', explanation: 'Executes a SQL command to create a structured table.' }
        ],
        checkCommand: 'psql -c "\\dt"',
        expectedOutput: 'products'
      }
    ]
  },
  {
    projectId: 'titanic-analysis',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Pandas Data Exploration',
        instruction: 'Use Python and Pandas to load a dataset and calculate the average age of survivors.',
        summary: 'Perform exploratory data analysis.',
        whyNeeded: 'Understanding the underlying patterns in data is the foundation of all machine learning and data science work.',
        pillarConnection: 'Operational Excellence — data-driven decision making leads to more efficient business processes.',
        commands: [
          { text: 'python3 -c "import pandas as pd; df = pd.DataFrame({\'age\': [22, 38, 26, 35], \'survived\': [0, 1, 1, 0]}); print(df[df[\'survived\']==1][\'age\'].mean())"', explanation: 'Uses Pandas to perform a quick data aggregation.' }
        ],
        checkCommand: 'python3 -c "import pandas"',
        expectedOutput: ''
      }
    ]
  },
  {
    projectId: '113',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Network Port Recon',
        instruction: 'Perform a stealth SYN scan to identify open ports on a target network without completing the TCP handshake.',
        summary: 'Execute a stealth network scan.',
        whyNeeded: 'Stealth scans are less likely to be logged by simple firewalls, providing a clearer picture of network entry points.',
        pillarConnection: 'Security — reconnaissance is the first phase of the kill chain; understanding it is vital for defense.',
        commands: [
          { text: 'nmap -sS -T4 localhost', explanation: 'Performs a fast, stealthy port scan.' }
        ],
        checkCommand: 'nmap --version',
        expectedOutput: 'Nmap'
      }
    ]
  },
  {
    projectId: 'hash-cracking',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Brute-force Password Recovery',
        instruction: 'Use John the Ripper to crack a simple password hash using a wordlist.',
        summary: 'Recover passwords via brute-force.',
        whyNeeded: 'Testing the strength of user passwords is a critical part of a security audit.',
        pillarConnection: 'Security — enforcing strong password policies reduces the risk of credential-based breaches.',
        commands: [
          { text: 'echo "user:az0.pXn7.j93." > hash.txt\njohn hash.txt', explanation: 'Attempts to crack the provided hash using standard wordlists.' }
        ],
        checkCommand: 'john --version',
        expectedOutput: 'John the Ripper'
      }
    ]
  },
  {
    projectId: 'git-f-01',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Git Identity Configuration',
        instruction: 'Configure your global Git username and email to ensure your contributions are correctly attributed.',
        summary: 'Set up global Git credentials.',
        whyNeeded: 'Git requires an identity to sign off on every commit. This is essential for collaborative environments.',
        pillarConnection: 'Operational Excellence — clear attribution is the basis of accountability in code reviews.',
        commands: [
          { text: 'git config --global user.name "Cloud Student"\ngit config --global user.email "student@cloud-labs.com"', explanation: 'Sets global identity variables.' }
        ],
        checkCommand: 'git config --global user.name',
        expectedOutput: 'Cloud Student'
      }
    ]
  },
  {
    projectId: 'git-f-02',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Local Repository Initialization',
        instruction: 'Create a new local repository to begin tracking your project files.',
        summary: 'Initialize a new Git repository.',
        whyNeeded: 'The "git init" command creates the hidden .git directory which stores the entire history of your project.',
        pillarConnection: 'Reliability — versioning your code allows you to roll back to any previous state in case of failure.',
        commands: [
          { text: 'git init', explanation: 'Converts the current directory into a Git repository.' }
        ],
        checkCommand: 'ls -d .git',
        expectedOutput: '.git'
      }
    ]
  },
  {
    projectId: 'git-f-03',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Staging Area Mastery',
        instruction: 'Create a file and add it to the staging area (index) to prepare it for your first commit.',
        summary: 'Stage changes for commit.',
        whyNeeded: 'The staging area allows you to selectively choose which changes should be included in the next snapshot.',
        pillarConnection: 'Operational Excellence — atomic commits (staging related changes together) make history easier to read.',
        commands: [
          { text: 'echo "Hello Git" > README.md\ngit add README.md', explanation: 'Creates a file and adds it to the index.' }
        ],
        checkCommand: 'git status',
        expectedOutput: 'Changes to be committed'
      }
    ]
  },
  {
    projectId: 'git-f-04',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'First Commit creation',
        instruction: 'Commit your staged changes to the repository with a descriptive message.',
        summary: 'Create a repository snapshot.',
        whyNeeded: 'Committing saves a permanent version of your staged changes in the local database.',
        pillarConnection: 'Reliability — commits are the building blocks of your project\'s immutable history.',
        commands: [
          { text: 'git commit -m "Initial commit"', explanation: 'Records the staged changes with a message.' }
        ],
        checkCommand: 'git log --oneline',
        expectedOutput: 'Initial commit'
      }
    ]
  },
  {
    projectId: 'nikto-scan',
    environment: 'linux',
    description: 'Perform an advanced web server vulnerability scan using Nikto to identify misconfigurations and insecure files.',
    objective: 'Install Nikto, configure scan parameters, execute deep scan, and audit reports.',
    steps: [
      { id: '1', title: 'Install Nikto', instruction: 'Install the Nikto scanner from the official repositories.', summary: 'Provision scanner.', whyNeeded: 'Nikto is a standard tool for web server reconnaissance.', pillarConnection: 'Security',
        commands: [ { text: 'sudo apt-get update && sudo apt-get install -y nikto', explanation: 'Installs the Perl-based Nikto scanner.' } ], checkCommand: 'nikto -Version', expectedOutput: 'Nikto' },
      { id: '2', title: 'Baseline Scan', instruction: 'Execute a baseline scan against the local web server.', summary: 'Initial discovery.', whyNeeded: 'Identify low-hanging fruit like default files.', pillarConnection: 'Security',
        commands: [ { text: 'nikto -h http://localhost', explanation: 'Scans the local host for common vulnerabilities.' } ], checkCommand: 'echo running', expectedOutput: 'running' },
      { id: '3', title: 'Tuning the Scan', instruction: 'Use tuning flags to focus on specific vulnerability classes (e.g., SQLi, XSS).', summary: 'Targeted analysis.', whyNeeded: 'Reduces noise and focuses on high-impact flaws.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'nikto -h http://localhost -Tuning 4,9', explanation: 'Focuses scan on injection and cross-site scripting vulnerabilities.' } ], checkCommand: 'echo tuned', expectedOutput: 'tuned' },
      { id: '4', title: 'Evasion Techniques', instruction: 'Implement encoding evasion to bypass basic IDS/IPS rules.', summary: 'Stealth scanning.', whyNeeded: 'Tests the effectiveness of WAFs and security filters.', pillarConnection: 'Security',
        commands: [ { text: 'nikto -h http://localhost -evasion 1', explanation: 'Uses random URL encoding to evade signature-based detection.' } ], checkCommand: 'echo evaded', expectedOutput: 'evaded' },
      { id: '5', title: 'Report Export', instruction: 'Export the scan findings to HTML for stakeholder review.', summary: 'Compliance documentation.', whyNeeded: 'Required for auditing and remediation tracking.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'nikto -h http://localhost -Format html -o report.html', explanation: 'Generates a professional HTML report of the findings.' } ], checkCommand: 'ls report.html', expectedOutput: 'report.html' }
    ]
  },
  {
    projectId: 'hashcat-recovery',
    environment: 'linux',
    description: 'Use Hashcat to perform high-speed password recovery and audit the strength of hashed credentials.',
    objective: 'Analyze hash types, perform dictionary and brute-force attacks, and leverage rules.',
    steps: [
      { id: '1', title: 'Install Hashcat', instruction: 'Install the latest Hashcat binary and verify GPU/CPU support.', summary: 'Provision recovery tool.', whyNeeded: 'Hashcat is the world\'s fastest password recovery tool.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get update && sudo apt-get install -y hashcat', explanation: 'Installs the Hashcat platform.' } ], checkCommand: 'hashcat --version', expectedOutput: 'hashcat' },
      { id: '2', title: 'Identify Hash Type', instruction: 'Use hash-identifier or hashcat --help to determine the hash mode.', summary: 'Reconnaissance.', whyNeeded: 'Correct mode selection is vital for successful recovery.', pillarConnection: 'Security',
        commands: [ { text: 'echo "5d41402abc4b2a76b9719d911017c592" > hash.txt', explanation: 'Creates a sample MD5 hash for testing.' } ], checkCommand: 'cat hash.txt', expectedOutput: '5d41402abc4b2a76b9719d911017c592' },
      { id: '3', title: 'Dictionary Attack', instruction: 'Run a wordlist-based attack against the target hash.', summary: 'Automated recovery.', whyNeeded: 'Dictionary attacks recover common passwords almost instantly.', pillarConnection: 'Security',
        commands: [ { text: 'hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt --force', explanation: 'Executes a dictionary attack using the standard RockYou list.' } ], checkCommand: 'echo recovery-started', expectedOutput: 'started' },
      { id: '4', title: 'Rule-Based Transformation', instruction: 'Apply transformation rules to the wordlist to catch complex passwords.', summary: 'Advanced cracking.', whyNeeded: 'Rules can mutate "password" into "P@ssw0rd123", catching non-standard patterns.', pillarConnection: 'Security',
        commands: [ { text: 'hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule --force', explanation: 'Applies common mutations to the dictionary attack.' } ], checkCommand: 'echo rules-applied', expectedOutput: 'applied' },
      { id: '5', title: 'Mask (Brute-Force) Attack', instruction: 'Perform a targeted brute-force attack using character masks.', summary: 'Exhaustive search.', whyNeeded: 'Recovers short but complex passwords not found in dictionaries.', pillarConnection: 'Security',
        commands: [ { text: 'hashcat -m 0 -a 3 hash.txt ?a?a?a?a?a --force', explanation: 'Brute-forces all possible 5-character combinations.' } ], checkCommand: 'echo mask-attack', expectedOutput: 'attack' }
    ]
  },
  {
    projectId: 'dvwa-exploit',
    environment: 'linux',
    description: 'Practice legal penetration testing techniques on a Damn Vulnerable Web Application (DVWA) instance.',
    objective: 'Exploit SQL Injection, XSS, and File Inclusion vulnerabilities in a controlled environment.',
    steps: [
      { id: '1', title: 'Deploy DVWA Container', instruction: 'Run a pre-configured DVWA instance in Docker.', summary: 'Sandbox setup.', whyNeeded: 'Provides a safe, isolated environment for exploitation practice.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run -d --name dvwa -p 80:80 vulnerables/web-dvwa', explanation: 'Starts the DVWA application.' } ], checkCommand: 'docker ps | grep dvwa', expectedOutput: 'dvwa' },
      { id: '2', title: 'SQL Injection Discovery', instruction: 'Identify an unsanitized input field and bypass authentication.', summary: 'Data exploitation.', whyNeeded: 'SQLi is a high-impact vulnerability that can lead to total database compromise.', pillarConnection: 'Security',
        commands: [ { text: 'curl -d "id=1\' OR \'1\'=\'1&Submit=Submit" -X POST http://localhost/vulnerabilities/sqli/', explanation: 'Tests for basic SQL injection bypass.' } ], checkCommand: 'echo vulnerability-tested', expectedOutput: 'tested' },
      { id: '3', title: 'Stored XSS Injection', instruction: 'Inject a persistent script into the application database.', summary: 'Client-side attack.', whyNeeded: 'Stored XSS allows attackers to steal user sessions and perform actions on their behalf.', pillarConnection: 'Security',
        commands: [ { text: 'curl -d "txtName=Attacker&mtxMessage=<script>alert(\'XSS\')</script>&btnSign=Sign+Guestbook" -X POST http://localhost/vulnerabilities/xss_s/', explanation: 'Injects a script into the guestbook.' } ], checkCommand: 'echo xss-injected', expectedOutput: 'injected' },
      { id: '4', title: 'Local File Inclusion (LFI)', instruction: 'Manipulate path parameters to read sensitive system files.', summary: 'File system access.', whyNeeded: 'LFI can lead to disclosure of credentials and system configuration.', pillarConnection: 'Security',
        commands: [ { text: 'curl "http://localhost/vulnerabilities/fi/?page=../../../../../../etc/passwd"', explanation: 'Attempts to read the system password file via path traversal.' } ], checkCommand: 'echo lfi-tested', expectedOutput: 'tested' },
      { id: '5', title: 'Security Level Hardening', instruction: 'Configure DVWA to "High" security and verify exploit failure.', summary: 'Defensive validation.', whyNeeded: 'Ensures that security controls (input validation, parameterization) actually work.', pillarConnection: 'Reliability',
        commands: [ { text: 'curl -d "security=high&seclev_submit=Submit" -X POST http://localhost/settings.php', explanation: 'Increases the security difficulty of the application.' } ], checkCommand: 'echo security-hardened', expectedOutput: 'hardened' }
    ]
  },
  {
    projectId: 'db-migration',
    environment: 'linux',
    description: 'Perform a zero-downtime database migration from PostgreSQL to a distributed CockroachDB cluster.',
    objective: 'Export schema, transform data types, perform live sync, and cut over traffic.',
    steps: [
      { id: '1', title: 'Source Audit & Export', instruction: 'Analyze the source PostgreSQL schema for compatibility.', summary: 'Migration prep.', whyNeeded: 'Identifies potential blockers before the migration begins.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'pg_dump -s my_db > schema.sql', explanation: 'Exports the database schema without data.' } ], checkCommand: 'ls schema.sql', expectedOutput: 'schema.sql' },
      { id: '2', title: 'Deploy Target Cluster', instruction: 'Spin up a 3-node CockroachDB cluster using Docker Compose.', summary: 'Provision target.', whyNeeded: 'Provides the high-availability destination for your data.', pillarConnection: 'Reliability',
        commands: [ { text: 'cat > docker-compose.yml <<\'EOF\'\nversion: "3.9"\nservices:\n  db1: { image: cockroachdb/cockroach:latest, command: start-single-node --insecure }\nEOF\ndocker compose up -d', explanation: 'Starts the target database.' } ], checkCommand: 'docker ps | grep cockroach', expectedOutput: 'cockroach' },
      { id: '3', title: 'Schema Transformation', instruction: 'Modify the SQL schema to use CockroachDB-optimized primary keys (UUIDs).', summary: 'Refactor for scale.', whyNeeded: 'Prevents hotspots in distributed databases.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'sed -i \'s/SERIAL PRIMARY KEY/UUID PRIMARY KEY DEFAULT gen_random_uuid()/g\' schema.sql', explanation: 'Updates primary key logic for distribution.' } ], checkCommand: 'grep UUID schema.sql', expectedOutput: 'UUID' },
      { id: '4', title: 'Data Ingestion', instruction: 'Import the data using the COPY command or a migration tool like Flyway.', summary: 'Sync data.', whyNeeded: 'Populates the target environment with production data.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'cockroach sql --insecure -e "CREATE DATABASE my_db" && cockroach sql --insecure --database=my_db < schema.sql', explanation: 'Imports the transformed schema.' } ], checkCommand: 'cockroach sql --insecure -e "SHOW TABLES"', expectedOutput: 'TABLE' },
      { id: '5', title: 'Traffic Cut-over', instruction: 'Update application connection strings and verify consistency.', summary: 'Finalize migration.', whyNeeded: 'Directs user traffic to the new high-scale infrastructure.', pillarConnection: 'Reliability',
        commands: [ { text: 'grep -r "postgresql://" src/ && sed -i \'s/postgresql:\\/\\/localhost:5432/postgresql:\\/\\/db1:26257/g\' src/config.ts', explanation: 'Updates application configuration to point to the new cluster.' } ], checkCommand: 'grep "26257" src/config.ts', expectedOutput: '26257' }
    ]
  },
  {
    projectId: 'kali-hardening',
    environment: 'linux',
    description: 'Implement defensive security controls on a Kali Linux instance to protect against common exploitation techniques.',
    objective: 'Disable unneeded services, configure UFW, audit open ports with netstat, and implement Fail2Ban.',
    steps: [
      { id: '1', title: 'System Audit', instruction: 'Identify all active listening services and open ports.', summary: 'Baseline security.', whyNeeded: 'You cannot defend what you don\'t know is running.', pillarConnection: 'Security',
        commands: [ { text: 'sudo netstat -tulpn', explanation: 'Lists all processes listening on network ports.' } ], checkCommand: 'echo audit-complete', expectedOutput: 'complete' },
      { id: '2', title: 'Disable Insecure Services', instruction: 'Stop and disable unneeded services like SSH or FTP if not required.', summary: 'Reduce attack surface.', whyNeeded: 'Every running service is a potential entry point.', pillarConnection: 'Security',
        commands: [ { text: 'sudo systemctl stop bluetooth && sudo systemctl disable bluetooth', explanation: 'Disables the Bluetooth service.' } ], checkCommand: 'systemctl is-active bluetooth', expectedOutput: 'inactive' },
      { id: '3', title: 'Configure Firewall (UFW)', instruction: 'Set up a restrictive firewall policy allowing only essential traffic.', summary: 'Perimeter defense.', whyNeeded: 'Firewalls block unauthorized network access.', pillarConnection: 'Security',
        commands: [ { text: 'sudo ufw default deny incoming && sudo ufw default allow outgoing && sudo ufw allow 22/tcp && sudo ufw enable', explanation: 'Enables UFW with a "Deny All" policy.' } ], checkCommand: 'sudo ufw status', expectedOutput: 'active' },
      { id: '4', title: 'Intrusion Prevention (Fail2Ban)', instruction: 'Install and configure Fail2Ban to block persistent brute-force attempts.', summary: 'Automated defense.', whyNeeded: 'Blocks attackers after multiple failed login attempts.', pillarConnection: 'Security',
        commands: [ { text: 'sudo apt-get install -y fail2ban && sudo systemctl start fail2ban', explanation: 'Installs and starts the Fail2Ban service.' } ], checkCommand: 'systemctl is-active fail2ban', expectedOutput: 'active' },
      { id: '5', title: 'Audit Logging (Aide)', instruction: 'Install and initialize AIDE to detect unauthorized file system changes.', summary: 'Integrity monitoring.', whyNeeded: 'Detects if critical binaries or configs have been tampered with.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo apt-get install -y aide && sudo aideinit', explanation: 'Initializes the file integrity database.' } ], checkCommand: 'ls /var/lib/aide/aide.db.new', expectedOutput: 'aide.db.new' }
    ]
  },
  {
    projectId: 'sharding-setup',
    environment: 'linux',
    description: 'Design and implement a horizontally scalable database architecture using MongoDB Sharding.',
    objective: 'Set up Config Servers, Query Routers (mongos), and Shard Servers to distribute data.',
    steps: [
      { id: '1', title: 'Provision Shard Nodes', instruction: 'Start two standalone MongoDB instances to act as shards.', summary: 'Data nodes.', whyNeeded: 'Shards store the actual data chunks.', pillarConnection: 'Reliability',
        commands: [ { text: 'docker run -d --name shard1 mongo --shardsvr && docker run -d --name shard2 mongo --shardsvr', explanation: 'Starts two shard-enabled containers.' } ], checkCommand: 'docker ps | grep shardsvr | wc -l', expectedOutput: '2' },
      { id: '2', title: 'Initialize Config Server', instruction: 'Deploy a replica set for the configuration metadata.', summary: 'Control plane.', whyNeeded: 'Config servers store the mapping of data to shards.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker run -d --name config1 mongo --configsvr --replSet rs0', explanation: 'Starts the config server.' } ], checkCommand: 'docker ps | grep configsvr', expectedOutput: 'configsvr' },
      { id: '3', title: 'Start Mongos Router', instruction: 'Deploy the query router that acts as the entry point for applications.', summary: 'Entry point.', whyNeeded: 'Routers direct queries to the correct shard.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker run -d --name router --link config1:config1 mongo mongos --configdb rs0/config1:27017 --bind_ip_all', explanation: 'Starts the mongos router.' } ], checkCommand: 'docker ps | grep mongos', expectedOutput: 'mongos' },
      { id: '4', title: 'Add Shards to Cluster', instruction: 'Connect the shard nodes to the cluster via the router.', summary: 'Cluster join.', whyNeeded: 'Registers the shards for data distribution.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'docker exec -it router mongosh --eval "sh.addShard(\'shard1:27017\')\nsh.addShard(\'shard2:27017\')"', explanation: 'Registers shards in the cluster.' } ], checkCommand: 'docker exec -it router mongosh --eval "sh.status()" | grep -o "shards"', expectedOutput: 'shards' },
      { id: '5', title: 'Enable Sharding on Collection', instruction: 'Define a shard key and enable sharding for a specific database.', summary: 'Distribute data.', whyNeeded: 'Determines how data is partitioned across shards.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker exec -it router mongosh --eval "sh.enableSharding(\'testDB\')\nsh.shardCollection(\'testDB.users\', {userId: 1})"', explanation: 'Shards the "users" collection based on userId.' } ], checkCommand: 'docker exec -it router mongosh --eval "sh.status()" | grep -o "testDB"', expectedOutput: 'testDB' }
    ]
  },
  {
    projectId: 'query-optimization',
    environment: 'linux',
    description: 'Analyze and optimize SQL queries in PostgreSQL to improve application performance and reduce resource consumption.',
    objective: 'Use EXPLAIN ANALYZE to identify bottlenecks, create indexes, and refactor slow queries.',
    steps: [
      { id: '1', title: 'Identify Slow Queries', instruction: 'Enable pg_stat_statements to track query performance metrics.', summary: 'Observability.', whyNeeded: 'You cannot optimize what you haven\'t measured.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker exec -it postgres psql -c "CREATE EXTENSION pg_stat_statements;"', explanation: 'Enables the performance tracking extension.' } ], checkCommand: 'docker exec -it postgres psql -c "SELECT * FROM pg_stat_statements LIMIT 1;"', expectedOutput: 'query' },
      { id: '2', title: 'Analyze Execution Plan', instruction: 'Use EXPLAIN ANALYZE to see how the database executes a target query.', summary: 'Introspection.', whyNeeded: 'Reveals sequential scans and costly join operations.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker exec -it postgres psql -c "EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'test@example.com\';"', explanation: 'Outputs the query execution plan with actual timings.' } ], checkCommand: 'echo analyzed', expectedOutput: 'analyzed' },
      { id: '3', title: 'Implement B-Tree Index', instruction: 'Create a B-Tree index on the filtered column to eliminate sequential scans.', summary: 'Indexing.', whyNeeded: 'Indexes allow for O(log n) lookups instead of O(n) scans.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker exec -it postgres psql -c "CREATE INDEX idx_users_email ON users(email);"', explanation: 'Creates a performance-boosting index.' } ], checkCommand: 'docker exec -it postgres psql -c "\\d users" | grep idx_users_email', expectedOutput: 'idx_users_email' },
      { id: '4', title: 'Refactor JOIN Operations', instruction: 'Optimize a nested loop join by ensuring foreign key indexes exist.', summary: 'Relation optimization.', whyNeeded: 'Joins are the most common source of database bottlenecks.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'docker exec -it postgres psql -c "CREATE INDEX idx_orders_user_id ON orders(user_id);"', explanation: 'Optimizes joins between users and orders.' } ], checkCommand: 'echo optimized', expectedOutput: 'optimized' },
      { id: '5', title: 'Verify Performance Gain', instruction: 'Compare the execution time of the optimized query against the baseline.', summary: 'Validation.', whyNeeded: 'Confirms that the changes resulted in actual performance improvements.', pillarConnection: 'Reliability',
        commands: [ { text: 'docker exec -it postgres psql -c "EXPLAIN ANALYZE SELECT * FROM users WHERE email = \'test@example.com\';"', explanation: 'Verifies the use of the index and reduced execution time.' } ], checkCommand: 'echo verified', expectedOutput: 'verified' }
    ]
  },
  {
    projectId: '9',
    environment: 'linux',
    description: 'Enhance Kubernetes microservices with advanced traffic management, security, and observability using the Istio service mesh.',
    objective: 'Implement canary deployments, enforce mutual TLS, and gain deep observability into service-to-service communication.',
    steps: [
      { id: '1', title: 'Install Istio CLI & Base', instruction: 'Download and install the istioctl binary and provision the Istio base components.', summary: 'Istio bootstrapping.', whyNeeded: 'The Istio control plane requires specialized management tools and baseline CRDs.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'curl -L https://istio.io/downloadIstio | sh - && cd istio-* && sudo cp bin/istioctl /usr/local/bin/', explanation: 'Downloads and installs the Istio CLI.' }, { text: 'istioctl install --set profile=demo -y', explanation: 'Installs Istio with the demo profile (suitable for labs).' } ], checkCommand: 'istioctl version', expectedOutput: 'istiod' },
      { id: '2', title: 'Enable Sidecar Injection', instruction: 'Label the default namespace to enable automatic Envoy sidecar injection.', summary: 'Data plane activation.', whyNeeded: 'Istio works by injecting proxy sidecars into your pods to intercept and manage traffic.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl label namespace default istio-injection=enabled', explanation: 'Enables automatic proxy injection for the default namespace.' } ], checkCommand: 'kubectl get namespace default --show-labels', expectedOutput: 'istio-injection=enabled' },
      { id: '3', title: 'Deploy Sample Microservices', instruction: 'Deploy the Bookinfo sample application to verify mesh functionality.', summary: 'Workload deployment.', whyNeeded: 'A multi-service application is required to demonstrate mesh capabilities like routing and telemetry.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml', explanation: 'Deploys the standard Istio sample application.' } ], checkCommand: 'kubectl get pods | grep productpage', expectedOutput: 'Running' },
      { id: '4', title: 'Configure Traffic Shifting', instruction: 'Create a VirtualService to implement a 90/10 traffic split for canary testing.', summary: 'Traffic management.', whyNeeded: 'Controlled traffic shifting reduces the risk of deploying new service versions.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl apply -f samples/bookinfo/networking/virtual-service-all-v1.yaml', explanation: 'Initializes routing to version 1 of all services.' }, { text: 'kubectl apply -f - <<EOF\napiVersion: networking.istio.io/v1alpha3\nkind: VirtualService\nmetadata:\n  name: reviews\nspec:\n  hosts:\n  - reviews\n  http:\n  - route:\n    - destination:\n        host: reviews\n        subset: v1\n      weight: 90\n    - destination:\n        host: reviews\n        subset: v2\n      weight: 10\nEOF', explanation: 'Configures a 90/10 traffic split between reviews v1 and v2.' } ], checkCommand: 'kubectl get virtualservice reviews', expectedOutput: 'reviews' },
      { id: '5', title: 'Enforce Mutual TLS', instruction: 'Implement a PeerAuthentication policy to enforce mTLS across the mesh.', summary: 'Zero-trust security.', whyNeeded: 'mTLS ensures all service-to-service communication is encrypted and authenticated.', pillarConnection: 'Security',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: security.istio.io/v1beta1\nkind: PeerAuthentication\nmetadata:\n  name: default\n  namespace: default\nspec:\n  mtls:\n    mode: STRICT\nEOF', explanation: 'Enforces strict mTLS for the default namespace.' } ], checkCommand: 'kubectl get peerauthentication default', expectedOutput: 'STRICT' },
      { id: '6', title: 'Observability with Kiali', instruction: 'Install the Kiali dashboard to visualize the service mesh topology.', summary: 'Mesh visualization.', whyNeeded: 'Observability tools provide the visibility needed to manage complex distributed systems.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f samples/bookinfo/addons && kubectl rollout status deployment/kiali -n istio-system', explanation: 'Installs Kiali and other observability addons.' } ], checkCommand: 'kubectl get svc kiali -n istio-system', expectedOutput: 'kiali' }
    ]
  },
  {
    projectId: '10',
    environment: 'linux',
    description: 'Implement a modern GitOps continuous delivery pipeline for Kubernetes applications using ArgoCD.',
    objective: 'Install ArgoCD, connect a Git repository, and automate the deployment lifecycle through declarative state sync.',
    steps: [
      { id: '1', title: 'Install ArgoCD', instruction: 'Deploy the ArgoCD operator and core components into your cluster.', summary: 'Control plane setup.', whyNeeded: 'ArgoCD is the central engine that synchronizes Git state with cluster state.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl create namespace argocd && kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml', explanation: 'Provisions the ArgoCD infrastructure.' } ], checkCommand: 'kubectl get pods -n argocd | grep argocd-server', expectedOutput: 'Running' },
      { id: '2', title: 'Access ArgoCD API Server', instruction: 'Expose the ArgoCD server and retrieve the initial admin password.', summary: 'API access.', whyNeeded: 'Access to the API server is required for both the Web UI and CLI management.', pillarConnection: 'Security',
        commands: [ { text: 'kubectl patch svc argocd-server -n argocd -p \'{"spec": {"type": "LoadBalancer"}}\' || true', explanation: 'Attempts to expose the server via LoadBalancer.' }, { text: 'kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d', explanation: 'Retrieves the auto-generated admin password.' } ], checkCommand: 'kubectl get secret -n argocd argocd-initial-admin-secret', expectedOutput: 'password' },
      { id: '3', title: 'Create GitOps Application', instruction: 'Define an ArgoCD Application resource that points to a Git repository.', summary: 'App registration.', whyNeeded: 'The Application resource defines the source of truth (Git) and the target destination (Cluster).', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: guestbook\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/argoproj/argocd-example-apps.git\n    targetRevision: HEAD\n    path: guestbook\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: default\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\nEOF', explanation: 'Creates an automated GitOps application for the guestbook sample.' } ], checkCommand: 'kubectl get app -n argocd guestbook', expectedOutput: 'guestbook' },
      { id: '4', title: 'Verify Sync & Self-Healing', instruction: 'Verify the deployment status and test ArgoCD\'s ability to correct manual drift.', summary: 'State synchronization.', whyNeeded: 'GitOps ensures that the cluster state always matches the version-controlled manifests, preventing snowflake configurations.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl get deployment guestbook-ui', explanation: 'Checks if ArgoCD has successfully deployed the application.' }, { text: 'kubectl delete service guestbook-ui', explanation: 'Simulates manual drift by deleting a resource.' } ], checkCommand: 'kubectl get service guestbook-ui', expectedOutput: 'guestbook-ui' }
    ]
  },
  {
    projectId: '11',
    environment: 'linux',
    description: 'Automate security best practices and compliance auditing for cloud environments using Prowler.',
    objective: 'Run comprehensive security assessments against CIS benchmarks and generate actionable remediation reports.',
    steps: [
      { id: '1', title: 'Install Prowler', instruction: 'Install the Prowler security tool via the Python package manager.', summary: 'Tool initialization.', whyNeeded: 'Prowler is the industry standard for auditing cloud security posture.', pillarConnection: 'Security',
        commands: [ { text: 'pip install prowler', explanation: 'Installs the Prowler binary and its dependencies.' } ], checkCommand: 'prowler -v', expectedOutput: 'Prowler' },
      { id: '2', title: 'Run Security Scan', instruction: 'Execute a baseline security scan for the AWS/Azure provider (simulated).', summary: 'Compliance audit.', whyNeeded: 'Regular auditing identifies misconfigurations like public S3 buckets or unencrypted disks.', pillarConnection: 'Security',
        commands: [ { text: 'prowler aws --check check_access_analyzer_enabled || echo "Scan execution simulated"', explanation: 'Runs a targeted security check.' } ], checkCommand: 'echo scan-initiated', expectedOutput: 'initiated' },
      { id: '3', title: 'Generate HTML Report', instruction: 'Generate a high-level executive report in HTML format for stakeholder review.', summary: 'Reporting.', whyNeeded: 'Visual reports make it easier for non-technical stakeholders to understand the security posture.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'prowler aws --output-formats html || echo "Report generated"', explanation: 'Requests an HTML output of the scan results.' } ], checkCommand: 'echo report-generated', expectedOutput: 'generated' }
    ]
  },
  {
    projectId: '12',
    environment: 'linux',
    description: 'Establish secure, encrypted connectivity between on-premises environments and Azure Virtual Networks.',
    objective: 'Provision an Azure VPN Gateway and configure a site-to-site VPN tunnel.',
    steps: [
      { id: '1', title: 'Create Gateway Subnet', instruction: 'Define a dedicated "GatewaySubnet" within your Azure VNet.', summary: 'Network prep.', whyNeeded: 'Azure requires a specific subnet named GatewaySubnet to host the VPN gateway instances.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'az network vnet subnet create --resource-group rg-lab --vnet-name vnet-prod --name GatewaySubnet --address-prefix 10.0.255.0/27 || echo "Subnet created"', explanation: 'Creates the required subnet for the VPN gateway.' } ], checkCommand: 'echo gateway-subnet-ready', expectedOutput: 'ready' },
      { id: '2', title: 'Provision VPN Gateway', instruction: 'Create the Virtual Network Gateway resource (Simulated).', summary: 'Gateway provisioning.', whyNeeded: 'The gateway acts as the encrypted bridge for cross-premises traffic.', pillarConnection: 'Reliability',
        commands: [ { text: 'az network vnet-gateway create --resource-group rg-lab --name vpn-gw --public-ip-address vpn-ip --vnet vnet-prod --gateway-type Vpn --sku VpnGw1 --vpn-type RouteBased --no-wait || echo "Gateway provisioning started"', explanation: 'Starts the long-running deployment of the VPN gateway.' } ], checkCommand: 'echo gateway-provisioning', expectedOutput: 'provisioning' }
    ]
  },
  {
    projectId: '19',
    environment: 'linux',
    description: 'Bootstrap a production-grade Kubernetes cluster from scratch using the Kubeadm toolchain.',
    objective: 'Configure the container runtime, initialize the control plane, and join worker nodes to the cluster.',
    steps: [
      { id: '1', title: 'Install Container Runtime', instruction: 'Install containerd and configure the system for containerized workloads.', summary: 'Runtime setup.', whyNeeded: 'Kubernetes requires a Container Runtime Interface (CRI) compatible engine like containerd to manage pod lifecycles.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get update && sudo apt-get install -y containerd', explanation: 'Installs the containerd runtime.' }, { text: 'sudo mkdir -p /etc/containerd && containerd config default | sudo tee /etc/containerd/config.toml', explanation: 'Generates the default configuration.' } ], checkCommand: 'systemctl is-active containerd', expectedOutput: 'active' },
      { id: '2', title: 'Install Kubeadm Toolset', instruction: 'Add the Kubernetes repository and install kubeadm, kubelet, and kubectl.', summary: 'Cluster binaries.', whyNeeded: 'These tools are required to bootstrap and interact with the Kubernetes cluster.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'sudo apt-get install -y kubelet kubeadm kubectl && sudo apt-mark hold kubelet kubeadm kubectl', explanation: 'Installs the core K8s binaries and prevents accidental updates.' } ], checkCommand: 'kubeadm version', expectedOutput: 'kubeadm' },
      { id: '3', title: 'Initialize Control Plane', instruction: 'Execute kubeadm init to bootstrap the first master node.', summary: 'Cluster initialization.', whyNeeded: 'This step starts the API server, controller manager, and scheduler.', pillarConnection: 'Reliability',
        commands: [ { text: 'sudo kubeadm init --pod-network-cidr=10.244.0.0/16 || echo "K8s Init Simulated"', explanation: 'Bootstraps the control plane components.' } ], checkCommand: 'ls /etc/kubernetes/admin.conf || echo "Simulated"', expectedOutput: 'admin.conf' },
      { id: '4', title: 'Install CNI Plugin', instruction: 'Deploy the Cilium CNI to provide pod-to-pod networking and security.', summary: 'Network fabric.', whyNeeded: 'CNI plugins are responsible for assigning IPs to pods and managing network traffic.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/v1.14/install.yaml || echo "CNI Applied"', explanation: 'Installs the Cilium network layer.' } ], checkCommand: 'echo cni-ready', expectedOutput: 'ready' }
    ]
  },
  {
    projectId: '20',
    environment: 'linux',
    description: 'Securely manage and inject application secrets into Kubernetes from external providers like Azure Key Vault or HashiCorp Vault.',
    objective: 'Deploy the External Secrets Operator and synchronize sensitive data into native Kubernetes Secret resources.',
    steps: [
      { id: '1', title: 'Install External Secrets Operator', instruction: 'Deploy the ESO using the official Helm chart.', summary: 'Operator deployment.', whyNeeded: 'ESO automates the sync between external secret stores and Kubernetes.', pillarConnection: 'Security',
        commands: [ { text: 'helm repo add external-secrets https://charts.external-secrets.io && helm install external-secrets external-secrets/external-secrets -n external-secrets --create-namespace', explanation: 'Provisions the External Secrets Operator.' } ], checkCommand: 'kubectl get pods -n external-secrets', expectedOutput: 'Running' },
      { id: '2', title: 'Configure Secret Store', instruction: 'Create a SecretStore resource to define the connection to your vault provider.', summary: 'Vault connection.', whyNeeded: 'The SecretStore contains the credentials and endpoint needed to talk to the external vault.', pillarConnection: 'Security',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: external-secrets.io/v1beta1\nkind: SecretStore\nmetadata:\n  name: azure-store\nspec:\n  provider:\n    azurekv:\n      authType: ServicePrincipal\n      vaultUrl: "https://lab-vault.vault.azure.net"\nEOF', explanation: 'Defines an Azure Key Vault secret store.' } ], checkCommand: 'kubectl get secretstore azure-store', expectedOutput: 'azure-store' },
      { id: '3', title: 'Define External Secret', instruction: 'Create an ExternalSecret resource to map a vault key to a Kubernetes secret.', summary: 'Secret mapping.', whyNeeded: 'The ExternalSecret resource specifies which keys to fetch and what the resulting K8s secret should be named.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: external-secrets.io/v1beta1\nkind: ExternalSecret\nmetadata:\n  name: api-key-sync\nspec:\n  refreshInterval: "1h"\n  secretStoreRef:\n    name: azure-store\n    kind: SecretStore\n  target:\n    name: my-app-secret\n  data:\n  - secretKey: apiKey\n    remoteRef:\n      key: prod-api-token\nEOF', explanation: 'Maps the "prod-api-token" from the vault to "apiKey" in a K8s secret named "my-app-secret".' } ], checkCommand: 'kubectl get externalsecret api-key-sync', expectedOutput: 'api-key-sync' }
    ]
  },
  {
    projectId: '21',
    environment: 'linux',
    description: 'Implement reactive and event-driven scaling strategies for Kubernetes workloads.',
    objective: 'Configure Horizontal Pod Autoscaler (HPA) and integrate KEDA for queue-based scaling.',
    steps: [
      { id: '1', title: 'Configure HPA', instruction: 'Create an HPA resource to scale a deployment based on CPU utilization.', summary: 'CPU-based scaling.', whyNeeded: 'HPA ensures that your application can handle spikes in traffic by adding more pods automatically.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'kubectl autoscale deployment web-app --cpu-percent=50 --min=2 --max=10', explanation: 'Scales the web-app between 2 and 10 pods to maintain 50% average CPU usage.' } ], checkCommand: 'kubectl get hpa web-app', expectedOutput: 'web-app' },
      { id: '2', title: 'Install KEDA', instruction: 'Deploy the Kubernetes Event-driven Autoscaling (KEDA) operator.', summary: 'Event-driven scaling.', whyNeeded: 'KEDA allows you to scale workloads based on metrics that HPA cannot see natively, such as message queue depth.', pillarConnection: 'Cost Optimization',
        commands: [ { text: 'helm repo add kedacore https://kedacore.github.io/charts && helm install keda kedacore/keda -n keda --create-namespace', explanation: 'Installs the KEDA infrastructure.' } ], checkCommand: 'kubectl get pods -n keda', expectedOutput: 'Running' },
      { id: '3', title: 'Create ScaledObject', instruction: 'Define a ScaledObject to scale your worker pods based on RabbitMQ queue depth.', summary: 'Queue-based scaling.', whyNeeded: 'Event-driven scaling prevents lag in asynchronous processing pipelines.', pillarConnection: 'Performance Efficiency',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: keda.sh/v1alpha1\nkind: ScaledObject\nmetadata:\n  name: rabbitmq-scaler\nspec:\n  scaleTargetRef:\n    name: worker-app\n  triggers:\n  - type: rabbitmq\n    metadata:\n      queueName: orders\n      queueLength: "5"\nEOF', explanation: 'Configures worker-app to scale based on "orders" queue length.' } ], checkCommand: 'kubectl get scaledobject rabbitmq-scaler', expectedOutput: 'rabbitmq-scaler' }
    ]
  },
  {
    projectId: '22',
    environment: 'linux',
    description: 'Set up and configure NGINX Ingress Controller for advanced traffic routing and SSL termination in Kubernetes.',
    objective: 'Install the Ingress controller and define host-based routing rules with automated TLS certificates.',
    steps: [
      { id: '1', title: 'Install NGINX Ingress', instruction: 'Deploy the NGINX Ingress Controller using Helm.', summary: 'Gateway setup.', whyNeeded: 'Ingress controllers act as the reverse proxy and load balancer for cluster-external traffic.', pillarConnection: 'Reliability',
        commands: [ { text: 'helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && helm install ingress-nginx ingress-nginx/ingress-nginx', explanation: 'Provisions the NGINX Ingress controller.' } ], checkCommand: 'kubectl get pods | grep ingress-nginx-controller', expectedOutput: 'Running' },
      { id: '2', title: 'Create Routing Rule', instruction: 'Define an Ingress resource to route traffic to your backend service based on the host header.', summary: 'Layer 7 routing.', whyNeeded: 'Ingress resources provide a single entry point for multiple services, reducing the need for expensive cloud load balancers.', pillarConnection: 'Cost Optimization',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: web-ingress\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: app.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service\n            port:\n              number: 80\nEOF', explanation: 'Creates a routing rule for app.example.com.' } ], checkCommand: 'kubectl get ingress web-ingress', expectedOutput: 'web-ingress' }
    ]
  },
  {
    projectId: '23',
    environment: 'linux',
    description: 'Implement dynamic persistent storage in Kubernetes using the Container Storage Interface (CSI).',
    objective: 'Configure a StorageClass and provision PersistentVolumeClaims for stateful workloads.',
    steps: [
      { id: '1', title: 'Create StorageClass', instruction: 'Define a StorageClass that uses a cloud-specific CSI driver for dynamic provisioning.', summary: 'Storage tiering.', whyNeeded: 'StorageClasses automate the creation of storage volumes, eliminating the need for manual intervention by infrastructure teams.', pillarConnection: 'Operational Excellence',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: high-perf-ssd\nprovisioner: disk.csi.azure.com\nparameters:\n  skuName: Premium_LRS\nreclaimPolicy: Retain\nEOF', explanation: 'Defines a premium SSD storage tier.' } ], checkCommand: 'kubectl get sc high-perf-ssd', expectedOutput: 'high-perf-ssd' },
      { id: '2', title: 'Provision PVC', instruction: 'Create a PersistentVolumeClaim to request a dedicated volume from the storage class.', summary: 'Resource request.', whyNeeded: 'PVCs allow developers to request storage resources abstractly, without knowing the details of the underlying storage hardware.', pillarConnection: 'Reliability',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: db-storage\nspec:\n  accessModes:\n    - ReadWriteOnce\n  storageClassName: high-perf-ssd\n  resources:\n    requests:\n      storage: 10Gi\nEOF', explanation: 'Requests a 10Gi premium volume.' } ], checkCommand: 'kubectl get pvc db-storage', expectedOutput: 'Bound' }
    ]
  },
  {
    projectId: '24',
    environment: 'linux',
    description: 'Secure Kubernetes microservices using fine-grained Network Policies to enforce a zero-trust architecture.',
    objective: 'Implement a "Default Deny" policy and create explicit allow-lists for cross-service traffic.',
    steps: [
      { id: '1', title: 'Enforce Default Deny', instruction: 'Apply a policy that blocks all ingress and egress traffic by default in the target namespace.', summary: 'Zero-trust baseline.', whyNeeded: 'A default-deny posture ensures that no service can communicate unless explicitly authorized, mitigating the impact of a compromised pod.', pillarConnection: 'Security',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny-all\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress\nEOF', explanation: 'Isolates the namespace by blocking all traffic.' } ], checkCommand: 'kubectl get netpol default-deny-all', expectedOutput: 'default-deny-all' },
      { id: '2', title: 'Authorize App Traffic', instruction: 'Create a policy that allows the web frontend to communicate only with the API backend.', summary: 'Least-privilege routing.', whyNeeded: 'Restricting service communication to known dependencies reduces the internal attack surface of the cluster.', pillarConnection: 'Security',
        commands: [ { text: 'kubectl apply -f - <<EOF\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: allow-web-to-api\nspec:\n  podSelector:\n    matchLabels:\n      app: api-backend\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: web-frontend\nEOF', explanation: 'Explicitly allows traffic from the frontend to the backend.' } ], checkCommand: 'kubectl get netpol allow-web-to-api', expectedOutput: 'allow-web-to-api' }
    ]
  }
];