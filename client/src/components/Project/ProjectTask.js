import React, { useEffect, useState } from "react";
import UserSidebar from "../UserSidebar/UserSidebar";
import UserHeder from "../UserHeader/UserHeder";
import CreateTask from "./CreateTask";
import {
  RiAlignJustify,
  RiArrowDownSLine,
  RiDeleteBack2Fill,
  RiDeleteBin2Fill,
  RiEditBoxLine,
  RiEye2Fill,
  RiEyeFill,
  RiSurveyLine,
  RiUser2Fill,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import commentCss from "../../styles/TaskComment.module.css";
import { useSelector } from "react-redux";
import SnackBar from "../SnackBar/SnackBar";
import Nodata from "../../styles/Nodata.module.css";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from "react-bootstrap";

function ProjectTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const workspaceId = useSelector((state)=>state.currentWorkspace)
  // const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);

  const [newTaskModal, setNewTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [filteredTasks, setfilteredTasks] = useState([]);
  const [showFilter, setShowFiler] = useState(false);
  const [assigneeId, setAssigneeId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [warnModal,setWarnModal]=useState(false)
  const [taskId,setTaskId]=useState('')

  console.log(comment, "comment");
  // const [taskId,setTaskId]=useState('')
  const [colapseShowId, setColapseShowId] = useState(false);
  const user = useSelector((state) => {
    return state.user.details;
  });
  const isCreator = project.creator === user._id;
  console.log("is crearor", isCreator);

  console.log("project", project);

  // const midpoint=Math.ceil(tasks.subtasks.length / 2)

  // const subtasksFirsthalf=tasks.subtasks.slice(0,midpoint)
  // const subtasksSecondhalf=tasks.subtasks.slice(midpoint)

  useEffect(() => {
    fetchProjectDetails();
  }, [id, refresh]);

  const handleModalToggle = (colapseShowId) => {
    setColapseShowId((prevId) =>
      prevId === colapseShowId ? null : colapseShowId
    );
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`/projectTask/${id}`);

      if (response.data.error) {
        alert("error");
        navigate("/projects");
      } else {
        setProject(response.data.project);
        setTasks(response.data.project.tasks);
        setfilteredTasks(response.data.project.tasks);
      }
    } catch (err) {
      console.log("error");
    }
  };

  const handleCommentSubmit = async (taskId) => {
    try {
      const response = await axios.post(`/task/${taskId}/comments`, {
        content: comment,
        postedBy: user._id,
      });

      if (response.data.error) {
        setSnackOpen(true);
        setSeverity("error");
        setMessage(response.data.message);
      } else {
        setRefresh(!refresh);
        setSnackOpen(true);
        setSeverity("success");
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      console.log("error");
    }
  };

  const handleDeleteComment = async (taskId, commentId) => {
    try {
      console.log("etnere");
      const response = await axios.delete(
        `/tasks/${taskId}/comments/${commentId}`
      );
      if (response.data.error) {
        setSnackOpen(true);
        setSeverity("error");
        setMessage(response.data.message);
      } else {
        setRefresh(!refresh);
        setSnackOpen(true);
        setSeverity("success");
        setMessage(response.data.message);
      }
    } catch (err) {
      console.log("errorrrrr");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      if (!isCreator) {
        setSnackOpen(true);
        setSeverity("error");
        setMessage("you are not the creator");
        return;
      } else {
        const response = await axios.delete(`/tasks/${taskId}`,{data:{projectId:project._id}});

        if (response.data.error) {
          setWarnModal(!warnModal)
          setSnackOpen(true)
          setSeverity('error')
          setMessage(response.data.message)
        } else {
         setSnackOpen(true)
         setWarnModal(!warnModal)
         setSeverity('success')
         setMessage(response.data.message)
         setRefresh(!refresh)
        }
      }
    } catch (err) {
      console.log("errorr of handle delete task");
    }
  };

  const handleMemberSelection = (memberId, memberName) => {
    if (memberId === "") {
      filteredTasksByAssigneeId("");
    }
    setSelectedMember(memberName);
    filteredTasksByAssigneeId(memberId);
    setShowFiler(!showFilter); // Call your existing function to filter tasks
  };

  const filteredTasksByAssigneeId = (id) => {
    if (id) {
      console.log("iddd", id);
      console.log(tasks);
      const filtered = tasks.filter((task) => task.assigneeId?._id === id);
      console.log("filtered", filtered);
      setfilteredTasks(filtered);
    } else {
      setfilteredTasks(tasks);
    }
  };

  const setOpenWarnModal=(id)=>{
    console.log('entered here on wanrn modal');
    setTaskId(id)
    setWarnModal(true)

  }

  console.log(tasks, "taskssss");

  return (
    <div
      className={` ${newTaskModal === true ? "outwrap modal-open" : ""}`}
      style={newTaskModal ? { display: "block", paddingRight: "4px" } : {}}
    >
      <div className="wrapper">
        <UserSidebar page={"project"} />
        <UserHeder />
        <div className="content-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between breadcrumb-content">
                      <h5>{project.name} Tasks</h5>
                      <div className="d-flex flex-wrap align-items-center">
                        <div
                          className={`dropdown dropdown-project mr-3 ${
                            showFilter ? "show" : ""
                          }`}
                        >
                          <div
                            className="dropdown-toggle"
                            id="dropdownMenuButton03"
                            data-toggle="dropdown"
                          >
                            <div className="btn bg-body">
                              <span className="h6">assigned :</span>{" "}
                              {selectedMember}
                              <RiArrowDownSLine
                                onClick={() => {
                                  setShowFiler(!showFilter);
                                }}
                                className="ri-arrow-down-s-line ml-2 mr-0"
                              />
                            </div>
                          </div>
                          <div
                            className={`dropdown-menu dropdown-menu-right ${
                              showFilter ? "show" : ""
                            }`}
                            aria-labelledby="dropdownMenuButton03"
                          >
                            <a
                              className="dropdown-item"
                              onClick={() => {
                                handleMemberSelection("", "");
                              }}
                            >
                              <i className="ri-mic-line mr-2" />
                              show all
                            </a>
                            {project?.members?.map((member) => (
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  handleMemberSelection(
                                    member._id,
                                    member.name
                                  );
                                }}
                              >
                                <i className="ri-mic-line mr-2" />
                                {member.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        {isCreator ? (
                          <a
                            onClick={() => {
                              setNewTaskModal(true);
                            }}
                            className="btn btn-primary"
                            style={{ color: "white" }}
                            data-target="#new-task-modal"
                            data-toggle="modal"
                          >
                            New Task
                          </a>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredTasks?.length === 0 ? (
                <div className={Nodata.emptyState}>
                  <div className={Nodata.emptyStateContent}>
                    <div className={Nodata.emptyStateIcon}>
                      <img
                        src="https://t4.ftcdn.net/jpg/04/75/01/23/240_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg"
                        alt=""
                      />
                    </div>
                    <div className={Nodata.emptyStateMessage}>
                      No Task has been assigned yet.
                    </div>
                    <div className={Nodata.emptyStateHelp}>
                      Add a new Task by simpley clicking the button on top right
                      side.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        {filteredTasks.map((task) => (
                          <div className="col-lg-12">
                            <div className="card card-widget task-card">
                              <div className="card-body">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                  <div className="d-flex align-items-center">
                                    {/* <div className="custom-control custom-task custom-checkbox custom-control-inline">
                        <input type="checkbox" className="custom-control-input" id="customCheck01" />
                        <label className="custom-control-label" htmlFor="customCheck01" />
                      </div> */}
                                    <div>
                                      <h5 className="mb-2">{task.name}</h5>
                                      {/* <h6>assigned To : {task.assigneeId.name}</h6> */}
                                      <div className="media align-items-center">
                                        <div className="btn bg-body mr-3">
                                          <RiAlignJustify className="ri-align-justify mr-2" />
                                          {task.completed?task.subtasks.length:0}/{task.subtasks.length}
                                        </div>
                                        <div className="btn bg-body mr-3">
                                          <RiSurveyLine className="ri-survey-line mr-2" />
                                          {task.comments.length}
                                        </div>
                                        <div className="btn bg-body">
                                          <RiUser2Fill className="ri-survey-line mr-2" />
                                          {task.assigneeId.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="media align-items-center mt-md-0 mt-3">
                                    <a className="btn bg-secondary-light mr-3">
                                      {task.priority}
                                    </a>
                                    <a className={`btn ${task.completed?'bg-success-light':'bg-secondary-light'}  mr-3`}>
                                      {task.completed?'completed':'pending'}
                                    </a>
                                    <a
                                      className="btn bg-primary-light mr-3"
                                      onClick={() => {
                                        handleModalToggle(task._id);
                                      }}
                                      data-toggle="collapse"
                                      role="button"
                                      aria-expanded="false"
                                      aria-controls="collapseEdit1"
                                    >
                                      <RiEyeFill className="ri-edit-box-line m-0" />
                                    </a>
                                    <a
                                      className="btn bg-danger-light"
                                      onClick={()=>{setOpenWarnModal(task._id)}}
                                      data-toggle="collapse"
                                      role="button"
                                      aria-expanded="false"
                                      aria-controls="collapseEdit1"
                                    >
                                      <RiDeleteBack2Fill className="ri-edit-box-line m-0" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`collapse ${
                                colapseShowId === task._id ? "show" : ""
                              }`}
                              id="collapseEdit1"
                            >
                              <div className="card card-list task-card">
                                <div className="card-header d-flex align-items-center justify-content-between px-0 mx-3">
                                  <div className="header-title">
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck05"
                                        checked={task.completed?true:false}
                                        disabled
                                      />
                                      <label
                                        className="custom-control-label h5"
                                        htmlFor="customCheck05"
                                      >
                                        Task Status
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    <a
                                      className={`btn  ${
                                        task.completed
                                          ? "bg-success-light"
                                          : "bg-secondary-light"
                                      }`}
                                    >
                                      {task.completed
                                        ? "completed"
                                        : "not completed"}
                                    </a>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="form-group mb-3 position-relative">
                                    <input
                                      type="text"
                                      className="form-control bg-white"
                                      placeholder="Design landing page of webkit"
                                    />
                                    <a
                                      href="#"
                                      className="task-edit task-simple-edit text-body"
                                    >
                                      <i className="ri-edit-box-line" />
                                    </a>
                                  </div>
                                  <div className="card mb-3">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <div className="form-group mb-0">
                                            <label
                                              htmlFor="exampleInputText2"
                                              className="h5"
                                            >
                                              Assigned To{" "}
                                            </label>
                                            <select
                                              name="type"
                                              className="selectpicker form-control"
                                              data-style="py-0"
                                              disabled
                                            >
                                              <option>
                                                {task.assigneeId.name}
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="form-group mb-0">
                                            <label
                                              htmlFor="exampleInputText3"
                                              className="h5"
                                            >
                                              Due Date
                                            </label>

                                            <input
                                              type="date"
                                              className="form-control"
                                              disabled
                                              id="exampleInputText3"
                                              defaultValue={new Date(
                                                task.dueDate
                                              ).toLocaleDateString("en-CA")}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card mb-3">
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <h5 className="mb-2">Description</h5>
                                          <p className="mb-0">
                                            {task.description}
                                          </p>
                                        </div>
                                        <div className="col-lg-6">
                                          <h5 className="mb-2">Checklist</h5>
                                          <div className="row">
                                            <div className="col-lg-12">
                                              {task.subtasks.map((subtask) => (
                                                <div className="custom-control custom-checkbox custom-control-inline mr-3">
                                                  <input
                                                    disabled
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="customCheck1"
                                                  />
                                                  <label
                                                    className="custom-control-label mb-1"
                                                    htmlFor="customCheck1"
                                                  >
                                                    {" "}
                                                    {subtask.name}{" "}
                                                  </label>
                                                </div>
                                              ))}
                                            </div>
                                            {/* <div className="col-lg-6">

                              <div className="custom-control custom-checkbox custom-control-inline mr-0">
                                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                  <label className="custom-control-label mb-1" htmlFor="customCheck1">Design mobile version</label>
                                </div>



                              </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-group mb-0">
                                    <label
                                      htmlFor="exampleInputText01"
                                      className="h5"
                                    >
                                      Attachments
                                    </label>
                                    <div className="custom-file">
                                      {/* <input type="file" className="custom-file-input" id="inputGroupFile001" />
                        <label className="custom-file-label" htmlFor="inputGroupFile001">Upload media</label> */}
                                    </div>
                                  </div>

                                  <div className={commentCss.block}>
                                    <div className={commentCss.blockHeader}>
                                      <div className={commentCss.title}>
                                        <h2>Comments</h2>
                                        <div className={commentCss.tag}>
                                          {task.comments.length}
                                        </div>
                                      </div>
                                    </div>
                                    <div className={commentCss.writing}>
                                      <input
                                        className={commentCss.textarea}
                                        onChange={(e) => {
                                          setComment(e.target.value);
                                        }}
                                      ></input>

                                      <div className={commentCss.footer}>
                                        <div className={commentCss.textFormat}>
                                          <button className={commentCss.btn}>
                                            <i className="ri-bold" />
                                          </button>
                                          <button className={commentCss.btn}>
                                            <i className="ri-italic" />
                                          </button>
                                        </div>
                                        <div className={commentCss.groupButton}>
                                          <button className={commentCss.btn}>
                                            <i className="ri-at-line" />
                                          </button>
                                          <button
                                            className={`${commentCss.btn} ${commentCss.primary}`}
                                            onClick={() => {
                                              handleCommentSubmit(task._id);
                                            }}
                                          >
                                            Send
                                          </button>
                                        </div>
                                      </div>
                                    </div>

                                    {task.comments.map((comment) => (
                                      <div className={commentCss.comment}>
                                        <div className={commentCss.userBanner}>
                                          <div className={commentCss.user}>
                                            <div className={commentCss.avatar}>
                                              <img
                                                src={
                                                  comment.postedBy.profile.url
                                                }
                                              />
                                              <span
                                                className={`${commentCss.stat} ${commentCss.grey}`}
                                              />
                                            </div>
                                            <h5>{comment.postedBy.name}</h5>
                                          </div>
                                          <button
                                            className={`${commentCss.btn} ${commentCss.dropdown} `}
                                          >
                                            <i className="ri-more-line" />
                                          </button>
                                        </div>
                                        <div className={commentCss.content}>
                                          <p>{comment.content}</p>
                                        </div>
                                        <div className={commentCss.footer}>
                                          <button className={commentCss.btn}>
                                            <i className="ri-emotion-line" />
                                          </button>
                                          {/* <div className="reactions">
  <button className="btn react"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/thumbs-up_1f44d.png" alt />4</button>
  <button className="btn react"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/angry-face-with-horns_1f47f.png" alt />1</button>
</div> */}
                                          <div className="divider" />
                                          <a href="#">Posted On : </a>
                                          <div className="divider" />
                                          <span className="is-mute">
                                            {new Date(
                                              comment.postedAt
                                            ).toLocaleDateString("en-CA")}{" "}
                                          </span>
                                          <RiDeleteBin2Fill
                                            onClick={() =>
                                              handleDeleteComment(
                                                task._id,
                                                comment._id
                                              )
                                            }
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ))}

                                    <div className="load">
                                      <span>
                                        <i className="ri-refresh-line" />
                                        Comments
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Page end  */}
          </div>
        </div>
      </div>

      {newTaskModal === true && (
        <CreateTask
          newTaskModal={newTaskModal}
          setNewTaskModal={setNewTaskModal}
          projectId={id}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}

      {snackOpen && (
        <SnackBar
          severity={severity}
          message={message}
          snackOpen={snackOpen}
          setSnackOpen={setSnackOpen}
        />
      )}

<Dialog
        open={warnModal}
        onClose={()=>{setWarnModal(!warnModal)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure Do You Want To Delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are You Sure Do You Want to Delete This Member 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setWarnModal(!warnModal)}}>cancel</Button>
          <Button onClick={()=>{handleDeleteTask(taskId)}} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProjectTask;
