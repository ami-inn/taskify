import express from 'express'
import { changePassord, createWorkspace, editProfileDetails, showWorkspaces, updateSocial, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)
Router.patch('/edit-profile/:id',editProfileDetails)
Router.patch('/change-password/:id',changePassord)
Router.patch('/update-sociallinks/:id',updateSocial)
Router.get('/workspaces/:id',showWorkspaces)



export default Router