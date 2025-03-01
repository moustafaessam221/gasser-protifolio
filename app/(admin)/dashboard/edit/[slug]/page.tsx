import EditProjectForm from "@/components/Admin/EditProjectForm";

export default async function ProjectEditInfo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const projectId = (await params).slug;

  return (
    <div className="responsive-padding">
      <EditProjectForm projectId={projectId} />
    </div>
  );
}
