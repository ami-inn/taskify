import usermodel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sentOtp from '../helpers/sentOtp.js'
import crypto from 'crypto'
import { log } from 'console'
import userModel from '../models/UserModel.js'
import zxcvbn from 'zxcvbn'
import { decode } from 'punycode'



var salt = bcrypt.genSaltSync(10)

export async function userSignup(req,res){
    try{
        console.log('enterrr');
        const {email,password}=req.body

        const user=await usermodel.findOne({email})

        if(user){
            return res.json({error:true,message:'user already exists'})
        }
        const result = zxcvbn(password)
        const strengthScore=result.score

        if(strengthScore < 3){
            return res.json({error:true,message:'password is weak'})
        }

        let otp=Math.ceil(Math.random()*1000000)
        console.log(otp);

        let otpSent=await sentOtp(email,otp)


        // const mergedName = name + ' ' + lastname; 
        

        // const newUser=new usermodel({name:mergedName,email,phone:phoneNumber,password:hashPassword})

        // await newUser.save()

        // console.log(newUser);

        const token=jwt.sign({
            otp:otp
        },'myJwtsecretKey')

        return res.cookie('tempToken', token,{
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({error: false});

    }
    catch(err){
        console.log(err)
        res.status(510).json({ message: err });
    }
}
export async function userVerifySignup(req,res){
    try{
        console.log('enterrrrheree');
        const {name, email, password,lastname,phoneNumber,otp}=req.body
        console.log('req.body',req.body);
        const tempToken=req.cookies.tempToken
        console.log('temptoken',tempToken);

  

        if(!tempToken){
            console.log('error 1');
            return res.json({err:true,message:'otp session is time out'})
        }
        const verifiedTempToken=jwt.verify(tempToken,'myJwtsecretKey')
        console.log(verifiedTempToken);

        if(otp!=verifiedTempToken.otp){
            console.log('error 2');
            return res.json({ err: true, message: "Invalid OTP" });

        }
        console.log('herre');
        const hashPassword=bcrypt.hashSync(password,salt)
           const mergedName = name + ' ' + lastname; 
        

        const newUser=new usermodel({name:mergedName,email,phone:phoneNumber,password:hashPassword})

        await newUser.save()

        console.log(newUser);
        const token = jwt.sign(
            {
                id: newUser._id
            },'myJwtsecretKey'
            
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false })
    }
    catch(err){
        console.log(err);

    }
}


export async function userLogin(req,res){
    try{
        const {email,password} = req.body
        const user=await usermodel.findOne({email})
        if(!user){
            return res.json({error:true,message:'User Already Exist'})
        }
        const userValid = bcrypt.compareSync(password,user.password)

        if(!userValid){
            return res.json({error:true,message:'wrong password'})
        }
        if(user.block){
            return res.json({error: true, message: "You are blocked" })
        }
        const token=jwt.sign({
            id:user._id
        },'myJwtsecretKey')
     
        console.log(token);

        return res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({ error: false, user: user._id })



    }
    catch(err){
        console.log(err);
        res.json({err:false})
    }
}

export async function userForgot(req,res){
    try{
        console.log('enterrrr');
        const {email}=req.body
        log(req.body)
        const user=await userModel.findOne({email})
        console.log(user);
        if(!user){
            return res.json({err:true,message:'user not found'})
        }
        let otp=Math.ceil((Math.random()*1000000)+100000)
        console.log(otp);
        let otpSent=await sentOtp(email,otp)
        const token=jwt.sign(
            {
                otp:otp
            },'myJwtsecretKey'
        )
        
        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 10,
            sameSite: "none",
        }).json({ err: false })


    }
    catch(err){
        console.log(err);
        res.json({err:true,error:err,message:'something went wrong'})
    }
}
export async function verifyForgotOtp(req,res){
    try{
        const {otp}=req.body
        const tempToken = req.cookies.tempToken

        if(!tempToken){
            console.log('heree');
            return res.json({err:true,message:'Otp Session TimedOut'})
        }

        const verifiedTempToken = jwt.verify(tempToken,'myJwtsecretKey')
        console.log(verifiedTempToken);
        if(otp != verifiedTempToken.otp){
            console.log('enterr');
            return res.json({err:true,message:'invalid otp'})
        }
        return res.json({ err:false})


    }
    catch(err){
        console.log(err);
        res.json({error:err,err:true,message:'invalid Otp'})
    }
}

export async function clearOtp(req,res){
    const token = req.cookies.tempToken
    if(token){
        const decodedToken=jwt.decode(token)
        delete decodedToken.otp
        const updatedToken=jwt.sign(decodedToken,'myJwtsecretKey')
        res.cookie('tempToken', updatedToken, {
            httpOnly: true,
            secure: true,
            maxAge: 0, // Setting maxAge to 0 will remove the cookie
            sameSite: "none",
          });
          return res.json({err:false,message:'otp cleared'})
    }

    return res.json({err:true,message:'otp not cleared'})


}

export async function resendOtp(req,res){

    try{
        
    console.log('kdkfjdjlkfjsajkdlk');
    const {email}=req.query
    let otp=Math.ceil((Math.random()*1000000)+100000)
    console.log(otp);
        let otpSent=await sentOtp(email,otp)
        const token=jwt.sign(
            {
                otp:otp
            },'myJwtsecretKey'
        )
        
        return res.cookie("tempToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 10,
            sameSite: "none",
        }).json({ err: false })

    }

    catch(err){
        console.log(err);
    }

}

export async function resetUserPassword(req,res){
    try{
        const {email,password,otp}=req.body
        console.log('rdddd',req.body);
        const tempToken = req.cookies.tempToken

        if(!tempToken){
            return res.json({err:true,message:'otp session out'})
        }
        const verifyTempToken = jwt.verify(tempToken,'myJwtsecretKey')

        if(otp!=verifyTempToken.otp){
            return res.json({err:true,message:'otp session out'})
        }

        const hashPassword = bcrypt.hashSync(password, salt);


        await userModel.updateOne({ email }, {
            $set: {
                password: hashPassword
            }
        })
        return res.json({ err: false })


    }
    catch(err){
        console.log(err)
        res.json({ error: err, err: true, message: "something went wrong" })
    }
}

export const userLogout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    }).json({ message: "logged out", error: false });
}

export const checkUserLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.json({ loggedIn: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, "myJwtsecretKey");
        const user = await usermodel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return res.json({ loggedIn: false });
        }
    
        if (user.block) {
            return res.json({ loggedIn: false });
        }
        return res.json({ user, loggedIn: true });
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}