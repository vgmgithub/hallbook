import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function PlaceSearch( { onPlaceSelect }) {
  const [address, setAddress] = useState('');



  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      onPlaceSelect(selectedAddress, latLng); // Pass the selected place and its coordinates to the parent
    } catch (error) {
      console.error('Error selecting address:', error);
    }
  };

  return (
    <div>
      
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        
        onSelect={handleSelect}
        searchOptions={{
          // types: ['(cities)'], // Restrict to city-level results
          componentRestrictions: {
            // administrativeArea: 'TN', // Replace 'TN' with the state code for Tamil Nadu
            country: 'IN', // Restrict to India
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter a location',
              })}
              className="form-control" 
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default PlaceSearch;
