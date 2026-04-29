export type StaticPageId =
  | 'enterprise'
  | 'docs'
  | 'community'
  | 'changelog'
  | 'careers'
  | 'privacy'
  | 'terms';

export interface StaticPageSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface StaticPageContent {
  id: StaticPageId;
  eyebrow: string;
  title: string;
  intro: string;
  sections: StaticPageSection[];
  cta?: { label: string; tab?: 'projects' | 'learn' };
}

export const staticPages: Record<StaticPageId, StaticPageContent> = {
  enterprise: {
    id: 'enterprise',
    eyebrow: 'For Teams & Companies',
    title: 'Realcloud for Enterprise',
    intro:
      'Train entire engineering organisations on real cloud infrastructure. Centralised admin, custom skill trees, SSO, audit logs and on-prem lab environments — built for security-conscious teams.',
    sections: [
      {
        heading: 'Why teams pick Realcloud',
        body:
          'Move beyond slide-deck training. Engineers learn faster when they break and fix real systems. Realcloud gives every team member a sandboxed cloud account with guardrails and reset-on-demand environments.',
        bullets: [
          'Role-based skill paths for SRE, Platform, Security, and Cloud engineers',
          'Up-to-date labs covering AWS, Azure, GCP, Kubernetes and modern DevOps stacks',
          'Skill assessments mapped to internal levelling frameworks',
        ],
      },
      {
        heading: 'Security & compliance',
        body:
          'We isolate every learner in their own ephemeral environment. SSO via SAML/OIDC, SCIM provisioning, granular RBAC, and full audit logs. SOC 2 Type II and ISO 27001 documentation available on request.',
      },
      {
        heading: 'Pricing',
        body:
          'Volume tiers start at 25 seats. Custom plans for orgs above 500 engineers include private content authoring, dedicated success engineers, and self-hosted deployments.',
      },
    ],
    cta: { label: 'Talk to sales' },
  },
  docs: {
    id: 'docs',
    eyebrow: 'Documentation',
    title: 'Build, run, ship.',
    intro:
      'Everything you need to use Realcloud effectively — from your first lab to integrating progress data into your internal LMS.',
    sections: [
      {
        heading: 'Getting started',
        body: 'Sign up, pick a skill tree, launch your first lab. Most learners finish their first hands-on mission within ten minutes.',
        bullets: [
          'Account setup and SSO configuration',
          'Choosing the right skill tree',
          'Understanding XP and badges',
        ],
      },
      {
        heading: 'Lab environments',
        body: 'Each lab spins up a fresh, isolated sandbox. Learn how the underlying terminal, file system and cloud accounts work, including how to reset state and submit progress.',
      },
      {
        heading: 'API & integrations',
        body: 'Programmatic access to progress, completions and team analytics. Webhooks for completion events. Read-only progress export to CSV / SCIM-compatible LMS sinks.',
      },
      {
        heading: 'Troubleshooting',
        body: 'Common environment issues, browser compatibility notes, and how to file a support ticket directly from a lab.',
      },
    ],
  },
  community: {
    id: 'community',
    eyebrow: 'Community',
    title: 'Join 50,000+ engineers learning out loud.',
    intro:
      'A welcoming home for cloud, DevOps and security learners — share what you build, get unstuck, and help others level up.',
    sections: [
      {
        heading: 'Where we hang out',
        body: 'Ask questions, share lab solutions and pair up with study buddies across timezones.',
        bullets: [
          'Discord — real-time help, study groups, AMAs with industry guests',
          'GitHub Discussions — long-form lab walkthroughs and feedback',
          'Monthly virtual meetups — guest talks from SREs and Platform leaders',
        ],
      },
      {
        heading: 'Code of Conduct',
        body: 'We follow a strict, clearly-written Code of Conduct. We want anyone — at any experience level — to feel safe asking the questions they would not feel safe asking on Stack Overflow.',
      },
      {
        heading: 'Contribute',
        body: 'Found a typo, a broken validation, or a smarter way to solve a lab? Open a PR. Accepted contributions earn community badges and free access to advanced tracks.',
      },
    ],
  },
  changelog: {
    id: 'changelog',
    eyebrow: 'Changelog',
    title: 'What we shipped recently.',
    intro:
      'Big features, small polish, and the occasional bug we caught in production. Subscribe via RSS to stay informed.',
    sections: [
      {
        heading: 'Apr 29, 2026 — Sandbox redesign',
        body:
          'Rebuilt the in-lesson sandbox: full-width terminal, mission progress collapsed into the terminal sidebar, contextual Back / Next Mission controls. Sandbox commands now cover 80+ Linux, networking, build, container and cloud CLIs with smart fallbacks.',
      },
      {
        heading: 'Apr 24, 2026 — DevOps track expansion',
        body:
          'Added 30 new DevOps labs spanning GitHub Actions, GitLab CI, Argo CD and Kubernetes. Refined CI/CD scoring rubric to weight reliability and observability more heavily.',
      },
      {
        heading: 'Apr 12, 2026 — Authentication',
        body: 'Email + password sign-up, GitHub OAuth, password reset and progress sync to Firestore. Owner / admin roles can now author and edit lessons.',
      },
      {
        heading: 'Mar 30, 2026 — Smart command coverage',
        body: 'Terminal simulator now plausibly responds to any reasonable command instead of returning "command not found".',
      },
    ],
  },
  careers: {
    id: 'careers',
    eyebrow: 'Careers',
    title: 'Build the platform we wish existed.',
    intro:
      'Realcloud is a small, deliberate team. We hire engineers, designers, content creators and operators who care about craft and ship things people actually use.',
    sections: [
      {
        heading: 'How we work',
        body:
          'Remote-first with deep-work-friendly hours. Async by default, sync where it matters. Every full-time hire gets meaningful equity, learning budget, and home-office stipend.',
      },
      {
        heading: 'Open roles',
        body: 'We hire when the right person shows up — apply even if you do not see your title.',
        bullets: [
          'Senior Platform Engineer (Kubernetes, Go) — Remote',
          'Content Engineer, Cybersecurity — Remote',
          'Founding Designer — London or Remote',
          'Developer Relations Lead — Remote',
        ],
      },
      {
        heading: 'How to apply',
        body: 'Email careers@realcloudprojects.io with a short note about something you have built and what you want to work on next. No formal cover letter required.',
      },
    ],
  },
  privacy: {
    id: 'privacy',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'We collect the minimum data required to run the platform, and we never sell it. This page summarises what, why, and how to get it back. Last updated April 29, 2026.',
    sections: [
      {
        heading: 'What we collect',
        body:
          'Account data (email, display name, avatar URL), authentication identifiers from your chosen provider, and progress data (completed labs, XP, lesson state). Optional analytics events are aggregated and IP-truncated.',
      },
      {
        heading: 'How we use it',
        body:
          'To authenticate you, sync your learning progress between devices, send transactional email (password resets, account notices), and improve product quality. We never sell or rent personal data to third parties.',
      },
      {
        heading: 'Sub-processors',
        body:
          'Google Firebase (auth, Firestore), Resend (transactional email), Cloudflare (CDN, DDoS protection). Data residency is EU + US. Full sub-processor list available on request.',
      },
      {
        heading: 'Your rights',
        body:
          'You can export, correct or delete your data at any time from account settings, or by emailing privacy@realcloudprojects.io. We respond within 30 days as required by GDPR / CCPA.',
      },
    ],
  },
  terms: {
    id: 'terms',
    eyebrow: 'Legal',
    title: 'Terms of Service',
    intro:
      'The plain-English version: be a good citizen, do not abuse the sandboxes, do not redistribute paid content. The legal version is below. Last updated April 29, 2026.',
    sections: [
      {
        heading: 'Accounts',
        body:
          'You are responsible for your account credentials. You must be 16+ to use the platform. We may suspend accounts that violate these terms or our Code of Conduct.',
      },
      {
        heading: 'Acceptable use',
        body:
          'Sandbox environments are for learning. Do not use them to run production workloads, mine cryptocurrency, attack third parties, or scan systems you do not own. Violations result in immediate suspension.',
      },
      {
        heading: 'Content & IP',
        body:
          'Lessons, lab content and skill trees are licensed to you for personal or internal team use. You may not republish, resell or feed them into a competing product or LLM training set.',
      },
      {
        heading: 'Limitation of liability',
        body:
          'The platform is provided "as is". We do our best to keep environments stable, but we are not liable for incidental damages arising from sandbox use. See the full terms for the precise legal language.',
      },
      {
        heading: 'Contact',
        body: 'Questions? Email legal@realcloudprojects.io.',
      },
    ],
  },
};

export const staticPageMeta: { id: StaticPageId; nav: 'platform' | 'resources' | 'company'; label: string }[] = [
  { id: 'enterprise', nav: 'platform', label: 'Enterprise' },
  { id: 'docs', nav: 'resources', label: 'Documentation' },
  { id: 'community', nav: 'resources', label: 'Community' },
  { id: 'changelog', nav: 'resources', label: 'Changelog' },
  { id: 'careers', nav: 'company', label: 'Careers' },
  { id: 'privacy', nav: 'company', label: 'Privacy Policy' },
  { id: 'terms', nav: 'company', label: 'Terms of Service' },
];
