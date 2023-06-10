import { Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function InviteUserModal(props) {

  const {modalview} = props;

  const [email,setEmail]=useState('')
  const [loading,setLoading]=useState(false)
 
  const [role,setRole]=useState('')



  const workspaceId = useSelector((state)=>state.currentWorkspace)

  const handleSubmit = async (e)=>{
    console.log('handle submit');
    e.preventDefault()

    try{
      setLoading(true)
      const response = await axios.post('/inviteUsers',{email,workspaceId,role})

      if(response.data.error){
        // alert('err')
        console.log('errror');
      }else{
        setLoading(false)

        console.log("sucesss");
      }
    }
    catch(err){
      console.log('err')
    }
    setEmail('')
    setRole('')
  }
  const handleCancel = ()=>{
    console.log('hereee');
    props.setModalview(false)
  }

  const handleBackdropClose=()=>{
    setLoading(false)
  }

  return (
  <div className={`modal fade bd-example-modal-lg ${modalview===true?'show':''}`} role="dialog" aria-modal="true" id="new-user-modal" style={{display:'block', paddingRight:'4px' }}>
  <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header d-block text-center pb-3 border-bttom">
        <h3 className="modal-title" id="exampleModalCenterTitle02">New User</h3>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="row">
        
       
        
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText006" className="h5">Email</label>
              <input type="email" className="form-control" id="exampleInputText006" placeholder="Enter your Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
          </div>
         
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Role</label>
              <select name="type" className="selectpicker form-control" data-style="py-0" value={role} onChange={(e)=>{setRole(e.target.value)}}>
                <option value=''>Role</option>
                <option value='admin' >Admin</option>
                <option value='member'>Member</option>
                {/* <option>Manager</option>
                <option>BDE</option>
                <option>SEO</option> */}
              </select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
              <div className="btn btn-primary mr-3" onClick={handleSubmit} data-dismiss="modal">Save</div>
              <div className="btn btn-primary" data-dismiss="modal" onClick={handleCancel}>Cancel</div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  </div>

  <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
  // onClick={handleBackdropClose}
>
  <CircularProgress color="inherit" />
</Backdrop>

</div>
   
  )
}

export default InviteUserModal
