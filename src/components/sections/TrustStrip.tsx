import { Reveal } from "@/components/ui/Reveal";

const stack = [
  "Next.js",
  "TypeScript",
  "Python",
  "C",
  "IoT & Embedded",
  "Web Development",
];

/** Compact credibility strip beneath the hero — authentic tech, no fake logos. */
export function TrustStrip() {
  return (
    <section aria-label="Technologies" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <span className="shrink-0 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Building with
            </span>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="font-display text-lg font-medium text-foreground/70 transition-colors hover:text-foreground sm:text-xl"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
