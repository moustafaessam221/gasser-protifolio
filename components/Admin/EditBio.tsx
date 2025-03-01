"use client";
import { fetchBio, updateBio } from "@/utils/firebaseFunctions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

const EditBio = () => {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["about"],
    queryFn: fetchBio,
    staleTime: 1000 * 60 * 5,
  });

  if (isSuccess) {
    setValue("bio", data);
  }

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: updateBio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      setUpdateSuccess(true);
    },
  });

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-lg text-red-600">
        Error loading bio. Please try again later.
      </div>
    );
  }

  const onSubmit = handleSubmit((formData) => {
    mutation(formData.bio);
  });

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={onSubmit} className="flex flex-col">
        <textarea
          {...register("bio", { required: true, maxLength: 700 })}
          name="bio"
          id="bio"
          cols={30}
          rows={10}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </form>
      {updateSuccess && (
        <div className="mt-4 text-green-600">Bio updated successfully!</div>
      )}
    </div>
  );
};

export default EditBio;
