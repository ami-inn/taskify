import mongoose from "mongoose"

const listSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Task' 
    
    
    }]
})

const ListModel=mongoose.model("List", listSchema)
export default ListModel