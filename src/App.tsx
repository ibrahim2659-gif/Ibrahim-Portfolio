import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SpaceBackground } from './components/3d/SpaceBackground';
import { CustomCursor } from './components/CustomCursor';
import { ResumeModal } from './components/ResumeModal';
import { sound } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Check system prefers-reduced-motion on initial load
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Update sound synthesizer enabled state
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
  };

  const handleToggleMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  // ScrollSpy for Active Section Navigation
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'education', 'resume', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#176BFF]/30 selection:text-[#00D9FF] relative cyber-grid-bg">
      {/* Interactive Cyber Custom Cursor (Auto-disabled on mobile touch) */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Atmospheric Star & Constellation Background Canvas */}
      <SpaceBackground reducedMotion={reducedMotion} />

      {/* Futuristic Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleMotion={handleToggleMotion}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section with Interactive 3D Hologram AI Core */}
        <Hero
          reducedMotion={reducedMotion}
          onExploreWork={() => scrollToSection('projects')}
          onDownloadResume={() => scrollToSection('resume')}
        />

        {/* About Me Section with 3D Profile Card & Career Objective */}
        <About />

        {/* Technical Skills Section with 3D Cards */}
        <Skills />

        {/* My Projects Showcase with 3D Cards & Concept Modals */}
        <Projects />

        {/* Education Timeline with Glowing Milestones */}
        <Education />

        {/* Resume Section with Preview & PDF Handlers */}
        <ResumeSection onOpenModal={() => setIsResumeModalOpen(true)} />

        {/* Contact Section with Interactive Form & Links */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
