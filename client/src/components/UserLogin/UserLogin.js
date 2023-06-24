import React, { useDebugValue, useState } from 'react'
import '../../styles/Taskify.css'
import SignupImg from '../../assets/images/login/01.png'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import buttonCss from '../../styles/Buttons.module.css'

function UserLogin() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errMessage,setErrorMessage]=useState(null)
   const [isChecked, setIsChecked] = useState(false);
    const dispatch=useDispatch()

    function validationErr() {
        if (
          email.replaceAll(" ", "") === "" ||
          password.replaceAll(" ", "") === ""
        

        ) {
          return true;
        }
        return false;
      }

      async function handleSubmit(e) {
        e.preventDefault();
    
        if (!validationErr()) {
          let { data } = await axios.post("/auth/login", {
            email,
            password,
          });
          if (!data.error) {
            alert('success')
            dispatch({ type: "refresh" });
           
          } else {
            setErrorMessage(data.message);
          }
        }
      }

    
        const handleMouseMove = (e) => {
          const btn = e.currentTarget;
          const rect = btn.getBoundingClientRect();
          const x = e.clientX * 3 - rect.left;
          btn.style.setProperty('--x', x + 'deg');
        };


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
                      <p>Login to stay connected.</p>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder=" " />
                              <label>Email</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="floating-input form-control" type="password" placeholder=" " />
                              <label>Password</label>
                            </div>
                          </div>
                          {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }
                        
                          <div className="col-lg-12">
                            <Link to={'/forgot'} className="text-white float-right">Forgot Password?</Link>
                          </div>
                        </div>

                        
                        {/* <button type="submit" disabled={validationErr()} className="button-submit-login">Sign In</button> */}
                    

                       {/* <a className={`${buttonCss.signupBtn}`}  onMouseMove={handleMouseMove} onClick={handleSubmit}>
                        <i></i>
                        <i></i>
                        <span>Login</span>
                       </a>) */}


                       <button type='submit' disabled={validationErr()} className={`${buttonCss.customBtn} ${buttonCss.btn1}`}>Login</button>
                       
                       
                       
                        <p className="mt-3 button-submit-login-p">
                          Create an Account <Link to='/signup' >Sign Up</Link>
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

export default UserLogin
