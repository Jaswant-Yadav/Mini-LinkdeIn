const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost
} = require("../controllers/postController");

// Set up storage configuration for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", auth, upload.single("image"), createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
