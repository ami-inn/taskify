import express from 'express'
import { blockUser, getUsers, unblockUser } from '../controllers/adminController.js'

const Router=express.Router()

Router.get("/users", getUsers)
Router.patch('/user/block',blockUser)
Router.patch('/user/unblock',unblockUser)



export default Router