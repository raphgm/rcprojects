export const conceptDictionary: Record<string, { title: string; description: string }> = {
  'Linux': {
    title: 'Linux Fundamentals',
    description: 'Linux is an open-source operating system that serves as the foundation for modern cloud computing. It manages the hardware resources and provides a stable environment where your applications and containers can run securely.'
  },
  'K8s': {
    title: 'Kubernetes (K8s)',
    description: 'Kubernetes is like an orchestra conductor for your containers. If you have hundreds of containerized applications running, K8s automatically manages them—restarting failed containers, scaling them up when traffic increases, and ensuring they can communicate with each other seamlessly.'
  },
  'Docker': {
    title: 'Containerization (Docker)',
    description: 'Docker allows you to package an application and all its dependencies into a single, standardized unit called a container. This ensures that the application runs exactly the same way on your laptop as it does in the production cloud environment, eliminating the "it works on my machine" problem.'
  },
  'CI/CD': {
    title: 'Continuous Integration / Continuous Deployment',
    description: 'CI/CD is an automated pipeline that takes the code a developer writes, tests it for bugs (Continuous Integration), and automatically deploys it to production (Continuous Deployment) without manual human intervention.'
  },
  'GitHub Actions': {
    title: 'GitHub Actions',
    description: 'GitHub Actions is an automation platform built directly into GitHub. It allows you to write scripts (workflows) that automatically build, test, and deploy your code every time someone pushes a change to the repository.'
  },
  'Istio': {
    title: 'Istio Service Mesh',
    description: 'When you have dozens of microservices talking to each other, managing the network traffic becomes chaotic. Istio is a "service mesh" that sits in the middle, providing automatic encryption (mTLS), traffic routing, and observability without requiring you to change your application code.'
  },
  'Envoy': {
    title: 'Envoy Proxy',
    description: 'Envoy is a high-performance proxy that runs alongside your applications (as a sidecar). It intercepts all incoming and outgoing network traffic, allowing tools like Istio to enforce security policies and route requests dynamically.'
  },
  'Service Mesh': {
    title: 'Service Mesh Architecture',
    description: 'A service mesh is a dedicated infrastructure layer that controls service-to-service communication over a network. It provides features like load balancing, encryption, and failure recovery to make distributed systems highly reliable.'
  },
  'Azure': {
    title: 'Microsoft Azure',
    description: 'Azure is Microsoft\'s public cloud computing platform. It provides on-demand access to virtual machines, databases, networking, and artificial intelligence services, allowing businesses to scale globally without buying physical servers.'
  },
  'Networking': {
    title: 'Cloud Networking',
    description: 'Cloud networking involves creating virtualized networks (like VNets or VPCs) that connect your cloud resources. It allows you to define private subnets, routing tables, and firewalls entirely through software.'
  },
  'VPN Gateway': {
    title: 'VPN Gateway',
    description: 'A Virtual Private Network (VPN) Gateway acts as a secure bridge between your company\'s physical office and the cloud. It encrypts all traffic traveling over the public internet, ensuring that sensitive data remains private during transit.'
  },
  'VNet': {
    title: 'Virtual Network (VNet)',
    description: 'A VNet is a logically isolated section of the Azure cloud dedicated to your account. You can think of it as your own private data center in the cloud where you can launch resources with custom IP addresses.'
  },
  'Kubeadm': {
    title: 'Kubeadm Bootstrap',
    description: 'Kubeadm is the official tool used to bootstrap a Kubernetes cluster from scratch. It handles the complex tasks of generating cryptographic certificates, configuring the control plane, and providing the commands needed to join worker nodes together.'
  },
  'Cluster': {
    title: 'Kubernetes Cluster',
    description: 'A cluster is a group of machines (nodes) that run containerized applications. It consists of a "Control Plane" that makes global decisions and "Worker Nodes" that actually run your application workloads.'
  },
  'Secrets': {
    title: 'Secret Management',
    description: 'Secrets refer to sensitive data like database passwords, API keys, and TLS certificates. Proper secret management ensures this data is encrypted at rest and injected into applications securely, rather than being hardcoded in plain text.'
  },
  'External Secrets': {
    title: 'External Secrets Operator',
    description: 'Instead of storing sensitive passwords directly in Kubernetes, the External Secrets Operator fetches them dynamically from enterprise vaults (like AWS Secrets Manager or HashiCorp Vault) and injects them into the cluster securely.'
  },
  'Security': {
    title: 'Cloud Security / Zero Trust',
    description: 'Cloud security relies on the "Zero Trust" principle: never assume traffic is safe just because it is inside your network. Every request must be authenticated, authorized, and encrypted.'
  },
  'Autoscaling': {
    title: 'Autoscaling Workloads',
    description: 'Autoscaling automatically adjusts the amount of computing resources allocated to your application based on current demand. It scales out during traffic spikes to maintain performance and scales in during quiet periods to save money.'
  },
  'HPA': {
    title: 'Horizontal Pod Autoscaler (HPA)',
    description: 'HPA monitors the CPU or memory usage of your application and automatically creates more identical copies (pods) of your application when demand is high, distributing the traffic across a wider fleet.'
  },
  'VPA': {
    title: 'Vertical Pod Autoscaler (VPA)',
    description: 'VPA monitors your application\'s resource usage and automatically increases the CPU and memory limits of individual pods if they are starving for resources, preventing out-of-memory crashes.'
  },
  'Ingress': {
    title: 'Kubernetes Ingress',
    description: 'An Ingress is an API object that manages external access to the services in a cluster, typically HTTP. It provides load balancing, SSL termination, and name-based virtual hosting.'
  },
  'NGINX': {
    title: 'NGINX Ingress Controller',
    description: 'NGINX is a highly performant web server acting as the front door for your Kubernetes cluster. It reads the Ingress routing rules and efficiently directs incoming internet traffic to the correct internal microservice.'
  },
  'Storage': {
    title: 'Persistent Storage',
    description: 'Containers are ephemeral—if they crash, any data stored inside them is lost forever. Persistent Storage provides independent, durable disk drives that survive container restarts, which is essential for databases.'
  },
  'CSI': {
    title: 'Container Storage Interface (CSI)',
    description: 'CSI is a standard that allows Kubernetes to connect to various external storage providers (like AWS EBS or Azure Disk) seamlessly, allowing developers to request storage dynamically without knowing the underlying hardware details.'
  },
  'PV': {
    title: 'Persistent Volume (PV)',
    description: 'A PV is a piece of storage in the cluster that has been provisioned by an administrator or dynamically via a storage class. It represents the actual physical or cloud storage drive.'
  },
  'PVC': {
    title: 'Persistent Volume Claim (PVC)',
    description: 'A PVC is a request for storage by a developer. You ask Kubernetes for a certain amount of space (e.g., 50GB), and the system automatically finds and binds an available PV to your application.'
  },
  'ArgoCD': {
    title: 'ArgoCD (GitOps)',
    description: 'ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It constantly watches your Git repository and automatically synchronizes those files into your cluster, ensuring the live state always matches the code.'
  },
  'GitOps': {
    title: 'GitOps Methodology',
    description: 'GitOps is an operational framework that takes DevOps best practices used for application development (like version control and pull requests) and applies them to infrastructure automation.'
  },
  'Helm': {
    title: 'Helm Package Manager',
    description: 'Helm is the package manager for Kubernetes. Just like `apt` for Linux or `npm` for Node.js, Helm allows you to package complex Kubernetes applications into reusable charts for easy installation and versioning.'
  },
  'Prowler': {
    title: 'Prowler Security Scanner',
    description: 'Prowler is an open-source security tool used to perform cloud security best practices assessments, audits, and incident response readiness checks against environments like AWS and Azure.'
  },
  'Compliance': {
    title: 'Cloud Compliance',
    description: 'Compliance ensures that your cloud environment adheres to strict regulatory frameworks (like HIPAA, SOC2, or CIS Benchmarks). Automated tools scan your infrastructure to detect misconfigurations before they result in a fine or breach.'
  },
  'AWS': {
    title: 'Amazon Web Services (AWS)',
    description: 'AWS is the world\'s most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.'
  },
  'Prometheus': {
    title: 'Prometheus Monitoring',
    description: 'Prometheus is a time-series database and monitoring system. It "scrapes" metrics (like CPU usage, request counts) from your applications and stores them efficiently so you can set up alerts when things go wrong.'
  },
  'Grafana': {
    title: 'Grafana Dashboards',
    description: 'Grafana is an observability platform that connects to data sources like Prometheus and visualizes the metrics in beautiful, real-time graphs and dashboards.'
  },
  'Bash': {
    title: 'Bash Scripting',
    description: 'Bash is a command processor that runs in a text window where the user types commands. Bash scripting allows you to automate repetitive tasks by writing these commands into a reusable file.'
  },
  'Automation': {
    title: 'Infrastructure Automation',
    description: 'Automation involves using software scripts and tools to provision, configure, and manage infrastructure automatically, eliminating the need for manual, error-prone human intervention.'
  },
  'Cron': {
    title: 'Cron Job Scheduling',
    description: 'Cron is a time-based job scheduler in Linux. It allows administrators to schedule scripts or commands to run periodically at fixed times, dates, or intervals.'
  },
  'Functions': {
    title: 'Serverless Functions',
    description: 'Serverless functions (like Azure Functions) allow you to run small pieces of code in the cloud without managing any servers. You only pay for the time your code is actually running, making it highly cost-effective for event-driven tasks.'
  },
  'Event Hubs': {
    title: 'Azure Event Hubs',
    description: 'Event Hubs is a big data streaming platform and event ingestion service. It can receive and process millions of events per second, acting as a high-speed "front door" for data entering your analytics pipeline.'
  },
  'Cosmos DB': {
    title: 'Azure Cosmos DB',
    description: 'Cosmos DB is a globally distributed, multi-model database service. It is designed to provide low-latency access to data from anywhere in the world, automatically scaling to handle massive amounts of traffic.'
  },
  'Terraform': {
    title: 'Infrastructure as Code (Terraform)',
    description: 'Terraform is a tool that allows you to define your entire cloud infrastructure (servers, networks, databases) using a simple configuration language. This means you can "deploy" an entire data center with a single command.'
  },
  'Ansible': {
    title: 'Configuration Management (Ansible)',
    description: 'Ansible is an automation engine that automates software provisioning, configuration management, and application deployment. It uses "Playbooks" to ensure that all your servers are configured identically and correctly.'
  },
  'Vault': {
    title: 'HashiCorp Vault',
    description: 'Vault is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret while providing tight access control and recording a detailed audit log.'
  },
  'AKS': {
    title: 'Azure Kubernetes Service (AKS)',
    description: 'AKS is a managed Kubernetes service that simplifies deploying, managing, and operations of Kubernetes. Microsoft handles the complex "Control Plane" management, while you focus on running your applications on the worker nodes.'
  },
  'App Service': {
    title: 'Azure App Service',
    description: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps. It supports multiple languages and handles infrastructure tasks like patching, security, and scaling automatically.'
  },
  'Azure SQL': {
    title: 'Azure SQL Database',
    description: 'Azure SQL is a fully managed relational database service. It provides high availability, data protection, and automated updates, allowing you to run powerful SQL Server databases without managing the underlying hardware.'
  },
  'Vulnerability Disclosure': {
    title: 'Vulnerability Disclosure',
    description: 'A Vulnerability Disclosure Program (VDP) is a structured way for ethical hackers to report security flaws they find in an organization\'s systems, allowing the organization to fix them before malicious actors can exploit them.'
  },
  'AppSec': {
    title: 'Application Security (AppSec)',
    description: 'AppSec focuses on making software more secure by finding, fixing, and preventing security vulnerabilities. It involves practices like secure coding, automated testing, and regular security audits throughout the development lifecycle.'
  },
  'Pipelines': {
    title: 'CI/CD Pipelines',
    description: 'A pipeline is a series of automated steps that your code goes through from the moment it is written to the moment it is deployed. This includes building, testing, and security scanning, ensuring only high-quality code reaches production.'
  },
  'Containers': {
    title: 'Containerization',
    description: 'Containers are lightweight, portable packages that include everything an application needs to run. They isolate software from its environment, ensuring it works consistently regardless of where it is deployed.'
  },
  'Excel': {
    title: 'Excel Fundamentals',
    description: 'Microsoft Excel is the world\'s most popular spreadsheet software. It organizes data in rows and columns and allows you to perform math operations, analyze datasets, and build charts using formulas.'
  },
  'Spreadsheet': {
    title: 'Spreadsheets as Data Tools',
    description: 'Spreadsheets structure data in cells defined by column letters (A, B, C...) and row numbers (1, 2, 3...). This structured grid allows for clear visualization, quick sorting, and direct data referencing.'
  },
  'Data Analytics': {
    title: 'Data Analytics & Formulas',
    description: 'Formulas (starting with `=`) tell Excel to compute values dynamically. Using standard operations like `=SUM(range)` allows analytics, calculations, and aggregates to update in real-time as cell data changes.'
  },
  // Power BI Concepts
  'Power BI': {
    title: 'Microsoft Power BI',
    description: 'Power BI is a unified self-service and enterprise business intelligence platform. It connects to, visualizes, and models raw business data into secure interactive dashboards.'
  },
  'Power Query': {
    title: 'Power Query ETL engine',
    description: 'Power Query is the data preparation and transformation engine. It allows analysts to clean messy sources, merge columns, pivot, and automate reusable query load pipelines.'
  },
  'DAX': {
    title: 'Data Analysis Expressions (DAX)',
    description: 'DAX is the formula language used to define calculated measures and tables. It allows dynamic mathematical aggregations and advanced time-intelligence comparisons.'
  },
  'Star Schema': {
    title: 'Star Schema Modeling',
    description: 'Star schemas arrange tables into central numerical Fact tables and peripheral descriptive Dimension tables, optimizing database storage and DAX query performances.'
  },
  'Microsoft Fabric': {
    title: 'Microsoft Fabric SaaS Ecosystem',
    description: 'Fabric is a unified SaaS analytical platform combining OneLake, Synapse Data Warehouse, Data Factory pipelines, Real-Time intelligence, and Power BI dashboards.'
  },
  'Power BI Service': {
    title: 'Power BI Service SaaS Portal',
    description: 'The cloud portal hosting published workspaces, apps, scheduled gateways data refreshes, row-level security (RLS), and collaborative dashboard shares.'
  },
  'Lakehouse': {
    title: 'Fabric Lakehouse Architecture',
    description: 'Lakehouses combine the flexibility of unstructured cloud storage file buckets (Delta/Parquet tables) with the transactional capabilities of SQL databases.'
  },
  'Dataflows': {
    title: 'Power BI Dataflows (Gen2)',
    description: 'Dataflows execute browser-based ETL routines, writing cleaned data rows directly to Lakehouses or Azure Synapse Warehouses for unified semantic models.'
  },
  'Row-Level Security': {
    title: 'Row-Level Security (RLS)',
    description: 'RLS filters data views dynamically based on the active user\'s Microsoft Entra ID login, securing database access profiles across global clients.'
  },
  'VertiPaq': {
    title: 'VertiPaq Columnar Engine',
    description: 'The in-memory columnar database engine powering Power BI datasets. It compresses tables by storing values in sorted dictionary indexes to speed up DAX queries.'
  },
  // SAP Concepts
  'SAP': {
    title: 'SAP Enterprise Software',
    description: 'SAP is the global market leader in Enterprise Resource Planning (ERP) software, coordinating business databases, transactions, ledgers, and logistics pipelines.'
  },
  'S/4HANA': {
    title: 'SAP S/4HANA Suite',
    description: 'The modern SAP ERP suite running on the high-performance in-memory HANA database, replacing legacy mechanical disk tables with column store structures.'
  },
  'Enterprise': {
    title: 'Enterprise Business Design',
    description: 'Enterprise workflows require scalable configurations, isolating DEV, QA, and PRD environments to prevent development bugs from affecting financial systems.'
  },
  'ERP': {
    title: 'Enterprise Resource Planning (ERP)',
    description: 'ERP unifies core business processes (finance, HR, procurement, manufacturing) in a single integrated transactional database.'
  },
  'Server': {
    title: 'SAP Application Server',
    description: 'SAP servers host business programs and process transaction requests via ABAP dialog steps, distributing operations across dispatcher queues.'
  },
  'Installation': {
    title: 'SAP GUI Installation',
    description: 'Installing and configuring SAP GUI client setups connects user desktop workstations securely to target SAP Router gateway coordinates.'
  },
  'T-Codes': {
    title: 'SAP Transaction Codes (T-Codes)',
    description: 'T-Codes are command shortcuts (e.g. SU01, VA01) entered in the GUI command bar to launch specific program dialog screens instantly.'
  },
  'Navigation': {
    title: 'SAP Easy Access Menu',
    description: 'The standard SAP starting menu tree. It allows operators to browse transactions, add favorites, and configure personalized layouts.'
  },
  'SU01': {
    title: 'User Maintenance (SU01)',
    description: 'The administrative transaction to maintain user profiles, reset passwords, lock users, and assign specific security role profiles.'
  },
  'Accounting': {
    title: 'SAP Financial Ledger',
    description: 'FI Accounting tracks corporate assets, processes vendor invoices, posts journal items (FB50), and compiles legal balance sheets.'
  },
  'Finance': {
    title: 'SAP FI Module',
    description: 'The core Finance module organizing general ledgers, general accounts payable/receivable, company codes, and bank reconciliations.'
  },
  'FI': {
    title: 'Financial Accounting (FI)',
    description: 'FI ensures regulatory compliance by keeping double-entry ledger books and outputting real-time trial balances.'
  },
  'Controlling': {
    title: 'SAP Controlling (CO)',
    description: 'CO focuses on internal cost-accounting. It models cost allocations, profit centers, department cost centers, and product margins.'
  },
  'CO': {
    title: 'Management Controlling (CO)',
    description: 'CO maps cost behaviors across internal departments, helping administrators optimize budgets and segment profitabilities.'
  },
  'SD': {
    title: 'Sales & Distribution (SD)',
    description: 'The SD module governs order-to-cash (O2C) processing, starting from sales orders (VA01) down to picker deliveries and client invoices.'
  },
  'Sales': {
    title: 'SAP Sales Orders',
    description: 'Sales orders specify Sold-To buyers, shipping locations, material SKUs, and conditions pricing values (VA01).'
  },
  'VA01': {
    title: 'Create Sales Order (VA01)',
    description: 'The classic SAP SD transaction to register customer sales orders, calculate shipping costs, and trigger inventory pick actions.'
  },
  'MM': {
    title: 'Materials Management (MM)',
    description: 'MM governs procure-to-pay (P2P) loops. It tracks inventory counts, purchase requisitions, PO creation (ME21N), and goods receipts.'
  },
  'Procurement': {
    title: 'SAP Procurement',
    description: 'Procurement coordinates purchasing actions with vendor suppliers, ensuring raw material counts meet manufacturing demands.'
  },
  'ME21N': {
    title: 'Create Purchase Order (ME21N)',
    description: 'The primary SAP MM transaction to generate purchase orders, assign vendors, and authorize material buys.'
  },
  'Warehouse': {
    title: 'SAP Warehouse Management',
    description: 'WM tracks physical stock inventory coordinates, managing storage locations, bins, put-away strategies, and picker routes.'
  },
  'Inventory': {
    title: 'SAP Inventory Management',
    description: 'Inventory handles storage receipts, material movements, client shipments, and counts reconciliation.'
  },
  'PP': {
    title: 'Production Planning (PP)',
    description: 'PP handles shop floor scheduling, planning materials (MRP), capacity loads, routings, and Bill of Materials (BOM) recipes.'
  },
  'Manufacturing': {
    title: 'SAP Shop Floor Control',
    description: 'Manufacturing tracks production orders, machinery capacity bottlenecks, and logs finished goods assemblies.'
  },
  'Quality': {
    title: 'SAP Quality Management (QM)',
    description: 'QM regulates testing by queueing inspection lots, tracking defects in quality notifications, and posting usage decisions.'
  },
  'QM': {
    title: 'Quality Management (QM)',
    description: 'QM guarantees compliance targets by testing raw items before they enter warehouse inventory bins.'
  },
  'Maintenance': {
    title: 'Plant Maintenance (PM)',
    description: 'PM coordinates machinery health checks, tracking equipment functional locations and Preventive Work Orders.'
  },
  'PM': {
    title: 'Plant Maintenance (PM)',
    description: 'PM schedules maintenance checks to minimize unplanned downtime on manufacturing shop floors.'
  },
  'HR': {
    title: 'Human Capital Management (HCM)',
    description: 'HCM manages employee records, payroll tax deductions, time evaluations, and organizational hierarchies.'
  },
  'HCM': {
    title: 'Human Capital Management',
    description: 'HCM unifies HR processes, tracking onboarding, employee profiles data, and employee leave calendars.'
  },
  'Payroll': {
    title: 'SAP Payroll Processing',
    description: 'Payroll computes employee salaries, applying tax withholdings and benefits distributions automatically.'
  },
  'ACDOCA': {
    title: 'Universal Journal (ACDOCA)',
    description: 'ACDOCA is the central ledger table in S/4HANA. It combines general ledger, controlling, and asset accounting details into one row.'
  },
  'Fiori': {
    title: 'SAP Fiori UX',
    description: 'SAP Fiori is the modern web user experience, replacing complex transaction screens with clean responsive HTML5 tiles.'
  },
  'Launchpad': {
    title: 'SAP Fiori Launchpad',
    description: 'The entry portal for Fiori apps. Administrators configure launchpad tiles, catalogs, and page spaces groups.'
  },
  'HANA': {
    title: 'SAP HANA In-Memory Database',
    description: 'HANA is a column-oriented in-memory database. It processes complex analytical calculations directly in RAM.'
  },
  'Database': {
    title: 'HANA Database Engine',
    description: 'The relational engine backing S/4HANA, supporting calculation views modeling and raw SQL indexing.'
  },
  'SQL': {
    title: 'SAP HANA SQL',
    description: 'SQL queries fetch data rows from HANA tables, accelerating custom reports calculations.'
  },
  'Basis': {
    title: 'SAP Basis System Administration',
    description: 'Basis is the system administration layer. It handles kernel upgrades, work processes (SM50), memory allocation, and back-ups.'
  },
  'SysAdmin': {
    title: 'SAP System Security Admin',
    description: 'SysAdmins monitor system parameters, configure password policies, and track performance logs.'
  },
  'STMS': {
    title: 'Transport Management System (STMS)',
    description: 'STMS administers the transport routes, exporting customization transport requests from DEV to QA and PRD systems.'
  },
  'Monitoring': {
    title: 'SAP System Monitoring',
    description: 'Monitoring checks database connections, background batch jobs (SM37), system log warnings (SM21), and ABAP crash dumps (ST22).'
  },
  'Backup': {
    title: 'SAP Backup & Restore',
    description: 'Backups clone database coordinates, allowing system copies to restore operations after hardware outages.'
  },
  'ABAP': {
    title: 'Advanced Business Application Programming',
    description: 'ABAP is the primary programming language for SAP. Developers write custom reports (ALV), forms, and BADI hooks.'
  },
  'Coding': {
    title: 'ABAP Syntax',
    description: 'ABAP syntax structures loop arrays, declares variables types, and queries dictionary tables (SE11).'
  },
  'OOP': {
    title: 'Object-Oriented ABAP',
    description: 'OOP ABAP structures code in classes, methods, and interfaces, implementing clean encapsulation.'
  },
  'ALV': {
    title: 'ABAP List Viewer (ALV)',
    description: 'ALV generates standardized data reporting grids in SAP GUI, with built-in sorting, filtering, and Excel export.'
  },
  'SE11': {
    title: 'Data Dictionary (SE11)',
    description: 'SE11 manages database tables, defining domains, data elements, search helps (F4), and table lock objects.'
  },
  'Forms': {
    title: 'SAP Smart Forms',
    description: 'Smart Forms compile corporate invoice documents layouts, drawing data coordinates from driver print scripts.'
  },
  'BADI': {
    title: 'Business Add-Ins (BADI)',
    description: 'BADI are enhancement points allowing custom programming hooks (SE19) without modifying SAP core code.'
  },
  'APIs': {
    title: 'SAP OData & RFC APIs',
    description: 'APIs expose SAP data rows to web applications using OData gateway paths (SEGW) or RFC connections (SM59).'
  },
  'OData': {
    title: 'SAP OData Gateway Services',
    description: 'OData translates ABAP logic models into standard REST JSON feeds, powering front-end Fiori layouts.'
  },
  'SEGW': {
    title: 'Gateway Service Builder (SEGW)',
    description: 'SEGW designs OData services models, binding transparent dictionary tables to external REST APIs.'
  },
  'Cloud': {
    title: 'SAP Cloud Platform (BTP)',
    description: 'BTP is the extension suite hosting subaccounts, Kyma Kubernetes pods, Cloud Foundry servers, and destinations.'
  },
  'Integration': {
    title: 'SAP Integration Suite',
    description: 'CPI handles enterprise interface mappings, routing message events between SAP and third-party SaaS apps.'
  },
  'PI/PO': {
    title: 'Process Integration / Orchestration',
    description: 'PI/PO coordinates middleware integrations, mapping XML structures and monitoring network ports.'
  },
  'Orchestration': {
    title: 'Interface Mapping Orchestration',
    description: 'Orchestrating connections maps system payloads, converting file configurations systematically.'
  },
  'SAC': {
    title: 'SAP Analytics Cloud (SAC)',
    description: 'SAC is a SaaS analytics dashboard. It builds stories, executes budget plannings, and runs ML forecasting.'
  },
  'Analytics': {
    title: 'SAP Analytics Cloud Stories',
    description: 'SAC stories combine charts, tables, and text callouts into interactive reporting dashboards.'
  },
  'BW/4HANA': {
    title: 'SAP BW/4HANA Data Warehouse',
    description: 'BW/4HANA gathers enterprise data warehouse structures, loading ETL info-providers for business querying.'
  },
  'BI': {
    title: 'Business Intelligence (BI)',
    description: 'BI compiles operational reporting models, assisting leadership in executing margin decisions.'
  },
  'BTP': {
    title: 'SAP Business Technology Platform',
    description: 'BTP coordinates secure connections, linking cloud applications to local ERP database records.'
  },
  'Machine Learning': {
    title: 'SAP AI Core & ML',
    description: 'AI Core manages machine learning models training, helping operators forecast anomalies.'
  },
  'SAP Automation': {
    title: 'SAP Build Automation',
    description: 'Build Process Automation uses RPA bots to automate high-volume invoice and data entry steps.'
  },
  'Build': {
    title: 'SAP Build Apps',
    description: 'Build Apps is a low-code UI builder allowing developers to compile business forms rapidly.'
  },
  'DevOps': {
    title: 'DevOps for SAP',
    description: 'DevOps brings Git-based version control (gCTS), unit tests execution, and Jenkins CI/CD pipelines to ABAP.'
  },
  'SAP CI/CD': {
    title: 'SAP Jenkins Pipelines',
    description: 'CI/CD automates transport request imports, compiling code changes systematically after test evaluations.'
  },
  'Infrastructure': {
    title: 'SAP System Sizing & S/4HANA Scale',
    description: 'Infrastructure monitors high availability, disaster recovery, and optimizes database RAM capacity requirements.'
  },
  'Scale': {
    title: 'High Availability (HA) Sizing',
    description: 'HA scale structures active-passive database replication node paths, preventing production crashes.'
  },
  'SAP AWS': {
    title: 'SAP on AWS Deployments',
    description: 'AWS hosts S/4HANA nodes, deploying EC2 compute nodes and mapping EBS volume capacities.'
  },
  'GCP': {
    title: 'SAP on Google Cloud Platform',
    description: 'GCP optimizes RAM allocations for HANA column databases, securing network VPC tunnels.'
  },
  'Migration': {
    title: 'SAP Cloud Migration',
    description: 'Migration plans transition legacy database layouts to S/4HANA cloud instances, monitoring transfer logs.'
  },
  'Capstone': {
    title: 'Enterprise Capstone Project',
    description: 'Capstone projects integrate multiple ERP modules, testing end-to-end business processing execution.'
  },
  'P2P': {
    title: 'Procure-to-Pay (P2P) Lifecycle',
    description: 'P2P processes material purchases, starting from requisition orders up to vendor invoice settles.'
  },
  'O2C': {
    title: 'Order-to-Cash (O2C) Lifecycle',
    description: 'O2C processes sales orders, picking inventory shipments, billing, and customer payments.'
  },
  'R2R': {
    title: 'Record-to-Report (R2R) Closing',
    description: 'R2R executes month-end financial closing, posting journal ledger balances for audit reviews.'
  },
  'H2R': {
    title: 'Hire-to-Retire (H2R) HCM Loop',
    description: 'H2R tracks employee career steps, covering recruitment, onboarding, payroll runs, and separations.'
  },
  'SAP Manufacturing': {
    title: 'Plan-to-Produce (P2P Manufacturing)',
    description: 'Manufacturing handles production plans, releasing work orders and validating quality decisions.'
  },
  // ESP Concepts
  'Social Engineering': {
    title: 'Social Engineering Tactics',
    description: 'Social engineering manipulates human psychology rather than exploiting technical software bugs, leveraging urgency, fear, authority, or curiosity to steal credentials.'
  },
  'Phishing': {
    title: 'Phishing Vectors',
    description: 'Phishing targets victims via deceptive emails pretending to be trusted services, tricking them into clicking links, typing passwords, or running malware.'
  },
  'MFA': {
    title: 'Multi-Factor Authentication (MFA)',
    description: 'MFA adds secondary validation (OTP codes, authenticator apps, security keys) to verify identity, blocking 99.9% of credential theft breaches.'
  },
  'Business Email Compromise': {
    title: 'Business Email Compromise (BEC)',
    description: 'BEC impersonates company executives or vendors, urging accounting staff to wire immediate payments or purchase gift cards for urgent transactions.'
  },
  'Clean Desk Policy': {
    title: 'Clean Desk Security Policy',
    description: 'A physical security policy requiring employees to lock workstations and clear passwords notes, badges, and documents before leaving their desks.'
  },
};
