import { Project } from "@/types/project";
import Link from "next/link";
import ProjectTitleImg from "./ProjectTitleImg";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.id}`}
      key={project.id}
      className="flex-col items-start lg:flex lg:flex-row lg:items-center lg:justify-between mb-4 bg-white rounded-[30px] shadow-md lg:overflow-hidden w-full h:[300px] lg:h-[414px] hover:drop-shadow-custom-white transition-all duration-300 font-sans"
    >
      <div className="pl-12 flex flex-col gap-3 w-1/2 ml-20 hidden lg:block">
        <h2 className="text-4xl font-semibold mb-2">{project.title}</h2>
        <p className="mb-4 text-2xl ">{project.description}</p>
        <div className=" font-semibold cursor-pointer text-2xl">View</div>
      </div>

      {/* Image */}
      <div className="w-full min-h-[300px] lg:w-2/5 h-full">
        <ProjectTitleImg bgimg={project.bg_img} device={project.device} />
      </div>
    </Link>
  );
}
