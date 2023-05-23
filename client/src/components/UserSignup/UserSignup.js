import React from 'react'
import '../../styles/Taskify.css'
import SignupImg from '../../assets/images/login/01.png'


function UserSignup() {
  return (
    <div className='body'>

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
                    <form>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="text" placeholder=" " />
                            <label>Full Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="text" placeholder=" " />
                            <label>Last Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="email" placeholder=" " />
                            <label>Email</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="text" placeholder=" " />
                            <label>Phone No.</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="password" placeholder=" " />
                            <label>Password</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="floating-label form-group">
                            <input className="floating-input form-control" type="password" placeholder=" " />
                            <label>Confirm Password</label>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="button-submit-login">Sign Up</button>
                      <p className="mt-3 button-submit-login-p">
                        Already have an Account <a href="auth-sign-in.html">Sign In</a>
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

    </div>
  )
}

export default UserSignup
