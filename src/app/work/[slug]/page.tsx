import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { isPlaceholder } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.shortDescription,
      images: [{ url: project.heroImage ?? project.thumbnail }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const caseStudy = [
    { label: "The problem", value: project.problem },
    { label: "The solution", value: project.solution },
    { label: "Architecture", value: project.architecture },
    { label: "Challenges", value: project.challenges },
    { label: "Results", value: project.results },
  ].filter((b) => b.value && !isPlaceholder(b.value));

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            data-cursor="link"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-accent">{project.category}</span>
            {project.year && (
              <>
                <span className="h-px w-6 bg-border-strong" aria-hidden />
                <span>{project.year}</span>
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight sm:text-6xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.github && (
              <Button href={project.github} variant="secondary" size="sm">
                <GithubIcon className="h-4 w-4" /> View code
              </Button>
            )}
            {project.live && (
              <Button href={project.live} size="sm">
                <ArrowUpRight className="h-4 w-4" /> Live site
              </Button>
            )}
          </div>
        </Reveal>
      </div>

      {/* Hero image */}
      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 max-w-5xl px-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
            <ImageWithFallback
              src={project.heroImage ?? project.thumbnail}
              alt={`${project.title} preview`}
              label={project.title}
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      </Reveal>

      {/* Meta + tech */}
      <div className="mx-auto mt-16 max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-8 border-y border-border py-8 sm:grid-cols-3">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Category
            </div>
            <div className="mt-2 font-medium">{project.category}</div>
          </div>
          <div className="sm:col-span-2">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Built with
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Case study */}
        {caseStudy.length > 0 ? (
          <div className="mt-14 space-y-12">
            {caseStudy.map((block) => (
              <Reveal key={block.label}>
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                    {block.label}
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-foreground/90">
                    {block.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-14 rounded-xl border border-dashed border-border bg-surface p-6 text-sm text-muted-foreground">
            A detailed case study for this project is on the way. In the
            meantime, the source is available on GitHub.
          </p>
        )}
      </div>

      {/* Next project */}
      <div className="mx-auto mt-24 max-w-4xl px-6 pb-24">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          data-cursor="link"
        >
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Next project
            </div>
            <div className="mt-2 font-display text-2xl font-semibold">
              {next.title}
            </div>
          </div>
          <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </div>
    </article>
  );
}
