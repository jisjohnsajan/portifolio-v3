/**
 * Featured work. Project data is kept separate from the UI so cards and detail
 * pages render from a single source of truth.
 *
 * The extended detail fields (problem, solution, architecture, challenges,
 * results, gallery) are optional. Where they contain [PLACEHOLDER] text, the
 * project detail page hides that block until you fill it in.
 */
export interface Project {
  slug: string;
  title: string;
  /** Short label / category shown as the card eyebrow. */
  category: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  year?: string;
  status?: string;
  thumbnail: string;
  heroImage?: string;
  github?: string;
  live?: string;
  featured?: boolean;

  // Case-study fields — fill these in per project.
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: string;
  results?: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: "laser-audio-transmission",
    title: "Laser Audio Transmission",
    category: "LiFi Communication System",
    shortDescription:
      "Wireless audio transfer over a laser beam using visible light communication.",
    description:
      "An innovative wireless audio transmission system that sends sound over laser light, enabling high-speed data transfer through visible light communication (LiFi). The project explores light as a carrier medium for real-time audio.",
    technologies: ["IoT", "LiFi", "Electronics", "Embedded Systems"],
    thumbnail: "/images/projects/laser-audio.jpg",
    github: "https://github.com/jisjohnsajan/Laser-Audio-Transmission_LiFi",
    featured: true,
    problem: "[Describe the problem this project set out to solve.]",
    solution: "[Describe your approach and how the system works end to end.]",
    architecture: "[Outline the hardware/software architecture and signal flow.]",
    challenges: "[Note the key engineering challenges you worked through.]",
    results: "[Summarise the outcome, what worked, and what you learned.]",
  },
  {
    slug: "unifit-nfc-gym-access",
    title: "UNIFIT — NFC Gym Access",
    category: "Smart Gym Management",
    shortDescription:
      "NFC-powered gym platform for access control, member tracking and attendance.",
    description:
      "A smart, NFC-powered gym management platform for seamless access control, member tracking and automated attendance management — bridging hardware and a full-stack web platform.",
    technologies: ["NFC", "IoT", "Full Stack", "Automation"],
    thumbnail: "/images/projects/unifit.jpg",
    github: "https://github.com/jisjohnsajan/UniFit-Platfrom",
    featured: true,
    problem: "[Describe the problem this project set out to solve.]",
    solution: "[Describe your approach and how the system works end to end.]",
    architecture: "[Outline the hardware/software architecture and data flow.]",
    challenges: "[Note the key engineering challenges you worked through.]",
    results: "[Summarise the outcome, what worked, and what you learned.]",
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio V2",
    category: "Personal Portfolio Website",
    shortDescription:
      "A responsive, interactive personal portfolio with smooth motion and a recruiter-focused dark UI.",
    description:
      "A responsive and interactive personal portfolio featuring smooth scroll animations, a custom cursor, a certificate lightbox and a dark, recruiter-focused design built with modern web technologies.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    thumbnail: "/images/projects/portfolio-v2.jpg",
    github: "https://github.com/jisjohnsajan/portifolio-v2",
    featured: true,
    problem: "[Describe what you wanted this portfolio to achieve.]",
    solution: "[Describe the design system, motion language and architecture.]",
    challenges: "[Note the interesting technical challenges.]",
    results: "[Link the live site and note the response it received.]",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Interactive Web Experience",
    shortDescription:
      "An earlier responsive portfolio built with core web technologies and motion.",
    description:
      "A responsive and interactive portfolio built with core web technologies, featuring smooth animations, subtle 3D effects and a recruiter-focused layout.",
    technologies: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/portfolio-website.jpg",
    github: "https://github.com/jisjohnsajan/jisjohnsajan-portifolio",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
