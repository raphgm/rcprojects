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

export function generateFallbackLessons(courseId: string, courseTitle: string, count: number): Lesson[] {
  const total = Math.max(1, count);
  const lessons: Lesson[] = [];
  for (let i = 0; i < total; i++) {
    const m = GENERIC[i % GENERIC.length];
    lessons.push({
      id: `${courseId}-lesson-${i + 1}`,
      title: i === 0 ? `Introduction to ${courseTitle}` : `${courseTitle}: ${m.topic}`,
      content: `\n# ${i === 0 ? `Welcome to ${courseTitle}` : m.topic}\n${m.focus}\n\n## Why It Matters\nUnderstanding ${m.topic.toLowerCase()} is a building block for mastering ${courseTitle}.\n\n## What You'll Practice\n- Run a real command in the interactive sandbox\n- Read the output and reason about it\n- Apply the idea to a representative scenario\n      `,
      task: `Run \`${m.cmd}\` in the sandbox to explore ${m.topic.toLowerCase()}.`,
      demoType: 'terminal' as const,
      demoConfig: {
        initialMessage: `${courseTitle} sandbox ready. Try \`${m.cmd}\`.`,
        availableCommands: [m.cmd.split(' ')[0], 'ls', 'pwd', 'help', 'clear'],
      },
    });
  }
  return lessons;
}
