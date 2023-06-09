import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function InvitationReq() {

    const location=useLocation()
    const invitationToken = new URLSearchParams(location.search).get('token');
    const [accepted, setAccepted] = useState(null);

    const navigate = useNavigate()

    const handleAccept=()=>{
      console.log('enter here');
      setAccepted(true)
    }

    const handleReject=()=>{
      console.log('enter hereee');
      setAccepted(false)
    }

    useEffect(()=>{
      console.log('use effect');
      const sendInvitationResponse = async () =>{
        console.log('use effect');
        try{
          console.log('try');

          const response = await axios.post('/invitation/response',{token:invitationToken,accepted}) 

          if(response.data.error){
            alert('err')
            console.log(response.data.message);
          }else{
            navigate('/workspace/'+response.data.workspace._id)
          }

        }
        catch(err){
          alert('err')
        }
       
      }

      if(invitationToken && accepted!== null){
        console.log('herre roken');
        sendInvitationResponse()
      }
    },[invitationToken,accepted])
  return (
    <div>
    <h1>Invitation Response Page</h1>
    <p>Invitation Token: {invitationToken}</p>

    {invitationToken && accepted===null && (
      <div>
        <p>Do you accept the invitation?</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    )}
  </div>
  )
}

export default InvitationReq
