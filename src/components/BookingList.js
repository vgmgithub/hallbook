
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTableBooking from './DataTableBooking';

const BookingList = () => {
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
      // Fetch data based on the "id" parameter from the URL
      fetchDataById();
  }, []);
  

  const fetchDataById = async () => {
    try {
      // Replace with your API or data fetching logic
      const response = await fetch(`${BASE_URL}:5000/booking/`);
      if (response.ok) {
        const data = await response.json();
        data.startDate = new Date(data.startDate)
        data.endDate = new Date(data.endDate)
        setData(data);
        console.log(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
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
                  &nbsp;&nbsp;<h2 > Bookings</h2>

                </span>
            <hr />
            <div className=''>
                <DataTableBooking data={data}/>
            </div>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default BookingList