import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, Linkedin } from 'lucide-react';
import { KEY_METRICS, PROFILE, PROJECTS, type ProjectItem } from '../data/portfolioData';
import { formatMetricValue, parseMetricValue } from '../utils/portfolio';
import { ProjectVisual } from './ProjectVisual';
import { CodeVectorBackdrop, HeroFloatingTechIcons } from './VectorIllustrations';

interface HeroSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FLAGSHIP_TABS = [
  { id: 'akshaya', label: 'Akshaya' },
  { id: 'niyamasabha', label: 'Niyamasabha' },
  { id: 'malayalam-mission', label: 'Malayalam Mission' },
] as const;

const METRIC_ACCENTS = [
  'text-[#E2502A] dark:text-orange-400',
  'text-[#15795B] dark:text-emerald-400',
  'text-[#C08A1E] dark:text-amber-400',
  'text-[#A9701A] dark:text-amber-400',
];

const HERO_BACKDROP_STYLE = {
  backgroundImage:
    'radial-gradient(circle at 14% 20%, rgba(226, 80, 42, 0.28) 0%, transparent 42%), radial-gradient(circle at 86% 18%, rgba(123, 43, 82, 0.26) 0%, transparent 44%), radial-gradient(circle at 74% 82%, rgba(192, 138, 30, 0.22) 0%, transparent 45%), radial-gradient(circle at 32% 78%, rgba(21, 121, 91, 0.22) 0%, transparent 44%)',
};

function AnimatedMetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseMetricValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || prefersReducedMotion || parsed.target <= 0) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const durationMs = 780;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(formatMetricValue(parsed.target * eased, parsed));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isInView, prefersReducedMotion, parsed.target, parsed.suffix, parsed.useCommas, value]);

  return <span ref={ref}>{display}</span>;
}

