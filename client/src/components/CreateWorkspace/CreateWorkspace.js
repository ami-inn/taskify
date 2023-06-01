import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import workspaceImg from '../../assets/images/login/workspace.jpeg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateWorkspace() {

  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [errMessage,setErrorMessage]=useState('')
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const validForm = () =>{
    if(name.trim()===''|| description.trim()===''){
      return true
    }
    return false
  }

    const user=useSelector((state)=>{
    
        return state.user.details

    })


    async function handleSubmit(e){
      e.preventDefault()

      if(!validForm()){
        let {data}= await axios.post('/create-workspace',{name,description,userId:user._id})

        if(!data.error){
          console.log(data);
          alert('success')
          dispatch({type:"workspace", payload:data.workspaceId})
          navigate('/workspace/'+data.workspaceId)
        }else{
          alert()
        }
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
                      <img src='' className="rounded avatar-80 mb-3" alt />
                      <h2 className="mb-2 text-white">Hi ! {user.name}</h2>
                      <p>Create An Workspace  To Continue</p>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" placeholder=" " value={name} onChange={(e)=>{setName(e.target.value)}} />
                              <label>Name</label>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="floating-label form-group">
                              <input className="floating-input form-control" type="text" placeholder=" " value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                              <label>Description</label>
                            </div>
                          </div>
                        </div>
                        <button type="submit" disabled={validForm()} className="button-submit-login">Submit</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 content-right">
                    <img src={workspaceImg} className="img-fluid image-right" alt />
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
