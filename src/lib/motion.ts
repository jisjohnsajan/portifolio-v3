import type { Variants, Transition } from "framer-motion";

/**
 * Motion system — a small, consistent set of tokens so every animation on the
 * site shares the same timing and easing language.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
} as const;

export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.normal, ease: EASE_OUT } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
