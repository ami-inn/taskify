import React, { useDebugValue, useState } from 'react'
import '../../styles/LandingPage.css'
import adminLoginImg from '../../assets/images/error/02.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function AdminLogin() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errMessage,setErrorMessage]=useState('')
    const dispatch = useDispatch()

    const validateForm=()=>{
        if(password.trim() === '' || email.trim() === ''){
            return false
        }
        return true
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const {data} = await axios.post('/admin/auth/login',{email,password})
        if (data.err) {
            setErrorMessage(data.message)
        } else {
            alert('success')
            dispatch({ type: "refresh" })
        }
    }


  return (
    <div className='home'>

<div className="wrapper">
  <section className="login-content">
    <div className="container">
      <div className="row align-items-center justify-content-center height-self-center">
        <div className="col-lg-8">
          <div className="card auth-card">
            <div className="card-body p-0">
              <div className="d-flex align-items-center auth-content">
                <div className="col-lg-6 bg-admin admin-content-left">
                  <div className="p-3">
                    <h2 className="mb-2 text-white">Admin login</h2>
                    <p>Admin Must Login To Continue</p>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="floating-label-admin form-group">
                            <input className="floating-input-admin form-control" type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=" " />
                            <label>Email</label>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="floating-label-admin form-group">
                            <input className="floating-input-admin form-control"  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder=" " />
                            <label>Password</label>
                          </div>
                        </div>
                      </div>

                      {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }
                      <button type="submit" disabled={!validateForm} className="button-submit-login-admin">Log In</button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 content-right">
                  <img src={adminLoginImg} className="img-fluid image-right" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
      
    </div>
  )
}

export default AdminLogin
