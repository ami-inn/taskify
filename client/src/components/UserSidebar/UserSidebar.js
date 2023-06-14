import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UserSidebar({page}) {

  const workspaceId = useSelector((state)=>state.currentWorkspace)

  console.log(workspaceId);


  return (
<div className="iq-sidebar  sidebar-default ">
  <div className="iq-sidebar-logo d-flex align-items-center">
    <a href="../backend/index.html" className="header-logo">
   {/* logo */}
      <h3 className="logo-title light-logo">Taskify</h3>
    </a>
    <div className="iq-menu-bt-sidebar ml-0">
      <i className="las la-bars wrapper-menu" />
    </div>
  </div>
  <div className="data-scrollbar" data-scroll={1}>
    <nav className="iq-sidebar-menu">
      <ul id="iq-sidebar-toggle" className="iq-menu">
        <li className={page==='dashboard'&&'active'}>
          <Link to={`/workspace/${workspaceId}`} className="svg-icon">                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="ml-4">Dashboards</span>
          </Link>
        </li>
        <li className={page==='project'&&'active'}>
          <Link to={'/projects'} className="svg-icon">                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x={6} y={14} width={12} height={8} />
            </svg>
            <span className="ml-4">Projects</span>
          </Link>
        </li>
        <li className>
          <Link to={'/tasks'} className={page==='tasks'&&'active'} >                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
            </svg>
            <span className="ml-4">Task</span>
          </Link>
        </li>
        <li className={page==='team'&&'active'}>
          <Link to='/team' className="svg-icon">                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} />
            </svg>
            <span className="ml-4">Employees</span>
          </Link>
        </li>
        <li className>
          <a href="../backend/page-desk.html" className="svg-icon">                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1={12} y1="22.08" x2={12} y2={12} />
            </svg>
            <span className="ml-4">Desk</span>
          </a>
        </li>
        <li className>
          <a href="../backend/page-calender.html" className="svg-icon">                        
            <svg className="svg-icon" width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x={3} y={4} width={18} height={18} rx={2} ry={2} /><line x1={16} y1={2} x2={16} y2={6} /><line x1={8} y1={2} x2={8} y2={6} /><line x1={3} y1={10} x2={21} y2={10} />
            </svg>
            <span className="ml-4">Calender</span>
          </a>
        </li>
    
      </ul>
    </nav>
   
    <div className="pt-5 pb-2" />
  </div>
</div>

  )
}

export default UserSidebar
