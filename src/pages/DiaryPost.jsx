import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const DiaryPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:4000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      const json = await response.json();
      if (response.ok) setPost(json);
    };

    if (user) fetchPost();
  }, [user, id]);

  if (!post) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <div className="text-black-600 mb-2">
        {format(new Date(post.date), "MMMM d, y")}
      </div>
      <div className="text-lg">{post.content}</div>
    </div>
  );
};

export default DiaryPost;

