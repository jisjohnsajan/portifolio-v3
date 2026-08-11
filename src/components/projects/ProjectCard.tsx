"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: (index % 2) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong"
    >
      {/* Full-card navigation link (siblings sit above via z-index) */}
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${project.title} case study`}
        data-cursor="link"
      />

      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border">
        <ImageWithFallback
          src={project.thumbnail}
          alt={`${project.title} preview`}
          label={project.title}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category}
          </span>
          {project.year && (
            <span className="font-mono text-xs text-muted-foreground">
              {project.year}
            </span>
          )}
        </div>

        <h3 className="mt-3 flex items-center gap-1.5 font-display text-xl font-semibold sm:text-2xl">
          {project.title}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links sit above the cover link */}
        <div className="relative z-20 mt-6 flex items-center gap-4 pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-cursor="link"
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-cursor="link"
            >
              <ArrowUpRight className="h-4 w-4" />
              Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
