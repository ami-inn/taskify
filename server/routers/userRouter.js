import express from 'express'
import { changePassord, createWorkspace, editProfileDetails, inviteUserToWorkspace, showWorkspaces, updateSocial, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)
Router.patch('/edit-profile/:id',editProfileDetails)
Router.patch('/change-password/:id',changePassord)
Router.patch('/update-sociallinks/:id',updateSocial)
Router.get('/workspaces/:id',showWorkspaces)
Router.post('/inviteUsers',inviteUserToWorkspace)



export default Router