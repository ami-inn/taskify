import express from 'express'
import { blockUser, editWorkspaces, getUsers, unblockUser, workspaces } from '../controllers/adminController.js'
import workspaceModel from '../models/WorkspaceModel.js'

const Router=express.Router()

Router.get("/users", getUsers)
Router.patch('/user/block',blockUser)
Router.patch('/user/unblock',unblockUser)
Router.get('/workspaces',workspaces);
Router.put('/workspace-edit/:id',editWorkspaces)



export default Router