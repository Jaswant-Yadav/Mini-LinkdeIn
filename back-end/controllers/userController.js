const User = require("../models/User");

exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { name, bio } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, bio },
    { new: true }
  ).select("-password");
  res.json(user);
};


exports.addBio = async (req, res) => {
  const { bio } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { bio },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update bio" });
  }
};
