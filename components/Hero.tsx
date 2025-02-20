import { FaArrowRight } from "react-icons/fa";
import { PiHandWaving } from "react-icons/pi";
import Image from "next/image";
import HomeImg from "@/public/flyingImages/HeroImg.png";

const Hero = () => {
  return (
    <div className="pl-4 md:pl-10 lg:pl-20 flex items-center justify-between h-auto lg:h-[70vh]">
      <div className="flex flex-col gap-4">
        <button className="bg-black h-14 text-white w-44 text-2xl rounded-xl flex gap-2 items-center justify-center font-workSans z-10 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:font-semibold">
          <PiHandWaving className="text-yellow-500" fill="yellow" />
          Hello All
        </button>
        <h2 className="text-7xl font-semibold mt-2">I&apos;m Gasser Amr,</h2>
        <p className="text-4xl font-semibold">A UI/UX Designer</p>
        <div className="flex gap-4 mt-4 flex-wrap lg:flex-nowrap">
          <button className="secondry-button bg-black text-white flex items-center justify-center text-xl hover:bg-white hover:text-black hover:border-2 hover:border-black">
            View My Work &nbsp; <FaArrowRight />
          </button>
          <button className="secondry-button bg-white border-2 border-black text-xl hover:bg-black hover:text-white">
            Contact me
          </button>
        </div>
      </div>
      {/* side image */}
      <div className="w-full h-full relative hidden md:block">
        <Image src={HomeImg} alt="Flying Pages" fill className="object-cover" />
      </div>
    </div>
  );
};

export default Hero;
