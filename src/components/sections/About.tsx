import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function About() {
  const { currentlyBuilding: cb } = profile;

  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="About"
          title="I build things and enjoy figuring out how they work."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90">
                {profile.bio}
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {profile.values.map((value, i) => (
                <Reveal as="li" key={value} delay={i * 0.05}>
                  <span className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {value}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {profile.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="rounded-xl border border-border bg-surface p-4">
                    <div className="font-display text-2xl font-semibold sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs leading-tight text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Currently building */}
            <Reveal delay={0.1}>
              <div className="mt-3 rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Currently building
                </div>
                <div className="mt-3 font-display text-xl font-medium">
                  {cb.project}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{cb.status}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cb.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
