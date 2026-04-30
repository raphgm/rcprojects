# Contributing to Realcloud Projects

Thank you for your interest in contributing! This is an open-source project and all contributions are welcome.

## How to Contribute

### Reporting Bugs
Open a [GitHub Issue](https://github.com/raphgm/rcprojects/issues) with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behaviour
- Browser / OS info if relevant

### Suggesting Features
Open a [GitHub Discussion](https://github.com/raphgm/rcprojects/discussions) describing the feature and the problem it solves.

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and commit: `git commit -m "feat: describe your change"`
4. Push to your fork: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

#### Commit Message Format
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `chore:` — maintenance, deps, tooling

### Adding Learning Content
- **New learning path** → edit `src/data/learningPaths.ts`
- **New lab/project** → edit `src/data/projects.ts` and `src/data/labContent.ts`
- Content should focus on **Microsoft Azure**, Kubernetes, Linux, or DevOps tooling

## Development Setup

See [README.md](README.md) for local setup instructions.

## Code Style
- TypeScript strict mode
- Functional React components with hooks
- Tailwind CSS for styling — no inline styles
- Run `npm run lint` before submitting a PR

## Code of Conduct
Be respectful, inclusive, and constructive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).
