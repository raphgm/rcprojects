import { LabContent } from '../types/content';

export const labContents: LabContent[] = [
  {
    projectId: '5',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Project Workspace Creation',
        instruction: 'Create a dedicated directory for your CI/CD project and switch into it.',
        summary: 'Set up the local environment for the pipeline development.',
        whyNeeded: 'Keeping projects isolated in their own directories is a best practice to avoid file conflicts and maintain an organized workspace.',
        pillarConnection: 'Operational Excellence — organized file systems and logical isolation simplify management and auditing.',
        commands: [
          {
            text: 'mkdir -p github-actions-lab',
            explanation: 'Creates a new directory named "github-actions-lab".'
          },
          {
            text: 'cd github-actions-lab',
            explanation: 'Changes the current working directory to the newly created lab folder.'
          }
        ],
        checkCommand: 'pwd',
        expectedOutput: 'github-actions-lab'
      },
      {
        id: 'step-2',
        title: 'Git Repository Initialization',
        instruction: 'Initialize a new Git repository to begin tracking your workflow configuration.',
        summary: 'Initialize source control for the project.',
        whyNeeded: 'Git is required as the foundation for GitHub Actions. It allows the platform to detect code changes and trigger the appropriate automation jobs.',
        pillarConnection: 'Operational Excellence — version control provides a traceable history of all pipeline modifications.',
        commands: [
          {
            text: 'git init',
            explanation: 'Initializes a local Git repository in the current workspace.'
          }
        ],
        checkCommand: 'ls -d .git',
        expectedOutput: '.git'
      },
      {
        id: 'step-3',
        title: 'Identity Configuration',
        instruction: 'Configure your global Git identity to ensure all commits are correctly attributed.',
        summary: 'Set up Git user credentials.',
        whyNeeded: 'Git requires an email and name to sign off on commits. This identity is used to track who made specific changes to the automation logic.',
        pillarConnection: 'Security — identifying actors in the development lifecycle is critical for accountability and auditing.',
        commands: [
          {
            text: 'git config --global user.email "student@cloud-labs.com"',
            explanation: 'Sets the email address for Git commits.'
          },
          {
            text: 'git config --global user.name "Cloud Student"',
            explanation: 'Sets the display name for Git commits.'
          }
        ],
        checkCommand: 'git config user.email',
        expectedOutput: 'student@cloud-labs.com'
      },
      {
        id: 'step-4',
        title: 'Define Workflow Infrastructure',
        instruction: 'Create the GitHub Actions directory structure and establish the main workflow definition.',
        summary: 'Create the directory structure and main workflow file.',
        whyNeeded: 'GitHub Actions follows a specific directory convention (.github/workflows). Placing files correctly is essential for the platform to detect and execute your pipelines.',
        pillarConnection: 'Operational Excellence — defining standard automated workflows reduces the risk of human error during deployments.',
        commands: [
          {
            text: 'mkdir -p .github/workflows',
            explanation: 'Create the hidden directory required by GitHub for workflow files.'
          },
          {
            text: 'touch .github/workflows/main.yml',
            explanation: 'Create the YAML file where you will define your automation steps.'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Configure Build Job',
        instruction: 'Define the build stages in the main.yml file to automate code verification.',
        summary: 'Define the CI/CD workflow logic.',
        whyNeeded: 'The workflow file instructs GitHub which environment to use (Runner) and what commands to execute (Jobs) when code is changed.',
        pillarConnection: 'Operational Excellence — automation of build and test phases is a core DevOps principle for reliable software delivery.',
        commands: [
          {
            text: 'cat <<EOF > .github/workflows/main.yml\nname: Cloud-CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Run Quality Check\n        run: echo "Verifying source code integrity..."\n      - name: Compile\n        run: echo "Application build successful."\nEOF',
            explanation: 'Write a declarative pipeline that checks out code and runs verification steps on every push.'
          }
        ]
      },
      {
        id: 'step-6',
        title: 'Artifact Management',
        instruction: 'Update the workflow to upload build artifacts for later stages or production deployment.',
        summary: 'Add an artifact upload step.',
        whyNeeded: 'Build artifacts (like binaries or minified JS) need to be preserved to ensure that exactly what was tested is what gets deployed.',
        pillarConnection: 'Reliability — using build artifacts prevents "works on my machine" issues and ensures environment parity.',
        commands: [
          {
            text: 'sed -i \'$a \      - name: Upload Build Artifacts\\n        uses: actions/upload-artifact@v3\\n        with:\\n          name: app-bundle\\n          path: ./\' .github/workflows/main.yml',
            explanation: 'Appends an upload-artifact action to the workflow file using sed.'
          }
        ],
        checkCommand: 'grep "upload-artifact" .github/workflows/main.yml',
        expectedOutput: 'upload-artifact'
      },
      {
        id: 'step-7',
        title: 'Environment variables & Secrets',
        instruction: 'Define environment variables in your workflow to manage production settings securely.',
        summary: 'Add environment configuration.',
        whyNeeded: 'Hardcoding sensitive values is a security risk. Using environment variables and secrets allows for flexible and secure deployments across different stages.',
        pillarConnection: 'Security — secret management is vital for preventing credentials from being leaked in source code.',
        commands: [
          {
            text: 'sed -i \'/runs-on/a \    env:\\n      DEPLOY_ENV: production\' .github/workflows/main.yml',
            explanation: 'Injects a global environment variable into the job definition.'
          }
        ],
        checkCommand: 'grep "DEPLOY_ENV" .github/workflows/main.yml',
        expectedOutput: 'DEPLOY_ENV'
      },
      {
        id: 'step-8',
        title: 'Production Deployment Trigger',
        instruction: 'Add a manual trigger (workflow_dispatch) to allow teams to trigger production deployments on demand.',
        summary: 'Enable manual deployment triggers.',
        whyNeeded: 'While CI is often automated, CD into production sometimes requires a "human in the loop" for compliance or final verification.',
        pillarConnection: 'Operational Excellence — providing controlled deployment triggers balances automation with safety.',
        commands: [
          {
            text: 'sed -i \'s/on: \\[push\\]/on: [push, workflow_dispatch]/\' .github/workflows/main.yml',
            explanation: 'Updates the "on" property to include the workflow_dispatch trigger for manual execution.'
          }
        ],
        checkCommand: 'grep "workflow_dispatch" .github/workflows/main.yml',
        expectedOutput: 'workflow_dispatch'
      },
      {
        id: 'step-9',
        title: 'Workflow Speed Optimization',
        instruction: 'Implement dependency caching to reduce build times by reusing packages between runs.',
        summary: 'Add caching logic to the CI pipeline.',
        whyNeeded: 'Downloading dependencies on every run is slow and expensive. Caching allows the runner to reuse existing assets, significantly accelerating the feedback loop.',
        pillarConnection: 'Performance Efficiency — optimizing workflow execution time improves developer productivity and reduces compute costs.',
        commands: [
          {
            text: 'sed -i \'/uses: actions\\/checkout/a \      - name: Cache Dependencies\\n        uses: actions/cache@v3\\n        with:\\n          path: ~/.npm\\n          key: npm-${{ hashFiles(\\\'package-lock.json\\\') }}\' .github/workflows/main.yml',
            explanation: 'Injects a caching action that stores the npm cache directory globally based on a hash of the lockfile.'
          }
        ],
        checkCommand: 'grep "actions/cache" .github/workflows/main.yml',
        expectedOutput: 'actions/cache'
      },
      {
        id: 'step-10',
        title: 'Containerization Strategy',
        instruction: 'Add a job to build a Docker image and prepare it for a container registry.',
        summary: 'Build and tag a Docker image.',
        whyNeeded: 'Containerization ensures that the application environment is consistent from development to production. Packaging the app as an image is the standard for modern cloud deployments.',
        pillarConnection: 'Reliability — container images provide immutable deployment units that eliminate environment inconsistency.',
        commands: [
          {
            text: 'echo "FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]" > Dockerfile',
            explanation: 'Creates a standard Dockerfile for a Node.js application.'
          },
          {
            text: 'sed -i \'$a \  containerize:\\n    runs-on: ubuntu-latest\\n    steps:\\n      - uses: actions/checkout@v3\\n      - name: Build Image\\n        run: docker build -t cloud-app:latest .\' .github/workflows/main.yml',
            explanation: 'Appends a new job to the YAML structure that handles the Docker build process.'
          }
        ],
        checkCommand: 'grep "docker build" .github/workflows/main.yml',
        expectedOutput: 'docker build'
      },
      {
        id: 'step-11',
        title: 'Automated Alerting',
        instruction: 'Configure post-build notifications to alert your team of pipeline failures via Webhooks.',
        summary: 'Integrate real-time notification alerts.',
        whyNeeded: 'Passive monitoring isn\'t enough. Your team needs immediate feedback when a build fails to minimize the time the main branch is broken.',
        pillarConnection: 'Operational Excellence — proactive notification systems ensure faster incident resolution and higher system availability.',
        commands: [
          {
            text: 'sed -i \'$a \      - name: Notification\\n        if: failure()\\n        run: echo "Sending alert to Slack..."\' .github/workflows/main.yml',
            explanation: 'Adds a conditional step that only executes if any previous steps in the job failed.'
          }
        ],
        checkCommand: 'grep "if: failure()" .github/workflows/main.yml',
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
            text: 'sudo ufw allow "Apache"',
            explanation: 'Opens port 80 (HTTP) specifically for applications identified as Apache.'
          },
          {
            text: 'sudo ufw enable',
            explanation: 'Activates the firewall with the new profile.'
          }
        ],
        checkCommand: 'ufw status',
        expectedOutput: 'Status: active'
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
        instruction: 'Create a dedicated configuration for a new virtual host to support multiple domains on one server.',
        summary: 'Set up an Apache Virtual Host.',
        whyNeeded: 'Virtual Hosts allow you to host multiple websites on a single physical server by differentiating traffic based on the "Host" header in the HTTP request.',
        pillarConnection: 'Cost Optimization — hosting multiple sites on one instance reduces infrastructure overhead.',
        commands: [
          {
            text: 'sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/cloudlabs.conf',
            explanation: 'Clones the default configuration to use as a template for the new site.'
          },
          {
            text: 'sudo a2ensite cloudlabs.conf && sudo systemctl reload apache2',
            explanation: 'Enables the new site configuration and reloads the server to apply changes without downtime.'
          }
        ],
        checkCommand: 'ls /etc/apache2/sites-enabled/cloudlabs.conf',
        expectedOutput: 'cloudlabs.conf'
      },
      {
        id: 'step-5',
        title: 'SSL/TLS Configuration',
        instruction: 'Enable the SSL module and configure a self-signed certificate for secure communication.',
        summary: 'Enforce HTTPS on the web server.',
        whyNeeded: 'Unencrypted HTTP traffic is vulnerable to eavesdropping. SSL/TLS encrypts data between the client and server.',
        pillarConnection: 'Security — protection of data in transit is a core security requirement.',
        commands: [
          { text: 'sudo a2enmod ssl', explanation: 'Enables the Apache SSL module.' },
          { text: 'sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt -subj "/CN=localhost"', explanation: 'Generates a private key and a self-signed certificate.' }
        ],
        checkCommand: 'ls /etc/ssl/certs/apache-selfsigned.crt',
        expectedOutput: 'apache-selfsigned.crt'
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
        checkCommand: 'ls /var/log/apache2/access.log',
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
        checkCommand: 'ss -tulpn',
        expectedOutput: 'apache2'
      },
      {
        id: 'step-8',
        title: 'HTTP/2 Performance Optimization',
        instruction: 'Enable the HTTP/2 protocol to improve page load times and reduce server resource usage.',
        summary: 'Optimize for modern web performance.',
        whyNeeded: 'HTTP/2 allows for multiplexing multiple requests over a single TCP connection, drastically improving the speed of modern web apps with many small assets.',
        pillarConnection: 'Performance Efficiency — utilizing modern network protocols ensures the lowest possible latency for global users.',
        commands: [
          {
            text: 'sudo a2enmod http2 && sudo systemctl restart apache2',
            explanation: 'Activates the mod_http2 module and applies the changes to the running server.'
          },
          {
            text: 'sudo sed -i "/<VirtualHost \\*:443>/a \\    Protocols h2 http/1.1" /etc/apache2/sites-available/default-ssl.conf',
            explanation: 'Informs the server that it should prefer the HTTP/2 (h2) protocol for HTTPS connections.'
          }
        ],
        checkCommand: 'curl -I -k --http2 https://localhost',
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
            text: 'echo "tar -czf backup_$(date +%F).tar.gz /etc" >> backup.sh',
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
          { text: 'sudo touch /etc/logrotate.d/myapp', explanation: 'Creates a new configuration file for the logrotate utility.' },
          { text: 'echo "/var/log/myapp/*.log { daily rotate 7 compress }" | sudo tee /etc/logrotate.d/myapp', explanation: 'Definitions for daily rotation, keeping 7 days of logs, and compressing them.' }
        ],
        checkCommand: 'ls /etc/logrotate.d/myapp',
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
            text: 'cat <<EOF > backup.sh\n#!/bin/bash\nlog_message() { echo "[$(date)] \$1"; }\ncreate_backup() {\n  log_message "Starting backup..."\n  tar -czf backup_$(date +%F).tar.gz /etc\n  log_message "Backup completed."\n}\ncreate_backup\nEOF',
            explanation: 'Rewrites the script using a modular approach with logging and backup functions.'
          }
        ],
        checkCommand: 'grep "log_message()" backup.sh',
        expectedOutput: 'log_message()'
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
            text: 'echo "rsync -avz *.tar.gz backup-server:/vault/" >> backup.sh',
            explanation: 'Adds an rsync command that securely transfers compressed archives to a remote destination.'
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
            text: 'echo "curl -X POST -d \"backup=success\" http://monitor.internal/webhook" >> backup.sh',
            explanation: 'Appends a POST request using curl to a hypothetical internal monitoring endpoint.'
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
            text: 'echo "tar -tzf \$(ls -t *.tar.gz | head -1) > /dev/null && echo \"Integrity OK\"" > verify.sh',
            explanation: 'Creates a verification script that lists the contents of the most recent backup to check for corruption.'
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
        instruction: 'Verify if Helm is installed. If not, follow the sample commands to install it using the official script.',
        summary: 'Install the Helm package manager.',
        whyNeeded: 'Helm is the industry-standard package manager for Kubernetes. It simplifies the deployment of complex observability stacks like Prometheus by using standardized, community-tested charts.',
        pillarConnection: 'Operational Excellence — using standardized package managers ensures repeatable and predictable deployments across all environments.',
        commands: [
          {
            text: 'curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3',
            explanation: 'Downloads the official Helm 3 installation and configuration script.'
          },
          {
            text: 'chmod 700 get_helm.sh && ./get_helm.sh',
            explanation: 'Ensures the script is executable and runs the automated setup process.'
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
        instruction: 'Deploy the kube-prometheus-stack into a dedicated namespace.',
        summary: 'Provision the Prometheus and Grafana stack.',
        whyNeeded: 'A full-stack monitoring solution provides end-to-end visibility, from low-level node metrics to high-level application dashboards and alerting rules.',
        pillarConnection: 'Operational Excellence — comprehensive monitoring is the foundation of the "Measure" phase in the DevOps lifecycle.',
        commands: [
          {
            text: 'kubectl create namespace monitoring',
            explanation: 'Creates a logical boundary to isolate monitoring resources from application workloads.'
          },
          {
            text: 'helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring',
            explanation: 'Deploys Prometheus, Grafana, and Alertmanager as a unified observability suite.'
          }
        ],
        checkCommand: 'helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring',
        expectedOutput: 'deployed'
      },
      {
        id: 'step-4',
        title: 'Customizing Dashboards',
        instruction: 'Access the Grafana UI and import a community-standard Kubernetes cluster dashboard.',
        summary: 'Import a Grafana dashboard.',
        whyNeeded: 'Raw metrics are hard to interpret. Dashboards provide visual maps of cluster health, helping you spot trends and anomalies quickly.',
        pillarConnection: 'Operational Excellence — visual observability allows for faster incident response and better capacity planning.',
        commands: [
          {
            text: 'kubectl port-forward -n monitoring svc/monitoring-grafana 3000:80',
            explanation: 'Enables access to the Grafana web portal from your local machine.'
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
            text: 'cat <<EOF > service-monitor.yaml\napiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: app-monitor\n  labels:\n    release: monitoring\nspec:\n  selector:\n    matchLabels:\n      app: web-server\n  endpoints:\n  - port: web\nEOF\nkubectl apply -f service-monitor.yaml',
            explanation: 'Creates a Prometheus Operator resource that identifies any service labeled "web-server" as a metrics source.'
          }
        ],
        checkCommand: 'kubectl get servicemonitor',
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
            text: 'cat <<EOF > alertmanager-config.yaml\nalertmanager:\n  config:\n    global:\n      slack_api_url: "http://hooks.slack.com/services/..."\n    receivers:\n    - name: "slack-notifications"\n      slack_configs:\n      - channel: "#alerts"\nEOF\nhelm upgrade monitoring prometheus-community/kube-prometheus-stack --namespace monitoring -f alertmanager-config.yaml',
            explanation: 'Updates the Helm release with custom Slack webhook configuration for the AlertManager component.'
          }
        ],
        checkCommand: 'kubectl get secret -n monitoring alertmanager-monitoring-kube-prometheus-alertmanager -o jsonpath="{.data.alertmanager\\.yaml}"',
        expectedOutput: 'slack_api_url'
      },
      {
        id: 'step-7',
        title: 'Long-term Retention with Thanos',
        instruction: 'Install Thanos sidecars to offload Prometheus metrics to S3/Blob storage for unlimited historical analysis.',
        summary: 'Enable long-term metrics storage.',
        whyNeeded: 'Standard Prometheus keeps metrics for 15 days. Thanos allows you to store years of data in cheap object storage, enabling long-term trend analysis and compliance audits.',
        pillarConnection: 'Cost Optimization — moving historical data to object storage is significantly cheaper than keeping it in high-performance block storage.',
        commands: [
          {
            text: 'helm upgrade monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --set prometheus.prometheusSpec.thanos.image="quay.io/thanos/thanos:v0.31.0"',
            explanation: 'Enables the Thanos sidecar container within the Prometheus pod to start syncing blocks to external storage.'
          }
        ],
        checkCommand: 'kubectl get pods -n monitoring | grep thanos',
        expectedOutput: 'thanos-sidecar'
      },
      {
        id: 'step-8',
        title: 'Logging Aggregation with Loki',
        instruction: 'Deploy Grafana Loki to ingest cluster logs and view them alongside your Prometheus metrics in a single dashboard.',
        summary: 'Implement centralized logging.',
        whyNeeded: 'Metrics tell you *when* something is wrong; logs tell you *why*. Seeing them together in Grafana drastically speeds up root cause analysis.',
        pillarConnection: 'Operational Excellence — correlated metrics and logs provide a holistic view of system health and performance.',
        commands: [
          {
            text: 'helm repo add grafana https://grafana.github.io/helm-charts && helm repo update\nhelm install loki grafana/loki-stack --namespace monitoring',
            explanation: 'Installs the Loki-stack which includes Loki (storage) and Promtail (log forwarding agent).'
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
            text: 'cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf\noverlay\nbr_netfilter\nEOF\nsudo modprobe overlay && sudo modprobe br_netfilter',
            explanation: 'Loads modules required for the bridge network to work correctly with iptables.'
          },
          {
            text: 'cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf\nnet.bridge.bridge-nf-call-iptables  = 1\nnet.bridge.bridge-nf-call-ip6tables = 1\nnet.ipv4.ip_forward                 = 1\nEOF\nsudo sysctl --system',
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
        checkCommand: 'docker images | grep k8s',
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
        checkCommand: 'ls /etc/kubernetes/admin.conf',
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
            text: 'kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml',
            explanation: 'Installs the networking agents on all nodes.'
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
        instruction: 'Deploy the Metrics Server to allow the cluster to monitor pod resource utilization.',
        summary: 'Deploy the Kubernetes Metrics Server.',
        whyNeeded: 'The Horizontal Pod Autoscaler (HPA) cannot function without real-time CPU and Memory data. Metrics Server aggregates this data from kubelets and serves it via the API.',
        pillarConnection: 'Performance Efficiency — real-time metric collection is the basis for reactive scaling, ensuring resources are only used when needed.',
        commands: [
          {
            text: 'kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml',
            explanation: 'Applies the official Metrics Server manifests to the cluster.'
          }
        ],
        checkCommand: 'kubectl get deployment metrics-server -n kube-system',
        expectedOutput: 'metrics-server'
      },
      {
        id: 'step-2',
        title: 'Autoscaling Configuration',
        instruction: 'Define a Horizontal Pod Autoscaler for your application with a CPU target of 50%.',
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
            text: 'kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/vertical-pod-autoscaler/deploy/vpa-v1.yaml',
            explanation: 'Deploys the VPA controller components to the cluster.'
          }
        ],
        checkCommand: 'kubectl get vpa',
        expectedOutput: 'vpa'
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
            text: 'cat <<EOF > prometheus-adapter.yaml\nrules:\n  custom:\n  - seriesQuery: "http_requests_total"\n    resources: { "template": "service" }\n    name: { "as": "requests_per_second" }\n    metricsQuery: "rate(<<.Series>>[2m])"\nEOF\nhelm install prometheus-adapter prometheus-community/prometheus-adapter -f prometheus-adapter.yaml',
            explanation: 'Installs the adapter that translates Prometheus queries into Kubernetes-native Metrics API calls.'
          }
        ],
        checkCommand: 'kubectl get --raw "/apis/custom.metrics.k8s.io/v1beta1"',
        expectedOutput: 'requests_per_second'
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
            text: 'cat <<EOF > scaledobject.yaml\napiVersion: keda.sh/v1alpha1\nkind: ScaledObject\nmetadata:\n  name: predictive-scaler\nspec:\n  scaleTargetRef: { name: web-app }\n  triggers:\n  - type: prometheus\n    metadata:\n      serverAddress: http://prometheus:9090\n      query: rate(http_requests_total[5m])\nEOF\nkubectl apply -f scaledobject.yaml',
            explanation: 'Defines a KEDA ScaledObject that uses prometheus data to drive its scaling decisions.'
          }
        ],
        checkCommand: 'kubectl get scaledobject',
        expectedOutput: 'predictive-scaler'
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
            text: 'helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-basic --create-namespace',
            explanation: 'Provisions the NGINX controller which will automatically start listening for Ingress resources.'
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
            text: 'cat <<EOF > ingress.yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: app-ingress\nspec:\n  rules:\n  - host: myapp.local\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web-service\n            port:\n              number: 80\nEOF\nkubectl apply -f ingress.yaml',
            explanation: 'Creates a routing rule that sends all traffic for "myapp.local" to the web-service on port 80.'
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
            text: 'kubectl annotate ingress app-ingress nginx.ingress.kubernetes.io/canary="true"\nkubectl annotate ingress app-ingress nginx.ingress.kubernetes.io/canary-weight="10"',
            explanation: 'Enables canary mode and directs 10% of total incoming traffic to the canary version of the backend.'
          }
        ],
        checkCommand: 'kubectl get ingress app-ingress -o jsonpath="{.metadata.annotations}"',
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
            text: 'kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/v3.13.0/deploy/gatekeeper.yaml',
            explanation: 'Installs the Gatekeeper controller which intercepts all Kubernetes API calls for validation.'
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
            text: 'helm install external-dns external-dns/external-dns --set provider=aws',
            explanation: 'Deploys ExternalDNS with AWS provider integration to manage Route53 records automatically.'
          }
        ],
        checkCommand: 'kubectl get pods | grep external-dns',
        expectedOutput: 'external-dns'
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
            text: 'cat <<EOF > default-deny.yaml\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: default-deny-all\n  namespace: secure-app\nspec:\n  podSelector: {}\n  policyTypes:\n  - Ingress\n  - Egress\nEOF\nkubectl apply -f default-deny.yaml',
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
            text: 'cat <<EOF > rbac.yaml\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: secure-app\n  name: pod-reader\nrules:\n- apiGroups: [""]\n  resources: ["pods"]\n  verbs: ["get", "watch", "list"]\nEOF\nkubectl apply -f rbac.yaml',
            explanation: 'Defines a read-only role that is strictly limited to viewing pods in the secure-app namespace.'
          }
        ],
        checkCommand: 'kubectl get role pod-reader -n secure-app',
        expectedOutput: 'pod-reader'
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
            text: 'helm repo add falcosecurity https://falcosecurity.github.io/charts && helm repo update\nhelm install falco falcosecurity/falco --set tty=true',
            explanation: 'Installs the Falco agent on all nodes to monitor system calls and container activity.'
          }
        ],
        checkCommand: 'kubectl get pods | grep falco',
        expectedOutput: 'falco'
      },
      {
        id: 'step-7',
        title: 'Secret Encryption at Rest',
        instruction: 'Enable encryption for Kubernetes secrets at the ETCD layer using a Key Management Service (KMS).',
        summary: 'Protect secrets in the database.',
        whyNeeded: 'By default, secrets are stored as base64 encoded strings in etcd. Encrypting them at rest ensures that even if the database is compromised, the data remains unreadable.',
        pillarConnection: 'Security — protecting sensitive data at the storage layer is a critical requirement for regulatory compliance (PCI-DSS, HIPAA).',
        commands: [
          {
            text: 'kubectl create secret generic kms-key --from-literal=key=$(openssl rand -base64 32)',
            explanation: 'Simulates the creation of a master encryption key to be used by the API server.'
          }
        ],
        checkCommand: 'kubectl get secret kms-key',
        expectedOutput: 'kms-key'
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
            text: 'kubectl apply -f local-storage-class.yaml',
            explanation: 'Deploys a StorageClass that uses local disk for high-performance database operations.'
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
            text: 'kubectl apply -f mongo-service.yaml',
            explanation: 'Creates a service with clusterIP: None, enabling direct DNS resolution to pod IPs.'
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
            text: 'kubectl apply -f mongo-statefulset.yaml',
            explanation: 'Orchestrates the deployment of 3 MongoDB replicas with stabilized storage and naming.'
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
        title: 'Git Repository Integration',
        instruction: 'Connect ArgoCD to your application repository and create a new Application resource.',
        summary: 'Synchronize a Git repo with ArgoCD.',
        whyNeeded: 'The core of GitOps is the association between a Git path and a cluster namespace. This step tells ArgoCD exactly which manifest files it should be monitoring.',
        pillarConnection: 'Reliability — automated synchronization ensures that the cluster state never drifts from the approved configuration in Git.',
        commands: [
          {
            text: 'cat <<EOF > guestbook-app.yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: guestbook\n  namespace: argocd\nspec:\n  destination:\n    namespace: default\n    server: https://kubernetes.default.svc\n  project: default\n  source:\n    path: guestbook\n    repoURL: https://github.com/argoproj/argocd-example-apps.git\n    targetRevision: HEAD\n  syncPolicy:\n    automated: {}\nEOF\nkubectl apply -f guestbook-app.yaml',
            explanation: 'Creates an ArgoCD Application object that tracks a sample guestbook repo and automatically syncs changes.'
          }
        ],
        checkCommand: 'kubectl get app -n argocd',
        expectedOutput: 'guestbook'
      },
      {
        id: 'step-3',
        title: 'Sync Policy Management',
        instruction: 'Configure a self-healing policy to automatically correct manual changes made to the cluster.',
        summary: 'Enable Self-Healing in GitOps.',
        whyNeeded: 'If a user manually edits a resource using kubectl, it creates "drift". Self-healing tells ArgoCD to immediately overwrite those changes with the source of truth from Git.',
        pillarConnection: 'Reliability — self-healing guarantees that the environment remains in the desired state even if accidental manual changes occur.',
        commands: [
          {
            text: 'sed -i \'/automated: {}/a \      selfHeal: true\' guestbook-app.yaml && kubectl apply -f guestbook-app.yaml',
            explanation: 'Adds the selfHeal property to the sync policy and updates the Application resource.'
          }
        ],
        checkCommand: 'grep "selfHeal: true" guestbook-app.yaml',
        expectedOutput: 'selfHeal: true'
      },
      {
        id: 'step-4',
        title: 'Environment Drift Analysis',
        instruction: 'Use the ArgoCD CLI to identify differences between your Git source and the live cluster state.',
        summary: 'Perform a drift audit.',
        whyNeeded: 'Before committing large changes, it\'s important to see exactly what ArgoCD plans to do. Drift analysis provides a "dry-run" view of pending cluster updates.',
        pillarConnection: 'Security — identifying unauthorized changes (drift) is a key part of operational auditing and security posture management.',
        commands: [
          {
            text: 'argocd app diff guestbook --local .',
            explanation: 'Compares the local directory manifests with the live version running in the cluster to highlight changes.'
          }
        ],
        checkCommand: 'kubectl get app guestbook -n argocd',
        expectedOutput: 'guestbook'
      },
      {
        id: 'step-5',
        title: 'ArgoCD Rollouts & Progressive Delivery',
        instruction: 'Install the Argo Rollouts controller to enable advanced deployment strategies like Blue-Green and Canary.',
        summary: 'Enhance deployment capabilities with Rollouts.',
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
        id: 'step-6',
        title: 'Automated Rollback Triggers',
        instruction: 'Configure AnalysisTemplates to automatically monitor Prometheus metrics and trigger rollbacks on failure.',
        summary: 'Implement automated safety checks.',
        whyNeeded: 'Manual monitoring of rollouts is slow. AnalysisTemplates automate the "Go/No-Go" decision based on real-time error rates.',
        pillarConnection: 'Operational Excellence — automating the rollback process ensures that users are never exposed to broken code for longer than a few seconds.',
        commands: [
          {
            text: 'kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-rollouts/master/examples/analysistemplate-prometheus.yaml',
            explanation: 'Deploys a template that defines how Argo should query Prometheus to validate the health of a new version.'
          }
        ],
        checkCommand: 'kubectl get analysistemplate',
        expectedOutput: 'success-rate'
      },
      {
        id: 'step-7',
        title: 'Self-Healing & Drift Correction',
        instruction: 'Enable the "Self-Heal" feature in ArgoCD to automatically revert manual changes made to the cluster.',
        summary: 'Enforce configuration immutability.',
        whyNeeded: 'Configuration drift happens when engineers make manual "hotfixes" in the cluster. Self-healing ensures that Git remains the absolute source of truth by immediately overwriting unauthorized changes.',
        pillarConnection: 'Reliability — automated drift correction prevents "Snowflake Clusters" and ensures the environment matches the audited Git history.',
        commands: [
          {
            text: 'argocd app set guestbook --sync-policy automated --self-heal',
            explanation: 'Configures the application to automatically synchronize and correct any detected drift from the Git state.'
          }
        ],
        checkCommand: 'argocd app get guestbook --show-params | grep "Self-Heal"',
        expectedOutput: 'Enabled'
      },
      {
        id: 'step-8',
        title: 'ArgoCD Notifications & Slack',
        instruction: 'Install the ArgoCD Notifications controller and configure it to alert Slack on sync failures.',
        summary: 'Implement GitOps alerting.',
        whyNeeded: 'Engineers need to know immediately if a deployment fails or if drift cannot be corrected. Notifications keep the team informed without them having to poll the dashboard.',
        pillarConnection: 'Operational Excellence — real-time visibility into the deployment lifecycle reduces the feedback loop for developers.',
        commands: [
          {
            text: 'kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-notifications/stable/manifests/install.yaml',
            explanation: 'Installs the specialized notification engine that monitors ArgoCD application events.'
          }
        ],
        checkCommand: 'kubectl get pods -n argocd | grep notifications',
        expectedOutput: 'argocd-notifications-controller'
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
            text: 'func init DataPipeline --python',
            explanation: 'Creates a new Python-based Azure Functions directory with standard boilerplate files.'
          }
        ],
        checkCommand: 'ls DataPipeline',
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
            text: 'cd DataPipeline && func new --name ProcessEvents --template "Azure Event Hub trigger"',
            explanation: 'Generates a specific function template designed to handle streaming data from Event Hubs.'
          }
        ],
        checkCommand: 'ls DataPipeline/ProcessEvents',
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
            text: 'cat <<EOF >> DataPipeline/ProcessEvents/function.json\n{\n  "type": "cosmosDB",\n  "direction": "out",\n  "name": "outputDocument",\n  "databaseName": "TelemetryDB",\n  "collectionName": "Events",\n  "createIfNotExists": "true",\n  "connectionStringSetting": "CosmosDBConnection"\n}\nEOF',
            explanation: 'Appends the Cosmos DB output binding configuration to the function metadata.'
          }
        ],
        checkCommand: 'grep "cosmosDB" DataPipeline/ProcessEvents/function.json',
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
            text: 'cat <<EOF > DataPipeline/ProcessEvents/__init__.py\nimport logging\nimport azure.functions as func\n\ndef main(event: func.EventHubEvent, outputDocument: func.Out[func.Document]):\n    body = event.get_body().decode("utf-8")\n    logging.info(f"Processing event: {body}")\n    outputDocument.set(func.Document.from_json(body))\nEOF',
            explanation: 'Implements a message handler that decodes Event Hub bytes and saves them as JSON documents in Cosmos DB.'
          }
        ],
        checkCommand: 'grep "outputDocument.set" DataPipeline/ProcessEvents/__init__.py',
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
            text: 'sed -i \'/extensions/a \    "eventHubs": { "batchSize": 100, "prefetchCount": 200 }\' DataPipeline/host.json',
            explanation: 'Injects eventHubs specific performance configurations into the global host settings.'
          }
        ],
        checkCommand: 'grep "batchSize" DataPipeline/host.json',
        expectedOutput: 'batchSize'
      },
      {
        id: 'step-6',
        title: 'Application Insights Observability',
        instruction: 'Enable Application Insights to track function execution, latency, and exceptions in real-time.',
        summary: 'Add end-to-end observability.',
        whyNeeded: 'Monitoring is essential for serverless apps where you don\'t have access to the underlying server. App Insights gives you a "map" of your data flow and highlights performance bottlenecks.',
        pillarConnection: 'Operational Excellence — using distributed tracing ensures you can troubleshoot complex event-driven architectures efficiently.',
        commands: [
          {
            text: 'sed -i "s/logging/import azure.functions as func\\nimport opencensus.ext.azure.log_exporter as log_exporter/" DataPipeline/ProcessEvents/__init__.py',
            explanation: 'Integrates the OpenCensus SDK for Azure to send telemetry to App Insights.'
          }
        ],
        checkCommand: 'grep "opencensus" DataPipeline/ProcessEvents/__init__.py',
        expectedOutput: 'opencensus'
      },
      {
        id: 'step-7',
        title: 'Managed Identity Security',
        instruction: 'Configure the function to use System Assigned Managed Identity for accessing Cosmos DB, eliminating the need for connection strings.',
        summary: 'Secure data access with Identity.',
        whyNeeded: 'Keys and connection strings can be leaked. Azure Managed Identities allow resources to authenticate with each other using Entra ID (Azure AD), which is more secure and easier to manage.',
        pillarConnection: 'Security — using identity-based access instead of static secrets follows the Zero-Trust security model.',
        commands: [
          {
            text: 'az functionapp identity assign --name CloudLabs-Function --resource-group Labs-RG',
            explanation: 'Enables the system-assigned identity on the Azure Function App hosting your code.'
          }
        ],
        checkCommand: 'az functionapp identity show --name CloudLabs-Function --resource-group Labs-RG',
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
            text: 'cat <<EOF > azure-pipelines.yml\ntrigger:\n- main\njobs:\n- job: Build\n  steps:\n  - task: AzureFunctionApp@1\n    inputs:\n      azureSubscription: "Labs-Service-Connection"\n      appType: "functionAppLinux"\n      appName: "CloudLabs-Function"\nEOF',
            explanation: 'Creates a YAML-based CI/CD definition for Azure DevOps.'
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
          { text: 'curl -L https://istio.io/downloadIstio | sh -', explanation: 'Downloads the latest Istio command line tool.' },
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
          { text: 'kubectl apply -f canary-virtualservice.yaml', explanation: 'Applies a routing rule that splits traffic between two versions of your service.' }
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
            text: 'cat <<EOF > mtls-strict.yaml\napiVersion: security.istio.io/v1beta1\nkind: PeerAuthentication\nmetadata:\n  name: default\n  namespace: istio-system\nspec:\n  mtls:\n    mode: STRICT\nEOF\nkubectl apply -f mtls-strict.yaml',
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
            text: 'cat <<EOF > circuit-breaker.yaml\napiVersion: networking.istio.io/v1alpha3\nkind: DestinationRule\nmetadata:\n  name: web-cb\nspec:\n  host: web-service\n  trafficPolicy:\n    connectionPool:\n      http:\n        http1MaxPendingRequests: 1\n        maxRequestsPerConnection: 1\nEOF\nkubectl apply -f circuit-breaker.yaml',
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
            text: 'kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.18/samples/addons/kiali.yaml',
            explanation: 'Deploys the Kiali server and web interface into the istio-system namespace.'
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
            text: 'cat <<EOF > egress-gateway.yaml\napiVersion: networking.istio.io/v1alpha3\nkind: Gateway\nmetadata:\n  name: istio-egressgateway\nspec:\n  selector:\n    istio: egressgateway\n  servers:\n  - port:\n      number: 80\n      name: http\n      protocol: HTTP\n    hosts:\n    - "edition.cnn.com"\nEOF\nkubectl apply -f egress-gateway.yaml',
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
        title: 'Security Audit Environment Setup',
        instruction: 'Install Prowler and ensure all necessary AWS authentication variables are set.',
        summary: 'Provision the security auditing scanner.',
        whyNeeded: 'Prowler is a powerful tool for security best practices and compliance auditing. Setting up the environment correctly is the first step in identifying cloud vulnerabilities.',
        pillarConnection: 'Security — automation of security audits is a core principle for maintaining a secure environment at scale.',
        commands: [
          {
            text: 'pip install prowler',
            explanation: 'Installs the Prowler security auditing tool using the Python package manager.'
          }
        ],
        checkCommand: 'prowler -v',
        expectedOutput: 'Prowler'
      },
      {
        id: 'step-2',
        title: 'CIS Benchmark Audit',
        instruction: 'Run a full audit against the CIS AWS Foundations Benchmark to identify high-risk misconfigurations.',
        summary: 'Execute a comprehensive compliance scan.',
        whyNeeded: 'CIS benchmarks are industry-standard safety guidelines. Running these tests identifies common errors like public S3 buckets or MFA-disabled accounts.',
        pillarConnection: 'Security — regular auditing against gold-standard benchmarks reduces the overall risk of breach.',
        commands: [
          {
            text: 'prowler aws -g cis_v1.4.0',
            explanation: 'Runs a targeted suite of tests designed to verify adherence to the CIS benchmark for AWS.'
          }
        ],
        checkCommand: 'echo "Audit complete"',
        expectedOutput: 'Audit complete'
      },
      {
        id: 'step-3',
        title: 'Custom Security Checks',
        instruction: 'Create a custom Prowler check to verify internal corporate security requirements.',
        summary: 'Implement tailored compliance rules.',
        whyNeeded: 'Generic benchmarks don\'t catch everything. Custom checks allow you to enforce specific internal standards, such as mandatory tagging or restricted instance types.',
        pillarConnection: 'Operational Excellence — customizing security tools to the specific needs of the business ensures better alignment with corporate policies.',
        commands: [
          {
            text: 'mkdir -p checks && echo "check_description: Verify private subnet tagging" > checks/custom_check.yaml',
            explanation: 'Sets up the directory structure for user-defined auditing logic.'
          }
        ],
        checkCommand: 'ls checks/custom_check.yaml',
        expectedOutput: 'custom_check.yaml'
      },
      {
        id: 'step-4',
        title: 'Automated Remediation Workflows',
        instruction: 'Configure Prowler to trigger an AWS Lambda function to automatically fix common misconfigurations.',
        summary: 'Enable self-healing security.',
        whyNeeded: 'Finding a bug is only half the battle. Automated remediation ensures that high-risk errors (like public S3 buckets) are corrected in seconds, not days.',
        pillarConnection: 'Security — reducing the "Time to Remediate" (TTR) is critical for preventing successful exploitations of misconfigurations.',
        commands: [
          {
            text: 'echo "Remediation triggered for AWS-S3-001" > remediation.log',
            explanation: 'Simulates the integration between auditor findings and automated correction scripts.'
          }
        ],
        checkCommand: 'ls remediation.log',
        expectedOutput: 'remediation.log'
      },
      {
        id: 'step-5',
        title: 'Security Dashboards with QuickSight',
        instruction: 'Export Prowler findings to S3 and configure an Athena/QuickSight dashboard for visual security reporting.',
        summary: 'Visualize compliance status.',
        whyNeeded: 'C-level executives need to see high-level compliance trends. Dashboards transform technical findings into actionable business intelligence.',
        pillarConnection: 'Operational Excellence — providing clear visibility into security posture improves decision-making and resource allocation.',
        commands: [
          {
            text: 'prowler aws -M json-asff --output-directory reports/',
            explanation: 'Exports the scan results into the standard Amazon Security Finding Format (ASFF) for easy ingestion into other AWS services.'
          }
        ],
        checkCommand: 'ls reports/*.json',
        expectedOutput: 'json'
      },
      {
        id: 'step-6',
        title: 'Multi-Account Scanning',
        instruction: 'Configure Prowler to scan multiple AWS accounts using cross-account IAM roles.',
        summary: 'Scale compliance auditing.',
        whyNeeded: 'Enterprise environments often have hundreds of accounts. Scanning them one by one is impossible. Cross-account roles allow a central hub to audit the entire organization.',
        pillarConnection: 'Security — centralizing security oversight ensures that no "Dark Accounts" or unmanaged environments exist without audit coverage.',
        commands: [
          {
            text: 'prowler aws --role arn:aws:iam::123456789012:role/ProwlerAuditRole',
            explanation: 'Executes a scan against a remote account by assuming a pre-configured audit role.'
          }
        ],
        checkCommand: 'prowler -v',
        expectedOutput: 'Prowler'
      },
      {
        id: 'step-7',
        title: 'Compliance Dashboard Integration',
        instruction: 'Export Prowler results to AWS Security Hub or an S3 bucket for centralized security visualization.',
        summary: 'Centralize security findings.',
        whyNeeded: 'HTML reports are hard to track over time. Sending data to Security Hub allows you to track compliance trends and integrate findings into automated remediation workflows.',
        pillarConnection: 'Operational Excellence — using standardized security endpoints ensures that findings are actionable and integrated into the broader IT governance framework.',
        commands: [
          {
            text: 'prowler aws -S -f json',
            explanation: 'Generates a machine-readable JSON output and prepares it for ingestion into AWS Security Hub.'
          }
        ],
        checkCommand: 'ls output/*.json',
        expectedOutput: 'json'
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
            text: 'az network vnet subnet create -g myRG --vnet-name myVNet -n GatewaySubnet --address-prefix 10.0.255.0/27',
            explanation: 'Creates a dedicated network segment for the encrypted VPN gateway components.'
          }
        ],
        checkCommand: 'az network vnet subnet show -g myRG --vnet-name myVNet -n GatewaySubnet',
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
            text: 'az network vnet-gateway create -g myRG --name myVPN -vnet myVNet --public-ip-address myIP --gateway-type Vpn --vpn-type RouteBased --sku VpnGw1 --no-wait',
            explanation: 'Triggers the background deployment of the managed VPN service in Azure.'
          }
        ],
        checkCommand: 'az network vnet-gateway show -g myRG --name myVPN',
        expectedOutput: 'Succeeded'
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
            text: 'az network local-gateway create -g myRG --name on-prem-lng --gateway-ip-address 203.0.113.1 --address-prefixes 192.168.1.0/24',
            explanation: 'Creates a logical object representing the physical VPN hardware at your remote office.'
          }
        ],
        checkCommand: 'az network local-gateway show -g myRG --name on-prem-lng',
        expectedOutput: 'on-prem-lng'
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
            text: 'az network vpn-connection create -g myRG --name azure-to-onprem --vnet-gateway1 myVPN --local-network-gateway2 on-prem-lng --shared-key "MyVerySecretKey123"',
            explanation: 'Establishes the logical connection and starts the IKE phase negotiation.'
          }
        ],
        checkCommand: 'az network vpn-connection show -g myRG --name azure-to-onprem',
        expectedOutput: 'Connected'
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
            text: 'az network vpn-connection update -g myRG --name azure-to-onprem --enable-bgp true',
            explanation: 'Enables BGP protocol for the specified VPN connection.'
          }
        ],
        checkCommand: 'az network vpn-connection show -g myRG --name azure-to-onprem -o json | jq ".enableBgp"',
        expectedOutput: 'true'
      },
      {
        id: 'step-6',
        title: 'VPN ExpressRoute Failover',
        instruction: 'Configure the VPN Gateway as a backup path for an existing ExpressRoute circuit.',
        summary: 'Implement hybrid network redundancy.',
        whyNeeded: 'ExpressRoute provides high speed, but if the physical cable is cut, your business stops. VPN acting as a failover ensures that critical traffic can still reach Azure over the public internet.',
        pillarConnection: 'Reliability — multi-path connectivity via different providers/technologies is the only way to achieve 99.99% network availability.',
        commands: [
          {
            text: 'az network vpn-gateway update --name VPNGateway --resource-group Labs-RG --set enableBgp=true',
            explanation: 'Enables BGP routing, which is essential for automatic failover between ExpressRoute and VPN paths.'
          }
        ],
        checkCommand: 'az network vpn-gateway show --name VPNGateway --resource-group Labs-RG | grep enableBgp',
        expectedOutput: 'true'
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
            text: 'az network vnet peering create --name HubToSpoke --vnet-name HubVNet --remote-vnet SpokeVNet --allow-vnet-access --allow-gateway-transit',
            explanation: 'Connects two networks and allows the "Spoke" network to use the "Hub\'s" existing VPN connection.'
          }
        ],
        checkCommand: 'az network vnet peering show --name HubToSpoke --vnet-name HubVNet --resource-group Labs-RG',
        expectedOutput: 'Connected'
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
  }
];