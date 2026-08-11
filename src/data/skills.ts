export interface Skill {
  name: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "C", description: "Systems & algorithms" },
      { name: "Python", description: "Scripting & automation" },
    ],
  },
  {
    category: "Core",
    skills: [
      { name: "Problem Solving", description: "Algorithmic thinking" },
      { name: "Logical Thinking", description: "Structured analysis" },
      { name: "Electronics", description: "Hardware integration" },
    ],
  },
  {
    category: "Tools & Tech",
    skills: [
      { name: "IoT", description: "Connected devices" },
      { name: "LiFi", description: "Light-based comms" },
      { name: "NFC", description: "Near-field comm" },
      { name: "Web Dev", description: "HTML / CSS / JS" },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Team Collaboration", description: "Cross-functional teams" },
      { name: "Communication", description: "Clear & effective" },
      { name: "Adaptability", description: "Fast learner" },
      { name: "Creative Solving", description: "Out-of-the-box" },
    ],
  },
];

/** Flat list used by the skills marquee. */
export const marqueeSkills: string[] = [
  "C",
  "Python",
  "Problem Solving",
  "IoT",
  "LiFi",
  "NFC",
  "Embedded Systems",
  "Web Development",
  "HTML",
  "CSS",
  "Algorithms",
  "Electronics",
];
