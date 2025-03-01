import ProjectTitleImg from "../ProjectTitleImg";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { convertNewlinesToBreaks } from "@/utils/textUtils";

type Props = {
  title: string;
  long_description: string;
  bg_img: string;
  device: string;
};

const ProjectHero = (props: Props) => {
  return (
    <>
      {/* Desktop view */}
      <div className="bg-white responsive-padding w-dvw hidden lg:flex flex-col lg:flex-row  justify-between items-center lg:gap-24 lg:py-[100px] relative py-12">
        <Link
          href="/work"
          className="absolute top-4 left-4 md:top-12 md:left-12"
        >
          <FaArrowLeft size={20} />
        </Link>
        <div className="flex flex-col gap-12 w-full h-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">{props.title}</h2>
            <div className="clearfix">
              <div
                className="float-right w-full max-w-[650px] min-w-[400px] max-h-[414px] mb-4 ml-[125px]"
                style={{ borderRadius: "30px" }}
              >
                <ProjectTitleImg bgimg={props.bg_img} device={props.device} />
              </div>
              <p className="text-[24px] leading-9">
                {convertNewlinesToBreaks(props.long_description)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="bg-white responsive-padding w-full flex flex-col justify-between flex-wrap gap-10 relative lg:hidden">
        <Link
          href="/work"
          className="absolute top-[32px] left-4 md:top-12 md:left-12"
        >
          <FaArrowLeft size={20} />
        </Link>
        <h2 className="text-3xl font-semibold mt-[84px]">{props.title}</h2>
        <div
          className="w-full h-auto lg:h-full max-w-[729px] max-h-[414px]"
          style={{ borderRadius: "30px" }}
        >
          <ProjectTitleImg bgimg={props.bg_img} device={props.device} />
        </div>
        <p className="text-xl leading-9 mb-[64px]">
          {convertNewlinesToBreaks(props.long_description)}
        </p>
      </div>
    </>
  );
};

export default ProjectHero;
