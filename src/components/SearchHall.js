import React, { useState } from 'react'
import HallList from './HallList';
import { useBookSession } from './SessionContext';
 

function SearchHall() {


  const { bookingsession,setBookingSession } = useBookSession();
    const today = new Date().toISOString().split('T')[0];
    const initialFormState = {
        vdate: '',
        varea: '',
      };
    const [formData, setFormData] = useState(initialFormState);
 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({...formData,[name]: value});
      
    };
  setBookingSession(formData.vdate);
 



    return (
      <>
    <div className='card' style={{backgroundImage:'url("/images/webbackfunction.jpg")', backgroundSize:'cover',borderRadius:"40px",marginTop:"0px"}}>
        <div className='card-body' style={{ backgroundColor: "rgb(0 0 0 / 57%)", borderRadius: "40px" }}>
    
        
        <form  className='loginform'>
        
        <div className="mb-3 input-container">
          
          {/* <FontAwesomeIcon icon={faCalendar} className="input-icon" /> */}
                      <h5 style={{ color: "#fff" }}>Enter your Date and City </h5>
                      <hr></hr>
          <input
            type="date"
            className="form-control"
            id="vdate"
            name="vdate"
            value={formData.vdate}
                          onChange={handleInputChange}
                          min={today} 
            required
                      />
                  
        </div> 
        <div className="mb-3 input-container">         
                <input type="text" className="form-control" id="varea" name="varea" value={formData.varea} onChange={handleInputChange}  placeholder='Eg: Anna Nagar, Madipakkam' />
                      
        </div>
        
        <hr></hr>
    
       
          
      </form>
    </div>
      </div>
      
            <hr></hr>
            <div className='row'>
                
                <HallList value={formData.varea} date={formData.vdate}/>
                
            </div>
            </>
  )
}

export default SearchHall