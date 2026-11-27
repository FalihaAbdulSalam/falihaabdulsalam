import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Github, Lock, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-xs dark:bg-slate-950/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-700/80 dark:bg-[#1A1016]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{project.organization}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.role}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                </div>
                <h2
                  id="modal-project-title"
                  className="font-display mt-1.5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white"
                >
                  {project.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study modal"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E2502A] dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">
              <ProjectVisual visualType={project.visualType} />
            </div>

            <div className="mt-5 border-b border-slate-200 pb-4 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B93B18] dark:text-orange-400">
                Key Outcome: {project.impactMetric}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.summary}</p>
            </div>

            <div className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Engineering &amp; Architecture Highlights
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {project.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="pt-0.5 font-mono text-xs text-[#B93B18] tabular-nums dark:text-orange-400">
                      0{idx + 1}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">Technology Stack</div>
              <p className="mt-1 font-mono text-xs text-slate-800 dark:text-slate-200">{project.stack.join(' · ')}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {project.repoVisibility === 'private' ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    Private organization repository (source NDA)
                  </span>
                ) : (
                  <span>Public open-source repository</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>View GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#B93B18] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9A2E12] dark:bg-orange-600 dark:hover:bg-orange-500"
                  >
                    <span>Open {project.liveLabel ?? 'Live Site'}</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
