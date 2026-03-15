const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// GET /api/departments
router.get("/", async (req, res) => {
  try {
    const depts = await Department.find().sort({ name: 1 });
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/departments
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const exists = await Department.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ message: "Department already exists" });

    const d = new Department({ name: name.trim() });
    await d.save();
    res.status(201).json(d);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/departments/:id
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) return res.status(400).json({ message: "Name required" });

    const d = await Department.findByIdAndUpdate(
      req.params.id,
      { name: name.trim() },
      { new: true }
    );
    if (!d) return res.status(404).json({ message: "Department not found" });
    res.json(d);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/departments/:id
router.delete("/:id", async (req, res) => {
  try {
    const d = await Department.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;