import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import workspaceImg from "../../assets/images/login/workspace.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import ShowWorkspaces from "./ShowWorkspaces";

function CreateWorkspace() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("ameen");
  const [errMessage, setErrorMessage] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    e.preventDefault();

    if (!validForm()) {
      let { data } = await axios.post("/create-workspace", {
        name,
        description,
        userId: user._id,
      });

      if (!data.error) {
        console.log(data);
        dispatch({ type: "workspace", payload: data.workspaceId });
        dispatch({
          type: 'addWorkspace',
          payload: {
            id: data.workspaceId,
            workspace: data.workspace
          }
        });
        navigate("/workspace/" + data.workspaceId);
      } else {
        alert();
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
         
          setWorkspaces(response.data.workspace);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="wrapper">
      <ShowWorkspaces
        onClose={handleClose}
        open={open}
        selectedValue={selectedValue}
        workspaces={workspaces}
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
                          alt
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
                                />
                                <label>Description</label>
                              </div>
                            </div>
                          </div>
                         {workspaces.length>0? <p onClick={() => setOpen(true)}>show workspaces</p>:''}
                          <button
                            type="submit"
                            disabled={validForm()}
                            className="button-submit-login"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 content-right">
                      <img
                        src={workspaceImg}
                        className="img-fluid image-right"
                        alt
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreateWorkspace;
