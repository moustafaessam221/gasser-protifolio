// import { useEffect, useState, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// type Props = {
//   featured_images: string[];
// };

// const FeaturedScreens = ({ featured_images }: Props) => {
//   if (!featured_images || featured_images.length === 0) {
//     return <div>No images to display</div>;
//   }

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const prevImgIndex =
//     currentImageIndex === 0
//       ? featured_images.length - 1
//       : currentImageIndex - 1;

//   const nextImgIndex =
//     currentImageIndex === featured_images.length - 1
//       ? 0
//       : currentImageIndex + 1;

//   const handleNext = useCallback((): void => {
//     setCurrentImageIndex(nextImgIndex);
//     setIsLoading(true);
//   }, [nextImgIndex]);

//   const handlePrev = useCallback((): void => {
//     setCurrentImageIndex(prevImgIndex);
//     setIsLoading(true);
//   }, [prevImgIndex]);

//   const handleImageLoad = useCallback((): void => {
//     setIsLoading(false);
//   }, []);

//   const handleKeyDown = useCallback(
//     (e: KeyboardEvent): void => {
//       if (isModalOpen) {
//         if (e.key === "ArrowLeft") handlePrev();
//         if (e.key === "ArrowRight") handleNext();
//         if (e.key === "Escape") setIsModalOpen(false);
//       }
//     },
//     [isModalOpen, handlePrev, handleNext]
//   );

//   useEffect(() => {
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [handleKeyDown]);

//   return (
//     <>
//       <div className="relative bg-gradient-to-b from-black to-gray-900 text-white py-16">
//         <div className="max-w-[1400px] mx-auto px-4">
//           <h2 className="text-4xl font-bold mb-12 text-center ">
//             Featured Images
//           </h2>

//           <div className="relative flex items-center justify-center">
//             <NavigationButton direction="prev" onClick={handlePrev} />

//             <div className="relative w-full overflow-hidden">
//               <div className="flex items-center justify-center gap-6 h-[700px]">
//                 <AnimatePresence mode="wait">
//                   {/* Previous Image */}
//                   <motion.div
//                     key={`prev-${prevImgIndex}`}
//                     className="relative w-[30%] h-full cursor-pointer"
//                     onClick={() => {
//                       setCurrentImageIndex(prevImgIndex);
//                       setIsModalOpen(true);
//                     }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 0.4, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                     aria-label={`View previous image (${prevImgIndex + 1} of ${featured_images.length})`}
//                   >
//                     <Image
//                       src={featured_images[prevImgIndex]}
//                       alt={`Previous image (${prevImgIndex + 1} of ${featured_images.length})`}
//                       fill
//                       className="object-contain rounded-xl transform -skew-x-2"
//                       onLoad={handleImageLoad}
//                       onError={() => setIsLoading(false)}
//                       sizes="(max-width: 768px) 30vw, 400px"
//                       loading="lazy"
//                     />
//                   </motion.div>

//                   {/* Current Image */}
//                   <motion.div
//                     key={`current-${currentImageIndex}`}
//                     className="relative w-[50%] h-full cursor-pointer"
//                     onClick={() => setIsModalOpen(true)}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     transition={{ duration: 0.3 }}
//                     aria-label={`View current image (${currentImageIndex + 1} of ${featured_images.length})`}
//                   >
//                     {isLoading && <LoadingSpinner />}
//                     <Image
//                       src={featured_images[currentImageIndex]}
//                       alt={`Current image (${currentImageIndex + 1} of ${featured_images.length})`}
//                       fill
//                       className="object-contain rounded-xl shadow-2xl"
//                       onLoad={handleImageLoad}
//                       onError={() => setIsLoading(false)}
//                       sizes="(max-width: 768px) 50vw, 800px"
//                       priority
//                     />
//                   </motion.div>

//                   {/* Next Image */}
//                   <motion.div
//                     key={`next-${nextImgIndex}`}
//                     className="relative w-[30%] h-full cursor-pointer"
//                     onClick={() => {
//                       setCurrentImageIndex(nextImgIndex);
//                       setIsModalOpen(true);
//                     }}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 0.4, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                     aria-label={`View next image (${nextImgIndex + 1} of ${featured_images.length})`}
//                   >
//                     <Image
//                       src={featured_images[nextImgIndex]}
//                       alt={`Next image (${nextImgIndex + 1} of ${featured_images.length})`}
//                       fill
//                       className="object-contain rounded-xl transform skew-x-2"
//                       onLoad={handleImageLoad}
//                       onError={() => setIsLoading(false)}
//                       sizes="(max-width: 768px) 30vw, 400px"
//                       loading="lazy"
//                     />
//                   </motion.div>
//                 </AnimatePresence>
//               </div>
//             </div>

//             <NavigationButton direction="next" onClick={handleNext} />
//           </div>

