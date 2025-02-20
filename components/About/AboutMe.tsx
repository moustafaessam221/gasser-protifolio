import personalImg from "@/public/images/personal_photo.png";
import Image from "next/image";
import ContactForm from "../ContactForm";

const AboutMe = () => {
  return (
    <>
      <div className="responsive-padding text-white gap-8 bg-black flex flex-col-reverse md:flex-row items-center justify-between mb-8">
        <div className="flex flex-col gap-4 w-full md:w-1/2 py-24">
          <h1 className="text-4xl font-semibold">A Little Bit About Me</h1>
          <p className="text-xl font-normal leading-[150%] max-w-2xl">
            I&apos;m Gasser Amr, a passionate UI/UX Designer who puts users at
            the center of every experience. I believe every digital interface
            should feel as natural as a friendly conversation—simple, engaging,
            and easy to navigate. I focus on crafting clear, intuitive designs
            that help people connect with technology with confidence and ease.
          </p>
          <p className="text-xl font-normal leading-[150%] max-w-2xl">
            I love to learn and continuously explore new trends to stay ahead in
            the ever-evolving world of design. Using tools like Figma and Adobe
            XD, I transform ideas into interfaces that are not only beautiful
            but also built on solid research and user insight. My goal is to
            create digital experiences that simplify life and spark genuine
            delight in every interaction.
          </p>
          <button className="secondry-button border-white border-2">
            Contact Me
          </button>
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
