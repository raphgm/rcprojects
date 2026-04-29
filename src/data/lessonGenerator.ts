import { Lesson } from '../types/content';

// Course-specific topic banks. Each topic has a focus and a sandbox command.
type Topic = { topic: string; cmd: string; focus: string };

const GENERIC: Topic[] = [
  { topic: 'Core Concepts', cmd: 'help', focus: 'Foundational ideas and terminology you will use throughout this course.' },
  { topic: 'Environment Setup', cmd: 'pwd', focus: 'Preparing your workstation and verifying the toolchain.' },
  { topic: 'First Hands-On Exercise', cmd: 'ls', focus: 'A guided first task to build muscle memory.' },
  { topic: 'Common Patterns', cmd: 'echo "pattern"', focus: 'Recurring patterns you will recognize in real systems.' },
  { topic: 'Best Practices', cmd: 'echo "12-factor"', focus: 'Industry-standard practices and why they exist.' },
  { topic: 'Troubleshooting Basics', cmd: 'echo "check logs first"', focus: 'A repeatable diagnostic loop for failures.' },
  { topic: 'Tooling Overview', cmd: 'which bash', focus: 'The CLI and IDE tools every practitioner relies on.' },
  { topic: 'Working With Files', cmd: 'ls -la', focus: 'Reading, writing, and organizing artifacts on disk.' },
  { topic: 'Logging & Output', cmd: 'echo "log line"', focus: 'Structured logging and signal vs noise.' },
  { topic: 'Configuration Management', cmd: 'cat config.example', focus: 'Externalizing configuration from code.' },
  { topic: 'Secrets & Credentials', cmd: 'echo "use a secret manager"', focus: 'Never commit secrets; use a vault.' },
  { topic: 'Automation Scripts', cmd: 'bash --version', focus: 'Turning manual toil into repeatable scripts.' },
  { topic: 'Testing & Validation', cmd: 'echo "run tests"', focus: 'Verifying behavior before shipping.' },
  { topic: 'Performance Awareness', cmd: 'time echo done', focus: 'Measuring before optimizing.' },
  { topic: 'Security Basics', cmd: 'echo "least privilege"', focus: 'Default to least privilege and defense in depth.' },
  { topic: 'Networking Essentials', cmd: 'echo "tcp/ip"', focus: 'How packets travel and where things go wrong.' },
  { topic: 'Observability', cmd: 'echo "metrics, logs, traces"', focus: 'The three pillars of observability.' },
  { topic: 'Reliability Engineering', cmd: 'echo "SLO 99.9"', focus: 'Designing systems that fail gracefully.' },
  { topic: 'Documentation Habits', cmd: 'echo "README first"', focus: 'Documentation as a first-class deliverable.' },
  { topic: 'Capstone Mission', cmd: 'echo "ship it"', focus: 'Bringing the course concepts together end-to-end.' },
];

