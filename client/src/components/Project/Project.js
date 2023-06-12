import React, { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import NewProject from './NewProject'

function Project() {
    const [modalview,setModalview]=useState(false)
    console.log(modalview);
  return (
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
              <h5>Your Projects</h5>
              <div className="d-flex flex-wrap align-items-center justify-content-between">
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
         
                <div className="pl-3 border-left btn-new">
                  <a onClick={()=>{setModalview(true)}} className="btn btn-primary" data-target="#new-project-modal" data-toggle="modal">New Project</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div id="circle-progress-01" className="circle-progress-01 circle-progress circle-progress-primary" data-min-value={0} data-max-value={100} data-value={25} data-type="percent" />
                <i className="ri-star-fill m-0 text-warning" />
              </div>
              <h5 className="mb-1">Theme development</h5>
              <p className="mb-3">Preparing framework of block-based WordPress Theme.</p>
              <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                <div className="iq-media-group">
                  <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/05.jpg" alt />
                  </a>
                  <a href="#" className="iq-media">
                    <img className="img-fluid avatar-40 rounded-circle" src="../assets/images/user/06.jpg" alt />
                  </a>
                </div>
                <a className="btn btn-white text-primary link-shadow">High</a>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  
    {/* Page end  */}
  </div>
</div>
{
    modalview===true && <NewProject modalview={modalview} setModalview={setModalview} />
}
      
    </div>
  )
}

export default Project
