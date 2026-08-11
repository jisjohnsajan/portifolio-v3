import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups, marqueeSkills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title="What I work with, and how I think."
        />
      </div>

      {/* Infinite marquee */}
      <div className="marquee-paused relative mt-14 overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="flex items-center gap-8 font-display text-xl font-medium text-muted-foreground"
            >
              {skill}
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* Editorial capability rows */}
      <div className="mx-auto mt-4 max-w-6xl px-6">
        {skillGroups.map((group, i) => (
          <Reveal key={group.category}>
            <div className="grid grid-cols-1 gap-6 border-b border-border py-8 md:grid-cols-12 md:items-baseline md:gap-10">
              <div className="flex items-baseline gap-4 md:col-span-4">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                  {group.category}
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-8">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-baseline gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>
                      <span className="font-medium">{skill.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {skill.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
