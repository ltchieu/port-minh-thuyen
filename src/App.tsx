import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/defaultData';
import { PortfolioData } from './types';
import { SparkleOverlay } from './components/common/SparkleOverlay';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StartupSection } from './components/StartupSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { ContactSection } from './components/ContactSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { RandomBackgroundStickers } from './components/common/CuteStickers';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('fashion_portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new activities data is loaded if local storage has stale/outdated data
        if (
          !parsed.projects ||
          !parsed.projects.some((p: any) => p.id === 'uni-06') ||
          !parsed.projects.some((p: any) => p.id === 'proj-marketer-contest') ||
          !parsed.startups ||
          !parsed.startups.some((s: any) => s.id === 'startup-carne-gemstone') ||
          !parsed.activities ||
          !parsed.activities.some((a: any) => a.id === 'act-trang-khuyet') ||
          !parsed.about ||
          parsed.about.name !== 'Lê Thị Kim Thuyên' ||
          !parsed.hero ||
          parsed.hero.profileImage !== '/images/avatar.png' ||
          !parsed.experiences ||
          !parsed.experiences.some((e: any) => e.company === 'MT DIGITAL AGENCY')
        ) {
          return initialPortfolioData;
        }
        return parsed;
      } catch (e) {
        return initialPortfolioData;
      }
    }
    return initialPortfolioData;
  });

  const [sparklesEnabled, setSparklesEnabled] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Scroll section detector
  useEffect(() => {
    const sections = ['hero', 'about', 'experiences', 'projects', 'startups', 'activities', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-paper-texture text-[#2C302E] font-sans-clean selection:bg-[#FF8DA1] selection:text-white">
      {/* Random Floating Stickers Background */}
      <RandomBackgroundStickers />

      {/* Background Sparkles Particle Engine */}
      <SparkleOverlay enabled={sparklesEnabled} cursorTrail={sparklesEnabled} />

      {/* Floating Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        sparklesEnabled={sparklesEnabled}
        onToggleSparkles={() => setSparklesEnabled(!sparklesEnabled)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection data={data.hero} />

        {/* 2. About Me Section */}
        <AboutSection data={data.about} />

        {/* 3. Experiences Section */}
        <ExperiencesSection experiences={data.experiences} />

        {/* 4. Selected Projects Section */}
        <ProjectsSection projects={data.projects} />

        {/* 5. Start Up / Initiatives Section */}
        <StartupSection startups={data.startups} />

        {/* 6. Volunteer & Activities Section */}
        <ActivitiesSection activities={data.activities} />

        {/* 7. Contact Section */}
        <ContactSection data={data.contact} />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 bg-white/50 py-8 text-center">
        <div className="mx-auto max-w-[92rem] px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
            <p className="font-handwritten text-xl font-bold text-stone-700">
              Designed with <FontAwesomeIcon icon={faHeart} className="inline h-4 w-4 text-[#F2789F]" /> for Lê Thị Kim Thuyên • Content Marketing / Social Media Portfolio
            </p>
            <p className="font-sans-clean text-xs text-stone-500">
              © {new Date().getFullYear()} Lê Thị Kim Thuyên. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
