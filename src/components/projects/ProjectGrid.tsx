import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [feature, ...rest] = projects;

  return (
    <div className="flex flex-col gap-5">
      {feature && <ProjectCard project={feature} index={0} feature />}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {rest.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
