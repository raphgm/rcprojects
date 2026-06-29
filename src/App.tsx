import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { LearnView } from './components/LearnView';
import { LessonView } from './components/LessonView';
import { LabView } from './components/LabView';
import { Footer } from './components/Footer';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { AboutUs } from './components/AboutUs';
import { Blog } from './components/Blog';
import { StatsBar } from './components/StatsBar';
import { Community } from './components/Community';
import { StaticPage } from './components/StaticPage';
import type { FooterTab } from './components/Footer';
import { AnimatePresence } from 'motion/react';
import { courseContents } from './data/courseContent';
import { cloudLabs } from './data/cloudLabs';
import { learningPaths } from './data/learningPaths';
import { Lesson, LabContent, LabStep } from './types/content';
import { generateFallbackLessons } from './data/lessonGenerator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { projects } from './data/projects';
import { generateFallbackLab } from './data/labGenerator';


export type LinuxFlavor = 'ubuntu' | 'centos' | 'alpine' | 'rhel';
export type CloudProvider = 'azure';

export default function App() {
  const [activeTab, setActiveTab] = useState<FooterTab>('projects');
  const [activeLesson, setActiveLesson] = useState<{ courseId: string, lessons: Lesson[], title: string } | null>(null);
  const [activeLab, setActiveLab] = useState<{ lab: LabContent, title: string } | null>(null);
  const [completedLabs, setCompletedLabs] = useState<string[]>([]);
  const [linuxFlavor, setLinuxFlavor] = useState<LinuxFlavor>('ubuntu');
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>('azure');
  const [xp, setXp] = useState<number>(0);

  useEffect(() => {
    // Load XP and completed labs from local storage if needed
    const savedXp = localStorage.getItem('realcloud_xp');
    const savedLabs = localStorage.getItem('realcloud_completed_labs');
    if (savedXp) setXp(parseInt(savedXp));
    if (savedLabs) setCompletedLabs(JSON.parse(savedLabs));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeTab]);

  const completeLab = (projectId: string, xpReward?: number) => {
    if (!completedLabs.includes(projectId)) {
      setCompletedLabs(prev => {
        const newCompleted = [...prev, projectId];
        localStorage.setItem('realcloud_completed_labs', JSON.stringify(newCompleted));
        return newCompleted;
      });
      
      const addedXp = xpReward || 250;
      setXp(currentXp => {
        const newXp = currentXp + addedXp;
        localStorage.setItem('realcloud_xp', newXp.toString());
        return newXp;
      });
    }
  };

  const startCourse = (courseId: string, courseTitle: string) => {
    setActiveLab(null); // Clear active lab
    const content = courseContents.find(c => c.courseId === courseId);
    if (content) {
      setActiveLesson({ courseId, lessons: content.lessons, title: courseTitle });
    } else {
      // Generate a full set of interactive lessons for any course defined in learningPaths
      let lessonCount = 20;
      for (const path of learningPaths) {
        const course = path.courses.find(c => c.id === courseId);
        if (course) { lessonCount = course.lessons || 20; break; }
      }
      setActiveLesson({
        courseId,
        lessons: generateFallbackLessons(courseId, courseTitle, lessonCount),
        title: courseTitle
      });
    }
  };

  const inferCategoryFromTitle = (title: string): string => {
    const normalized = title.toLowerCase();
    if (normalized.includes('kubernetes') || normalized.includes('k8s')) return 'Kubernetes';
    if (normalized.includes('azure') || normalized.includes('entra') || normalized.includes('aks')) return 'Azure';
    if (normalized.includes('security') || normalized.includes('compliance') || normalized.includes('siem') || normalized.includes('audit')) return 'Security';
    if (normalized.includes('python') || normalized.includes('ml') || normalized.includes('model') || normalized.includes('data science')) return 'Python';
    if (normalized.includes('data') || normalized.includes('sql') || normalized.includes('etl') || normalized.includes('pipeline')) return 'Data Science';
    if (normalized.includes('devops') || normalized.includes('cicd') || normalized.includes('ci/cd') || normalized.includes('gitops') || normalized.includes('terraform') || normalized.includes('ansible')) return 'DevOps';
    return 'General';
  };

  const configureKubernetesLab = (lab: LabContent): LabContent => {
    if (lab.environment !== 'kubernetes') return lab;

    // Check if Kubeconfig copy is already part of the first step (to avoid double prepending)
    const firstStepText = lab.steps[0]?.commands?.[0]?.text || '';
    if (firstStepText.includes('admin.conf') || firstStepText.includes('kubeconfig')) {
      return lab;
    }

    // Process the existing steps and split any compound namespace creation + apply/install commands
    const processedSteps: LabStep[] = [];
    lab.steps.forEach(step => {
      const firstCmdText = step.commands?.[0]?.text || '';
      const nsMatch = firstCmdText.match(/(?:kubectl\s+create\s+(?:namespace|ns)\s+(\w+))\s*(?:&&|\n)\s*(kubectl\s+(?:apply|create)\s+[^]+|helm\s+install\s+[^]+)/i);
      
      if (nsMatch) {
        const nsName = nsMatch[1];
        const deployCmdText = nsMatch[2].trim();
        
        // Split into Namespace Creation step and Manifest Deployment step
        processedSteps.push({
          id: `${step.id}-create-ns`,
          title: `Create Namespace: ${nsName}`,
          instruction: `Create a dedicated Kubernetes namespace named "${nsName}" to isolate the resources for this deployment.`,
          summary: `Create namespace ${nsName}`,
          whyNeeded: 'Namespaces provide a logical partition within a cluster. Creating a dedicated namespace prevents resource name collisions and isolates components from other cluster tenants.',
          pillarConnection: 'Security',
          commands: [
            {
              text: `kubectl create namespace ${nsName}`,
              explanation: `Creates the "${nsName}" namespace in the active cluster.`
            }
          ],
          checkCommand: `kubectl get namespace ${nsName}`,
          expectedOutput: nsName
        });

        processedSteps.push({
          id: `${step.id}-apply-manifests`,
          title: step.title,
          instruction: `Deploy the application components in the "${nsName}" namespace.`,
          summary: step.summary,
          whyNeeded: step.whyNeeded,
          pillarConnection: step.pillarConnection || 'Operational Excellence',
          commands: [
            {
              text: deployCmdText,
              explanation: step.commands?.[0]?.explanation || 'Deploys resources in the target namespace.'
            },
            ...(step.commands?.slice(1) || [])
          ],
          checkCommand: step.checkCommand,
          expectedOutput: step.expectedOutput
        });
      } else {
        processedSteps.push(step);
      }
    });

    const setupSteps: LabStep[] = [
      {
        id: `${lab.projectId}-setup-kubeconfig`,
        title: 'Configure Cluster Credentials',
        instruction: 'Configure credentials by copying the Kubernetes administrator configuration file to your user space.',
        summary: 'Set up kubeconfig',
        whyNeeded: 'By default, the Kubernetes API requires credentials for secure authentication. Copying admin.conf to ~/.kube/config enables your local kubectl client to authorize requests to the API server.',
        pillarConnection: 'Security',
        commands: [
          {
            text: 'mkdir -p $HOME/.kube && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config',
            explanation: 'Creates a directory for local kubectl configuration, copies the cluster root credentials from /etc/kubernetes, and gives owner permissions to the standard user.'
          }
        ],
        checkCommand: 'ls $HOME/.kube/config',
        expectedOutput: 'config'
      },
      {
        id: `${lab.projectId}-setup-verify`,
        title: 'Verify Cluster Connectivity',
        instruction: 'Query the Kubernetes API server to check active nodes and retrieve connection metadata to ensure the cluster is ready.',
        summary: 'Verify connectivity',
        whyNeeded: 'Verifying cluster connectivity first confirms the API server is active and accessible before attempting any resource deployments, preventing deployment timeouts.',
        pillarConnection: 'Operational Excellence',
        commands: [
          {
            text: 'kubectl cluster-info && kubectl get nodes',
            explanation: 'Displays cluster API endpoints, server statuses, and retrieves status list for all worker/control-plane nodes.'
          }
        ],
        checkCommand: 'kubectl get nodes',
        expectedOutput: 'Ready'
      }
    ];

    return {
      ...lab,
      steps: [...setupSteps, ...processedSteps]
    };
  };

  const startLab = (projectId: string, projectTitle: string) => {
    setActiveLesson(null); // Clear active lesson
    const content = cloudLabs.find(l => l.projectId === projectId);
    if (content) {
      setActiveLab({ lab: configureKubernetesLab(content), title: projectTitle });
    } else {
      // Find category for specific fallback
      let category = inferCategoryFromTitle(projectTitle);
      const project = projects.find(p => p.id === projectId);
      if (project) category = project.category;

      setActiveLab({
        lab: configureKubernetesLab(generateFallbackLab(projectId, projectTitle, category)),
        title: projectTitle
      });
    }
  };


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white font-sans selection:bg-zinc-900 selection:text-white">
      <Navbar
        activeTab={activeTab === 'projects' || activeTab === 'learn' ? activeTab : 'projects'}
        onTabChange={(tab) => setActiveTab(tab)}
        xp={xp}
      />
      <main>
        {activeTab === 'projects' && (
          <Hero 
            onStart={() => {
              const element = document.getElementById('projects-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }} 
            onViewSkillTrees={() => setActiveTab('learn')}
          />
        )}
        
        {activeTab === 'projects' && <TrustedBy />}

        {activeTab === 'projects' && <StatsBar />}
        
        {activeTab === 'projects' && <HowItWorks />}
        
        {activeTab === 'projects' && (
          <div id="projects-section" className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <h2 className="text-2xl font-bold text-zinc-900">Featured Projects</h2>
              <p className="text-zinc-500 text-sm mt-2">Hands-on experience with real-world scenarios.</p>
            </div>
            <ProjectGrid onStartLab={startLab} completedLabs={completedLabs} />
          </div>
        )}

        {activeTab === 'learn' && (
          <LearnView onStartCourse={startCourse} onStartLab={startLab} completedLabs={completedLabs} />
        )}

        {activeTab === 'projects' && <Features />}

        {activeTab === 'projects' && <Testimonials />}

        {activeTab === 'projects' && <Community onStart={() => { const el = document.getElementById('projects-section'); el?.scrollIntoView({ behavior: 'smooth' }); }} />}

        {activeTab === 'projects' && <AboutUs />}

        {activeTab === 'projects' && <Blog />}

        {activeTab === 'about' && (
          <div className="pt-12">
            <AboutUs />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="pt-12">
            <Blog />
          </div>
        )}

        {activeTab === 'enterprise' && <StaticPage pageId="enterprise" onTabChange={setActiveTab} />}
        {activeTab === 'docs' && <StaticPage pageId="docs" onTabChange={setActiveTab} />}
        {activeTab === 'community' && <StaticPage pageId="community" onTabChange={setActiveTab} />}
        {activeTab === 'changelog' && <StaticPage pageId="changelog" onTabChange={setActiveTab} />}
        {activeTab === 'careers' && <StaticPage pageId="careers" onTabChange={setActiveTab} />}
        {activeTab === 'privacy' && <StaticPage pageId="privacy" onTabChange={setActiveTab} />}
        {activeTab === 'terms' && <StaticPage pageId="terms" onTabChange={setActiveTab} />}
        
        {/* Newsletter Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative group overflow-hidden bg-zinc-900 rounded-[2rem] p-8 md:p-10 border border-zinc-800">
              {/* Subtle background glow */}
              <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] group-hover:bg-brand-blue/20 transition-all duration-1000" />
              <div className="absolute -left-24 -top-24 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px]" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                    Stay ahead of the <span className="text-brand-blue font-semibold">cloud curve.</span>
                  </h3>
                  <p className="mt-2 text-zinc-400 text-base font-light max-w-sm">
                    Weekly labs and engineering tips delivered to your inbox.
                  </p>
                </div>
                
                <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 lg:w-80 px-6 py-4 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/50 transition-all"
                    required
                  />
                  <button className="px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer onTabChange={setActiveTab} />

      <AnimatePresence>
        {activeLesson && (
          <LessonView 
            key="lesson-view"
            courseId={activeLesson.courseId}
            lessons={activeLesson.lessons}
            courseTitle={activeLesson.title}
            onLaunchExercise={startLab}
            onClose={() => setActiveLesson(null)}
            linuxFlavor={linuxFlavor}
            onFlavorChange={setLinuxFlavor}
            cloudProvider={cloudProvider}
            onCloudProviderChange={setCloudProvider}
          />
        )}
        {activeLab && (
          <LabView 
            key="lab-view"
            lab={activeLab.lab}
            projectTitle={activeLab.title}
            currentXp={xp}
            onClose={() => setActiveLab(null)}
            onComplete={(xpReward) => completeLab(activeLab.lab.projectId, xpReward)}
          />
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}

