"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  feature?: boolean;
}

export function ProjectCard({ project, index, feature }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: (index % 2) * 0.08 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border bg-surface transition-colors duration-300 hover:border-accent/40",
        feature && "lg:flex-row",
      )}
    >
      <Link
        href={`/work/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${project.title} case study`}
        data-cursor="link"
      />

      {/* Image */}
      <div
        className={cn(
          "relative w-full overflow-hidden border-b border-border",
          feature
            ? "aspect-[16/10] lg:aspect-auto lg:w-3/5 lg:border-b-0 lg:border-r lg:min-h-[440px]"
            : "aspect-[16/10]",
        )}
      >
        <ImageWithFallback
          src={project.thumbnail}
          alt={`${project.title} preview`}
          label={project.title}
          sizes={feature ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 50vw"}
          className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Body */}
      <div
        className={cn(
          "flex flex-1 flex-col p-6",
          feature && "lg:w-2/5 lg:justify-center lg:p-10",
        )}
      >
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

        <h3
          className={cn(
            "mt-3 flex items-center gap-1.5 font-display font-semibold",
            feature ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl",
          )}
        >
          {project.title}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </h3>

        <p
          className={cn(
            "mt-2 leading-relaxed text-muted-foreground",
            feature ? "text-base" : "text-sm",
          )}
        >
          {feature ? project.description : project.shortDescription}
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
