import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  bgimg: string;
  device: string;
};

const ProjectTitleImg = ({ bgimg, device }: Props) => {
  if (!bgimg || !device) return null;

  return (
    <div className="relative overflow-hidden group max-h-[414px]">
      <Image
        src={bgimg}
        alt="Picture of the background"
        sizes="100vw"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
          zIndex: -1,
        }}
        width={500}
        height={300}
      />
      <motion.div className="absolute top-3/10 group-hover:top-2/10 transition-all duration-200 ease-in-out max-h-[504px] max-w-[246px] right-1/10 ">
        <Image
          src={device}
          alt="Picture of the device"
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            zIndex: 1,
          }}
          width={245}
          height={503}
        />
      </motion.div>
    </div>
  );
};

export default ProjectTitleImg;
