import chatModel from "../models/ChatModel.js";
import workspaceModel from "../models/WorkspaceModel.js";

export const createChat = async (req,res)=>{



    const { senderId,receiverId } = req.body;
    
  const { workspaceId } = req.params;

    try{

        const existingChat = await chatModel.findOne({
            members: { $all: [senderId, receiverId] },
            workspace: workspaceId
          });

          console.log('existingChat',existingChat);
      
          if (existingChat) {
            console.log('existingchat',existingChat);
            return res.json({ error: false, message: 'Chat already exists', result:existingChat });
          } else{

            const newChat = new chatModel({
                members:[senderId,receiverId],
                workspace:workspaceId
            })
    
            const savedChat = await newChat.save()
    
            console.log(savedChat,'chatt');
    
            await workspaceModel.findByIdAndUpdate(workspaceId, { $push: { chats:savedChat._id } });
    
            res.json({error:false,message:'chat saved',result:savedChat})


          }

     

    }
    catch(err){
        console.log('servdee');
        return res.json({error:true,message:'internal server error'})
    }
} 

export const userChats=async (req,res)=>{
    try{
        const chat = await chatModel.find({
            members:{$in:[req.params.userId]},
            workspace:req.params.workspaceId
        })

        // console.log('cahtff',chat);
    

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