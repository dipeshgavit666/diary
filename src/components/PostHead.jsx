import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext"; // Import the useAuthContext hook

function PostHead({ post }) {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext(); // Get user context (including token)

  if (!post) {
    console.error("Post is undefined in PostHead");
    return null;
  }

  const handleClick = async () => {
    if (!user || !user.token) {
      console.error("Unauthorized request: no token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${user.token}`, // Add token to headers
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        // Pass just the post._id instead of the entire response
        dispatch({ type: "DELETE_POST", payload: post._id });
        console.log("Post deleted", json);
      } else {
        console.error("Failed to delete post:", json.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <li className="flex items-center justify-between py-4 m-3 p-3 hover:bg-green-100">
      <span className="flex flex-col w-full">
        <h2 className="text-lg font-semibold mb-2">
          <Link to={`/api/posts/${post._id}`}>
            {post.title || "Untitled Post"}
          </Link>
        </h2>
        <div className="text-gray-500 text-sm">
          {post.date || "Unknown Date"}
        </div>
        <p className="mt-2 text-gray-700 line-clamp-3">
          {(post.content || "").substring(0, 200)}...
        </p>
      </span>
      {/* Trigger handleClick on TrashIcon click */}
      <span onClick={handleClick}>
        <TrashIcon className="h-6 w-6 m-6 text-blue-500 cursor-pointer" />
      </span>
    </li>
  );
}

export default PostHead;
