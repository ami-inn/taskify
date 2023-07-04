import React, { useEffect, useState } from "react";
import UserSidebar from "../UserSidebar/UserSidebar";
import UserHeder from "../UserHeader/UserHeder";
import Calendar from "react-awesome-calendar";
// import {events} from './Events'

import { useSelector } from "react-redux";
import './UserCalendar.css'

import axios from "axios";
function UserCalendar() {

  const user=useSelector((state)=>{return state.user.details})
  const workspaceId = useSelector((state)=>state.currentWorkspace)


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
            color: "#D92550", // Set the desired color
            from: task.dueDate,
            to: task.dueDate,
            title: task.name
          }));


          const completedTaskEvents = response.data.completedTasks.map(task => ({
            id: task._id,
            color: "green", // Set the desired color for completed tasks
            from: task.completedAt,
            to: task.completedAt,
            title: task.name
          }));

          console.log('completed task ',completedTaskEvents);
          setEvents([...DueEvents, ...completedTaskEvents]);

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
              <Calendar events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
