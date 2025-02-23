import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  slides: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export default function Carousel({
  slides,
  autoSlide = false,
  autoSlideInterval = 2000,
}: Readonly<Props>) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides, setCurr]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="overflow-hidden relative flex-col">
      <div
        className="flex transition-transform ease-out duration-[800ms]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {/* IMAGE */}
        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 w-full h-auto flex justify-center items-center"
          >
            <Image
              width={334}
              height={684}
              src={slide}
              alt=""
              style={{
                objectFit: "cover",

                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <MdKeyboardArrowLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <MdKeyboardArrowRight size={40} />
        </button>
      </div>
      <div>
        <div className="flex mt-5 items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
