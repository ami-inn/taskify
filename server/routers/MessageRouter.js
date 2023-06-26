import express from 'express';
import { addMessage, getMessages } from '../controllers/MessageController.js';

const router = express.Router()

router.post('/workspace/:workspaceId', addMessage);
router.get('/chat/:chatId', getMessages);


export default router