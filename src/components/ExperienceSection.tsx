import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EDUCATION, EXPERIENCES } from '../data/portfolioData';
import { ExperienceRoadmapVector } from './VectorIllustrations';

const ROLE_STYLES = [
  {
    text: 'text-[#2563EB] dark:text-sky-400',
    bar: 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5]',
    node: 'bg-[#2563EB] ring-blue-200 dark:bg-sky-400 dark:ring-sky-900/80',
    card: 'bg-white dark:bg-[#0F172A]/95',
    badge: 'bg-blue-50 text-[#1D4ED8] border-blue-200 dark:bg-blue-950/75 dark:text-sky-300 dark:border-blue-800/80',
  },
  {
    text: 'text-[#0F766E] dark:text-teal-400',
    bar: 'bg-gradient-to-r from-[#0D9488] to-[#06B6D4]',
    node: 'bg-[#0D9488] ring-teal-200 dark:bg-teal-400 dark:ring-teal-900/80',
    card: 'bg-white dark:bg-[#0F172A]/95',
    badge: 'bg-teal-50 text-[#0F766E] border-teal-200 dark:bg-teal-950/75 dark:text-teal-300 dark:border-teal-800/80',
  },
  {
    text: 'text-[#7C3AED] dark:text-violet-400',
    bar: 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899]',
    node: 'bg-[#7C3AED] ring-violet-200 dark:bg-violet-400 dark:ring-violet-900/80',
    card: 'bg-white dark:bg-[#0F172A]/95',
    badge: 'bg-violet-50 text-[#7C3AED] border-violet-200 dark:bg-violet-950/75 dark:text-violet-300 dark:border-violet-800/80',
  },
  {
    text: 'text-[#C2410C] dark:text-amber-400',
    bar: 'bg-gradient-to-r from-[#EA580C] to-[#F59E0B]',
    node: 'bg-[#EA580C] ring-amber-200 dark:bg-amber-400 dark:ring-amber-900/80',
    card: 'bg-white dark:bg-[#0F172A]/95',
    badge: 'bg-amber-50 text-[#C2410C] border-amber-200 dark:bg-amber-950/75 dark:text-amber-300 dark:border-amber-800/80',
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
      className="relative overflow-hidden border-b border-teal-200/80 bg-gradient-to-br from-[#CCFBF1]/80 via-[#E0E7FF] to-[#FEF3C7]/75 py-16 lg:py-20 dark:border-teal-900/60 dark:bg-[linear-gradient(135deg,#082022_0%,#0F1733_50%,#261B0D_100%)]"
    >
      <div
        className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl dark:bg-teal-500/20"
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
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[#0F766E] dark:text-teal-400">
              <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-[#0D9488] to-[#2563EB]" aria-hidden="true" />
              <span>02. Career &amp; Academic Background</span>
            </p>
            <h2
              className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
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
            className="pointer-events-none absolute bottom-6 left-3 top-6 hidden w-[2px] rounded-full bg-slate-300/70 md:block dark:bg-slate-700/70"
          >
            <motion.div
              data-testid="experience-timeline-beam"
              style={{ scaleY: railScaleY }}
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,#2563EB_0%,#0D9488_38%,#7C3AED_72%,#EA580C_100%)]"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={{ y: -3, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.2), ease: [0.16, 1, 0.3, 1] }}
                    className={`overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-700/80 ${style.card} shadow-sm transition-shadow duration-200 hover:shadow-md dark:hover:shadow-[0_16px_32px_-12px_rgba(2,6,23,0.65)]`}
                  >
                    <div className={`h-1 w-full ${style.bar}`} aria-hidden="true" />
                    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-7">
                      <div className="lg:col-span-4">
                        <span className={`inline-block rounded-md border px-2.5 py-0.5 font-mono text-xs font-semibold tabular-nums ${style.badge}`}>
                          {exp.period}
                        </span>
                        <h3 className="font-display mt-2.5 text-lg font-bold text-slate-950 dark:text-white">
                          {exp.company}
                        </h3>
                        <div className={`mt-1 text-sm font-semibold ${style.text}`}>
                          {exp.role}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{exp.location}</div>
                      </div>

                      <div className="lg:col-span-8">
                        <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-slate-100">{exp.summary}</p>
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
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
                              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200"
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
                className="absolute -left-[34px] top-8 hidden h-3.5 w-3.5 rounded-full bg-[#4F46E5] ring-4 ring-indigo-200 md:block dark:bg-indigo-400 dark:ring-indigo-900/80"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700/80 dark:bg-[#0F172A]/95 dark:hover:shadow-[0_16px_32px_-12px_rgba(2,6,23,0.65)]"
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#EC4899]" aria-hidden="true" />
                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-7">
                  <div className="lg:col-span-4">
                    <span className="inline-block rounded-md border border-indigo-200 bg-indigo-100/80 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#4338CA] tabular-nums dark:border-indigo-800/80 dark:bg-indigo-950/80 dark:text-indigo-300">
                      {EDUCATION.period}
                    </span>
                    <h3 className="font-display mt-2.5 text-lg font-bold text-slate-950 dark:text-white">
                      {EDUCATION.institution}
                    </h3>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{EDUCATION.location}</div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="text-sm font-bold text-slate-950 dark:text-white">{EDUCATION.degree}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700 tabular-nums dark:text-slate-300">
                      Graduated with <span className="font-semibold text-[#4338CA] dark:text-indigo-400">{EDUCATION.cgpa}</span> ·
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