export function HeroSection({ onSelectProject }: HeroSectionProps) {
  const [activeId, setActiveId] = useState<string>(FLAGSHIP_TABS[0].id);
  const { scrollY } = useScroll();
  const vectorParallaxY = useTransform(scrollY, [0, 500], [0, 48]);

  const activeProject =
    PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  return (
    <section
      id="top"
      className="relative overflow-hidden animate-gradient-pan border-b border-rose-200/80 bg-[linear-gradient(135deg,#FBEADF_0%,#FDF2E9_28%,#F1F7F1_55%,#F6E7ED_80%,#FBF0DC_100%)] dark:border-rose-900/70 dark:bg-[linear-gradient(135deg,#170D14_0%,#241320_28%,#10201A_55%,#2A1220_80%,#331322_100%)]"
    >
      {/* Cohesive Multi-Tone Pastel / Deep Aurora Mesh & Subtle Architectural Dot Grid */}
      <div className="pointer-events-none absolute inset-0" style={HERO_BACKDROP_STYLE}>
        <div
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(226,80,42,0.12)_1px,transparent_1px)] [background-size:24px_24px] dark:opacity-35 dark:[background-image:radial-gradient(rgba(255,180,150,0.16)_1px,transparent_1px)]"
          aria-hidden="true"
        />
        <div
          className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-orange-400/25 blur-3xl dark:bg-orange-500/20"
          aria-hidden="true"
        />
        <div
          className="absolute right-12 top-10 h-96 w-96 rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-6 left-1/3 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-400/20"
          aria-hidden="true"
        />
      </div>

      {/* Floating Background Code & UI Syntax Vectors */}
      <motion.div style={{ y: vectorParallaxY }} className="pointer-events-none absolute inset-0">
        <CodeVectorBackdrop variant="colorful" />
      </motion.div>

      {/* Subtle Floating 3D React, TypeScript & React Native Orbit Icons */}
      <HeroFloatingTechIcons />

      {/* Subtle Animated Orbital Vector Rings */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-[440px] w-[440px] text-[#E2502A]/20 animate-orbit-slow dark:text-orange-400/25"
        viewBox="0 0 460 460"
        fill="none"
      >
        <circle cx="230" cy="230" r="195" stroke="currentColor" strokeWidth="1.3" strokeDasharray="8 10" />
        <circle cx="230" cy="230" r="140" stroke="#C08A1E" strokeOpacity="0.32" strokeWidth="1.2" />
        <circle cx="230" cy="35" r="5" fill="#E2502A" fillOpacity="0.65" />
        <circle cx="370" cy="230" r="4.5" fill="#15795B" fillOpacity="0.65" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-10 pt-8 lg:pb-12 lg:pt-12">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Typographic Hierarchy + Coding Workspace Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E2502A]/25 bg-white/75 px-3 py-1 text-xs font-semibold text-[#B93B18] shadow-xs backdrop-blur-sm dark:border-orange-400/30 dark:bg-slate-900/60 dark:text-orange-300">
                  <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-[#15795B] dark:bg-emerald-400" aria-hidden="true" />
                  {PROFILE.shortTitle}
                </span>
                <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  {PROFILE.location}
                </span>
              </div>

              <h1
                className="font-display mt-4 text-[2.05rem] font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-[2.55rem] sm:leading-[1.1] lg:text-[3rem] lg:leading-[1.08] dark:text-white"
                style={{ textWrap: 'balance' }}
              >
                Front-end and React Native engineer with{' '}
                <span className="bg-gradient-to-r from-[#E2502A] via-[#7B2B52] to-[#C08A1E] bg-clip-text text-transparent dark:from-orange-400 dark:via-rose-400 dark:to-amber-400 text-shimmer">
                  4+ years
                </span>{' '}
                building fast, reliable platforms, based in Kerala, India.
              </h1>

              <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                {PROFILE.bio}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 btn-shine rounded-lg bg-gradient-to-r from-[#E2502A] via-[#8E2F5B] to-[#15795B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#170D14]"
              >
                <span>Explore Selected Works</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#B93B18] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:hover:text-orange-400"
                >
                  <Linkedin className="h-4 w-4 text-[#E2502A] dark:text-orange-400" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE.githubPrimaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#7B2B52] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:hover:text-rose-400"
                >
                  <Github className="h-4 w-4 text-slate-900 dark:text-slate-200" aria-hidden="true" />
                  <span>{PROFILE.githubPrimaryHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Flagship Kerala Portal Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="flex h-full flex-col justify-between card-sheen overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md dark:border-slate-700/80 dark:bg-[#1A1016]/95 dark:shadow-[0_20px_40px_-15px_rgba(12,6,10,0.7)]">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#E2502A] via-[#15795B] to-[#C08A1E]" aria-hidden="true" />
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-col gap-2.5 pb-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#15795B] whitespace-nowrap dark:text-emerald-400">
                      Flagship Systems
                    </span>
                    <div
                      role="tablist"
                      aria-label="Flagship system switcher"
                      className="grid w-full grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1 sm:flex sm:w-auto sm:items-center dark:bg-slate-800/90"
                    >
                      {FLAGSHIP_TABS.map((tab) => {
                        const isActive = tab.id === activeProject.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveId(tab.id)}
                            className={`relative rounded-md px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] ${
                              isActive
                                ? 'text-white'
                                : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="hero-flagship-tab"
                                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                                className="absolute inset-0 rounded-md bg-gradient-to-r from-[#E2502A] to-[#8E2F5B] shadow-xs"
                                aria-hidden="true"
                              />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-1 flex-col gap-4"
                    >
                      <div className="flex flex-1 flex-col">
                        <ProjectVisual visualType={activeProject.visualType} className="flex-1" />
                      </div>

                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {activeProject.organization} <span aria-hidden="true">·</span>{' '}
                          <span className="font-medium text-[#E2502A] dark:text-orange-400">{activeProject.category}</span>{' '}
                          <span aria-hidden="true">·</span> {activeProject.year}
                        </div>
                        <h2 className="font-display mt-1 text-lg font-semibold text-slate-950 dark:text-white">
                          {activeProject.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {activeProject.summary}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-3.5 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onSelectProject(activeProject)}
                    className="text-xs font-semibold text-[#B93B18] hover:text-[#8E2F5B] hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:text-orange-400 dark:hover:text-orange-300"
                  >
                    Inspect Case Study
                  </button>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#15795B] hover:text-[#B93B18] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      <span>{activeProject.liveLabel}</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Crisp 4-Column KPI Strip Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="card-sheen relative mt-8 overflow-hidden rounded-2xl border border-rose-200/80 bg-white/95 px-6 py-6 shadow-md backdrop-blur-xs lg:px-8 dark:border-slate-700/80 dark:bg-[#1A1016]/95 dark:shadow-[0_18px_36px_-15px_rgba(12,6,10,0.65)]"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#E2502A_0%,#15795B_34%,#C08A1E_68%,#A9701A_100%)]" aria-hidden="true" />

          <div className="relative z-10 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {KEY_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="space-y-1"
              >
                <div
                  className={`font-display text-2xl font-bold tracking-tight tabular-nums sm:text-3xl ${
                    METRIC_ACCENTS[idx % METRIC_ACCENTS.length]
                  }`}
                >
                  <AnimatedMetricValue value={metric.value} />
                </div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white">{metric.label}</div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{metric.context}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vibrant Marquee Section Divider */}
      <div className="relative z-10 overflow-hidden border-t border-slate-200 bg-white py-3 dark:border-rose-900/60 dark:bg-[#150C12]">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white to-white/0 sm:w-24 dark:from-[#150C12]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white to-white/0 sm:w-24 dark:from-[#150C12]"
          aria-hidden="true"
        />
        <div className="animate-marquee select-none text-xs font-medium tracking-wide text-slate-600 dark:text-slate-300">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 px-3">
              <span className="font-semibold text-[#E2502A] dark:text-orange-400">Akshaya e-Governance</span>
              <span aria-hidden="true">·</span>
              <span>React 19 &amp; TypeScript</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#15795B] dark:text-emerald-400">Niyamasabha &amp; Malayalam Mission</span>
              <span aria-hidden="true">·</span>
              <span>React Native &amp; Expo</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#7B2B52] dark:text-rose-400">Next.js &amp; Redux Toolkit</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#A9701A] dark:text-amber-400">AI-Accelerated Engineering</span>
              <span aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
