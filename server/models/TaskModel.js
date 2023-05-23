const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
    name: { type: String, required: true },
    dueDate: { type: Date },
    status: { type: String },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: { type: Date },
    comments: [String],
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
    approvalStatus: { type: String }
})

const TaskModel=mongoose.model("Task", taskSchema)
export default TaskModel