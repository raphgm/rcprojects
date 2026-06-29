export interface Lesson {
  id: string;
  title: string;
  content: string;
  task?: string;
  flavorContent?: {
    ubuntu?: { content?: string; task?: string };
    centos?: { content?: string; task?: string };
    alpine?: { content?: string; task?: string };
    rhel?: { content?: string; task?: string };
  };
  cloudContent?: {
    azure?: { content?: string; task?: string };
  };
  demoType: 'terminal' | 'cloud-console' | 'code-editor';
  demoConfig?: any;
  commands?: {
    text: string;
    explanation: string;
  }[];
}

export interface CourseContent {
  courseId: string;
  lessons: Lesson[];
}

export interface LabStep {
  id: string;
  title: string;
  instruction: string;
  summary?: string;
  whyNeeded?: string;
  pillarConnection?: string;
  repository?: {
    name: string;
    url: string;
    explanation: string;
  };
  detailedSteps?: {
    title: string;
    description: string;
  }[];
  commands?: {
    text: string;
    explanation: string;
  }[];
  hint?: string;
  command?: string;
  feedback?: string;
  checkCommand?: string;
  expectedOutput?: string;
  languageInstructions?: {
    python?: string;
    nodejs?: string;
    csharp?: string;
  };
}

export interface LabContent {
  projectId: string;
  environment: 'linux' | 'azure' | 'kubernetes';
  description?: string;
  objective?: string;
  missionNumber?: number;
  totalMissions?: number;
  xpReward?: number;
  steps: LabStep[];
}

export type LinuxFlavor = 'ubuntu' | 'centos' | 'alpine' | 'rhel';
export type CloudProvider = 'azure';
