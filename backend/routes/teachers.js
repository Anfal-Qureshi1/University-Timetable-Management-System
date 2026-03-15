const express = require("express");
const router = express.Router();
const User = require("../models/User");

/*
  Routes operate on the User model with role: "teacher".
  - GET /api/teachers -> list users with role teacher
  - POST /api/teachers -> create { username, password, role: 'teacher' } (expects body { name, password })
  - PUT /api/teachers/:id -> update username/password for teacher user (expects body { name, password })
  - DELETE /api/teachers/:id -> delete teacher user
*/

router.get("/", async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("username password role").sort({ username: 1 });
    // For compatibility with existing admin frontend that expects name/password,
    // we return username (frontend will use username).
    res.json(teachers);
  } catch (err) {
    console.error("GET /api/teachers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// create teacher (body: { name, password })
router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });
    if (!password || password.length < 4) return res.status(400).json({ message: "Password must be at least 4 characters" });

    const username = name.trim();
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "User with this username already exists" });

    const user = await User.create({ username, password, role: "teacher" });
    // return created user
    res.status(201).json(user);
  } catch (err) {
    console.error("POST /api/teachers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// update teacher (body: { name, password })
router.put("/:id", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });
    if (!password || password.length < 4) return res.status(400).json({ message: "Password must be at least 4 characters" });

    const username = name.trim();
    // Ensure the target user is a teacher
    const updated = await User.findOneAndUpdate(
      { _id: req.params.id, role: "teacher" },
      { username, password },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/teachers/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// delete teacher
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ _id: req.params.id, role: "teacher" });
    if (!deleted) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/teachers/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;