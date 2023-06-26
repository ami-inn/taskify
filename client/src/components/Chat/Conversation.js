import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatCss from './Chat.module.css'
import styled from '@emotion/styled'

function Conversation({data,currentUserId}) {

    const [userData,setUserData]=useState(null)

    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId)

        console.log('userid',userId);

        const getUserData = async ()=>{
            const {data} = await axios.get(`/get-user/${userId}`)

            if(data.error){
                alert('error')
            }else{
                setUserData(data.user)
            }
        }

        getUserData()
    },[])

    console.log(userData);

  return (
    <>
    <div className={`${ChatCss.follower} ${ChatCss.converstation}`}>

        <div>
            <div className={`${ChatCss.onlinedot}`}></div>
            <img src={userData?.profile?.url}  style={{ width: "50px", height: "50px" }} className={`${ChatCss.followerImage}`}  alt="" />

            <div  className={`${ChatCss.name}`} style={{fontSize:'0.8rem'}}>

                <span>{userData?.name}</span>
                <span>onliene</span>

            </div>
        </div>
      
    </div>

    <hr/>

    </>
  )
}

export default Conversation
