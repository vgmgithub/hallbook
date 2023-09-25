
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionContext';
import NotAuth from './NotAuth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const About = () => {

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
                <span style={{ display: "flex" }}>
                <OverlayTrigger overlay={tooltip} placement="bottom">
                    <FontAwesomeIcon className='btnhover' onClick={handleGoBack} icon={faCircleArrowLeft} />
                </OverlayTrigger>
                  &nbsp;&nbsp;<h2 > About Us</h2>

                </span>
            <hr />
              <div className=''>
                <p>Welcome to <b>HALLBOOK</b>, your trusted partner in creating unforgettable events and magical weddings!</p>

                <p>At <b>HALLBOOK</b>, we understand that every celebration is unique, and we are here to turn your dreams into reality. With years of experience in the event industry, we've designed an intuitive and user-friendly platform that simplifies the process of finding and booking the perfect venue for your special day.</p>
                <br></br>
                <h4>Our Mission</h4>

                <p>Our mission is simple: to make your event planning experience effortless and enjoyable. We believe that finding the ideal venue should be a joyful journey, not a hassle. Our platform brings together a curated selection of the most exquisite event halls and wedding venues, all in one place.</p>
                <br></br>
              <h4>Why Choose Us?</h4>
              
                <ul>
                  <li>Diverse Venue Selection: We offer a diverse range of venues to suit your specific needs, whether you're planning an intimate gathering or a grand extravaganza.</li>
                  <li>Simplified Booking: Our user-friendly interface allows you to browse, compare, and book venues with ease. No more endless phone calls and site visits; everything can be done from the comfort of your home.</li>
                  <li>Transparent Pricing: We believe in transparency. You'll find clear pricing and all the information you need to make an informed decision.</li>
                  <li>Expert Assistance: Our team of event experts is ready to assist you at every step. From choosing the right venue to coordinating with vendors, we're here to ensure your event runs seamlessly.</li>
                </ul>

              <h4>Our Commitment to You</h4>

                <p>At <b>HALLBOOK</b>, we're committed to making your event planning experience stress-free and enjoyable. We believe that every celebration deserves to be exceptional, and we're dedicated to helping you create memories that will last a lifetime.</p>

              <h4>Get Started Today</h4>

              <p>Ready to start planning your next event or dream wedding? Browse our selection of stunning venues, and take the first step towards creating unforgettable memories. Join the <b>HALLBOOK</b> family and let us be a part of your special journey.<br></br>

                Thank you for considering us as your partner in celebration. We look forward to helping you turn your vision into a reality!</p>
              </div>
            </div>
          
            
          </div>
        </div></>) : (  <div>
                {<NotAuth/>}
    </div>  )}
    </div>
    
  )
}

export default About