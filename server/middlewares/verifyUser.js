import jwt  from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const verifyUser=async function(req,res,next){
    try{

        const token=req.cookies.token

        if(!token){
            return res.json({loggedIn:false,error:true,message:'no token'})

        }
        
        const verifiedJWT = jwt.verify(token,'myJwtsecretKey' );

        const user=await userModel.findById(verifiedJWT.id,{password:0})

        if(!user){
            return res.json({loggedIn})
        }
        req.user=user
        next()

    }
    catch(err){
        console.log(err);
        res.json({loggedIn:false,error:err})
    }
}
export default verifyUser