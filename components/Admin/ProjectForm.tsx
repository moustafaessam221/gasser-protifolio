import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  title: string;
  short_description: string;
  long_description: string;
  bg_img: FileList;
  device: FileList;
  featuredImages: FileList;
  featured: boolean;
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
      className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Project Form</h2>

      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter project title"
          {...register("title", {
            required: "Title is required",
            minLength: 3,
            maxLength: 50,
          })}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <span className="text-red-500 mt-1">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="short_description" className="font-semibold mb-1">
          Short Description
        </label>
        <textarea
          placeholder="Enter a short description"
          {...register("short_description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 170,
              message: "Description must be at most 170 characters",
            },
          })}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.short_description && (
          <span className="text-red-500 mt-1">
            {errors.short_description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="long_description" className="font-semibold mb-1">
          Long Description
        </label>
        <textarea
          placeholder="Enter a detailed description"
          {...register("long_description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 350,
              message: "Description must be at most 350 characters",
            },
          })}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.long_description && (
          <span className="text-red-500 mt-1">
            {errors.long_description.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="bg_img" className="font-semibold mb-1">
          Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("bg_img")}
          onChange={(e) => handleImageChange(e, setBg_imgPreview)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {bg_imgPreview && (
          <Image
            src={bg_imgPreview}
            alt="Background Image Preview"
            className="w-32 h-32 object-cover mt-2"
            width={128}
            height={128}
          />
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="device" className="font-semibold mb-1">
          Device
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("device")}
          onChange={(e) => handleImageChange(e, setDevicePreview)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <div className="flex flex-col">
        <label htmlFor="featuredImages" className="font-semibold mb-1">
          Featured Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("featuredImages")}
          onChange={handleMultipleImagesChange}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input type="checkbox" {...register("featured")} className="mr-2" />
        <label htmlFor="featured" className="font-semibold">
          Featured?
        </label>
      </div>

      <div className="flex gap-2 mt-2">
        {featuredImagesPreviews.map((src, index) => (
          <Image
            key={src}
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
        className="bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600 transition-colors duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ProjectForm;
