import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title="Projects that show how I build, innovate and solve problems."
          description="A selection of projects spanning IoT, embedded systems and the web. Each one turned an idea into something that actually runs."
        />

        <div className="mt-14">
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </section>
  );
}
