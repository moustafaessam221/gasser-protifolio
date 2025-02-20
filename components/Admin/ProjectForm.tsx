// src/components/ProjectForm.tsx
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  bg_img: FileList;
  device: FileList;
  featuredImages: FileList;
}

const ProjectForm: React.FC<{ onSubmit: SubmitHandler<FormValues> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [bg_imgPreview, setBg_imgPreview] = useState<string | null>(null);
  const [devicePreview, setDevicePreview] = useState<string | null>(null);
  const [featuredImagesPreviews, setFeaturedImagesPreviews] = useState<
    string[]
  >([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleMultipleImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setFeaturedImagesPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-md"
    >
      <input
        type="text"
        placeholder="Title"
        {...register("title", { required: "Title is required" })}
        className="border p-2 rounded"
      />
      {errors.title && (
        <span className="text-red-500">{errors.title.message}</span>
      )}

      <label htmlFor="description" className="font-semibold">
        Description
      </label>
      <textarea
        placeholder="Description"
        {...register("description", { required: "Description is required" })}
        className="border p-2 rounded"
      />
      {errors.description && (
        <span className="text-red-500">{errors.description.message}</span>
      )}

      <label htmlFor="bg_img" className="font-semibold">
        background image
      </label>
      <input
        name="bg_img"
        type="file"
        accept="image/*"
        {...register("bg_img")}
        onChange={(e) => handleImageChange(e, setBg_imgPreview)}
        className="border p-2 rounded"
      />
      {bg_imgPreview && (
        <Image
          src={bg_imgPreview}
          alt="bg_img Preview"
          className="w-32 h-32 object-cover mt-2"
          width={128}
          height={128}
        />
      )}

      <label htmlFor="device" className="font-semibold">
        Device
      </label>
      <input
        name="device"
        type="file"
        accept="image/*"
        {...register("device")}
        onChange={(e) => handleImageChange(e, setDevicePreview)}
        className="border p-2 rounded"
      />
      {devicePreview && (
        <Image
          src={devicePreview}
          alt="Device Preview"
          className="w-32 h-32 object-cover mt-2"
          width={128}
          height={128}
        />
      )}

      <label htmlFor="featuredImages" className="font-semibold">
        Featured Images
      </label>
      <input
        name="featuredImages"
        type="file"
        accept="image/*"
        multiple
        {...register("featuredImages")}
        onChange={handleMultipleImagesChange}
        className="border p-2 rounded"
      />
      <div className="flex gap-2 mt-2">
        {featuredImagesPreviews.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Featured Preview ${index}`}
            className="w-32 h-32 object-cover"
            width={128}
            height={128}
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ProjectForm;
