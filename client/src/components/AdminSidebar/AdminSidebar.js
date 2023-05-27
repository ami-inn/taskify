import React from 'react'
import { Link } from 'react-router-dom'

function AdminSidebar({page}) {
  return (
    <div className="iq-sidebar  sidebar-default ">
    <div className="iq-sidebar-logo d-flex align-items-center">
      <a href="../backend/index.html" className="header-logo">
        {/* <img src="../assets/images/logo.svg" alt="logo"> */}
        <h3 className="logo-title light-logo" />
        Taskify
      </a>
      <div className="iq-menu-bt-sidebar ml-0">
        <i className="las la-bars wrapper-menu" />
      </div>
    </div>
    <div className="data-scrollbar" data-scroll={1}>
      <nav className="iq-sidebar-menu">
        <ul id="iq-sidebar-toggle" className="iq-menu">
          <li className={page=='dashboard' && "active"}>
            <Link to={'/admin/'} className="svg-icon">
              <svg
                className="svg-icon"
                width={25}
                height={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="ml-4">Dashboards</span>
            </Link>
          </li>
          <li className={page=='projects' && "active"}>
            <Link to={'/admin/projects'} className="svg-icon">
              <svg
                className="svg-icon"
                width={25}
                height={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x={6} y={14} width={12} height={8} />
              </svg>
              <span className="ml-4">Projects</span>
            </Link>
          </li>
          <li className={page=='users' && "active"}>
            <Link to={'/admin/users'} className="svg-icon">
              <svg
                className="svg-icon"
                width={25}
                height={25}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ml-4">Employees</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pt-5 pb-2" />
    </div>
    </div>
  )
}

export default AdminSidebar
