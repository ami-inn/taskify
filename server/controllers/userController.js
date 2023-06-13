import userModel from "../models/UserModel.js"
import workspaceModel from '../models/WorkspaceModel.js'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import zxcvbn from 'zxcvbn'
import {generatInvitationToken} from '../helpers/generateToken.js'
import sentMail from "../helpers/sentMail.js"
import mongoose from "mongoose"
import ProjectModel from "../models/ProjectModel.js"


var salt = bcrypt.genSaltSync(10)


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
        const invitationToken=generatInvitationToken()
        console.log(invitationToken);

        const workspace = await workspaceModel.create({
            name,description,owner:user._id,invitationToken
        })
        workspace.admins.push(user._id)
        await workspace.save()

        user.createdWorkspaces.push(workspace._id);
        await user.save();

        return res.json({error:false,message:'successfully created',workspaceId:workspace._id,workspace})
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

        const user=await userModel.findById(userId)
        console.log(user);

        if(!user){
            console.log('1');
            return res.json({err:true,message:'user not found'})
        }

        const createdWorkspaces = user.createdWorkspaces.includes(id)
        const joinedWorkspaces = user.workspaces.some((workspace) => workspace.workspace.toString() === id);
        console.log('here we go','64804ebf1b852bb92da43a5a',id);
        console.log('joined workspace',joinedWorkspaces);

        if(!createdWorkspaces && !joinedWorkspaces){
            console.log('err 2');

            return res.json({err:true,message:'workspace not found'})
        }

        const workspace = await workspaceModel.findById(id)

        if(!workspace){
            console.log('3');
            return res.json({err:true,message:'workspace not found'})
        }

        return res.json({ error: false, message: 'Workspace found', workspace });



    }
    catch(err){
        console.log(err)
        return res.json({err:false,message:'error'})
    }

}

export async function workspaceDetails(req,res){

    try{
        console.log('its heeeerere');
        const workspace = await workspaceModel.findById(req.params.id)
      .populate('admins') // Populate admins with user details excluding the password field
      .populate('members');
    

        console.log('workspace',workspace);
        // res.json({err:false,message:'seucess'})
        res.json({err:false,message:'success',workspace})
        
        

    }
    catch(err){
        console.log(err)

    }

}

export async function editProfileDetails(req,res){
    try{
        console.log('enterrr');
        const{image,name,phone,about,skills,jobtype}=req.body
        console.log(req.body);
        const id=req.params.id

        if(image){
            console.log('imndnfj');
        
            const data=await cloudinary.uploader.upload(image,{
                folder:'taskify'
            })
            const  updates={
                profile:data,
                name,
                about,
                skills,
                jobtype,
                phone
            }
            const updateUser = await userModel.findByIdAndUpdate(id,updates,{new:true})
            console.log(updateUser);
            res.json({data:updateUser,message:'updated',error:false})
        }else{

            console.log('giuogffiudsahdiaih');

           
            console.log(id);
            const  updates={
                name,
                about,
                skills,
                jobtype,
                phone
            }
            try{
                const updateUser = await userModel.findByIdAndUpdate(id,updates,{new:true})
                console.log(updateUser);
                res.json({data:updateUser,message:'updated',error:false})

            }
            catch(err){
                console.log(err);
                res.json({error:true,message:'failed to update user'})
            }
            
        }

    }
    catch(err){
        console.log(err)
        res.json({err:true,err,message:'something went wrong'})
        }
}

export async function changePassord(req,res){
    try{
        console.log('hereerrerr')
        const {oldPassword,newPassword}=req.body

        const id=req.params.id

        const user=await userModel.findById(id)

        console.log(user)
      


        const isOldPasswordCorrect = await bcrypt.compare(oldPassword,user.password);
        if (!isOldPasswordCorrect) {
           return res.json({error:true,message:'old password is not correct'})
        }

        const result = zxcvbn(newPassword)
        const strengthScore=result.score

        if(strengthScore <3){
            console.log('pawrd werak');
            return res.json({error:true,message:'password is weak'})
        }

        const hashPassword=await bcrypt.hash(newPassword,10)

        user.password = hashPassword
        await user.save()

        res.json({error:false,message:'updated successfully password'})

    }

    catch(err){
        console.log(err)
    }
}

export async function updateSocial(req,res){
    const {instagram,twitter,facebook}=req.body

    try{

        const id=req.params.id

        const user=await userModel.findById(id)

        if(user){
            user.instagram=instagram||user.instagram
            user.twitter=twitter||user.twitter
            user.facebook=facebook||user.facebook

            await user.save()

            res.json({error:false,message:'links updated'})
        }else{
            res.json({error:true,message:"user not found"})
        }

    }
    catch(err){
        console.log(err)
        res.json({error:true,message:'uncaught error'})
    }
}

export async function showWorkspaces(req,res){
    try{
        console.log('workspacees');
        const id=req.params.id

        const user = await userModel.findById(id)
        .populate('createdWorkspaces')
        .populate({path:'workspaces.workspace'})
        .exec();

        console.log('user',user);

        if (!user) {
            return res.json({ error: true, message: 'User not found' });
          }
          const createdWorkspaces = user.createdWorkspaces;
    const joinedWorkspaces = user.workspaces.map(({ workspace }) => workspace);

    console.log('created',createdWorkspaces);
    console.log('joined workspaces',joinedWorkspaces);
        res.json({error:false,message:'workspace founded',createdWorkspaces,joinedWorkspaces})

    }
    catch(err){
         res.json({error:true,message:'some error found'})
    }
}








// for email invitation

