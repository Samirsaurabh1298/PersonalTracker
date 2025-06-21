import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { formatDateRange } from '../../utils/weatherApi';

interface DateRangeControlProps {
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangeControl({ startDate, endDate, onDateChange }: DateRangeControlProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(endDate);
  const [isSelectingStart, setIsSelectingStart] = useState(true);

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

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

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    
    if (isSelectingStart) {
      setSelectedStartDate(dateStr);
      setIsSelectingStart(false);
    } else {
      setSelectedEndDate(dateStr);
      
      // Apply the date range
      if (selectedStartDate && dateStr) {
        const start = new Date(selectedStartDate);
        const end = new Date(dateStr);
        
        if (start <= end) {
          onDateChange(selectedStartDate, dateStr);
        } else {
          onDateChange(dateStr, selectedStartDate);
        }
      }
      
      setShowDatePicker(false);
      setIsSelectingStart(true);
    }
  };

  const isDateSelected = (day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    return dateStr === selectedStartDate || dateStr === selectedEndDate;
  };

  const isDateInRange = (day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    
    const dateStr = formatDate(currentYear, currentMonth, day);
    const date = new Date(dateStr);
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    
    return date >= start && date <= end;
  };

  const renderCustomDatePicker = () => {
    if (!showDatePicker) return null;

    const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });

    return (
      <div className="custom-datepicker">
        <div className="datepicker-header">
          <div className="date-inputs">
            <div className="date-input-group">
              <label>Start Date</label>
              <input
                type="date"
                value={selectedStartDate || ''}
                onChange={(e) => {
                  setSelectedStartDate(e.target.value);
                  setIsSelectingStart(false);
                }}
                max={selectedEndDate || undefined}
              />
            </div>
            <div className="date-input-group">
              <label>End Date</label>
              <input
                type="date"
                value={selectedEndDate || ''}
                onChange={(e) => {
                  setSelectedEndDate(e.target.value);
                  if (selectedStartDate && e.target.value) {
                    onDateChange(selectedStartDate, e.target.value);
                    setShowDatePicker(false);
                    setIsSelectingStart(true);
                  }
                }}
                min={selectedStartDate || undefined}
              />
            </div>
          </div>
          
          <div className="month-navigation">
            <button type="button" onClick={() => navigateMonth('prev')}>&lt;</button>
            <span>{monthName}</span>
            <button type="button" onClick={() => navigateMonth('next')}>&gt;</button>
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
              {getDaysInMonth(currentYear, currentMonth).map((day, index) => (
                <div 
                  key={index} 
                  className={`day ${day ? 'active' : 'empty'} ${
                    day && isDateSelected(day) ? 'selected' : ''
                  } ${
                    day && isDateInRange(day) ? 'in-range' : ''
                  }`}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="datepicker-footer">
          <div className="selection-hint">
            {isSelectingStart ? 'Select start date' : 'Select end date'}
          </div>
          <button 
            type="button" 
            className="done-button"
            onClick={() => {
              setShowDatePicker(false);
              setIsSelectingStart(true);
            }}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="control-item" onClick={() => setShowDatePicker(!showDatePicker)}>
      <Calendar size={16} />
      <span>{formatDateRange(startDate, endDate)}</span>
      <ChevronDown className={`chevron ${showDatePicker ? 'open' : ''}`} />
      {renderCustomDatePicker()}
    </div>
  );
}
