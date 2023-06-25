import express from 'express'
import { createChat, findChat, userChats } from '../controllers/chatController.js'


const router = express.Router()

router.post('/workspace/:workspaceId/chat',createChat)
router.get('/worksapce/:workspaceId/user/:userId/chats',userChats)
router.get('/workspace/:workspaceId/chat/:firstId/:secondId',findChat)


export default router