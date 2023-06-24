import express from 'express'
import { acceptInvitation, changePassord, createProject, createTask, createWorkspace, deleteComment, deleteMembers, deleteProject, deleteTask, editProfileDetails, editProject, editUserRole, fetchAssignedTasks, fetchProjectDetails, fetchProjectTask, fetchWorkspaceProjects, inviteUserToWorkspace, postTaskComment, showWorkspaces, updateSocial, updateTask, workspaceDetails, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)
Router.patch('/edit-profile/:id',editProfileDetails)
Router.patch('/change-password/:id',changePassord)
Router.patch('/update-sociallinks/:id',updateSocial)
Router.get('/workspaces/:id',showWorkspaces)
Router.post('/inviteUsers',inviteUserToWorkspace)
Router.post('/invitation/response',acceptInvitation)
Router.put('/edituser-role',editUserRole)
Router.get('/workspace-details/:id',workspaceDetails)
Router.delete('/workspace/:workspaceId/members/:memberId',deleteMembers)
Router.post('/create-project',createProject)
Router.put('/edit-project/:projectId',editProject)
Router.get('/workspace-projects/:workspaceId',fetchWorkspaceProjects)
Router.delete('/projects/:projectId',deleteProject)
Router.get('/project/:id',fetchProjectDetails)
Router.post('/create-task',createTask)
Router.get('/projectTask/:id',fetchProjectTask)
Router.post('/task/:taskId/comments',postTaskComment)
Router.delete('/tasks/:taskId/comments/:commentId',deleteComment)
Router.delete('/tasks/:taskId',deleteTask)
Router.get('/assigned-tasks',fetchAssignedTasks)
Router.put('/update-task',updateTask)


export default Router