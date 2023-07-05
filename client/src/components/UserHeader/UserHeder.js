import  { useEffect, useState } from "react";
import img1 from "../../assets/images/user/01.jpg";
import { RiMenu3Line, RiMenuLine, RiSearch2Line } from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, Navigate } from "react-router-dom";
import store from "../../store/store";


function UserHeder({onsideViewClick}) {
  const workspaceId = useSelector((state)=>state.currentWorkspace)

  console.log(workspaceId)

  const [sideView,setsideView]=useState(false)
  const [workspace,setworkSpace]=useState('')
  const [navView,setnavView]=useState(false)


    React.useEffect(()=>{
    
        (
          async function(){
            try{
             
              console.log({workspaceId});
              const {data}=await axios.get(`/workspace/${workspaceId}?userId=${user._id}`)
              console.log(data);
         
              if(!data.err){
                console.log(data);
                console.log(data.workspace);
                setworkSpace(data.workspace)
                // alert('success')
              }else{
                
                Navigate('/create-workspace')
              }
    
            }
            catch(err){
    
              console.log(err);
            }
    
          }
        
      
      )()
      
    
    },[])
  
  const [isOpen, setIsOpen] = useState(false);
  const [openMessage,setopenMessage]=useState(false)
  const [openNoti,setopenNoti]=useState(false)
  const [openLogout,setopenLogout]=useState(false)

  const user=useSelector((state)=>{
    
    return state.user.details

})

  const dispatch = useDispatch()
  async function handleLogout(){
    await axios.get('/auth/logout');

    dispatch({ type: 'clearWorkspace' });
    dispatch({ type: 'refresh' });
   
  }
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(workspace);



  return (
    <div className="iq-top-navbar fixed">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
            <RiMenuLine onClick={onsideViewClick} className="ri-menu-line wrapper-menu" style={{cursor:'pointer'}} />
            <a href="../backend/index.html" className="header-logo">
              <h4 className="logo-title text-uppercase">Taskify</h4>
            </a>
          </div>
          <div className="navbar-breadcrumb">
            <h5>{workspace.name}</h5>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              // data-toggle="collapse"
              // data-target="#navbarSupportedContent"
              // aria-controls="navbarSupportedContent"
              // aria-label="Toggle navigation"

              onClick={()=>setnavView(!navView)}
            >
              <RiMenu3Line className="ri-menu-3-line" />
            </button>
            <div
              className={`collapse navbar-collapse ${navView?'show':''}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-list align-items-center">

                <li>
                 
                </li>

                <li className={openMessage?"nav-item nav-icon nav-item-icon dropdown show":"nav-item nav-icon nav-item-icon dropdown"}>
                  <a
                    onClick={()=>{setopenMessage(!openMessage)}}
                    className="search-toggle dropdown-toggle"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="bg-primary" />
                  </a>

                  <div
                    className={openMessage?"iq-sub-dropdown dropdown-menu show":"iq-sub-dropdown dropdown-menu"}
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <div className="card shadow-none m-0">
                      <div className="card-body p-0 ">
                        <div className="cust-title p-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">All Messages</h5>
                            <a
                              className="badge badge-primary badge-card"
                              href="#"
                            >
                              3
                            </a>
                          </div>
                        </div>
                        <div className="px-3 pt-0 pb-0 sub-card">
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img
                                  className="avatar-50 rounded-small"
                                  src={img1}
                                 
                                />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Emma Watson</h6>
                                  <small className="text-dark">
                                    <b>12 : 47 pm</b>
                                  </small>
                                </div>
                                <small className="mb-0">
                                  Lorem ipsum dolor sit amet
                                </small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3 border-bottom">
                              <div className>
                                <img
                                  className="avatar-50 rounded-small"
                                  src={img1}
                                 
                                />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Ashlynn Franci</h6>
                                  <small className="text-dark">
                                    <b>11 : 30 pm</b>
                                  </small>
                                </div>
                                <small className="mb-0">
                                  Lorem ipsum dolor sit amet
                                </small>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="iq-sub-card">
                            <div className="media align-items-center cust-card py-3">
                              <div className>
                                <img
                                  className="avatar-50 rounded-small"
                                  src={img1}
                                  
                                />
                              </div>
                              <div className="media-body ml-3">
                                <div className="d-flex align-items-center justify-content-between">
                                  <h6 className="mb-0">Kianna Carder</h6>
                                  <small className="text-dark">
                                    <b>11 : 21 pm</b>
                                  </small>
                                </div>
                                <small className="mb-0">
                                  Lorem ipsum dolor sit amet
                                </small>
                              </div>
                            </div>
                          </a>
                        </div>
                        <a
                          className="right-ic btn btn-primary btn-block position-relative p-2"
                          href="#"
                          role="button"
                        >
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
               
               
                <li className={openNoti?"nav-item nav-icon nav-item-icon dropdown show":"nav-item nav-icon nav-item-icon dropdown"}>
                  <a
                    onClick={()=>{setopenNoti(!openNoti)}}
                    className="search-toggle dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="bg-primary " />
                  </a>

                  <div
                      className={openNoti?"iq-sub-dropdown dropdown-menu show":"iq-sub-dropdown dropdown-menu"}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div className="card shadow-none m-0">
                        <div className="card-body p-0 ">
                          <div className="cust-title p-3">
                            <div
                              className="d-flex align-items-center justify-content-between"
                            >
                              <h5 className="mb-0">Notifications</h5>
                              <a
                                className="badge badge-primary badge-card"
                                href="#"
                                >3</a
                              >
                            </div>
                          </div>
                          <div className="px-3 pt-0 pb-0 sub-card">
                            <a href="#" className="iq-sub-card">
                              <div
                                className="media align-items-center cust-card py-3 border-bottom"
                              >
                                <div className>
                                  <img
                                    className="avatar-50 rounded-small"
                                    src={img1}
                                   
                                  />
                                </div>
                                <div className="media-body ml-3">
                                  <div
                                    className="d-flex align-items-center justify-content-between"
                                  >
                                    <h6 className="mb-0">Emma Watson</h6>
                                    <small className="text-dark"
                                      ><b>12 : 47 pm</b></small
                                    >
                                  </div>
                                  <small className="mb-0"
                                    >Lorem ipsum dolor sit amet</small
                                  >
                                </div>
                              </div>
                            </a>
                            <a href="#" className="iq-sub-card">
                              <div
                                className="media align-items-center cust-card py-3 border-bottom"
                              >
                                <div className>
                                  <img
                                    className="avatar-50 rounded-small"
                                    src={img1}
                                   
                                  />
                                </div>
                                <div className="media-body ml-3">
                                  <div
                                    className="d-flex align-items-center justify-content-between"
                                  >
                                    <h6 className="mb-0">Ashlynn Franci</h6>
                                    <small className="text-dark"
                                      ><b>11 : 30 pm</b></small
                                    >
                                  </div>
                                  <small className="mb-0"
                                    >Lorem ipsum dolor sit amet</small
                                  >
                                </div>
                              </div>
                            </a>
                            <a href="#" className="iq-sub-card">
                              <div
                                className="media align-items-center cust-card py-3"
                              >
                                <div className>
                                  <img
                                    className="avatar-50 rounded-small"
                                    src={img1}
                                   
                                  />
                                </div>
                                <div className="media-body ml-3">
                                  <div
                                    className="d-flex align-items-center justify-content-between"
                                  >
                                    <h6 className="mb-0">Kianna Carder</h6>
                                    <small className="text-dark"
                                      ><b>11 : 21 pm</b></small
                                    >
                                  </div>
                                  <small className="mb-0"
                                    >Lorem ipsum dolor sit amet</small
                                  >
                                </div>
                              </div>
                            </a>
                          </div>
                          <a
                            className="right-ic btn btn-primary btn-block position-relative p-2"
                            href="#"
                            role="button"
                          >
                            View All
                          </a>
                        </div>
                      </div>
                    </div>


                </li>
                
                
                <li
                  className={
                    isOpen
                      ? "nav-item nav-icon dropdown caption-content show"
                      : "nav-item nav-icon dropdown caption-content"
                  }
                >
                  <a
                    onClick={toggleDropdown}
                    className="search-toggle dropdown-toggle  d-flex align-items-center"
                  >
                    <img
                      src={user.profile.url}
                      className="img-fluid rounded-circle"
                      alt="user"
                    />
                    <div className="caption ml-3">
                      <h6 className="mb-0 line-height">{user.name}</h6>
                    </div>
                  </a>

                  <ul
                    className={
                      isOpen
                        ? "dropdown-menu dropdown-menu-right border-none show"
                        : "dropdown-menu dropdown-menu-right border-none"
                    }
                  >
                    <li className="dropdown-item d-flex svg-icon">
                      <svg
                        className="svg-icon mr-0 text-primary"
                        id="h-02-p"
                        width={20}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <Link to={`/edit-profile/${user._id}`}>Edit Profile</Link>
                    </li>
                    <li className="dropdown-item d-flex svg-icon">
                                         <svg className="svg-icon mr-0 text-primary" id="h-01-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                                          <Link to={'/profile'}>My Profile</Link>
                                      </li>

                    <li className="dropdown-item  d-flex svg-icon border-top">
                      <svg
                        className="svg-icon mr-0 text-primary"
                        id="h-05-p"
                        width={20}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <a onClick={()=>{setopenLogout(!openLogout)}}>Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>


                        {/* logout dialogue */}
                        <Dialog
        open={openLogout}
        onClose={()=>{setopenLogout(!openLogout)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure Do You Want To Leave ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Thank you for using our services! Remember to log out to ensure the security of your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setopenLogout(!openLogout)}}>Disagree</Button>
          <Button onClick={handleLogout} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default UserHeder;
