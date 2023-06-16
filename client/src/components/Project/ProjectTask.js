import React, { useEffect, useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import CreateTask from './CreateTask'
import { RiAlignJustify, RiEditBoxLine, RiEye2Fill, RiEyeFill, RiSurveyLine } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function ProjectTask() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [newTaskModal,setNewTaskModal] = useState(false)
    const [tasks,setTasks]=useState([])
    const [colapseShowId,setColapseShowId]=useState(false)

    // const midpoint=Math.ceil(tasks.subtasks.length / 2)

    // const subtasksFirsthalf=tasks.subtasks.slice(0,midpoint)
    // const subtasksSecondhalf=tasks.subtasks.slice(midpoint)

    useEffect(()=>{
      fetchProjectDetails();
    },[id])

    const handleModalToggle = (colapseShowId) => {
      setColapseShowId((prevId) => (prevId === colapseShowId ? null : colapseShowId));
    };
    
    const fetchProjectDetails= async ()=>{
      try{

        const response = await axios.get(`/projectTask/${id}`)

        if(response.data.error){
          alert('error')
          navigate('/projects')
        }else{
          setTasks(response.data.project.tasks)
        }
        
      }
      catch(err){
        console.log('error');

      }
    }

    console.log(tasks,'taskssss');


  return (
    <wrapper className={` ${newTaskModal===true?'outwrap modal-open':''}`} style={newTaskModal ? { display: 'block', paddingRight: '4px' } : {}}>

    
    <div className='wrapper'>
        
        <UserSidebar page={'project'}/>
        <UserHeder/>
       <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
              <h5>Your Task</h5>
              <div className="d-flex flex-wrap align-items-center">
                <div className="dropdown dropdown-project mr-3">
                  <div className="dropdown-toggle" id="dropdownMenuButton03" data-toggle="dropdown">
                    <div className="btn bg-body"><span className="h6">Project :</span> webkit Project<i className="ri-arrow-down-s-line ml-2 mr-0" /></div>
                  </div>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton03">
                    <a className="dropdown-item" href="#"><i className="ri-mic-line mr-2" />In Progress</a>
                    <a className="dropdown-item" href="#"><i className="ri-attachment-line mr-2" />Priority</a>
                    <a className="dropdown-item" href="#"><i className="ri-file-copy-line mr-2" />Category</a> 
                  </div>
                </div>
                <a onClick={()=>{setNewTaskModal(true)}} className="btn btn-primary" data-target="#new-task-modal" data-toggle="modal">New Task</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">

              {

                tasks.map((task)=>(

                  <div className="col-lg-12">
                  <div className="card card-widget task-card">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          {/* <div className="custom-control custom-task custom-checkbox custom-control-inline">
                            <input type="checkbox" className="custom-control-input" id="customCheck01" />
                            <label className="custom-control-label" htmlFor="customCheck01" />
                          </div> */}
                          <div>
                            <h5 className="mb-2">{task.name}</h5>
                            <div className="media align-items-center">
                              <div className="btn bg-body mr-3"><RiAlignJustify className="ri-align-justify mr-2" />5/10</div>
                              <div className="btn bg-body"><RiSurveyLine className="ri-survey-line mr-2" />3</div>
                            </div>
                          </div>
                        </div>
                        <div className="media align-items-center mt-md-0 mt-3">
                          <a  className="btn bg-secondary-light mr-3">{task.priority}</a>
                          <a className="btn bg-secondary-light" onClick={()=>{handleModalToggle(task._id)}} data-toggle="collapse"  role="button" aria-expanded="false" aria-controls="collapseEdit1"><RiEyeFill className="ri-edit-box-line m-0" /></a>
                        </div>
                      </div>  
                    </div>
                  </div>  

                

                  <div className={`collapse ${colapseShowId===task._id?'show':''}`} id="collapseEdit1">                                            
                    <div className="card card-list task-card">
                      <div className="card-header d-flex align-items-center justify-content-between px-0 mx-3">
                        <div className="header-title">
                          <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" className="custom-control-input" id="customCheck05" disabled />
                            <label className="custom-control-label h5" htmlFor="customCheck05">Task Status</label>
                          </div>
                        </div>
                        <div><a  className={`btn  ${task.completed?'bg-success-light': 'bg-secondary-light'}`}>{task.completed?'completed':'not completed'}</a></div>
                      </div>
                      <div className="card-body">
                        <div className="form-group mb-3 position-relative">
                          <input type="text" className="form-control bg-white" placeholder="Design landing page of webkit" />
                          <a href="#" className="task-edit task-simple-edit text-body"><i className="ri-edit-box-line" /></a>
                        </div>
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group mb-0">
                                  <label htmlFor="exampleInputText2" className="h5">Assigned To </label>
                                  <select name="type" className="selectpicker form-control" data-style="py-0" disabled>
                                  
                                    <option>{task.assigneeId.name}</option>
                                   
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group mb-0">
                                  <label htmlFor="exampleInputText3" className="h5">Due Date</label>
                             
                                  <input type="date" className="form-control" disabled id="exampleInputText3" defaultValue={new Date(task.dueDate).toLocaleDateString('en-CA')}   />
                                </div>                        
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div className="card mb-3">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-6">                                                        
                                <h5 className="mb-2">Description</h5>
                                <p className="mb-0">{task.description}</p>
                              </div>
                              <div className="col-lg-6">                                      
                                <h5 className="mb-2">Checklist</h5>
                                <div className="row">
                                  <div className="col-lg-12">

                                    {
                                      task.subtasks.map((subtask)=>(

                                        <div className="custom-control custom-checkbox custom-control-inline mr-3">
                                        <input disabled type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label mb-1" htmlFor="customCheck1">  {subtask.name} </label>
                                      </div>
                                  

                                      ))
                                    }

                               
                                   
                                  </div>
                                  {/* <div className="col-lg-6">

                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                      <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                      <label className="custom-control-label mb-1" htmlFor="customCheck1">Design mobile version</label>
                                    </div>

  

                                  </div> */}
                                </div>                       
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div className="form-group mb-0">
                          <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                          <div className="custom-file">
                            {/* <input type="file" className="custom-file-input" id="inputGroupFile001" />
                            <label className="custom-file-label" htmlFor="inputGroupFile001">Upload media</label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>   

                </div>

                ))
                
              }


            

             
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Page end  */}
  </div>
       </div>




      
    </div>

    {
        newTaskModal===true && <CreateTask newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal} projectId={id}/>
    }

    </wrapper>
  )
}

export default ProjectTask
