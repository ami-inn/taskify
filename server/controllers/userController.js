import userModel from "../models/UserModel.js"
import workspaceModel from '../models/WorkspaceModel.js'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import zxcvbn from 'zxcvbn'
import {generatInvitationToken} from '../helpers/generateToken.js'
import sentMail from "../helpers/sentMail.js"
import mongoose from "mongoose"
import ProjectModel from "../models/ProjectModel.js"
import TaskModel from "../models/TaskModel.js"


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
      

        if(!createdWorkspaces && !joinedWorkspaces){
          

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

        console.log('herere',req.body);

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
            return res.json({error:true,message:'user is already a memeber of the worksapce'})
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

export const editUserRole= async(req,res)=>{
    try{

        

        const {role,workspaceId,userId}=req.body

        const workspace=await workspaceModel.findById(workspaceId)

        const adminIndex = workspace.admins.findIndex(adminId => adminId.toString() === userId);
        const memberIndex = workspace.members.findIndex(memberId => memberId.toString() === userId);

  
        

        if(role === 'admin'){
            
            if(adminIndex !== -1){
                return res.json({error:true,message:'user is already an admin'})
            }

            if(memberIndex !== -1){
                const member = workspace.members.splice(memberIndex,1)[0]
                workspace.admins.push(member)

                await userModel.updateOne(
                    { _id: userId, 'workspaces.workspace': workspaceId },
                    { $set: { 'workspaces.$.role': 'admin' } }
                  );
            }else{
                return res.json({error:true,message:'user not found in workspace'})
            }

        }
        else if(role === 'member'){
            if(memberIndex !== -1){
                return res.json({error:true,message:'user already a member in the workspace'})
            }

            if(adminIndex !== -1){
                const admin = workspace.admins.splice(adminIndex,1)[0]
                workspace.members.push(admin)

                await userModel.updateOne(
                    { _id: userId, 'workspaces.workspace': workspaceId },
                    { $set: { 'workspaces.$.role': 'member' } }
                  );


            }else{
                return res.json({error:true,message:'user not found in workspace'})
            }
        }else{
            return res.json({error:true,message:'invalid role specified'})
        }


        await workspace.save()

        return res.json({error:false,message:'updated successfully'})
    }

    catch(err){
        console.log('error');
        res.json({error:true,message:'internal server error'})
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
        const isAdmin=workspace.admins.includes(user._id)
        

        if(isMember||isAdmin){
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


        
       


        // const invitationLink = `http://localhost:3000/invitation?token=${invitationToken}`;

        const invitationLink = `https://taskifi.netlify.app/invitation?token=${invitationToken}`;

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

        const { name, category, members, dueDate, creator, workspace,priority,description} = req.body;

        console.log('entered heredd on project create');
        console.log(req.body,'req.bodeeee');

        const newProject = new ProjectModel({
            name,
            category,
            members,
            dueDate,
            creator,
            priority,
            description
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

export const editProject=async (req,res)=>{
    try{
        const {projectId}=req.params
        console.log('jprojectid',projectId);
        const { name, category, members, dueDate,priority,description,status} = req.body;

        console.log(req.body);

        const project = await ProjectModel.findById(projectId)

    

     

        // Update the project details
        project.name = name;
        project.category = category;
        project.description = description;
        project.members = members;
        project.dueDate = dueDate;
        project.priority = priority;
        project.status = status
    
        // Save the updated project
        await project.save();

        res.json({error:false,message:'edited successfully'})


    }
    catch(err){
        console.log('eror');
        res.json({error:true,message:'internal server error'})
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
            { path: 'tasks', model: 'Task' }, 
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

export const deleteProject = async (req,res)=>{
    try{
        console.log('here delete project');
        const {projectId}=req.params
        const {userId}=req.body
        
        const project = await ProjectModel.findById(projectId)

        if(!project){
            console.log('not enterr 1');
            return res.json({error:true,message:'project not found'})
        }

        if(project.creator.toString() !== userId){
            return res.json({error:true,message:'you are not the creator of this project'})
        }

        if (project.tasks.length > 0) {
            return res.json({ error: true, message: 'Cannot delete project with associated tasks' });
          }

        console.log('sucees');

        await ProjectModel.deleteOne({ _id: projectId });
        await workspaceModel.updateMany(
            { projects: projectId }, // Filter to find workspaces with the project
            { $pull: { projects: projectId } } // Remove the project from the projects array
          );

        res.json({error:false,message:'project deleted '})

    }
    catch(err){
        console.log(err)
        res.json({error:true,message:'internal server error'})
    }
}

export const fetchProjectDetails  = async (req,res)=>{
    try{

        console.log('enterr herere');
        const projectId = req.params.id

        const project = await ProjectModel.findById(projectId).populate('members')

        if(!project){
            return res.json({error:true,message:'no such workspace found'})
        }

        console.log('projecttt with task',project);

        res.json({error:false,message:'get the project',project})

    }
    catch(err){
        return res.json({error:true,message:'internal server error'})
        console.log(err)
    }
}

export const createTask=async (req,res)=>{
    try{

        const {name,description,dueDate,assigneeId,creatorId,subtasks,projectId,priority}=req.body

        console.log('reqboddddy',req.body);

        const project = await ProjectModel.findById(projectId)

        console.log(project);

        const projectDueDate = project.dueDate
        console.log(projectDueDate);

        if(dueDate<=projectDueDate){
            return res.json({error:true,message:''})
        }

        const task=new TaskModel({
            name,description,dueDate,assigneeId,creatorId,subtasks:req.body.subtasks.map((subtask)=>({name:subtask,completed:false})),priority
        })

        await task.save()

        await ProjectModel.findByIdAndUpdate(projectId,{$push:{tasks:task._id}})

        await userModel.findByIdAndUpdate(assigneeId,{$push:{assignedTasks:task._id}})

        await userModel.findByIdAndUpdate(creatorId,{$push:{createdTasks:task._id}})

        res.json({error:false,message:'created successfully'})
    }
    catch(err){
        console.log(err);
        res.json({error:true,message:'internal server error'})
    }
}

export const fetchProjectTask=async (req,res)=>{
    try{
        const {id}=req.params
        console.log('project idddd',id);

        const project = await ProjectModel.findById(id).populate({
            path:'tasks',
            populate:[
                {path:'assigneeId',model:'User'},
                {path:'creatorId',model:'User'},
                { path: 'comments.postedBy', model: 'User' },

            ]
        }).populate('members');


        if(!project){
            return res.json({error:true,message:'project not found'})
        }

        console.log('its th project',project);

        return res.json({error:false,message:'project deletecte',project})

    }
    catch(err){
        console.log(err)
        return res.json({error:true,message:'internal server error'})
    }
}

export const postTaskComment =async (req,res)=>{
    try{
        console.log('etner haseere');

        const {taskId}=req.params
        console.log('taskId',taskId);
        const {content,postedBy}=req.body

        console.log('here',req.body);

        const task= await TaskModel.findById(taskId)

        if(!task){
            return res.json({error:true,message:'task not found'})
        }

        const newComment = {content,postedBy,postedAt: Date.now()}
        task.comments.push(newComment)

        await task.save()

        return res.json({error:false,message:'post comment'})

    }
    catch(err){
        console.log(err);
        return res.json({error:true,message:'internal server error'})
    }
}

export const deleteComment= async (req,res)=>{
    try{
         
        console.log('enter herere');
        const taskId=req.params.taskId
        console.log(taskId);
        const commentId=req.params.commentId
        console.log(commentId);

        const task= await TaskModel.findById(taskId)

        // console.log(task);

        const commentIndex = task.comments.findIndex(
            (comment) => comment._id.toString() === commentId
          );
          console.log('commenidndex',commentIndex);

          if(commentIndex===-1){
            console.log('entee');
            return res.json({error:true,message:'comment not found'})
          }

          task.comments.splice(commentIndex,1)

          await task.save()

          res.json({error:false,message:'deleted the comment'})
    }
    catch(err){
        console.log('errorrr');
    }
}

export const deleteTask=async(req,res)=>{
    try{
        const {taskId}=req.params
        const {projectId}=req.body
         
        console.log(taskId,'taskId');
        console.log(projectId,'projectId')

        const task = await TaskModel.findById(taskId)

        if(!task){
            return res.json({error:true,message:'Task not Found'})
        }

       const user= await userModel.findByIdAndUpdate(task.creatorId,{$pull:{createdTasks:taskId}})

       if(!user){
        console.log('no user found');
       }
        
        if(task.assigneeId){
            console.log('enter to assignee ');
            await userModel.findByIdAndUpdate(task.assigneeId,{$pull:{assignedTasks:taskId}})
        }

        await TaskModel.deleteOne({_id:taskId})

        await ProjectModel.findByIdAndUpdate(projectId,{$pull:{tasks:taskId}},{new:true})

        res.json({error:false,message:'task delete successfully'})

    }
    catch(err){
        console.log('error');
        res.json({error:true,message:'internal server error'})
    }
}
export const taskApprove=async (req,res)=>{
    try{

        const {taskId}=req.params
        const {approvalStatus}=req.body
console.log('reqbodeee',req.body);
        console.log(approvalStatus);

        const task=await TaskModel.findById(taskId)

        if(!task){
            console.log('error 1');
            return res.json({error:true,message:'task not found'})
        }



        if(approvalStatus){

               // Update the task status and approval status
    task.status = 'Completed';
    task.approvalStatus = true;

    // Save the updated task
    await task.save();

        }

        res.json({error:false,message:'updated successfully'})



    }
    catch(err){
        console.log(err);
        res.json({error:true,message:'internal server error'})
    }
}

export const fetchAssignedTasks = async (req,res)=>{

    try{
        const { userId, workspaceId } = req.query;

        const workspace=await workspaceModel.findById(workspaceId).populate({
            path:'projects',
            populate:{
                path:'tasks',
                match:{assigneeId:userId},
            },
        })


        const assignedTasks =[]

        workspace.projects.forEach((project) => {
            assignedTasks.push(...project.tasks);
          });
          
          console.log('assigned tasks',assignedTasks);

          res.json({error:false,tasks:assignedTasks})

    }
    catch(err){
        console.log(err);
        res.json({error:true,message:'internal server error'})
    }
}

export const updateTask=async(req,res)=>{


    try{

        const {tasks} = req.body


        

        console.log('fdjfkjd',req.body);

        // const updatedTasks = await Promise.all(tasks.map(async (task) => {
        //     const updatedTask = await TaskModel.findByIdAndUpdate(task._id, { completed: task.completed }, { new: true });
        //     return updatedTask;
        //   }));

        
    const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const updatedTask = await TaskModel.findByIdAndUpdate(
            task._id,
            {
              completed: task.completed,
              'subtasks.$[].completed': task.completed,
              completedAt:Date.now(),
              status:task.status,
              completedBy:task.assigneeId

            },
            { new: true }
          );
          return updatedTask;
        })
      );


          res.json({error:false,message:'task updated',tasks:updatedTasks})
    }

    catch(err){
        console.log('error');
        res.json({error:true,message:'internal  server error'})
    }
}


export const fetchUser=async(req,res)=>{

    try{

        const {userId}=req.params

        const user=await userModel.findById(userId)

        console.log('user',user);

        res.json({error:false,message:'user Found',user})

    }
    catch(err){
        console.log('error');
        res.json({error:true,message:'internal  server error'})
    }
}

export const fetchDesk= async(req,res)=>{
    try{

        const { workspaceId, userId } = req.query;

        console.log('reqbodeee',workspaceId,userId);

        const workspace = await workspaceModel.findById(workspaceId)
        .populate({
          path: 'projects',
          populate: {
            path: 'tasks',
            // match: { completedBy: userId },
          },
        })
        .populate({
            path: 'projects',
            populate: {
              path: 'members',
            },
          })
          .populate({
            path: 'projects',
            populate: {
              path: 'creator',
            },
          })
        .exec();

        console.log('workspaceeee');

   

          console.log('desk',workspace);


          res.json({error:false,workspace})

          

    }

    catch(err){
        console.log('err');
        res.json({error:false,message:'internal server error'})
    }
}

export const fetchCalendarTasks= async(req,res)=>{

    try{

        console.log('entered heree');

        const { workspaceId, userId } = req.query;

        const workspace = await workspaceModel.findById(workspaceId).exec();

        // console.log('workspace',workspace);
    
        const projectIds = workspace.projects;

        // console.log('projectIds',projectIds);
    
        const projects = await ProjectModel.find({ _id: { $in: projectIds } }).exec();

        const Dueprojects = await ProjectModel.find({ _id: { $in: projectIds }, status: 'pending' }).exec();
    
        // console.log('projects',projects);

        const taskIds = projects.reduce(
          (acc, project) => acc.concat(project.tasks),
          []
        );

        console.log('due projectsss',Dueprojects);

        // console.log('tasksId',taskIds);
    
        // const tasks = await TaskModel.find({
        //   _id: { $in: taskIds },
        //   assigneeId: userId,
        // }).exec();
    
        const [tasks, completedTasks,allDueTasks,allCompletedTasks] = await Promise.all([
            TaskModel.find({ _id: { $in: taskIds }, assigneeId: userId, status:'assigned' }).exec(),
            TaskModel.find({ _id: { $in: taskIds }, completedBy: userId,status:'Completed' }).exec(),
            TaskModel.find({ _id: { $in: taskIds }, status: { $in: ['pending', 'assigned'] } }).exec(),
            TaskModel.find({ _id: { $in: taskIds }, status: 'Completed' }).exec(),
          ]);
      
          console.log('tasks:', tasks);
          console.log('completedTasks:', completedTasks);
          console.log('alldueTaksskskks',allDueTasks);
      
          res.json({ error: false, tasks,completedTasks,allDueTasks,allCompletedTasks});

       

    }
    catch(err){
        res.json({error:true,message:'internal server errro'})
    }

}

export const fetchNotes= async(req,res)=>{

    try{

        const { userId, workspaceId } = req.query;

        console.log('enter the fetch note');

        console.log(workspaceId,userId);

        const workspace = await workspaceModel.findOne({_id: workspaceId});

        if (!workspace) {
            // If no workspace is found, return an empty array of notes
            return res.json({error:true,message:'workspace not found', notes: [] });
          }

          const notes = workspace.notes.filter(note => note.createdBy.toString() === userId);

          console.log(notes,'notes');

          return res.json({error:false,message:'successfully get the note',notes})


    }

    catch(err){
        console.log(err);
        return res.json({erro:true,message:'internal server error'})
    }


}

export const createNotes=async (req,res)=>{
    try{

        console.log('enter hereee');

        const { workspaceId } = req.params;
    const { title, content, createdBy } = req.body;

    // Create a new note object
    const note = {
      title,
      content,
      createdBy,
      createdDate: new Date(),
    };

    const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
        workspaceId,
        { $push: { notes: note } },
        { new: true }
      );
  
      if (!updatedWorkspace) {
        return res.json({ error: 'Workspace not found' });
      }
  
      res.json({error:false,message:'created successfully', note });

    }
    catch(err){
        return res.json({error:true,message:'internal server error'})
    }
}

export const deleteNotes=async (req,res)=>{

    try{

        const {workspaceId,noteId}=req.params

        console.log('enter to delete note',workspaceId,noteId);

        const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
            workspaceId,
            { $pull: { notes: { _id: noteId } } },
            { new: true }
          );

          if(!updatedWorkspace){
            return res.json({error:true,message:'workspace not found'})
          }

          res.json({error:false,message:'deleted successfully'})

    }
    catch(err){
        return res.json({error:true,message:'internal server error'});
    }
}