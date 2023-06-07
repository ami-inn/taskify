import userModel from "../models/UserModel.js"
import workspaceModel from '../models/WorkspaceModel.js'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import zxcvbn from 'zxcvbn'
import {generatInvitationToken} from '../helpers/generateToken.js'
import sentMail from "../helpers/sentMail.js"


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

        const user=await userModel.findById(userId)
        console.log(user);

        if(!user){
            console.log('1');
            return res.json({err:true,message:'user not found'})
        }

        const workspaceExists = user.createdWorkspaces.includes(id)

        if(!workspaceExists){
            console.log('2');
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

        const workspace=await workspaceModel.find({owner:id,active: true}).exec()

        console.log(workspace);
        if(!workspace){
            return res.json({error:true,message:'no workspace found'})
        }
        res.json({error:false,message:'workspace founded',workspace})

    }
    catch(err){
         res.json({error:true,message:'some error found'})
    }
}








// for email invitation

export async function acceptInvitation(req,res){
    try{
        const{token,role,responce}=req.body

        const user = await userModel.findOne({invitationToken:token})

        if(!user){
            return res.json({message:'invalid invitation token'})
        }
        const workspace = await workspaceModel.findOne({invitationToken:token})

        if(!workspace){
            return res.json({message:'invalid invitation token'})
        }

        workspace.members.push(user._id)

        await workspace.save()

        user.workspaces.push({workspace:workspace._id,role})
        user.invitationToken=null
        await user.save()
        return res.json({error:false,message:'invitation accepted successfully'})
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
            return res.json({message:'user not found'})
        }

        const workspace = await workspaceModel.findById(workspaceId)

        if(!workspace){
            return res.json({error:true,message:'worksapce not found'})
        }
        const isMember=workspace.members.includes(user._id)

        if(isMember){
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
       


        const invitationLink = `http://localhost:3000/invitation?token=${invitationToken}`;

        let sentEmail=await sentMail(email,`you have an email req to join ${workspace.name} as ${role}  you can accept or reject it click the below link ${invitationLink}`,'team invitation link ')

        return res.json({error:false,message:'invitation sent successfully'})

    }
    catch(err){
        console.log(err)
        return res.json({error:true,message:'internal server error'})
    }
}