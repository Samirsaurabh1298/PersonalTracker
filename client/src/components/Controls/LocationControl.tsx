import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LOCATIONS } from '../../utils/weatherApi';

interface LocationControlProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
}

export default function LocationControl({ selectedLocations, onLocationChange }: LocationControlProps) {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const handleLocationToggle = (locationName: string) => {
    if (locationName === 'Select all') {
      if (selectedLocations.length === LOCATIONS.length) {
        onLocationChange([]);
      } else {
        onLocationChange(LOCATIONS.map(loc => loc.name));
      }
    } else {
      const newLocations = selectedLocations.includes(locationName) 
        ? selectedLocations.filter(name => name !== locationName)
        : [...selectedLocations, locationName];
      onLocationChange(newLocations);
    }
  };

  const renderLocationDropdown = () => {
    if (!showLocationDropdown) return null;

    return (
      <div className="custom-dropdown location-dropdown">
        {LOCATIONS.map(location => (
          <div 
            key={location.name} 
            className="dropdown-option"
            onClick={() => handleLocationToggle(location.name)}
          >
            <span className="option-text">{location.name}</span>
            <div className={`radio-button ${selectedLocations.includes(location.name) ? 'selected' : ''}`}></div>
          </div>
        ))}
        <div className="dropdown-footer">
          <button className="done-button" onClick={() => setShowLocationDropdown(false)}>Done</button>
        </div>
      </div>
    );
  };

  return (
    <div className="control-item" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
      <span>
        {selectedLocations.length === LOCATIONS.length 
          ? 'All Countries Selected' 
          : `${selectedLocations.length} Countries Selected`}
      </span>
      <ChevronDown className={`chevron ${showLocationDropdown ? 'open' : ''}`} />
      {renderLocationDropdown()}
    </div>
  );
}
