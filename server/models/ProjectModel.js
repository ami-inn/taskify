import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdDate: { type: Date, default: Date.now },
  category: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status:{type:String, default:'pending'},
  description:{type:String},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dueDate: { type: Date } , // User who created the project
  priority: { type: String, enum: ['low', 'medium', 'high'] }
});

const ProjectModel = mongoose.model("Project", projectSchema);
export default ProjectModel;
