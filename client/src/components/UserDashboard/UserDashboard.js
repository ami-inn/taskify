import React, { useDebugValue, useEffect, useState } from 'react'
import img1 from '../../assets/images/user/01.jpg'
import img2 from '../../assets/images/user/02.jpg'
import img3 from '../../assets/images/user/03.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'
import LineProgress from '../LineProgress/LineProgress'
import CircleProgress from '../CricleProgress/CircleProgress'
import LineProgressProject from '../LineProgress/LineProgressProject'

function UserDashboard() {

  const user=useSelector((state)=>{return state.user.details})
  const workspaceId = useSelector((state)=>state.currentWorkspace)
  const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
  const [projects,setProjects] = useState([])



  useEffect(()=>{

    fetchProjectDetails()

  },[])

  const fetchProjectDetails=async()=>{
    try{

      const response = await axios.get(`/workspace-projects/${workspaceId}`)

      if(response.data.error){
        console.log(response.data);
      }else{
        setProjects(response.data.workspace.projects)
      }

    }
    catch(err){
      console.log('error',err);
    }
  }

  console.log('currentprojextss',projects);
  const recentProjects = projects
  .filter((project) => project.priority === 'medium' || project.priority === 'high')
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);


  // Function to calculate the total task count
const getTotalTaskCount = () => {
  let totalTaskCount = 0;

  // Iterate over each project
  projects.forEach((project) => {
    // Add the task count of the current project to the total count
    totalTaskCount += project.tasks.length;
  });

  return totalTaskCount;
};

// Usage
const totalTaskCount = getTotalTaskCount();

const categoryCounts = {
  'Ui/Ux Design': 0,
  'Development': 0,
  'Testing': 0
};

projects.forEach(project => {
  if (project.category === 'Ui/Ux Design') {
    categoryCounts['Ui/Ux Design']++;
  } else if (project.category === 'Development') {
    categoryCounts['Development']++;
  } else if (project.category === 'Testing') {
    categoryCounts['Testing']++;
  }
});

console.log(categoryCounts,'category counts');

// Calculate percentages
const totalProjects = projects.length;
const percentages = {
  'UI/UX Design': (categoryCounts['Ui/Ux Design'] / totalProjects) * 100,
  'Development': (categoryCounts['Development'] / totalProjects) * 100,
  'Testing': (categoryCounts['Testing'] / totalProjects) * 100
};
const testingMemberSet = new Set();
const developmentMemberSet = new Set();
const uiuxMemberSet = new Set();

projects.forEach(project => {
  if (project.category === 'Testing') {
    project.members.forEach(member => testingMemberSet.add(member.profile.url));
  } else if (project.category === 'Development') {
    project.members.forEach(member => developmentMemberSet.add(member.profile.url));
  } else if (project.category === 'Ui/Ux Design') {
    project.members.forEach(member => uiuxMemberSet.add(member.profile.url));
  }
});