const SQL: Topic[] = [
  { topic: 'What is SQL', cmd: 'echo "Structured Query Language"', focus: 'Why relational databases still power most of the world.' },
  { topic: 'SELECT Basics', cmd: "echo 'SELECT * FROM users;'", focus: 'Reading rows from a table.' },
  { topic: 'WHERE Filtering', cmd: "echo 'SELECT * FROM users WHERE active=1;'", focus: 'Predicates and indexability.' },
  { topic: 'ORDER BY & LIMIT', cmd: "echo 'SELECT id FROM events ORDER BY ts DESC LIMIT 10;'", focus: 'Sorting and paging.' },
  { topic: 'INSERT / UPDATE / DELETE', cmd: "echo 'INSERT INTO users(name) VALUES (\\'Ada\\');'", focus: 'Mutating data safely.' },
  { topic: 'JOIN Fundamentals', cmd: "echo 'SELECT u.id, o.total FROM users u JOIN orders o USING(user_id);'", focus: 'INNER, LEFT, RIGHT, FULL joins.' },
  { topic: 'GROUP BY & Aggregates', cmd: "echo 'SELECT country, COUNT(*) FROM users GROUP BY country;'", focus: 'COUNT, SUM, AVG and HAVING.' },
  { topic: 'Subqueries', cmd: "echo 'SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);'", focus: 'Correlated and uncorrelated subqueries.' },
  { topic: 'CTEs (WITH)', cmd: "echo 'WITH t AS (SELECT 1) SELECT * FROM t;'", focus: 'Readable composition with common table expressions.' },
  { topic: 'Window Functions', cmd: "echo 'SELECT id, ROW_NUMBER() OVER (PARTITION BY country ORDER BY ts) FROM users;'", focus: 'ROW_NUMBER, RANK, LAG, LEAD.' },
  { topic: 'Indexes', cmd: "echo 'CREATE INDEX idx_users_email ON users(email);'", focus: 'B-tree indexes and selectivity.' },
  { topic: 'Query Plans', cmd: "echo 'EXPLAIN ANALYZE SELECT ...;'", focus: 'Reading execution plans.' },
  { topic: 'Transactions & ACID', cmd: "echo 'BEGIN; UPDATE ...; COMMIT;'", focus: 'Atomicity, consistency, isolation, durability.' },
  { topic: 'Constraints & Keys', cmd: "echo 'PRIMARY KEY, FOREIGN KEY, UNIQUE'", focus: 'Modeling integrity into the schema.' },
  { topic: 'Normalization', cmd: 'echo "1NF -> 2NF -> 3NF"', focus: 'Reducing redundancy with normal forms.' },
  { topic: 'Views', cmd: "echo 'CREATE VIEW active_users AS SELECT * FROM users WHERE active=1;'", focus: 'Logical layers on top of tables.' },
  { topic: 'Stored Procedures', cmd: "echo 'CREATE PROCEDURE ...'", focus: 'Encapsulating logic in the database.' },
  { topic: 'Triggers', cmd: "echo 'CREATE TRIGGER ... AFTER INSERT'", focus: 'Reacting to data changes server-side.' },
  { topic: 'JSON in SQL', cmd: "echo 'SELECT data->>\\'name\\' FROM events;'", focus: 'JSONB columns in PostgreSQL.' },
  { topic: 'Capstone: Reporting Query', cmd: "echo 'SELECT ... FROM ... GROUP BY ... ORDER BY ...;'", focus: 'Build an end-to-end analytical query.' },
];

const PYTHON: Topic[] = [
  { topic: 'Hello, Python', cmd: 'python3 --version', focus: 'Why Python and where it shines.' },
  { topic: 'Variables & Types', cmd: 'python3 -c "print(type(42))"', focus: 'int, float, str, bool, None.' },
  { topic: 'Strings & f-strings', cmd: 'python3 -c "n=\'world\'; print(f\'hello {n}\')"', focus: 'Modern string formatting.' },
  { topic: 'Lists & Tuples', cmd: 'python3 -c "print([1,2,3][::-1])"', focus: 'Sequence types and slicing.' },
  { topic: 'Dicts & Sets', cmd: 'python3 -c "print({\'a\':1}.get(\'a\'))"', focus: 'Hash-based collections.' },
  { topic: 'Control Flow', cmd: 'python3 -c "print(\'odd\' if 3%2 else \'even\')"', focus: 'if / for / while.' },
  { topic: 'Functions', cmd: 'python3 -c "def f(x): return x*2\\nprint(f(3))"', focus: 'Defining reusable behavior.' },
  { topic: 'Comprehensions', cmd: 'python3 -c "print([x*x for x in range(5)])"', focus: 'Pythonic iteration.' },
  { topic: 'Modules & Imports', cmd: 'python3 -c "import math; print(math.pi)"', focus: 'Standard library and packaging.' },
  { topic: 'File I/O', cmd: 'python3 -c "open(\'/tmp/x\',\'w\').write(\'hi\')"', focus: 'Reading and writing files safely.' },
  { topic: 'Exceptions', cmd: 'python3 -c "try: 1/0\\nexcept ZeroDivisionError as e: print(e)"', focus: 'Raising and handling errors.' },
  { topic: 'Classes & Objects', cmd: 'python3 -c "class A: pass\\nprint(A())"', focus: 'OOP fundamentals.' },
  { topic: 'Dataclasses', cmd: 'python3 -c "from dataclasses import dataclass"', focus: 'Boilerplate-free data containers.' },
  { topic: 'Type Hints', cmd: 'python3 -c "def f(x: int) -> int: return x"', focus: 'Static analysis with mypy / pyright.' },
  { topic: 'Iterators & Generators', cmd: 'python3 -c "print(list(x for x in range(3)))"', focus: 'Lazy evaluation and yield.' },
  { topic: 'Decorators', cmd: 'python3 -c "from functools import lru_cache"', focus: 'Higher-order functions in practice.' },
  { topic: 'Virtual Environments', cmd: 'python3 -m venv .venv', focus: 'Isolating project dependencies.' },
  { topic: 'pip & Packaging', cmd: 'pip --version', focus: 'Installing and publishing packages.' },
  { topic: 'Testing with pytest', cmd: 'pytest --version', focus: 'Writing fast, expressive tests.' },
  { topic: 'Capstone: Build a CLI', cmd: 'python3 cli.py --help', focus: 'Putting it all together with argparse.' },
];

const JAVASCRIPT: Topic[] = [
  { topic: 'JavaScript in 2026', cmd: 'node -v', focus: 'The language that runs the web and the server.' },
  { topic: 'let / const / var', cmd: 'node -e "let x=1; console.log(x)"', focus: 'Block scoping and immutability.' },
  { topic: 'Primitives & Objects', cmd: 'node -e "console.log(typeof {})"', focus: 'Value vs reference types.' },
  { topic: 'Functions & Arrows', cmd: 'node -e "const f=x=>x*2; console.log(f(3))"', focus: 'First-class functions and arrows.' },
  { topic: 'Arrays & Methods', cmd: 'node -e "console.log([1,2,3].map(x=>x*2))"', focus: 'map, filter, reduce.' },
  { topic: 'Objects & Destructuring', cmd: 'node -e "const {a}={a:1}; console.log(a)"', focus: 'Unpacking into variables.' },
  { topic: 'Promises', cmd: 'node -e "Promise.resolve(1).then(console.log)"', focus: 'Chaining async work.' },
  { topic: 'async / await', cmd: 'node -e "(async()=>console.log(await 1))()"', focus: 'Synchronous-looking async code.' },
  { topic: 'Modules (ESM)', cmd: 'node --experimental-vm-modules -v', focus: 'import / export and tree shaking.' },
  { topic: 'Error Handling', cmd: 'node -e "try{throw new Error(\'x\')}catch(e){console.log(e.message)}"', focus: 'try/catch and error boundaries.' },
  { topic: 'Closures', cmd: 'node -e "const c=(()=>{let n=0;return()=>++n})();console.log(c(),c())"', focus: 'Captured lexical scope.' },
  { topic: 'Prototypes & Classes', cmd: 'node -e "class A{}; console.log(new A())"', focus: 'Prototype chain and OOP.' },
  { topic: 'Event Loop', cmd: 'node -e "setTimeout(()=>console.log(\'later\'),0); console.log(\'now\')"', focus: 'Microtasks vs macrotasks.' },
  { topic: 'JSON', cmd: 'node -e "console.log(JSON.stringify({a:1}))"', focus: 'Parsing and serializing data.' },
  { topic: 'Fetch & HTTP', cmd: 'node -e "fetch(\'https://example.com\').then(r=>console.log(r.status))"', focus: 'Calling APIs from JS.' },
  { topic: 'npm Basics', cmd: 'npm --version', focus: 'Packages, scripts, and lockfiles.' },
  { topic: 'Testing (Vitest/Jest)', cmd: 'npx vitest --version', focus: 'Unit testing modern JS.' },
  { topic: 'TypeScript Glimpse', cmd: 'tsc --version', focus: 'Why teams add types.' },
  { topic: 'Tooling (ESLint/Prettier)', cmd: 'npx eslint --version', focus: 'Lint and format on save.' },
  { topic: 'Capstone: Build a Mini App', cmd: 'node app.js', focus: 'Compose everything into a small app.' },
];

