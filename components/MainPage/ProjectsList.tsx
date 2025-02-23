"use client";

import Loading from "@/app/loading";
import { Project } from "@/types/project";
import { fetchProjects } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ProjectCard from "../ProjectCard";

interface Props {
  limit: number;
}

export default function ProjectsList(props: Readonly<Props>) {
  const { isPending, data, error } = useQuery({
    queryKey: ["projects", props.limit],
    queryFn: () => fetchProjects(props.limit),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching projects:", error);
    return <div>Error fetching projects</div>;
  }

  return (
    <div className="responsive-padding flex flex-col gap-4 mt-12 lg:mt-0 py-12 transparent-background">
      <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-16 items-center mb-4">
        <h1 className="text-xl lg:text-4xl font-semibold text-white font-eczar">
          Featured Work
        </h1>
        <Link
          href="/work"
          className="py-2 lg:py-[15px] px-6 lg:px-[84px] border-white border-[3px] lg:border-[5px] rounded-[5px] font-workSans text-white text-[12px] lg:text-xl"
        >
          View All Work
        </Link>
      </div>
      <div className="flex flex-col gap-14 mb-12">
        {data.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
