import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="Education & the path so far."
        />

        <ol className="mt-14 border-l border-border">
          {education.map((entry, i) => (
            <Reveal as="li" key={entry.degree + entry.period} delay={i * 0.06}>
              <div className="relative pl-8 pb-12 last:pb-0 sm:pl-10">
                <span
                  className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-accent"
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {entry.period}
                  </span>
                  {entry.current && (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                      Present
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                  {entry.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-foreground/80">
                  {entry.institution}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
