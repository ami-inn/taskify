import chatModel from "../models/ChatModel.js";

export const createChat = async (req,res)=>{
    const newChat = new chatModel({
        members:[req.body.senderId,req.body.recieverId]
    })

    try{

        const result = await newChat.save()


        res.json({error:false,message:'chat saved',result})

    }
    catch(err){
        return res.json({error:true,message:'internal server error'})
    }
} 

export const userChats=async (req,res)=>{
    try{
        const chat = await chatModel.find({
            members:{$in:[req.params.userId]},
            workspace:req.params.workspaceId
        })

        console.log(chat);
    

        res.json({error:false,message:'chat get',chat})

    }
    catch(err){
        return res.json({error:true,message:'internal server error'})

    }
}

export const findChat = async (req,res)=>{
    try{
        const chat = await chatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]},
            workspace:req.params.workspaceId
        })

        console.log(chat);

        res.json({error:false,chat,message:'chat get'})

    }
    catch(err){
        return res.json({error:true,message:'internal server error'})
    }
}