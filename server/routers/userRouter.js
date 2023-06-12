import express from 'express'
import { acceptInvitation, changePassord, createProject, createWorkspace, deleteMembers, editProfileDetails, inviteUserToWorkspace, showWorkspaces, updateSocial, workspaceDetails, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)
Router.patch('/edit-profile/:id',editProfileDetails)
Router.patch('/change-password/:id',changePassord)
Router.patch('/update-sociallinks/:id',updateSocial)
Router.get('/workspaces/:id',showWorkspaces)
Router.post('/inviteUsers',inviteUserToWorkspace)
Router.post('/invitation/response',acceptInvitation)
Router.get('/workspace-details/:id',workspaceDetails)
Router.delete('/workspace/:workspaceId/members/:memberId',deleteMembers)
Router.post('/create-project',createProject)



export default Router