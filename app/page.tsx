import ContactForm from "@/components/ContactForm";
import Hero from "@/components/MainPage/Hero";
import ProjectsList from "@/components/ProjectsList";

export default async function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Hero />
      <ProjectsList limit={3} />
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
