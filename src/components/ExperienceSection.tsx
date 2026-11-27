import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EDUCATION, EXPERIENCES } from '../data/portfolioData';
import { getSideSlideOffset } from '../utils/portfolio';
import { ExperienceRoadmapVector } from './VectorIllustrations';

const ROLE_STYLES = [
  {
    text: 'text-[#B93B18] dark:text-orange-400',
    bar: 'bg-gradient-to-r from-[#E2502A] to-[#8E2F5B]',
    node: 'bg-[#E2502A] ring-orange-200 dark:bg-orange-400 dark:ring-orange-900/80',
    card: 'bg-white dark:bg-[#1A1016]/95',
    badge: 'bg-orange-50 text-[#B93B18] border-orange-200 dark:bg-orange-950/75 dark:text-orange-300 dark:border-orange-800/80',
  },
  {
    text: 'text-[#116248] dark:text-emerald-400',
    bar: 'bg-gradient-to-r from-[#15795B] to-[#1F8F72]',
    node: 'bg-[#15795B] ring-emerald-200 dark:bg-emerald-400 dark:ring-emerald-900/80',
    card: 'bg-white dark:bg-[#1A1016]/95',
    badge: 'bg-emerald-50 text-[#116248] border-emerald-200 dark:bg-emerald-950/75 dark:text-emerald-300 dark:border-emerald-800/80',
  },
  {
    text: 'text-[#7B2B52] dark:text-rose-400',
    bar: 'bg-gradient-to-r from-[#7B2B52] to-[#C08A1E]',
    node: 'bg-[#7B2B52] ring-rose-200 dark:bg-rose-400 dark:ring-rose-900/80',
    card: 'bg-white dark:bg-[#1A1016]/95',
    badge: 'bg-rose-50 text-[#7B2B52] border-rose-200 dark:bg-rose-950/75 dark:text-rose-300 dark:border-rose-800/80',
  },
  {
    text: 'text-[#8E5A12] dark:text-amber-400',
    bar: 'bg-gradient-to-r from-[#A9701A] to-[#D9A441]',
    node: 'bg-[#A9701A] ring-amber-200 dark:bg-amber-400 dark:ring-amber-900/80',
    card: 'bg-white dark:bg-[#1A1016]/95',
    badge: 'bg-amber-50 text-[#8E5A12] border-amber-200 dark:bg-amber-950/75 dark:text-amber-300 dark:border-amber-800/80',
  },
];

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 75%'],
  });
  const railScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden animate-gradient-pan border-b border-emerald-200/80 bg-gradient-to-br from-[#E4F3EA]/80 via-[#F8E9E5] to-[#FBF0DC]/75 py-16 lg:py-20 dark:border-emerald-900/60 dark:bg-[linear-gradient(135deg,#0F1A16_0%,#241320_50%,#2A1E10_100%)]"
    >
      <div
        className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-500/15"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#116248] dark:text-emerald-400">
              <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#15795B] to-[#E2502A]" aria-hidden="true" />
              <span>02. Career &amp; Academic Background</span>
            </p>
            <h2
              className="font-display mt-3 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              Where I have designed and shipped production software.
            </h2>
          </div>

          <ExperienceRoadmapVector />
        </motion.div>

        {/* Scroll-Driven Vertical Timeline Container */}
        <div ref={timelineRef} className="relative mt-10 md:pl-10">
          {/* Static Track + Scroll-Linked Animated Gradient Beam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-3 top-6 hidden w-[2px] rounded-full bg-stone-300/70 md:block dark:bg-stone-700/70"
          >
            <motion.div
              data-testid="experience-timeline-beam"
              style={{ scaleY: railScaleY }}
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,#E2502A_0%,#15795B_38%,#7B2B52_72%,#A9701A_100%)]"
            />
          </div>

          <div className="space-y-5">
            {EXPERIENCES.map((exp, idx) => {
              const style = ROLE_STYLES[idx % ROLE_STYLES.length];
              return (
                <div key={exp.id} className="relative">
                  {/* Milestone Node on Rail */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[34px] top-8 hidden h-3.5 w-3.5 rounded-full ring-4 md:block ${style.node}`}
                  />

                  <motion.div
                    data-slide-direction={getSideSlideOffset(idx, 56) < 0 ? 'left' : 'right'}
                    initial={{ opacity: 0, x: getSideSlideOffset(idx, 56) }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    whileHover={{ y: -3, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                    transition={{ duration: 0.52, delay: Math.min((idx % 2) * 0.06, 0.12), ease: [0.16, 1, 0.3, 1] }}
                    className={`card-sheen overflow-hidden rounded-2xl border border-stone-200/90 dark:border-stone-700/80 ${style.card} shadow-sm transition-shadow duration-200 hover:shadow-md dark:hover:shadow-[0_16px_32px_-12px_rgba(12,6,10,0.65)]`}
                  >
                    <div className={`h-1 w-full ${style.bar}`} aria-hidden="true" />
                    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-7">
                      <div className="lg:col-span-4">
                        <span className={`inline-block rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold tabular-nums ${style.badge}`}>
                          {exp.period}
                        </span>
                        <h3 className="font-display mt-2.5 text-lg font-bold text-stone-950 dark:text-white">
                          {exp.company}
                        </h3>
                        <div className={`mt-1 text-sm font-semibold ${style.text}`}>
                          {exp.role}
                        </div>
                        <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">{exp.location}</div>
                      </div>

                      <div className="lg:col-span-8">
                        <p className="text-sm font-semibold leading-relaxed text-stone-900 dark:text-stone-100">{exp.summary}</p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                          {exp.achievements.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex gap-3">
                              <span className={`font-mono text-xs pt-1 font-bold tabular-nums ${style.text}`}>
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {exp.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-[11px] font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-800/90 dark:text-stone-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* Education Row */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[34px] top-8 hidden h-3.5 w-3.5 rounded-full bg-[#8E2F5B] ring-4 ring-rose-200 md:block dark:bg-rose-400 dark:ring-rose-900/80"
              />
              <motion.div
                data-slide-direction={getSideSlideOffset(EXPERIENCES.length, 56) < 0 ? 'left' : 'right'}
                initial={{ opacity: 0, x: getSideSlideOffset(EXPERIENCES.length, 56) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                whileHover={{ y: -3, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="card-sheen overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-stone-700/80 dark:bg-[#1A1016]/95 dark:hover:shadow-[0_16px_32px_-12px_rgba(12,6,10,0.65)]"
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#8E2F5B] via-[#7B2B52] to-[#C08A1E]" aria-hidden="true" />
                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-7">
                  <div className="lg:col-span-4">
                    <span className="inline-block rounded-md border border-rose-200 bg-rose-100/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#6E2647] tabular-nums dark:border-rose-800/80 dark:bg-rose-950/80 dark:text-rose-300">
                      {EDUCATION.period}
                    </span>
                    <h3 className="font-display mt-2.5 text-lg font-bold text-stone-950 dark:text-white">
                      {EDUCATION.institution}
                    </h3>
                    <div className="mt-1 text-xs text-stone-500 dark:text-stone-400">{EDUCATION.location}</div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="text-sm font-bold text-stone-950 dark:text-white">{EDUCATION.degree}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-700 tabular-nums dark:text-stone-300">
                      Graduated with <span className="font-semibold text-[#6E2647] dark:text-rose-400">{EDUCATION.cgpa}</span> ·
                      Grounded in algorithms, full-stack web engineering, and machine learning.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
