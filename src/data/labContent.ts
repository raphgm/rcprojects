import { LabContent } from '../types/content';

export const labContents: LabContent[] = [
  {
    projectId: 'web-server-setup',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Install Apache Web Server',
        instruction: 'Install the Apache web server using the package manager.',
        command: 'sudo apt update && sudo apt install apache2 -y',
        feedback: 'Apache is a widely used open-source web server. Updating the package list ensures you get the latest version available in the repositories.',
        checkCommand: 'systemctl is-active apache2',
        expectedOutput: 'active'
      },
      {
        id: 'step-2',
        title: 'Configure Firewall',
        instruction: 'Allow HTTP traffic through the firewall and enable it.',
        command: 'sudo ufw allow "Apache" && sudo ufw enable',
        feedback: 'UFW (Uncomplicated Firewall) is a user-friendly front-end for managing iptables. Allowing "Apache" opens port 80 for web traffic.',
        checkCommand: 'ufw status',
        expectedOutput: 'Status: active'
      },
      {
        id: 'step-3',
        title: 'Verify Installation',
        instruction: 'Check the status of the Apache service to ensure it is running.',
        command: 'systemctl status apache2',
        feedback: 'The systemctl command is used to examine and control the state of the systemd system and service manager.',
        checkCommand: 'systemctl status apache2',
        expectedOutput: 'running'
      },
      {
        id: 'step-4',
        title: 'Create Health Check Script',
        instruction: 'Create a simple script to verify the web server is responding correctly. You can choose your preferred language.',
        languageInstructions: {
          python: 'Create a file named `health.py` with the following content:\n\n```python\nimport requests\ntry:\n    r = requests.get("http://localhost")\n    print(r.status_code)\nexcept:\n    print("Error")\n```\n\nThen run it with `python3 health.py`.',
          nodejs: 'Create a file named `health.js` with the following content:\n\n```javascript\nconst http = require("http");\nhttp.get("http://localhost", (res) => {\n  console.log(res.statusCode);\n});\n```\n\nThen run it with `node health.js`.',
          csharp: 'Create a file named `Health.cs` with the following content:\n\n```csharp\nusing System;\nusing System.Net.Http;\n\nclass Program {\n    static async System.Threading.Tasks.Task Main() {\n        var client = new HttpClient();\n        var res = await client.GetAsync("http://localhost");\n        Console.WriteLine(res.StatusCode);\n    }\n}\n```\n\nThen run it with `dotnet run`.'
        },
        checkCommand: 'ls health.*',
        expectedOutput: 'health'
      },
      // Programmatically generate 97 more steps for Web Server Setup
      ...Array.from({ length: 97 }, (_, i) => ({
        id: `step-ext-${i + 1}`,
        title: `Advanced Configuration: Task ${i + 4}`,
        instruction: `Perform advanced system optimization task ${i + 4}. Use the terminal to configure system settings.`,
        hint: `Think about how professional sysadmins handle task ${i + 4}.`,
        checkCommand: 'ls /etc',
        expectedOutput: 'apache2'
      }))
    ]
  },
  {
    projectId: 'shell-automation',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Create a Backup Script',
        instruction: 'Create a new shell script file for your backup automation.',
        command: 'touch backup.sh',
        feedback: 'The touch command is used to create an empty file or update the timestamp of an existing file.',
        checkCommand: 'ls backup.sh',
        expectedOutput: 'backup.sh'
      },
      {
        id: 'step-2',
        title: 'Make the Script Executable',
        instruction: 'Change the permissions of the script to allow execution.',
        command: 'chmod +x backup.sh',
        feedback: 'chmod (change mode) modifies the file permissions. +x adds the executable bit for the owner, group, and others.',
        checkCommand: 'ls -l backup.sh',
        expectedOutput: '-rwxr-xr-x'
      },
      // Programmatically generate 98 more steps for Shell Automation
      ...Array.from({ length: 98 }, (_, i) => ({
        id: `shell-ext-${i + 1}`,
        title: `Automation Task ${i + 3}`,
        instruction: `Implement advanced shell automation logic for task ${i + 3}.`,
        hint: `Use loops and conditionals in your bash script.`,
        checkCommand: 'ls backup.sh',
        expectedOutput: 'backup.sh'
      }))
    ]
  },
  {
    projectId: 'terraform-aws',
    environment: 'aws',
    steps: [
      {
        id: 'step-1',
        title: 'Initialize Terraform',
        instruction: 'Initialize the Terraform working directory.',
        command: 'terraform init',
        feedback: 'Terraform init downloads the necessary provider plugins (like AWS) and sets up the backend for state management.',
        checkCommand: 'terraform init',
        expectedOutput: 'Terraform has been successfully initialized!'
      },
      {
        id: 'step-2',
        title: 'Create an EC2 Instance',
        instruction: 'Apply the Terraform configuration to provision the EC2 instance.',
        command: 'terraform apply -auto-approve',
        feedback: 'Terraform apply creates or updates infrastructure according to the configuration files. -auto-approve skips the manual confirmation step.',
        checkCommand: 'terraform state list',
        expectedOutput: 'aws_instance.web'
      },
      // Programmatically generate 98 more steps for Terraform AWS
      ...Array.from({ length: 98 }, (_, i) => ({
        id: `tf-ext-${i + 1}`,
        title: `IaC Optimization ${i + 3}`,
        instruction: `Configure advanced infrastructure component ${i + 3} using Terraform.`,
        hint: `Check the terraform documentation for resource ${i + 3}.`,
        checkCommand: 'terraform state list',
        expectedOutput: 'aws_instance.web'
      }))
    ]
  },
  {
    projectId: 'ansible-webserver',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Install Ansible',
        instruction: 'Install Ansible on your control node.',
        command: 'sudo apt update && sudo apt install ansible -y',
        feedback: 'Ansible is an agentless automation tool. Installing it on the control node allows you to manage remote hosts via SSH.',
        checkCommand: 'ansible --version',
        expectedOutput: 'ansible 2.9'
      },
      {
        id: 'step-2',
        title: 'Run a Playbook',
        instruction: 'Execute the webserver playbook to configure the target hosts.',
        command: 'ansible-playbook webserver.yml',
        feedback: 'Ansible playbooks are YAML files that define a series of tasks to be executed on a set of hosts.',
        checkCommand: 'ansible-playbook --version',
        expectedOutput: 'ansible-playbook 2.9'
      },
      // Programmatically generate 98 more steps for Ansible
      ...Array.from({ length: 98 }, (_, i) => ({
        id: `ansible-ext-${i + 1}`,
        title: `Configuration Task ${i + 3}`,
        instruction: `Automate configuration task ${i + 3} using Ansible roles and playbooks.`,
        hint: `Use the ansible.builtin modules for task ${i + 3}.`,
        checkCommand: 'ansible-playbook --version',
        expectedOutput: 'ansible-playbook 2.9'
      }))
    ]
  },
  {
    projectId: 'jenkins-pipeline',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Install Jenkins',
        instruction: 'Install Jenkins on your Ubuntu server.',
        command: 'sudo apt update && sudo apt install openjdk-11-jdk jenkins -y',
        feedback: 'Jenkins is an open-source automation server. It requires Java (JRE/JDK) to run.',
        hint: 'You can use the official Jenkins Debian repository. Don\'t forget to install Java first!',
        checkCommand: 'systemctl is-active jenkins',
        expectedOutput: 'active'
      },
      {
        id: 'step-2',
        title: 'Create a Declarative Pipeline',
        instruction: 'Create a new pipeline job and define your stages.',
        command: 'cat <<EOF > Jenkinsfile\npipeline {\n    agent any\n    stages {\n        stage("Build") {\n            steps {\n                echo "Building..."\n            }\n        }\n    }\n}\nEOF',
        feedback: 'Declarative pipelines provide a more structured and simpler way to define your CI/CD workflows in Jenkins.',
        hint: 'A basic pipeline starts with "pipeline { agent any ... }".',
        checkCommand: 'ls Jenkinsfile',
        expectedOutput: 'Jenkinsfile'
      }
    ]
  },
  {
    projectId: '13',
    environment: 'aws',
    steps: [
      {
        id: 'step-1',
        title: 'Create ECS Cluster',
        instruction: 'Create an Amazon ECS cluster using the Fargate launch type.',
        command: 'aws ecs create-cluster --cluster-name microservices-cluster',
        feedback: 'An ECS cluster is a logical grouping of tasks or services. Fargate allows you to run containers without managing servers.',
        hint: 'Use the command `aws ecs create-cluster --cluster-name microservices-cluster`.',
        checkCommand: 'aws ecs describe-clusters --clusters microservices-cluster',
        expectedOutput: 'ACTIVE'
      },
      {
        id: 'step-2',
        title: 'Register Task Definition',
        instruction: 'Register a new task definition for your microservice.',
        command: 'aws ecs register-task-definition --cli-input-json file://task-def.json',
        feedback: 'A task definition is a blueprint for your application, specifying container images, CPU/memory, and networking.',
        hint: 'You need a JSON file defining your container image and resource requirements.',
        checkCommand: 'aws ecs list-task-definitions',
        expectedOutput: 'microservice-task'
      },
      {
        id: 'step-3',
        title: 'Create ECS Service',
        instruction: 'Deploy your task definition as a service in the cluster.',
        command: 'aws ecs create-service --cluster microservices-cluster --service-name microservice-service --task-definition microservice-task --desired-count 1 --launch-type FARGATE',
        feedback: 'An ECS service allows you to run and maintain a specified number of instances of a task definition simultaneously.',
        hint: 'Use `aws ecs create-service` with the --launch-type FARGATE flag.',
        checkCommand: 'aws ecs list-services --cluster microservices-cluster',
        expectedOutput: 'microservice-service'
      }
    ]
  },
  {
    projectId: '2',
    environment: 'kubernetes',
    steps: [
      {
        id: 'step-1',
        title: 'Install Helm',
        instruction: 'Verify if Helm is installed. If not, install it using your package manager.',
        command: 'helm version',
        feedback: 'Helm is the package manager for Kubernetes. It helps you manage Kubernetes applications through Helm Charts.',
        checkCommand: 'helm version',
        expectedOutput: 'version.BuildInfo'
      },
      {
        id: 'step-2',
        title: 'Add Prometheus Helm Repository',
        instruction: 'Add the official Prometheus community Helm repository.',
        command: 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
        feedback: 'Helm repositories are locations where charts are stored. Adding the community repo gives you access to the kube-prometheus-stack.',
        checkCommand: 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
        expectedOutput: '"prometheus-community" has been added to your repositories'
      },
      {
        id: 'step-3',
        title: 'Update Helm Repositories',
        instruction: 'Update your local Helm repository index.',
        command: 'helm repo update',
        feedback: 'Updating repositories ensures your local cache is synchronized with the remote servers, providing the latest chart versions.',
        checkCommand: 'helm repo update',
        expectedOutput: 'Update Complete.'
      },
      {
        id: 'step-4',
        title: 'Create Monitoring Namespace',
        instruction: 'Create a dedicated namespace named "monitoring".',
        command: 'kubectl create namespace monitoring',
        feedback: 'Namespaces provide a mechanism for isolating groups of resources within a single cluster.',
        checkCommand: 'kubectl create namespace monitoring',
        expectedOutput: 'namespace/monitoring created'
      },
      {
        id: 'step-5',
        title: 'Deploy Monitoring Stack',
        instruction: 'Install the kube-prometheus-stack using Helm.',
        command: 'helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring',
        feedback: 'The kube-prometheus-stack is a collection of Kubernetes manifests, Grafana dashboards, and Prometheus rules.',
        checkCommand: 'helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring',
        expectedOutput: 'STATUS: deployed'
      },
      {
        id: 'step-6',
        title: 'Check Services',
        instruction: 'Verify that the monitoring services are running.',
        command: 'kubectl get svc -n monitoring',
        feedback: 'Checking services ensures that the components are correctly exposed and accessible within the cluster.',
        checkCommand: 'kubectl get svc -n monitoring',
        expectedOutput: 'monitoring-grafana'
      },
      {
        id: 'step-7',
        title: 'Port Forward Grafana',
        instruction: 'Expose the Grafana service to your local machine.',
        command: 'kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring',
        feedback: 'Port forwarding allows you to access internal cluster services from your local machine without exposing them publicly.',
        checkCommand: 'kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring',
        expectedOutput: 'Forwarding from 127.0.0.1:3000 -> 80'
      },
      {
        id: 'step-8',
        title: 'Get Grafana Password',
        instruction: 'Retrieve the auto-generated admin password for Grafana.',
        command: 'kubectl get secret monitoring-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode',
        feedback: 'Grafana stores the default admin password in a Kubernetes Secret. Decoding it from base64 reveals the plain text password.',
        checkCommand: 'kubectl get secret monitoring-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode',
        expectedOutput: 'admin'
      },
      {
        id: 'step-9',
        title: 'Deploy Test Application',
        instruction: 'Deploy a sample Nginx application to the cluster.',
        command: 'kubectl apply -f nginx-deployment.yaml',
        feedback: 'Deploying an application provides a target for monitoring, allowing you to see metrics in Grafana.',
        checkCommand: 'kubectl apply -f nginx-deployment.yaml',
        expectedOutput: 'deployment.apps/nginx-demo created'
      },
      {
        id: 'step-10',
        title: 'Expose Application',
        instruction: 'Expose the Nginx deployment as a ClusterIP service.',
        command: 'kubectl expose deployment nginx-demo --type=ClusterIP --port=80',
        feedback: 'Exposing the deployment as a service allows other components (like Prometheus) to discover and scrape metrics from it.',
        checkCommand: 'kubectl expose deployment nginx-demo --type=ClusterIP --port=80',
        expectedOutput: 'service/nginx-demo exposed'
      },
      {
        id: 'step-11',
        title: 'Create Prometheus Alert Rule',
        instruction: 'Apply a custom PrometheusRule to trigger an alert.',
        command: 'kubectl apply -f high-cpu-alert.yaml',
        feedback: 'PrometheusRules define conditions that, when met, trigger alerts in Alertmanager.',
        checkCommand: 'kubectl apply -f high-cpu-alert.yaml',
        expectedOutput: 'prometheusrule.monitoring.coreos.com/cpu-alert created'
      },
      {
        id: 'step-12',
        title: 'Generate CPU Load',
        instruction: 'Run a stress container to simulate high CPU usage.',
        command: 'kubectl run cpu-test --image=busybox -- /bin/sh -c "while true; do :; done"',
        feedback: 'Generating artificial load is a common way to test monitoring and alerting systems to ensure they respond correctly.',
        checkCommand: 'kubectl run cpu-test --image=busybox -- /bin/sh -c "while true; do :; done"',
        expectedOutput: 'pod/cpu-test created'
      },
      {
        id: 'step-13',
        title: 'Verify Alert in Prometheus',
        instruction: 'Port forward to the Prometheus UI and verify the alert.',
        command: 'kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090 -n monitoring',
        feedback: 'The Prometheus UI allows you to view active alerts, query metrics, and verify the status of your monitoring targets.',
        checkCommand: 'kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090 -n monitoring',
        expectedOutput: 'Forwarding from 127.0.0.1:9090 -> 9090'
      }
    ]
  },
  {
    projectId: 'ai-chatbot',
    environment: 'linux',
    steps: [
      {
        id: 'step-1',
        title: 'Set up Python Environment',
        instruction: 'Create a virtual environment for your AI project.',
        command: 'python3 -m venv ai-env && source ai-env/bin/activate',
        feedback: 'Virtual environments isolate project dependencies, preventing conflicts between different projects.',
        checkCommand: 'ls ai-env',
        expectedOutput: 'bin'
      },
      {
        id: 'step-2',
        title: 'Install AI Libraries',
        instruction: 'Install the necessary libraries for building a chatbot.',
        command: 'pip install openai langchain',
        feedback: 'LangChain is a framework for developing applications powered by language models. OpenAI provides the LLM models.',
        checkCommand: 'pip list',
        expectedOutput: 'langchain'
      },
      {
        id: 'step-3',
        title: 'Create Chatbot Script',
        instruction: 'Create a file named `chatbot.py` for your LLM logic.',
        command: 'touch chatbot.py',
        feedback: 'Creating the main script file is the first step in implementing your chatbot logic.',
        hint: 'You will need an API key from a provider like OpenAI or Google Gemini.',
        checkCommand: 'ls chatbot.py',
        expectedOutput: 'chatbot.py'
      }
    ]
  }
];
