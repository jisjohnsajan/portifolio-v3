export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  description: string;
  current?: boolean;
}

export const education: EducationEntry[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Vimal Jyothi Engineering College, Chemperi",
    period: "2025 — 2029",
    description:
      "Currently pursuing — focused on software development, algorithms and emerging technologies.",
    current: true,
  },
  {
    degree: "Higher Secondary (12th Standard)",
    institution: "GHSS Nedungome",
    period: "2025",
    description:
      "Completed higher secondary education with a focus on science and mathematics.",
  },
  {
    degree: "Secondary (10th / SSLC)",
    institution: "GHSS Nedungome",
    period: "2023",
    description:
      "Completed secondary schooling with strong academic performance.",
  },
];
