import FullProjects from "@/components/work/FullProjects";

export async function generateMetadata() {
  return {
    title: "Work | Gasser Design",
  };
}

const page = () => {
  return (
    <div className="responsive-padding">
      <h1 className="text-white font-semibold text-4xl pt-24 mb-16">
        Previous Work
      </h1>
      <FullProjects />
    </div>
  );
};

export default page;
