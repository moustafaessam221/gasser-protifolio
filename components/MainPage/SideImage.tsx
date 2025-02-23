"use client";
import Image from "next/image";
import HomeImg from "@/public/images/test_home.svg";
import { motion } from "framer-motion";

const SideImage = () => {
  return (
    <motion.div
      className="-z-50 absolute right-[150px] top-[150px] h-full w-full hidden lg:block "
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Image
        src={HomeImg}
        alt="Flying Pages"
        className="w-full h-full object-cover scale-125"
        priority
      />
    </motion.div>
  );
};

export default SideImage;
