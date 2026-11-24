import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDownToLine,
  Briefcase,
  ChevronRight,
  Cpu,
  FolderGit2,
  Home,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { getActiveSectionId, type ThemeMode } from '../utils/portfolio';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { id: 'top', href: '#top', label: 'Overview', Icon: Home, accent: 'text-[#2563EB] dark:text-sky-400' },
  { id: 'projects', href: '#projects', label: 'Projects', Icon: FolderGit2, accent: 'text-[#0D9488] dark:text-teal-400' },
  { id: 'experience', href: '#experience', label: 'Experience', Icon: Briefcase, accent: 'text-[#7C3AED] dark:text-violet-400' },
  { id: 'capabilities', href: '#capabilities', label: 'Capabilities', Icon: Cpu, accent: 'text-[#EC4899] dark:text-pink-400' },
  { id: 'contact', href: '#contact', label: 'Contact', Icon: Mail, accent: 'text-[#EA580C] dark:text-orange-400' },
] as const;

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('top');
  const [scrolled, setScrolled] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    let rafId = 0;

    const syncScrollState = () => {
      rafId = 0;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(scrollY > 18);

      const offsets = NAV_LINKS.map((item) => {
        const el = document.getElementById(item.id);
        return {
          id: item.id,
          top: el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY,
        };
      });

      const nearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 40;
      setActiveId(nearBottom ? 'contact' : getActiveSectionId(offsets, 140));
    };

    const scheduleSync = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(syncScrollState);
      }
    };

    syncScrollState();
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? 'true' : 'false'}
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-indigo-200/80 bg-white/92 shadow-[0_10px_30px_-14px_rgba(37,99,235,0.18)] backdrop-blur-md dark:border-indigo-500/30 dark:bg-[#0B1328]/90 dark:shadow-[0_10px_30px_-14px_rgba(37,99,235,0.35)]'
          : 'border-b border-slate-200/80 bg-white/95 backdrop-blur-sm dark:border-slate-800/90 dark:bg-[#0B1328]/92'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Zone 1: Brand Monogram + Wordmark */}
        <a
          href="#top"
          onClick={() => setActiveId('top')}
          className="group inline-flex items-center gap-2.5 rounded-lg py-1 pr-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#2563EB_0%,#7C3AED_55%,#0D9488_100%)] font-display text-xs font-bold tracking-tight text-white shadow-xs transition-transform duration-150 group-hover:scale-105"
          >
            FAS
          </span>
          <span className="font-display text-[17px] font-bold tracking-tight text-slate-950 transition-colors group-hover:text-[#1D4ED8] dark:text-white dark:group-hover:text-sky-400">
            {PROFILE.name}
          </span>
        </a>

        {/* Zone 2: Elevated Segmented Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-1 rounded-xl border border-slate-200/85 bg-slate-100/75 p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] dark:border-slate-700/80 dark:bg-slate-900/85 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            const Icon = link.Icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveId(link.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  isActive
                    ? 'text-slate-950 dark:text-white'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg border border-indigo-200/80 bg-white shadow-xs dark:border-indigo-400/40 dark:bg-slate-800/95"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[linear-gradient(90deg,#2563EB,#7C3AED,#0D9488)]" />
                  </motion.span>
                )}
                <Icon
                  className={`relative z-10 hidden h-3.5 w-3.5 lg:block transition-colors ${
                    isActive ? link.accent : 'text-slate-400 dark:text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle, Primary Resume CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="theme-toggle"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200/90 bg-slate-50/90 px-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-150 hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:border-sky-400/50 dark:hover:bg-slate-800 dark:hover:text-amber-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -60, opacity: 0, scale: 0.75 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center justify-center"
                >
                  <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 60, opacity: 0, scale: 0.75 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -60, opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center justify-center"
                >
                  <Moon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
            <span className="hidden lg:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563EB_0%,#4F46E5_55%,#0D9488_100%)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/20 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B1328]"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Resume PDF</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              mobileOpen
                ? 'border-indigo-300 bg-indigo-50 text-[#1D4ED8] dark:border-indigo-500/60 dark:bg-indigo-950/70 dark:text-sky-300'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:border-slate-600'
            }`}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Elevated Mobile Navigation Card */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-200/80 bg-gradient-to-b from-slate-50/90 to-white px-4 py-3 shadow-lg lg:hidden dark:border-slate-800 dark:from-[#0B1328]/95 dark:to-[#0F172A]/95"
          >
            <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white p-2 shadow-sm dark:border-slate-700/80 dark:bg-[#0F172A]">
              <div className="mb-2 h-1 rounded-full bg-[linear-gradient(90deg,#2563EB,#0D9488,#7C3AED,#EC4899)]" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeId === link.id;
                  const Icon = link.Icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setActiveId(link.id);
                        setMobileOpen(false);
                      }}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-indigo-50/90 text-slate-950 dark:bg-slate-800/90 dark:text-white'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                            isActive
                              ? 'border-indigo-200 bg-white shadow-2xs dark:border-indigo-500/50 dark:bg-slate-900'
                              : 'border-slate-200/80 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                          }`}
                        >
                          <Icon
                            className={`h-3.5 w-3.5 ${isActive ? link.accent : 'text-slate-500 dark:text-slate-400'}`}
                            aria-hidden="true"
                          />
                        </span>
                        <span>{link.label}</span>
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 ${isActive ? 'text-[#2563EB] dark:text-sky-400' : 'text-slate-300 dark:text-slate-600'}`}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563EB_0%,#4F46E5_55%,#0D9488_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                >
                  <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
