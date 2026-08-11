import { profile } from "@/data/profile";

/**
 * Public site URL. Set NEXT_PUBLIC_SITE_URL in the environment for correct
 * canonical URLs, Open Graph tags and the sitemap. Falls back to a sensible
 * default for local development.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://jisjohnsajan.vercel.app";

export const SITE_NAME = `${profile.name} — ${profile.title}`;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

/** Section ids used for scroll-spy in the navbar. */
export const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));
