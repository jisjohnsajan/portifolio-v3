"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { cn } from "@/lib/utils";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  return (
    <>
      {/* Desktop: editorial list with cursor-following preview */}
      <div
        className="relative hidden md:block"
        onMouseMove={(e) => {
          x.set(e.clientX - 170);
          y.set(e.clientY - 120);
        }}
        onMouseLeave={() => setActive(null)}
      >
        <ul className="border-t border-border">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group flex items-center gap-6 border-b border-border py-7 transition-opacity duration-300",
                  active !== null && active !== i && "opacity-40",
                )}
                data-cursor="link"
              >
                <span className="w-14 shrink-0 font-mono text-sm text-accent">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-3">
                    <motion.span
                      className="font-display text-3xl font-semibold tracking-tight lg:text-5xl"
                      animate={{ x: active === i && !reduce ? 16 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {project.title}
                    </motion.span>
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:text-accent group-hover:opacity-100" />
                  </span>
                </span>
                <span className="hidden w-48 shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:block">
                  {project.category}
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-xs text-muted-foreground">
                  {project.year ?? "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 h-[240px] w-[340px] overflow-hidden rounded-xl border border-border"
            style={{ x: sx, y: sy }}
            animate={{ opacity: active !== null ? 1 : 0, scale: active !== null ? 1 : 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {active !== null && (
              <div className="relative h-full w-full bg-muted">
                <ImageWithFallback
                  src={projects[active].thumbnail}
                  alt={projects[active].title}
                  label={projects[active].title}
                  sizes="340px"
                />
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Mobile: cards */}
      <div className="md:hidden">
        <ProjectGrid projects={projects} />
      </div>
    </>
  );
}
