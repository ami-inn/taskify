import express from 'express'
import { acceptInvitation, changePassord, createNotes, createProject, createTask, createWorkspace, deleteComment, deleteMembers, deleteNotes, deleteProject, deleteTask, editProfileDetails, editProject, editUserRole, fetchAssignedTasks, fetchCalendarTasks, fetchDesk, fetchNotes, fetchProjectDetails, fetchProjectTask, fetchUser, fetchWorkspaceProjects, getWorkspace, inviteUserToWorkspace, postTaskComment, showWorkspaces, taskApprove, updateSocial, updateTask, workspaceDetails, workspaceValid } from '../controllers/userController.js'

const Router=express.Router()

Router.get('/workspace/:id',workspaceValid)
Router.post('/create-workspace',createWorkspace)
Router.patch('/edit-profile/:id',editProfileDetails)
Router.patch('/change-password/:id',changePassord)
Router.patch('/update-sociallinks/:id',updateSocial)
Router.get('/workspaces/:id',showWorkspaces)
Router.post('/inviteUsers',inviteUserToWorkspace)
Router.post('/invitation/response',acceptInvitation)
Router.put('/edituser-role',editUserRole)
Router.get('/workspace-details/:id',workspaceDetails)
Router.delete('/workspace/:workspaceId/members/:memberId',deleteMembers)
Router.post('/create-project',createProject)
Router.put('/edit-project/:projectId',editProject)
Router.get('/workspace-projects/:workspaceId',fetchWorkspaceProjects)
Router.delete('/projects/:projectId',deleteProject)
Router.get('/project/:id',fetchProjectDetails)
Router.post('/create-task',createTask)
Router.get('/projectTask/:id',fetchProjectTask)
Router.post('/task/:taskId/comments',postTaskComment)
Router.delete('/tasks/:taskId/comments/:commentId',deleteComment)
Router.delete('/tasks/:taskId',deleteTask)

Router.put('/approve-task/:taskId',taskApprove)
Router.get('/assigned-tasks',fetchAssignedTasks)
Router.put('/update-task',updateTask)
Router.get('/get-user/:userId',fetchUser)
Router.get('/desk',fetchDesk)
Router.get('/calendar-tasks',fetchCalendarTasks)
Router.get('/notes',fetchNotes)
Router.post('/notes/:workspaceId',createNotes)
Router.delete('/notes/:workspaceId/:noteId',deleteNotes)
Router.get('/fetch-workspace/:id',getWorkspace)



export default Router