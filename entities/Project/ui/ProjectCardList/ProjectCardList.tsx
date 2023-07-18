"use client";
import { Project } from "../../model/types/project";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { useMemo } from "react";

interface ProjectCardListProps {
  projectsNodes: { node: Project }[];
}
export const ProjectCardList = ({ projectsNodes }: ProjectCardListProps) => {
  const projects = useMemo(() => {
    return projectsNodes.map((node) => node.node);
  }, [projectsNodes]);
  return (
    <section className={"projects-grid"}>
      {projects.map((project) => (
        <ProjectCard card={project} key={project.id} />
      ))}
    </section>
  );
};
