import express from 'express'
import { createWorkspace, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)

export default Router