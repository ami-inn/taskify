import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    assignedTasks: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Task'
     }],
    createdTasks: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Task'
     }],
    roles: [
        String
    ],
    createdWorkspaces: [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' 
    }],
    workspaces: [{
        workspace: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Workspace',
        },
        role: String, 
      }],
    block:{
        type:Boolean,
        default:false
    }
})

const userModel=mongoose.model("User", userSchema)
export default userModel