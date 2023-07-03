import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import InputEmoji, { async } from "react-input-emoji";
import './Chat.css'

import UserSidebar from '../UserSidebar/UserSidebar'
import { Link } from 'react-router-dom'
import { RiArrowLeftFill, RiArrowRightFill, RiSendPlane2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Button, colors } from '@mui/material';

function ChatBody({chat,currentUser,workspaceId,setSendMessage,recievedMessage,setChatview,chatview}) {

    console.log(currentUser,'current-user');
    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')

    const scroll = useRef()

    // const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    console.log(userData,'user dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');


    const user=useSelector((state)=>{return state.user.details})

    

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
       inputRef.current.focus(); 

    },[chat,currentUser])

    
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

                // alert('success')
                
                setMessages([...messages,data.result])
                setNewMessage('')

                // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    };

    // always scroll to last

   // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])


  return (
    

    <>
    

    <div className="content-page"  style={{background: '#ebf2ee'}}>
  <div className="container-fluidd-flex flex-column" style={{ height: '100%', position: 'relative'  }}>

  <div className="row">
  <div className="col-lg-12">
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
            <div className='d-flex align-items-center justify-content-center' style={{gap:'10px'}}>

        <img src={userData?.profile.url} className='img-fluid rounded-circle' alt="avatar 1" style={{width:'40px', height: '40px', minWidth:'40px'}} />
          <h5 className='chat-heading'>{userData?.name}</h5>
            </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
          <Button className='back-chat' variant="outlined"  onClick={()=>{setChatview(!chatview)}}>
  Back
</Button>
            
            
         
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



    <div className='flex-grow-1 overflow-auto' style={{marginBottom:'50px'}}>



        {
            messages?.map((message)=>(
                <>

                
                 {
                    message.senderId===currentUser?

                    <div className="d-flex flex-row justify-content-start" ref={scroll}>
                    <img src={user?.profile.url} className='img-fluid rounded-circle' alt="avatar 1" style={{width:'40px', height: '40px', minWidth:'40px'}}/>
                    <div className=''>
                      <p className="chatBoxSend small ms-3 mb-1  " style={{minWidth:100, maxWidth:400}}>{message.text}</p>
                      <p class="small ms-3 mb-3 rounded-3 text-muted">{format(message.createdAt )}</p>
                    </div>

                 
                  </div>

                    : 
                    
                     
            <div className="d-flex flex-row justify-content-end mb-4 pt-1" ref={scroll}> 
            <div >
              <p className="small  me-3 mb-1 chatBoxReceive" style={{minWidth:100, maxWidth:400}}>{message.text}</p>
            
              <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{format(message.createdAt)}</p>
            </div>
            <img src={userData?.profile.url} className='img-fluid rounded-circle' alt="avatar 1" style={{width:'40px', height: '40px', minWidth:'40px'}} />
          </div>
                 }
                
                
                </>

            ))
        }
  

       
         

     






    </div>





        <div className='row'>

            <div className='col-lg-12'>


            <div className="card-footer text-muted d-flex justify-content-start align-items-center" style={{ position: 'fixed', bottom: 0,width: '-webkit-fill-available' ,    padding: '10px 7px 6px 8px ' ,background:'white'}}>
            <img src={user?.profile.url} alt="avatar 3" className='img-fluid rounded-circle' style={{width:'50px', height: '50px', minWidth:'50px'}} />
            <InputEmoji
                className='form-control form-control-lg'
                value={newMessage}
                onChange={handleChange}
                ref={inputRef}
                onKeyPress={handleKeyPress}
                />

            <a className="ms-3 sendIcon" onClick={handleSend}><RiSendPlane2Fill className="fas fa-paper-plane" /></a>
          </div>
            </div>

        </div>
          
          



         

    </div>


    </div>

    </>

  


  
  )
}

export default ChatBody
