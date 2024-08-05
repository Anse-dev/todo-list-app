import mongoose from "mongoose";

const taskListSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true });

export default mongoose.models.TaskList || mongoose.model("TaskList", taskListSchema);
