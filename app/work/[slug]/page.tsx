import ProjectDetails from "@/components/projectInfo/ProjectDetails";
import { fetchProjectByName } from "@/utils/firebaseFunctions";
import React from "react";

async function fetchProjectData(slug: string) {
  const res = await fetchProjectByName(slug);
  return res || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const projectName = (await params).slug;
  const decodedName = decodeURIComponent(projectName);
  try {
    const projectData = await fetchProjectData(decodedName);
    return {
      title: `${projectData?.title} | Gasser Design`,
      description: projectData?.short_description,
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return {
      title: `${decodedName} | Gasser Design`,
      description: "",
    };
  }
}

export default async function ProjectFullInfo({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const projectName = (await params).slug;
  const decodedName = decodeURIComponent(projectName);
  let projectData = null;

  try {
    projectData = await fetchProjectData(decodedName);
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
  return (
    <div>
      <ProjectDetails name={decodedName} initialData={projectData} />
    </div>
  );
}
