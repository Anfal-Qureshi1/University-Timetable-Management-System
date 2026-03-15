const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  teacher: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  room: { type: String, required: true },
  day: { type: String, required: true },   // e.g., "Monday"
  slot: { type: Number, required: true }   // slot number
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);