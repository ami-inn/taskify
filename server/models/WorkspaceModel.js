import mongoose from "mongoose"

const workspaceSchema=new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    description: { 
        type: String 
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' ,
        required:true
    },
    admins: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }],
    members: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }],
    projects: [{   // Updated field name from "spaces" to "projects"
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project'  // Updated reference from "Space" to "Project"
    }],
    active:{
        type:Boolean,
        default:true
    },
    createdDate: {
        type: Date,
        default: Date.now,
      },

      chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
      invitationToken: { type: String }

})


const workspaceModel=mongoose.model("Workspace", workspaceSchema)
export default workspaceModel