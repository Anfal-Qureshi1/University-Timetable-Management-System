const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🔍 Check user in SAME collection (admin/teacher/student)
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Send role back to frontend
    res.json({
      username: user.username,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