const SECURITY: Topic[] = [
  { topic: 'Threat Modeling 101', cmd: 'echo "STRIDE"', focus: 'Spoof, Tamper, Repudiate, Info-Disclose, DoS, Elevate.' },
  { topic: 'CIA Triad', cmd: 'echo "Confidentiality Integrity Availability"', focus: 'The bedrock of every control.' },
  { topic: 'Authentication', cmd: 'echo "what you know / have / are"', focus: 'Passwords, MFA, passkeys.' },
  { topic: 'Authorization & RBAC', cmd: 'echo "least privilege"', focus: 'Roles, scopes, ABAC.' },
  { topic: 'Cryptography Basics', cmd: 'openssl version', focus: 'Symmetric, asymmetric, hashing.' },
  { topic: 'TLS in Practice', cmd: 'openssl s_client -connect example.com:443', focus: 'Certs, ciphers, perfect forward secrecy.' },
  { topic: 'OWASP Top 10', cmd: 'echo "A01-A10"', focus: 'The most common web app risks.' },
  { topic: 'Injection Attacks', cmd: "echo \"' OR 1=1 --\"", focus: 'SQL, command, and template injection.' },
  { topic: 'XSS & CSRF', cmd: 'echo "<script>alert(1)</script>"', focus: 'Browser-side attacks and defenses.' },
  { topic: 'Secrets Management', cmd: 'echo "use a vault"', focus: 'Rotate, scope, audit.' },
  { topic: 'Network Segmentation', cmd: 'echo "VLAN, NSG, NetPol"', focus: 'Containing blast radius.' },
  { topic: 'Vulnerability Scanning', cmd: 'echo "trivy image nginx"', focus: 'Continuous scanning of images and code.' },
  { topic: 'Patch Management', cmd: 'echo "apt update && apt upgrade"', focus: 'Keeping the fleet current.' },
  { topic: 'Logging & SIEM', cmd: 'echo "ship logs to SIEM"', focus: 'Detect, alert, investigate.' },
  { topic: 'Incident Response', cmd: 'echo "PICERL"', focus: 'Prepare, Identify, Contain, Eradicate, Recover, Lessons.' },
  { topic: 'Forensics Basics', cmd: 'echo "chain of custody"', focus: 'Preserve evidence and timeline.' },
  { topic: 'Compliance Frameworks', cmd: 'echo "SOC2, ISO27001, PCI"', focus: 'Mapping controls to standards.' },
  { topic: 'Zero Trust', cmd: 'echo "never trust, always verify"', focus: 'Identity-aware access everywhere.' },
  { topic: 'Cloud Security', cmd: 'echo "shared responsibility"', focus: 'What you own vs the provider.' },
  { topic: 'Capstone: Secure a Web App', cmd: 'echo "harden, scan, monitor"', focus: 'End-to-end secure delivery.' },
];

