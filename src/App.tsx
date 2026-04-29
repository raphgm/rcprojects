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
  const [activeTab, setActiveTab] = useState<FooterTab>('projects');
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
        <section className="py-24 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] p-12 md:p-20 border border-zinc-200 shadow-xl relative overflow-hidden">
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">Stay ahead of the <br /><span className="text-brand-blue font-mono font-medium tracking-tight">cloud curve.</span></h3>
                  <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                    Get weekly labs, cloud engineering tips, and platform updates delivered straight to your inbox.
                  </p>
                </div>
                <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-8 py-5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                    required
                  />
                  <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20">
                    Subscribe
                  </button>
                </form>
              </div>
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
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
            onClose={() => setActiveLab(null)}
            onComplete={(xpReward) => completeLab(activeLab.lab.projectId, xpReward)}
          />
        )}
      </AnimatePresence>
    </div>
    </ErrorBoundary>
  );
}

