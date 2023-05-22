// const mongoose=require('mongoose')

// const workspaceSchema=new workspaceModel({
//     name: { 
//         type: String, required: true 
//     },
//     description: { 
//         type: String 
//     },
//     owner: { 
//         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
//     },
//     admins: [{
//          type: mongoose.Schema.Types.ObjectId, ref: 'User' 
//     }],
//     members: [{
//          type: mongoose.Schema.Types.ObjectId, ref: 'User' 
//     }],
//     spaces: [{
//          type: mongoose.Schema.Types.ObjectId, ref: 'Space' 
//     }]
// })


// const workspaceModel=mongoose.model("Workspace", workspaceSchema)
// export default workspaceModel