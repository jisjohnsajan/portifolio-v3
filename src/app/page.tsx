import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedWork />
      <About />
      <Skills />
      <Education />
      <Certifications />
      <Contact />
    </>
  );
}
