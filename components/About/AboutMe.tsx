"use client";
import personalImg from "@/public/images/personal_photo.png";
import Image from "next/image";
import ContactForm from "../ContactForm";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchBio } from "@/utils/firebaseFunctions";
import { convertNewlinesToBreaks } from "@/utils/textUtils";

const AboutMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: () => fetchBio(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching bio</div>;
  }

  return (
    <>
      <div className="responsive-padding text-white gap-8 bg-black flex flex-col-reverse md:flex-row items-center justify-between mb-8">
        <div className="flex flex-col gap-4 w-full md:w-1/2 py-24">
          <h1 className="text-4xl font-semibold">A Little Bit About Me</h1>
          <p className="text-xl font-normal leading-[150%] max-w-2xl">
            {data && convertNewlinesToBreaks(data)}
          </p>
          <Link
            href="#contact_me"
            className="secondry-button border-white border-2 hover:bg-white hover:text-black mt-[32px]"
          >
            Contact Me
          </Link>
        </div>
        <div className="relative h-full ">
          <Image
            src={personalImg}
            alt="A portrait of Gasser Amr"
            objectFit="contain"
          />
        </div>
      </div>
      <ContactForm />
    </>
  );
};

export default AboutMe;
