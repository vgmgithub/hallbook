import { faSnowflake, faCar, faSmoking, faUserFriends, faLocationPin, faRupeeSign, faIndianRupeeSign, faPlug, faVideoCamera, faCutlery } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


const HallList = (props) => {

    

    
    
    
    const [data, setData] = useState([]);
    const [arraydate, setDate] = useState([]);
    const [matchingNames, setMatchingNames] = useState([]); // State to store matching names
   
    // console.log(data);
    useEffect(() => {
        fetch('http://localhost:5000/api/venue')
            .then((response) => response.json())
            .then((items) => {
                setData(items);
            })
            .catch((error) => {
                console.error(error);
            });
        // Initialize DataTable
       
    }, []);

    const getImageUrl = (imageName) => {
        return `http://localhost:5000/api/getImage/${imageName}`;
    };
 
    const lowerInputText = props.value.toLowerCase();
    const lowerInputTextC = props.date.toLowerCase();
    

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
    };
    

    function getbookingdates(id) {
        fetch('http://localhost:5000/bookingdates/' + id)
            
            .then((response) => response.json())
            .then((items) => {
                // console.log('itemmm'+items);

                setDate(items);
                
            })
            .catch((error) => {
                console.error(error);
            });
        // return id;
    }

    useEffect(() => {
        // Filter names that match the input value when inputValue changes
      
        
        const matchedNames = data.filter(item => {
            const cityMatch = item.city.toLowerCase().includes(lowerInputText.toLowerCase());
            const dateRangeMatch = lowerInputTextC >= item.startDate && lowerInputTextC <= item.endDate;
            const excludeDates = arraydate[item._id] || []; // Replace with your array of dates
            const dateExcluded = excludeDates.includes(lowerInputTextC);
      
            // Include the item in the filtered results if it meets all conditions
            return cityMatch && dateRangeMatch && !dateExcluded;
          });
        setMatchingNames(matchedNames);
        matchedNames.map((data) => (          
            getbookingdates(data._id)            
        )); 
    }, [lowerInputText, lowerInputTextC]);


    // Define options for date formatting
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Date(props.date).toLocaleDateString('en-US', options);

    return (
        <>
          
        {
            matchingNames.length === 0 ? (
                <p>No results found</p>
            ) : (
                <>
               
                    <h6>Search Result: {capitalizeFirstLetter(lowerInputText)} - {formattedDate}({matchingNames.length})</h6>

                    {matchingNames.map((data) => (
                        <>
                            
                        
      
                       
                                    <div className='col-md-3 form-group'>
                                        <div className="card" style={{ width: "400px", margin: "20px" }}>
                                            <span className="badge">{data.venuetype}</span>
                                            <img className="card-img-top" src={getImageUrl(data.filelist.filename)} alt="Card image" />
                                            <p className='farestyle'><FontAwesomeIcon icon={faIndianRupeeSign} /> {data.fare}</p>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ height: "48px" }}>{data.name}</h5>
                                                <small className="card-text">{data.area} <FontAwesomeIcon icon={faLocationPin} /> | <FontAwesomeIcon icon={faUserFriends} /> Max {data.maxcount} </small>
                                                <hr />
                                                <div className='facilitylogo'>{data.facilities.parking ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faCar} data-tooltip-id="my-tooltip" data-tooltip-content="Parking" />
                                                        <Tooltip id="my-tooltip" />
                                                    </>) : (<></>)}
                                                    {data.facilities.catering ? (<FontAwesomeIcon icon={faCutlery} data-tooltip-id="my-tooltip" data-tooltip-content="Catering" />) : (<></>)}
                                                    {data.facilities.decoration ? (<img src='/images/balloons.png' data-tooltip-id="my-tooltip" data-tooltip-content="Decoration" />) : (<></>)}
                                                    {data.facilities.achall ? (<FontAwesomeIcon icon={faSnowflake} data-tooltip-id="my-tooltip" data-tooltip-content="AC Hall" />) : (<></>)}
                                                    {data.facilities.powerbackup ? (<FontAwesomeIcon icon={faPlug} data-tooltip-id="my-tooltip" data-tooltip-content="Power Backup" />) : (<></>)}
                                                    {data.facilities.video_photo ? (<FontAwesomeIcon icon={faVideoCamera} data-tooltip-id="my-tooltip" data-tooltip-content="Videography" />) : (<></>)}
                                                    {data.facilities.smoking ? (<FontAwesomeIcon icon={faSmoking} data-tooltip-id="my-tooltip" data-tooltip-content="Smoking Area" />) : (<></>)}
                                                </div>
                                                <hr />
                                                <Link to={'/book/' + data._id} className="btn btn-primary">Book Now</Link>
                                            </div>
                                        </div>
                                    </div>
                               
          
                </>
                    ))}
                </>
            )}
          </> 
    );
}


export default HallList