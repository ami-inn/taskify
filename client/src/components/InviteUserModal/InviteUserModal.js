import React from 'react'

function InviteUserModal() {
  return (
  <div className="modal fade bd-example-modal-lg show" role="dialog" aria-modal="true" id="new-user-modal" style={{display:'block', paddingRight:'4px' }}>
  <div className="modal-dialog  modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header d-block text-center pb-3 border-bttom">
        <h3 className="modal-title" id="exampleModalCenterTitle02">New User</h3>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-3 custom-file-small">
              <label htmlFor="exampleInputText01" className="h5">Upload Profile Picture</label>
              <div className="custom-file">
                <input type="file" className="custom-file-input" id="inputGroupFile02" />
                <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Full Name</label>
              <input type="text" className="form-control" id="exampleInputText2" placeholder="Enter your full name" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText04" className="h5">Phone Number</label>
              <input type="text" className="form-control" id="exampleInputText04" placeholder="Enter phone number" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText006" className="h5">Email</label>
              <input type="text" className="form-control" id="exampleInputText006" placeholder="Enter your Email" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Type</label>
              <select name="type" className="selectpicker form-control" data-style="py-0">
                <option>Type</option>
                <option>Trainee</option>
                <option>Employee</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Role</label>
              <select name="type" className="selectpicker form-control" data-style="py-0">
                <option>Role</option>
                <option>Designer</option>
                <option>Developer</option>
                <option>Manager</option>
                <option>BDE</option>
                <option>SEO</option>
              </select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
              <div className="btn btn-primary mr-3" data-dismiss="modal">Save</div>
              <div className="btn btn-primary" data-dismiss="modal">Cancel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
   
  )
}

export default InviteUserModal