const KUBERNETES: Topic[] = [
  { topic: 'What is Kubernetes', cmd: 'kubectl version --client', focus: 'Container orchestration at scale.' },
  { topic: 'Pods', cmd: 'kubectl get pods', focus: 'The smallest deployable unit.' },
  { topic: 'Deployments', cmd: 'kubectl get deploy', focus: 'Declarative rollouts and rollbacks.' },
  { topic: 'Services', cmd: 'kubectl get svc', focus: 'Stable network endpoints for pods.' },
  { topic: 'ConfigMaps & Secrets', cmd: 'kubectl get cm', focus: 'Externalized configuration.' },
  { topic: 'Namespaces', cmd: 'kubectl get ns', focus: 'Logical isolation in a cluster.' },
  { topic: 'Ingress', cmd: 'kubectl get ingress', focus: 'HTTP routing into the cluster.' },
  { topic: 'StatefulSets', cmd: 'kubectl get sts', focus: 'Stable identity for stateful workloads.' },
  { topic: 'DaemonSets', cmd: 'kubectl get ds', focus: 'One pod per node for agents.' },
  { topic: 'Jobs & CronJobs', cmd: 'kubectl get cj', focus: 'Batch and scheduled workloads.' },
  { topic: 'Helm Charts', cmd: 'helm list', focus: 'Templated, versioned manifests.' },
  { topic: 'RBAC', cmd: 'kubectl get clusterrole', focus: 'Least-privilege access in K8s.' },
  { topic: 'Network Policies', cmd: 'kubectl get netpol', focus: 'Pod-level firewall rules.' },
  { topic: 'Probes & Health', cmd: 'kubectl describe pod', focus: 'Liveness, readiness, startup.' },
  { topic: 'Resource Limits', cmd: 'kubectl describe node', focus: 'Requests, limits, QoS classes.' },
  { topic: 'Autoscaling (HPA)', cmd: 'kubectl get hpa', focus: 'Scale on metrics.' },
  { topic: 'Operators', cmd: 'kubectl get crd', focus: 'Encoding ops knowledge as controllers.' },
  { topic: 'Observability', cmd: 'kubectl top pods', focus: 'Metrics, logs, traces in K8s.' },
  { topic: 'Security Best Practices', cmd: 'kubectl get psa', focus: 'Pod Security Admission.' },
  { topic: 'Capstone: Ship a Workload', cmd: 'kubectl apply -f .', focus: 'From manifest to production.' },
];

const banks: { match: RegExp; topics: Topic[] }[] = [
  { match: /sql|database|postgres|mysql|nosql|mongo/i, topics: SQL },
  { match: /python/i, topics: PYTHON },
  { match: /javascript|typescript|js\b|ts\b|react|node/i, topics: JAVASCRIPT },
  { match: /security|kali|pen[\s-]?test|hacking|cyber/i, topics: SECURITY },
  { match: /kubernet|k8s|container/i, topics: KUBERNETES },
];

function pickTopics(courseTitle: string, count: number): Topic[] {
  const bank = banks.find(b => b.match.test(courseTitle))?.topics || GENERIC;
  const out: Topic[] = [];
  for (let i = 0; i < count; i++) {
    out.push(bank[i % bank.length]);
  }
  return out;
}

export function generateFallbackLessons(courseId: string, courseTitle: string, count: number): Lesson[] {
  const topics = pickTopics(courseTitle, Math.max(1, count));
  return topics.map((m, i) => ({
    id: `${courseId}-lesson-${i + 1}`,
    title: i === 0 ? `Introduction to ${courseTitle}` : `${courseTitle}: ${m.topic}`,
    content: `
# ${i === 0 ? `Welcome to ${courseTitle}` : m.topic}
${m.focus}

## Why It Matters
Understanding ${m.topic.toLowerCase()} is a building block for mastering ${courseTitle}.

## What You'll Practice
- Run a real command in the interactive sandbox
- Read the output and reason about it
- Apply the idea to a representative scenario
    `,
    task: `Run \`${m.cmd}\` in the sandbox to explore ${m.topic.toLowerCase()}.`,
    demoType: 'terminal' as const,
    demoConfig: {
      initialMessage: `${courseTitle} sandbox ready. Try \`${m.cmd}\`.`,
      availableCommands: [m.cmd.split(' ')[0], 'ls', 'pwd', 'help', 'clear']
    }
  }));
}
