import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from './Header';
import { useBookSession, useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faIndianRupee } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams  } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const BookingPage = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { user } = useSession();
    const { bookingsession } = useBookSession();

    const { id } = useParams(); // Access the "id" parameter from the URL
  


    
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
        coordinates: {
            lat: '',
            lng: '',
        },
        filelist: {
            filename: '',
            originalname: '',
            mimetype: '',
            size: '',
            path: '',
        },

        
    });
    const [BookingData, setBookingData] = useState({
        venue_id: '',
        venue_name: '',
        venue_count: '',
        venue_location: '',
        user_id: '',     // Add newField1
        user_name: '',
        booking_date: '',
    });
    useEffect(() => {
        // Fetch data based on the "id" parameter from the URL
        fetchDataById(id);
    }, [id]);
    

    const fetchDataById = async (id) => {
        try {
          // Replace with your API or data fetching logic
          const response = await fetch(`${BASE_URL}:5000/api/venue/${id}`);
          if (response.ok) {
              const data = await response.json();
                data.startDate=new Date(data.startDate)
                data.endDate=new Date(data.endDate)
              setFormData(data);
            //   console.log(data);
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
    


    const handleSubmit = (e) => {
        e.preventDefault();
        const UserData=user;
        const venueData = formData;
        const updatedData = {
            venue_id: id,
            venue_name: venueData.name,
            venue_count: venueData.maxcount,
            venue_location: venueData.area,
            user_id:UserData.userData,     // Add newField1
            user_name:UserData.username,     // Add newField2
            booking_date:bookingsession,     // Add newField2
          };
       
      
          // Update the state with the new object
          setBookingData(updatedData);
          
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to make this Booking ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Book it!'
          }).then((result) => {
              if (result.isConfirmed) {
                
                  
                async function someFunction() {
                    try {
                        const response = await axios.post(`${BASE_URL}:5000/booking`, BookingData);
                        console.log('retrun res-'+response)
                        if (response.status === 201) {
                            Swal.fire({
                                title: 'Booked!',
                                text: 'Your Booking is done.',
                                icon: 'success',
                            })
                              
                            // Add logic to handle successful registration (e.g., redirect to a login page)
                        } else if (response.status === 200) {
                            Swal.fire({
                                title: 'Duplicate Booking!',
                                text: 'Your Booking is already done.',
                                icon: 'warning',
                            })
                              
                            // Add logic to handle successful registration (e.g., redirect to a login page)
                        } else if (response.status === 400) {
                            Swal.fire({
                                title: 'Re-Do Booking777',
                                text: 'Your Booking is not done.',
                                icon: 'warning',
                            })
                            
                        } else {
                            Swal.fire({
                                title: 'Re-Do Booking123',
                                text: 'Your Booking is not done.',
                                icon: 'warning',
                            })
                            console.log('Unexpected response:', response.data);
                        }
                    } catch (error) {
                        console.error(error);
                        Swal.fire({
                            title: 'Re-Do Booking',
                            text: 'Your Booking Failed to process.',
                            icon: 'danger',
                        })
                        console.log('An unexpected error occurred.');
                    }
                }
                someFunction(); // Call the async function
             
            }
          })
      
    };
    // 
    const halltypes = ['Mini Hall', 'Banquet Hall', 'Conference Hall', 'Exhibition Hall', 'Marriage Hall'].slice().sort();

    const latitude = formData.coordinates.lat;
    const longitude = formData.coordinates.lng;
    console.log('Booking data:', BookingData);
    // // Construct the Google Maps URL with the coordinates
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.930367574776!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085805c5e8d38db%3A0xf919c1928b66de65!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619071690624!5m2!1sen!2sus`;

    return (
        <>
            
           
            {user.logstatus ? (
                <div style={{ backgroundImage: 'url("/images/webbackfunction.jpg")', backgroundSize: 'cover' }}>
                <div style={{ background: '#fffffff2' }}>
                 <Header />
                        <div className="container">
                            <center><h2>Booking Date: {bookingsession}</h2></center>
                            <span style={{display: "flex"}}>
                                <FontAwesomeIcon className='btnhover' onClick={handleGoBack} icon={faCircleArrowLeft} /> &nbsp;<h2 > {formData.name}</h2><span className='finalbook'><FontAwesomeIcon icon={faIndianRupee}/> {formData.fare}<small className='farcont'>per Day</small>&nbsp;&nbsp;<button onClick={handleSubmit} className="btn btn-primary">Book Now</button></span>

                            </span>
                            <div className='halltitle'><span className='badge'>{formData.venuetype}</span></div>
                            <hr />
                            <Container>
                                <Row>
                                    <Col md={6}>
                                        <center>
                                            <h5>Venue Max Capacity: {formData.maxcount}</h5>
                                            <h5>Venue Timing: 06:00 AM to 11:00 PM</h5>
                                            <h5>Office Timing: 10:00 AM to 06:00 PM</h5>
                                        </center>
                                    </Col>
                                        
                                        
                                    
                                    <Col md={6}>
                                        <center>
                                            <h5>Venue Location: {formData.area}</h5>
                                            <h5>Venue City: {formData.city}</h5>
                                            <h6>Address: {formData.address}</h6>
                                        </center>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col md={3}>
                                    <h5>Venue Facilities</h5>
                                        <ul>
                                            {formData.facilities.parking ? (<li>Parking</li>) : (<></>)}
                                            {formData.facilities.achall ? (<li>AirCondition Hall</li>) : (<></>)}
                                            {formData.facilities.powerbackup ? (<li>PowerBackup</li>) : (<></>)}
                                            {formData.facilities.catering ? (<li>Catering</li>) : (<></>)}
                                            {formData.facilities.decoration ? (<li>Decoration</li>) : (<></>)}
                                            {formData.facilities.video_photo ? (<li>Video/Photo-graphy</li>) : (<></>)}
                                            {formData.facilities.smoking ? (<li>Smoking</li>) : (<></>)}
                                        </ul>
                                    </Col>
                                    <Col md={9}>
                                    <iframe
                                        title="Google Map"
                                        width="950"
                                        height="350"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={mapUrl}
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                    ></iframe>
                                    </Col>
                                    
                                </Row>
                            </Container>
                            <hr />
                            <h3>Gallery</h3>
                            <ImageSlider images={formData.filelist.filename} />
        
                        </div>
                        </div>
    </div> ): (  <div>
                {<NotAuth/>}
    </div>  )}
    </>
  )
}

export default BookingPage