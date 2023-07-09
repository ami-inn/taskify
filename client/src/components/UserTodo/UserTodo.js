import React, { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar';
import UserHeder from '../UserHeader/UserHeder';
import errorImg from '../../assets/images/error/maintain.png'


function UserTodo() {

    const [sidebarShow, setsidebarShow] = useState(false);

    const handleButtonClick = () => {
      setsidebarShow(!sidebarShow);
    };

  return (
    <div className={`${sidebarShow?'sidebar-main':''}`}>
    <div className='wrapper'>

        <UserSidebar onsideViewClick={handleButtonClick} page={'todo'}/>
        <UserHeder onsideViewClick={handleButtonClick}/>

        <div className="content-page">
    <div className="container-fluid">

    <div className="mt-5 iq-maintenance">
  <div className="container-fluid p-0">
    <div className="row no-gutters">
      <div className="col-sm-12 text-center">
        <div className="iq-maintenance">
          <img src={errorImg} className="img-fluid" alt />
          <h3 className="mt-4 mb-1">We are Currently Updating This Feature</h3>
          <p>Please check back in sometime.</p>
        </div>
      </div>
    </div>
  </div>
  <div className="container mt-3">
    <div className="row">
      <div className="col-lg-4">
        <div className="card text-center">
          <div className="card-body">
            <i className="ri-window-line ri-4x line-height text-primary" />
            <h5 className="card-title mt-1">Why is This To Do?</h5>
            <p className="mb-0">Because User Can create Their Own Todos.How Cool Is That.We Can Create Our Todos And Track Our Progress</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card text-center">
          <div className="card-body">
            <i className="ri-time-line ri-4x line-height text-primary" />
            <h5 className="card-title mt-1">Drag And Drop!</h5>
            <p className="mb-0">The Drag And Drop Feature Is Available So We Can Create This Todos And Drag and Drop It To Our Own Status.</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card text-center">
          <div className="card-body">
            <i className="ri-information-line ri-4x line-height text-primary" />
            <h5 className="card-title mt-1">Do you need Support?</h5>
            <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
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
  )
}

export default UserTodo
