import React from 'react'

function CreateTask(props) {


    
    const{newTaskModal,setNewTaskModal}=props
    console.log(props);







    const handleCancel = ()=>{
        props.setNewTaskModal(false)
    }



  return (
    <div className={`modal fade bd-example-modal-lg ${newTaskModal===true?'show':''}`} role="dialog" aria-modal="true" style={{display:'block', paddingRight:'4px' }} id="new-task-modal">
    <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header d-block text-center pb-3 border-bttom">
          <h3 className="modal-title" id="exampleModalCenterTitle">New Task</h3>
        </div>
        <form>
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText02" className="h5">Task Name</label>
                <input type="text" className="form-control" id="exampleInputText02" placeholder="Enter task Name" />
                <a href="#" className="task-edit text-body"><i className="ri-edit-box-line" /></a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText2" className="h5">project</label>
                <select name="type" className="selectpicker form-control" data-style="py-0">
                  <option>projects</option>
                  <option>project1</option>
                  <option>project2</option>
                  <option>project3</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText2" className="h5">Assigned to</label>
                <select name="type" className="selectpicker form-control" data-style="py-0">
                  <option>Memebers</option>
                  <option>Kianna Septimus</option>
                  <option>Jaxson Herwitz</option>
                  <option>Ryan Schleifer</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText05" className="h5">Due Dates*</label>
                <input type="date" className="form-control" id="exampleInputText05" defaultValue />
              </div>                        
            </div>
            <div className="col-lg-4">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText2" className="h5">Category</label>
                <select name="type" className="selectpicker form-control" data-style="py-0">
                  <option>Design</option>
                  <option>Android</option>
                  <option>IOS</option>
                  <option>Ui/Ux Design</option>
                  <option>Development</option>
                </select>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText040" className="h5">Description</label>
                <textarea className="form-control" id="exampleInputText040" rows={2} defaultValue={""} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-3">
                <label htmlFor="exampleInputText005" className="h5">Checklist</label>
                <input type="text" className="form-control" id="exampleInputText005" placeholder="Add List" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group mb-0">
                <label htmlFor="exampleInputText01" className="h5">Attachments</label>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="inputGroupFile003" />
                  <label className="custom-file-label" htmlFor="inputGroupFile003">Upload media</label>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-4">
                <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
                <div className="btn btn-primary" data-dismiss="modal" onClick={handleCancel}>Cancel</div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default CreateTask
