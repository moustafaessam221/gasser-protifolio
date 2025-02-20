// src/components/AddProject.tsx
"use client";

import { SubmitHandler } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import { uploadImage, addProjectToFirestore } from "@/utils/firebaseFunctions";
import { v4 as uuidv4 } from "uuid";

interface FormValues {
  title: string;
  description: string;
  bg_img: FileList;
  device: FileList;
  featuredImages: FileList;
}

export default function AddProject() {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const bg_imgUrl = data.bg_img[0] ? await uploadImage(data.bg_img[0]) : "";
      const deviceUrl = data.device[0] ? await uploadImage(data.device[0]) : "";

      const featuredImagesUrls = await Promise.all(
        Array.from(data.featuredImages).map((image) => uploadImage(image))
      );

      await addProjectToFirestore({
        id: uuidv4(),
        title: data.title,
        description: data.description,
        bg_img: bg_imgUrl,
        device: deviceUrl,
        featured_Images: featuredImagesUrls,
      });

      alert("Project uploaded successfully!");
    } catch (error) {
      console.error("Error uploading project: ", error);
      alert("Error uploading project.");
    }
  };

  return <ProjectForm onSubmit={onSubmit} />;
}
