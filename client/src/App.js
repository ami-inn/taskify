import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserSignup from './components/UserSignup/UserSignup';
import UserLanding from './components/UserLanding/UserLanding';
import UserLogin from './components/UserLogin/UserLogin';
import VerifyOtp from './components/VerifyOtp/VerifyOtp';
import AdminLogin from './components/AdminLogin/AdminLogin';
import ForgotEmail from './components/ForgotEmail/ForgotEmail';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AdminHome from './components/AdminHome/AdminHome';
import TempHome from './components/TempHome/TempHome';
import AdminUsers from './components/AdminUsers/AdminUsers';
import CreateWorkspace from './components/CreateWorkspace/CreateWorkspace';
import UserWorkspace from './components/UserWorkspace/UserWorkspace';
import UserTeam from './components/UserTeam/UserTeam';
import UserProfile from './components/UserProfile/UserProfile';
import EditProfile from './components/EditProfile/EditProfile';
import AdminWorkspace from './components/AdminWorkspace/AdminWorkspace';
// ..
AOS.init();

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, admin,refresh } = useSelector((state) => {
    return state;
  });

  const dispatch=useDispatch()

  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/auth/check");
      dispatch({ type: "user", payload: { login: data.loggedIn, details: data.user } })
      let { data: adminData } = await axios.get("/admin/auth/check");
      dispatch({ type: "admin", payload: { login: adminData.loggedIn, details: adminData.admin } })
          })()
  }, [refresh])


  console.log(admin);

  return (
  
    <Routes>

    {
      admin.login &&
      <>
      <Route path='/admin/login' element={<Navigate to='/admin'/>}></Route>
      <Route path='/admin/' element={<AdminHome/>}></Route>
      <Route path='/admin/users' element={<AdminUsers/>}/>
      <Route path='/admin/workspaces' element={<AdminWorkspace/>}/>
      </>
    }

    {
      admin.login === false &&
      <>
      <Route path='/admin/login' element={<AdminLogin/>}></Route>
      <Route path='/admin' element={<Navigate to='/admin/login'/>}></Route>
      <Route path='/admin/*' element={<Navigate to='/admin/login'/>}></Route>
      </>
    }
    {/* user side */}

    {
      user.login &&
      <>
         <Route path='/login' element={<Navigate to={'/temphome'}/>}></Route>
         <Route path='/signup' element={<Navigate to="/temphome" />} />
         <Route path='/' element={<Navigate to="/temphome" />} />
         <Route path='/tempHome' element={<TempHome/>} />
         <Route path='/workspace/:id' element={<UserWorkspace/>}/>
         <Route path='/workspace' element={<UserWorkspace/>}/>
         <Route path='/create-workspace' element={<CreateWorkspace/>} />
         <Route path='/team' element={<UserTeam/>} />
         <Route path='/profile' element={<UserProfile/>} />
         <Route path='/edit-profile/:id' element={<EditProfile/>} />



      </>
    }

{
      user.login === false &&
      <>
       <Route path='/login' element={<UserLogin/>} />
       <Route path='/signup' element={<UserSignup/>} />
       <Route path='/forgot' element={<ForgotEmail/>} />
       <Route path='/' element={<UserLanding/>} />
        <Route path='/temphome' element={<Navigate to={'/'}/>} />
      

      </>
    }

    </Routes>
  
  );
}

export default App;
