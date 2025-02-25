import { Project } from "@/types/project";
import {
  fetchProjects,
  deleteProjectById,
  changeFeatured,
} from "@/utils/firebaseFunctions";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ProjectsControl = () => {
  const queryClient = useQueryClient(); // Access the QueryClient instance

  // Fetch projects using React Query
  const {
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: ["adminProjects"],
    queryFn: () => fetchProjects(),
  });

  // Mutation for deleting a project
  const deleteMutation = useMutation({
    mutationFn: deleteProjectById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  // Mutation for changing featured status
  const changeFeaturedMutation = useMutation({
    mutationFn: changeFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    },
  });

  if (isLoading) {
    return <div className="text-center mt-4">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-red-500">
        Error loading projects.
      </div>
    );
  }

  return (
    <div className="max-w-full w-screen mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {projects?.map((project: Project) => (
          <div
            key={project.id}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between"
          >
            <h1 className="text-xl font-semibold mb-2 md:mb-0">
              {project.title}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => changeFeaturedMutation.mutate(project.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  project.featured
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                Featured? {project.featured ? "Yes" : "No"}
              </button>

              <button
                onClick={() => deleteMutation.mutate(project.id)}
                className="px-4 py-2 rounded-lg text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsControl;
