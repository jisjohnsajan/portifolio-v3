import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups, marqueeSkills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills & Toolkit"
          title="The languages, tools and ways of thinking I work with."
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

      {/* Category cards */}
      <div className="mx-auto mt-14 max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {skill.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
