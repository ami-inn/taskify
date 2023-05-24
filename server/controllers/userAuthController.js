import usermodel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sentOtp from '../helpers/sentOtp.js'
import crypto from 'crypto'
import { log } from 'console'



var salt = bcrypt.genSaltSync(10)

export async function userSignup(req,res){
    try{
        console.log('enterrr');
        const {email}=req.body

        const user=await usermodel.findOne({email})

        if(user){
            return res.json({error:true,message:'user already exists'})
        }

        let otp=Math.ceil(Math.random()*1000000)

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
        console.log('enterrrr');
        const {name, email, password,lastname,phoneNumber,otp}=req.body
        console.log((req.body));
        const tempToken=req.cookies.tempToken
        console.log(tempToken);
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
        const {email} = req.body
        const user=await usermodel.findOne({email})
        if(!user){
            return res.json({err:true,message:'User Already Exist'})
        }
        const userValid = bcrypt.compareSync(password,user.password)

        if(!userValid){
            return res.json({error:true,message:'wrong password'})
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

        const verifiedJWT = Jwt.verify(token, "myJwtsecretKey");
        const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return res.json({ loggedIn: false });
        }
        return res.json({ user, loggedIn: true });
    } catch (err) {
        console.log(err)
        res.json({ loggedIn: false, error: err });
    }
}