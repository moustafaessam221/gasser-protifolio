import AboutMe from "@/components/About/AboutMe";
import React from "react";

export async function generateMetadata() {
  return {
    title: "About Me | Gasser Design",
  };
}

const page = () => {
  return (
    <div>
      <AboutMe />
    </div>
  );
};

export default page;
