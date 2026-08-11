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
