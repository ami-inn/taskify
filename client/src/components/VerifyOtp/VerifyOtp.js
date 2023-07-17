import React, { useEffect, useState } from 'react'
import SignupImg from '../../assets/images/login/01.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material'
// import { Alert, Stack } from '@mui/material'

function VerifyOtp(props) {

  
    const [errMessage,setErrorMessage]=useState('')
    const [otp,setOtp]=useState('')
    const [countdown,setCountdown]=useState(60)
    const [resendAllowed,setResendAllowed] = useState(false)
    const [open,setOpen]=useState(false)
    const dispatch=useDispatch()


    async function handleSubmitt(e){
        e.preventDefault()
        console.log('herreee6465446565');
        console.log( { otp, ...props.data });
        setOpen(true)
        let { data } = await axios.post("/auth/signup/verify", { otp, ...props.data });
        console.log(data);
        if(data.err){
          // alert('error')
          setOpen(false)
            setErrorMessage(data.message)
        }else{
            // alert('success')
            setOpen(false)
            dispatch({type:'refresh'})
        }
    }


    async function resendOtp(){

      setResendAllowed(false)
      let {data}=await axios.get('/auth/resend-otp',{params:{email:props.data.email}})


      if(!data.err){
        console.log(data)
        setCountdown(60);
        setResendAllowed(false);

      }else{
        
        console.log('errorrr')
      }

    }

    useEffect(()=>{
      const timer=setInterval(()=>{
        setCountdown((prevCountdown)=>prevCountdown-1)
      },1000)

      return () => {
        clearInterval(timer);
      };
    },[])

    useEffect(() => {
      if (countdown === 0) {
        clearOtp()
        setResendAllowed(true);
      }
    }, [countdown]);

    const clearOtp=async ()=>{
      try{
       let {data}= await axios.get('/auth/clear-otp')

       if(data.err){
        console.log(data.err);
       }else{
        setErrorMessage(data.message)
        console.log(data);
       }



      }catch(error){
        console.log(error)
      }
    }

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
                  <div className="p-3">
                    <h2 className="mb-2 text-white">Sign In</h2>
                    <p>Enter Your Otp</p>
                    <form onSubmit={handleSubmitt}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="floating-label form-group">
                            <input  value={otp} onChange={(e) => setOtp(e.target.value)} className="floating-input form-control" type="text" placeholder=" " />
                            <label>Otp</label>
                          </div>
                        </div>
                      </div>
                      <button type="submit" disabled={otp.trim() == ""} className="button-submit-login">Submit</button>
      
                        <p className="mt-3 button-submit-login-p">
                        {countdown>0? <a> Otp Resends In : <span style={{color:'#cc059a'}}>{countdown}</span></a>:''}
                      </p>

                      {
                        resendAllowed===true ?  <p className="mt-3 button-submit-login-p" onClick={resendOtp}>Resend</p>:''
                      }

                      <p style={{color:'#cc059a'}}>{errMessage}</p>

                    
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 content-right">
                  <img src={SignupImg} className="img-fluid image-right" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>

  
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


                      
  
          </div>
      
    
  )
}

export default VerifyOtp
