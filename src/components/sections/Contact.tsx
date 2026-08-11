"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { socials } from "@/data/social";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import { asset } from "@/lib/utils";

export function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-accent">06</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden />
          <span>Contact</span>
        </div>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-6xl"
        >
          Let&apos;s build something{" "}
          <span className="text-accent">worth shipping.</span>
        </motion.h2>

        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          I&apos;m open to internships and collaborations. If you&apos;re working
          on something interesting, my inbox is open.
        </p>

        {/* Email */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton>
            <Button href={`mailto:${profile.email}`}>
              <Mail className="h-4 w-4" />
              {profile.email}
            </Button>
          </MagneticButton>
          <Button variant="secondary" onClick={copyEmail}>
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </Button>
          <Button href={asset(profile.resume)} variant="ghost">
            <Download className="h-4 w-4" /> Résumé
          </Button>
        </div>

        {/* Socials */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-surface p-5 transition-colors hover:bg-surface-hover"
              data-cursor="link"
            >
              <span className="flex items-center gap-3">
                <s.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                <span>
                  <span className="block font-medium">{s.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {s.handle}
                  </span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
