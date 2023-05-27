import React, { useState } from 'react'
import SignupImg from '../../assets/images/login/01.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function VerifyOtp(props) {

    const [errMessage,setErrorMessage]=useState('')
    const [otp,setOtp]=useState('')
    const dispatch=useDispatch()


    async function handleSubmit(e){
        e.preventDefault()
        let { data } = await axios.post("/auth/signup/verify", { otp, ...props.data });
        if(data.err){
            setErrorMessage(data.message)
        }else{
            // alert('success')
            dispatch({type:'refresh'})
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
                    <form onSubmit={handleSubmit}>
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
                        Otp Resends In <a href="#">56:00</a>
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
          </div>
      
    
  )
}

export default VerifyOtp