export async function acceptInvitation(req,res){
    const{token,accepted}=req.body
    try{

        console.log('herere');

        const user = await userModel.findOne({ 'invitations.invitationToken': token });

            // Find the invitation by the invitation token
    // const user = await userModel.findOneAndUpdate(
    //     { 'invitations.invitationToken': token },
    //     { $pull: { invitations: { invitationToken: token } } },
    //     { new: true }
    //   );
  

        if(!user){
            console.log('error 1');
            return res.json({error:true,message:'invitation not found'})
        }
        console.log(user);
        const invitation = user.invitations.find((invite) => invite.invitationToken === token);
        
        console.log('invitationnnnn',invitation);

        
        if(!invitation){
            console.log('error 2');
            return res.json({error:true,message:'invitation not found'})
        }

        const workspace = await workspaceModel.findById(invitation.workspace)

        if(!workspace){
            console.log('error 3');
            return res.json({error:true,message:'workspace not found'})
        }

        const isMember=workspace.members.includes(user._id)
        if(isMember){
            console.log('error 4');
            return res.json({message:'user is already a memeber of the worksapce'})
        }

        if(accepted){
            console.log('enterreddd');

            if(invitation.role === 'admin'){
                workspace.admins.push(user._id)
            }else{
                workspace.members.push(user._id)
            }

          
            await workspace.save()

            const workspaceInfo= {
                workspace:workspace._id,
                role:invitation.role
            }
            user.workspaces.push(workspaceInfo)
            await user.save()
        }else{
        console.log('enter else');
        }
        // Remove the invitation from the user's invitations array
    user.invitations = user.invitations.filter((invite) => invite.invitationToken !== token);
    await user.save();

    return res.json({error:false,message:'invitation handled successfully',workspace})

    }
    catch(err){
        console.log(err);
        return res.json({error:true,message:'internal server error'})
    }
}

export const inviteUserToWorkspace=async (req,res)=>{
    const {email,workspaceId,role}=req.body

    try{

        console.log('enterrrrrrrrr');

        const user = await userModel.findOne({email})

        if(!user){
            console.log('error 1');
            return res.json({error:true,message:'user not found'})
        }

        const workspace = await workspaceModel.findById(workspaceId)

        if(!workspace){
            console.log('error 2');
            return res.json({error:true,message:'worksapce not found'})
        }
        const isMember=workspace.members.includes(user._id)

        if(isMember){
            console.log('isError');
            return res.json({error:true,message:'user already exists'})
        }

        const invitationToken = generatInvitationToken();

      

        const invitation={
            workspace:workspace._id,
            invitationToken,
            role
        }

        user.invitations.push(invitation)

        await user.save()

        console.log('finished',user);


        
       


        const invitationLink = `http://localhost:3000/invitation?token=${invitationToken}`;

        let sentEmail=await sentMail(email,`you have an email req to join ${workspace.name} as ${role}  you can accept or reject it click the below link ${invitationLink}`,'team invitation link ')

        return res.json({error:false,message:'invitation sent successfully'})

    }
    catch(err){
        console.log(err)
        return res.json({error:true,message:'internal server error'})
    }
}

export const deleteMembers=async(req,res)=>{

    try{

        const{workspaceId,memberId}=req.params
        
        console.log(req.params);
         const workspace = await workspaceModel.findById(workspaceId)
         
         console.log('workspace',workspace);

         //pulling the workspace members from that specific user

        //  the re is new the new code

        const isOwner = workspace.owner.equals(memberId);
        console.log('owner',workspace.owner._id,memberId);
        console.log(isOwner);

        if(isOwner===true){
            return res.json({error:true,message:'you cant delete the owner'})
        }

        const isAdmin = workspace.admins.includes(memberId)

        if(isAdmin){
            console.log('admin deletre');
            workspace.admins.pull(memberId)
            // workspace.admins = workspace.admins.filter((adminId) => adminId !== memberId);
            console.log(workspace.admins);
        }else{
            workspace.members.pull(memberId)
        }

         
         await workspace.save()


        //  finding the user and remove the workspace id from that specific user
        const user =await userModel.findById(memberId)

        if(!user){
            res.json({error:true,message:'user not found'})
        }

        user.workspaces=user.workspaces.filter((w)=>{
            w.workspace.toString()!== workspaceId
        })

        console.log(user);
        await user.save()
        res.json({ error:false, message: 'Member deleted successfully' });

    }
    catch(err){
        console.log(err)
        res.json({error:true,message:'internal server error'})
    }


}

export const createProject=async (req,res)=>{
    try{

        const { name, category, members, dueDate, creator, workspace,priority} = req.body;

        console.log('entered heredd on project create');
        console.log(req.body,'req.bodeeee');

        const newProject = new ProjectModel({
            name,
            category,
            members,
            dueDate,
            creator,
            priority
          });

          await newProject.save();

          const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
            workspace,
            {
              $push: { projects: newProject._id },
            },
            { new: true }
          );

        res.json({error:false,message:'updated successfully'})

    }
    catch(err){
        console.log(err);
        return res.json({error:true,message:'internal server error',project:newProject,workspace})
    }
}


export const fetchWorkspaceProjects=async (req,res)=>{
    try{
        const { workspaceId } = req.params;

        // Fetch the workspace with the provided workspaceId'
        console.log('heree to fetch workspaceeeee');
        const workspace = await workspaceModel
        .findById(workspaceId)
        .populate({
          path: 'projects',
          populate: [
            { path: 'members', model: 'User' },
            { path: 'creator', model: 'User' },
          ],
        });
          console.log('workspace',workspace);
    
        res.json({ error:false, workspace });

    }
    catch(err){
        console.log(err)
        res.json({error:true})
    }
}