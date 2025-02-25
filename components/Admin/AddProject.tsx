"use client";

import { SubmitHandler } from "react-hook-form";
import ProjectForm from "./ProjectForm";
import { uploadImage, addProjectToFirestore } from "@/utils/firebaseFunctions";

interface FormValues {
  title: string;
  short_description: string;
  long_description: string;
  bg_img: FileList;
  device: FileList;
  featuredImages: FileList;
  featured: boolean;
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
        title: data.title,
        short_description: data.short_description,
        long_description: data.long_description,
        bg_img: bg_imgUrl,
        device: deviceUrl,
        featured_Images: featuredImagesUrls,
        featured: data.featured,
      });
      console.log(data.short_description);
      alert("Project uploaded successfully!");
    } catch (error) {
      console.error("Error uploading project: ", error);
      alert("Error uploading project.");
    }
  };

  return <ProjectForm onSubmit={onSubmit} />;
}
