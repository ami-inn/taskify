import React, { useState } from 'react'
import '../../styles/Taskify.css'
import ForgotImg from '../../assets/images/login/hero-img.png'
import axios from 'axios'
import ForgotOtp from './ForgotOtp'





function ForgotEmail() {

    const [email,setEmail]=useState('')
  
    const [showOtp,setShowOtp]=useState(false)
    const [errMessage,setErrorMessage]=useState('')

    const validForm=()=>{
        if(email.trim()===''){
            return false
        }
        return true
    }

    async function handleSubmit(e){
        e.preventDefault()
        const {data}= await axios.post("/auth/forgot", {email});
        
        if(data.err){
            setErrorMessage(data.message)
        }else{
         setShowOtp(true)   
        }
    }

  return (
    <div className='body'>
        {
            showOtp ?
            <ForgotOtp email={email}/>
            :

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
                              <h2 className="mb-2 text-white">Reset Password</h2>
                              <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                              <form onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <div className="floating-label form-group">
                                      <input className="floating-input form-control" type="email" placeholder=" " value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                      <label>Email</label>
                                    </div>
                                  </div>
                                </div>

                                {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }

                                <button type="submit" disabled={!validForm()} className="button-submit-login">Submit</button>
                              </form>
                            </div>
                          </div>
                          <div className="col-lg-6 content-right">
                            <img src={ForgotImg} className="img-fluid image-right" alt />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>  

        }




    </div>
  )
}

export default ForgotEmail
