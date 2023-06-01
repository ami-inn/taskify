import express from 'express'
import { createWorkspace } from '../controllers/userController.js'

const Router=express.Router()


Router.post('/create-workspace',createWorkspace)

export default Router