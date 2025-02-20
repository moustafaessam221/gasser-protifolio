import { Project } from "@/types/project";
import { fetchProjects, deleteProjectById } from "@/utils/firebaseFunctions";
import React, { useEffect, useState } from "react";

const ProjectsControl = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  });
  return (
    <div className="flex flex-col gap-4">
      {projects.map((project: Project) => (
        <div key={project.id} className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <button
            onClick={() => deleteProjectById(project.id)}
            className="text-red-500 bg-white border-2 border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsControl;
