import React, { useState } from 'react'
import ForgotImg from '../../assets/images/login/hero-img.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import ForgotEmailPassword from './ForgotEmailPassword'

function ForgotOtp({email}) {
    const [errMessage,setErrMessage]=useState('')
    const [otp,setOtp]=useState('')
    const [reset,setShowReset] = useState('')
    const dispatch=useDispatch()

    async function handleSubmit(e){
      
        e.preventDefault()
        const {data}=await axios.post('/auth/forgot/verify',{otp})
        console.log(data);
        if(data.err){
            console.log('enteerr');
            setErrMessage(data.message)
        }else{
            setShowReset(true)
        }
    }


  return (
    <>

    {
        reset ? <ForgotEmailPassword otp={otp} email={email} />:

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
                                <input className="floating-input form-control" type="number" placeholder=""   value={otp} onChange={(e) => setOtp(e.target.value)} />
                                <label>Otp</label>
                              </div>
                            </div>
                          </div>

                          {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }

                          <button type="submit" className="button-submit-login">Submit</button>
                          <p className="mt-3 button-submit-login-p">
                            Otp Resends In <a href="#">56:00</a>
                          </p>
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
    }
    
    </>
  
  )
}

export default ForgotOtp
