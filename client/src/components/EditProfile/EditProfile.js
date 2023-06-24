import React, { useEffect, useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBack2Fill, RiDeleteBackFill, RiDeleteBin2Fill, RiDeleteBinFill, RiPenNibFill } from 'react-icons/ri'

import axios from 'axios'
import SnackBar from '../SnackBar/SnackBar'

function EditProfile() {



    const [firstName,setfirstName]=useState('')
    const [lastName,setlastName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [image,setImage]=useState(null)
    const [about,setAbout]=useState('')
    const [jobtype,setJobtype]=useState('')
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [errMessage, setErrorMessage] = useState('')
    const [finalImage,setFinalImage] = useState(null)
    const [openForm,setOpenForm]=useState(1)
    const [newPassword,setnewPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [oldPassword,setOldPassword]=useState('')
    const [successMessage,setSuccessMessage]=useState('')
    const [twitter,setTwitter]=useState('')
    const [instagram,setInstagram]=useState('')
    const [facebook,setFacebook]=useState('')
    const [snackOpen,setSnackOpen]=useState(false)
    const [severity,setSeverity]=useState('')
    const [message,setMessage]=useState('')
    const [selectedImage,setSelectedImage]=useState(null)
    const {id}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const formOpen=(formId)=>{
      setOpenForm(formId)
    }


    const isValidFileUploaded=(file)=>{
      const validExtensions = ['png','jpeg','jpg']
      const fileExtension = file.type.split('/')[1]
      return validExtensions.includes(fileExtension)
    }

    const handleImage=(e)=>{
      const file = e.target.files[0]
      if(file){
        const reader = new FileReader()
        reader.onload=()=>{
          setSelectedImage(reader.result)
        }
        reader.readAsDataURL(file);
      }
      console.log('hereeee');
      if(isValidFileUploaded(e.target.files[0])){
          setImage(e.target.files[0])
          setErrorMessage("")
          ImageTOBase(e.target.files[0])
      }else{
          setErrorMessage("Invalid File type")
      }
  }
  const ImageTOBase=(file)=>{
    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setFinalImage(reader.result)
    }
  }


  

    

    const handleSkillChange= (e)=>{
        e.preventDefault()
        setNewSkill(e.target.value)
    }
    const handleKeyPress = (e) => {
     
        if (e.key === "Enter") {
          e.preventDefault()
          handleAddSkill(e);
        }
      };
    const handleAddSkill = () => {
        if (newSkill.trim() !== "") {
          setSkills([...skills, newSkill]);
          setNewSkill("");
        }
      };

      const handleDeleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
      };

    const user=useSelector((state)=>{
    
        return state.user.details
    
    })
    function checkValidUser(){
        return id===user._id
    }

    useEffect(()=>{
        console.log('enterr');

        if(!checkValidUser()){
            console.log('kjldfdfkjfdkjl');
            navigate('/profile')
        }

    },[id])


    const handleSubmit=async(e)=>{
      e.preventDefault();
      const name=`${firstName} ${lastName}`

      console.log('herrree');

      

      try{
        console.log('enterr');
        const {data}=await axios.patch('/edit-profile/'+id, {
          name,
          email,
          phone,
          skills,
          jobtype,
          about,
          image:finalImage
        })
        console.log(data);
        if(data.err){
          setErrorMessage(data.message)
          setSnackOpen(true)
          setSeverity('error')
          setMessage(data.message)
        }else{
          console.log('sucees',data);
          setSnackOpen(true)
          setSeverity('success')
          setMessage(data.message)
          dispatch({type:'refresh'})
        }
      }
      catch(err){
        console.log('errrrr',err);

      }

    }

    function validForm(){
      if(firstName.trim()===''||
      skills.length>5
      ){
        return false
      }else{
        return true
      }
    }
    useEffect(()=>{
      setfirstName(user.name)
      setEmail(user.email)
      setAbout(user.about)
      setSkills(user.skills)
      setJobtype(user.jobtype)
      setPhone(user.phone)

    },[])


    // forgot password

     const handleChangePassword = async (e) =>{
      e.preventDefault()
      if(newPassword !== confirmPassword){
        setErrorMessage('the passwords are not match')
        return
      }

      try{
        
     const {data}= await axios.patch('/change-password/'+id,{oldPassword,newPassword})

     console.log(data);
     if(data.error){
      console.log(data.message)
      setErrorMessage(data.message)
      setSnackOpen(true)
      setSeverity('error')
      setMessage(data.message)
     }else{
      setSuccessMessage(data.message)
      setSnackOpen(true)
      setSeverity('success')
      setMessage(data.message)
      dispatch({type:'refresh'})
     }
        
      }catch(err){
        console.log(err);
      }


     }


    //  update socialLinks

    const handleSocialLink = async (e) =>{
      e.preventDefault()

      try{

        const {data}=await axios.patch('/update-sociallinks/'+id,{instagram,facebook,twitter})

        if(data.error){
          setSnackOpen(true)
          setSeverity('success')
          setMessage(data.message) 
        }else{
          setSnackOpen(true)
          setSeverity('success')
          setMessage(data.message)
          dispatch({type:'refresh'})
        }
      }
      catch(err){
        console.log(err)
      }
    }




    


  return (
    <div className='wrapper'>

    <UserSidebar page={'dashboard'}/>    
    <UserHeder/>

    <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body p-0">
            <div className="iq-edit-list usr-edit">
              <ul className="iq-edit-profile d-flex nav nav-pills">
                <li className="col-md-3 p-0"  style={{cursor:'pointer'}}>
                  <a className={`nav-link ${openForm===1?'active':''}`} onClick={()=>{formOpen(1)}} data-toggle="pill">
                    Personal Information
                  </a>
                </li>
                <li className="col-md-3 p-0" style={{cursor:'pointer'}}>
                  <a className={`nav-link ${openForm===2?'active':''}`} onClick={()=>{formOpen(2)}} data-toggle="pill" >
                    Change Password
                  </a>
                </li>
                <li className="col-md-3 p-0" style={{cursor:'pointer'}}>
                  <a className={`nav-link ${openForm===3?'active':''}`}data-toggle="pill" onClick={()=>{formOpen(3)}} >
                    Email and SMS
                  </a>
                </li>
                <li className="col-md-3 p-0" style={{cursor:'pointer'}}>
                  <a className={`nav-link ${openForm===4?'active':''}`} data-toggle="pill" onClick={()=>{formOpen(4)}} >
                    Manage Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="iq-edit-list-data">
          <div className="tab-content">
            <div className={`tab-pane fade ${openForm===1 ? 'active show':''}`} id="personal-information" role="tabpanel">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Personal Information</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row align-items-center">
                      <div className="col-md-12">
                        <div className="profile-img-edit">
                          <div className="crm-profile-img-edit">
                            <img className="crm-profile-pic rounded-circle avatar-100" src={selectedImage||user.profile.url} alt="profile-pic" />
                            <div className="crm-p-image bg-primary">
                              <label htmlFor="file-upload"><RiPenNibFill className="las la-pen upload-button" style={{color:'white',cursor:'pointer'}}/></label>
                              <input className="file-upload" id='file-upload' type="file" accept="image/*"  onChange={handleImage} />
                             
                            </div>
                          </div>                                          
                        </div>
                      </div>
                    </div>
                    <div className=" row align-items-center">
                      <div className="form-group col-sm-6">
                        <label htmlFor="fname">First Name:</label>
                        <input type="text" className="form-control" id="fname" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="lname">Last Name:</label>
                        <input type="text" className="form-control" id="lname" value={lastName} onChange={(e)=>{setlastName(e.target.value)}} />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="lname">phone:</label>
                        <input type="number" className="form-control" id="lname" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                      </div>
                     
                      <div className="form-group col-sm-6">
                        <label htmlFor="cname">job Type:</label>
                        <input type="text" className="form-control" id="jtype" value={jobtype} onChange={(e)=>{setJobtype(e.target.value)}} />
                      </div>

                      <div className="form-group col-sm-6">
                        <label htmlFor="cname">skills:</label>
                          {skills.length < 5 &&(
                                                    <input type="text"  onKeyPress={handleKeyPress} className="form-control" value={newSkill} onChange={handleSkillChange} id="cname" placeholder='enter only 5 skill' />
                          )}

                          {/* <button onClick={handleAddSkill}>Add Skill</button> */}
                   
                   
                   <ul className='skillsBox'>
                  {skills.map((skill, index) => (
                  <li className='skillsLisk' key={index}><span className='skill-text'>{skill} </span> <span className='skillIcon' onClick={() => handleDeleteSkill(index)}><RiDeleteBinFill  className='skilldeleteIcon'/></span></li>
                   ))}
                 </ul>
                      </div>
                      
                  
                    
                      <div className="form-group col-sm-12">
                        <label>About:</label>
                        <textarea className="form-control" name="address" rows={5} style={{lineHeight:2}} value={about} onChange={(e)=>{setAbout(e.target.value)}} />
                      </div>


                    </div>
                    <button type="submit" disabled={!validForm()} className="btn btn-primary mr-2">Submit</button>
                    <button type="reset" className="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>


            <div className={`tab-pane fade ${openForm===2 ? 'active show':''}`} id="chang-pwd" role="tabpanel">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Change Password</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label htmlFor="cpass">Current Password:</label>
                      <a href="javascripe:void();" className="float-right">Forgot Password</a>
                      <input type="Password" className="form-control" id="cpass" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}}  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="npass">New Password:</label>
                      <input type="Password" className="form-control" value={newPassword} id="npass" onChange={(e)=>{setnewPassword(e.target.value)}}  defaultValue />
                    </div>
                    <div className="form-group">
                      <label htmlFor="vpass">Verify Password:</label>
                      <input type="Password" className="form-control" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}  id="vpass" defaultValue />
                    </div>
                    {
                          errMessage &&
                          <p className='errMessageText'>{errMessage}</p>
                        }
                            {
                          successMessage &&
                          <p className='succMessageText'>{successMessage}</p>
                        }
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="reset" className="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${openForm===3 ? 'active show':''}`} id="emailandsms" role="tabpanel">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Email and SMS</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group row align-items-center">
                      <label className="col-md-3" htmlFor="emailnotification">Email Notification:</label>
                      <div className="col-md-9 custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="emailnotification" defaultChecked />
                        <label className="custom-control-label" htmlFor="emailnotification" />
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label className="col-md-3" htmlFor="smsnotification">SMS Notification:</label>
                      <div className="col-md-9 custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="smsnotification" defaultChecked />
                        <label className="custom-control-label" htmlFor="smsnotification" />
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label className="col-md-3" htmlFor="npass">When To Email</label>
                      <div className="col-md-9">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email01" />
                          <label className="custom-control-label" htmlFor="email01">You have new notifications.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email02" />
                          <label className="custom-control-label" htmlFor="email02">You're sent a direct message</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email03" defaultChecked />
                          <label className="custom-control-label" htmlFor="email03">Someone adds you as a connection</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row align-items-center">
                      <label className="col-md-3" htmlFor="npass">When To Escalate Emails</label>
                      <div className="col-md-9">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email04" />
                          <label className="custom-control-label" htmlFor="email04"> Upon new order.</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email05" />
                          <label className="custom-control-label" htmlFor="email05"> New membership approval</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="email06" defaultChecked />
                          <label className="custom-control-label" htmlFor="email06"> Member registration</label>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="reset" className="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div className={`tab-pane fade ${openForm===4 ? 'active show':''}`} id="manage-contact" role="tabpanel">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Manage Social Links</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSocialLink}>
                    <div className="form-group">
                      <label htmlFor="cno">Email:</label>
                      <input type="text" className="form-control" id="cno" defaultValue={user.email} disabled />
                    </div>
                    <div className="form-group">
                      <label htmlFor="insta">Instagram:</label>
                      <input type="text" className="form-control" id="insta" defaultValue={user.instagram} onChange={(e)=>{setInstagram(e.target.value)}}  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="twit">Twitter:</label>
                      <input type="text" className="form-control" id="twit" defaultValue={user.twitter}  onChange={(e)=>{setTwitter(e.target.value)}} />
                    </div>
                      <div className="form-group">
                      <label htmlFor="fb">facebook:</label>
                      <input type="text" className="form-control" id="fb" defaultValue={user.facebook} onChange={(e)=>{setFacebook(e.target.value)}} />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="reset" className="btn iq-bg-danger">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{
  
  snackOpen && <SnackBar severity={severity} message={message} snackOpen={snackOpen} setSnackOpen={setSnackOpen}  />
 }
      
    </div>
  )
}

export default EditProfile
