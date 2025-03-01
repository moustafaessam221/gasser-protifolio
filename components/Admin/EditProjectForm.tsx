"use client";

import { Project } from "@/types/project";
import { editProjectById, fetchProjectById } from "@/utils/firebaseFunctions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

type Props = {
  projectId: string | number;
};

const EditProjectForm = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", props.projectId],
    queryFn: () => fetchProjectById(String(props.projectId)),
  });

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    short_description: "",
    long_description: "",
    featured_Images: [],
    device: "",
    bg_img: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        short_description: data.short_description || "",
        long_description: data.long_description || "",
        featured_Images: data.featured_Images || [],
        device: data.device || "",
        bg_img: data.bg_img || "",
        featured: data.featured || false,
        order: data.order || 0,
      });
    }
  }, [data]);

  const {
    mutate: editProject,
    isPending: isMutating,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (updatedData: Omit<Project, "id">) => {
      return editProjectById(props.projectId, updatedData);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.short_description ||
      !formData.long_description
    ) {
      alert("Please fill out all fields.");
      return;
    }
    editProject(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project data</div>;

  return (
    <div className="flex flex-col gap-4 min-h-screen text-black text-2xl">
      <h1>Edit Project</h1>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2"
      />
      <input
        type="text"
        name="short_description"
        value={formData.short_description}
        onChange={handleChange}
        placeholder="Short Description"
        className="border p-2"
      />
      <textarea
        name="long_description"
        value={formData.long_description}
        onChange={handleChange}
        placeholder="Long Description"
        className="border p-2 min-h-80 h-auto"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2"
        disabled={isMutating}
      >
        {isMutating ? "Updating..." : "Update Project"}
      </button>
      {isSuccess && <div>Project updated successfully!</div>}
      {isError && <div>Error updating project</div>}
    </div>
  );
};

export default EditProjectForm;
