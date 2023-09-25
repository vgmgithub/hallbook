import React from 'react';

const MyMap = ({ coordinates }) => {

 
  console.log(coordinates);
  // Replace the latitude and longitude with your desired coordinates
 
  const latitude = "37.421999479801364";
  const longitude = "-122.08262298523092";
  // Construct the Google Maps URL with the coordinates
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.930367574776!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085805c5e8d38db%3A0xf919c1928b66de65!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619071690624!5m2!1sen!2sus`;

  return (
    <div>
      <h1>{coordinates}</h1>
      <iframe
        title="Google Map"
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default MyMap;
