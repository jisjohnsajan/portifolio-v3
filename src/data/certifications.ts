export interface Certification {
  name: string;
  issuer: string;
  description: string;
  /** Grid thumbnail path. Drop images into /public/images/certificates/. */
  thumbnail: string;
  /** Full-resolution image shown in the lightbox. */
  image: string;
  /** Optional public verification link. */
  credentialUrl?: string;
  date?: string;
}

export const certifications: Certification[] = [
  {
    name: "Digital 101",
    issuer: "NASSCOM",
    description: "Foundational digital literacy and technology awareness.",
    thumbnail: "/images/certificates/digital-101.jpg",
    image: "/images/certificates/digital-101.webp",
  },
  {
    name: "Python Certification",
    issuer: "Infosys",
    description: "Professional Python programming proficiency.",
    thumbnail: "/images/certificates/infosys-python.jpg",
    image: "/images/certificates/infosys-python.webp",
  },
  {
    name: "C Programming",
    issuer: "Infosys",
    description: "Core C programming concepts and systems development.",
    thumbnail: "/images/certificates/infosys-c.jpg",
    image: "/images/certificates/infosys-c.webp",
  },
  {
    name: "COBOL Workshop",
    issuer: "Workshop",
    description: "Hands-on COBOL programming workshop for legacy systems.",
    thumbnail: "/images/certificates/cobol.jpg",
    image: "/images/certificates/cobol.webp",
  },
  {
    name: "Carrier Craft",
    issuer: "TANTRA '25",
    description: "Career development and professional skills workshop.",
    thumbnail: "/images/certificates/carrier-craft.jpg",
    image: "/images/certificates/carrier-craft.webp",
  },
  {
    name: "GenAI Virtual Experience",
    issuer: "Tata × Forage",
    description: "Generative AI applications and enterprise use cases.",
    thumbnail: "/images/certificates/tata-forage.jpg",
    image: "/images/certificates/tata-forage.webp",
  },
  {
    name: "AI Fluency",
    issuer: "Anthropic",
    description: "AI fundamentals, responsible AI usage and prompt engineering.",
    thumbnail: "/images/certificates/ai-fluency.jpg",
    image: "/images/certificates/ai-fluency.webp",
  },
  {
    name: "Training Certificate",
    issuer: "Corizo",
    description: "Professional training program certification.",
    thumbnail: "/images/certificates/corizo.jpg",
    image: "/images/certificates/corizo.webp",
  },
  {
    name: "Certificate of Internship",
    issuer: "InAmigos",
    description: "Professional internship program certification.",
    thumbnail: "/images/certificates/inamigos.jpg",
    image: "/images/certificates/inamigos.webp",
  },
];
