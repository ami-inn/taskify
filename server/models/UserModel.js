// const mongoose= require('mongoose')


// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     assignedTasks: [{
//          type: mongoose.Schema.Types.ObjectId, ref: 'Task'
//      }],
//     createdTasks: [{
//          type: mongoose.Schema.Types.ObjectId, ref: 'Task'
//      }],
//     roles: [
//         String
//     ],
//     workspaces: [{
//      type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' 
//     }]
// })

// const userModel=mongoose.model("User", userSchema)
// export default userModel