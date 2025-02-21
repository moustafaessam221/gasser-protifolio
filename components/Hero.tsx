import { FaArrowRight } from "react-icons/fa";
import { PiHandWaving } from "react-icons/pi";
import Image from "next/image";
import HomeImg from "@/public/flyingImages/HeroImg.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="pl-4 md:pl-10 lg:pl-20 flex justify-between w-full h-[710px]">
      <div className="flex flex-col py-[200px]">
        <button className="bg-black h-14 text-white w-44 text-[24px] rounded-xl flex gap-1 py-3 px-6 items-center justify-center font-workSans z-10 font-semibold ">
          <PiHandWaving className="text-yellow-500" fill="yellow" />
          Hello All
        </button>
        <div className="h-[122px] flex flex-col items-start justify-center border-black mt-[36px] mb-[48px]">
          <h2 className="text-[64px] font-semibold tracking-[1.28px]">
            I&apos;m Gasser Amr,
          </h2>
          <p className="text-[40px] font-normal">A UI/UX Designer</p>
        </div>
        <div className="flex gap-4 mt-4 flex-wrap lg:flex-nowrap font-workSans">
          <Link
            href="/work"
            className="secondry-button bg-black text-white flex items-center justify-center text-xl hover:bg-white hover:text-black hover:border-2 hover:border-black"
          >
            View My Work &nbsp; <FaArrowRight />
          </Link>
          <Link
            href="/about"
            className="secondry-button bg-white border-2 flex items-center justify-center border-black text-xl hover:bg-black hover:text-white"
          >
            Contact me
          </Link>
        </div>
      </div>
      {/* side image */}
      <div className="relative flex-1 h-full hidden lg:block">
        <Image
          src={HomeImg}
          alt="Flying Pages"
          className="object-cover"
          fill
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
