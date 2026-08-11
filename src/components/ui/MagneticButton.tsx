"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
}

/**
 * Wraps content and gently pulls it toward the cursor on hover.
 * Disabled entirely when the user prefers reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  if (reduce) {
    return <div className={cn("inline-flex", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
