import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect,useState} from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DataTable from './DataTable';

const UserList = () => {

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
      fetch('http://localhost:5000/api/items')
        .then((response) => response.json())
        .then((items) => {
          setData(items);
        })
        .catch((error) => {
          console.error(error);
        });
      // Initialize DataTable
       
    }, []);
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
                  &nbsp;&nbsp;<h2 > User Info</h2>
                  
                </span>
            <hr />
            <div className=''>
                <DataTable data={data} />
            </div>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default UserList