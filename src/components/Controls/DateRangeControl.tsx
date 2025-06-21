import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { ChevronDown, Calendar } from 'lucide-react';
import { formatDateRange } from '../../utils/weatherApi';

interface DateRangeControlProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangeControl({ startDate, endDate, onDateChange }: DateRangeControlProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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
    <div className="control-item" onClick={() => setShowDatePicker(!showDatePicker)}>
      <Calendar size={16} />
      <span>{formatDateRange(startDate, endDate)}</span>
      <ChevronDown className={`chevron ${showDatePicker ? 'open' : ''}`} />
      {showDatePicker && (
        <div className="date-range-picker-wrapper" onClick={(e) => e.stopPropagation()}>
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
              onClick={() => setShowDatePicker(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
