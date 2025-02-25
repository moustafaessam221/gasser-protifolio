import ContactForm from "@/components/ContactForm";
import Hero from "@/components/MainPage/Hero";
import ProjectsList from "@/components/MainPage/ProjectsList";

export default async function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />
      <ProjectsList />
      <div className="mt-12" id="contact">
        <ContactForm />
      </div>
    </div>
  );
}
