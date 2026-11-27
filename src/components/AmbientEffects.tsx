import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

/**
 * Ambient page effects: a soft ember light that trails the pointer and a fine
 * grain layer over the whole page. Both are purely decorative, ignore pointer
 * events, and switch off entirely when the visitor prefers reduced motion.
 */
export function AmbientEffects() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const glowX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.6 });
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.6 });
  const coreX = useSpring(pointerX, { stiffness: 220, damping: 28, mass: 0.35 });
  const coreY = useSpring(pointerY, { stiffness: 220, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <>
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden overflow-hidden lg:block">
          <motion.div
            style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%' }}
            className="absolute h-[38rem] w-[38rem] rounded-full opacity-[0.16] blur-[120px] dark:opacity-[0.22]"
          >
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#E2502A_0%,#C08A1E_45%,transparent_72%)]" />
          </motion.div>
          <motion.div
            style={{ x: coreX, y: coreY, translateX: '-50%', translateY: '-50%' }}
            className="absolute h-40 w-40 rounded-full opacity-[0.10] blur-[60px] dark:opacity-[0.16]"
          >
            <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#7B2B52_0%,transparent_70%)]" />
          </motion.div>
        </div>
      )}
      <div aria-hidden="true" className="grain-overlay" />
    </>
  );
}
