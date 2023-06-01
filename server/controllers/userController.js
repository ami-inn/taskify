import userModel from "../models/UserModel.js"
import workspaceModel from '../models/WorkspaceModel.js'


export async function createWorkspace(req,res){
    try{
        console.log('herr');

        const {name,description,userId}=req.body
        console.log(req.body);

        const user=await userModel.findById(userId)

        if(!user){
            console.log('enterreed not user');
            return res.json({error:true,message:'user not found'})
        }

        const workspace = await workspaceModel.create({
            name,description,owner:user._id
        })
        workspace.admins.push(user._id)
        await workspace.save()

        user.createdWorkspaces.push(workspace._id);
        await user.save();

        return res.json({error:false,message:'successfully created',workspaceId:workspace._id})
    }
    catch(err){
        console.log(err)
    }
}


export async function workspaceValid(req,res){

    try{
        console.log('enterrr');
        const {id}=req.params
        const {userId} = req.query;
         
        console.log(id);
        console.log(userId);



    }
    catch(err){
        console.log(err)
        return res.json({err:false,message:'error'})
    }

}