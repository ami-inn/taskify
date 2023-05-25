import express from 'express'
import { checkUserLoggedIn, resetUserPassword, userForgot, userLogin, userLogout, userSignup, userVerifySignup, verifyForgotOtp } from '../controllers/userAuthController.js'



const router=express.Router()


router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/signup/verify',userVerifySignup)
router.get('/logout',userLogout)

router.post('/forgot',userForgot)
router.post('/forgot/verify',verifyForgotOtp)
router.post('/forgot/reset',resetUserPassword)
router.get('/check',checkUserLoggedIn)



export default router