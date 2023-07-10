import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import workspaceImg from "../../assets/images/login/Lily.png";
import { Backdrop, CircularProgress } from '@mui/material';

function InvitationReq() {

    const location=useLocation()
    const invitationToken = new URLSearchParams(location.search).get('token');
    const [accepted, setAccepted] = useState(null);
    const [dropOpen,setDropOpen]=useState(false)

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
          setDropOpen(true)

          const response = await axios.post('/invitation/response',{token:invitationToken,accepted}) 

          if(response.data.error){
            // alert('err')
            setDropOpen(false)
            console.log(response.data.message);
          }else{
            setDropOpen(false)
            navigate('/create-workspace')
          }

        }
        catch(err){
          // alert('err')
        }
       
      }

      if(invitationToken && accepted!== null){
        console.log('herre roken');
        sendInvitationResponse()
      }
    },[invitationToken,accepted])

    // const fetchData = async ()=>{
    //   try{

    //   }
    //   catch(err){
    //     console.log('err');
    //   }
    // }



  return (
    

       
     <div className="wrapper">
  <section className="login-content">
    <div className="container">
      <div className="row align-items-center justify-content-center height-self-center">
        <div className="col-lg-8">
          <div className="card auth-card">
            <div className="card-body p-0">
              <div className="d-flex align-items-center auth-content">
                <div className="col-lg-6 bg-primary content-left">

                {invitationToken && accepted===null && (
                  
                  <div className="p-3">
                    {/* <img src="../assets/images/login/mail.png" className="img-fluid" width={80} alt /> */}
                    <h2 className="mt-3 mb-0 text-white">Accept !</h2>
                    <p className="cnf-mail mb-1">You're invited to the Taskify workspace. Collaborate effortlessly, track tasks, and achieve project success with the team!</p>
                    <div className="d-inline-block w-100">
                      <a  className="btn  mt-3" style={{background:'violet'}} onClick={handleAccept}>Accept</a>
                    </div>
                    <div className="d-inline-block w-100">
                      <a  className="btn  mt-3" style={{background:'violet'}} onClick={handleReject}>Reject</a>
                    </div>
                  </div>
    
    )}



                </div>
                <div className="col-lg-6 content-right">
                  <img src={workspaceImg} className="img-fluid image-right" alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Backdrop
          sx={{ color: '#a7cafc',background:'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={dropOpen}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>
</div>






   

  
  
  )
}

export default InvitationReq
