/**
 * Personal profile data.
 *
 * Everything personal lives in the /data folder so the UI never hardcodes
 * identity. Replace values here to make the site your own. Anything wrapped in
 * [SQUARE_BRACKETS] is a placeholder that has not been supplied yet — sections
 * that only contain placeholders hide themselves automatically.
 */
export interface Profile {
  name: string;
  /** Name split into display lines for the hero. */
  nameLines: string[];
  initials: string;
  title: string;
  /** Rotating roles shown in the hero. */
  roles: string[];
  tagline: string;
  bio: string;
  /** Short "what I care about" bullets for the About section. */
  values: string[];
  location: string;
  email: string;
  availability: string;
  profileImage: string;
  resume: string;
  stats: { value: string; label: string; sublabel?: string }[];
  currentlyBuilding: {
    project: string;
    status: string;
    technologies: string[];
  };
}

export const profile: Profile = {
  name: "Jis John Sajan",
  nameLines: ["Jis", "John", "Sajan"],
  initials: "JJS",
  title: "Software Engineer",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "App Developer",
    "Problem Solver",
    "CSE Student",
  ],
  tagline:
    "Computer Science student building software, apps and creative technology.",
  bio: "I'm Jis John Sajan, a Computer Science engineering student passionate about software development, AI, creative technology, and building innovative projects. I enjoy turning ideas into real-world applications, exploring emerging technologies, and constantly learning through hands-on projects.",
  values: [
    "Turning ideas into working, real-world applications",
    "Exploring emerging tech — AI, IoT and creative technology",
    "Learning continuously through hands-on projects",
    "Caring about the craft: clarity, detail and quality",
  ],
  location: "Kannur, Kerala",
  email: "jisjohnsajan@gmail.com",
  availability: "Open to internships & collaborations",
  // Drop your photo at this path. A branded placeholder renders until then.
  profileImage: "/images/profile/jis-john-sajan.jpg",
  // Drop your PDF at this path to enable the résumé download.
  resume: "/resume/Jis_John_Sajan_Resume.pdf",
  stats: [
    { value: "4+", label: "Projects built" },
    { value: "9", label: "Certifications" },
    { value: "2029", label: "Graduating", sublabel: "B.Tech CSE" },
  ],
  currentlyBuilding: {
    project: "Portfolio V2",
    status: "Refining & shipping",
    technologies: ["Next.js", "TypeScript", "Framer Motion"],
  },
};
