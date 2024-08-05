import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    taskLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskList" }],
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
