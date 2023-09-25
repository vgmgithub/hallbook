import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
const NotAuth = () => {
    const { user,logout } = useSession();
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate('/') 
        
    };
  return (
      
      <div>
      <center>
          <div className='row'>
              <h1 style={{ color: "#dda833" }}><span className='logo'>HB</span> | HallBook</h1>
          </div>
      
      <hr />
      <br />
      
          <h2 style={{ color: "#dda833", marginTop: "200px" }}>You are not <span className='logo'>authorized!</span></h2>
          
              <button type="submit" className="btn btn-warning" onClick={handleLogout}>
              Logout
              </button>
          
      </center>
  </div>
  )
}

export default NotAuth