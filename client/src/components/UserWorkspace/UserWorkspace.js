import { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import img1 from '../../assets/images/user/01.jpg'
import img2 from '../../assets/images/user/02.jpg'
import img3 from '../../assets/images/user/03.jpg'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RiSearch2Line } from 'react-icons/ri'
import UserDashboard from '../UserDashboard/UserDashboard'

function UserWorkspace() {

  const {id}=useParams()
  console.log(id);
  const workspaceId = useSelector((state)=>state.currentWorkspace)
  console.log(workspaceId)
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const [workspace,setworkSpace]=useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [openMessage,setopenMessage]=useState(false)
  const [openNoti,setopenNoti]=useState(false)
  const [openLogout,setopenLogout]=useState(false)
  

 
  async function handleLogout(){
    await axios.get('/auth/logout');
    dispatch({type:'refresh'})
  }
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const user=useSelector((state)=>{
    
    return state.user.details

})





  React.useEffect(()=>{
    
    (
      async function(){
        try{
          console.log('jdkjldkjlhjfdh');
          console.log({workspaceId});
          const {data}=await axios.get(`/workspace/${id}?userId=${user._id}`)

          
     
          if(!data.err){
            console.log(data);
            console.log(data.workspace);
            setworkSpace(data.workspace)
            dispatch({type:'workspace',payload:data.workspace._id})
            // alert('success')
          }else{
            alert('error')
            navigate('/create-workspace')
          }

        }
        catch(err){

          console.log(err);
        }

      }
    
  
  )()
  

},[])

  return (
    <div className='wrapper'>


        <UserSidebar page={'dashboard'}/>
        <UserHeder/>

    
  
         <UserDashboard/>

     
    </div>
  )
}

export default UserWorkspace
