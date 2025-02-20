"use client";
import { Project } from "@/types/project";
import { fetchProjects } from "@/utils/firebaseFunctions";
import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard";

const FullProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    }
    loadProjects();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-14 mb-12">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FullProjects;
