import React from 'react'
import SignupImg from '../../assets/images/login/01.png'
import { useSelector } from 'react-redux'

function CreateWorkspace() {

    const user=useSelector((state)=>{
        console.log(state.user);
    })




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
                      <h2 className="mb-2 text-white">Create Workspace</h2>
                      <p>create an workspace to continue</p>
                      <form >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control"  type="email" placeholder=" " />
                              <label>Name</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input   className="floating-input form-control" type="password" placeholder=" " />
                              <label>Description</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="custom-control custom-checkbox mb-3">
                              <input type="checkbox" className="custom-control-input" id="customCheck1"  />
                              <label className="custom-control-label control-label-1 text-white" htmlFor="customCheck1">Accept Our Policy</label>
                            </div>
                          </div>
                        
                        </div>
                        <button type="submit" className="button-submit-login">Submit</button>
                      
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

export default CreateWorkspace
