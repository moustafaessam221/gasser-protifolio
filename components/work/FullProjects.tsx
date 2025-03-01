"use client";
import Loading from "@/app/loading";
import { fetchProjects } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../ProjectCard";

const FullProjects = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error fetching projects</div>;
  }

  const sortedByOrder = data.toSorted((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex flex-col gap-14 mb-12">
        {sortedByOrder.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default FullProjects;
