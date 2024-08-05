import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  dueDate: { type: Date },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "TaskList" },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
