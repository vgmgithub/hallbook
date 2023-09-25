import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Component.css';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import Header from './Header';
import SearchHall from './SearchHall';
import loaderGif from './Hourglass.gif'; // Import your loader GIF

const Home = () => {

    const loader = <img src={loaderGif} alt="Loading..." style={{ width: "20px"}}/>;
    const { user } = useSession();
 
    const [counts, setCounts] = useState({ bookCount: loader, venueCount: loader, userCount: loader });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch('http://localhost:5000/counts'); // Assuming your API endpoint is at '/api/counts'
        if (response.ok) {
          const data = await response.json();
          setCounts(data);
        } else {
          console.error('Error fetching counts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    setInterval(() => {
        fetchCounts();
      }, 1000);
  }, []);
    
    return (
        <div >
            {user.logstatus ? (
                <div>
                    <Header />
                    {user.username === 'admin' ? (
                        <center>
                            <div className='container' style={{ display: "flux", marginTop: "150px" }}>
                                {/* <div className='row'> */}
                                    <Link to="/bookings">                                        
                                            <button className="btn btn-warning">
                                                Bookings
                                            </button>                                                            
                                    </Link>
                                    &nbsp;
                                    <Link to="/venue-info">                                        
                                            <button className="btn btn-warning">
                                                Venue Info
                                            </button>                                                                
                                    </Link>
                                    &nbsp;                                
                                    <Link to="/user-info">                                        
                                            <button className="btn btn-warning">
                                                User Info
                                            </button>                                                           
                                    </Link>
                                {/* </div> */}
                                <hr></hr>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='card countercard' >
                                            <div className='card-body'>
                                                <h1>{counts.bookCount}</h1>
                                                <p>Bookings</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='card countercard'>
                                            <div className='card-body'>
                                                <h1>{counts.venueCount}</h1>
                                                <p>Available Venue</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='card countercard'>
                                            <div className='card-body'>
                                                <h1>{counts.userCount}</h1>
                                                <p>Clients</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </center>) : (
                            // <div className='container'>
                                <div  className='bgbody'  style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
                                    <div  className='bgbodyoverlay'  style={{ background: '#fffffff2' }}>
                                        <marquee behavior="scroll" direction="left" style={{ color: "#dda833"}}>Hi <span className='welcomename'>{user.username},</span>Welcome to <span className='welcomename'>HALLBOOK !</span></marquee>
                                    <center>
                                        <div style={{marginTop: "25px"}}>
                                            <Link to={`/my-bookings/${user.userData}`} style={{ textDecoration: "none" }}><p className='bookinglink' style={{ color: "rgb(211 152 17)",fontWeight: "900" }}>My Bookings</p></Link>
                                        </div>
                                        <SearchHall/>
                                    </center>    
                                    
                                    </div>                                
                                </div>
                            // </div>
                        )}
                </div>) : (  <div>
                    {<NotAuth/>}
        </div>  )}
           
        </div>
    );
}

export default Home