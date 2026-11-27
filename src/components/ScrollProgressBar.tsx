import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { calculateScrollProgress } from '../utils/portfolio';

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let rafId = 0;

    const updateScrollProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollY = window.scrollY || doc.scrollTop || 0;
      const ratio = calculateScrollProgress(scrollY, doc.scrollHeight, window.innerHeight);
      rawProgress.set(ratio);
      if (barRef.current) {
        barRef.current.dataset.progress = String(Math.round(ratio * 100));
      }
    };

    const scheduleUpdate = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateScrollProgress);
      }
    };

    updateScrollProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, [rawProgress]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] bg-slate-900/[0.04] dark:bg-white/[0.08]"
    >
      <motion.div
        ref={barRef}
        data-testid="scroll-progress-bar"
        data-progress="0"
        style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-[linear-gradient(90deg,#E2502A_0%,#15795B_28%,#A8457A_55%,#C08A1E_80%,#D9A441_100%)] shadow-[0_1px_6px_rgba(226,80,42,0.28)] dark:shadow-[0_1px_8px_rgba(255,138,92,0.45)]"
      />
    </div>
  );
}
