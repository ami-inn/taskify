
import axios from "axios";
import * as React from 'react' 
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminUser.css";
import Swal from 'sweetalert2'
import { Container, Dropdown, Table } from 'react-bootstrap';
import { Backdrop, CircularProgress } from '@mui/material';
import { RiMore2Fill, RiSearch2Line } from 'react-icons/ri';
import AdminSidebar from "../AdminSidebar/AdminSidebar";

function AdminUsers() {

    const dispatch = useDispatch();

  
  
    const [userList,setUserList]=useState([])
    const [refresh,setRefresh] = useState('')
    const [clicked,setClicked] = useState('')
    const [load, setLoad] = useState(false)
    const [name,setName] = useState('')
  
  //   pagination
  
  const [currentPage,setCurrentPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)
  const [totalPages,setTotalPages] = useState(0)
  
  React.useEffect(()=>{
  
      fetchUsers()
      
  },[currentPage,pageSize,refresh, name])
  
  const fetchUsers=async()=>{
      try{
          const response = await axios.get('/admin/users',{
              params:{
                  page:currentPage,
                  pageSize:pageSize,
                  name:name
              }
          })
          const {users,totalPages}=response.data
          setUserList(users)
          setTotalPages(totalPages)
  
      }
      catch(error){
          console.log(error)
      }
  }
  
  const handlePreviousPage=()=>{
      console.log('ehrkjk');
      if(currentPage > 1){
          setCurrentPage(currentPage-1)
      }
  }
  
  
  const handleNextPage = () =>{
      console.log('ehrkjk');
      if(currentPage < totalPages){
          setCurrentPage(currentPage+1)
      }
  }
  
  // pagination end
  
  
    const handleClick = () => {
      setClicked(!clicked)
    }
  
  
    
  
    async function blockUser(id) {
      Swal.fire({
        title: 'Are you sure? Block',
        text: "Block this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '##a8a8a8',
        confirmButtonText: 'Yes, Block!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.patch("/admin/user/block", { id });
          setRefresh(!refresh)
        }
      })
    }
    async function unBlockUser(id) {
      Swal.fire({
        title: 'Are you sure? Unblock',
        text: "Unblock this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '##a8a8a8',
        confirmButtonText: 'Yes, Unblock!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.patch("/admin/user/unblock", { id });
          setRefresh(!refresh)
        }
      })
    }
  
    function handleSelectChange(e){
      const value = parseInt(e.target.value)
    }


  return (
    <div className='wrapper'>

<AdminSidebar page={'users'}/>  
        
        <div className="content-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">User Details</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <p> You Can See The User Details Here</p>
                    <div className="table-responsive">
                      <div
                        id="datatable_wrapper"
                        className="dataTables_wrapper"
                      >
                        <div
                          className="dataTables_length"
                          id="datatable_length"
                        >
                          {/* <label>
                            Show
                            <select
                              name="datatable_length"
                              aria-controls="datatable"
                              className
                              fdprocessedid="67wy2"
                              value={userList.length}
                              onChange={handleSelectChange}
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            entries
                          </label> */}
                        </div>
                        <div
                          id="datatable_filter"
                          className="dataTables_filter"
                        >

                          <label>
                            Search:
                            <input
                              type="search"
                              className
                              placeholder='search users here'
                              value={name}
                              onChange={(e)=>{setName(e.target.value)}}
                              aria-controls="datatable"
                            />
                          </label>
                        </div>
                        <table
                          id="datatable"
                          className="table data-table  dataTable text-center"
                          role="grid"
                          aria-describedby="datatable_info"
                        >
                          <thead>
                            <tr className="ligth" role="row">
                              <th
                                className="sorting_asc"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: "190.538px" }}
                              >
                                #
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Position: activate to sort column ascending"
                                style={{ width: "298.275px" }}
                              >
                                Name
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Office: activate to sort column ascending"
                                style={{ width: "148.188px" }}
                              >
                                Email
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Age: activate to sort column ascending"
                                style={{ width: "55.4px" }}
                              >
                                Workspaces
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Start date: activate to sort column ascending"
                                style={{ width: "119.137px" }}
                              >
                                Status
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="datatable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Salary: activate to sort column ascending"
                                style={{ width: "118.863px" }}
                              >
                                 Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                                userList.map((item,index)=>{
                                    return  <tr role="row" className={item.block?'blockedrow':'activerow'} key={index}>
                                   
                                    <td className="sorting_1">{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.workspaces.length}</td>
                                    <td>{item.block ? "blocked" : "Active"}</td>
                                    <td className='option-btn'>
                        <Dropdown>
                          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <RiMore2Fill />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {
                              item.block ?
                                <Dropdown.Item href="#" onClick={(e) => unBlockUser(item._id)}>Unblock</Dropdown.Item>
                                :
                                <Dropdown.Item href="#" onClick={(e) => blockUser(item._id)}>Block</Dropdown.Item>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                                  </tr>

                                })
                            }


                           
                          </tbody>
                       
                        </table>
                        <div
                          className="dataTables_info"
                          id="datatable_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 10 entries
                        </div>
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="datatable_paginate"
                        >
                          <button
                            className="paginate_button previous"
                            aria-controls="datatable"
                            data-dt-idx={0}
                            tabIndex={0}
                            id="datatable_previous"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1} 
                          >
                            Previous
                          </button>
                          
                          <button
                            className="paginate_button next"
                            aria-controls="datatable"
                            data-dt-idx={7}
                            tabIndex={0}
                            id="datatable_next"
                            onClick={handleNextPage}
                             disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
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

export default AdminUsers
