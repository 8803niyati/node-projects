const userModel = require("../models/user.schema");
const bcrypt = require("bcrypt");   // 🔥 missing import added

const getMyProfile = async (req, res) => {
  return res.status(200).json({
    status: 200,
    user: req.user
  });
};

const updateMyProfile = async (req, res) => {
  try {
    // 🔐 If password is provided, hash it before saving
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updated = await userModel.findByIdAndUpdate(
      req.user._id,      // req.user is coming from verifyToken
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.json({
      status: 200,
      message: "Profile updated successfully",
      updated
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 500, message: "Server error" });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
