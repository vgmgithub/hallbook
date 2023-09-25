import { faBattery } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

function BatteryPercentage() {
  const [batteryPercentage, setBatteryPercentage] = useState(null);

  useEffect(() => {
    const batteryStatusHandler = (event) => {
      const { level } = event.target;
      setBatteryPercentage((level * 100).toFixed(2)); // Convert to percentage
    };

    navigator.getBattery().then((battery) => {
      // Initial battery percentage
      setBatteryPercentage((battery.level * 100).toFixed(2));

      // Subscribe to battery updates
      battery.addEventListener('levelchange', batteryStatusHandler);
    });

    // Clean up event listener on unmount
    return () => {
      navigator.getBattery().then((battery) => {
        battery.removeEventListener('levelchange', batteryStatusHandler);
      });
    };
  }, []);

  return (
    
    <b style={{fontSize:"10px"}}><FontAwesomeIcon icon={faBattery}/>&nbsp;{batteryPercentage !== null ? `${batteryPercentage}%` : 'Loading...'}</b>
    
  );
}

export default BatteryPercentage;
