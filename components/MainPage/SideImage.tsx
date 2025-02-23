"use client";
import Image from "next/image";
import HomeImg from "@/public/flyingImages/HeroImg.png";
import { motion } from "framer-motion";

const SideImage = () => {
  return (
    <motion.div
      className="-z-50 absolute right-0 top-0 h-full w-[1111px] hidden lg:block "
      animate={{
        y: [0, -20, 0], // Moves the image up by 20px and back to the original position
      }}
      transition={{
        duration: 2, // Duration of the animation cycle
        repeat: Infinity, // Repeat the animation indefinitely
        repeatType: "loop", // Loop the animation
        ease: "easeInOut", // Easing function
      }}
    >
      <Image
        src={HomeImg}
        alt="Flying Pages"
        className="w-full h-full object-cover rotate-[40deg]"
        fill
        priority
      />
    </motion.div>
  );
};

export default SideImage;
