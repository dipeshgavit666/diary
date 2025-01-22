import React from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";

function PostForm() {
  const { user } = useAuthContext(); // Get the current user (including token)
  const { dispatch } = usePostsContext();

  const onSubmit = async (data) => {
    const post = {
      title: data.title,
      date: data.date,
      content: data.content,
    };

    try {
      // Check if the user is logged in and has a token
      if (!user || !user.token) {
        console.error("Unauthorized, no token found.");
        return;
      }

      const response = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add the token in the Authorization header
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Error:", json);
        return;
      }

      const newPost = json;

      if (response.ok) {
        reset({ title: "", date: "", content: "" });
        dispatch({ type: "CREATE_POST", payload: newPost });
        console.log("New post created:", newPost);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center items-center ">
      <form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Create a Post</h3>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Required field" })}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: "Required field" })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="content"
          >
            Diary Content
          </label>
          <textarea
            id="content"
            rows="10"
            {...register("content", { required: "Required field" })}
            placeholder="Enter Diary Content"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          POST
        </button>
      </form>
    </div>
  );
}

export default PostForm;
