const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  topic: { type: String, default: "", trim: true },
  difficulty: { type: String, default: "Easy", trim: true },
  isCompleted: { type: Boolean, default: false },
  userId: { type: String, required: true },
  youtubeLink: { type: String, default: "" },
  articleLink: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
