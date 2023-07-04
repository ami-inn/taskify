import React, { useEffect, useRef, useState } from 'react'
import ChatCss from './Chat.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Conversation from './Conversation'
import ChatBox from './ChatBox'
import {io} from 'socket.io-client'

function Chat() {

    const [chats,setChats]=useState([])
    const [currentChat,setcurrentChat] = useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [sendMessage,setSendMessage]=useState(null)
    const [recievedMessage,setRecievedMessage]=useState(null)


  

    const user=useSelector((state)=>{return state.user.details})
    const workspaceId = useSelector((state)=>state.currentWorkspace)

    const socket = useRef()

    

    useEffect(()=>{
        const getChats = async ()=>{

            try{
                const userId = user._id
                const {data}=await axios.get(`/chat/worksapce/${workspaceId}/user/${userId}/chats`)
                if(data.error){
                    // alert('err')
                }else{

                    console.log('dataa');

                    setChats(data.chat)





                }
            }
            catch(err){
                console.log('error');
            }

           
        }
        getChats()
    },[user])
  




    useEffect(()=>{
        socket.current=io('http://localhost:8800')
        socket.current.emit('new-user-add',user._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users)
            console.log(onlineUsers,'online users');
        })
    },[user])

      // send mesage to socket server
      useEffect(()=>{
        if(sendMessage !== null){
            socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])


 // Get the message from socket server
 useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data,'recievedd messageeee')
      setRecievedMessage(data);
    }

    );
  }, []);

  
  console.log('chatschatss',chats);


  return (
    <div className={`${ChatCss.Chat}`}>
        {/* leftside */}
        
        <div className={`${ChatCss.Leftsidechat}`}>

            <div className={`${ChatCss.Chatcontainer}`}>



            <h2>chats</h2>

            <div className={`${ChatCss.Chatlist}`}>

                {
                    chats.map((chat)=>(
                        <div onClick={()=>setcurrentChat(chat)}>
                            <Conversation data={chat} currentUserId={user._id}/>
                        </div>
                    ))
                }

            </div>

            </div>
        </div>

        <div className={`${ChatCss.Rightsidechat}`}>

            <div style={{}}>

            </div>

      <h2>chats</h2> 

      {/* chatbody */}

      <ChatBox chat={currentChat} currentUser={user._id} workspaceId={workspaceId} setSendMessage={setSendMessage} recievedMessage={recievedMessage}/>

     </div>
      
    </div>
 
 )
}

export default Chat
