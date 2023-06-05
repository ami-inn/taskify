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
    spaces: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'Space' 
    }],
    active:{
        type:Boolean,
        default:true
    },
    createdDate: {
        type: Date,
        default: Date.now,
      },

})


const workspaceModel=mongoose.model("Workspace", workspaceSchema)
export default workspaceModel