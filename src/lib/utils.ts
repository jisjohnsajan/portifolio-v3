/**
 * Minimal className combiner. Filters falsy values and joins with a space.
 * Avoids extra dependencies (clsx / tailwind-merge) for a small project.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Returns true when a value still contains an unfilled placeholder token
 * such as "[ROLE]" or "[YEAR]". Used so placeholder-only sections can hide
 * themselves until the owner supplies real content.
 */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

export function hasRealData(values: Array<string | undefined | null>): boolean {
  return values.some((v) => v && !isPlaceholder(v));
}

/**
 * Base path the site is served under (e.g. "/portifolio-v3" on GitHub Pages,
 * "" on a root domain / Vercel). Set NEXT_PUBLIC_BASE_PATH at build time.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public asset path (files served from /public that are linked with a
 * plain anchor, e.g. the résumé) with the base path. next/image and next/link
 * add the base path automatically, so only use this for raw href/src strings.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}

