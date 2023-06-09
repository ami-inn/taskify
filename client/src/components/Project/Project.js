import React, { Fragment, useEffect, useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import NewProject from './NewProject'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RiArrowRightSFill, RiCheckDoubleFill, RiDeleteBin2Fill, RiDeleteBin7Fill, RiEdit2Fill, RiEditBoxFill, RiSearch2Line, RiStarFill } from 'react-icons/ri'
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import SnackBar from '../SnackBar/SnackBar'
import { Link, useNavigate } from 'react-router-dom'
import CircleProgress from '../CricleProgress/CircleProgress'
import Nodata from '../../styles/Nodata.module.css'
import buttonCss from '../../styles/Buttons.module.css'
import EditProject from './EditProject'


function Project() {
  const workspaceId = useSelector((state)=>state.currentWorkspace)
  const user=useSelector((state)=>{return state.user.details})
  const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
  const isAdmin = currentWorkspace?.admins?.includes(user._id)
  const navigate=useNavigate()



    const [modalview,setModalview]=useState(false)
    const [project,setProject] = useState([])
    const [refresh,setrefresh]=useState(false)
    const [warnModal,setWarnModal]=useState(false)
    const [projectId,setProjectId] = useState('')
    const [severity, setSeverity] = useState('');
    const [message, setMessage] = useState('');
    const [snackOpen,setSnackOpen]=useState(false)
    const [searchQuery,setSearchQuery]=useState('')
    const [success,setSuccess]=useState(false)
    const [editmodalview,seteditmodalView]=useState(false)
    const [selectedProject,setSelectedProject]=useState(null)
    const [getproject,setgetproject]=useState(true)
    const [open,setOpen]=useState(false)


    const [sidebarShow, setsidebarShow] = useState(false);

    const handleButtonClick = () => {
      setsidebarShow(!sidebarShow);
    };

    console.log(modalview);


    useEffect(()=>{
        console.log('use effect');
        fetchProjects()
    },[refresh,success])




    const fetchProjects = async () =>{
        console.log('her to fetch');
        try{

            const response = await axios.get(`/workspace-projects/${workspaceId}`)

            if(response.data.error){
                console.log('err');
                // alert('error')
            }else{
                console.log(response.data);
                const {workspace}=response.data
                setProject(workspace.projects)
                setgetproject(false)
                
            }

        }
        catch(err){
            console.log(err);
            console.log('errorrrrrr');
        }
    }
    console.log('projects',project);
    
    const handleDelete= async(projectId)=>{
      console.log('handleDelete');
      setOpen(true)
      setWarnModal(false)
      try{
        const response = await axios.delete(`/projects/${projectId}`,{data:{userId:user._id}})

        if(response.data.error){
          setOpen(false)

          setSeverity('error')
          setMessage(response.data.message)
          setSnackOpen(true)
        }else{
          setOpen(false)
          setWarnModal(false)
          console.log('sucessssssssssssssssssssssssss');
         setSeverity('success')
         setMessage(response.data.message)
         setSnackOpen(true)
         setrefresh(!refresh)
        }

      }
      catch(err){
        console.log('error','delete project error');
      }
    }

    const setOpenWarnModal=(id)=>{
      console.log('entered here on wanrn modal');
      setProjectId(id)
      setWarnModal(true)

    }

    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredProjects = project.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenProject=(projectId)=>{
      console.log(projectId);
      const singleproject = project.find((p)=>p._id===projectId)

      if(singleproject){
        // const isUser=singleproject.members.includes(user._id)
        const isCreator=singleproject.creator._id===user._id

        const isUser = singleproject.members.some((member) => member._id === user._id);

        if(isUser || isCreator){
          navigate(`/project/${projectId}`)

        }else{
          setSnackOpen(true)
          setSeverity('error')
          setMessage('you are not a member in this project')

        }


        console.log('is creator',isCreator);

        console.log('isuser',isUser);
      }
    }

    const handleOpenEditModal = (project)=>{

      // if(!isAdmin){
      //   setSeverity('warning')
      //   setMessage('you are not an admin')
      //   setSnackOpen(true)
      //   return ;
      // }
    console.log('creatooror',project.creator._id);
      if(project.creator._id.toString()=== user._id){
        setSelectedProject(project)
        seteditmodalView(true)
        return ;

      }else{
        setSeverity('warning')
        setMessage('you are not the creator')
        setSnackOpen(true)

      }

      console.log('entee here on');
    
    }



   


  return (

    <div  className={`${modalview||editmodalview===true?'modal-open ':''} `} style={modalview||editmodalview ? { display: 'block', paddingRight: '4px' } : {}}>
      <div className={`${sidebarShow?'sidebar-main':''}`}>

    <div className='wrapper'>

  

        
<UserSidebar onsideViewClick={handleButtonClick} page={'project'}/>
<UserHeder onsideViewClick={handleButtonClick}/>




<div className="content-page">
<div className="container-fluid">
<div className="row">
 <div className="col-lg-12">
   <div className="card">
     <div className="card-body ">
       <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
         <h5>Your Projects</h5>
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
         <div className="d-flex flex-wrap align-items-center justify-content-between">
      
           {/* <div className="dropdown status-dropdown mr-3">
             <div className="dropdown-toggle" id="dropdownMenuButton03" data-toggle="dropdown">
               <div className="btn bg-body"><span className="h6">Status :</span> In Progress<i className="ri-arrow-down-s-line ml-2 mr-0" /></div>
             </div>
             <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton03">
               <a className="dropdown-item" href="#"><i className="ri-mic-line mr-2" />In Progress</a>
               <a className="dropdown-item" href="#"><i className="ri-attachment-line mr-2" />Priority</a>
               <a className="dropdown-item" href="#"><i className="ri-file-copy-line mr-2" />Category</a> 
             </div>
           </div> */}
    
           <div className="pl-3 border-left btn-new">
            {isAdmin? <button onClick={()=>{setModalview(true)}} className={`${buttonCss.customBtn} ${buttonCss.btn2}`}  data-target="#new-project-modal" data-toggle="modal">Create</button>:''}
            
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>

    {
          getproject===false?'':
          
          <Backdrop
          sx={{ color: '#a7cafc',background:'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }

{project?.length===0 && getproject===false?


<div className={Nodata.emptyState}>
  <div className={Nodata.emptyStateContent}>
    <div className={Nodata.emptyStateIcon}>
      <img src="https://t4.ftcdn.net/jpg/04/75/01/23/240_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" alt="" />
    </div>
    <div className={Nodata.emptyStateMessage}>No Project has been added yet.</div>
    <div className={Nodata.emptyStateHelp}>
      Add a new Project by simpley clicking the button on top right side.
    </div>
  </div>
</div>







:

<div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
 <div className="row">

 {filteredProjects.map((project)=>(

  
  <div className="col-lg-4 col-md-6"  >
<div className="card box-shadow-1 card-block card-stretch card-height">
<div className="card-body">
<div className="d-flex align-items-center justify-content-between mb-4">
<CircleProgress project={project}/>
{/*  
 <svg version="1.1" width="100" height="100" viewBox="0 0 100 100" class="circle-progress"><circle class="circle-progress-circle" cx="50" cy="50" r="47" fill="none" stroke="#ddd" stroke-width="8"></circle><path d="M 50 3 A 47 47 0 0 1 97 50" class="circle-progress-value" fill="none" stroke="#00E699" stroke-width="8"></path><text class="circle-progress-text" x="50" y="50" font="16px Arial, sans-serif" text-anchor="middle" fill="#999" dy="0.4em">25%</text></svg> */}
 <div style={{display:'flex', gap:'20px'}}>


  <div className='project-icon-box'>

    <div className='project-delete-icon '>
 <RiDeleteBin7Fill onClick={() => setOpenWarnModal(project._id)} className="m-0"></RiDeleteBin7Fill>

    </div>

  </div>

  <div className='project-icon-box' >

<div className='project-edit-icon ' onClick={()=>handleOpenEditModal(project)}>

<RiEditBoxFill  className="m-0" ></RiEditBoxFill>

</div>

</div>


{project.status === 'completed'?
<div className='project-icon-box' >

<div className='project-complete-icon ' onClick={()=>handleOpenEditModal(project)}>

<RiCheckDoubleFill  className="m-0" ></RiCheckDoubleFill>

</div>

</div>
:''
}






 </div>
 </div>
<h5 className=" project-heading mb-1">{project.name}</h5>
<p className=" project-description mb-3">{project.description}</p>

<a onClick={()=>{handleOpenProject(project._id)}} className='project-open' style={{cursor:'pointer'}}>Open Project <RiArrowRightSFill/></a>

<div className="d-flex align-items-center justify-content-between pt-3 border-top">
 <div className="iq-media-group">

   {project.members.map((member)=>(
     <a href="#" className="iq-media">
    <img className="img-fluid avatar-40 rounded-circle" src={member.profile.url} alt />
    </a>
   ))}
     <a href="#" className="iq-media">
    <img className="img-fluid avatar-40 rounded-circle" src={project.creator.profile.url} alt />
    </a>

  
  
 </div>
 <a className={`btn btn-white  link-shadow ${
    project.priority === 'low' ? 'low-priority' : project.priority === 'medium' ? 'medium-priority' : 'high-priority'
  }`} >{project.priority} </a>
</div>
</div>
</div>
</div>




 ))}

  
  
 </div>
</div>

}


{/* Page end  */}
</div>
</div>









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
     Are You Sure Do You Want to Delete This Project 
     </DialogContentText>
   </DialogContent>
   <DialogActions>
     <Button onClick={()=>{setWarnModal(!warnModal)}}>cancel</Button>
     <Button onClick={() => handleDelete(projectId)} autoFocus>
       Accept
     </Button>
   </DialogActions>
 </Dialog>

 
 {
  
  snackOpen && <SnackBar severity={severity} message={message} snackOpen={snackOpen} setSnackOpen={setSnackOpen}  />
 }
 
    </div>

</div>
{
modalview===true && <NewProject modalview={modalview} setModalview={setModalview} success={success} setSuccess={setSuccess} />
}
{
editmodalview===true && <EditProject selectedProject={selectedProject} editmodalview={editmodalview} seteditmodalView={seteditmodalView} success={success} setSuccess={setSuccess} />
}

{modalview||editmodalview?<div class="modal-backdrop fade show"></div>:''}

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>

    </div>


  )
}

export default Project
