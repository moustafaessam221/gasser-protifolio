import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  bg_layer: string;
  layer_color: string;
  logo: string;
  phone: string;
};

const ProjectImage = (props: Props) => {
  return (
    <div className="relative overflow-hidden h-full w-full flex justify-center items-start">
      {/* Background Image with Color Filter */}
      <div className="absolute inset-0">
        <Image
          src={props.bg_layer}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: props.layer_color,
            mixBlendMode: "multiply",
          }}
        ></div>
      </div>

      {/* Foreground Images */}
      <div className="relative z-10 flex justify-center">
        <div className="flex gap-8">
          <motion.div>
            <Image
              src={props.logo}
              alt="Foreground Image 1"
              width={246}
              height={500}
              objectFit="contain"
            />
          </motion.div>
          <motion.div
            className="w-1/2"
            initial={{ y: 200 }}
            whileHover={{ y: 0 }}
          >
            <Image
              src={props.phone}
              alt="Foreground Image 2"
              width={250}
              height={250}
              objectFit="contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectImage;
