import messageModel from "../models/MessageModel.js";

export const addMessage = async (req,res)=>{
    const {workspaceId}=req.params

    console.log(workspaceId);
    const {chatId,senderId,text}=req.body.message

    console.log(chatId,senderId,text);

    console.log(req.body,'bodeeee');

    const message = new messageModel({
        chatId,senderId,text
    })

    try{

        const result = await message.save()
        res.json({error:false,result})

    }
    catch(err){
        console.log(err);
        res.json({error:true,message:'internal server error'})
    }
}

export const getMessages = async (req,res)=>{
    const {chatId}=req.params

    console.log(chatId,'chtid');
    try{

        const result = await messageModel.find({chatId})

        console.log('resulst',result);

        res.json({error:false,result})

        
    }
    catch(err){
        res.json({error:true,message:'internal server error'})
    }
}


