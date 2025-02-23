import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PiHandWaving } from "react-icons/pi";
import SideImage from "./SideImage";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[710px] responsive-padding">
      <div className="flex flex-col pt-8 lg:py-16 xl:py-32 w-full">
        <button className="bg-black h-[37px] md:h-14 text-white w-[101px] md:w-44 text-[13px] md:text-xl lg:text-2xl rounded-xl flex gap-1  items-center justify-center font-workSans z-10 font-semibold">
          <PiHandWaving className="text-yellow-500" fill="yellow" />
          Hello All
        </button>
        <div
          className="flex flex-col items-start justify-center mt-[24px]
        md:mt-4 lg:mt-8 xl:mt-8 mb-12 "
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide">
            I&apos;m Gasser Amr,
          </h2>
          <p className="text-2xl  md:text-4xl font-normal">A UI/UX Designer</p>
        </div>
        <div className="flex gap-4 md:mt-4 flex-wrap md:flex-nowrap font-workSans">
          <Link
            href="/work"
            className="secondry-button bg-black text-white  hover:bg-white hover:text-black hover:border-2 hover:border-black"
          >
            View My Work &nbsp; <FaArrowRight />
          </Link>
          <Link
            href="/about"
            className="secondry-button bg-white border-2  border-black hover:bg-black hover:text-white"
          >
            Contact me
          </Link>
        </div>
      </div>
      {/* side image */}
      <SideImage />
    </div>
  );
};

export default Hero;
