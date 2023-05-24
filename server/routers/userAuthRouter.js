import express from 'express'
import { userLogin, userSignup, userVerifySignup } from '../controllers/userAuthController.js'

const router=express.Router()


router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/signup/verify',userVerifySignup)


export default router