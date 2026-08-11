"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Scroll-triggered reveal. Respects prefers-reduced-motion by rendering the
 * content statically with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    switch (as) {
      case "li":
        return <li className={className}>{children}</li>;
      case "section":
        return <section className={className}>{children}</section>;
      case "span":
        return <span className={className}>{children}</span>;
      default:
        return <div className={className}>{children}</div>;
    }
  }

  const motionProps = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  } as const;

  switch (as) {
    case "li":
      return <motion.li {...motionProps}>{children}</motion.li>;
    case "section":
      return <motion.section {...motionProps}>{children}</motion.section>;
    case "span":
      return <motion.span {...motionProps}>{children}</motion.span>;
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
