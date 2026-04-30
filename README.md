<div align="center">
<img width="1200" height="475" alt="Realcloud Projects Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Realcloud Projects

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Open-source hands-on learning platform for cloud and DevOps engineers — built on **Microsoft Azure**.

Practice real Azure, Kubernetes, Linux, and DevOps skills through guided labs and projects. No simulations — real infrastructure in your browser.

## Tech Stack

| Layer | Technology |
|---|---|
| Cloud | Microsoft Azure (AKS, App Service, Key Vault, Cosmos DB) |
| Auth | Microsoft Entra ID (Azure AD) |
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS |
| Database | Azure Cosmos DB |
| Infrastructure | Kubernetes · Terraform · Azure DevOps |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/raphgm/rcprojects.git
cd rcprojects

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Fill in your Azure credentials in .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

- **Bug reports** → open a GitHub Issue
- **Feature requests** → open a GitHub Discussion
- **Code contributions** → fork, branch, PR against `main`

## License

[MIT](LICENSE) © Realcloud Projects Contributors
