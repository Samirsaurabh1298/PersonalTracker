import { ChevronDown } from 'lucide-react';
import { PARAMETERS } from '../../utils/weatherApi';

interface ParameterControlProps {
  title?: string;
  selectedParameters: string[];
  onParameterChange: (params: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  closeDropdown: () => void;
  multiple?: boolean;
}

export default function ParameterControl({
  selectedParameters,
  onParameterChange,
  isOpen,
  onToggle,
  closeDropdown,
}: ParameterControlProps) {
  const maxSelection = 2;

  const handleToggle = (key: string) => {
    const alreadySelected = selectedParameters.includes(key);

    if (alreadySelected) {
      onParameterChange(selectedParameters.filter((p) => p !== key));
    } else {
      if (selectedParameters.length >= maxSelection) return; // Block adding more
      onParameterChange([...selectedParameters, key]);
    }
  };

  return (
    <div className="control-item" onClick={onToggle}>
      <span className="date-range">
        {selectedParameters.length === 0
          ? 'Select Parameters'
          : `${selectedParameters.length} Selected`}
      </span>
      <ChevronDown
        className={`chevron ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: isOpen ? '#00A7C4' : '#888' }}
      />
      {isOpen && (
        <div
          className="custom-dropdown parameter-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          {PARAMETERS.map((param) => {
            const isSelected = selectedParameters.includes(param.key);
            const disableNew =
              !isSelected && selectedParameters.length >= maxSelection;

            return (
              <div
                key={param.key}
                className={`dropdown-option ${disableNew ? 'disabled' : ''}`}
                onClick={() => {
                  if (!disableNew) handleToggle(param.key);
                }}
              >
                <span className="option-text">{param.label}</span>
                <div className={`radio-button ${isSelected ? 'selected' : ''}`}></div>
              </div>
            );
          })}

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
