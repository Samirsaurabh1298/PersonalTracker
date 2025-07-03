import type { ReactNode } from 'react';
import ParameterSelector from '../Controls/ParameterSelector';
import type { Parameter } from '../../types/weather';

interface ChartSectionProps {
  title: string;
  icon: React.ReactNode;
  parameters?: Parameter[];
  selectedParameters?: string[];
  onParameterChange?: (parameters: string[]) => void;
  multiple?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  closeDropdown?: () => void;
  children?: ReactNode;
}

export default function ChartSection({ 
  title, 
  icon, 
  parameters = [], 
  selectedParameters = [], 
  onParameterChange,
  multiple = false,
  isOpen,
  onToggle,
  closeDropdown,
  children 
}: ChartSectionProps) {
  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon">
          {icon}
        </div>
        <h2>{title}</h2>
        {parameters.length > 0 && onParameterChange && (
          <ParameterSelector
            title={title}
            selectedParameters={selectedParameters}
            onParameterChange={onParameterChange}
            multiple={multiple}
            isOpen={isOpen!}
            onToggle={onToggle!}
            closeDropdown={closeDropdown!}
          />
        )}
      </div>
      {children}
    </div>
  );
}
