import { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import img1 from '../../assets/images/user/01.jpg'
import InviteUserModal from '../InviteUserModal/InviteUserModal'
import { RiChat1Line, RiDeleteBin3Fill, RiPencilFill, RiSearch2Line } from 'react-icons/ri'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import SnackBar from '../SnackBar/SnackBar'

function UserTeam() {
  const user=useSelector((state)=>{
    
    return state.user.details

})
    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
    const isAdmin = currentWorkspace.admins.includes(user._id)
    const isOwner = currentWorkspace.owner.toString() === user._id;
    console.log('isowner',isOwner);
    const dispatch = useDispatch()
    const navigate= useNavigate()

    console.log(currentWorkspace,'its the workspace detailssssss');

    const [tableView,settableView]=useState(true)
    const [modalview,setModalview]=useState(false)
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [snackOpen,setSnackOpen]=useState(false)
    const [workspace,setworkSpace]=useState(null)
   
    const [searchQuery,setSearchQuery]=useState('')
    const [warnModal,setWarnModal]=useState(false)
    const [memberId,setMemberId]=useState('')
    const [refresh,setrefresh]=useState(false)

    React.useEffect(()=>{
      console.log('use Effecttt');
    
        (
          async function(){
            try{
             
             
              const {data}=await axios.get(`/workspace-details/${workspaceId}`)
             
         
              if(!data.err){
                console.log('data',data);
                // setworkSpace(data.workspace)
                console.log('workspaceeee',workspace);

                const filteredMembers = data.workspace.members.filter(member =>
                  member.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const filteredAdmins = data.workspace.admins.filter(admin =>
                  admin.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setworkSpace({
                  members: filteredMembers,
                  admins: filteredAdmins
                });
              
                // alert('success')
              }else{

                console.log(data.workspace);
                console.log('error');

                // alert('error')

               
                
                
                // Navigate('/create-workspace')
              }
    
            }
            catch(err){
    
              console.log(err);
            }
    
          }
        
      
      )()
      
    
    },[searchQuery,workspaceId,refresh])

    const handleSearch = event => {
      setSearchQuery(event.target.value);
    };

    

    const handleDeleteMember = async (memberId)=>{
      try{

        if(!isAdmin){
          setSeverity('warning')
          setMessage('you are not an admin')
          setSnackOpen(true)
          return ;
        }

        
        
        console.log('here delte section');

        const {data}=await axios.delete(`/workspace/${workspaceId}/members/${memberId}`)

        console.log(data);

        if(!data.error){
          setWarnModal(false)
          console.log('sucessssssssssssssssssssssssss');
         setSeverity('success')
         setMessage(data.message)
         setSnackOpen(true)
         setrefresh(!refresh)
          // dispatch({type:'refresh'})
         
        }else{
          setWarnModal(false)
          setSeverity('error')
          setMessage(data.message)
          setSnackOpen(true)
          // alert('errorr')
        }

      }
      catch(err){
        console.log(err,'err');
      }
    }

    if (!workspace) {
      return <div>Loading...</div>;
    }

    console.log('workspace details',workspace);

    const setOpenWarnModal=(id)=>{
      console.log('entered here on wanrn modal');
      setMemberId(id)
      setWarnModal(true)

    }

  return (
    
    <div className='wrapper'>
        <UserSidebar page={'team'}/>
        <UserHeder/>

        <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
              <h5>Your Team</h5>
              <div className="iq-search-bar device-search">
                    <form action="#" className="searchbox">
                      <a className="search-link" href="#">
                        <i>
                          <RiSearch2Line />
                        </i>
                      </a>
                      <input
                        type="text"
                        className="text search-input"
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </form>
                  </div>
              <div className="d-flex align-items-center">                                
                <div className="list-grid-toggle d-flex align-items-center mr-3">
                  <div data-toggle-extra="tab" data-target-extra="#grid" onClick={()=>{settableView(!tableView)}} className={tableView?'active':''}>
                    <div className="grid-icon mr-3">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} />
                      </svg>
                    </div>
                  </div>
                  <div data-toggle-extra="tab" data-target-extra="#list" onClick={()=>{settableView(!tableView)}} className={tableView?'':'active'}>
                    <div className="grid-icon">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1={21} y1={10} x2={3} y2={10} /><line x1={21} y1={6} x2={3} y2={6} /><line x1={21} y1={14} x2={3} y2={14} /><line x1={21} y1={18} x2={3} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>

                {isAdmin?
               <div className="pl-3 border-left btn-new">
               <a onClick={()=>{setModalview(true)}} className="btn btn-primary " data-target="#new-user-modal" data-toggle="modal" style={{color:'white'}}>Invite New user</a>
             </div>:''  
              }

               


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
        tableView?

<div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
<div className="row">

  {
  workspace&&workspace.admins&&workspace.admins.map((admin)=>(

<div className="col-lg-4 col-md-6">
<div className="card-transparent card-block card-stretch card-height">
  <div className="card-body text-center p-0">                            
    <div className="item">
      <div className="odr-img">
        <img src={admin.profile.url} className="img-fluid rounded-circle avatar-90 m-auto" alt="image" />
      </div>                        
      <div className="odr-content rounded">                                          
        <h4 className="mb-2">{admin.name}</h4>
        <p className="mb-3">{admin.email}</p>
        <ul className="list-unstyled mb-3">
          <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4" style={{cursor:'pointer'}} onClick={() => setOpenWarnModal(admin._id)}><RiDeleteBin3Fill  /></li>
          <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4"><RiChat1Line className="ri-chat-3-line m-0" /></li>
          <li className="bg-success-light rounded-circle iq-card-icon-small"><RiPencilFill className="ri-phone-line m-0" /></li>
        </ul>                                    
        <div className="pt-3 border-top">
          <a href="#" className="btn btn-primary">Admin</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  ))
  
  }

{workspace&&workspace.members&&workspace.members.map((member)=>(

<div className="col-lg-4 col-md-6">
<div className="card-transparent card-block card-stretch card-height">
  <div className="card-body text-center p-0">                            
    <div className="item">
      <div className="odr-img">
        <img src={member.profile.url} className="img-fluid rounded-circle avatar-90 m-auto" alt="image" />
      </div>                        
      <div className="odr-content rounded">                                          
        <h4 className="mb-2">{member.name}</h4>
        <p className="mb-3">{member.email}</p>
        <ul className="list-unstyled mb-3">
        <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4" style={{cursor:'pointer'}} onClick={() => setOpenWarnModal(member._id)}><RiDeleteBin3Fill  /></li>
          <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4"><RiChat1Line className="ri-chat-3-line m-0" /></li>
          <li className="bg-success-light rounded-circle iq-card-icon-small"><RiPencilFill className="ri-phone-line m-0" /></li>
        </ul>                                    
        <div className="pt-3 border-top">
          <a href="#" className="btn btn-primary">Member</a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  ))}

 

 
</div>
</div>
:
<div id="list" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
<div className="table-responsive rounded bg-white mb-4">
  <table className="table mb-0 table-borderless tbl-server-info">
    <tbody>
   

   

      {
        workspace.members.map((member)=>
        (
          
      <tr>
      <td>
        <div className="media align-items-center">
          <img src={member.profile.url} className="img-fluid rounded-circle avatar-40" alt="image" />
          <h5 className="ml-3">{member.name}</h5>
        </div>
      </td>
      <td>{member.email}</td>
      <td>
      <div className="media align-items-center">
            <div  className="bg-secondary-light rounded-circle iq-card-icon-small mr-3"  onClick={() => setOpenWarnModal(member._id)}><RiDeleteBin3Fill className="ri-mail-open-line m-0" /></div>
            <div className="bg-primary-light rounded-circle iq-card-icon-small mr-3"><RiChat1Line className="ri-chat-3-line m-0" /></div>
            <div className="bg-success-light rounded-circle iq-card-icon-small"><RiPencilFill className="ri-phone-line m-0" /></div>
          </div>
      </td>
      <td>
        <a href="#" className="btn btn-primary">Member</a>
      </td>
    
    </tr>

        ))
      }

{
        workspace.admins.map((admin)=>
        (
          
      <tr>
      <td>
        <div className="media align-items-center">
          <img src={admin.profile.url} className="img-fluid rounded-circle avatar-40" alt="image" />
          <h5 className="ml-3">{admin.name}</h5>
        </div>
      </td>
      <td>{admin.email}</td>
      <td>
      <div className="media align-items-center">
            <div  className="bg-secondary-light rounded-circle iq-card-icon-small mr-3"  onClick={() => setOpenWarnModal(admin._id)}><RiDeleteBin3Fill className="ri-mail-open-line m-0" /></div>
            <div className="bg-primary-light rounded-circle iq-card-icon-small mr-3"><RiChat1Line className="ri-chat-3-line m-0" /></div>
            <div className="bg-success-light rounded-circle iq-card-icon-small"><RiPencilFill className="ri-phone-line m-0" /></div>
          </div>
      </td>
      <td>
        <a href="#" className="btn btn-primary">Admin</a>
      </td>
    
    </tr>

        ))
      }

      


     
     
    </tbody>
  </table>
</div> 
</div>

    }
   
    {/* Page end  */}
  </div>
        </div>
        {console.log(snackOpen,'sanckopennnnn ')}

        


      {
        modalview===true&&<InviteUserModal modalview={modalview} setModalview={setModalview}/>
      }


       {
       
        snackOpen && <SnackBar severity={severity} message={message} snackOpen={snackOpen} setSnackOpen={setSnackOpen}  />
       }


      <Dialog
        open={warnModal}
        onClose={()=>{setWarnModal(!warnModal)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure Do You Want To Delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are You Sure Do You Want to Delete This Member 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setWarnModal(!warnModal)}}>cancel</Button>
          <Button onClick={() => handleDeleteMember(memberId)} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    
      
    </div>
  )
}

export default UserTeam
