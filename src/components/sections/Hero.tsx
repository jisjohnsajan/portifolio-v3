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
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.15 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  };

  return (
    <section id="hero" className="px-2 pt-20 sm:px-4 sm:pt-24">
      {/* The hero is one large rounded panel floating over the page. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative overflow-hidden rounded-[1.75rem] border border-border bg-muted sm:rounded-[2.5rem]"
      >
        {/* Cinematic warm backdrop */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 grid-backdrop opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,90,31,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_85%_110%,rgba(200,30,20,0.18),transparent_60%)]" />
        </div>

        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          {/* Text column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:col-span-7 lg:py-24 lg:pl-16"
          >
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
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

            <motion.h1
              variants={item}
              className="mt-8 font-display font-semibold tracking-tight text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.9]"
            >
              <span className="block">Jis John</span>
              <span className="block">
                Sajan<span className="text-accent">.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 font-display text-xl font-medium sm:text-2xl"
            >
              <RotatingRole />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I turn ideas into real-world software, apps and connected systems —
              built from curiosity and a lot of hands-on tinkering.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <Button href="#work">
                  Explore my work
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

          {/* Image column — bleeds to the panel edge */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
            className="relative min-h-[340px] lg:col-span-5 lg:min-h-full"
          >
            <ImageWithFallback
              src={profile.profileImage}
              alt={profile.name}
              label={profile.initials}
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
            {/* Blend the image into the warm panel */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent lg:bg-gradient-to-r"
            />
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(0deg,rgba(255,90,31,0.18),transparent_60%)]"
            />
          </motion.div>
        </div>

        {/* Capability metadata strip */}
        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative grid grid-cols-2 border-t border-border md:grid-cols-4"
        >
          {profile.capabilities.map((cap, i) => (
            <li
              key={cap}
              className="border-b border-l border-border px-6 py-5 sm:px-8"
            >
              <div className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-2 text-sm font-medium sm:text-base">{cap}</div>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll indicator */}
      <div className="mt-6 flex justify-center">
        <motion.a
          href="#work"
          aria-label="Scroll to work"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
        </motion.a>
      </div>
    </section>
  );
}