//           <DotsNavigation
//             images={featured_images}
//             currentIndex={currentImageIndex}
//             onChange={(index) => {
//               setCurrentImageIndex(index);
//               setIsLoading(true);
//             }}
//           />
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
//             onClick={() => setIsModalOpen(false)}
//           >
//             <div
//               className="relative w-full h-full flex items-center justify-center"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button
//                 onClick={handlePrev}
//                 className="absolute left-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
//                 aria-label="Previous image"
//               >
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>

//               <motion.div
//                 className="relative w-[90%] h-[90%]"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Image
//                   src={featured_images[currentImageIndex]}
//                   alt={`Modal view (${currentImageIndex + 1} of ${featured_images.length})`}
//                   fill
//                   className="object-contain"
//                   priority
//                   sizes="90vw"
//                   onError={() => setIsLoading(false)}
//                 />
//               </motion.div>

//               <button
//                 onClick={handleNext}
//                 className="absolute right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
//                 aria-label="Next image"
//               >
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
//                 aria-label="Close modal"
//               >
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-xl backdrop-blur-sm">
//     <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
//   </div>
// );

// const NavigationButton = ({
//   direction,
//   onClick,
// }: {
//   direction: "prev" | "next";
//   onClick: () => void;
// }) => (
//   <button
//     onClick={onClick}
//     className="absolute z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-200"
//     style={{ [direction === "prev" ? "left" : "right"]: "1rem" }}
//     aria-label={`${direction === "prev" ? "Previous" : "Next"} image`}
//   >
//     <svg
//       className="w-6 h-6 text-white"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
//       />
//     </svg>
//   </button>
// );

// const DotsNavigation = ({
//   images,
//   currentIndex,
//   onChange,
// }: {
//   images: string[];
//   currentIndex: number;
//   onChange: (index: number) => void;
// }) => (
//   <div className="flex justify-center gap-2 mt-8">
//     {images.map((_, index) => (
//       <button
//         key={index}
//         onClick={() => onChange(index)}
//         className={`w-2 h-2 rounded-full transition-all duration-200 ${
//           index === currentIndex
//             ? "bg-white w-4"
//             : "bg-white/50 hover:bg-white/75"
//         }`}
//         aria-label={`Go to image ${index + 1} of ${images.length}`}
//       />
//     ))}
//   </div>
// );

// export default FeaturedScreens;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Loading from "@/app/loading";

type Props = {
  featured_images: string[];
};

const FeaturedScreens = ({ featured_images }: Props) => {
  const [imagesArr, setImagesArr] = useState(featured_images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImgIndex, setPrevImgIndex] = useState(featured_images.length - 1);
  const [nextImgIndex, setNextImgIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setImagesArr(featured_images);
    setCurrentImageIndex(0);
    setPrevImgIndex(featured_images.length - 1);
    setNextImgIndex(1);
    console.log("featured_images", featured_images);
    setIsLoading(false);
  }, [featured_images]);

  function handleLeftClick() {
    const newCurrentIndex =
      (currentImageIndex - 1 + featured_images.length) % featured_images.length;
    setCurrentImageIndex(newCurrentIndex);
    setPrevImgIndex(
      (newCurrentIndex - 1 + featured_images.length) % featured_images.length
    );
    setNextImgIndex((newCurrentIndex + 1) % featured_images.length);
    handleClick();
  }

  function handleRightClick() {
    const newCurrentIndex = (currentImageIndex + 1) % featured_images.length;
    setCurrentImageIndex(newCurrentIndex);
    setPrevImgIndex(
      (newCurrentIndex - 1 + featured_images.length) % featured_images.length
    );
    setNextImgIndex((newCurrentIndex + 1) % featured_images.length);
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
    <div className="text-white relative h-[70vh] ">
      <button
        onClick={handleLeftClick}
        className="absolute left-9 top-1/2 lg:text-white text-black border rounded-full lg:bg-black/50 bg-white/75 text-4xl lg:text-6xl z-10"
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        onClick={handleRightClick}
        className="absolute right-9 top-1/2 lg:text-white text-black border rounded-full lg:bg-black/50 bg-white/75 text-4xl lg:text-6xl z-10"
      >
        <MdKeyboardArrowRight />
      </button>
      <div className="grid grid-cols-3 gap-4 items-center place-items-center h-full">
        {/* Previous Image */}
        <div className="hidden md:col-span-1 md:block">
          <img
            key={prevImgIndex}
            src={imagesArr[prevImgIndex]}
            alt="left"
            className="brightness-50"
          />
        </div>

        {/* Current Image */}
        <div ref={mainImgRef} className="col-span-3 md:col-span-1">
          <img
            key={currentImageIndex}
            src={imagesArr[currentImageIndex]}
            alt="center"
            className="w-[400px]"
          />
        </div>

        {/* Next Image */}
        <div className="hidden md:col-span-1  md:block">
          <img
            key={nextImgIndex}
            src={imagesArr[nextImgIndex]}
            className="brightness-50"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedScreens;
