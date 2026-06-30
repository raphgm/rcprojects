import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SreCommandCenter } from './components/SreCommandCenter';
import { ProjectGrid } from './components/ProjectGrid';
import { Hero } from './components/Hero';
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
import { Layers, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';
import { Sparkle, SquigglyArrow, ZigZag, DoodleWrapper } from './components/Doodles';
import { StatsBar } from './components/StatsBar';
import { Community } from './components/Community';
import { StaticPage } from './components/StaticPage';
import type { FooterTab } from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { courseContents } from './data/courseContent';
import { cloudLabs } from './data/cloudLabs';
import { learningPaths } from './data/learningPaths';
import { Lesson, LabContent, LabStep, LinuxFlavor, CloudProvider } from './types/content';
import { generateFallbackLessons } from './data/lessonGenerator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';
import { projects } from './data/projects';
import { generateFallbackLab } from './data/labGenerator';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [activeTab, setActiveTab] = useState<FooterTab>('projects');
  const [activeLesson, setActiveLesson] = useState<{ courseId: string, lessons: Lesson[], title: string } | null>(null);
  const [activeLab, setActiveLab] = useState<{ lab: LabContent, title: string } | null>(null);
  const { user, xp, completedLabs, completeLab, loginRedirect, logout } = useAuth();
  const [linuxFlavor, setLinuxFlavor] = useState<LinuxFlavor>('ubuntu');
  const [cloudProvider, setCloudProvider] = useState<CloudProvider>('azure');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activeTab]);

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
    if (!lab || !lab.steps || lab.steps.length === 0) return lab;
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

  const startLab = (projectId: string, projectTitle: string, pushHistory = true) => {
    setActiveLesson(null); // Clear active lesson
    const content = cloudLabs.find(l => l.projectId === projectId);
    let chosenLab;
    if (content) {
      chosenLab = configureKubernetesLab(content);
    } else {
      let category = inferCategoryFromTitle(projectTitle);
      const project = projects.find(p => p.id === projectId);
      if (project) category = project.category;
      chosenLab = configureKubernetesLab(generateFallbackLab(projectId, projectTitle, category));
    }
    
    setActiveLab({ lab: chosenLab, title: projectTitle });
    
    if (pushHistory) {
      window.history.pushState({ labId: projectId }, '', `?lab=${encodeURIComponent(projectId)}`);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const labId = params.get('lab');
      if (labId) {
        const project = projects.find(p => p.id === labId);
        if (project) {
          const staticLab = cloudLabs.find(l => l.projectId === labId);
          setActiveLab({
            lab: staticLab ? configureKubernetesLab(staticLab) : configureKubernetesLab(generateFallbackLab(labId, project.title, project.category)),
            title: project.title
          });
        }
      } else {
        setActiveLab(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    const params = new URLSearchParams(window.location.search);
    const labId = params.get('lab');
    if (labId) {
      const project = projects.find(p => p.id === labId);
      if (project) {
        const staticLab = cloudLabs.find(l => l.projectId === labId);
        setActiveLab({
          lab: staticLab ? configureKubernetesLab(staticLab) : configureKubernetesLab(generateFallbackLab(labId, project.title, project.category)),
          title: project.title
        });
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  return (
    <ErrorBoundary>
      <div className={`min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-400 transition-colors duration-300 ${activeTab === 'projects' ? 'bg-[#07090e]' : 'bg-white'}`}>
      <Navbar
        activeTab={activeTab === 'projects' || activeTab === 'learn' ? activeTab : 'projects'}
        onTabChange={(tab) => setActiveTab(tab)}
        xp={xp}
      />
      <main>
        {activeTab === 'projects' && (
          <>
            <Hero 
              onStart={() => {
                const element = document.getElementById('tycoon-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }} 
              onViewSkillTrees={() => setActiveTab('learn')}
            />
            <SreCommandCenter 
              onStartLab={startLab}
              completedLabs={completedLabs}
              xp={xp}
            />

            {/* Onboarding Steps: From Zero to Expert */}
            <div className="bg-[#fcfbf9] text-zinc-900 py-24 border-y border-zinc-200/80 relative z-10 overflow-hidden">
              {/* background doodles */}
              <DoodleWrapper className="top-12 left-10 text-zinc-200 w-24 h-24 rotate-12">
                <ZigZag className="w-full h-full" />
              </DoodleWrapper>
              <DoodleWrapper className="bottom-8 right-16 text-zinc-200 w-32 h-32 -rotate-12">
                <SquigglyArrow className="w-full h-full" />
              </DoodleWrapper>

              <div className="max-w-6xl mx-auto px-6 relative">
                <div className="mb-14 relative inline-block">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 mb-2 font-sans flex items-center gap-3">
                    From zero to expert.
                    <Sparkle className="w-8 h-8 text-amber-500 animate-pulse shrink-0" />
                  </h2>
                  <p className="text-2xl font-bold text-zinc-400 font-sans">
                    Three steps.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {/* Step 1 */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute top-6 right-8 text-6xl font-black text-zinc-100 select-none font-mono">01</div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-900 mb-3 font-sans">Pick a skill path</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      Choose from 28 paths across Linux, Cloud, DevOps, Data, FinOps, and Security. Filter by level — beginner to advanced.
                    </p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute top-6 right-8 text-6xl font-black text-zinc-100 select-none font-mono">02</div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                      <TerminalIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-900 mb-3 font-sans">Launch your sandbox</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      A private, pre-configured environment spins up in seconds. No installs, no config — just start building.
                    </p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-8 relative overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute top-6 right-8 text-6xl font-black text-zinc-100 select-none font-mono">03</div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-900 mb-3 font-sans">Verify & earn XP</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                      Run `realcloud verify` and our engine checks your work automatically. Pass → XP and badges. Fail → a hint.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Project Grid Container with White Background */}
            <div className="bg-white text-zinc-900 pt-8 pb-24 relative z-10 border-t border-zinc-200 overflow-hidden">
              {/* Engineering Grid / Wire Mesh Background stretched up to include ALL LAB MISSION DIRECTORY */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[580px] pointer-events-none opacity-[0.55] z-0"
                style={{
                  backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
                }}
              />
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="text-xs font-black tracking-widest text-zinc-400 mb-8 uppercase relative z-10">ALL LAB MISSION DIRECTORY</h2>
                <ProjectGrid onStartLab={startLab} completedLabs={completedLabs} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'learn' && (
          <LearnView onStartCourse={startCourse} onStartLab={startLab} completedLabs={completedLabs} />
        )}

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
            onClose={() => { setActiveLab(null); window.history.pushState({}, '', window.location.pathname); }}
            onComplete={(xpReward) => completeLab(activeLab.lab.projectId, xpReward)}
          />
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}