const testingMembers = [...testingMemberSet];
const developmentMembers = [...developmentMemberSet];
const uiuxMembers = [...uiuxMemberSet];

  console.log(testingMembers,'testing membersssss');
  console.log(uiuxMembers,'ui membersssss');
  console.log(developmentMembers,'deve membersssss');


  return (
    <div className="content-page">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="top-block d-flex align-items-center justify-content-between">
                <h5>Projects</h5>
                <span className="badge badge-primary">created</span>
              </div>
              <h3><span className="counter">{currentWorkspace?.projects.length}</span></h3>
           <LineProgressProject projects={projects}/>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="top-block d-flex align-items-center justify-content-between">
                <h5>Admins</h5>
                <span className="badge badge-warning">joined</span>
              </div>
              <h3><span className="counter">{currentWorkspace?.admins.length}</span></h3>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <p className="mb-0">available</p>
                <span className="text-warning">100%</span>
              </div>
              <div className="iq-progress-bar bg-warning-light mt-2">
                <span className="bg-warning iq-progress progress-1" data-percent={100} style={{width:'100%'}} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="top-block d-flex align-items-center justify-content-between">
                <h5>Task</h5>
                <span className="badge badge-success">To-Do</span>
              </div>
              <h3><span className="counter">{totalTaskCount}</span></h3>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <p className="mb-0">completed</p>
                <span className="text-success">85%</span>
              </div>
              <div className="iq-progress-bar bg-success-light mt-2">
                <span className="bg-success iq-progress progress-1" data-percent={85} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="top-block d-flex align-items-center justify-content-between">
                <h5>Members</h5>
                <span className="badge badge-info">Joined</span>
              </div>
              <h3><span className="counter">{currentWorkspace?.members.length}</span></h3>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <p className="mb-0">available</p>
                <span className="text-info">100%</span>
              </div>
              <div className="iq-progress-bar bg-info-light mt-2">
                <span className="bg-info iq-progress progress-1" data-percent={100} style={{width:'100%'}}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card-transparent card-block card-stretch card-height">
            <div className="card-body p-0">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Overview Progress</h4>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-inline p-0 mb-0">
                    <li className="mb-1">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">UX / UI Design</p>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="iq-progress-bar bg-secondary-light">
                              <span className="bg-secondary iq-progress progress-1" data-percent={percentages['UI/UX Design']} style={{ width: `${percentages['UI/UX Design']}%` }}  />
                            </div>
                            <span className="ml-3">{percentages['UI/UX Design']}%</span>
                          </div>                                                                
                        </div>
                        <div className="col-sm-3">
                          <div className="iq-media-group text-sm-right">
                            {
                              uiuxMembers.map((member)=>(

                                <a href="#" className="iq-media">
                                <img className="img-fluid avatar-40 rounded-circle" src={member} alt='' />
                              </a>

                              ))
                            }
                          
                           
                           
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="mb-1">
                      <div className="d-flex align-items-center justify-content-between row">
                        <div className="col-sm-3">
                          <p className="mb-0">Development</p>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="iq-progress-bar" style={{background:'#84b2fa'}}>
                              <span className=" iq-progress progress-1" data-percent={percentages['Development']} style={{ background:'#4287f5', width: `${percentages['Development']}%` }} />
                            </div>
                            <span className="ml-3">{percentages['Development']}%</span>
                          </div>                                                                
                        </div>
                        <div className="col-sm-3">
                          <div className="iq-media-group text-sm-right">
                            {
                              developmentMembers.map((member)=>(
                                <a href="#" className="iq-media">
                                <img className="img-fluid avatar-40 rounded-circle" src={member} alt='' />
                              </a>
                              ))
                            }
                          
                         
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between row">
                        <div className="col-sm-3">
                          <p className="mb-0">Testing</p>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="iq-progress-bar bg-warning-light">
                              <span className="bg-warning iq-progress progress-1" data-percent={percentages['Testing']}  style={{ width: `${percentages['Testing']}%` }} />
                            </div>
                            <span className="ml-3">{percentages['Testing']}%</span>
                          </div>                                                                
                        </div>
                        <div className="col-sm-3">
                          <div className="iq-media-group text-sm-right">
                            {
                              testingMembers.map((member)=>(
                                <a href="#" className="iq-media">
                                <img className="img-fluid avatar-40 rounded-circle" src={member} alt='' />
                              </a>
                              ))
                            }
                          
                          
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">

                {
                  recentProjects.map((project)=>(

                    <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="row align-items-center">
                              <div className="col-md-3">
                            
                            <CircleProgress project={project}/>
                            
    
                              </div>
                              <div className="col-md-9">
                                <div className="mt-3 mt-md-0">
                                  <h5 className="mb-1">{project.name}</h5>
                                  <p className="mb-0">{project.description}</p>
                                </div>                                                        
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4 text-sm-right mt-3 mt-sm-0">
                            <div className="iq-media-group">
                              {project.members.map((member)=>(
                                      <a href="#" className="iq-media">
                                      <img className="img-fluid avatar-40 rounded-circle" src={member.profile.url} alt='' />
                                    </a>

                              ))}
                        
                            
                            </div>
                            <a className="btn btn-white text-primary link-shadow mt-2">{project.priority}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  ))
                }
               
          
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card card-block card-stretch card-height">
            <div className="card-body">
              <div className="card border-bottom pb-2 shadow-none">
                <div className="card-body text-center inln-date flet-datepickr">
                  <input type="text" id="inline-date" className="date-input basicFlatpickr d-none" readOnly="readonly" />
                </div>
              </div>
              <div className="card card-list">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon text-secondary mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <div className="pl-3 border-left">
                      <h5 className="mb-1">Direct Development</h5>
                      <p className="mb-0">Unveling the design system</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-list">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon text-primary mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>
                    <div className="pl-3 border-left">
                      <h5 className="mb-1">action point assigned</h5>
                      <p className="mb-0">Unveling the design system</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-list">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon text-warning mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div className="pl-3 border-left">
                      <h5 className="mb-1">Private Notes</h5>
                      <p className="mb-0">Unveling the design system</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-list mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <svg className="svg-icon text-success mr-3" width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <div className="pl-3 border-left">
                      <h5 className="mb-1">Support Request</h5>
                      <p className="mb-0">Unveling the design system</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card-transparent mb-0">
            <div className="card-header d-flex align-items-center justify-content-between p-0 pb-3">
              <div className="header-title">
                <h4 className="card-title">Current Projects</h4>
              </div>
{/* <div className="card-header-toolbar d-flex align-items-center">
  <div id="top-project-slick-arrow" className="slick-aerrow-block"><button className="slick-prev slick-arrow" aria-label="Previous" type="button" fdprocessedid="he6n42b" style={{}}>Previous</button><button className="slick-next slick-arrow" aria-label="Next" type="button" fdprocessedid="d1iwmks" style={{}}>Next</button></div>
</div> */}

            </div>
            <div className="card-body p-0">
              <ul className="list-unstyled row top-projects mb-0">
              
              {
                recentProjects.map((project)=>(

                         
                <li className="col-lg-4">
                <div className="card">
                  <div className="card-body"> 
                    <h5 className="mb-3">{project.name}</h5>
                    <p className="mb-3"><i className="las la-calendar-check mr-2" />{new Date(project.createdDate).toLocaleDateString("en-CA")}</p>
                    <LineProgress project={project}/>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="iq-media-group">

                        {
                          project.members.map((member)=>(
                            <a href="#" className="iq-media">
                            <img src={member.profile.url} className="img-fluid avatar-40 rounded-circle" alt='' />
                          </a>
                          ))
                        }
                      
                     
                      </div>
                      <div>
                        <a href="#" className="btn bg-success-light">{project.category}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

                ))
              }
         
            
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Page end  */}
    </div>
       </div>
  )
}

export default UserDashboard
