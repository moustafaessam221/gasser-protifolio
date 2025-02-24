import ProjectTitleImg from "../ProjectTitleImg";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

type Props = {
  title: string;
  short_description: string;
  long_description: string;
  bg_img: string;
  device: string;
};

const ProjectHero = (props: Props) => {
  return (
    <div className="bg-white responsive-padding w-dvw flex flex-col lg:flex-row  justify-between items-center lg:h-[600px] lg:gap-24 lg:py-[100px] relative py-12">
      <Link href="/work" className="absolute top-4 left-4 md:top-12 md:left-12">
        <FaArrowLeft size={20} />
      </Link>
      <div className="flex-col gap-4 hidden lg:flex">
        <h2 className="text-3xl font-semibold">{props.title}</h2>
        <p className="text-2xl leading-9 w-[700px]">
          {props.short_description}
        </p>
        <p className="text-xl leading-9 w-[700px]">{props.long_description}</p>
      </div>
      <div
        className="w-full h-full overflow-hidden max-w-[650px]"
        style={{ borderRadius: "30px" }}
      >
        <ProjectTitleImg bgimg={props.bg_img} device={props.device} />
      </div>
    </div>
  );
};

export default ProjectHero;
