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
    aws?: { content?: string; task?: string };
    gcp?: { content?: string; task?: string };
    azure?: { content?: string; task?: string };
  };
  demoType: 'terminal' | 'cloud-console' | 'code-editor';
  demoConfig?: any;
}

export interface CourseContent {
  courseId: string;
  lessons: Lesson[];
}

export interface LabStep {
  id: string;
  title: string;
  instruction: string;
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
  steps: LabStep[];
  environment: 'linux' | 'aws' | 'azure' | 'gcp' | 'kubernetes';
}
