/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CapabilitiesAndContact } from './components/CapabilitiesAndContact';
import { ExperienceSection } from './components/ExperienceSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import type { ProjectItem } from './data/portfolioData';
import {
  getNextTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from './utils/portfolio';

function getInitialTheme(): ThemeMode {
  try {
    return resolveTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return 'light';
  }
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage access errors in restricted iframe contexts
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => getNextTheme(prev));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] transition-colors duration-300 dark:bg-[#090F1E] dark:text-slate-100">
        <ScrollProgressBar />
        <Header theme={theme} onToggleTheme={handleToggleTheme} />
        <main>
          <HeroSection onSelectProject={setSelectedProject} />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <ExperienceSection />
          <CapabilitiesAndContact />
        </main>
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </MotionConfig>
  );
}
