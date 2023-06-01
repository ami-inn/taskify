import React, { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import img1 from '../../assets/images/user/01.jpg'

function UserTeam() {
    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const [tableView,settableView]=useState(true)
    const user=useSelector((state)=>{
    
        return state.user.details
    
    })
    const [workspace,setworkSpace]=useState('')
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

  return (
    <div className='wrapper'>
        <UserSidebar page={'team'}/>
        <UserHeder workspace={workspace}/>

        <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
              <h5>Your Team</h5>
              <div className="d-flex align-items-center">                                
                <div className="list-grid-toggle d-flex align-items-center mr-3">
                  <div data-toggle-extra="tab" data-target-extra="#grid" onClick={()=>{settableView(!tableView)}} className={tableView?'active':''}>
                    <div className="grid-icon mr-3">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} />
                      </svg>
                    </div>
                  </div>
                  <div data-toggle-extra="tab" data-target-extra="#list" onClick={()=>{settableView(!tableView)}} className={tableView?'':'active'}>
                    <div className="grid-icon">
                      <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1={21} y1={10} x2={3} y2={10} /><line x1={21} y1={6} x2={3} y2={6} /><line x1={21} y1={14} x2={3} y2={14} /><line x1={21} y1={18} x2={3} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pl-3 border-left btn-new">
                  <a href="#" className="btn btn-primary" data-target="#new-user-modal" data-toggle="modal">Invite New user</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
        tableView?

<div id="grid" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
<div className="row">
  <div className="col-lg-4 col-md-6">
    <div className="card-transparent card-block card-stretch card-height">
      <div className="card-body text-center p-0">                            
        <div className="item">
          <div className="odr-img">
            <img src={img1} className="img-fluid rounded-circle avatar-90 m-auto" alt="image" />
          </div>                        
          <div className="odr-content rounded">                                          
            <h4 className="mb-2">Ruben Franci</h4>
            <p className="mb-3">rubenfranci@gmail.com</p>
            <ul className="list-unstyled mb-3">
              <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-mail-open-line m-0" /></li>
              <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-chat-3-line m-0" /></li>
              <li className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></li>
            </ul>                                    
            <div className="pt-3 border-top">
              <a href="#" className="btn btn-primary">Message</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 col-md-6">
    <div className="card-transparent card-block card-stretch card-height">
      <div className="card-body text-center p-0">                            
        <div className="item">
          <div className="odr-img">
            <img src={img1} className="img-fluid rounded-circle avatar-90 m-auto" alt="image" />
          </div>                        
          <div className="odr-content rounded">                                          
            <h4 className="mb-2">Kaylynn Press</h4>
            <p className="mb-3">kaylynnpress@gmail.com</p>
            <ul className="list-unstyled mb-3">
              <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-mail-open-line m-0" /></li>
              <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-chat-3-line m-0" /></li>
              <li className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></li>
            </ul>                                    
            <div className="pt-3 border-top">
              <a href="#" className="btn btn-primary">Message</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-lg-4 col-md-6">
    <div className="card-transparent card-block card-stretch card-height">
      <div className="card-body text-center p-0">                            
        <div className="item">
          <div className="odr-img">
            <img src={img1} className="img-fluid rounded-circle avatar-90 m-auto" alt="image" />
          </div>                        
          <div className="odr-content rounded">                                          
            <h4 className="mb-2">Corey Press</h4>
            <p className="mb-3">coreypress@gmail.com</p>
            <ul className="list-unstyled mb-3">
              <li className="bg-secondary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-mail-open-line m-0" /></li>
              <li className="bg-primary-light rounded-circle iq-card-icon-small mr-4"><i className="ri-chat-3-line m-0" /></li>
              <li className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></li>
            </ul>                                    
            <div className="pt-3 border-top">
              <a href="#" className="btn btn-primary">Message</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>
</div>
:
<div id="list" className="item-content animate__animated animate__fadeIn active" data-toggle-extra="tab-content">
<div className="table-responsive rounded bg-white mb-4">
  <table className="table mb-0 table-borderless tbl-server-info">
    <tbody>
      <tr>
        <td>
          <div className="media align-items-center">
            <img src={img1} className="img-fluid rounded-circle avatar-40" alt="image" />
            <h5 className="ml-3">Paityn Siphron</h5>
          </div>
        </td>
        <td>paitynsiphron@gmail.com</td>
        <td>
          <div className="media align-items-center">
            <div className="bg-secondary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-mail-open-line m-0" /></div>
            <div className="bg-primary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-chat-3-line m-0" /></div>
            <div className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></div>
          </div>
        </td>
        <td>
          <a href="#" className="btn btn-primary">Message</a>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <a href="#" className="text-body"><i className="las la-pen mr-3" /></a>
            <a href="#" className="text-body"><i className="las la-trash-alt mr-0" /></a>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="media align-items-center">
            <img src={img1} className="img-fluid rounded-circle avatar-40" alt="image" />
            <h5 className="ml-3">Kaylynn Press</h5>
          </div>
        </td>
        <td>kaylynnpress@gmail.com</td>
        <td>
          <div className="media align-items-center">
            <div className="bg-secondary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-mail-open-line m-0" /></div>
            <div className="bg-primary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-chat-3-line m-0" /></div>
            <div className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></div>
          </div>
        </td>
        <td>
          <a href="#" className="btn btn-primary">Message</a>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <a href="#" className="text-body"><i className="las la-pen mr-3" /></a>
            <a href="#" className="text-body"><i className="las la-trash-alt mr-0" /></a>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div className="media align-items-center">
            <img src={img1} className="img-fluid rounded-circle avatar-40" alt="image" />
            <h5 className="ml-3">Corey Press</h5>
          </div>
        </td>
        <td>coreypress@gmail.com</td>
        <td>
          <div className="media align-items-center">
            <div className="bg-secondary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-mail-open-line m-0" /></div>
            <div className="bg-primary-light rounded-circle iq-card-icon-small mr-3"><i className="ri-chat-3-line m-0" /></div>
            <div className="bg-success-light rounded-circle iq-card-icon-small"><i className="ri-phone-line m-0" /></div>
          </div>
        </td>
        <td>
          <a href="#" className="btn btn-primary">Message</a>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <a href="#" className="text-body"><i className="las la-pen mr-3" /></a>
            <a href="#" className="text-body"><i className="las la-trash-alt mr-0" /></a>
          </div>
        </td>
      </tr>
     
    </tbody>
  </table>
</div> 
</div>

    }
   
    {/* Page end  */}
  </div>
</div>
      
    </div>
  )
}

export default UserTeam
