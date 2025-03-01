import Image from "next/image";

const SideImage = () => {
  return (
    <div className="-z-50 absolute -right-[150px] h-[1000px] top-[150px] w-full hidden lg:block image-move">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/car-price-prediction-919d9.appspot.com/o/bg_img%2FFrame%20138.svg?alt=media&token=18490ddc-f1d3-4ef3-9ca6-c3a251ec3081"
        alt="Flying Pages"
        className="w-full h-full object-cover scale-125 "
        fill
      />
    </div>
  );
};

export default SideImage;
