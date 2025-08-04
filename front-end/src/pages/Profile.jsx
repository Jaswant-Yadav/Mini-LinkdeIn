import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

const Profile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwnProfile = loggedInUser?._id === id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await api.get(`/users/${id}`);
        setUserInfo(userRes.data);
        setBio(userRes.data.bio || "");

        const postsRes = await api.get(`/posts/user/${id}`);
        setPosts(postsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [id]);

  const handleBioSubmit = async () => {
    try {
      const res = await api.put(`/users/${id}/bio`, { bio });
      setUserInfo(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating bio", err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = async (postId) => {
    try {
      const formData = new FormData();
      formData.append("content", editedContent);
      if (editedImage) {
        formData.append("image", editedImage);
      }

      const res = await api.put(`/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosts(posts.map((p) => (p._id === postId ? res.data : p)));
      setEditingPost(null);
      setEditedImage(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>{userInfo.name}</h2>
        <p>{userInfo.email}</p>

        {isOwnProfile && (
          <div className="bio-section">
            {!userInfo.bio && !isEditing && (
              <>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Add your bio..."
                />
                <button onClick={handleBioSubmit}>Save Bio</button>
              </>
            )}

            {userInfo.bio && !isEditing && (
              <>
                <p>{userInfo.bio}</p>
                <button onClick={() => setIsEditing(true)}>Edit Bio</button>
              </>
            )}

            {isEditing && (
              <>
                <textarea
                  rows="3"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={handleBioSubmit} className="save">Save</button>
                <button
                  onClick={() => {
                    setBio(userInfo.bio);
                    setIsEditing(false);
                  }}
                  className="cancel"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="profile-posts">
        <h3>Posts by {userInfo.name}</h3>
        {posts.map((post) => {
          const isOwner = loggedInUser?._id === post.user._id;

          return (
            <div key={post._id} className="profile-post-card">
              {editingPost === post._id ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                  />
                  <button onClick={() => handleUpdate(post._id)}>Save</button>
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setEditedImage(null);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={`http://localhost:5000/${post.image}`}
                      alt="post"
                      className="post-img"
                    />
                  )}
                  <small>{new Date(post.createdAt).toLocaleString()}</small>
                </>
              )}

              {isOwner && editingPost !== post._id && (
                <div className="post-actions">
                  <button
                    onClick={() => {
                      setEditingPost(post._id);
                      setEditedContent(post.content);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
