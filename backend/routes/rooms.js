const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// GET /api/rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ name: 1 });
    res.json(rooms);
  } catch (err) {
    console.error("GET /api/rooms error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/rooms
router.post("/", async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !name.trim() || !type || !type.trim()) {
      return res.status(400).json({ message: "Name and type required" });
    }

    const exists = await Room.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ message: "Room already exists" });

    const r = new Room({ name: name.trim(), type: type.trim() });
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    console.error("POST /api/rooms error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/rooms/:id
router.put("/:id", async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !name.trim() || !type || !type.trim()) {
      return res.status(400).json({ message: "Name and type required" });
    }

    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), type: type.trim() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Room not found" });
    res.json(updated);
  } catch (err) {
    console.error("PUT /api/rooms/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/rooms/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/rooms/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;