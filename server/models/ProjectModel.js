import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Task'   
    }]
})

const ProjectModel = mongoose.model("Project", projectSchema)
export default ProjectModel
