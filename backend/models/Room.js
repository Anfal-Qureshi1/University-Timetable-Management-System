const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true } // e.g., "Theory" or "Lab"
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);