import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PARAMETERS } from '../../utils/weatherApi';

interface ParameterSelectorProps {
  selectedParameters: string[];
  onParameterChange: (parameters: string[]) => void;
  multiple?: boolean;
  title?: string;
}

export default function ParameterSelector({ 
  selectedParameters, 
  onParameterChange, 
  multiple = false,
  title 
}: ParameterSelectorProps) {
  const [showParameterDropdown, setShowParameterDropdown] = useState(false);

  const handleParameterToggle = (paramKey: string) => {
    if (multiple) {
      if (selectedParameters.includes(paramKey)) {
        onParameterChange(selectedParameters.filter(p => p !== paramKey));
      } else if (selectedParameters.length < 2) {
        onParameterChange([...selectedParameters, paramKey]);
      }
    } else {
      onParameterChange([paramKey]);
      setShowParameterDropdown(false);
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      return selectedParameters.length > 1 
        ? `${selectedParameters.length} parameters selected`
        : PARAMETERS.find(p => p.key === selectedParameters[0])?.label || 'Select parameters';
    }
    return PARAMETERS.find(p => p.key === selectedParameters[0])?.label || 'Select parameter';
  };

  const renderParameterDropdown = () => {
    if (!showParameterDropdown) return null;

    return (
      <div className="custom-dropdown parameter-dropdown">
        {PARAMETERS.map(param => (
          <div 
            key={param.key} 
            className={`dropdown-option ${selectedParameters.includes(param.key) ? 'selected' : ''}`}
            onClick={() => handleParameterToggle(param.key)}
          >
            <span className="option-text">{param.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="parameter-selector-overview" onClick={() => setShowParameterDropdown(!showParameterDropdown)}>
      <span>{title || getDisplayText()}</span>
      <ChevronDown className={`chevron ${showParameterDropdown ? 'open' : ''}`} />
      {renderParameterDropdown()}
    </div>
  );
}
