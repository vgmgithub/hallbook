
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTableVenue from './DataTableVenue';

const VenueList = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { user } = useSession();


  const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1); // Navigate back one step (equivalent to clicking the browser's back button)
  };
  const tooltip = (
    <Tooltip id="tooltip">Go Back</Tooltip>
    );
    
  
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(`${BASE_URL}:5000/api/venue`)
        .then((response) => response.json())
        .then((items) => {
          setData(items);
        })
        .catch((error) => {
          console.error(error);
        });
      // Initialize DataTable
       
    }, [BASE_URL]);
  return (
    <div>
      
      
      {user.logstatus ? (
        <>
        <Header/>
      <div  className='bgbody'  style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
          <div  className='bgbodyoverlay'  style={{ background: '#fffffff2' }}>
            <div className="container">
                <span style={{ display: "flex" }}>
                <OverlayTrigger overlay={tooltip} placement="bottom">
                    <FontAwesomeIcon className='btnhover' onClick={handleGoBack} icon={faCircleArrowLeft} />
                </OverlayTrigger>
                  &nbsp;&nbsp;<h2 > Venue Info</h2>
                  <Link style={{right:"5%",position:"absolute"}} to="/venue-reg">
                                
                                <button className="btn btn-warning">
                                    Add Venue
                                </button>
                                                       
                  </Link>
                </span>
            <hr />
            <div className=''>
              <DataTableVenue data={data} />
            </div>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default VenueList