import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data); // already sorted by createdAt from backend
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setContent("");
      setImage(null);
      fileInputRef.current.value = "";
      fetchPosts(); // Refresh posts
    } catch (err) {
      alert("Failed to post");
    }
  };

  return (
    <div className="home">
      <h2 className="text-xl font-semibold mb-4">
        Welcome, <strong className="text-red-600" style={{color:"red"}}>{user?.name || "User"}</strong>
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="post-card"
          >
            <p className="text-gray-800 mb-2">{post.content}</p>

            {post.image && (
              <img
                src={`https://back-linkedin.onrender.com/${post.image}`}
                alt="post"
                className="post-img"
              />
            )}

            <div className="text-sm text-gray-500">
              Posted by{" "}
              <span className="font-medium">{post.user?.name || "Unknown"}</span>{" "}
              • {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
