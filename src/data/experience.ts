/**
 * Professional experience — internships, roles, hackathons, milestones.
 *
 * This is placeholder-driven on purpose: nothing is fabricated. The Experience
 * section only renders once you replace at least one entry below with real
 * information (remove the [BRACKETED] placeholders).
 */
export interface ExperienceEntry {
  period: string;
  role: string;
  organization: string;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    period: "[YEAR]",
    role: "[ROLE]",
    organization: "[ORGANIZATION]",
    description: "[Describe what you worked on and what you achieved.]",
  },
];
