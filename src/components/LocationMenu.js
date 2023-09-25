import React, { useEffect, useState } from 'react';
import { getLocation } from 'current-location-geo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

export default function LocationMenu() {

    const [myConst, setMyConst] = useState('');
  useEffect(() => {
    getLocation(function (err, position) {
      if (err) {
        console.error('Error:', err);
      } else { 
          const livearea = position.address.split(',');
          setMyConst(livearea[1]);
          
      }
    });
  }, []);

  return (
    // <div>
      <b style={{fontSize: "x-small",marginRight: "1.5%"}}><FontAwesomeIcon icon={faMapMarker}/>{myConst}</b>
    // </div>
  );
}
