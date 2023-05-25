import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

function AdminHome() {
    const dispatch = useDispatch()

    async function logout(){
        if(window.confirm('are you sure you want to logout')){
            await axios.get('/admin/logout')
            dispatch({type:'refresh'})
        }
    }

  return (
    <div>
        <h1 onClick={logout}>logout</h1>
      
    </div>
  )
}

export default AdminHome

