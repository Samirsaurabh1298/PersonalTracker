import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatDateRange } from '../../utils/weatherApi';

interface DateRangeControlProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangeControl({ startDate, endDate, onDateChange }: DateRangeControlProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const renderCustomDatePicker = () => {
    if (!showDatePicker) return null;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const prevMonth = new Date(currentYear, currentMonth - 1);

    return (
      <div className="custom-datepicker">
        <div className="datepicker-header">
          <div className="month-navigation">
            <button>&lt;</button>
            <span>{prevMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <button>&gt;</button>
          </div>
          <div className="month-navigation">
            <button>&lt;</button>
            <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            <button>&gt;</button>
          </div>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-month">
            <div className="weekdays">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="days">
              {getDaysInMonth(prevMonth).map((day, index) => (
                <div key={index} className={`day ${day ? 'active' : 'empty'}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
          
          <div className="calendar-month">
            <div className="weekdays">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="days">
              {getDaysInMonth(currentDate).map((day, index) => (
                <div key={index} className={`day ${day ? 'active' : 'empty'} ${day === 19 ? 'selected' : ''}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="control-item" onClick={() => setShowDatePicker(!showDatePicker)}>
      <span>{formatDateRange(startDate, endDate)}</span>
      <ChevronDown className={`chevron ${showDatePicker ? 'open' : ''}`} />
      {renderCustomDatePicker()}
    </div>
  );
}
