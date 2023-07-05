import React, { useEffect, useState } from "react";
import UserSidebar from "../UserSidebar/UserSidebar";
import UserHeder from "../UserHeader/UserHeder";
import Calendar from "react-awesome-calendar";
// import {events} from './Events'

import { useSelector } from "react-redux";
import './UserCalendar.css'

import axios from "axios";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
function UserCalendar() {

  const user=useSelector((state)=>{return state.user.details})
  const workspaceId = useSelector((state)=>state.currentWorkspace)
      const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
  const isAdmin = currentWorkspace?.admins?.includes(user._id)


  const [events,setEvents]=useState([])

  useEffect(()=>{

    const fetchTasks = async()=>{
      try{
        const response = await axios.get('/calendar-tasks',{params:{workspaceId:workspaceId,userId:user._id}})

        if(response.data.error){
          console.log('error',response.data);
        }else{

          console.log('re',response.data);

          const DueEvents = response.data.tasks.map(task => ({
            id: task._id,
            color: "#de2635", // Set the desired color
            from: task.dueDate,
            to: task.dueDate,
            title: task.name
          }));


          const completedTaskEvents = response.data.completedTasks.map(task => ({
            id: task._id,
            color: "#26de7c", // Set the desired color for completed tasks
            from: task.completedAt,
            to: task.completedAt,
            title: task.name
          }));

          const allDueTasks=response.data.allDueTasks.map(task=>({

            id: task._id,
            color: "black", // Set the desired color for completed tasks
            from: task.dueDate,
            to: task.dueDate,
            title: task.name

          }))
          const allCompletedTasks=response.data.allCompletedTasks.map(task=>({

            id: task._id,
            color: "#4784f5", // Set the desired color for completed tasks
            from: task.completedAt,
            to: task.completedAt,
            title: task.name

          }))


          console.log('completed task ',completedTaskEvents);
          setEvents([...DueEvents, ...completedTaskEvents,...allDueTasks,...allCompletedTasks]);

          // setEvents(convertedEvents)

        }
      }
      catch(err){
        console.log('error',err);
      }

    }

    fetchTasks();

  },[])

  console.log(events,'events');
 
  return (
    <div className="wrapper">
      <UserSidebar page={"calendar"} />
      <UserHeder />
      <div className="content-page">
        <div className="container-fluid">
          <div className="row">
          <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between breadcrumb-content">
              <h5>Calender</h5>
           
            </div>
          </div>
        </div>
      </div>

    <div className="col-xl-9" style={{background:'white'}}>

      <div className="calendar-card p-5" style={{background:'white',borderRadius:'16px'}}>

        <div className="calendar-card-body p-2">
      
      <Calendar events={events}/>

        </div>


      </div>

    

</div>

<div className="col-xl-3">
  <div className="card card-block card-stretch card-height">
    <div className="card-body">
   
      <div className="card card-list">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <RiCheckboxBlankCircleFill className="svg-icon mr-3"  style={{color:'#de2635',fontSize:'18px'}}/>
            <div className="pl-3 border-left">
              <h5>Due Tasks</h5>
              <p className="mb-0">Assigned To You</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-list">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <RiCheckboxBlankCircleFill className="svg-icon mr-3" style={{color:'#26de7c',fontSize:'18px'}}/>
            <div className="pl-3 border-left">
              <h5>Completed Tasks</h5>
              <p className="mb-0">Completed By You</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-list">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <RiCheckboxBlankCircleFill className="svg-icon mr-3" style={{color:'black',fontSize:'18px'}}/>
            <div className="pl-3 border-left">
              <h5>Due Tasks</h5>
              <p className="mb-0">(all)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-list mb-0">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <RiCheckboxBlankCircleFill className="svg-icon mr-3" style={{color:'#4784f5',fontSize:'18px'}}/>
            <div className="pl-3 border-left">
              <h5>Completed Tasks</h5>
              <p className="mb-0">(all)</p>
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
  );
}

export default UserCalendar;
