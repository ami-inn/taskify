import React from 'react'
import img1 from '../../assets/images/user/01.jpg'

function UserHeder() {
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
              <li>
                <div className="iq-search-bar device-search">
                  <form action="#" className="searchbox">
                    <a className="search-link" href="#"><i className="ri-search-line" /></a>
                    <input type="text" className="text search-input" placeholder="Search here..." />
                  </form>
                </div>
              </li>
              <li className="nav-item nav-icon search-content">
                <a href="#" className="search-toggle rounded" id="dropdownSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="ri-search-line" />
                </a>
                <div className="iq-search-bar iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownSearch">
                  <form action="#" className="searchbox p-2">
                    <div className="form-group mb-0 position-relative">
                      <input type="text" className="text search-input font-size-12" placeholder="type here to search..." />
                      <a href="#" className="search-link"><i className="las la-search" /></a>
                    </div>
                  </form>
                </div>
              </li>
              <li className="nav-item nav-icon nav-item-icon dropdown">
                <a href="#" className="search-toggle dropdown-toggle" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                    </path>
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="bg-primary" />
                </a>
                <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <div className="card shadow-none m-0">
                    <div className="card-body p-0 ">
                      <div className="cust-title p-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">All Messages</h5>
                          <a className="badge badge-primary badge-card" href="#">3</a>
                        </div>
                      </div>
                      <div className="px-3 pt-0 pb-0 sub-card">
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3 border-bottom">
                            <div className>
{/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Emma Watson</h6>
                                <small className="text-dark"><b>12 : 47 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3 border-bottom">
                            <div className>
                          {/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Ashlynn Franci</h6>
                                <small className="text-dark"><b>11 : 30 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3">
                            <div className>
                            {/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Kianna Carder</h6>
                                <small className="text-dark"><b>11 : 21 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                      </div>
                      <a className="right-ic btn btn-primary btn-block position-relative p-2" href="#" role="button">
                        View All
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item nav-icon nav-item-icon dropdown">
                <a href="#" className="search-toggle dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="bg-primary " />
                </a>
                <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="card shadow-none m-0">
                    <div className="card-body p-0 ">
                      <div className="cust-title p-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">Notifications</h5>
                          <a className="badge badge-primary badge-card" href="#">3</a>
                        </div>
                      </div>
                      <div className="px-3 pt-0 pb-0 sub-card">
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3 border-bottom">
                            <div className>
                          {/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Emma Watson</h6>
                                <small className="text-dark"><b>12 : 47 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3 border-bottom">
                            <div className>
                              {/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Ashlynn Franci</h6>
                                <small className="text-dark"><b>11 : 30 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="iq-sub-card">
                          <div className="media align-items-center cust-card py-3">
                            <div className>
                            {/* img */}
                            </div>
                            <div className="media-body ml-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <h6 className="mb-0">Kianna Carder</h6>
                                <small className="text-dark"><b>11 : 21 pm</b></small>
                              </div>
                              <small className="mb-0">Lorem ipsum dolor sit amet</small>
                            </div>
                          </div>
                        </a>
                      </div>
                      <a className="right-ic btn btn-primary btn-block position-relative p-2" href="#" role="button">
                        View All
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item nav-icon dropdown caption-content">
                <a href="#" className="search-toggle dropdown-toggle  d-flex align-items-center" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={img1} className="img-fluid rounded-circle" alt="user" />
                  <div className="caption ml-3">
                    <h6 className="mb-0 line-height">Savannah Nguyen<i className="las la-angle-down ml-2" /></h6>
                  </div>
                </a>                            
                <ul className="dropdown-menu dropdown-menu-right border-none" aria-labelledby="dropdownMenuButton">
                  <li className="dropdown-item d-flex svg-icon">
                    <svg className="svg-icon mr-0 text-primary" id="h-01-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <a href="../app/user-profile.html">My Profile</a>
                  </li>
                  <li className="dropdown-item d-flex svg-icon">
                    <svg className="svg-icon mr-0 text-primary" id="h-02-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <a href="../app/user-profile-edit.html">Edit Profile</a>
                  </li>
                  <li className="dropdown-item d-flex svg-icon">
                    <svg className="svg-icon mr-0 text-primary" id="h-03-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <a href="../app/user-account-setting.html">Account Settings</a>
                  </li>
                  <li className="dropdown-item d-flex svg-icon">
                    <svg className="svg-icon mr-0 text-primary" id="h-04-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <a href="../app/user-privacy-setting.html">Privacy Settings</a>
                  </li>
                  <li className="dropdown-item  d-flex svg-icon border-top">
                    <svg className="svg-icon mr-0 text-primary" id="h-05-p" width={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <a href="../backend/auth-sign-in.html">Logout</a>
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

export default UserHeder
