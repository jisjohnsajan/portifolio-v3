import { profile } from "@/data/profile";
import { socials } from "@/data/social";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="#hero"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {profile.initials}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {profile.title} — {profile.location}. Available for internships
              &amp; collaborations.
            </p>
          </div>

          <nav aria-label="Social" className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-cursor="link"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}
          </span>
          <span>Built with Next.js, TypeScript &amp; Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
