import userModel from "../models/UserModel.js"
import workspaceModel from '../models/WorkspaceModel.js'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import zxcvbn from 'zxcvbn'


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