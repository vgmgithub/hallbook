// LoginForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSession } from './SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import axios from 'axios';
import Loader from './Loader';

// import { Link } from 'react-router-dom';
// import Home from './Home';
 
function LoginForm() {
  const ADMIN_UNAME = process.env.REACT_APP_ADMIN_USERNAME;
  const ADMIN_UPASS = process.env.REACT_APP_ADMIN_PASSWORD;  
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // console.log(process.env.REACT_APP_ADMIN_USERNAME);
  const { login } = useSession();
  const initialFormState = {
    username: '',
    password: '',
  };
 
  
  const [formData, setFormData] = useState(initialFormState);
  const [responseData, setResponseData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Flag to track login status
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Simulate a login check (replace with your actual login logic)
    if (formData.username === ADMIN_UNAME && formData.password === ADMIN_UPASS) {
      setIsLoggedIn(true);
      

      if (isLoggedIn) {
        navigate('/home');        
      }
    } else {
        try {
          const response = await axios.post(`${BASE_URL}:5000/api/authenticate`, formData);
          if (response.status === 200) {
            
            
            setIsLoggedIn(true);
            setResponseData(response.data.userData);
      
            console.log(response.data.userData)
            if (isLoggedIn) {
              navigate('/home');
            }
            // Add logic to handle successful registration (e.g., redirect to a login page)
          }
        } catch (error) {
        
          console.error(error);
          console.log('An unexpected error occurred.');
          setIsLoggedIn(false);

                  // alert('Invalid username or password');
                  Swal.fire({
                    title: 'Error!',
                    text: 'Invalid Credentials. Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'yes'
                  })
                  setFormData(initialFormState);
          // Handle other unexpected errors (display an error message, etc.)
        }
    }
    
     
    login(isLoggedIn, formData.username, responseData);
    
  };



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading operation (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when loading is complete
    }, 1000); // Simulate a 2-second loading time
  }, []);


  return (
    <center>
      {isLoading ? (
        <Loader/> // Display the loader component while isLoading is true
      ) : (
        <div className='card' style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
          <div className='card-body'>
            <div className='row'>
              <h1 className="LoginLogo"><span className='logo'>HB</span> | HallBook</h1>
            </div>
          
            <hr></hr>
            <form onSubmit={handleSubmit} className='loginform'>
          
              <div className="mb-3 input-container">
            
                <FontAwesomeIcon icon={faUser} className="input-icon" />
           
                <input
                  type="text"
                  className=" input-field"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 input-container">
                <FontAwesomeIcon icon={faEye} className="input-icon" />
                <input
                  type="password"
                  className="input-field"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-warning">
                Login
              </button> &nbsp;&nbsp;
              <Link to="/register">
                <button type="submit" className="btn btn-warning">
                  Register
                </button>
              </Link>
            
            </form>
          </div>
        </div>
      )}
    </center>
  );
}

export default LoginForm;
