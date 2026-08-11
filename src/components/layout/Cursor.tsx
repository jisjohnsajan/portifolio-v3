"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Subtle custom cursor: a small accent dot that tracks precisely, plus a
 * trailing ring that eases behind it and grows over interactive elements.
 *
 * - Listeners only attach on fine-pointer (mouse) devices.
 * - Fully disabled for prefers-reduced-motion.
 * - Native cursor is hidden via the `.cursor-enabled` body class (fine pointer
 *   only) so keyboard/touch users are unaffected.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("cursor-enabled");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [data-cursor="link"], input, textarea'),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-enabled");
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <motion.span
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{ scale: down ? 0.8 : hovering ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute -ml-4 -mt-4 block h-8 w-8 rounded-full border border-border-strong"
      />
    </div>
  );
}
