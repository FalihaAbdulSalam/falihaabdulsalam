import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, Search, X } from 'lucide-react';
import {
  ADDITIONAL_PROJECT_GROUPS,
  PROFILE,
  PROJECTS,
  PUBLIC_GITHUB_REPOS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolioData';
import {
  FILTER_OPTIONS,
  filterAndSortProjects,
  getCategoryCounts,
  getSideSlideOffset,
  type FilterOption,
  type SortOption,
} from '../utils/portfolio';
import { ProjectVisual } from './ProjectVisual';
import { ProjectsBlueprintBackdrop } from './VectorIllustrations';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORY_ACCENT: Record<
  ProjectCategory,
  {
    topBar: string;
    text: string;
    badgeBg: string;
    cardBg: string;
    hoverBorder: string;
    hoverShadow: string;
  }
> = {
  'Public Sector': {
    topBar: 'bg-gradient-to-r from-[#E2502A] via-[#8E2F5B] to-[#15795B]',
    text: 'text-[#B93B18] dark:text-orange-400',
    badgeBg: 'bg-orange-50 text-[#B93B18] border-orange-200 dark:bg-orange-950/75 dark:text-orange-300 dark:border-orange-800/80',
    cardBg: 'bg-white dark:bg-[#1A1016]/95',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-400/80',
    hoverShadow:
      'hover:shadow-[0_20px_40px_-14px_rgba(226,80,42,0.24),0_8px_16px_-6px_rgba(26,16,22,0.08)] dark:hover:shadow-[0_20px_44px_-14px_rgba(255,138,92,0.28),0_10px_20px_-6px_rgba(12,6,10,0.65)]',
  },
  'Mobile & Native': {
    topBar: 'bg-gradient-to-r from-[#15795B] via-[#1E8E63] to-[#1F8F72]',
    text: 'text-[#116248] dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 text-[#116248] border-emerald-200 dark:bg-emerald-950/75 dark:text-emerald-300 dark:border-emerald-800/80',
    cardBg: 'bg-white dark:bg-[#1A1016]/95',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-400/80',
    hoverShadow:
      'hover:shadow-[0_20px_40px_-14px_rgba(21,121,91,0.24),0_8px_16px_-6px_rgba(26,16,22,0.08)] dark:hover:shadow-[0_20px_44px_-14px_rgba(42,163,124,0.28),0_10px_20px_-6px_rgba(12,6,10,0.65)]',
  },
  'Commerce & Web': {
    topBar: 'bg-gradient-to-r from-[#7B2B52] via-[#C08A1E] to-[#A96F14]',
    text: 'text-[#7B2B52] dark:text-rose-400',
    badgeBg: 'bg-rose-50 text-[#7B2B52] border-rose-200 dark:bg-rose-950/75 dark:text-rose-300 dark:border-rose-800/80',
    cardBg: 'bg-white dark:bg-[#1A1016]/95',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-400/80',
    hoverShadow:
      'hover:shadow-[0_20px_40px_-14px_rgba(123,43,82,0.24),0_8px_16px_-6px_rgba(26,16,22,0.08)] dark:hover:shadow-[0_20px_44px_-14px_rgba(168,69,122,0.28),0_10px_20px_-6px_rgba(12,6,10,0.65)]',
  },
  'AI & Open Source': {
    topBar: 'bg-gradient-to-r from-[#A9701A] via-[#D9A441] to-[#C08A1E]',
    text: 'text-[#8E5A12] dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-[#8E5A12] border-amber-200 dark:bg-amber-950/75 dark:text-amber-300 dark:border-amber-800/80',
    cardBg: 'bg-white dark:bg-[#1A1016]/95',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-400/80',
    hoverShadow:
      'hover:shadow-[0_20px_40px_-14px_rgba(169,112,26,0.24),0_8px_16px_-6px_rgba(26,16,22,0.08)] dark:hover:shadow-[0_20px_44px_-14px_rgba(217,164,65,0.26),0_10px_20px_-6px_rgba(12,6,10,0.65)]',
  },
};

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categoryCounts = useMemo(() => getCategoryCounts(PROJECTS), []);
  const filteredProjects = useMemo(
    () => filterAndSortProjects(PROJECTS, activeCategory, searchQuery, sortBy),
    [activeCategory, searchQuery, sortBy],
  );

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden animate-gradient-pan border-b border-rose-200/80 bg-gradient-to-br from-[#FBEADF] via-[#FDF2E9] via-[#F9EBF0]/85 to-[#FBF0DC] py-16 lg:py-20 dark:border-rose-900/70 dark:bg-[linear-gradient(135deg,#120A10_0%,#241320_35%,#2A1220_70%,#331322_100%)]"
    >
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-[28rem] w-[28rem] rounded-full bg-rose-400/25 blur-3xl dark:bg-rose-600/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-10 bottom-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400/25 blur-3xl dark:bg-emerald-500/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-10 top-1/2 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-600/18"
        aria-hidden="true"
      />
      <ProjectsBlueprintBackdrop />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#B93B18] dark:text-orange-400">
              <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#E2502A] to-[#15795B]" aria-hidden="true" />
              <span>01. Selected Works &amp; Case Studies</span>
            </p>
            <h2
              className="font-display mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Live portals, mobile apps, and commercial products built for scale.
            </h2>
          </div>
          <p className="text-sm font-medium text-stone-600 tabular-nums dark:text-stone-300">
            Showing {filteredProjects.length} of {PROJECTS.length} documented projects
          </p>
        </motion.div>

        {/* Filter Bar: Segmented Category Tabs + Search + Sort */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-rose-200/80 bg-white/90 p-3.5 shadow-xs backdrop-blur-xs lg:flex-row lg:items-center lg:justify-between dark:border-stone-700/80 dark:bg-[#1A1016]/90">
          <div
            role="tablist"
            aria-label="Filter projects by domain"
            className="flex flex-wrap items-center gap-1 rounded-xl bg-stone-100/90 p-1 dark:bg-stone-800/90"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = activeCategory === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(option)}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] ${
                    isSelected
                      ? 'text-white'
                      : 'text-stone-700 hover:text-[#B93B18] dark:text-stone-300 dark:hover:text-orange-400'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projects-filter-tab"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#E2502A] to-[#8E2F5B] shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">
                    {option} ({categoryCounts[option]})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <label htmlFor="project-search" className="sr-only">
                Search projects by title or technology
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-stone-500"
                aria-hidden="true"
              />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Akshaya, React Native..."
                className="h-10 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-8 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#E2502A] focus:outline-none focus:ring-2 focus:ring-[#E2502A]/20 sm:w-68 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-stone-400 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div>
              <label htmlFor="project-sort" className="sr-only">
                Sort projects
              </label>
              <select
                id="project-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-xs font-medium text-stone-700 focus:border-[#E2502A] focus:outline-none focus:ring-2 focus:ring-[#E2502A]/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200"
              >
                <option value="featured">Sort: Featured Impact</option>
                <option value="alphabetical">Sort: Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Bento Grid with Card Entrance & Scroll Animations */}
        {filteredProjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-12 text-center dark:border-stone-700/80 dark:bg-[#1A1016]/95">
            <h3 className="font-display text-lg font-semibold text-stone-950 dark:text-white">
              No projects match your current filter
            </h3>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
              Try clearing the search query or switching back to all project categories.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center rounded-lg bg-[#E2502A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9A2E12]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            data-testid="projects-grid"
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isWide =
                  project.bentoSpan === 'wide' &&
                  activeCategory === 'All' &&
                  !searchQuery.trim() &&
                  sortBy === 'featured';
                const accent = CATEGORY_ACCENT[project.category];
                const slideFromX = getSideSlideOffset(idx, 64);

                return (
                  <motion.article
                    key={project.id}
                    layout
                    data-slide-direction={slideFromX < 0 ? 'left' : 'right'}
                    initial={{ opacity: 0, x: slideFromX, scale: 0.98 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
                    whileHover={{
                      y: -6,
                      scale: 1.014,
                      transition: { duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] },
                    }}
                    whileTap={{
                      scale: 0.995,
                      transition: { duration: 0.1 },
                    }}
                    transition={{
                      duration: 0.52,
                      delay: Math.min((idx % 2) * 0.07, 0.14),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`card-sheen group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 dark:border-stone-700/80 ${accent.cardBg} shadow-sm transition-[box-shadow,border-color] duration-200 ${accent.hoverShadow} ${accent.hoverBorder} ${
                      isWide ? 'lg:col-span-2' : ''
                    }`}
                  >
                  <div>
                    <div className={`h-1.5 w-full ${accent.topBar}`} aria-hidden="true" />
                    <div className="p-5 pb-0">
                      <div className="transition-transform duration-300 ease-out group-hover:scale-[1.015]">
                        <ProjectVisual visualType={project.visualType} compact={!isWide} />
                      </div>

                      {/* Metadata Row with Tinted Category Tag */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{project.organization}</span>
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${accent.badgeBg}`}
                        >
                          {project.category}
                        </span>
                        <span className="font-mono text-stone-500 tabular-nums dark:text-stone-400">{project.year}</span>
                      </div>

                      <h3 className="font-display mt-2.5 text-xl font-bold tracking-tight text-stone-950 dark:text-white">
                        {project.title}
                      </h3>

                      <p className={`mt-1 text-xs font-semibold ${accent.text}`}>
                        {project.impactMetric}
                      </p>

                      <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        {project.summary}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-stone-200/80 bg-white/90 px-2 py-0.5 font-mono text-[11px] font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-800/90 dark:text-stone-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mx-5 mb-5 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/70 pt-4 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      aria-label={`Read case study for ${project.title}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-950 transition-colors hover:text-[#B93B18] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:text-stone-100 dark:hover:text-orange-400"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>

                    <div className="flex items-center gap-4">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View GitHub repository for ${project.title}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:text-stone-300 dark:hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Source</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live site for ${project.title}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#B93B18] hover:text-[#8E2F5B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] rounded-sm dark:text-orange-400 dark:hover:text-orange-300"
                        >
                          <span>{project.liveLabel ?? 'Live Site'}</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
            </AnimatePresence>
          </div>
        )}

        {/* Public GitHub Repositories & Additional Infrastructure */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-stone-200 pt-12 lg:grid-cols-12 dark:border-stone-700/70">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <h3 className="font-display text-xl font-bold tracking-tight text-stone-950 dark:text-white">
              Public GitHub Repositories &amp; Additional Systems
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Public codebases are published on{' '}
              <a
                href={PROFILE.githubPrimaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#B93B18] hover:underline dark:text-orange-400"
              >
                github.com/FalihaAbdulSalam
              </a>
              . Enterprise and government repositories (such as Akshaya, Niyamasabha, Malayalam Mission,
              SCOLE-Kerala, Sarva Audios, and TrackEase) remain private under organizational NDA; their live
              production portals are linked directly above.
            </p>

            <div className="mt-6 space-y-5">
              {ADDITIONAL_PROJECT_GROUPS.map((group) => (
                <div key={group.group} className="border-t border-stone-200 pt-4 dark:border-stone-700/70">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#15795B] dark:text-emerald-400">
                    {group.group}
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {group.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-4 text-sm">
                        <span className="font-medium text-stone-900 dark:text-stone-200">{item.name}</span>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-[#B93B18] hover:underline shrink-0 dark:text-orange-400"
                          >
                            <span>Visit</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="text-xs text-stone-500 dark:text-stone-400">{item.note ?? 'Production'}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.52, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-700/80 dark:bg-[#1A1016]/95">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#E2502A] via-[#15795B] to-[#7B2B52]" aria-hidden="true" />
              <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50/70 px-5 py-4 text-stone-900 dark:border-stone-800 dark:bg-stone-800/70 dark:text-white">
                <span className="text-sm font-bold">
                  Verified Public Repositories
                </span>
                <span className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#B93B18] tabular-nums dark:border-rose-700/80 dark:bg-rose-950/80 dark:text-orange-300">
                  {PUBLIC_GITHUB_REPOS.length} public repos
                </span>
              </div>
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {PUBLIC_GITHUB_REPOS.map((repo) => (
                  <div
                    key={repo.url}
                    className="flex flex-col justify-between gap-3 px-5 py-4 transition-colors hover:bg-orange-50/40 sm:flex-row sm:items-center dark:hover:bg-stone-800/50"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <span className="font-mono text-stone-700 dark:text-stone-300">{repo.account}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#15795B] dark:text-emerald-400">{repo.language}</span>
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-950 hover:text-[#B93B18] dark:text-white dark:hover:text-orange-400"
                      >
                        <span>{repo.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <p className="mt-0.5 text-xs text-stone-600 dark:text-stone-400">{repo.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {repo.liveUrl && (
                        <a
                          href={repo.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-orange-200 bg-orange-50/70 px-3 py-1.5 text-xs font-medium text-[#B93B18] transition-colors hover:bg-orange-100 whitespace-nowrap dark:border-orange-800/80 dark:bg-orange-950/70 dark:text-orange-300 dark:hover:bg-orange-900/70"
                        >
                          Live Demo
                        </a>
                      )}
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-gradient-to-r from-[#1A1016] to-[#2A1B22] px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap dark:from-rose-600 dark:to-orange-600"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
