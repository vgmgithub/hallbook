import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import LocationMenu from './LocationMenu';
import BatteryPercentage from './BatteryPercentage';
const Header = () => {

    const { user,logout } = useSession();
    const navigate = useNavigate();
   
    const handleLogout = () => {
        logout();
        navigate('/') 
          
      };
  return (
      <header style={{backgroundImage:'url("/images/homeback.jpg")', backgroundSize:'cover'}}>
        
        <div className='row' style={{backgroundColor:'#dda833cc'}}>
            <h1><span className='logo'>HB</span> | HallBook</h1>
                {user.username === 'admin' ? (
          <nav class="menu">
            
                <ul>
                  <li><BatteryPercentage/></li>
                  <li><Link to="/home"><FontAwesomeIcon icon={faHome} /></Link></li>
                  
                  <li><a href="" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></a></li>
                
                </ul>
                </nav>
              ): (
            <nav class="menu">
              <LocationMenu/> 
                      <ul>
                          <li><Link to="/home">Home</Link></li>
                          <li><Link to="/about-us" >About</Link></li>
                          <li><Link to="/services">Services</Link></li>
                          {/* <li><a href="/bookings">Bookings</a></li> */}
                          <li><Link to="/contact-us">Contact</Link></li>
                          <li><a href="" onClick={handleLogout}>Logout</a></li>
                          
                      </ul>
                      
                  </nav>
              ) }
              </div>
          
    </header>
  )
}

export default Header