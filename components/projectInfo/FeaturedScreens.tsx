"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Loading from "@/app/loading";
import Image from "next/image";

type Props = {
  featured_images: string[];
};

const FeaturedScreens = ({ featured_images }: Props) => {
  const [imagesArr, setImagesArr] = useState(featured_images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [prevImgIndex, setPrevImgIndex] = useState(featured_images.length - 1);
  // const [nextImgIndex, setNextImgIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setImagesArr(featured_images);
    setCurrentImageIndex(0);
    // setPrevImgIndex(featured_images.length - 1);
    // setNextImgIndex(1);
    console.log("featured_images", featured_images);
    setIsLoading(false);
  }, [featured_images]);

  function handleLeftClick() {
    const newCurrentIndex =
      (currentImageIndex - 1 + featured_images.length) % featured_images.length;
    setCurrentImageIndex(newCurrentIndex);
    // setPrevImgIndex(
    //   (newCurrentIndex - 1 + featured_images.length) % featured_images.length
    // );
    // setNextImgIndex((newCurrentIndex + 1) % featured_images.length);
    handleClick();
  }

  function handleRightClick() {
    const newCurrentIndex = (currentImageIndex + 1) % featured_images.length;
    setCurrentImageIndex(newCurrentIndex);
    // setPrevImgIndex(
    //   (newCurrentIndex - 1 + featured_images.length) % featured_images.length
    // );
    // setNextImgIndex((newCurrentIndex + 1) % featured_images.length);
    handleClick();
  }

  // create an animation to play on button click
  function handleClick() {
    if (mainImgRef.current) {
      mainImgRef.current.style.animation = "none"; // Reset animation
      void mainImgRef.current.offsetWidth; // Trigger reflow
      mainImgRef.current.style.animation = "fade 0.5s ease-in-out"; // Reapply animation
    }
  }

  if (!featured_images || featured_images.length === 0) {
    return <Loading />;
  }

  if (!imagesArr || imagesArr.length === 0 || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="text-[32px] font-semibold text-center text-white my-[70px]">
        Featured Screens
      </h2>
      <div className="text-white relative h-[70vh] duration-500">
        <button
          onClick={handleLeftClick}
          className="absolute left-9 top-1/2 lg:text-white text-black border rounded-full lg:bg-black/50 bg-white/75 text-4xl lg:text-6xl z-20"
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          onClick={handleRightClick}
          className="absolute right-9 top-1/2 lg:text-white text-black border rounded-full lg:bg-black/50 bg-white/75 text-4xl lg:text-6xl z-20"
        >
          <MdKeyboardArrowRight />
        </button>
        {/* Image Container */}
        <div className="grid grid-cols-3 gap-4 items-center place-items-center h-full duration-500">
          {/* Previous Image */}
          {/* <div className="hidden md:col-span-1 md:block duration-500 z-0">
            <Image
              key={prevImgIndex}
              src={imagesArr[prevImgIndex]}
              alt="left"
              className="brightness-50 hidden"
              layout="responsive"
              width={400}
              height={400}
            />
          </div> */}

          {/* Current Image */}
          {/* <div
            ref={mainImgRef}
            className="col-span-3 md:col-span-1 duration-500 z-10 "
          > */}
          <Image
            key={currentImageIndex}
            src={imagesArr[currentImageIndex]}
            alt="center"
            fill
            objectFit="contain"
            className="drop-shadow-custom-white"
          />
          {/* </div> */}

          {/* Next Image */}
          {/* <div className="hidden md:col-span-1 md:block duration-500 z-0">
            <Image
              key={nextImgIndex}
              src={imagesArr[nextImgIndex]}
              layout="responsive"
              width={400}
              height={400}
              alt="right"
              className="brightness-50 hidden"
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FeaturedScreens;
