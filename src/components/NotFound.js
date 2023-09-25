import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate back one step (equivalent to clicking the browser's back button)
      };
  return (
      <div>
        <center>
            <div className='row'>
                <h1 style={{ color: "#dda833" }}><span className='logo'>HB</span> | HallBook</h1>
            </div>
        
        <hr />
        <br />
        
            <h2 style={{ color: "#dda833", marginTop: "200px" }}><span className='logo'>404</span> - Page Not Found</h2>
            
                <button type="submit" className="btn btn-warning" onClick={handleGoBack}>
                Go Back
                </button>
            
        </center>
    </div>
  )
}

export default NotFound