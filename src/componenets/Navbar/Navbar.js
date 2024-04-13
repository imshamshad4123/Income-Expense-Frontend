import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext/AuthContext'

const Navbar = () => {
  const { logoutUserAction, token } = useContext(authContext)
  const navigate=useNavigate()
  const onclick=async (e)=>{
    await logoutUserAction();
    
    navigate("/login")
    
  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg  bg-body-secondary " style={{ backgroundColor: '#343a40', color: 'white' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Expense Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {token &&<li className="nav-item">
               <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>}
            {!token &&<li className="nav-item">
               <Link className="nav-link" to="/register">Register</Link>
            </li>}
            {!token && <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>}


          </ul>
          <form className="d-flex" role="search">
            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
            {token&&<Link className="btn btn-outline-success" onClick={onclick} >Logout</Link>}
          </form>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar