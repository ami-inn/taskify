import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import workspaceImg from "../../assets/images/login/workspace.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ShowWorkspaces from "./ShowWorkspaces";
import JoinedWorkspace from "./JoinedWorkspace";
import buttonCss from '../../styles/Buttons.module.css'
import { RiDeleteBack2Fill, RiDropLine, RiGroupLine } from "react-icons/ri";
import { Backdrop, CircularProgress } from "@mui/material";

function CreateWorkspace() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [jopen,setJopen]=useState(false);
  const [selectedValue, setSelectedValue] = useState("ameen");
  const [errMessage, setErrorMessage] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [joinedWorkspaces, setJoinedWorkspaces] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropOpen,setDropOpen]=useState(false)
    
    const handleDropClose = () => {
      setDropOpen(false);
    };
    const handleDropOpen = () => {
      setDropOpen(true);
    };
  

  const validForm = () => {
    if (name.trim() === "" || description.trim() === "") {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = useSelector((state) => {
    return state.user.details;
  });

  async function handleSubmit(e) {
    handleDropOpen()
    e.preventDefault();

    if (!validForm()) {
      let { data } = await axios.post("/create-workspace", {
        name,
        description,
        userId: user._id,
      });

      if (!data.error) {
        handleDropClose()
        console.log(data);
        dispatch({ type: "workspace", payload: data.workspaceId });
        dispatch({
          type: 'addWorkspace',
          payload: {
            id: data.workspaceId,
            workspace: data.workspace
          }
        });
        //new code
        localStorage.setItem('workspaceDetails',JSON.stringify(data.workspace))

        navigate("/workspace/" + data.workspaceId);
      } else {
        handleDropClose()
        // alert();
      }
    }
  }

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await axios.get("/workspaces/" + user._id);

        if (response.data.err) {
         console.log('errorr');
        } else {
          console.log(response.data);
         
          setWorkspaces(response.data.createdWorkspaces);
          setJoinedWorkspaces(response.data.joinedWorkspaces)
          console.log(workspaces.length,workspaces);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkspaces();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="wrapper">
      <ShowWorkspaces
        onClose={handleClose}
        open={open}
        selectedValue={selectedValue}
        workspaces={workspaces}
      />
      <JoinedWorkspace
      onClose={handleClose}
      open={jopen}
      slelectedValue={selectedValue}
      workspaces={joinedWorkspaces}
      />
      <section className="login-content">
        <div className="container">
          <div className="row align-items-center justify-content-center height-self-center">
            <div className="col-lg-8">
              <div className="card auth-card">
                <div className="card-body p-0">
                  <div className="d-flex align-items-center auth-content">
                    <div className="col-lg-6 bg-primary content-left">
                      <div className="p-3">
                        <img
                          src={user.profile.url}
                          className="rounded avatar-80 mb-3"
                          
                        />
                        <h2 className="mb-2 text-white">Hi ! {user.name}</h2>
                        <p>Create An Workspace To Continue</p>
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="text"
                                  placeholder=" "
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                                <label>Name</label>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="floating-label form-group">
                                <input
                                  className="floating-input form-control"
                                  type="text"
                                  placeholder=" "
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                  onKeyPress={handleKeyPress}
                                />
                                <label>Description</label>
                              </div>
                            </div>
                          </div>


                          {validForm()?'':
                          

                          <div className="row">

                          <div className="col-lg-6">
                          <div className="floating-label form-group">
                          
                           <button className={`${buttonCss.customBtn} ${buttonCss.btn8}`} type="submit">
                          
                            <span >create</span>
                          </button>
                           
                          </div>
                          </div>
                       
                          
                                                 </div>

                          }

                          
                      

                          {/* <button
                            type="submit"
                            disabled={validForm()}
                            className="button-submit-login"
                          >
                            Submit
                          </button> */}

                          {/* <button className={`${buttonCss.customBtn} ${buttonCss.btn1}`} >submit</button> */}
                        </form>


                        {
                          validForm()?   
                          
                        <div className="row">

                        <div className="col-lg-6">
                        <div className="floating-label form-group">
                        
                        {workspaces.length>0? <button className={`${buttonCss.customBtn} ${buttonCss.btn8}`} onClick={() => setOpen(true)}>
                        
                          <span >created</span>
                        </button>:''}
                         
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="floating-label form-group">
                        
                        {joinedWorkspaces.length>0? <button className={`${buttonCss.customBtn} ${buttonCss.btn8}`} onClick={() => setJopen(true)}>
                        <span>Joined</span>
                        
                        </button>:''}
                         
                        </div>
                        </div>
                        
                                               </div>
                          
                          :''
                        }



                      </div>
                    </div>
                    <div className="col-lg-6 content-right">
                      <img
                        src={workspaceImg}
                        className="img-fluid image-right"
                        
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={dropOpen}
        onClick={handleDropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default CreateWorkspace;
