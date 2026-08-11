import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
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
          {/* Portrait */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-border">
                <ImageWithFallback
                  src={profile.profileImage}
                  alt={profile.name}
                  label={profile.initials}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="grayscale contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/60 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground backdrop-blur">
                  <span>{profile.name}</span>
                  <span>{profile.location.split(",")[0]}</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text + stats */}
          <div className="lg:col-span-8">
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

            <div className="mt-10 grid grid-cols-3 gap-3">
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

            <Reveal delay={0.1}>
              <div className="mt-3 rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Currently building
                </div>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="font-display text-xl font-medium">
                      {cb.project}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cb.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
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
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
