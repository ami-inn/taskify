import React from 'react'
import img1 from '../../assets/images/user/01.jpg'
import axios from 'axios';
import { useDispatch } from 'react-redux';

function AdminHeader() {
  const dispatch=useDispatch()

  async function logout() {
    if (window.confirm("are you sure you want to logout")) {
      await axios.get("/admin/auth/logout");
      dispatch({ type: "refresh" });
    }
  }
  return (

    <div className="iq-top-navbar fixed">
    <div className="iq-navbar-custom">
      <nav className="navbar navbar-expand-lg navbar-light p-0">
        <div className="iq-navbar-logo d-flex align-items-center justify-content-between">
          <i className="ri-menu-line wrapper-menu" />
          <a href="../backend/index.html" className="header-logo">
            <h4 className="logo-title text-uppercase">Taskify</h4>
          </a>
        </div>
        <div className="navbar-breadcrumb">
          <h5>Dashboard</h5>
        </div>
        <div className="d-flex align-items-center">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
            <i className="ri-menu-3-line" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto navbar-list align-items-center">
              
           
            
              <li className="nav-item nav-icon dropdown caption-content">
                <a href="#" className="search-toggle dropdown-toggle  d-flex align-items-center" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={img1} className="img-fluid rounded-circle" alt="user" />
                  <div className="caption ml-3">
                    <h6 className="mb-0 line-height">Admin<i className="las la-angle-down ml-2" /></h6>
                  </div>
                </a>                            
                <ul className="dropdown-menu dropdown-menu-right border-none" aria-labelledby="dropdownMenuButton">
                
              
            
                  <li className="dropdown-item  d-flex svg-icon border-top">
                    <svg className="svg-icon mr-0 text-primary" id="h-05-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    </div>

  )
}

export default AdminHeader
