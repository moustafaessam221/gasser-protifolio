"use client";
import React from "react";
import ProjectHero from "./ProjectHero";
// import FeaturedScreens from "./FeaturedScreens";
import { fetchProjectById } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Carousel from "./Carousel";

type Props = {
  id: string;
};

const ProjectDetails = (props: Props) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["project", props.id],
    queryFn: () => fetchProjectById(String(props.id)),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching project:", error);
    return <div>Error fetching project</div>;
  }

  return (
    <div className="flex flex-col gap-12 font-workSans">
      <ProjectHero
        title={data?.title ?? ""}
        long_description={data?.long_description ?? ""}
        bg_img={data?.bg_img ?? ""}
        device={data?.device ?? ""}
      />
      <h2 className="text-[32px] font-semibold text-center text-white my-[32px] lg:my-[64px]">
        Featured Screens
      </h2>
      <Carousel slides={data?.featured_Images ?? []} />
    </div>
  );
};

export default ProjectDetails;
