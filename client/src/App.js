
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserSignup from './components/UserSignup/UserSignup';
import UserLanding from './components/UserLanding/UserLanding';
import UserLogin from './components/UserLogin/UserLogin';
import VerifyOtp from './components/VerifyOtp/VerifyOtp';

function App() {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.withCredentials = true;

  const { user, admin,refresh } = useSelector((state) => {
    return state;
  });

  const dispatch=useDispatch()



  return (
  <Router>
    <Routes>
      <Route path='/signup' element={<UserSignup/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/' element={<UserLanding/>}/>
      
    </Routes>
  </Router>
  );
}

export default App;
