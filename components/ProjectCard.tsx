import { Project } from "@/types/project";
import Link from "next/link";
import ProjectTitleImg from "./ProjectTitleImg";

export default function ProjectCard({
  project,
}: Readonly<{ project: Project }>) {
  return (
    <Link
      href={`/work/${project.id}`}
      key={project.id}
      // className="flex-col items-start lg:flex lg:flex-row lg:items-center lg:justify-between mb-4 bg-white rounded-[30px] shadow-md lg:overflow-hidden w-full h:[300px] lg:h-[414px] hover:drop-shadow-custom-white transition-all duration-300 font-sans"
      className="flex w-full h-[414px] justify-between mb-4 bg-white rounded-[30px] font-workSans hover:drop-shadow-custom-white transition-all duration-300 overflow-hidden"
    >
      <div className=" min-w-[554px] max-w-[650px] ml-[114px] hidden lg:block ">
        <h2 className="text-[32px] font-semibold mb-2 mt-[48px]">
          {project.title}
        </h2>
        <p className="mb-4 text-2xl font-normal leading-9">
          {project.description}
        </p>
        <div className=" font-semibold cursor-pointer text-2xl">View</div>
      </div>

      {/* Image */}
      <div className="w-full min-h-[300px] lg:w-1/2 h-full">
        <ProjectTitleImg bgimg={project.bg_img} device={project.device} />
      </div>
    </Link>
  );
}
