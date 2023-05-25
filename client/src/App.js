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
      let { data } = await axios.get("/check");
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
      </>
    }

    {
      admin.login === false &&
      <>
      <Route path='/admin/login' element={<AdminLogin/>}></Route>
      </>
    }

    </Routes>
  
  );
}

export default App;
