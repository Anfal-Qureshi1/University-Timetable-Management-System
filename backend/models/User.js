const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain text for now (see notes)
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);