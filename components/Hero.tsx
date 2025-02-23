import { FaArrowRight } from "react-icons/fa";
import { PiHandWaving } from "react-icons/pi";
import Image from "next/image";
import HomeImg from "@/public/flyingImages/HeroImg.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[710px] responsive-padding">
      <div className="flex flex-col py-16 lg:py-32 w-full">
        <button className="bg-black h-14 text-white w-44 text-lg md:text-xl lg:text-2xl rounded-xl flex gap-1 py-3 px-6 items-center justify-center font-workSans z-10 font-semibold">
          <PiHandWaving className="text-yellow-500" fill="yellow" />
          Hello All
        </button>
        <div className="flex flex-col items-start justify-center border-black mt-8 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide">
            I&apos;m Gasser Amr,
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal">
            A UI/UX Designer
          </p>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap lg:flex-nowrap font-workSans">
          <Link
            href="/work"
            className="secondry-button bg-black text-white flex items-center justify-center text-lg md:text-xl hover:bg-white hover:text-black hover:border-2 hover:border-black"
          >
            View My Work &nbsp; <FaArrowRight />
          </Link>
          <Link
            href="/about"
            className="secondry-button bg-white border-2 flex items-center justify-center border-black text-lg md:text-xl hover:bg-black hover:text-white"
          >
            Contact me
          </Link>
        </div>
      </div>
      {/* side image */}
      <div className="-z-50 absolute right-0 top-0 flex-1 h-full hidden lg:block border-2 border-red-500">
        <Image
          src={HomeImg}
          alt="Flying Pages"
          className="w-full h-full rotate-[56deg]"
          width={2560}
          height={1628}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
