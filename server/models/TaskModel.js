const mongoose = require('mongoose');

const taskSchema=new mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String},
    dueDate: { type: Date },
    status: { type: String },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: { type: Date },
    comments: [
        {
          content: { type: String },
          postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
      ],
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
    approvalStatus: { type: Boolean,default:false },

    subtasks: [
      {
        name: { type: String, required: true },
        completed: { type: Boolean, default: false },
      },
    ],
    attachments: [
      {
      type:Object
      },
    ],

})

const TaskModel=mongoose.model("Task", taskSchema)
export default TaskModel