import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  bgimg: string;
  device: string;
};

const ProjectTitleImg = ({ bgimg, device }: Props) => {
  if (!bgimg || !device) return null;

  // Check if the screen is small
  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth <= 480;

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      {isSmallScreen ? (
        <div className="flex justify-center items-center h-full">
          <Image
            placeholder="blur"
            blurDataURL={device}
            src={device}
            alt="Device"
            width={250}
            height={500}
            className="w-auto h-[300px] sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] object-contain"
          />
        </div>
      ) : (
        <motion.div
          initial={{ x: 150, y: 200 }}
          whileHover={{ y: 120 }}
          className="flex justify-center items-center h-full"
        >
          <Image
            placeholder="blur"
            blurDataURL={device}
            src={device}
            alt="Device"
            width={250}
            height={500}
            className="w-auto h-[300px] sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px] object-contain"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProjectTitleImg;
