import React, { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import CreateTask from './CreateTask'
import { RiAlignJustify, RiEditBoxLine, RiSurveyLine } from 'react-icons/ri'

function ProjectTask() {
    const [newTaskModal,setNewTaskModal] = useState(false)
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


              <div className="col-lg-12">
                <div className="card card-widget task-card">
                  <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="custom-control custom-task custom-checkbox custom-control-inline">
                          <input type="checkbox" className="custom-control-input" id="customCheck01" />
                          <label className="custom-control-label" htmlFor="customCheck01" />
                        </div>
                        <div>
                          <h5 className="mb-2">Design landing page of webkit</h5>
                          <div className="media align-items-center">
                            <div className="btn bg-body mr-3"><RiAlignJustify className="ri-align-justify mr-2" />5/10</div>
                            <div className="btn bg-body"><RiSurveyLine className="ri-survey-line mr-2" />3</div>
                          </div>
                        </div>
                      </div>
                      <div className="media align-items-center mt-md-0 mt-3">
                        <a href="#" className="btn bg-secondary-light mr-3">Design</a>
                        <a className="btn bg-secondary-light" data-toggle="collapse" href="#collapseEdit1" role="button" aria-expanded="false" aria-controls="collapseEdit1"><RiEditBoxLine className="ri-edit-box-line m-0" /></a>
                      </div>
                    </div>  
                  </div>
                </div>                                                                                                        
                <div className="collapse" id="collapseEdit1">                                            
                  <div className="card card-list task-card">
                    <div className="card-header d-flex align-items-center justify-content-between px-0 mx-3">
                      <div className="header-title">
                        <div className="custom-control custom-checkbox custom-control-inline">
                          <input type="checkbox" className="custom-control-input" id="customCheck05" />
                          <label className="custom-control-label h5" htmlFor="customCheck05">Mark as done</label>
                        </div>
                      </div>
                      <div><a href="#" className="btn bg-secondary-light">Design</a></div>
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
                                <label htmlFor="exampleInputText2" className="h5">Memebers</label>
                                <select name="type" className="selectpicker form-control" data-style="py-0">
                                  <option>Memebers</option>
                                  <option>Kianna Septimus</option>
                                  <option>Jaxson Herwitz</option>
                                  <option>Ryan Schleifer</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-0">
                                <label htmlFor="exampleInputText3" className="h5">Due Dates*</label>
                                <input type="date" className="form-control" id="exampleInputText3" defaultValue />
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
                              <p className="mb-0">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                            </div>
                            <div className="col-lg-6">                                      
                              <h5 className="mb-2">Checklist</h5>
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label mb-1" htmlFor="customCheck1">Design mobile version</label>
                                  </div>
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck02" />
                                    <label className="custom-control-label mb-1" htmlFor="customCheck02">Use images of unsplash.com</label>
                                  </div>
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">Vector images of small size.</label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck04" />
                                    <label className="custom-control-label mb-1" htmlFor="customCheck04">Design mobile version of landing page</label>
                                  </div>
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck5" />
                                    <label className="custom-control-label mb-1" htmlFor="customCheck5">Use images of unsplash.com</label>
                                  </div>
                                  <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                    <input type="checkbox" className="custom-control-input" id="customCheck06" />
                                    <label className="custom-control-label" htmlFor="customCheck06">Vector images of small size..</label>
                                  </div>
                                </div>
                              </div>                       
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-0">
                        <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                        <div className="custom-file">
                          <input type="file" className="custom-file-input" id="inputGroupFile001" />
                          <label className="custom-file-label" htmlFor="inputGroupFile001">Upload media</label>
                        </div>
                      </div>
                    </div>
                  </div>
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

    {
        newTaskModal===true && <CreateTask newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal}/>
    }

    </wrapper>
  )
}

export default ProjectTask
