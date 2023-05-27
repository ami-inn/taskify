
import * as React from 'react' 
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import AdminHeader from '../AdminHeader/AdminHeader';

function AdminHome() {




  return (
    <div className="wrapper">
      {/* <h1 onClick={logout}>logout</h1> */}

      <AdminSidebar page={'dashboard'} />
      <AdminHeader/>
      

     
    
    </div>

    
  );
}

export default AdminHome;
