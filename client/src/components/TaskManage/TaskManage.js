import React, { useEffect, useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import { RiAlignJustify, RiArrowDownSLine, RiEditBoxFill, RiEditBoxLine, RiSurveyLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SnackBar from '../SnackBar/SnackBar'
import Nodata from '../../styles/Nodata.module.css'
import { useTheme } from '@emotion/react'
// import UserSidebar from '../UserSidebar/UserSidebar'
// import UserHeder from '../UserHeader/UserHeder'
// import NewTask from './NewTask'

function TaskManage() {


  const workspaceId = useSelector((state)=>state.currentWorkspace)
  const user=useSelector((state)=>{return state.user.details})
  const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
  


  const [assignedTasks,setAssignedTasks]=useState([])
  const [showTask,setShowTask]=useState(false)
  const [colapseShowId, setColapseShowId] = useState(false);
  const [taskStatus, setTaskStatus] = useState({});
  const [completedTasks, setCompletedTasks] = useState([]);
  const [refresh,setRefresh]=useState(false)
  const [snackOpen,setSnackOpen]=useState(false)
  const [severity,setSeverity]=useState('')
  const [message,setMessage]=useState('')
  const [showfilter,setShowFilter]=useState(false)
  const [selectedPriority, setSelectedPriority] = useState('');


  useEffect(()=>{

    fetchAssignedTasks()

  },[refresh,selectedPriority])

  const handleModalToggle = (colapseShowId) => {
    setColapseShowId((prevId) =>
      prevId === colapseShowId ? null : colapseShowId
    );
  };

  const fetchAssignedTasks=async ()=>{

    console.log('enterr hereee');
    try{

      console.log('enterrrr');

    

      const response = await axios.get('/assigned-tasks',{params:{userId:user._id,workspaceId}})

      if(response.data.error){
        alert('error')
      }else{
        // let filteredTasks = response.data.tasks;
        // console.log('filtered tasks' , filteredTasks);
        // console.log(selectedPriority,'sdhfsdhfjkhyy');
        // if (selectedPriority !== 'All') {
        //   filteredTasks = filteredTasks.filter(task => task.priority === selectedPriority);
        // }
        setAssignedTasks(response.data.tasks);
      }
    }
    catch(err){
      console.log('error');
    }
  }
  // const handleTaskCheckboxChange = (taskId, completed) => {
  //   // Update the completed status of the task locally
  //   const updatedTasks = assignedTasks.map((task) => {
  //     if (task._id === taskId) {
  //       return { ...task, completed };
  //     }
  //     return task;
  //   });
  //   setAssignedTasks(updatedTasks);
  // };

  const handleTaskCheckboxChange = (taskId, completed) => {

    console.log('completeddddd',completed);
    // Update the completed status of the task and its subtasks locally
    const updatedTasks = assignedTasks.map((task) => {
      if (task._id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          return { ...subtask, completed };
        });
        return { ...task, completed, subtasks: updatedSubtasks };
      }
      return task;
    });

    setAssignedTasks(updatedTasks);
  };

  const handleMarkAsDone = async ()=>{
    try{
      console.log('enter hereee');
      // const updatedTasks = assignedTasks.filter((task)=>task.completed)
      
      const updatedTasks = assignedTasks.map((task) => {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          return { ...subtask, completed: task.completed};
        });
        return { ...task,  subtasks: updatedSubtasks };
      });
      console.log(updatedTasks);
      const response = await axios.put('/update-task',{tasks:updatedTasks})


      if(response.data.error){
        setSnackOpen(true)
        setSeverity('error')
        setMessage(response.data.message)
      }else{
        setRefresh(!refresh)
        setSnackOpen(true)
        setSeverity('success')
        setMessage(response.data.message)
      }

    }
    catch(err){
      console.log('error');
    }
  }
  console.log('tasks',assignedTasks);

  // console.log('assignpri',selectedPriority);

   
  return (
   <div className='wrapper'>

    <UserSidebar page={'tasks'}/>
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
                <div className={`dropdown dropdown-project mr-3 ${showfilter?'show':''}`}>
                  <div className="dropdown-toggle" id="dropdownMenuButton03" data-toggle="dropdown">
                    <div className="btn bg-body"><span className="h6">Task :</span> filter<RiArrowDownSLine onClick={()=>{setShowFilter(!showfilter)}} className="ri-arrow-down-s-line ml-2 mr-0" /></div>
                  </div>
                  <div className={`dropdown-menu dropdown-menu-right ${showfilter?'show':''}`} aria-labelledby="dropdownMenuButton03">
                    <a className="dropdown-item" ><i className="ri-mic-line mr-2" onClick={()=>setSelectedPriority('')} />All</a>
                    <a className="dropdown-item" ><i className="ri-attachment-line mr-2"  onClick={()=>setSelectedPriority('medium')} />Medium</a>
                    <a className="dropdown-item" ><i className="ri-file-copy-line mr-2" onClick={()=>setSelectedPriority('high')} />High</a> 
                    <a className="dropdown-item" ><i className="ri-file-copy-line mr-2" onClick={()=>setSelectedPriority('low')} />Low</a> 
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

     {
      assignedTasks.length===0?
      
      <div className={Nodata.emptyState}>
      <div className={Nodata.emptyStateContent}>
        <div className={Nodata.emptyStateIcon}>
          <img
            src="https://t4.ftcdn.net/jpg/04/75/01/23/240_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg"
            alt=""
          />
        </div>
        <div className={Nodata.emptyStateMessage}>
          No Task has been assigned to you yet.
        </div>
        <div className={Nodata.emptyStateHelp}>
          Add a new Task by simpley clicking the button on top right
          side.
        </div>
      </div>
    </div>
      
      :
   

      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">

              {
                assignedTasks.map((task)=>(


                  <div className="col-lg-12">
                  <div className="card card-widget task-card">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="custom-control custom-task custom-checkbox custom-control-inline">
                            <input type="checkbox" checked={task.completed?true:false} disabled className="custom-control-input" id={task._id} />
                            <label className="custom-control-label" htmlFor={task._id} />
                          </div>
                          <div>
                            <h5 className="mb-2">{task.name}</h5>
                            <div className="media align-items-center">
                              <div className="btn bg-body mr-3"><RiAlignJustify className="ri-align-justify mr-2" />{task.completed?task.subtasks.length:0}/{task?.subtasks?.length}</div>
                              <div className="btn bg-body"><RiSurveyLine className="ri-survey-line mr-2" />{task.comments.length}</div>
                            </div>
                          </div>
                        </div>
                        <div className="media align-items-center mt-md-0 mt-3">
                          <a className={`btn ${task.completed?'bg-primary-light':'bg-secondary-light'}  mr-3`}>{task.completed?'completed':'not complete'}</a>
                          <a className="btn bg-secondary-light" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseEdit1" onClick={()=>{ handleModalToggle(task._id);}} ><RiEditBoxLine  className="ri-edit-box-line m-0" /></a>
                        </div>
                      </div>  
                    </div>
                  </div>                                                                                                        
                  <div className={`collapse ${ colapseShowId === task._id ? "show" : ""}`} id="collapseEdit1">                                            
                    <div className="card card-list task-card">
                      <div className="card-header d-flex align-items-center justify-content-between px-0 mx-3">
                        <div className="header-title">
                          <div key={task._id} className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" checked={task.completed} onChange={(e) => handleTaskCheckboxChange(task._id, e.target.checked)} className="custom-control-input" id={'task'+task._id} />
                            <label className="custom-control-label h5" htmlFor={'task'+task._id}>Mark as done</label>
                          </div>
                        </div>
                        <div><a onClick={handleMarkAsDone} className="btn bg-primary-light">update</a></div>
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
                                  <label htmlFor="exampleInputText3" className="h5">Priority</label>
                                  <input type="text" className="form-control" id="exampleInputText3" defaultValue={task.priority} disabled />
                                </div>                        
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group mb-0">
                                  <label htmlFor="exampleInputText3" className="h5">Due Date</label>
                                  <input type="date" className="form-control" id="exampleInputText3" defaultValue={new Date(task.dueDate).toLocaleDateString("en-CA")} />
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
                                              {task.subtasks.map((subtask) => (
                                                <div className="custom-control custom-checkbox custom-control-inline mr-3">
                                                  <input
                                                    id={subtask._id}
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    checked={subtask.completed}
                                                    onChange={(e)=>handleTaskCheckboxChange(task._id,e.target.checked)}
                                                    
                                                  />
                                                  <label
                                                    className="custom-control-label mb-1"
                                                    htmlFor={subtask._id}
                                                  >
                                                    {" "}
                                                    {subtask.name}{" "}
                                                  </label>
                                                </div>
                                              ))}
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


                ))
              }

           

           

            </div>
          </div>
        </div>
      </div>

}

    </div>
    {/* Page end  */}
  </div>
     </div>

     {
  
  snackOpen && <SnackBar severity={severity} message={message} snackOpen={snackOpen} setSnackOpen={setSnackOpen}  />
 }
   
   </div>
  )
}

export default TaskManage
