import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

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
      
    </div>



    
  )
}

export default TempHome
