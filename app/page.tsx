import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/MainPage/Hero"));
const ProjectsList = dynamic(
  () => import("@/components/MainPage/ProjectsList")
);
const ContactForm = dynamic(() => import("@/components/ContactForm"));

export default async function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />
      <ProjectsList />
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
