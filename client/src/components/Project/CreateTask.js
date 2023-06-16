import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiDeleteBinFill, RiEditBoxFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import Project from './Project';

function CreateTask(props) {


    
    const{newTaskModal,setNewTaskModal,projectId}=props
    const [project,setProject]=useState([])
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [creatorId,setCreatorId]=useState('')
    const [assigneeId,setAssigneeId]=useState('')
    const [subtasks,setsubTasks]=useState([])
    const [priority,setpriority]=useState('')
    const [newSubtask,setNewsubTask]=useState('')
    const [errMessage,setErrorMessage]=useState('')
    
    const user=useSelector((state)=>{
    
        return state.user.details
    
    })

    function checkValidCreator(){
        return project.creator===user._id
    }

    console.log('check valid userr',checkValidCreator());


    const handleSubTaskChange = (e)=>{
        e.preventDefault()
        setNewsubTask(e.target.value)
    }
    const handleKeyPress=(e)=>{
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddSubTask(e);
          }
    }

    const handleAddSubTask=()=>{
        if(newSubtask.trim()!==''){
            setsubTasks([...subtasks,newSubtask])
            setNewsubTask('')
        }
    }
    const handleDeleteSubtask=(index)=>{
        const updatedSubtasks=[...subtasks]
        updatedSubtasks.splice(index,1)
        setsubTasks(updatedSubtasks)

    }
    
    console.log(props);
    console.log('project',project);

    useEffect(()=>{
        fetchProject()
    },[projectId])

    const fetchProject= async ()=>{
        try{
            const {data}=await axios.get(`/project/${projectId}`)

            if(data.error){
                console.log('error');
                console.log(data);
            }else{
                console.log('set members');
                setProject(data.project)
            }
        }
        catch(err){
            console.log(err)
        }
      }

      const handleSubmit=async (e)=>{
        e.preventDefault()


        if(!checkValidCreator()){
            console.log('enterrr');
            return setErrorMessage('you are not the creator')
        }

        try{

            const task={
                name,
                description,
                dueDate,
                priority,
                subtasks,
                creatorId:user._id,
                assigneeId
            }

            const response= await axios.post('/create-task',task)

            if(response.data.error){
                alert('error')
            }else{
                alert('success')
            }

        }
        catch(err){
            console.log('creating task error');
            console.log(err);
        }
       
      }







    const handleCancel = ()=>{
        props.setNewTaskModal(false)
    }

   



  return (
    
    <div className={`modal fade bd-example-modal-lg ${newTaskModal===true?'show':''}`} role="dialog" aria-modal="true" style={{display:'block', paddingRight:'4px' }} id="new-task-modal">
    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header d-block text-center pb-3 border-bttom">
          <h3 className="modal-title" id="exampleModalCenterTitle">New Task</h3>
        </div>
        
            <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText02" className="h5">Task Name</label>
                    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" id="exampleInputText02" placeholder="Enter task Name" />
                    <a href="#" className="task-edit text-body"><RiEditBoxFill className="ri-edit-box-line" /></a>
                  </div>
                </div>
          
                <div className="col-lg-4">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                    <select name="type" value={assigneeId} onChange={(e)=>{setAssigneeId(e.target.value)}} className="selectpicker form-control" data-style="py-0">
                       
                      <option>Memebers</option>
                        {
                            project.members?.map(member=>(
                                
                      <option value={member._id}>{member.name}</option>
                            ))
                        }
                    </select>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText05" className="h5">Due Date*</label>
                    <input type="date" value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}} className="form-control" id="exampleInputText05" defaultValue />
                  </div>                        
                </div>

                <div className="col-lg-4">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText2" className="h5">Priority</label>
                    <select value={priority} onChange={(e)=>{setpriority(e.target.value)}} name="type" className="selectpicker form-control" data-style="py-0">
                       
                      <option>priority</option>
                      <option value={'low'}>low</option>
                      <option value={'medium'}>medium</option>
                      <option value={'high'}>high</option>
                       
                    </select>
                  </div>
                </div>
             
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText040" className="h5">Description</label>
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className="form-control" id="exampleInputText040" rows={2} defaultValue={""} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="exampleInputText005" className="h5">Checklist</label>
                 
                    <input type="text" onKeyPress={handleKeyPress} value={newSubtask} onChange={handleSubTaskChange} className="form-control" id="exampleInputText005" placeholder="Add List" />

                    <ul className='subtaskBox'>
                  {subtasks.map((skill, index) => (
                  <li className='subtaskList' key={index}><span className='subtask-text'>{subtasks} </span> <span className='subtaskIcon' onClick={() => handleDeleteSubtask(index)}><RiDeleteBinFill  className='subtaskdeleteIcon'/></span></li>
                   ))}
                 </ul>

                  </div>
                </div>
               
                <div className="col-lg-12">
                  <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                    <div className="btn btn-primary mr-3" data-dismiss="modal" onClick={handleSubmit}>Save</div>
                    <div className="btn btn-primary" data-dismiss="modal" onClick={handleCancel}>Cancel</div>
                  </div>
                </div>
              </div>
            </div>
            </form>
        
        
      </div>
    </div>
  </div>
  )
}

export default CreateTask
