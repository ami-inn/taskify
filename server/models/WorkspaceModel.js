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

      chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
      }],
      notes: [{
        title: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        createdDate: {
          type: Date,
          default: Date.now
        }
      }],
      
      invitationToken: { type: String }

})


const workspaceModel=mongoose.model("Workspace", workspaceSchema)
export default workspaceModel