"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
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
    const id = setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2600,
    );
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

export function Hero() {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      {/* Grid + glow backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-backdrop opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,transparent,var(--background))]" />
        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          {/* Metadata line */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-6 font-display text-[15vw] font-semibold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
          >
            {profile.nameLines.map((line, idx) => (
              <span key={line} className="block">
                {line}
                {idx === profile.nameLines.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Rotating role */}
          <motion.p
            variants={item}
            className="mt-6 font-display text-xl font-medium sm:text-2xl"
          >
            <RotatingRole />
          </motion.p>

          {/* Supporting statement */}
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.tagline} I turn ideas into real-world applications and keep
            learning through hands-on projects.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <Button href="#work">
                View my work
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
            <Button href="#contact" variant="secondary">
              Let&apos;s connect
            </Button>
            <Button href={asset(profile.resume)} variant="ghost">
              <Download className="h-4 w-4" />
              Résumé
            </Button>
          </motion.div>
        </motion.div>

        {/* System status card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.35 }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
              <span>~/profile</span>
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-border-strong" />
                <span className="h-2 w-2 rounded-full bg-border-strong" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
            </div>

            <div className="relative aspect-[4/3] w-full border-b border-border">
              <ImageWithFallback
                src={profile.profileImage}
                alt={profile.name}
                label={profile.initials}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            <dl className="divide-y divide-border font-mono text-sm">
              {[
                { k: "role", v: profile.title },
                { k: "based", v: profile.location },
                { k: "status", v: "Open to internships" },
                {
                  k: "building",
                  v: profile.currentlyBuilding.project,
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <dt className="text-muted-foreground">{row.k}</dt>
                  <dd className="text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground md:flex"
        data-cursor="link"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
