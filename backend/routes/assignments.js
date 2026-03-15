const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// GET /api/assignments
// Optional query params: teacher, department, semester, day
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.teacher) filter.teacher = req.query.teacher;
    if (req.query.department) filter.department = req.query.department;
    if (req.query.semester) filter.semester = req.query.semester;
    if (req.query.day) filter.day = req.query.day;

    const list = await Assignment.find(filter).sort({ day: 1, slot: 1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/assignments
router.post("/", async (req, res) => {
  try {
    const { teacher, department, semester, subject, room, day, slot } = req.body;
    if (!teacher || !department || !semester || !subject || !room || !day || (slot === undefined || slot === null)) {
      return res.status(400).json({ message: "All fields required" });
    }

    const a = new Assignment({ teacher, department, semester, subject, room, day, slot });
    await a.save();
    res.status(201).json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/assignments/:id
router.put("/:id", async (req, res) => {
  try {
    const { teacher, department, semester, subject, room, day, slot } = req.body;
    if (!teacher || !department || !semester || !subject || !room || !day || (slot === undefined || slot === null)) {
      return res.status(400).json({ message: "All fields required" });
    }

    const a = await Assignment.findByIdAndUpdate(req.params.id, { teacher, department, semester, subject, room, day, slot }, { new: true });
    if (!a) return res.status(404).json({ message: "Assignment not found" });
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/assignments/:id
router.delete("/:id", async (req, res) => {
  try {
    const a = await Assignment.findByIdAndDelete(req.params.id);
    if (!a) return res.status(404).json({ message: "Assignment not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;