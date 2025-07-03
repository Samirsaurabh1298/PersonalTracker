import { DateRangePicker } from 'react-date-range';
import { ChevronDown } from 'lucide-react';
import { formatDateRange } from '../../utils/weatherApi';

interface DateRangeControlProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  closeDropdown: () => void;
}

export default function DateRangeControl({
  startDate,
  endDate,
  onDateChange,
  isOpen,
  onToggle,
  closeDropdown
}: DateRangeControlProps) {
  const handleDateRangeChange = (ranges: any) => {
    const { selection } = ranges;
    const start = selection.startDate.toISOString().split('T')[0];
    const end = selection.endDate.toISOString().split('T')[0];
    onDateChange(start, end);
  };

  const selectionRange = {
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    key: 'selection',
  };

  return (
    <div className="control-item" onClick={onToggle}>
      <span className="date-range">{formatDateRange(startDate, endDate)}</span>
      <ChevronDown
        className={`chevron transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        style={{ color: isOpen ? '#00A7C4' : '#888' }}
      />
      {isOpen && (
        <div
          className="date-range-picker-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleDateRangeChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            maxDate={new Date()}
            rangeColors={['#3b82f6']}
          />
          <div className="date-picker-footer">
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
