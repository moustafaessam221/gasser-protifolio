"use client";
import Loading from "@/app/loading";
import { fetchMainImage } from "@/utils/firebaseFunctions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const SideImage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["mainImage"],
    queryFn: () => fetchMainImage(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching image:", error);
    return <div>Error fetching image</div>;
  }

  return (
    <div className="-z-50 absolute -top-[50px] -right-[0px] h-[1000px] w-full hidden lg:block">
      <Image
        src={data}
        alt="Flying Pages"
        className="w-full h-full object-cover image-move"
        fill
      />
    </div>
  );
};

export default SideImage;
