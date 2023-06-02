
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

function TempHome() {

  const dispatch = useDispatch()

  async function logout(){
    if(window.confirm('Are you sure you want to logout')){
        await axios.get('/auth/logout')
        dispatch({type:'refresh'})
    }
   }

  return (
    <div>

        <h3 onClick={logout}>logout</h3>
        <Link to={'/create-workspace'}>create workspace</Link>
      
    </div>



    
  )
}

export default TempHome
