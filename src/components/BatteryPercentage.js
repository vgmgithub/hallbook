import { faBattery } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

function BatteryPercentage() {
  const [batteryPercentage, setBatteryPercentage] = useState(null);

  useEffect(() => {
    // Check if the Battery Status API is supported
    if ('getBattery' in navigator) {
      // Get the battery status
      navigator.getBattery().then((battery) => {
        // Update the battery percentage
        setBatteryPercentage((battery.level * 100).toFixed(2));
        
        // Listen for changes in battery status
        battery.addEventListener('levelchange', () => {
          setBatteryPercentage((battery.level * 100).toFixed(2));
        });
      });
    } else {
      // The Battery Status API is not supported
      setBatteryPercentage('N/A');
    }
  }, []);
  return (
    
    <b style={{fontSize:"10px"}}><FontAwesomeIcon icon={faBattery}/>&nbsp;{batteryPercentage !== null ? `${batteryPercentage}%` : 'Loading...'}</b>
    
  );
}

export default BatteryPercentage;
