"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { certifications } from "@/data/certifications";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

export function Certifications() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) =>
      setOpen((v) =>
        v === null ? v : (v + dir + certifications.length) % certifications.length,
      ),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const active = open === null ? null : certifications[open];

  return (
    <section id="certifications" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Certifications"
          title="Coursework, workshops and programs I've completed."
        />

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.li
              key={cert.name + cert.issuer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: (i % 3) * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors hover:border-border-strong"
                data-cursor="link"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-muted">
                  <ImageWithFallback
                    src={cert.thumbnail}
                    alt={`${cert.name} — ${cert.issuer}`}
                    label={cert.issuer}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    fit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-accent">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest">
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="mt-1.5 line-clamp-1 font-medium">
                    {cert.name}
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} certificate`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:bg-surface-hover"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous certificate"
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:bg-surface-hover sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next certificate"
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-foreground transition hover:bg-surface-hover sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.figure
              key={active.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full bg-muted">
                <ImageWithFallback
                  src={active.image}
                  alt={`${active.name} — ${active.issuer}`}
                  label={active.issuer}
                  sizes="(max-width: 768px) 100vw, 768px"
                  fit="contain"
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-border px-5 py-4">
                <div>
                  <div className="font-medium">{active.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {active.issuer}
                  </div>
                </div>
                {active.credentialUrl && (
                  <a
                    href={active.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm transition hover:bg-surface-hover"
                  >
                    Verify
                  </a>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
