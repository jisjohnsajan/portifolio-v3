import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
