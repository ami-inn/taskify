const mongoose=require('mongoose')

const spaceSchema=new mongoose.Schema({
    name: { type: String, required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
})

const spaceModel=mongoose.model("Space", spaceSchema)
export default spaceModel