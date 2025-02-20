"use client";
import FeaturedScreens from "@/components/projectInfo/FeaturedScreens";
import ProjectHero from "@/components/projectInfo/ProjectHero";
import { Project } from "@/types/project";
import { fetchProjectById } from "@/utils/firebaseFunctions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug: projectId } = useParams();

  useEffect(() => {
    if (typeof projectId === "string") {
      fetchProjectById(projectId).then((data) => setProject(data));
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col gap-12 font-workSans">
      <ProjectHero
        title={project?.title ?? ""}
        description={project?.description ?? ""}
        bg_img={project?.bg_img ?? ""}
        device={project?.device ?? ""}
      />
      <FeaturedScreens featured_images={project?.featured_Images ?? []} />
    </div>
  );
};

export default Page;
