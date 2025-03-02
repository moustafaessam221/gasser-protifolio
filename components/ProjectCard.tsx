import { Project } from "@/types/project";
import Link from "next/link";
import ProjectTitleImg from "./ProjectTitleImg";
import { truncateText } from "@/utils/functions";
import { convertNewlinesToBreaks } from "@/utils/textUtils";

export default function ProjectCard({
  project,
}: Readonly<{ project: Project }>) {
  const maxLength = 51;
  const trancatedText = truncateText(project.short_description, maxLength);

  return (
    <Link
      href={`/work/${project.id}`}
      key={project.id}
      className="flex flex-col-reverse lg:flex-row h-auto lg:max-h-[414px] w-full mx-auto justify-between mb-4 bg-white rounded-[10px] md:rounded-[20px] lg:rounded-[30px] font-workSans hover:drop-shadow-custom-white transition-all duration-300 overflow-hidden group"
    >
      <div className="relative w-full lg:w-auto max-w-[650px] max-h-[414px] flex flex-col justify-between py-[32px] lg:py-[62px] px-[32px] lg:px-[62px]">
        <h2 className="text-2xl xl:text-[32px] font-semibold">
          {project.title}
        </h2>
        <p className="text-lg block lg:hidden xl:block lg:text-xl font-normal leading-7 lg:leading-9 lg:line-clamp-1 xl:line-clamp-none text-desciprtion">
          {convertNewlinesToBreaks(project.short_description)}
        </p>
        <p className="text-lg text-desciprtion hidden lg:block xl:hidden lg:text-xl font-normal">
          {convertNewlinesToBreaks(trancatedText)}
        </p>
        <div className="font-semibold cursor-pointer hidden lg:block text-lg xl:text-2xl">
          View
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-auto lg:h-full max-w-[729px] max-h-[414px]">
        <ProjectTitleImg bgimg={project.bg_img} device={project.device} />
      </div>
    </Link>
  );
}
