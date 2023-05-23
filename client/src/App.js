
import './App.css';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserSignup from './components/UserSignup/UserSignup';

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
      <Route path='/' element={<UserSignup/>}/>
    </Routes>
  </Router>
  );
}

export default App;
