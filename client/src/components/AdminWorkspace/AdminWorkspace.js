
import React, { useEffect, useState } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import AdminHeader from '../AdminHeader/AdminHeader'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Dropdown,} from 'react-bootstrap';
import { Backdrop, CircularProgress } from '@mui/material';

import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux'


function AdminWorkspace() {
    const [load, setLoad] = useState(false)
    const [workspaces, setWorkspaces] = useState([]);
    const [searchQuery,setsearchQuery] = useState('');
    const [refresh,setRefresh] = useState('')
    const dispatch = useDispatch();

    const fetchWorkspaces=async(searchQuery)=>{
        try{
            const response = await axios.get('/admin/workspaces',{params:{search:searchQuery}})
                console.log(response);

                if(response.data.error){
                    // console.log(data);
                    // console.log(data.error)
                }else{
                    console.log('resss',response.data.workspaces);
                    const workspaceData=response.data.workspaces
                    setWorkspaces(workspaceData)
                }
    
        }
        catch(error){
            console.log('error');
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchWorkspaces('')
    },[refresh])

    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.value; // Get the search query from the form input
        fetchWorkspaces(searchQuery);
      };


      async function blockUser(workspaceId,active) {
        Swal.fire({
          title: 'Are you sure? Block',
          text: "Block this Workspace!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#7e3af2',
          cancelButtonColor: '##a8a8a8',
          confirmButtonText: 'Yes, Block!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log('fdjjdkjloieuruoeu9re');
            const { data } = await axios.put(`/admin/workspace-edit/${workspaceId}`,{active});
            console.log(data);
            setRefresh(!refresh)
          }
        })
      }
      async function unBlockUser(workspaceId,active) {
        Swal.fire({
          title: 'Are you sure? Unblock',
          text: "Unblock this Workspace!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#7e3af2',
          cancelButtonColor: '##a8a8a8',
          confirmButtonText: 'Yes, Unblock!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log('dkfjkkkskdlflald');
            const { data } =await axios.put(`/admin/workspace-edit/${workspaceId}`,{active});
            console.log(data);
            setRefresh(!refresh)
          }
        })
      }

   
    
    

    

   
    

  return (
    <div className='wrapper'>
        <AdminSidebar page={'workspaces'}/>
        
        <AdminHeader/>

       <div className="content-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Workspace</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="row justify-content-between">
                <div className="col-sm-6 col-md-6">
                  <div id="user_list_datatable_info" className="dataTables_filter">
                    <form className="mr-3 position-relative">
                      <div className="form-group mb-0">
                        <input type="search" onChange={handleSearch} className="form-control" id="exampleInputSearch" placeholder="Search" aria-controls="user-list-table" />
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="col-sm-6 col-md-6">
                  <div className="user-list-files d-flex">
                    <a className="bg-primary" href="javascript:void();">
                      Excel
                    </a>
                    <a className="bg-primary" href="javascript:void();">
                      Pdf
                    </a>
                  </div>
                </div> */}
              </div>
              <table id="user-list-table" className="table text-center table-striped dataTable mt-4" role="grid" aria-describedby="user-list-page-info">
                <thead>
                  <tr className="ligth">
                    <th>Profile</th>
                    <th>User Name</th>
                    <th>Workspace Name</th>
                    <th>Description</th>
                    <th>Members</th>
                    <th>Status</th>
                    <th>Admins</th>
                    <th>Created Date</th>
                    <th style={{minWidth: 100}}>Action</th>
                  </tr>
                </thead>
                <tbody>


                    {
                        workspaces.map((workspace)=>(
                            <tr>
                            <td className="text-center"><img className="rounded img-fluid avatar-40" src={workspace.owner.profile.url} /></td>
                            <td>{workspace.owner.name}</td>
                            <td>{workspace.name}</td>
                            <td>{workspace.description}</td>
                            <td>{workspace.members.length}</td>
                            <td><span className={`${workspace.active===true?'badge bg-primary':'badge bg-danger'}`}>{workspace.active?'active':'blocked'}</span></td>
                            <td>{workspace.admins.length}</td>
                            <td>{workspace.createdDate}</td>
                            <td>
                            <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <RiMore2Fill />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {
                                
                              workspace.active===true ?
                                <Dropdown.Item href="#" onClick={(e) => unBlockUser(workspace._id,false)}>block</Dropdown.Item>
                                :
                                <Dropdown.Item href="#" onClick={(e) => blockUser(workspace._id,true)}>unBlock</Dropdown.Item>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                            </td>
                          </tr>
                        ))
                    }

                
                
          
                </tbody>
              </table>
            </div>
            <div className="row justify-content-between mt-3">
              <div id="user-list-page-info" className="col-md-6">
                <span>Showing 1 to 5  entries</span>
              </div>
              <div className="col-md-6">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                    </li>
    
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      
    </div>
  )
}

export default AdminWorkspace
