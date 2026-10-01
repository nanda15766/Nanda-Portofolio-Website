import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Subtle, minimalist scroll progress indicator pinned to the top of the viewport.
 * Uses Framer Motion spring physics to visualize user progress through long-form content.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Tactile, smooth spring interpolation to prevent jitter during fast scrolling
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-hidden="true"
    >
      <div className="w-full h-[2.5px] bg-white/[0.08]">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-bold via-brand-light to-white origin-left will-change-transform shadow-[0_0_8px_rgba(103,186,244,0.4)]"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}
