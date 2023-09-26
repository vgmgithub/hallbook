
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Services = () => {

  const { user } = useSession();

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
                <span style={{display: "flex"}}>
                
                  <OverlayTrigger overlay={tooltip} placement="bottom">
                    <FontAwesomeIcon className='btnhover' onClick={handleGoBack} icon={faCircleArrowLeft} />
                  </OverlayTrigger>
                  &nbsp;&nbsp;<h2 >Our Services</h2>

                </span>
            <hr />
              <div className=''>
                  <p>At <b>HALLBOOK</b>, we are dedicated to providing a wide range of services to meet your needs. Whether you're planning an event, looking for expert assistance, or seeking solutions for your special occasion, we've got you covered.</p>
                  <p>Explore our comprehensive list of services below:</p> 

                  <h4>1. Event Planning and Coordination</h4>

                  <p>Let us take the stress out of event planning. Our experienced team will work closely with you to conceptualize, plan, and execute your event, ensuring every detail is perfect. From weddings and corporate gatherings to birthdays and anniversaries, we make your vision a reality.</p>

                  <h4>2. Venue Selection</h4>

                  <p>Finding the perfect venue is the first step to a successful event. Our venue selection service includes a curated list of stunning locations to match your event's theme and size. We'll assist you in securing the ideal setting for your special day.</p>

                  <h4>3. Catering and Dining Services</h4>

                  <p>Indulge your guests with delectable cuisine. We offer a range of catering options, from gourmet menus to casual dining. Our catering experts will tailor the food and beverage experience to your preferences and dietary requirements.</p>

                  <h4>4. Decor and Design</h4>

                  <p>Transform your event space into a work of art. Our talented decorators and designers will create a captivating ambiance that reflects your style and theme. From floral arrangements to lighting, we've got every aspect of design covered.</p>

                  <h4>5. Entertainment and Music</h4>

                  <p>Keep your guests entertained with the best in live music, DJs, and performers. Whether you're looking for a soothing acoustic vibe or a high-energy dance floor, we'll arrange the perfect entertainment for your event.</p>

                  <h4>6. Photography and Videography</h4>

                  <p>Capture every precious moment with our photography and videography services. Our skilled professionals will document your event, preserving memories that you'll cherish for a lifetime.</p>

                  <h4>7. Event Coordination</h4>

                  <p>On the day of your event, relax and enjoy the festivities while our event coordinators ensure everything runs smoothly. We handle logistics, vendor coordination, and any unforeseen challenges, leaving you free to be a gracious host.</p>

                  <h4>8. Corporate Event Solutions</h4>

                  <p>For businesses, we offer tailored corporate event planning services. From seminars and conferences to product launches and team-building events, we have the expertise to make your corporate gatherings a success.</p>

                  <h4>9. Special Occasions</h4>

                  <p>Celebrate life's milestones with us. We specialize in organizing events for birthdays, anniversaries, baby showers, and more. Let us turn your personal celebrations into unforgettable moments.</p>

                  <h4>10. Consultation and Customization</h4>

                  <p>Each event is unique, and we understand that your needs may vary. Contact us for a consultation, and we'll customize our services to align with your specific requirements and budget.</p>

                  <br></br>
                  <p>At <b>HALLBOOK</b>, we're committed to excellence in every service we provide. We believe that your event or special occasion deserves the very best, and we're here to make it happen. Let's work together to create memories that will last a lifetime.</p>
                  <br></br>
                  <b>Contact us today to discuss how we can bring your vision to life.</b>


              </div>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default Services