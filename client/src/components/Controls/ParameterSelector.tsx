import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Parameter } from '../../types/weather';

interface ParameterSelectorProps {
  parameters: Parameter[];
  selectedParameters: string[];
  onParameterChange: (parameters: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export default function ParameterSelector({ 
  parameters, 
  selectedParameters, 
  onParameterChange, 
  multiple = false,
  className = "parameter-selector-overview"
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
      return selectedParameters.length === 1 
        ? parameters.find(p => p.key === selectedParameters[0])?.label || 'Select parameters'
        : `${selectedParameters.length} parameters selected`;
    } else {
      const param = parameters.find(p => p.key === selectedParameters[0]);
      return param?.label || 'Select parameter';
    }
  };

  const renderParameterDropdown = () => {
    if (!showParameterDropdown) return null;

    return (
      <div className="custom-dropdown parameter-dropdown">
        {parameters.map(param => (
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
    <div className={className} onClick={() => setShowParameterDropdown(!showParameterDropdown)}>
      <span>{getDisplayText()}</span>
      <ChevronDown className={`chevron ${showParameterDropdown ? 'open' : ''}`} />
      {renderParameterDropdown()}
    </div>
  );
}
