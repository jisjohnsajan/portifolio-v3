"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { EASE_OUT } from "@/lib/motion";
import { asset } from "@/lib/utils";

function RotatingRole() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom text-accent">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="whitespace-nowrap"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const MASK_EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Reveal begins as the preloader wipes away.
  const base = reduce ? 0 : 1.15;

  const line = (text: string, i: number, accent?: boolean) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: MASK_EASE, delay: base + i * 0.09 }}
      >
        {text}
        {accent && <span className="text-accent">.</span>}
      </motion.span>
    </span>
  );

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col justify-between px-6 pb-8 pt-28"
    >
      {/* Top hairline metadata */}
      <motion.div
        {...fade(base)}
        className="mx-auto flex w-full max-w-[1500px] items-center justify-between border-b border-border pb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span>Portfolio — 2026</span>
        <span className="hidden sm:inline">{profile.location}</span>
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available
        </span>
      </motion.div>

      {/* Main composition */}
      <div className="mx-auto grid w-full max-w-[1500px] flex-1 grid-cols-1 items-center gap-10 py-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.div {...fade(base - 0.1 < 0 ? 0 : base - 0.1)}>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              (01) — {profile.title}
            </span>
          </motion.div>

          <h1 className="mt-5 font-display font-semibold uppercase tracking-[-0.03em] text-[clamp(3.5rem,12vw,11rem)] leading-[0.82]">
            {line("Jis John", 0)}
            {line("Sajan", 1, true)}
          </h1>

          <motion.p {...fade(base + 0.35)} className="mt-7 font-display text-xl font-medium sm:text-2xl">
            <RotatingRole />
          </motion.p>

          <motion.p
            {...fade(base + 0.45)}
            className="mt-4 max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I turn ideas into real-world software, apps and connected systems —
            built from curiosity and a lot of hands-on tinkering.
          </motion.p>

          <motion.div {...fade(base + 0.55)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button href="#work">
                Explore work
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
            <Button href="#contact" variant="secondary">
              Get in touch
            </Button>
            <Button href={asset(profile.resume)} variant="ghost">
              <Download className="h-4 w-4" />
              Résumé
            </Button>
          </motion.div>
        </div>

        {/* Duotone portrait */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: base + 0.2 }}
          className="lg:col-span-4"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-border">
            <ImageWithFallback
              src={profile.profileImage}
              alt={profile.name}
              label={profile.initials}
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
              className="grayscale contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color bg-accent/20"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/60 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span>{profile.location.split(",")[0]}</span>
              <span>IND</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Capability strip */}
      <motion.ul
        {...fade(base + 0.6)}
        className="mx-auto grid w-full max-w-[1500px] grid-cols-2 border-t border-border md:grid-cols-4"
      >
        {profile.capabilities.map((cap, i) => (
          <li
            key={cap}
            className="flex items-baseline gap-3 border-l border-border px-4 py-5 first:border-l-0 sm:px-6"
          >
            <span className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium sm:text-base">{cap}</span>
          </li>
        ))}
      </motion.ul>

      <div className="mt-6 flex justify-center">
        <a
          href="#work"
          aria-label="Scroll to work"
          className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          data-cursor="link"
        >
          Scroll
          <motion.span
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
