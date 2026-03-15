const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// GET /api/subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    console.error("GET /api/subjects error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/subjects
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const exists = await Subject.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ message: "Subject already exists" });

    const s = new Subject({ name: name.trim() });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    console.error("POST /api/subjects error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/subjects/:id
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const s = await Subject.findByIdAndUpdate(req.params.id, { name: name.trim() }, { new: true });
    if (!s) return res.status(404).json({ message: "Subject not found" });
    res.json(s);
  } catch (err) {
    console.error("PUT /api/subjects/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/subjects/:id
router.delete("/:id", async (req, res) => {
  try {
    const s = await Subject.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ message: "Subject not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/subjects/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;