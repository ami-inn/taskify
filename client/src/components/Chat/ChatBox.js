import React, { useEffect, useState } from 'react'
import ChatCss from './Chat.module.css'
import axios from 'axios'
import {format} from 'timeago.js'
import InputEmoji, { async } from "react-input-emoji";


function ChatBox({chat,currentUser,workspaceId,setSendMessage,recievedMessage}) {
    console.log(currentUser,'curren user');
    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')




    useEffect(()=>{

        const userId = chat?.members?.find((id)=>id!==currentUser)

        const getUserData = async ()=>{
            const {data} = await axios.get(`/get-user/${userId}`)

            if(data.error){
                alert('error')
            }else{
                console.log(data,'dataa');
                setUserData(data.user)
            }
        }

       if(chat!==null) getUserData()

    },[chat,currentUser])
 
    console.log(userData,'userdataaall');




    

    const handleSend = async (e)=>{
        e.preventDefault()

        const message = {

            senderId:currentUser,
            text:newMessage,
            chatId:chat._id,

        }

        // sende message to database

        try{

            const {data}=await axios.post(`/message/workspace/${workspaceId}`,{message})

            if(data.error){
                console.log(data);
                alert('errr')
            }else{
                console.log('data',data);

                alert('success')
                
                setMessages([...messages,data.result])
                setNewMessage('')
            }

        }
        catch(err){
            console.log(err);
        }

        
            // send Message To Socket server

            const receiverId = chat.members.find((id)=>id!==currentUser);
            // send message to socket server
            setSendMessage({...message, receiverId})
            // send message to database


    }


    useEffect(()=>{
        const fetchMessages = async ()=>{
            try{
                const chatId=chat._id
                const {data}= await axios.get(`/message/chat/${chatId}`)

                if(data.error){
                    console.log('eror',data);
                }else{
                 setMessages(data.result)
                  console.log(data,'dattteeeeee');
                }
            }
            catch(error){
                console.log('error');
            }


        }
        if(chat!== null) fetchMessages() 
    },[chat])


    useEffect(()=> {
        console.log("Message Arrived: ",recievedMessage)
        if (recievedMessage!== null && recievedMessage.chatId === chat._id) {
          setMessages([...messages, recievedMessage]);
        }
      
      },[recievedMessage])

    const handleChange=(newMessage)=>{
        console.log('enteeerrd ');
        console.log(newMessage,'newmessage');
        setNewMessage(newMessage)
    }

    console.log(messages,'messagess');
    console.log(newMessage,'newmessage');

  return (
    <>
    <div className={`${ChatCss.chatBoxcontainer}`}>

        {
            chat?


            <>
            <div className={`${ChatCss.chatheader}`}>
                <h2>its header</h2>
                <span>{userData?.name}</span>
            </div>
           
    
        {/* chatbox messages */}
    
        <div className={`${ChatCss.chatbody}`}>
    
            {
                messages?.map((message)=>(
                    <>
                    <div className={`${message.senderId===currentUser? `${ChatCss.messageSend}`:'message'} `}>
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                    </div>
                    </>
                ))
            }
    
            
    
        </div>
    
        {/* chat sender */}
    
            <div className={`${ChatCss.chatsender}`}>
    
                <div>+</div>
    
                <InputEmoji
                
                value={newMessage}
                onChange={handleChange}
                />
    
                <div className={`${ChatCss.button} ${ChatCss.button}`} onClick={handleSend}><span>send</span></div>
    
    
    
            </div>
    
            </>

            :
            <span>tap on chaat to start converstation</span>
        }

       

    </div>
      
    </>
  )
}

export default ChatBox
