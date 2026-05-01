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
import { labContents } from './data/labContent';
import { learningPaths } from './data/learningPaths';
import { Lesson, LabContent } from './types/content';
import { generateFallbackLessons } from './data/lessonGenerator';
import { ErrorBoundary } from './components/ErrorBoundary';
import { db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';

export type LinuxFlavor = 'ubuntu' | 'centos' | 'alpine' | 'rhel';
export type CloudProvider = 'azure';

export default function App() {
  const [activeTab, setActiveTab] = useState<FooterTab>('learn');
  const [activeLesson, setActiveLesson] = useState<{ lessons: Lesson[], title: string } | null>(null);
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
      setActiveLesson({ lessons: content.lessons, title: courseTitle });
    } else {
      // Generate a full set of interactive lessons for any course defined in learningPaths
      let lessonCount = 20;
      for (const path of learningPaths) {
        const course = path.courses.find(c => c.id === courseId);
        if (course) { lessonCount = course.lessons || 20; break; }
      }
      setActiveLesson({
        lessons: generateFallbackLessons(courseId, courseTitle, lessonCount),
        title: courseTitle
      });
    }
  };

  const startLab = (projectId: string, projectTitle: string) => {
    setActiveLesson(null); // Clear active lesson
    const content = labContents.find(l => l.projectId === projectId);
    if (content) {
      setActiveLab({ lab: content, title: projectTitle });
    } else {
      // Fallback for demo purposes
      setActiveLab({
        lab: {
          projectId,
          environment: 'linux',
          steps: [
            { id: 'step-1', title: 'Initialize Environment', instruction: `Prepare the environment for ${projectTitle}.`, hint: 'Check if you have the necessary CLI tools installed.' },
            { id: 'step-2', title: 'Core Implementation', instruction: `Execute the main tasks for ${projectTitle}.`, hint: 'Follow the architecture diagram provided in the documentation.' },
            { id: 'step-3', title: 'Verification', instruction: 'Verify that all components are working as expected.', hint: 'Use the check commands to validate your deployment.' }
          ]
        },
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
            lessons={activeLesson.lessons}
            courseTitle={activeLesson.title}
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

