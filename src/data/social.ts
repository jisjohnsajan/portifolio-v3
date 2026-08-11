import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  XIcon,
} from "@/components/ui/BrandIcons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: IconType;
}

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/jisjohnsajan",
    handle: "@jisjohnsajan",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/john-sajan-4ab8382ab/",
    handle: "Jis John Sajan",
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/absolutely_jis.johnny/",
    handle: "@absolutely_jis.johnny",
    icon: InstagramIcon,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/jisjohnsajan",
    handle: "@jisjohnsajan",
    icon: XIcon,
  },
  {
    label: "Email",
    href: "mailto:jisjohnsajan@gmail.com",
    handle: "jisjohnsajan@gmail.com",
    icon: Mail,
  },
];
