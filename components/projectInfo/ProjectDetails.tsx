"use client";
import Loading from "@/app/loading";
import { fetchProjectByName } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./Carousel";
import ProjectHero from "./ProjectHero";
import { Project } from "@/types/project";

type Props = {
  name: string;
  initialData?: Project | null;
};

const ProjectDetails = (props: Props) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["project", props.name],
    queryFn: () => fetchProjectByName(String(props.name)),
    initialData: props.initialData,
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
