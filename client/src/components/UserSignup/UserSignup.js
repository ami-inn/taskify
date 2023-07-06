import React, { useEffect, useState } from 'react'
import '../../styles/Taskify.css'
import SignupImg from '../../assets/images/login/01.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import VerifyOtp from '../VerifyOtp/VerifyOtp'
import { Link } from 'react-router-dom'
import zxcvbn from 'zxcvbn';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';




function UserSignup() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [lastname,setLastname]=useState('')
    const [password,setPassword]=useState('')
    // const [passwordStrength,setPasswordStrength]=useState('') //for password strength in frontend display
    const [confPassword,setConfPassword]=useState('')
    const [errMessage,setErrMessage]=useState(null)
    const [phoneNumber,setPhoneNumber]=useState()
    const dispatch = useDispatch()
    const [showOtpPage, setShowOtpPage] = useState(false)
    const [open, setOpen] = useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    useEffect(() => {
      // Stop the backdrop when the component is rendered
      handleClose();
    }, [showOtpPage]);
    
    function validationErr() {
        if (
          email.replaceAll(" ", "") === "" ||
          password.replaceAll(" ", "") === "" ||
          
          confPassword.replaceAll(" ", "") === "" ||
          name.replaceAll(" ", "") === ""
        ) {
            
          return true;
        }
        return false;
      }
      async function handleSubmit(e) {
       
        e.preventDefault();
        if (!validationErr()) {
          if(confPassword === password){
            let {data}=await axios.post("/auth/signup", {
              name, email, password, confPassword,lastname,phoneNumber
            });
            if(!data.error){
              // alert('success')
              setShowOtpPage(true)
              dispatch({type:"refresh"})
           
            }else{
              setErrMessage(data.message)
              handleClose()
            }

          }else{
            handleClose()
            setErrMessage('passwords must be same')
          }
        
        }else{
          handleClose()
        }
      }

      // const checkPasswordStrength=(password)=>{

      //   const result = zxcvbn(password)

      //   console.log(result)
      //   const strengthScore=result.score
      //   setPasswordStrength(strengthScore)

      //   if(strengthScore<3){
      //     setPasswordStrength('weak')
      //   }

      // }
      


  return (
    <div className='body'>

        {
            !showOtpPage?
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
                    <h2 className="mb-2 text-white">Sign Up</h2>
                    <p>Create your Taskify account.</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder=" " />
                            <label>Full Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input  className="floating-input form-control" value={lastname} onChange={(e)=>{setLastname(e.target.value)}} type="text" placeholder=" " />
                            <label>Last Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="floating-input form-control" type="email" placeholder=" " />
                            <label>Email</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}  type="tel" pattern='[0-9]{3}[0-9]{3}[0-9]{4}' placeholder=" " required />
                            <label>Phone No.</label>
                            
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" value={password}  onChange={(e)=>{setPassword(e.target.value);}}  type="password" placeholder=" " />
                            {/* checkPasswordStrength(e.target.value) */}
                            <label>Password</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="password" value={confPassword}  onChange={(e)=>{setConfPassword(e.target.value)}}  placeholder=" " />
                            <label>Confirm</label>
                          </div>
                        </div>
                      </div>
           

                      {
                          errMessage &&
                          <p className='errMessageText' style={{color:'#ca31a3'}}>{errMessage}</p>
                        }
                          {/* {
                          passwordStrength === 'weak' &&
                          <p className='errMessageText'>Password Is Not Strong Enough</p>
                        } */}

                      <button type="submit" onClick={handleOpen} disabled={validationErr()} className="button-submit-login">Sign Up</button>
                      <p className="mt-3 button-submit-login-p">
                        Already have an Account <Link to='/login'>Sign In</Link>
                      </p>
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
</div>: <VerifyOtp data={{name, email, password, confPassword,lastname,phoneNumber}} />
        }


<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


    </div>
  )
}

export default UserSignup
