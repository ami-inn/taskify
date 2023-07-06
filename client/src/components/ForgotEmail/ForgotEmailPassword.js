import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ForgotImg from '../../assets/images/login/hero-img.png'

function ForgotEmailPassword({email,otp}) {
  

  const [errMessage,setErrMessage] = useState('')
  const [password,setPassword] =useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const navigate=useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const {data}=await axios.post('/auth/forgot/reset',{otp,email,password})
    if(data.err){
      console.log('enterr');
      setErrMessage(data.message)
  }else{
    console.log('enttk');
      navigate("/login")
  }
  }
  const validForm=()=>{
    if(password.trim()==="" || password!=confirmPassword){
        return false
    }
    return true
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
                    <h2 className="mb-2 text-white">Update password</h2>
                    <p>Enter Your New Password</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder=" " />
                            <label>New Password</label>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="password" placeholder=" "  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
                            <label>Confirm Password</label>
                          </div>
                        </div>
                      </div>
                      {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }
                      <button type="submit" disabled={!validForm()}  className="button-submit-login">Submit</button>
                      <p className="mt-3 button-submit-login-p">
                        Go to <Link to={'/'}>Home</Link>
                      </p>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 content-right">
                  <img src={ForgotImg} className="img-fluid image-right" alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
      
  
  )
}

export default ForgotEmailPassword
