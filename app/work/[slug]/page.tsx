import ProjectDetails from "@/components/projectInfo/ProjectDetails";
import React from "react";

export default async function ProjectFullInfo({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const projectId = (await params).slug;
  return (
    <div>
      <ProjectDetails id={projectId} />
    </div>
  );
}
