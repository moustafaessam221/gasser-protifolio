"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMainImage } from "@/utils/firebaseFunctions";
import Image from "next/image";

const EditMainImg = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const {
    mutate: uploadImage,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (selectedFile: File) => uploadMainImage(selectedFile),
    onSuccess: () => {
      alert("Image uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["mainImage"] });
    },
    onError: (err) => {
      console.error(err);
      alert("Error uploading image");
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      {file && (
        <div className="mt-4">
          <Image
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="w-full h-auto"
          />
        </div>
      )}
      <button
        onClick={() => file && uploadImage(file)}
        disabled={!file || isPending}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending ? "Uploading..." : "Upload"}
      </button>
      {isPending && <p className="mt-2 text-blue-600">Uploading...</p>}
      {isError && <p className="mt-2 text-red-600">Error uploading image</p>}
      {isSuccess && <p className="mt-2 text-green-600">Upload successful!</p>}
    </div>
  );
};

export default EditMainImg;
