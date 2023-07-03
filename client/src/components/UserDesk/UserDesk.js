import React, { useEffect, useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RiCalendar2Fill } from 'react-icons/ri';
import LineProgress from '../LineProgress/LineProgress';

function UserDesk() {

    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const user=useSelector((state)=>{return state.user.details})


    const [refresh,setrefresh]=useState(false)
    const [desk,setDesk]=useState(null)
    const [projects,setProject]=useState([])

    



    
    useEffect(()=>{
        console.log('use effect');
        fetchDesk()
    },[refresh])




    const fetchDesk = async () =>{
        console.log('her to fetch');
        try{

            const response = await axios.get('/desk', {
                params: {
                  workspaceId: workspaceId,
                  userId: user._id,
                },
              });

            if(response.data.error){
                console.log(response.data);
                alert('error')
            }else{
                console.log(response.data,'responsee desk dataaaa' );
                setDesk(response.data.workspace)
                setProject(response.data.workspace.projects)
            
                
            }

        }
        catch(err){
            console.log(err);
            console.log('errorrrrrr');
        }
    }

    console.log('desk',desk);
    console.log('projects',projects);

    const completedProjects = desk?.projects.filter((project) => project.status === 'completed');
    const pendingProjects = desk?.projects.filter((project) => project.status === 'pending');



  return (
    <div className='wrapper'>

        <UserSidebar page={'desk'}/>
        <UserHeder/>


         
    <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
              <h5>Desk</h5>
              {/* <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="dropdown status-dropdown mr-3">
                  <div className="dropdown-toggle" id="dropdownMenuButton03" data-toggle="dropdown">
                    <div className="btn bg-body"><span className="h6">Status :</span> In Progress<i className="ri-arrow-down-s-line ml-2 mr-0" /></div>
                  </div>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton03">
                    <a className="dropdown-item" href="#"><i className="ri-mic-line mr-2" />In Progress</a>
                    <a className="dropdown-item" href="#"><i className="ri-attachment-line mr-2" />Priority</a>
                    <a className="dropdown-item" href="#"><i className="ri-file-copy-line mr-2" />Category</a> 
                  </div>
                </div>
                <div className="list-grid-toggle d-flex align-items-center mr-3">
                  <div data-toggle-extra="tab" data-target-extra="#grid" className="active">
                    <div className="grid-icon mr-3">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} />
                      </svg>
                    </div>
                  </div>
                  <div data-toggle-extra="tab" data-target-extra="#list">
                    <div className="grid-icon">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1={21} y1={10} x2={3} y2={10} /><line x1={21} y1={6} x2={3} y2={6} /><line x1={21} y1={14} x2={3} y2={14} /><line x1={21} y1={18} x2={3} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pl-3 btn-new border-left">
                  <a href="#" className="btn btn-primary" data-target="#new-project-modal" data-toggle="modal">New Project</a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
      <div className="row">
        
      <div className="col-lg-3">
          <div className="card-transparent mb-0 desk-info">
            <div className="card-body p-0">                           
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">                           
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Tasks  ( Pendings to you )</h5>
                        <div className="dropdown">
                          <span className="dropdown-toggle py-2" id="dropdownMenuButton04" data-toggle="dropdown">
                            <i className="ri-more-fill" />
                          </span>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton04">
                            <a className="dropdown-item" href="#"><i className="ri-file-copy-2-line mr-2" />Duplicate</a>
                            <a className="dropdown-item" href="#"><i className="ri-edit-2-line mr-2" />Rename</a>
                            <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line mr-2" />Delete</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">

{
    projects.map((project)=>(


        <div>

   {/* {project.tasks.map((task)=>(
               
     
            ))}  */}

{
    project.tasks.length>0?'':''
}
{project.tasks
.filter((task) =>  task.assigneeId === user._id && (task.status === 'assigned' || task.status === 'pending'|| task.approvalStatus===false ))
.map((task) => (
<div className="card"> 
<div className="card-body">
 
  <h6 className="mb-3"><span style={{fontWeight:'bold',textTransform:'capitalize'}}>project</span> : {project.name}</h6>
  <h5 className="mb-3" style={{fontWeight:'bold',textTransform:'capitalize'}}>task : {task.name}</h5>
  <p className="mb-3" style={{textTransform:'capitalize', fontFamily: "'Poppins', sans-serif"}}><RiCalendar2Fill className="las la-calendar-check mr-2" />Due-Date : <span style={{color:'#f24141'}}>{new Date(task.dueDate  ).toLocaleDateString("en-CA")}</span>  </p>
  <p className="mb-3"  style={{textTransform:'capitalize', fontFamily: "'Poppins', sans-serif"}}><RiCalendar2Fill className="las la-calendar-check mr-2" />Completed: <span style={{color:'#018c50'}}>{task.completedAt ? new Date(task.completedAt).toLocaleDateString("en-CA") : 'not done'}</span></p>

  <div className="iq-progress-bar bg-warning-light mb-4">
    <span className="bg-warning iq-progress progress-1" data-percent={100} style={{transition: 'width 2s ease 0s', width: '50%'}} />
  </div>
  <div className="d-flex align-items-center justify-content-between">
    <div className="iq-media-group">
      <a href="#" className="iq-media">
        <img src={user.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
      </a>
     
    </div>
    <div>
      <a href="#" className="btn bg-secondary-light">{project.category}</a>
    </div>
  </div>
</div>
</div>
))}



        </div>




    
    
    ))
}



