const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getMyProfile, getUserProfile, updateProfile, addBio } = require("../controllers/userController");

router.get("/me", auth, getMyProfile);
router.get("/:id",auth, getUserProfile);
router.put("/me", auth, updateProfile);
router.put("/:id/bio",auth, addBio);

module.exports = router;
