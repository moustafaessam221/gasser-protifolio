"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const SideImage = () => {
  return (
    <motion.div
      className="-z-50 absolute -right-[150px] top-[150px] w-full hidden lg:block"
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      style={{ willChange: "transform" }}
    >
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/car-price-prediction-919d9.appspot.com/o/bg_img%2FFrame%20138.svg?alt=media&token=18490ddc-f1d3-4ef3-9ca6-c3a251ec3081"
        alt="Flying Pages"
        className="w-full h-full object-cover scale-125"
        width={500}
        height={500}
        // Removed priority for lazy loading
      />
    </motion.div>
  );
};

export default SideImage;
