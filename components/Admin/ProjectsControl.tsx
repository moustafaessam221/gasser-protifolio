import { Project } from "@/types/project";
import {
  fetchProjects,
  deleteProjectById,
  changeFeatured,
  editProjectOrder,
} from "@/utils/firebaseFunctions";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ProjectsControl = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: projects,
    error,
  } = useQuery({
    queryKey: ["adminProjects"],
    queryFn: () => fetchProjects(),
    staleTime: 1000 * 60 * 5,
  });

  const {
    mutate: deleteMutation,
    isPending: isDeleteLoading,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteProjectById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  const {
    mutate: changeFeaturedMutation,
    isPending: isFeaturedLoading,
    error: featuredError,
  } = useMutation({
    mutationFn: changeFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    },
  });

  async function handleOrderEdit(projectId: string | number, order: number) {
    if (projects?.some((project) => project.order === order)) {
      throw new Error("Order number already exists.");
    } else if (order < 0) {
      throw new Error("Order number cannot be negative.");
    } else {
      await editProjectOrder(projectId, order);
    }
  }

  const {
    mutate: changeOrderMutation,
    isPending: isOrderLoading,
    error: orderError,
  } = useMutation<void, Error, { projectId: string | number; order: number }>({
    mutationFn: ({ projectId, order }) => handleOrderEdit(projectId, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", "featured"] });
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

  const sortedByOrder = projects?.toSorted((a, b) => a.order - b.order);

  return (
    <div className="max-w-full w-screen mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {sortedByOrder?.map((project: Project) => (
          <div
            key={project.id}
            className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between"
          >
            <h1 className="text-xl font-semibold mb-2 md:mb-0">
              {project.title}
            </h1>
            <div className="flex items-center gap-4">
              <div>
                <input
                  type="number"
                  value={project.order}
                  className="w-16 text-center px-2 py-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) =>
                    changeOrderMutation({
                      projectId: project.id,
                      order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <button
                onClick={() => changeFeaturedMutation(project.id)}
                disabled={isFeaturedLoading}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  project.featured
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {isFeaturedLoading
                  ? "Updating..."
                  : project.featured
                    ? "Featured"
                    : "Not Featured"}
              </button>

              <button
                onClick={() => deleteMutation(project.id)}
                disabled={isDeleteLoading}
                className="px-4 py-2 rounded-lg text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                {isDeleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {isOrderLoading && (
        <div className="text-center mt-4 text-blue-500">Updating order...</div>
      )}
      {orderError && (
        <div className="text-center mt-4 text-red-500">
          {orderError.message}
        </div>
      )}

      {isDeleteLoading && (
        <div className="text-center mt-4 text-red-500">Deleting project...</div>
      )}
      {deleteError && (
        <div className="text-center mt-4 text-red-500">
          {deleteError.message}
        </div>
      )}

      {isFeaturedLoading && (
        <div className="text-center mt-4 text-blue-500">Updating...</div>
      )}
      {featuredError && (
        <div className="text-center mt-4 text-red-500">
          {featuredError.message}
        </div>
      )}
    </div>
  );
};

export default ProjectsControl;
