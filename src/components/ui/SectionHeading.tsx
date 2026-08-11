import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit index, e.g. "01". */
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
