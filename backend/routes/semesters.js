const express = require("express");
const router = express.Router();
const Semester = require("../models/Semester");

// GET /api/semesters
router.get("/", async (req, res) => {
  try {
    const sems = await Semester.find().sort({ name: 1 });
    res.json(sems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/semesters
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const exists = await Semester.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ message: "Semester already exists" });

    const s = new Semester({ name: name.trim() });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/semesters/:id
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const s = await Semester.findByIdAndUpdate(
      req.params.id,
      { name: name.trim() },
      { new: true }
    );
    if (!s) return res.status(404).json({ message: "Semester not found" });
    res.json(s);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/semesters/:id
router.delete("/:id", async (req, res) => {
  try {
    const s = await Semester.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: "Semester not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;