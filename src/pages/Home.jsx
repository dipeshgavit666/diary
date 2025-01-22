import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { usePostsContext } from "../hooks/usePostsContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import PostHead from "../components/PostHead";
import PostForm from "../components/PostForm";

function Home() {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user || !user.token) {
          setError("User authentication required.");
          return;
        }
    
        const response = await fetch("https://diary-api-j1kj.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
    
        const json = await response.json();
        console.log("API Response:", json); // Debug log to inspect response
    
        // If response is an array, directly use it
        if (response.ok && Array.isArray(json)) {
          dispatch({ type: "SET_POSTS", payload: json }); // Use the response directly
        } else {
          console.error("Unexpected response structure:", json);
          setError("Failed to load posts.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching posts.");
      }
    };
    
    
    if (user) fetchPosts();
  }, [user, dispatch]);

  console.log("Posts state:", posts); // Debug log to inspect posts state

  // Show loading state
  if (!posts && !error) return <div>Loading...</div>;

  // Show error state
  if (error) return <div>Error: {error}</div>;

  // Check if posts is an array
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return <div>Error loading posts.</div>;
  }

  if (!posts) {
    return (
      <div className="spinner">
        <HashLoader color="#36d7b7" size={200} />
      </div>
    );
  }

  // Render posts
  return (
    <div className="flex h-screen flex-col md:flex-row justify-between">
      <div className="w-1/2">
        <h1 className="m-3 p-3 text-xl font-semibold">Posts</h1>
        {posts.length === 0 ? (
          <p className="m-3">No posts available.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <PostHead key={post._id || post.tempKey} post={post} />
              //<PostHead key={post._id} post={post} />
            ))}
          </ul>
        )}
      </div>
      <div className="w-1/2 p-4">
        <PostForm />
      </div>
    </div>
  );
}

export default Home;
