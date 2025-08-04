const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");

exports.createPost = async (req, res) => {
  try {
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const post = await Post.create({
      user: req.userId,
      content: req.body.content,
      image: imagePath, 
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("user", "name");  // Add this line to include author's name
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }
};


// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    // If new image uploaded, delete old one
    if (req.file && post.image) {
      const oldPath = path.join(__dirname, "..", post.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    post.content = req.body.content || post.content;
    post.image = req.file ? req.file.path : post.image;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    // Delete image from filesystem
    if (post.image) {
      fs.unlink(path.join("uploads", post.image), () => {});
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

