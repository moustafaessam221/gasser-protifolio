import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { createPortal } from "react-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

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

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalPrev = () =>
    setModalIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
  const modalNext = () =>
    setModalIndex((index) => (index === slides.length - 1 ? 0 : index + 1));

  return (
    <div
      className={`overflow-hidden  flex-col ${isModalOpen ? "pointer-events-none" : ""}`}
    >
      <div
        className="flex transition-transform ease-out duration-[800ms]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="shrink-0 w-full h-auto flex justify-center items-center "
          >
            <Image
              onClick={() => openModal(i)}
              width={334}
              height={684}
              src={slide}
              alt=""
              style={{
                width: "auto",
                objectFit: "cover",
                height: "100%",
              }}
            />
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="inset-0 flex items-center relative justify-between">
        <button
          onClick={prev}
          className="p-1 absolute -top-[350px] rounded-full shadow bg-white/80 text-gray-800 hover:bg-white left-4 lg:left-24"
        >
          <MdKeyboardArrowLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 absolute -top-[350px] rounded-full shadow bg-white/80 text-gray-800 hover:bg-white right-4  lg:right-24"
        >
          <MdKeyboardArrowRight size={40} />
        </button>
      </div>

      {/* Indicators */}
      <div>
        <div className="flex mt-5 items-center justify-center gap-2 responsive-padding relative">
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

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white  z-[101] cursor-pointer hover:text-gray-300 text-4xl"
            >
              &times;
            </button>
            <div className="flex items-center justify-center">
              <button
                onClick={modalPrev}
                className="p-1 absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-[102]"
              >
                <MdKeyboardArrowLeft size={40} />
              </button>
              <Image
                width={800}
                height={600}
                src={slides[modalIndex]}
                alt=""
                style={{
                  objectFit: "contain",
                  maxHeight: "90vh",
                  maxWidth: "90vw",
                }}
                className="z-[101]"
              />
              <button
                onClick={modalNext}
                className="p-1 absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-[102]"
              >
                <MdKeyboardArrowRight size={40} />
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
