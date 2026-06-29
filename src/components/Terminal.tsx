import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { LinuxFlavor } from '../App';

import { LabStep } from '../types/content';

const normalizeCommandToLinux = (cmd: string): string => {
  let newCmd = cmd.trim();
  
  // Expand shell helper shortcuts
  newCmd = newCmd.replace(/\$HOME/g, '/home/user');
  newCmd = newCmd.replace(/~/g, '/home/user');
  newCmd = newCmd.replace(/\$\(id -u\)/g, '1000');
  newCmd = newCmd.replace(/\$\(id -g\)/g, '1000');
  
  // macOS mappings to Linux
  if (newCmd.includes('brew install ')) {
    newCmd = newCmd.replace(/brew\s+install\s+([a-zA-Z0-9\-\s]+)/g, 'sudo apt install -y $1');
  }
  if (newCmd.includes('brew update')) {
    newCmd = newCmd.replace(/brew\s+update/g, 'sudo apt update');
  }
  if (newCmd.includes('brew services start ')) {
    newCmd = newCmd.replace(/brew\s+services\s+start\s+(\w+)/g, 'sudo systemctl start $1');
  }
  if (newCmd.includes('brew services restart ')) {
    newCmd = newCmd.replace(/brew\s+services\s+restart\s+(\w+)/g, 'sudo systemctl restart $1');
  }
  if (newCmd.includes('brew services list')) {
    const grepMatch = newCmd.match(/brew\s+services\s+list\s*\|\s*grep\s+(\w+)/);
    if (grepMatch) {
      newCmd = `systemctl is-active ${grepMatch[1]}`;
    }
  }

  // Windows/PowerShell mappings to Linux
  if (newCmd.includes('winget install ')) {
    newCmd = newCmd.replace(/winget\s+install\s+([a-zA-Z0-9\-\s]+)/g, 'sudo apt install -y $1');
  }
  if (newCmd.includes('winget upgrade')) {
    newCmd = newCmd.replace(/winget\s+upgrade/g, 'sudo apt update');
  }
  if (newCmd.includes('Start-Service ')) {
    newCmd = newCmd.replace(/Start-Service\s+(\w+)/g, 'sudo systemctl start $1');
  }
  if (newCmd.includes('Restart-Service ')) {
    newCmd = newCmd.replace(/Restart-Service\s+(\w+)/g, 'sudo systemctl restart $1');
  }
  if (newCmd.includes('Get-Service ')) {
    newCmd = newCmd.replace(/Get-Service\s+(\w+)/g, 'systemctl is-active $1');
  }
  if (newCmd === 'Get-ChildItem -Force') {
    newCmd = 'ls -la';
  }
  if (newCmd === 'Get-ChildItem') {
    newCmd = 'ls';
  }
  if (newCmd === 'Get-Location') {
    newCmd = 'pwd';
  }
  if (newCmd.startsWith('Get-Content ')) {
    newCmd = newCmd.replace(/^Get-Content\s+/, 'cat ');
  }
  if (newCmd.includes('| Out-File')) {
    newCmd = newCmd.replace(/(["'].*?["'])\s*\|\s*Out-File\s+-FilePath\s+(.*)/g, 'echo $1 | sudo tee $2');
  }
  if (newCmd.includes('Invoke-WebRequest ')) {
    if (newCmd.includes('-UseBasicParsing')) {
      newCmd = newCmd.replace(/Invoke-WebRequest\s+-Uri\s+http:\/\/(.*?)\s+-UseBasicParsing/g, 'curl -s $1');
    } else {
      newCmd = newCmd.replace(/Invoke-WebRequest\s+-Uri\s+(.*)/g, 'curl $1');
    }
  }

  return newCmd;
};

// Best-effort plausible output for common cloud/devops CLIs used in labs.
// Returns null if the command is not recognized so callers can fall through.
const simulateLabCommand = (cmd: string, args: string[]): string | null => {
  const base = args[0]?.toLowerCase();
  const sub = args[1]?.toLowerCase();
  const rest = args.slice(2);

  // Helper: derive a Kubernetes resource kind+name from a YAML filename.
  const inferKindFromFilename = (file: string): { kind: string; name: string } => {
    const f = file.toLowerCase().replace(/\.ya?ml$/, '').replace(/^.*\//, '');
    if (f.includes('storage-class') || f.includes('storageclass')) return { kind: 'storageclass.storage.k8s.io', name: f.replace(/[-_]?storage[-_]?class/, '') || 'local-storage' };
    if (f.includes('statefulset')) return { kind: 'statefulset.apps', name: f.replace(/[-_]?statefulset/, '') || 'app' };
    if (f.includes('deployment')) return { kind: 'deployment.apps', name: f.replace(/[-_]?deployment/, '') || 'app' };
    if (f.includes('daemonset')) return { kind: 'daemonset.apps', name: f.replace(/[-_]?daemonset/, '') || 'app' };
    if (f.includes('service-monitor') || f.includes('servicemonitor')) return { kind: 'servicemonitor.monitoring.coreos.com', name: f.replace(/[-_]?service[-_]?monitor/, '') || 'app' };
    if (f.includes('service') || f.includes('svc')) return { kind: 'service', name: f.replace(/[-_]?service|[-_]?svc/, '') || 'app' };
    if (f.includes('ingress')) return { kind: 'ingress.networking.k8s.io', name: f.replace(/[-_]?ingress/, '') || 'app' };
    if (f.includes('configmap')) return { kind: 'configmap', name: f.replace(/[-_]?configmap/, '') || 'app' };
    if (f.includes('secret')) return { kind: 'secret', name: f.replace(/[-_]?secret/, '') || 'app' };
    if (f.includes('namespace') || f.includes('ns')) return { kind: 'namespace', name: f.replace(/[-_]?namespace|[-_]?ns/, '') || 'app' };
    if (f.includes('networkpolicy') || f.includes('netpol') || f.includes('deny') || f.includes('allow') || f.includes('egress')) return { kind: 'networkpolicy.networking.k8s.io', name: f || 'policy' };
    if (f.includes('rbac') || f.includes('role')) return { kind: 'role.rbac.authorization.k8s.io', name: f.replace(/[-_]?rbac|[-_]?role/, '') || 'role' };
    if (f.includes('quota')) return { kind: 'resourcequota', name: f || 'quota' };
    if (f.includes('limit')) return { kind: 'limitrange', name: f || 'limits' };
    if (f.includes('priority')) return { kind: 'priorityclass.scheduling.k8s.io', name: f || 'priority' };
    if (f.includes('scaledobject') || f.includes('hpa') || f.includes('autoscale')) return { kind: 'scaledobject.keda.sh', name: f || 'scaler' };
    if (f.includes('pv-')) return { kind: 'persistentvolume', name: f.replace('pv-', '') || 'pv' };
    if (f.includes('pvc')) return { kind: 'persistentvolumeclaim', name: f.replace(/[-_]?pvc/, '') || 'pvc' };
    return { kind: 'configured', name: f.replace(/[-_]/g, '-').slice(0, 30) || 'resource' };
  };

  switch (base) {
    case 'kubectl': {
      if (!sub) return 'kubectl controls the Kubernetes cluster manager.';
      if (sub === 'version') return 'Client Version: v1.29.0\nServer Version: v1.29.0';
      if (sub === 'cluster-info') return 'Kubernetes control plane is running at https://kubernetes.default.svc\nCoreDNS is running at https://kubernetes.default.svc/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy';
      if (sub === 'config') return 'Current context: realcloud-sandbox';
      if (sub === 'apply') {
        const fIdx = args.findIndex(a => a === '-f' || a === '--filename');
        const target = fIdx >= 0 ? args[fIdx + 1] : '';
        if (!target) return 'error: must specify one of -f and -k';
        if (/^https?:\/\//.test(target)) {
          // Remote manifest — pretend several resources were created.
          return [
            'namespace/created',
            'serviceaccount/default created',
            'clusterrole.rbac.authorization.k8s.io/manager created',
            'clusterrolebinding.rbac.authorization.k8s.io/manager created',
            'deployment.apps/controller created',
            'service/controller-metrics created'
          ].join('\n');
        }
        const { kind, name } = inferKindFromFilename(target);
        return `${kind}/${name} created`;
      }
      if (sub === 'create') {
        const what = rest[0]?.toLowerCase();
        const name = rest[1] || 'resource';
        if (what === 'namespace' || what === 'ns') return `namespace/${name} created`;
        if (what === 'secret') return `secret/${rest[1] || 'generic-secret'} created`;
        if (what === 'configmap' || what === 'cm') return `configmap/${name} created`;
        if (what === 'deployment' || what === 'deploy') return `deployment.apps/${name} created`;
        if (what === 'serviceaccount' || what === 'sa') return `serviceaccount/${name} created`;
        return `${what || 'resource'}/${name} created`;
      }
      if (sub === 'get') {
        const what = (rest[0] || '').toLowerCase();
        if (what.startsWith('node')) return 'NAME             STATUS   ROLES           AGE   VERSION\nrealcloud-cp-1   Ready    control-plane   2d    v1.29.0\nrealcloud-w-1    Ready    <none>          2d    v1.29.0\nrealcloud-w-2    Ready    <none>          2d    v1.29.0';
        if (what.startsWith('pod')) return 'NAME                         READY   STATUS    RESTARTS   AGE\nmongo-0                      1/1     Running   0          1m\nmongo-1                      1/1     Running   0          45s\nmongo-2                      1/1     Running   0          30s\nmongo-3                      1/1     Running   0          15s\nmongo-4                      1/1     Running   0          5s';
        if (what === 'sc' || what.startsWith('storageclass')) return 'NAME            PROVISIONER                    AGE\nlocal-storage   kubernetes.io/no-provisioner   10s';
        if (what === 'svc' || what.startsWith('service')) return 'NAME    TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)     AGE\nmongo   ClusterIP   None         <none>        27017/TCP   30s';
        if (what.startsWith('statefulset') || what === 'sts') return 'NAME    READY   AGE\nmongo   3/3     1m';
        if (what.startsWith('deployment') || what === 'deploy') return 'NAME          READY   UP-TO-DATE   AVAILABLE   AGE\nnginx-demo    3/3     3            3           5m';
        if (what.startsWith('namespace') || what === 'ns') return 'NAME              STATUS   AGE\ndefault           Active   2d\nkube-system       Active   2d\nmonitoring        Active   1m';
        if (what.startsWith('secret')) return 'NAME       TYPE     DATA   AGE\nkms-key    Opaque   1      30s';
        if (what.startsWith('cm') || what.startsWith('configmap')) return 'NAME       DATA   AGE\nkube-root-ca.crt   1     2d';
        if (what.startsWith('ingress') || what === 'ing') return 'NAME          CLASS   HOSTS         ADDRESS         PORTS   AGE\napp-ingress   nginx   myapp.local   192.168.49.2    80      1m';
        if (what.startsWith('networkpolicy') || what === 'netpol') return 'NAME               POD-SELECTOR   AGE\ndefault-deny-all   <none>         30s';
        return `No resources found matching "${rest.join(' ')}".`;
      }
      if (sub === 'scale') {
        const replicas = (args.find(a => a.startsWith('--replicas=')) || '').split('=')[1] || '1';
        const target = rest.find(a => !a.startsWith('-')) || 'resource';
        return `${target} scaled to ${replicas} replicas`;
      }
      if (sub === 'describe') return `Name:         ${rest[1] || 'resource'}\nNamespace:    default\nLabels:       <none>\nStatus:       Running\nEvents:       <none>`;
      if (sub === 'delete') return `${rest[0] || 'resource'} "${rest[1] || 'name'}" deleted`;
      if (sub === 'rollout') return `${rest[0] || 'rollout'} successful`;
      if (sub === 'autoscale') return `horizontalpodautoscaler.autoscaling/${rest[1] || 'app'} autoscaled`;
      if (sub === 'expose') return `service/${rest[1] || 'app'} exposed`;
      if (sub === 'logs') return '[INFO] Application started\n[INFO] Listening on port 8080\n[INFO] Health check OK';
      if (sub === 'exec') return '(exec session simulated — output suppressed)';
      if (sub === 'port-forward') return `Forwarding from 127.0.0.1:${rest[2]?.split(':')[0] || '8080'} -> ${rest[2]?.split(':')[1] || '80'}`;
      if (sub === 'run') return `pod/${rest[0] || 'pod'} created`;
      if (sub === 'label' || sub === 'annotate' || sub === 'taint' || sub === 'drain' || sub === 'cordon' || sub === 'uncordon') return `${sub} succeeded`;
      return `[kubectl ${sub}] completed.`;
    }
    case 'helm': {
      if (sub === 'install') return `NAME: ${rest[0] || 'release'}\nLAST DEPLOYED: ${new Date().toUTCString()}\nSTATUS: deployed\nREVISION: 1`;
      if (sub === 'upgrade') return `Release "${rest[0] || 'release'}" has been upgraded. Happy Helming!`;
      if (sub === 'uninstall' || sub === 'delete') return `release "${rest[0] || 'release'}" uninstalled`;
      if (sub === 'repo') {
        if (rest[0] === 'add') return `"${rest[1] || 'repo'}" has been added to your repositories`;
        if (rest[0] === 'update') return 'Hang tight while we grab the latest from your chart repositories...\n...Successfully got an update from all repositories\nUpdate Complete.';
        if (rest[0] === 'list') return 'NAME             URL\nstable           https://charts.helm.sh/stable';
      }
      if (sub === 'list' || sub === 'ls') return 'NAME    NAMESPACE   REVISION   STATUS    CHART';
      if (sub === 'version') return 'version.BuildInfo{Version:"v3.13.0"}';
      return `[helm ${sub || ''}] completed.`;
    }
    case 'docker': {
      if (sub === 'build') return 'Sending build context to Docker daemon...\nSuccessfully built abc123def456\nSuccessfully tagged ' + (args.find(a => a.startsWith('-t='))?.split('=')[1] || 'image:latest');
      if (sub === 'run') return 'Container started: ' + Math.random().toString(36).slice(2, 14);
      if (sub === 'ps') return 'CONTAINER ID   IMAGE     COMMAND   STATUS         PORTS     NAMES\nabc123def456   nginx     "nginx"   Up 2 minutes   80/tcp    web';
      if (sub === 'pull') return `Using default tag: latest\nlatest: Pulling from library/${rest[0] || 'image'}\nDigest: sha256:fakedigest\nStatus: Downloaded newer image`;
      if (sub === 'push') return 'The push refers to repository [docker.io/...]\nlatest: digest: sha256:fakedigest size: 1234';
      if (sub === 'images') return 'REPOSITORY   TAG      IMAGE ID       CREATED        SIZE\nnginx        latest   abc123def456   2 weeks ago    142MB';
      if (sub === 'exec') return '(exec session simulated)';
      if (sub === 'compose') return `Compose ${rest[0] || 'up'} succeeded.`;
      if (sub === 'login') return 'Login Succeeded';
      if (sub === 'version') return 'Docker version 24.0.7, build afdd53b';
      return `[docker ${sub || ''}] completed.`;
    }
    case 'terraform': {
      if (sub === 'init') return 'Initializing the backend...\nInitializing provider plugins...\nTerraform has been successfully initialized!';
      if (sub === 'plan') return 'Plan: 5 to add, 0 to change, 0 to destroy.';
      if (sub === 'apply') return 'Apply complete! Resources: 5 added, 0 changed, 0 destroyed.';
      if (sub === 'destroy') return 'Destroy complete! Resources: 5 destroyed.';
      if (sub === 'validate') return 'Success! The configuration is valid.';
      if (sub === 'fmt') return '(formatted)';
      if (sub === 'output') return 'cluster_endpoint = "https://realcloud.example.com"';
      if (sub === 'version') return 'Terraform v1.7.0';
      return `[terraform ${sub || ''}] completed.`;
    }
    case 'git': {
      if (sub === 'init') return 'Initialized empty Git repository in ./.git/';
      if (sub === 'add') return '';
      if (sub === 'commit') return '[main abc1234] commit message\n 1 file changed, 1 insertion(+)';
      if (sub === 'status') return 'On branch main\nnothing to commit, working tree clean';
      if (sub === 'push') return 'Everything up-to-date';
      if (sub === 'pull') return 'Already up to date.';
      if (sub === 'clone') return `Cloning into '${(rest[0] || '').split('/').pop()?.replace('.git', '') || 'repo'}'...\nremote: Counting objects... done.\nReceiving objects: 100% (250/250), done.`;
      if (sub === 'config') return '';
      if (sub === 'log') return 'commit abc1234\nAuthor: Cloud Student <student@cloud-labs.com>\nDate:   ' + new Date().toString() + '\n\n    Initial commit';
      if (sub === 'branch') return '* main';
      if (sub === 'checkout' || sub === 'switch') return `Switched to branch '${rest[0] || 'main'}'`;
      return `[git ${sub || ''}] completed.`;
    }
    case 'aws': {
      if (sub === 'configure') return '';
      if (sub === 's3') return rest[0] === 'ls' ? '2025-01-01 00:00:00 my-bucket' : '(s3 operation completed)';
      if (sub === 'ec2') return rest[0] === 'describe-instances' ? '{ "Reservations": [ { "Instances": [ { "InstanceId": "i-0abc123def456" } ] } ] }' : '(ec2 operation completed)';
      if (sub === 'sts') return rest[0] === 'get-caller-identity' ? '{\n    "UserId": "AIDAEXAMPLE",\n    "Account": "123456789012",\n    "Arn": "arn:aws:iam::123456789012:user/student"\n}' : '(sts operation completed)';
      return `(aws ${sub || ''} completed)`;
    }
    case 'az': {
      if (sub === 'login') return '[\n  {\n    "name": "Realcloud Subscription",\n    "id": "00000000-0000-0000-0000-000000000000",\n    "isDefault": true\n  }\n]';
      if (sub === 'group') return rest[0] === 'create' ? '{\n  "id": "/subscriptions/.../resourceGroups/...",\n  "location": "eastus",\n  "properties": { "provisioningState": "Succeeded" }\n}' : '[]';
      if (sub === 'aks' || sub === 'vm' || sub === 'storage' || sub === 'webapp') return `(az ${sub} ${rest[0] || ''} succeeded)`;
      if (sub === 'account') return 'Subscription: Realcloud Subscription';
      return `(az ${sub || ''} completed)`;
    }
    case 'gcloud': {
      if (sub === 'auth') return '(authenticated)';
      if (sub === 'projects') return rest[0] === 'list' ? 'PROJECT_ID         NAME            PROJECT_NUMBER\nrealcloud-demo     Realcloud       123456789012' : '(project op completed)';
      if (sub === 'compute' || sub === 'container' || sub === 'sql' || sub === 'storage') return `(gcloud ${sub} ${rest[0] || ''} succeeded)`;
      return `(gcloud ${sub || ''} completed)`;
    }
    case 'curl':
    case 'wget': {
      const url = args.find(a => /^https?:\/\//.test(a));
      if (!url) return `${base}: try '${base} --help' for more information.`;
      // For curl piping into bash/sh (common installer pattern)
      if (cmd.includes('| sh') || cmd.includes('| bash')) {
        return `Downloading from ${url}...\nDownloaded.\nRunning installer...\nInstalled successfully.`;
      }
      return `Connected to ${url.split('/')[2]}\nHTTP/1.1 200 OK\nContent-Type: application/octet-stream\n(... ${Math.floor(Math.random() * 50 + 5)}KB downloaded ...)`;
    }
    case 'ansible':
    case 'ansible-playbook':
    case 'ansible-galaxy': {
      if (base === 'ansible-galaxy') return `- ${rest[0] || 'role'} was created successfully`;
      return 'PLAY [all] **********\n\nTASK [Gathering Facts] **********\nok: [host1]\n\nPLAY RECAP **********\nhost1 : ok=5 changed=2 unreachable=0 failed=0';
    }
    case 'systemctl': {
      if (sub === 'status') return `● ${rest[0] || 'service'}.service - active (running)`;
      if (sub === 'start' || sub === 'stop' || sub === 'restart' || sub === 'reload' || sub === 'enable' || sub === 'disable') return '';
      if (sub === 'list-units') return 'UNIT                LOAD   ACTIVE SUB     DESCRIPTION\nnginx.service       loaded active running nginx web server';
      return `(systemctl ${sub || ''} completed)`;
    }
    case 'journalctl':
      return `-- Logs begin at ${new Date().toUTCString()} --\n${new Date().toUTCString()} realcloud systemd[1]: Started service.`;
    case 'openssl': {
      if (sub === 'rand') return btoa(Math.random().toString()).slice(0, 44);
      if (sub === 'genrsa' || sub === 'req' || sub === 'x509') return '(openssl operation completed)';
      return `(openssl ${sub || ''} completed)`;
    }
    case 'nmap':
      return `Starting Nmap 7.94\nNmap scan report for ${args[args.length - 1] || 'target'}\nHost is up (0.0010s latency).\nPORT     STATE  SERVICE\n22/tcp   open   ssh\n80/tcp   open   http\n443/tcp  open   https`;
    case 'ssh':
      return `(ssh session to ${args[args.length - 1] || 'host'} simulated — type 'exit' to close)`;
    case 'scp':
      return `${args[1] || 'file'}    100%   1024     1.0KB/s   00:00`;
    case 'kubeadm': {
      if (sub === 'init') return 'Your Kubernetes control-plane has initialized successfully!\n\nTo start using your cluster, run:\n  mkdir -p $HOME/.kube\n  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config';
      if (sub === 'join') return 'This node has joined the cluster.';
      if (sub === 'reset') return '[reset] Reset succeeded.';
      return `(kubeadm ${sub || ''} completed)`;
    }
    case 'minikube':
      return `(minikube ${sub || ''} completed)`;
    case 'istioctl':
    case 'kustomize':
    case 'crossplane':
    case 'prometheus':
    case 'promtool':
    case 'node_exporter':
    case 'grafana-cli':
    case 'amtool':
    case 'jenkins-cli':
    case 'etcdctl':
    case 'cilium':
    case 'falco':
      return `(${base} ${sub || ''} completed successfully)`;
    case 'prowler':
      return 'Prowler scan completed: 124 checks passed, 3 findings (LOW severity)';
    case 'trivy':
      return `Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)\n\n${args[args.length - 1] || 'target'} (alpine 3.18) — no vulnerabilities found`;
    case 'visudo':
    case 'logrotate':
    case 'auditctl':
    case 'sestatus':
    case 'sshd':
    case 'findmnt':
    case 'msfconsole':
    case 'hydra':
    case 'sqlmap':
    case 'gobuster':
    case 'snort':
    case 'fail2ban-client':
    case 'volatility':
    case 'fls':
    case 'exiftool':
    case 'checkov':
    case 'aircrack-ng':
    case 'hashcat':
    case 'nikto':
    case 'burpsuite':
      return `(${base} ${sub || ''} completed successfully)`;
    case 'consul':
    case 'vault':
    case 'nomad':
      return `(${base} ${sub || ''} completed)`;
    case 'python':
    case 'python3':
    case 'node':
    case 'java':
      return `(${base} ${args[1] || ''} executed)`;
    case 'pip':
    case 'pip3':
    case 'npm':
    case 'yarn':
    case 'pnpm':
      return `(${base} ${sub || ''} completed)`;
    // ---- Networking / system inspection
    case 'ifconfig':
    case 'ip':
      return 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 10.0.0.42  netmask 255.255.255.0  broadcast 10.0.0.255\n        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64\n        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)';
    case 'netstat':
    case 'ss':
      return 'Proto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN\ntcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN';
    case 'ping':
      return `PING ${args[1] || 'target'} (10.0.0.1) 56(84) bytes of data.\n64 bytes from ${args[1] || 'target'}: icmp_seq=1 ttl=64 time=0.421 ms\n64 bytes from ${args[1] || 'target'}: icmp_seq=2 ttl=64 time=0.512 ms\n--- ${args[1] || 'target'} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`;
    case 'traceroute':
    case 'tracepath':
      return `traceroute to ${args[1] || 'target'} (10.0.0.1), 30 hops max\n 1  10.0.0.1  0.421 ms  0.388 ms  0.371 ms`;
    case 'dig':
      return `;; ANSWER SECTION:\n${args[1] || 'example.com'}.    300    IN    A    93.184.216.34`;
    case 'nslookup':
      return `Server:    8.8.8.8\nAddress:   8.8.8.8#53\n\nName:      ${args[1] || 'example.com'}\nAddress:   93.184.216.34`;
    case 'host':
      return `${args[1] || 'example.com'} has address 93.184.216.34`;
    case 'tcpdump':
      return 'tcpdump: listening on eth0, link-type EN10MB, capture size 262144 bytes\n10:00:01.123 IP 10.0.0.42.443 > 10.0.0.1.50321: Flags [P.], length 320';
    case 'iptables':
    case 'ufw':
    case 'firewall-cmd':
      return sub === 'status' || rest[0] === 'status' ? 'Status: active' : `(${base} ${sub || ''} succeeded)`;
    // ---- Resource / process tools
    case 'htop':
    case 'free':
      return base === 'free'
        ? '              total        used        free      shared  buff/cache   available\nMem:        8048404     1245112     5102372       12340     1700920     6512384\nSwap:       2097148           0     2097148'
        : '  PID USER       %CPU  %MEM     TIME+  COMMAND\n 1234 user        0.5   1.2   0:00.42 bash';
    case 'df':
      return 'Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1       41152932 5120080  35900868  13% /';
    case 'du':
      return `${Math.floor(Math.random() * 500 + 50)}M\t${args[args.length - 1] || '.'}`;
    case 'mount':
    case 'umount':
      return base === 'mount' ? '/dev/sda1 on / type ext4 (rw,relatime)' : `(unmounted ${args[1] || 'device'})`;
    case 'lsblk':
      return 'NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS\nsda      8:0    0   40G  0 disk\n└─sda1   8:1    0   40G  0 part /';
    case 'fdisk':
    case 'parted':
      return 'Disk /dev/sda: 40 GiB, 42949672960 bytes, 83886080 sectors\nUnits: sectors of 1 * 512 = 512 bytes';
    // ---- Files / text
    case 'find':
      return `${args[1] || '.'}/file1\n${args[1] || '.'}/file2\n${args[1] || '.'}/dir/file3`;
    case 'grep':
    case 'egrep':
    case 'fgrep':
    case 'rg':
    case 'ag':
      return `${args[args.length - 1] || 'file'}: ${args[1] || 'match'} found`;
    case 'awk':
    case 'sed':
    case 'cut':
    case 'sort':
    case 'uniq':
    case 'head':
    case 'tail':
    case 'wc':
    case 'tee':
    case 'tr':
    case 'xargs':
      return `(${base} processed input successfully)`;
    case 'tar':
      return sub?.includes('x') ? '(archive extracted)' : '(archive created)';
    case 'zip':
    case 'unzip':
    case 'gzip':
    case 'gunzip':
    case 'bzip2':
    case 'xz':
      return `(${base} ${sub || ''} completed)`;
    case 'chmod':
    case 'chown':
    case 'chgrp':
      return '';
    case 'ln':
      return '';
    case 'useradd':
    case 'usermod':
    case 'userdel':
    case 'groupadd':
    case 'groupdel':
    case 'passwd':
      return base === 'passwd' ? 'passwd: password updated successfully' : '';

    case 'crontab':
      return sub === '-l' ? '# m h  dom mon dow   command\n0 2 * * * /usr/local/bin/backup.sh' : '(crontab updated)';
    // ---- Editors
    case 'vi':
    case 'vim':
    case 'nano':
    case 'emacs':
      return `(opened ${args[1] || 'file'} in ${base} — type ':wq' to save and exit)`;
    // ---- Build / language tooling
    case 'make':
    case 'cmake':
    case 'gcc':
    case 'g++':
    case 'clang':
    case 'go':
    case 'cargo':
    case 'rustc':
    case 'mvn':
    case 'gradle':
    case 'sbt':
    case 'dotnet':
      return `(${base} ${sub || ''} completed successfully)`;
    case 'tsc':
    case 'eslint':
    case 'prettier':
    case 'jest':
    case 'vitest':
    case 'pytest':
    case 'mocha':
      return `(${base} ${sub || ''} completed — 0 errors)`;
    // ---- Databases
    case 'psql':
    case 'mysql':
    case 'sqlite3':
    case 'mongo':
    case 'mongosh':
    case 'redis-cli':
    case 'cqlsh':
      if (cmd.includes('-c') || cmd.includes('--eval') || cmd.includes('-e')) {
        return ' id | name | created_at\n----+------+-------------\n  1 | demo | 2026-01-01';
      }
      return `(connected to ${base}; type \\q to quit)`;
    // ---- Web servers / runtimes
    case 'nginx':
    case 'apache2':
    case 'httpd':
      return sub === '-t' ? 'syntax is ok\nconfiguration test is successful' : `(${base} ${sub || 'reload'} succeeded)`;
    // ---- Container / cloud-native add-ons
    case 'podman':
    case 'buildah':
    case 'skopeo':
    case 'oc':
    case 'k9s':
    case 'kind':
    case 'k3d':
    case 'k3s':
      return `(${base} ${sub || ''} succeeded)`;
    case 'cosign':
      return sub === 'sign' ? 'tlog entry created with index: 12345' : 'Verified OK';
    case 'syft':
    case 'grype':
      return base === 'syft'
        ? 'NAME              VERSION    TYPE\nopenssl           3.0.7      apk\nzlib              1.2.13     apk'
        : 'NAME              INSTALLED  FIXED-IN  TYPE  VULNERABILITY  SEVERITY\nopenssl           3.0.7      3.0.8     apk   CVE-2023-XXXX  Medium';
    case 'opa':
      return sub === 'eval' ? '{\n  "result": [{ "expressions": [{ "value": true }]}]\n}' : `(opa ${sub || ''} completed)`;
    // ---- IaC + cloud
    case 'pulumi':
    case 'bicep':
    case 'arm':
    case 'cdk':
    case 'azd':
      return `(${base} ${sub || ''} succeeded)`;
    // ---- Generic plausible fallback for any reasonable token
    default: {
      // Treat anything that looks like a real command as a successful no-op
      // rather than failing — keeps simulations alive.
      if (/^[a-z][a-z0-9_-]{1,40}$/i.test(base || '')) {
        if (sub) return `(${base} ${sub} completed)`;
        return `(${base} completed)`;
      }
      return null;
    }
  }
};

interface TerminalProps {
  initialMessage?: string;
  availableCommands?: string[];
  onCommand?: (command: string) => string;
  flavor?: LinuxFlavor;
  currentStep?: LabStep;
  allSteps?: LabStep[];
  currentStepIndex?: number;
  onNext?: () => void;
  onPrev?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  onComplete?: () => void;
  onStepComplete?: (stepId: string) => void;
  xpReward?: number;
  // Real terminal mode — when provided, all input is forwarded to a live container
  sessionId?: string;
  authToken?: string;
  hideSidebar?: boolean;
  runCommandTrigger?: { command: string; timestamp: number } | null;
  checkProgressTrigger?: number | null;
  onCheckingProgressChange?: (isChecking: boolean, progress: number) => void;
}

const SESSION_API = import.meta.env.VITE_SESSION_API_URL ?? 'ws://localhost:3001';

export const Terminal: React.FC<TerminalProps> = ({
  initialMessage = 'Welcome to the Realcloud Sandbox!',
  availableCommands = ['ls', 'pwd', 'whoami', 'date', 'clear'],
  onCommand,
  flavor = 'ubuntu',
  currentStep,
  allSteps = [],
  currentStepIndex = 0,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  onComplete,
  onStepComplete,
  xpReward = 250,
  sessionId,
  authToken,
  hideSidebar = false,
  runCommandTrigger = null,
  checkProgressTrigger = 0,
  onCheckingProgressChange,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCheckingProgress, setIsCheckingProgress] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [virtualFiles, setVirtualFiles] = useState<Record<string, string>>({});
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);
  const [pendingCommand, setPendingCommand] = useState<string | null>(null);
  const [isSudoAuthenticated, setIsSudoAuthenticated] = useState(false);
  const [sudoAuthTimeout, setSudoAuthTimeout] = useState<NodeJS.Timeout | null>(null);
  const prevStepIndexRef = useRef(currentStepIndex);
  const [stepDir, setStepDir] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const isLiveMode = Boolean(sessionId && authToken);

  // Connect to real container session when sessionId + authToken are provided
  useEffect(() => {
    if (!sessionId || !authToken) return;
    const ws = new WebSocket(
      `${SESSION_API}/sessions?sessionId=${encodeURIComponent(sessionId)}&token=${encodeURIComponent(authToken)}`
    );
    wsRef.current = ws;
    ws.onopen = () => setHistory(h => [...h, '\r\n\x1b[32m● Connected to live environment\x1b[0m\r\n']);
    ws.onmessage = (evt) => setHistory(h => [...h, evt.data as string]);
    ws.onerror = () => setHistory(h => [...h, '\r\n\x1b[31m● Connection error — falling back to simulator\x1b[0m\r\n']);
    ws.onclose = () => setHistory(h => [...h, '\r\n\x1b[33m● Session closed\x1b[0m\r\n']);
    return () => ws.close();
  }, [sessionId, authToken]);

  const SUDO_PASSWORD = 'cloudlabs123';

  // Clear sudo authentication after 5 minutes of inactivity (simulated)
  const refreshSudoAuth = () => {
    setIsSudoAuthenticated(true);
    if (sudoAuthTimeout) clearTimeout(sudoAuthTimeout);
    const timeout = setTimeout(() => {
      setIsSudoAuthenticated(false);
    }, 5 * 60 * 1000); 
    setSudoAuthTimeout(timeout);
  };

  const [fileSystem, setFileSystem] = useState<Record<string, string[]>>({
    '/': ['bin', 'etc', 'home', 'var', 'tmp', 'usr', 'root', 'dev', 'proc'],
    '/bin': ['bash', 'ls', 'pwd', 'cat', 'mkdir', 'touch', 'rm', 'cp', 'mv', 'echo', 'ps', 'apt', 'top', 'uname'],
    '/etc': ['passwd', 'shadow', 'group', 'hosts', 'hostname', 'network', 'ssh', 'os-release'],
    '/home': ['user'],
    '/home/user': ['Documents', 'Downloads', 'README.md', 'projects'],
    '/home/user/Documents': ['notes.txt', 'budget.xlsx'],
    '/home/user/Downloads': ['installer.sh'],
    '/home/user/projects': ['cloud-app', 'devops-scripts'],
    '/var': ['log', 'mail', 'spool', 'www'],
    '/tmp': []
  });

  const bootSequence = [
    `[    0.000000] Linux version 5.15.0-generic (buildd@lgw01-amd64-060) (${flavor})`,
    `[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-generic root=UUID=... ro quiet flavor=${flavor}`,
    '[    0.052341] x86/fpu: Supporting XSAVE feature 0x001: \'x87 floating point registers\'',
    '[    0.052342] x86/fpu: Supporting XSAVE feature 0x002: \'SSE registers\'',
    '[    0.124512] Memory: 8142340K/8388608K available (16384K kernel code, 2340K rwdata...)',
    '[    0.451234] Checking connectivity... OK',
    '[    0.891231] Initializing Realcloud Virtual Environment...',
    '[    1.234121] Mounting root filesystem... OK',
    '[    1.567123] Starting system services...',
    '[    1.890123] Loading network drivers... OK',
    '[    2.123451] Configuring network interfaces... OK',
    '[    2.456781] Starting SSH daemon... OK',
    '[    2.789012] System ready.',
    '',
    initialMessage || 'Welcome to the Realcloud Sandbox!',
    'Default user: user',
    'Password: cloudlabs123',
    'Type "help" to see available commands.',
    ''
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setHistory(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
        setBootProgress((currentLine / bootSequence.length) * 100);
      } else {
        setIsBooting(false);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Immediate scroll on history change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Fallback scroll to handle rendering delays with a small timeout
    const timeoutId = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [history, isExecuting, isBooting]);

  useEffect(() => {
    if (currentStepIndex !== prevStepIndexRef.current) {
      setStepDir(currentStepIndex > prevStepIndexRef.current ? 1 : -1);
      prevStepIndexRef.current = currentStepIndex;
    }
  }, [currentStepIndex]);

  // Run command from external trigger
  useEffect(() => {
    if (runCommandTrigger && runCommandTrigger.command) {
      runCommandWithSudoCheck(runCommandTrigger.command);
    }
  }, [runCommandTrigger]);

  // Run progress check from external trigger
  useEffect(() => {
    if (checkProgressTrigger && checkProgressTrigger > 0) {
      handleCheckProgress();
    }
  }, [checkProgressTrigger]);

  // Notify parent component about checking progress state
  useEffect(() => {
    if (onCheckingProgressChange) {
      onCheckingProgressChange(isCheckingProgress, progressPercentage);
    }
  }, [isCheckingProgress, progressPercentage]);

  const handleCommand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBooting || isExecuting || !input.trim()) return;
    const cmd = input.trim();
    await runCommandWithSudoCheck(cmd);
  };

  const handleCommandClick = async (cmd: string) => {
    if (isBooting || isExecuting) return;
    // Set input first for visual feedback
    setInput(cmd);
    await runCommandWithSudoCheck(cmd);
  };

  const runCommandWithSudoCheck = async (cmd: string) => {
    // Live mode: forward directly to the container via WebSocket
    if (isLiveMode && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(cmd + '\n');
      setInput('');
      return;
    }

    // Add command to history immediately (handle password separately) using the original cmd
    if (isWaitingForPassword) {
      setHistory(prev => [...prev, '●●●●●●●●']); // Mask password in history
    } else {
      setHistory(prev => [...prev, `user@${flavor}:${currentDir}$ ${cmd}`]);
    }
    
    setIsExecuting(true);

    if (isWaitingForPassword) {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (cmd === SUDO_PASSWORD) {
        setHistory(prev => [...prev, 'Access granted. Executing pending command...']);
        setIsWaitingForPassword(false);
        refreshSudoAuth();
        const originalCmd = pendingCommand || '';
        setPendingCommand(null);
        // Process the original command that was waiting for sudo
        await processActualCommand(originalCmd);
      } else {
        setHistory(prev => [...prev, 'sudo: 1 incorrect password attempt', '[sudo] password for user: ']);
        setIsExecuting(false);
      }
      setInput('');
      return;
    }

    // Normalize command for all subsequent mock shell processing
    const normalizedCmd = normalizeCommandToLinux(cmd);
    const args = normalizedCmd.split(' ');
    const baseCmd = args[0].toLowerCase();

    // Check if it's a sudo command
    if (baseCmd === 'sudo') {
      if (isSudoAuthenticated) {
        // Already authenticated, just process the command
        const originalCmd = normalizedCmd.replace(/^sudo\s+/, '');
        await processActualCommand(originalCmd);
        setInput('');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setHistory(prev => [
        ...prev, 
        '[sudo] password for user: ',
        '[HINT] Use password: cloudlabs123'
      ]);
      setIsWaitingForPassword(true);
      setPendingCommand(normalizedCmd.replace(/^sudo\s+/, '')); // Save the remainder of the command
      setIsExecuting(false);
      setInput('');
      return;
    }

    await processActualCommand(normalizedCmd);
    setInput('');
  };

  const processActualCommand = async (cmd: string) => {
    // Handle multi-line commands (e.g. heredoc + follow-up command).
    // Pattern: `cat <<EOF > filename.yaml\n<content>\nEOF\n<more commands>`
    if (cmd.includes('\n')) {
      const heredocMatch = cmd.match(/^([\s\S]*?)cat\s+<<\s*EOF\s*>\s*([^\s\n]+)\n([\s\S]*?)\nEOF\s*\n?([\s\S]*)$/);
      if (heredocMatch) {
        const [, before, fileName, fileContent, after] = heredocMatch;
        setIsExecuting(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        const lines = fileContent.split('\n');
        setHistory(prev => [
          ...prev,
          `[FILE] Writing ${fileName} (${lines.length} lines):`,
          '─── BEGIN ' + fileName + ' ───',
          ...lines,
          '─── END ' + fileName + ' ───',
          `[OK] Wrote ${fileName}`
        ]);
        setIsExecuting(false);

        const resolvedPath = fileName.startsWith('/') ? fileName : (currentDir === '/' ? `/${fileName}` : `${currentDir}/${fileName}`);
        const parentDir = resolvedPath.substring(0, resolvedPath.lastIndexOf('/')) || '/';
        const baseName = resolvedPath.substring(resolvedPath.lastIndexOf('/') + 1);
        if (fileSystem[parentDir]) {
          if (!fileSystem[parentDir].includes(baseName)) {
            setFileSystem(prev => ({
              ...prev,
              [parentDir]: [...(prev[parentDir] || []), baseName]
            }));
          }
          setVirtualFiles(prev => ({
            ...prev,
            [resolvedPath]: fileContent
          }));
        }
        // Run any leading or trailing commands sequentially
        const remaining = [before, after].map(s => s.trim()).filter(Boolean).join('\n');
        if (remaining) {
          for (const sub of remaining.split('\n').map(s => s.trim()).filter(Boolean)) {
            setHistory(prev => [...prev, `user@${flavor}:${currentDir}$ ${sub}`]);
            await processActualCommand(sub);
          }
        }
        setInput('');
        return;
      }
      // Generic multi-line: run each non-empty line in sequence
      for (const sub of cmd.split('\n').map(s => s.trim()).filter(Boolean)) {
        setHistory(prev => [...prev, `user@${flavor}:${currentDir}$ ${sub}`]);
        await processActualCommand(sub);
      }
      setInput('');
      return;
    }

    // Handle && chaining — run each part sequentially
    if (cmd.includes(' && ')) {
      const parts = cmd.split(' && ').map(s => s.trim()).filter(Boolean);
      for (const part of parts) {
        setHistory(prev => [...prev, `user@${flavor}:${currentDir}$ ${part}`]);
        await processActualCommand(part);
      }
      setInput('');
      return;
    }

    let isRedirecting = false;
    let redirectMode: 'overwrite' | 'append' = 'overwrite';
    let redirectFile = '';
    let commandToRun = cmd;

    const redirectMatch = cmd.match(/(.*?)\s+(>>|>)\s+(.*)/);
    if (redirectMatch) {
      commandToRun = redirectMatch[1].trim();
      redirectMode = redirectMatch[2] === '>>' ? 'append' : 'overwrite';
      redirectFile = redirectMatch[3].trim();
      if ((redirectFile.startsWith('"') && redirectFile.endsWith('"')) || 
          (redirectFile.startsWith("'") && redirectFile.endsWith("'"))) {
        redirectFile = redirectFile.slice(1, -1);
      }
      isRedirecting = true;
    }

    const args = commandToRun.split(' ');
    const baseCmd = args[0].toLowerCase();

    // Simulate different processing times based on command
    let processDelay = 600; // Default minimal delay
    
    if (cmd.includes('install') || cmd.includes('deploy') || cmd.includes('apply')) {
      processDelay = 1500 + Math.random() * 1000;
    } else if (cmd.includes('curl') || cmd.includes('get')) {
      processDelay = 800 + Math.random() * 500;
    }

    // Wait for the simulated process
    await new Promise(resolve => setTimeout(resolve, processDelay));

    if (baseCmd === 'clear') {
      setHistory([]);
      setIsExecuting(false);
    } else {
      let output = '';
      
      // Check for built-in commands first
      switch (baseCmd) {
        case 'ls': {
          let targetPath = currentDir;
          const pathArg = args.find(a => !a.startsWith('-') && a !== baseCmd);
          
          if (pathArg) {
            if (pathArg.startsWith('/')) {
              targetPath = pathArg;
            } else {
              targetPath = currentDir === '/' ? `/${pathArg}` : `${currentDir}/${pathArg}`;
            }
          }

          // Normalize path (remove trailing slash)
          if (targetPath.length > 1 && targetPath.endsWith('/')) {
            targetPath = targetPath.slice(0, -1);
          }

          if (fileSystem[targetPath]) {
            // Permission check for sensitive files
            const sensitiveFiles = ['/etc/shadow', '/etc/sudoers', '/root'];
            const isSensitive = sensitiveFiles.some(f => targetPath.startsWith(f));
            
            if (isSensitive && !isSudoAuthenticated) {
              output = `ls: cannot open directory '${targetPath}': Permission denied`;
            } else {
              const files = [...fileSystem[targetPath]];
              if (args.includes('-a')) {
                files.unshift('.', '..');
              }
              output = files.join('  ');
            }
          } else {
            output = `ls: cannot access '${pathArg}': No such file or directory`;
          }
          break;
        }
        case 'pwd':
          output = currentDir;
          break;
        case 'whoami':
          output = 'user';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case 'cat': {
          const path = args[1];
          if (!path) {
            output = 'cat: missing file operand';
          } else {
            const resolvedPath = path.startsWith('/') ? path : (currentDir === '/' ? `/${path}` : `${currentDir}/${path}`);
            if (virtualFiles[resolvedPath] !== undefined) {
              output = virtualFiles[resolvedPath];
            } else if (path.toLowerCase() === 'readme.md' || resolvedPath === '/home/user/README.md') {
              output = '# Welcome to Realcloud\nThis is a simulated Linux environment for learning cloud engineering and DevOps.';
            } else if (resolvedPath === '/etc/passwd') {
              output = 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash';
            } else if (resolvedPath === '/etc/os-release') {
              if (flavor === 'ubuntu') {
                output = 'PRETTY_NAME="Ubuntu 22.04.3 LTS"\nNAME="Ubuntu"\nVERSION_ID="22.04"\nID=ubuntu\nID_LIKE=debian';
              } else if (flavor === 'centos') {
                output = 'PRETTY_NAME="CentOS Linux 7 (Core)"\nNAME="CentOS Linux"\nVERSION_ID="7"\nID="centos"\nID_LIKE="rhel fedora"';
              } else if (flavor === 'rhel') {
                output = 'PRETTY_NAME="Red Hat Enterprise Linux 9.2 (Plow)"\nNAME="Red Hat Enterprise Linux"\nVERSION_ID="9.2"\nID="rhel"\nID_LIKE="fedora"';
              } else {
                output = 'PRETTY_NAME="Alpine Linux v3.15"\nNAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.15.0';
              }
            } else {
              output = `cat: ${path}: No such file or directory`;
            }
          }
          break;
        }
        case 'mkdir': {
          const hasP = args.includes('-p');
          const name = args.slice(1).find(arg => !arg.startsWith('-'));
          if (!name) {
            output = 'mkdir: missing operand';
          } else {
            let targetPath = name.startsWith('/') ? name : (currentDir === '/' ? `/${name}` : `${currentDir}/${name}`);
            if (targetPath.length > 1 && targetPath.endsWith('/')) targetPath = targetPath.slice(0, -1);
            
            const parts = targetPath.split('/').filter(Boolean);
            let success = true;
            
            if (hasP) {
              let tempFS = { ...fileSystem };
              for (let i = 0; i < parts.length; i++) {
                const parent = '/' + parts.slice(0, i).join('/');
                const currentName = parts[i];
                const fullPath = parent === '/' ? `/${currentName}` : `${parent}/${currentName}`;
                
                if (!tempFS[parent]) {
                  success = false;
                  break;
                }
                
                if (!tempFS[parent].includes(currentName)) {
                  tempFS[parent] = [...tempFS[parent], currentName];
                }
                if (!tempFS[fullPath]) {
                  tempFS[fullPath] = [];
                }
              }
              if (success) {
                setFileSystem(tempFS);
                output = `Created directory ${name}`;
              } else {
                output = `mkdir: cannot create directory '${name}': No such file or directory`;
              }
            } else {
              const parentDir = targetPath.substring(0, targetPath.lastIndexOf('/')) || '/';
              const baseName = targetPath.substring(targetPath.lastIndexOf('/') + 1);
              
              if (fileSystem[parentDir]) {
                setFileSystem(prev => ({
                  ...prev,
                  [parentDir]: [...(prev[parentDir] || []), baseName],
                  [targetPath]: []
                }));
                output = `Created directory ${baseName}`;
              } else {
                output = `mkdir: cannot create directory '${name}': No such file or directory`;
              }
            }
          }
          break;
        }
        case 'touch': {
          const name = args[1];
          if (!name) {
            output = 'touch: missing file operand';
          } else {
            let targetPath = name.startsWith('/') ? name : (currentDir === '/' ? `/${name}` : `${currentDir}/${name}`);
            if (targetPath.length > 1 && targetPath.endsWith('/')) targetPath = targetPath.slice(0, -1);
            
            const parentDir = targetPath.substring(0, targetPath.lastIndexOf('/')) || '/';
            const baseName = targetPath.substring(targetPath.lastIndexOf('/') + 1);
            
            if (fileSystem[parentDir]) {
              setFileSystem(prev => ({
                ...prev,
                [parentDir]: prev[parentDir].includes(baseName) ? prev[parentDir] : [...prev[parentDir], baseName]
              }));
              setVirtualFiles(prev => ({
                ...prev,
                [targetPath]: prev[targetPath] !== undefined ? prev[targetPath] : ''
              }));
              output = `Created file ${baseName}`;
            } else {
              output = `touch: cannot touch '${name}': No such file or directory`;
            }
          }
          break;
        }
        case 'func': {
          const funcSub = args[1];
          if (funcSub === 'init') {
            const projectName = args[2];
            if (!projectName) {
              output = 'func: project name required';
            } else {
              const projectPath = currentDir === '/' ? `/${projectName}` : `${currentDir}/${projectName}`;
              const baseName = projectName.replace(/^.*\//, '');
              setFileSystem(prev => ({
                ...prev,
                [currentDir]: [...(prev[currentDir] || []), baseName],
                [projectPath]: ['host.json', 'local.settings.json', 'requirements.txt', '.gitignore'],
              }));
              output = `Writing ${projectName}/host.json\nWriting ${projectName}/local.settings.json\nWriting ${projectName}/requirements.txt\nWriting ${projectName}/.gitignore\n\nYour project is now ready. Run 'func new' to add a function.`;
            }
          } else if (funcSub === 'new') {
            const nameIdx = args.indexOf('--name');
            const funcName = nameIdx !== -1 ? args[nameIdx + 1] : null;
            if (!funcName) {
              output = 'func: --name is required';
            } else {
              const funcPath = currentDir === '/' ? `/${funcName}` : `${currentDir}/${funcName}`;
              setFileSystem(prev => ({
                ...prev,
                [currentDir]: [...(prev[currentDir] || []), funcName],
                [funcPath]: ['__init__.py', 'function.json'],
              }));
              output = `Select a number for template:\n1. EventHubTrigger\n2. HttpTrigger\n3. TimerTrigger\n\nWriting ${funcName}/__init__.py\nWriting ${funcName}/function.json\n\nThe function "${funcName}" was successfully created.`;
            }
          } else if (funcSub === 'start') {
            output = 'Azure Functions Core Tools\nCore Tools Version: 4.x\n\nFunctions:\n\tProcessEvents: eventhubTrigger\n\nFor detailed output, run func with --verbose flag.';
          } else {
            output = `(func ${funcSub || ''} completed)`;
          }
          break;
        }
        case 'rm': {
          const name = args[1];
          if (!name) {
            output = 'rm: missing operand';
          } else {
            let targetPath = name.startsWith('/') ? name : (currentDir === '/' ? `/${name}` : `${currentDir}/${name}`);
            if (targetPath.length > 1 && targetPath.endsWith('/')) targetPath = targetPath.slice(0, -1);
            
            const parentDir = targetPath.substring(0, targetPath.lastIndexOf('/')) || '/';
            const baseName = targetPath.substring(targetPath.lastIndexOf('/') + 1);
            
            if (fileSystem[parentDir] && fileSystem[parentDir].includes(baseName)) {
              setFileSystem(prev => {
                const newParent = prev[parentDir].filter(f => f !== baseName);
                const nextFs = { ...prev, [parentDir]: newParent };
                if (nextFs[targetPath]) delete nextFs[targetPath];
                return nextFs;
              });
              output = `Removed ${baseName}`;
            } else {
              output = `rm: cannot remove '${name}': No such file or directory`;
            }
          }
          break;
        }
        case 'apt':
          if (flavor === 'ubuntu') {
            output = 'Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nAll packages are up to date.';
          } else {
            output = `bash: apt: command not found (Did you mean ${flavor === 'centos' || flavor === 'rhel' ? 'yum' : 'apk'}?)`;
          }
          break;
        case 'yum':
        case 'dnf':
          if (flavor === 'centos' || flavor === 'rhel') {
            output = `Loaded plugins: fastestmirror, ovl\nLoading mirror speeds from cached hostfile\nNo packages marked for update on ${flavor.toUpperCase()}`;
          } else {
            output = `bash: ${baseCmd}: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'apk'}?)`;
          }
          break;
        case 'apk':
          if (flavor === 'alpine') {
            output = 'fetch https://dl-cdn.alpinelinux.org/alpine/v3.15/main/x86_64/APKINDEX.tar.gz\nOK: 0 distinct packages available';
          } else {
            output = `bash: apk: command not found (Did you mean ${flavor === 'ubuntu' ? 'apt' : 'yum'}?)`;
          }
          break;
        case 'top':
          output = 'top - 15:32:40 up 1 min, 1 user, load average: 0.00, 0.00, 0.00\nTasks: 1 total, 0 running, 1 sleeping, 0 stopped, 0 zombie\n%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st';
          break;
        case 'uname':
          if (args.includes('-a')) {
            const flavorInfo = flavor === 'ubuntu' ? 'Ubuntu' : flavor === 'centos' ? 'CentOS' : flavor === 'rhel' ? 'Red Hat' : 'Alpine';
            output = `Linux realcloud 5.15.0-generic #54-${flavorInfo} SMP x86_64 GNU/Linux`;
          } else {
            output = 'Linux';
          }
          break;
        case 'echo': {
          let text = args.slice(1).join(' ');
          if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
            text = text.slice(1, -1);
          }
          output = text;
          break;
        }
        case 'ps':
          output = '  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps';
          break;
        case 'cp':
          output = args[1] && args[2] ? `Copied ${args[1]} to ${args[2]}` : 'cp: missing file operand';
          break;
        case 'chown':
          output = '';
          break;
        case 'chmod':
          output = '';
          break;
        case 'mv':
          output = args[1] && args[2] ? `Moved ${args[1]} to ${args[2]}` : 'mv: missing destination file operand';
          break;
        case 'cd': {
          const path = args[1];
          if (!path || path === '~') {
            setCurrentDir('/home/user');
          } else if (path === '..') {
            const parts = currentDir.split('/').filter(Boolean);
            parts.pop();
            setCurrentDir('/' + parts.join('/'));
          } else if (path === '/') {
            setCurrentDir('/');
          } else {
            let targetPath = path.startsWith('/') ? path : (currentDir === '/' ? `/${path}` : `${currentDir}/${path}`);
            // Normalize path
            if (targetPath.length > 1 && targetPath.endsWith('/')) {
              targetPath = targetPath.slice(0, -1);
            }
            if (fileSystem[targetPath]) {
              setCurrentDir(targetPath);
            } else {
              output = `bash: cd: ${path}: No such file or directory`;
            }
          }
          break;
        }
        case 'etcdctl':
          output = 'ETCDCTL_API=3\nCONNECTED TO: 127.0.0.1:2379\nTYPE: etcd\nVERSION: 3.5.0';
          if (args.includes('member') && args.includes('list')) {
            output = '8e9e05f521f7e920, started, control-plane, http://127.0.0.1:2380, http://127.0.0.1:2379, false';
          } else if (args.includes('snapshot') && args.includes('save')) {
            output = `Snapshot saved at ${args[args.indexOf('save') + 1] || '/tmp/snapshot.db'}`;
          }
          break;
        case 'helm':
          output = 'version.BuildInfo{Version:"v3.8.0", GitCommit:"d14138609b018ee6f926b0d3cbd0d97311601a6b", GitTreeState:"clean", GoVersion:"go1.17.5"}';
          if (args.includes('list')) {
            output = 'NAME          \tNAMESPACE\tREVISION\tUPDATED                                \tSTATUS  \tCHART       \tAPP VERSION\nnginx-ingress \tdefault  \t1       \t2026-03-15 10:22:45.123456 -0700 MST\tdeployed\tnginx-1.1.0\t1.16.0';
          }
          break;
        case 'kubeadm':
          output = 'kubeadm version: &version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.0", GitCommit:"28c0513881efc9b8c08799981457d9189321f663", GitTreeState:"clean", BuildDate:"2021-12-07T18:31:53Z", GoVersion:"go1.17.3", Compiler:"gc", Platform:"linux/amd64"}';
          if (args.includes('upgrade') && args.includes('plan')) {
            output = 'Upgrade to the latest stable version: v1.23.5\nCOMPONENT   CURRENT       AVAILABLE\nKubelet     v1.23.0       v1.23.5\nAPI Server  v1.23.0       v1.23.5';
          } else if (args.includes('certs') && args.includes('check-expiration')) {
            output = 'CERTIFICATE                EXPIRES                     RESIDUAL TIME   CERTIFICATE AUTHORITY   EXTERNALLY MANAGED\napiserver                  Mar 15, 2027 10:22 UTC      364d            ca                      no';
          }
          break;
        case 'kube-bench':
          output = '[INFO] 1 Master Node Security Configuration\n[INFO] 1.1 Control Plane Configuration\n[PASS] 1.1.1 Ensure that the API server pod specification file permissions are set to 644\n[PASS] 1.1.2 Ensure that the API server pod specification file ownership is set to root:root\n\n== Summary ==\n45 checks PASS\n2 checks FAIL\n0 checks WARN\n0 checks INFO';
          break;
        case 'kubectl': {
          const sub = args[1];
          if (!sub || sub === '--help' || sub === 'help') {
            output = 'kubectl controls the Kubernetes cluster manager.\n\nUsage:\n  kubectl [command] [flags]\n\nAvailable Commands:\n  get             Display one or many resources\n  describe        Show details of a specific resource or group of resources\n  create          Create a resource from a file or from stdin\n  delete          Delete resources by filenames, stdin, resources and names, or by resources and label selector\n  apply           Apply a configuration to a resource by filename or stdin\n  exec            Execute a command in a container';
          } else if (sub === 'cluster-info') {
            output = 'Kubernetes control plane is running at https://127.0.0.1:6443\nCoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy\n\nTo further debug and diagnose cluster problems, use \'kubectl cluster-info dump\'.';
          } else if (sub === 'get') {
            const resource = args[2];
            if (resource === 'nodes' || resource === 'node') {
              output = 'NAME            STATUS   ROLES                  AGE   VERSION\ncontrol-plane   Ready    control-plane,master   12d   v1.29.0\nworker-01       Ready    <none>                 12d   v1.29.0\nworker-02       Ready    <none>                 12d   v1.29.0';
            } else if (resource === 'ns' || resource === 'namespace' || resource === 'namespaces') {
              const specificNs = args[3];
              if (specificNs) {
                output = `NAME      STATUS   AGE\n${specificNs}   Active   15s`;
              } else {
                output = 'NAME              STATUS   AGE\ndefault           Active   12d\nkube-system       Active   12d\nkube-public       Active   12d\nkube-node-lease   Active   12d\nargocd            Active   10s';
              }
            } else if (resource === 'pods' || resource === 'pod') {
              output = 'NAME                     READY   STATUS    RESTARTS   AGE\nnginx-6799fc88d8-7p9z2   1/1     Running   0          4h\nredis-5f4b9f9-m2k1x      1/1     Running   0          2h';
            } else if (resource === 'deployments' || resource === 'deployment' || resource === 'deploy') {
              output = 'NAME    READY   UP-TO-DATE   AVAILABLE   AGE\nnginx   1/1     1            1           4h\nredis   1/1     1            1           2h';
            } else if (resource === 'svc' || resource === 'services' || resource === 'service') {
              output = 'NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE\nkubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   12d\nnginx-svc    ClusterIP   10.96.0.45   <none>        80/TCP    4h';
            } else if (resource === 'netpol' || resource === 'networkpolicies') {
              output = 'NAME             POD-SELECTOR   AGE\nallow-frontend   app=frontend   4h\ndeny-all         <none>         12d';
            } else if (resource === 'hpa') {
              output = 'NAME        REFERENCE              TARGETS         MINPODS   MAXPODS   REPLICAS   AGE\nweb-hpa     Deployment/web-app     12%/80%         2         10        2          4h';
            } else {
              output = `No resources found in default namespace.`;
            }
          } else if (sub === 'describe') {
            output = `Name: ${args[3] || 'resource'}\nNamespace: default\nStatus: Running\nIP: 10.244.0.123\nControlled By: ReplicaSet/nginx-6799fc88d8`;
          } else if (sub === 'create') {
            const what = args[2];
            const name = args[3];
            if (what === 'namespace' || what === 'ns') {
              output = `namespace/${name || 'new-namespace'} created`;
            } else {
              output = `${what || 'resource'}/${name || 'resource'} created`;
            }
          } else {
            output = `Command "kubectl ${sub}" executed successfully.`;
          }
          break;
        }
        case 'git':
          if (!args[1]) {
            output = 'usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]';
          } else if (args[1] === 'status') {
            output = 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean';
          } else if (args[1] === 'log') {
            output = 'commit 8e9e05f5 (HEAD -> main, origin/main)\nAuthor: Engineer <dev@realcloud.io>\nDate:   Fri May 1 12:00:00 2026 +0000\n\n    feat: implement high-fidelity simulations';
          } else {
            output = `Command "git ${args[1]}" executed successfully.`;
          }
          break;
        case 'go':
          if (args[1] === 'version') {
            output = 'go version go1.18.1 linux/amd64';
          } else {
            output = 'Go is a tool for managing Go source code.\n\nUsage:\n\n\tgo <command> [arguments]';
          }
          break;
        case 'cargo':
          output = 'cargo 1.60.0 (d1fd93f2c 2022-03-23)';
          break;
        case 'rustc':
          output = 'rustc 1.60.0 (d1fd93f2c 2022-03-23)';
          break;
        case 'g++':
        case 'gcc':
          output = 'g++ (Ubuntu 11.2.0-19ubuntu1) 11.2.0';
          break;
        case 'npm':
          output = '8.5.0';
          break;
        case 'npx':
          output = '8.5.0';
          break;
        case 'terraform':
          output = 'Terraform v1.1.7\non linux_amd64';
          if (args.includes('plan')) {
            output = 'Terraform will perform the following actions:\n\n  # aws_instance.web will be created\n  + resource "aws_instance" "web" {\n      + ami                          = "ami-0c55b159cbfafe1f0"\n      + instance_type                = "t2.micro"\n    }\n\nPlan: 1 to add, 0 to change, 0 to destroy.';
          }
          break;
        case 'ansible':
        case 'ansible-playbook':
          output = 'ansible-playbook [core 2.12.3]\n  config file = /etc/ansible/ansible.cfg\n  configured module search path = [\'/home/user/.ansible/plugins/modules\']';
          if (baseCmd === 'ansible' && args.includes('-m') && args.includes('ping')) {
            output = 'localhost | SUCCESS => {\n    "changed": false, \n    "ping": "pong"\n}';
          }
          break;
        case 'argocd':
          output = 'argocd controls the Argo CD server.\n\nUsage:\n  argocd [command] [flags]';
          if (args.includes('app') && (args.includes('list') || args.includes('get'))) {
            output = 'NAME      CLUSTER                         NAMESPACE  STATUS    HEALTH   REVISION  \nweb-app   https://kubernetes.default.svc  default    Synced    Healthy  main/7e1a2f';
          } else if (args.includes('sync')) {
            output = 'Project:            default\nStatus:             Synced\nHealth Status:      Healthy\nOperation:          Sync\nPhase:              Succeeded';
          }
          break;
        case 'trivy':
          output = 'trivy v0.24.2';
          if (args.includes('image') || args.includes('k8s') || args.includes('rootfs')) {
            output = 'Scanning... \n\nTotal: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)\nNo vulnerabilities found.';
          }
          break;
        case 'vault':
          output = 'Vault v1.9.3\n\nUsage: vault <command> [args]';
          if (args.includes('read') || args.includes('get')) {
            output = 'Key                 Value\n---                 -----\napi_key             re_live_8e9e05f5...\ndb_password         ********\nstatus              active';
          }
          break;
        case 'istioctl':
          output = 'istioctl v1.13.2';
          if (args.includes('analyze')) {
            output = '✔ No validation issues found when analyzing namespace: default.';
          } else if (args.includes('proxy-status')) {
            output = 'NAME                                                   CDS        LDS        EDS        RDS        ISTIOD                      VERSION\nweb-app-7e1a2f-8b9c.default                            Synced     Synced     Synced     Synced     istiod-7b9f8d8f-m2k1x       1.13.2';
          }
          break;
        case 'promtool':
          output = 'promtool, version 2.33.1';
          if (args.includes('check') && args.includes('config')) {
            output = 'Checking prometheus.yml\n  SUCCESS: 1 rule files found';
          } else if (args.includes('query')) {
            output = 'prometheus_http_requests_total{code="200",handler="/api/v1/query"} 42\nnode_cpu_seconds_total{mode="idle"} 3456.78';
          }
          break;
        case 'logcli':
          output = 'logcli v2.4.2';
          if (args.includes('query')) {
            output = '2026-05-01T12:00:00Z {app="frontend"} level=info msg="User login successful"\n2026-05-01T12:01:00Z {app="frontend"} level=warn msg="Latency peak detected"';
          }
          break;
        case 'jenkins-cli':
          output = 'Jenkins CLI v2.332.1';
          if (args.includes('build')) {
            output = 'Build #42 of main-pipeline has been scheduled and is now running.';
          }
          break;
        case 'help':
          output = `Available commands: ${[...availableCommands, 'git', 'terraform', 'ansible', 'kubectl', 'helm', 'argocd', 'flux', 'trivy', 'vault', 'istioctl', 'promtool', 'logcli', 'jenkins-cli', 'etcdctl', 'kubeadm', 'kube-bench', 'cat', 'mkdir', 'touch', 'rm', 'sudo', 'apt', 'top', 'uname', 'echo', 'ps', 'cp', 'mv', 'cd'].join(', ')}, help, clear`;
          break;
        default: {
          // Check if the user is typing a directory path or a directory definition
          const dirDescriptions: Record<string, string> = {
            '/bin': 'Essential user binaries (e.g., ls, cd, cat).',
            'bin': 'Essential user binaries (e.g., ls, cd, cat).',
            '/etc': 'System-wide configuration files.',
            'etc': 'System-wide configuration files.',
            '/home': 'User home directories.',
            'home': 'User home directories.',
            '/var': 'Variable data files like logs and databases.',
            'var': 'Variable data files like logs and databases.',
            '/tmp': 'Temporary files.',
            'tmp': 'Temporary files.',
            '/usr': 'User utilities and applications.',
            'usr': 'User utilities and applications.',
            '/root': 'Home directory for the root user.',
            'root': 'Home directory for the root user.',
            '/dev': 'Device files.',
            'dev': 'Device files.',
            '/proc': 'Process information.',
            'proc': 'Process information.'
          };

          const normalizedCmd = baseCmd.endsWith(':') ? baseCmd.slice(0, -1) : baseCmd;
          
          if (dirDescriptions[normalizedCmd]) {
            output = `${normalizedCmd}: ${dirDescriptions[normalizedCmd]}`;
          } else {
            const simulated = simulateLabCommand(cmd, args);
            if (simulated !== null) {
              output = simulated;
            } else if (onCommand) {
              output = onCommand(cmd.toLowerCase());
            } else {
              output = `bash: ${baseCmd}: command not found. Type "help" for a list of commands.`;
            }
          }
        }
      }
      
      if (isRedirecting) {
        const resolvedPath = redirectFile.startsWith('/') ? redirectFile : (currentDir === '/' ? `/${redirectFile}` : `${currentDir}/${redirectFile}`);
        const parentDir = resolvedPath.substring(0, resolvedPath.lastIndexOf('/')) || '/';
        const baseName = resolvedPath.substring(resolvedPath.lastIndexOf('/') + 1);

        if (fileSystem[parentDir]) {
          if (!fileSystem[parentDir].includes(baseName)) {
            setFileSystem(prev => ({
              ...prev,
              [parentDir]: [...(prev[parentDir] || []), baseName]
            }));
          }
          setVirtualFiles(prev => {
            const currentContent = prev[resolvedPath] || '';
            const newContent = redirectMode === 'append'
              ? (currentContent ? currentContent + '\n' + output : output)
              : output;
            return {
              ...prev,
              [resolvedPath]: newContent
            };
          });
          output = '';
        } else {
          output = `bash: ${redirectFile}: No such file or directory`;
        }
      }

      if (output) {
        setHistory(prev => [...prev, output]);
      }
      setIsExecuting(false);
    }

    setInput('');
  };

  const handleCheckProgress = async () => {
    if (isCheckingProgress || !currentStep) return;

    setIsCheckingProgress(true);
    setProgressPercentage(0);
    setHistory(prev => [...prev, `[USER_ACTION] Initiating manual check for: ${currentStep.title}...`]);

    const steps = [
      { p: 10, msg: '[SYSTEM] Initializing validation engine...' },
      { p: 30, msg: '[SYSTEM] Scanning cluster environment...' },
      { p: 50, msg: `[SYSTEM] Verifying resources in namespace: ${flavor === 'ubuntu' ? 'default' : 'monitoring'}...` },
      { p: 70, msg: '[SYSTEM] Comparing current state vs expected output...' },
      { p: 90, msg: '[SYSTEM] Finalizing verification reports...' },
      { p: 100, msg: 'DONE: Success! All checks passed. Mission validated.' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
      setProgressPercentage(step.p);
      setHistory(prev => [...prev, step.msg]);
    }

    setIsCheckingProgress(false);
    if (onStepComplete && currentStep) {
      onStepComplete(currentStep.id);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl font-mono text-sm flex-1 flex flex-row h-full min-h-[400px]">
      {currentStep && !hideSidebar && (
        <div className="w-1/3 flex flex-col text-zinc-300 border-r border-zinc-800 bg-zinc-950 h-full">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
            {allSteps.length > 0 && (
              <div className="mb-8 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Mission Progress</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 relative">
                  {/* Vertical Connection Line */}
                  <div className="absolute left-[9px] top-2 bottom-6 w-0.5 bg-zinc-800 -z-0" />
                  
                  {allSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                        idx === currentStepIndex 
                          ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                          : idx < currentStepIndex
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                      }`}>
                        {idx < currentStepIndex ? '✓' : idx + 1}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-[11px] font-black leading-tight transition-colors uppercase tracking-wider ${
                          idx === currentStepIndex ? 'text-brand-blue' : idx < currentStepIndex ? 'text-emerald-500/80' : 'text-zinc-500'
                        }`}>
                          {step.title}
                        </span>
                        {idx === currentStepIndex && (
                          <span className="text-[9px] text-zinc-400 font-medium animate-pulse">
                            Active Mission
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <AnimatePresence mode="wait" initial={false} custom={stepDir}>
            <motion.div
              key={currentStepIndex}
              custom={stepDir}
              variants={{
                enter: (d: number) => ({ x: d * 60, opacity: 0, scale: 0.97 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: d * -60, opacity: 0, scale: 0.97 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            >
            <h2 className="text-xl font-bold text-brand-blue mb-4">{currentStep.title}</h2>
            <p className="text-sm leading-relaxed mb-6">{(currentStep as any).instruction || (currentStep as any).task}</p>
            
            {currentStep.repository && (
              <div className="mb-6 p-4 bg-zinc-900 rounded-xl border border-white/5">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Official Repository</h4>
                <p className="text-xs text-zinc-400 mb-3">{currentStep.repository.explanation}</p>
                <a href={currentStep.repository.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brand-blue hover:underline">
                  {currentStep.repository.name}
                </a>
              </div>
            )}

            {currentStep.detailedSteps && currentStep.detailedSteps.length > 0 && (
              <div className="mb-6">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Step-by-Step Instructions</h4>
                <div className="space-y-4">
                  {currentStep.detailedSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white mb-1">{step.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep.commands && currentStep.commands.length > 0 && (
              <div className="mb-6">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-3">Target Commands (Click to Run)</h4>
                <div className="space-y-4">
                  {currentStep.commands.map((cmd, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleCommandClick(cmd.text)}
                      disabled={isBooting || isExecuting}
                      className="w-full text-left bg-zinc-950 p-3 rounded-lg border border-white/5 hover:border-brand-blue/30 transition-all group cursor-pointer disabled:cursor-not-allowed"
                    >
                      <div className="font-mono text-xs text-brand-blue mb-1 group-hover:text-white transition-colors">{cmd.text}</div>
                      <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{cmd.explanation}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep.whyNeeded && (
              <div className="bg-zinc-900 p-4 rounded-xl text-xs text-zinc-400 italic mb-4 border border-white/5">
                {currentStep.whyNeeded}
              </div>
            )}
            
            {currentStep.pillarConnection && (
              <div className="bg-zinc-900 p-4 rounded-xl text-xs text-zinc-400 italic border border-white/5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Well-Architected</span>
                {currentStep.pillarConnection}
              </div>
            )}
            </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="p-6 bg-zinc-950 border-t border-zinc-800 space-y-3 shrink-0">
            <button
              onClick={handleCheckProgress}
              disabled={isCheckingProgress || isBooting}
              className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5 relative overflow-hidden ${
                isCheckingProgress 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              {isCheckingProgress && (
                <motion.div 
                  className="absolute inset-0 bg-brand-blue/10 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progressPercentage / 100 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="relative z-10">
                {isCheckingProgress ? `Validating... ${progressPercentage}%` : 'Check Progress'}
              </span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => onPrev?.()}
                disabled={isFirstStep || !onPrev}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 ${(isFirstStep || !onPrev) ? 'text-zinc-600 bg-zinc-900/50 cursor-not-allowed' : 'text-zinc-400 bg-zinc-900 hover:bg-zinc-800'}`}
              >
                Back
              </button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => isLastStep ? onComplete?.() : onNext?.()}
                disabled={!onNext && !onComplete}
                className="flex-[2] py-3 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastStep ? `Complete Lab (+${xpReward} XP)` : 'Next →'}
              </motion.button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full bg-zinc-900">
        <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b border-zinc-700 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
          </div>
          <div className="flex items-center gap-2 ml-4 text-zinc-400">
            <TerminalIcon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest truncate max-w-[300px]">
              {isBooting ? `Booting System... ${Math.round(bootProgress)}%` : currentStep.title}
            </span>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto text-zinc-300 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 hover:scrollbar-thumb-zinc-600 transition-colors"
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line?.includes(`user@${flavor}:`) && line?.includes('$') ? (
                <span className="text-brand-blue font-bold">{line}</span>
              ) : line?.startsWith('[') ? (
                <span className="text-zinc-500 text-xs">{line}</span>
              ) : line}
            </div>
          ))}
          {isBooting && (
            <div className="flex items-center gap-2 text-brand-blue text-xs animate-pulse mt-2">
              <div className="w-1 h-4 bg-brand-blue"></div>
              <span>System initializing...</span>
            </div>
          )}
          {/* Scroll anchor */}
          <div className="h-4 w-full" />
        </div>

        <form 
          onSubmit={handleCommand} 
          className={`p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0 ${(isBooting || isExecuting) ? 'opacity-50' : ''}`}
        >
          <ChevronRight className={`w-4 h-4 text-brand-blue shrink-0 ${(isBooting || isExecuting) ? 'animate-pulse' : ''}`} />
          <input
            type={isWaitingForPassword ? "password" : "text"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isBooting || isExecuting}
            className="bg-transparent border-none outline-none text-zinc-300 w-full focus:ring-0 p-0 font-mono"
            placeholder={isBooting ? "System booting..." : isExecuting ? (isWaitingForPassword ? "Verifying..." : "Processing...") : (isWaitingForPassword ? "Enter password" : "Type a command...")}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
