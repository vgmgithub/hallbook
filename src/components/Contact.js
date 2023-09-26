
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'

const Contact = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const initialStateContact = {
      name: '',
      email: '',
      message: '',
  }
  const { user } = useSession();
  const [formData, setFormData] = useState(initialStateContact);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to handle form submission, like sending the data to a server or displaying a confirmation message.
    // For now, let's just log the form data to the console.
    console.log(formData);

    async function someFunction() {
      try {
          const response = await axios.post(`${BASE_URL}:5000/contact`, formData);
          if (response.status === 200) {
              setFormData(initialStateContact);
              Swal.fire({
                  title: 'Success!',
                  text: 'Contact enquiry submitted !',
                  icon: 'success',
                })
                
              // Add logic to handle successful registration (e.g., redirect to a login page)
          } else {
              console.log('Unexpected response:', response.data);
              // Handle unexpected response (display an error message, etc.)
          }
      } catch (error) {
          console.error(error);
          console.log('An unexpected error occurred.');
          // Handle other unexpected errors (display an error message, etc.)
      }
  }
  someFunction(); // Call the async function
  };

   
  const navigate = useNavigate();
  
  const handleGoBack = () => {
      navigate(-1); // Navigate back one step (equivalent to clicking the browser's back button)
  };

  const tooltip = (
    <Tooltip id="tooltip">Go Back</Tooltip>
  );
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
                    &nbsp;&nbsp;<h2 >Contact Us</h2>
                </span>
              <hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange} className="form-control"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange} className="form-control"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4" className="form-control"
                    required
                  />
                  </div>
                  <br></br>
                <button type="submit" className="btn btn-warning">Submit</button>
              </form>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default Contact