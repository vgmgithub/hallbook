import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import PlaceSearch from './PlaceSearch';
import Header from './Header';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams, useHistory } from 'react-router-dom';
 
const VenueEdit = () => {
    const { user, logout } = useSession();

    const { id } = useParams(); // Access the "id" parameter from the URL
    // const history = useHistory();


    
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        mobileNumber: '',
        city: '',
        area: '',
        venuetype: '',
        facilities: {
            parking: false,
            decoration: false,
            powerbackup: false,
            catering: false,
            video_photo: false,
            achall: false,
            smoking: false,
        },   
        startDate: '',
        endDate: '',
        maxcount: 0,
        uploadedImage: null,
        address: '', // This field will store the selected address
        coordinates: null,
        filelist: {
            filename: '',
            originalname: '',
            mimetype: '',
            size: '',
            path: '',
        }
        
    });
    
    useEffect(() => {
        // Fetch data based on the "id" parameter from the URL
        fetchDataById(id);
    }, [id]);
    

    const fetchDataById = async (id) => {
        try {
          // Replace with your API or data fetching logic
          const response = await fetch(`http://localhost:5000/api/venue/${id}`);
          if (response.ok) {
              const data = await response.json();
                data.startDate=new Date(data.startDate)
                data.endDate=new Date(data.endDate)
              setFormData(data);
              console.log(data);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
    
    
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Navigate back one step (equivalent to clicking the browser's back button)
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDropdownChange = (e) => {
    setFormData({ ...formData, venuetype: e.target.value });
    };

 
    const handleCheckboxChange = (e) => {
          const { name, checked } = e.target;
          console.log(name+checked)
        setFormData({
            ...formData,
            facilities: {
              ...formData.facilities,
              [name]: checked,
            },
        });
      };
    
   
    

    const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
    };

    const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
    };


    const handlePlaceSelect = (selectedAddress, coordinates) => {
        setFormData({ ...formData, address: selectedAddress, coordinates });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);

        async function someFunction() {
     
            try {
                const response = await fetch(`http://localhost:5000/api/venue/${id}`, {
                  method: 'PUT', // Use the appropriate HTTP method for updating data
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                });
                if (response.ok) {
                    Swal.fire({
                        title: 'Venue Data Updated!',
                        text: 'Venue Data Updation completed !',
                        icon: 'success',
                        })
                //   history.push('/venue-reg'); // Redirect to the home page after successful update
                } else {
                  console.error('Failed to update data');
                }
              } catch (error) {
                console.error('Error:', error);
              }
        }
        someFunction(); // Call the async function
    };
    // 
    const halltypes = ['Mini Hall', 'Banquet Hall', 'Conference Hall', 'Exhibition Hall', 'Marriage Hall'].slice().sort();


    return (
        <>
            
           
            {user.logstatus ? (
                <div style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
                <div style={{ background: '#fffffff2' }}>
                 <Header />
                        <div className="container">
                            <span style={{display: "flex"}}>
                            <FontAwesomeIcon className='btnhover' onClick={handleGoBack} icon={faCircleArrowLeft}  /> &nbsp;<h2 > Venue Form</h2>

                            </span>
        <p>Fill details to register the Venue details & facilities</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
                <label htmlFor="dropdown" className="form-label">
                    Venue Type:
                </label>
                <select
                    className="form-select"
                    id="dropdown"
                    value={formData.venuetype}
                    onChange={handleDropdownChange}
                >
                    {halltypes.map((halltype, index) => (
                        <option key={index} value={halltype}>
                            {halltype}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                        Venue Name <span style={{ fontSize: "10px"}}>(max length 30 characters)</span>
                </label>
                <input type="text" className="form-control" value={formData.name} onChange={handleChange} maxLength={30} name='name' id="name" />
            </div>
            
            <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                      Venue Email
                  </label>
                <input type="email" className="form-control" value={formData.email} onChange={handleChange} name="email" id="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                    Venue Contact Number <span style={{ fontSize: "10px"}}>(10 digits)</span>
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
                    maxLength={10}
                    required // Make the field required
                />
                {/* <small className="text-muted">Format: 1234567890 (10 digits)</small> */}
              </div>
              <br/>
              <hr />
            <h4>Venue Address</h4>

            <div className="mb-3">
                <label htmlFor="area" className="form-label">
                    Area
                </label>
                <input type="text" className="form-control" id="area" name='area' value={formData.area} onChange={handleChange} placeholder='Eg: Anna Nagar, Arumbakkam, Madipakkam' />
            </div>
            
            <div className="mb-3">
                <label htmlFor="city" className="form-label">
                    City
                </label>
                <input type="text" className="form-control" id="city" name='city' value={formData.city} onChange={handleChange} placeholder='Eg: Chennai' />
            </div>
            
            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                        Full Address : {formData.address}
                </label>
                
                <PlaceSearch onPlaceSelect={handlePlaceSelect}  />
            </div>
            

            
            <br/><hr />
              
            <div className="row mb-3">
              <h4>Available Booking Dates</h4>
                <div className="col-md-6">
                    <label className="form-label">From:</label>
                    <br />
                    <DatePicker
                        selected={formData.startDate}
                        onChange={handleStartDateChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">To:</label>
                    <br />
                    <DatePicker
                        selected={formData.endDate}
                        onChange={handleEndDateChange}
                        />
                </div>
            </div>
            
            <div className="mb-3">
                <label htmlFor="maxcount" className="form-label">
                    Maximum Accomodation
                </label>
                <input type="number" className="form-control" value={formData.maxcount} onChange={handleChange} name='maxcount' id="maxcount" />
            </div>
            <br/><hr />
              
            <div className="row mb-3 checkbox-group">
                <h4>Venue Facilities</h4>
                <div className="col-md-12">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="Parking Facility"
                        name='parking'
                        checked={formData.facilities.parking}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">Parking Facility:</label>
                                        
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="AirCondition"
                        name='achall'
                        checked={formData.facilities.achall}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">AC Hall:</label>
                      
                    
                      
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="Decoration"
                        name='decoration'
                        checked={formData.facilities.decoration}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">Decoration Service:</label>

                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="Power Backup"
                        name='powerbackup'
                        checked={formData.facilities.powerbackup}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">Power Backup:</label>
              
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="Catering Facility"
                        name='catering'
                        checked={formData.facilities.catering}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">Catering Service:</label>

                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="video / photo"
                        name='video_photo'
                        checked={formData.facilities.video_photo}
                        onChange={handleCheckboxChange}
                    />
                    &nbsp;
                    <label className="form-check-label">Video / Photo Service:</label>
                                        
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkbox" value="smoking"
                        name='smoking'
                        checked={formData.facilities.smoking}
                        onChange={handleCheckboxChange}
                      />
                    &nbsp;<label className="form-check-label">Smoking Area:</label>
                </div>
                
            
            </div>
              <br/><hr />
            <div className="mb-3">
                                    <label className="form-label">Upload Venue Images: {formData.filelist.originalname ? (
                                        <>&nbsp;{formData.filelist.originalname}</>
                                    ) : (<>No Image Found!</> )}</label>
                <br />
              
                    
            </div>
            <div className="mb-3">
                  <label htmlFor="fare" className="form-label">
                      Fare <small>Per Day (including GST)</small>
                  </label>
                <input type="number" name="fare" className="form-control" id="fare" value={formData.fare}
                    onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-warning">
            Submit
            </button>
        </form>
                        </div>
                        </div>
    </div> ): (  <div>
                {<NotAuth/>}
    </div>  )}
    </>
  )
}

export default VenueEdit