import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import PlaceSearch from './PlaceSearch';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
function Registerform() {
    
    const initialFormState= {
        name: '',
        email:'',
        mobileNumber: '',
        address: '', // This field will store the selected address
        coordinates: null,
        city: '',
        area: '',
        username: '',
        password: '',
        repassword: '',
        
    }
    const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
    const [formData, setFormData] = useState(initialFormState);
    
    const [isMatch, setIsMatch] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
      setFormData({ ...formData, password:newPassword });
      setPassword(newPassword);
    setIsMatch(newPassword === retypePassword);
  };

  const handleRetypePasswordChange = (e) => {
      const newRetypePassword = e.target.value;
      
      setRetypePassword(newRetypePassword);
    setFormData({ ...formData, repassword:newRetypePassword });
    setIsMatch(newRetypePassword === password);
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    

    const handlePlaceSelect = (selectedAddress, coordinates) => {
        setFormData({ ...formData, address: selectedAddress, coordinates });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form data:', formData);
        async function someFunction() {
            try {
                const response = await axios.post('http://localhost:5000/insertregister', formData);
                if (response.status === 200) {
                    setFormData(initialFormState);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Registration completed !',
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
    
   

    return (
    <div style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
    <div style={{ background: '#fffffff2' }}>
      <div className="container">
        <center>
            <div className='row'>
            <h1 style={{ color: "#dda833" }}><span className='logo'>HB</span> | HallBook</h1>
            </div>
            <h2 >Registeration Form</h2>
            <p>Fill details to register for HallBook</p>
          </center>
          <hr />
        <form onSubmit={handleSubmit}>
          
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Full Name
                </label>
                <input type="text" className="form-control" onChange={handleChange} value={formData.name} name="name" id="name" required/>
            </div>
            
            <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>          
                <input type="email" className="form-control" onChange={handleChange} value={formData.email} name="email" id="email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                    Contact Number:
                </label>
                <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}" // Specify a pattern for a 10-digit number
                    required // Make the field required
                />
                <small className="text-muted">Format: 1234567890 (10 digits)</small>
              </div>
              <br/>
              <hr />
           

            <div className="mb-3">
                <label htmlFor="area" className="form-label">
                    Area
                </label>
                <input type="text" className="form-control" name='area' id="area" onChange={handleChange} value={formData.area} required placeholder='Eg: Anna Nagar, Arumbakkam, Madipakkam' />
            </div>
            
            <div className="mb-3">
                <label htmlFor="city" className="form-label">
                    City
                </label>
                <input type="text" className="form-control" onChange={handleChange} name='city' id="city" value={formData.city} placeholder='Eg: Chennai' required />
            </div>
            
            <div className="mb-3">
                <label htmlFor="address" onChange={handleChange}  className="form-label">
                     Address
                </label>
                <PlaceSearch onPlaceSelect={handlePlaceSelect}  />
            </div>
            <br/>
              <hr />
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input type="text" className="form-control" name='username' id="username" value={formData.username} onChange={handleChange}  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input type="password" className="form-control" name='password' id="password" value={formData.password} onChange={handlePasswordChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="repassword" className="form-label">
                    Retype-Password
                </label>
                <input type="password" className="form-control" name="repassword" id="repassword" value={formData.repassword} onChange={handleRetypePasswordChange} required/>
                
                            <div>
                            {(formData.repassword=='' || formData.password=='')?(<></>):((formData.password==formData.repassword) ? (
        <p style={{color:"green"}}>Password Matched!</p>
      ) : (
        <p style={{color:"red"}}>Password Not Matched!</p>
      ))}
                            </div>
            </div>
            
            <button type="submit" className="btn btn-warning" disabled={!isMatch}>
                Register
            </button>
              &nbsp;&nbsp;
            <Link to="/">
                <button type="submit" className="btn btn-warning">
                    Back
                </button>
            </Link>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Registerform