</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card-transparent mb-0 desk-info">
            <div className="card-body p-0">                           
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">                           
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Tasks  ( completed By you )</h5>
                        <div className="dropdown">
                          <span className="dropdown-toggle py-2" id="dropdownMenuButton04" data-toggle="dropdown">
                            <i className="ri-more-fill" />
                          </span>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton04">
                            <a className="dropdown-item" href="#"><i className="ri-file-copy-2-line mr-2" />Duplicate</a>
                            <a className="dropdown-item" href="#"><i className="ri-edit-2-line mr-2" />Rename</a>
                            <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line mr-2" />Delete</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">

                    {
                        projects.map((project)=>(


                            <div>

                       {/* {project.tasks.map((task)=>(
                                   
                         
                                ))}  */}


                {project.tasks
                .filter((task) => task.completedBy === user._id)
                .map((task) => (
                    <div className="card"> 
                    <div className="card-body">
                     
                      <h5 className="mb-3" style={{fontWeight:'bold',textTransform:'capitalize'}}>project : {project.name}</h5>
                      <h5 className="mb-3" style={{fontWeight:'bold',textTransform:'capitalize'}}>task : {task.name}</h5>
                      <p className="mb-3" style={{textTransform:'capitalize', fontFamily: "'Poppins', sans-serif"}}><RiCalendar2Fill className="las la-calendar-check mr-2" />Due-Date : <span style={{color:'#f24141'}}>{new Date(task.dueDate  ).toLocaleDateString("en-CA")}</span>  </p>
  <p className="mb-3"  style={{textTransform:'capitalize', fontFamily: "'Poppins', sans-serif"}}><RiCalendar2Fill className="las la-calendar-check mr-2" />Completed: <span style={{color:'#018c50'}}>{task.completedAt ? new Date(task.completedAt).toLocaleDateString("en-CA") : 'not done'}</span></p>
                      <div className="iq-progress-bar bg-secondary-light mb-4">
                        <span className="bg-success iq-progress progress-1" data-percent={100} style={{transition: 'width 2s ease 0s', width: '100%'}} />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="iq-media-group">
                          <a href="#" className="iq-media">
                            <img src={user.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
                          </a>
                         
                        </div>
                        <div>
                          <a href="#" className="btn bg-primary-light">{project.category}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                            </div>




                        
                        
                        ))
                    }

               
              
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="col-lg-3">
          <div className="card-transparent mb-0 desk-info">
            <div className="card-body p-0">                           
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">                           
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Project In Progress ( {pendingProjects?.length} /{desk?.projects.length} )</h5>
                        <div className="dropdown">
                          <span className="dropdown-toggle py-2" id="dropdownMenuButton05" data-toggle="dropdown">
                            <i className="ri-more-fill" />
                          </span>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton05">
                            <a className="dropdown-item" href="#"><i className="ri-file-copy-2-line mr-2" />Duplicate</a>
                            <a className="dropdown-item" href="#"><i className="ri-edit-2-line mr-2" />Rename</a>
                            <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line mr-2" />Delete</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                    {pendingProjects?.map((project)=>(

                 
                  <div className="card">
                    <div className="card-body"> 
                      <h5 className="mb-3" style={{fontWeight:'bold',textTransform:'capitalize'}}>project : {project.name}</h5>
                      <div className='d-flex'>
                      <p className="mb-3"><i className="las la-calendar-check mr-2" />Due-Date :  {new Date(project.dueDate  ).toLocaleDateString("en-CA")}</p>
                      {/* <p className="mb-3"><i className="las la-calendar-check mr-2" />02 / 02 / 2021</p> */}
                        
                      </div>
                      <LineProgress project={project}/>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="iq-media-group">
                            
                          <a href="#" className="iq-media">
                            <img src={project.creator.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
                          </a>
                          {
                            project.members.map((member)=>(
                                <a href="#" className="iq-media">
                            <img src={member.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
                          </a>

                                
                            ))
                          }
                          
                         
                        </div>
                        <div>
                          <a href="#" className="btn bg-success-light">{project.category}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                     ))}
             
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="col-lg-3">
          <div className="card-transparent mb-0 desk-info">
            <div className="card-body p-0">                           
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">                           
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Project Compeleted ({completedProjects?.length}/{desk?.projects.length } )</h5>
                        <div className="dropdown">
                          <span className="dropdown-toggle py-2" id="dropdownMenuButton06" data-toggle="dropdown">
                            <i className="ri-more-fill" />
                          </span>
                          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton06">
                            <a className="dropdown-item" href="#"><i className="ri-file-copy-2-line mr-2" />Duplicate</a>
                            <a className="dropdown-item" href="#"><i className="ri-edit-2-line mr-2" />Rename</a>
                            <a className="dropdown-item" href="#"><i className="ri-delete-bin-5-line mr-2" />Delete</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">

                    {completedProjects?.map((project)=>(

                         <div className="card">
                         <div className="card-body"> 
                           <h5 className="mb-3" style={{fontWeight:'bold',textTransform:'capitalize'}}>Project : {project.name}</h5>
                           <p className="mb-3"><i className="las la-calendar-check mr-2" />Due-Date :  {new Date(project.dueDate  ).toLocaleDateString("en-CA")}</p>
                           <div className="d-flex align-items-center justify-content-between">
                           <div className="iq-media-group">
                            
                            <a href="#" className="iq-media">
                              <img src={project.creator.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
                            </a>
                            {
                              project.members.map((member)=>(
                                  <a href="#" className="iq-media">
                              <img src={member.profile.url} className="img-fluid avatar-40 rounded-circle" alt />
                            </a>
  
                              ))
                            }

                            
                           
                          </div>
                             <div>
                               <a href="#" className="btn bg-secondary-light">{project.category}</a>
                             </div>
                           </div>
                         </div>
                       </div>

                    ))}

                 

              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Page end  */}
  </div>
</div>

      
    </div>
  )
}

export default UserDesk
