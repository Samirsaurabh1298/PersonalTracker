import { ChevronDown } from 'lucide-react';
import { LOCATIONS } from '../../utils/weatherApi';

interface LocationControlProps {
  selectedLocations: string[];
  onLocationChange: (locations: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  closeDropdown: () => void;
}

export default function LocationControl({
  selectedLocations,
  onLocationChange,
  isOpen,
  onToggle,
  closeDropdown,
}: LocationControlProps) {
  const handleLocationToggle = (locationName: string) => {
    if (locationName === 'Select all') {
      if (selectedLocations.length === LOCATIONS.length) {
        onLocationChange([]);
      } else {
        onLocationChange(LOCATIONS.map((loc) => loc.name));
      }
    } else {
      const newLocations = selectedLocations.includes(locationName)
        ? selectedLocations.filter((name) => name !== locationName)
        : [...selectedLocations, locationName];
      onLocationChange(newLocations);
    }
  };

  return (
    <div className="control-item" onClick={onToggle}>
      <span className="date-range">
        {selectedLocations.length === LOCATIONS.length
          ? 'All Countries Selected'
          : `${selectedLocations.length} Countries Selected`}
      </span>
      <ChevronDown
        className={`chevron transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: isOpen ? '#00A7C4' : '#888' }}
      />
      {isOpen && (
        <div
          className="custom-dropdown location-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          {LOCATIONS.map((location) => (
            <div
              key={location.name}
              className="dropdown-option"
              onClick={() => handleLocationToggle(location.name)}
            >
              <span className="option-text">{location.name}</span>
              <div
                className={`radio-button ${
                  selectedLocations.includes(location.name) ? 'selected' : ''
                }`}
              ></div>
            </div>
          ))}
          <div className="dropdown-footer">
            <button
              className="done-button"
              onClick={(e) => {
                e.stopPropagation();
                closeDropdown();
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
