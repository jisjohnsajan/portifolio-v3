"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/**
 * Awwwards-style load intro: a counter races to 100 while a hairline progress
 * bar fills, then the panel wipes upward to reveal the site. Plays once (the
 * layout persists across client navigations). Skipped entirely for
 * prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-background p-6 sm:p-10"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span>{profile.name}</span>
            <span>Portfolio</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[18vw] font-semibold leading-none tracking-tight sm:text-[12vw]">
              {String(count).padStart(3, "0")}
            </span>
            <span className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Loading
            </span>
          </div>

          <div className="h-px w-full overflow-hidden bg-border">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
