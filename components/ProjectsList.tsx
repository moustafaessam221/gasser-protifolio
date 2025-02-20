"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";
import { fetchProjects } from "@/utils/firebaseFunctions";
import Loading from "@/app/loading";

interface Props {
  limit: number;
}

export default function ProjectsList(props: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const projectsData = await fetchProjects(props.limit);
      setProjects(projectsData);
      console.log(projectsData);
    }
    loadProjects();
  }, []);

  return (
    <div className="responsive-padding flex flex-col gap-4 mt-12 lg:mt-0 bg-black py-12">
      <div className="flex flex-wrap lg:flex-nowrap gap-16 items-center mb-4">
        <h1 className="text-4xl font-semibold text-white">Featured Work</h1>
        <button className="secondry-button border-white border-2 text-white">
          View All Work
        </button>
      </div>
      <div className="flex flex-col gap-14 mb-12">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
