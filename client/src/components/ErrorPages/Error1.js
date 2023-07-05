import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../../assets/images/error/404.png'

function Error1() {
  return (
      
 <div className="wrapper">
  <div className="container">
    <div className="row no-gutters height-self-center">
      <div className="col-sm-12 text-center align-self-center">
        <div className="iq-error position-relative">
          <img src={errorImg} className="img-fluid iq-error-img" alt />
          <h2 className="mb-0 mt-4">Oops! This Page is Not Found.</h2>
          <p>The requested page dose not exist.</p>
          <Link className="btn btn-primary d-inline-flex align-items-center mt-3" to={'/'}><i className="ri-home-4-line" />Back to Home</Link>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Error1
