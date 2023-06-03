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
    },
    profile:{

      type:Object,
      default:{
        url:"https://t3.ftcdn.net/jpg/05/14/18/46/360_F_514184651_W5rVCabKKRH6H3mVb62jYWfuXio8c8si.jpg"

      }

  
           },
    jobtype:{
        type:String,
        default:'not set'
    },
    about:{
        type:String,
        default:'not set'
    },
    skills: {
        type: [
          {
            type: String,
            maxlength: 50,
          },
        ],
    },
    instagram: {
        type: String,
        trim: true,
        maxlength: 100,
        default:'no instagram link set'
      },
    
      twitter: {
        type: String,
        trim: true,
        maxlength: 100,
        default:'no twitter link set'
      },
    
      facebook: {
        type: String,
        trim: true,
        maxlength: 100,
        default:'no facebook link set'
      },

    
})

const userModel=mongoose.model("User", userSchema)
export default userModel