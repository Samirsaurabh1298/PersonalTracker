import DateRangeControl from '../Controls/DateRangeControl';
import LocationControl from '../Controls/LocationControl';
import ParameterSelector from '../Controls/ParameterSelector';
import OverviewChart from '../Charts/OverviewChart';
import { WeatherData } from '../../types/weather';

interface OverviewPageProps {
  weatherData: WeatherData | null;
  selectedLocations: string[];
  selectedParameters: string[];
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  onLocationChange: (locations: string[]) => void;
  onParameterChange: (parameters: string[]) => void;
  onNavigateToDetails: () => void;
}

export default function OverviewPage({
  weatherData,
  selectedLocations,
  selectedParameters,
  startDate,
  endDate,
  onDateChange,
  onLocationChange,
  onParameterChange,
  onNavigateToDetails
}: OverviewPageProps) {
  return (
    <div className="page-content">
      <div className="controls-bar">
        <DateRangeControl
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
        
        <LocationControl
          selectedLocations={selectedLocations}
          onLocationChange={onLocationChange}
        />
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <div className="chart-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C10.9 2 10 2.9 10 4V12.3C9.4 12.9 9 13.9 9 15C9 17.2 10.8 19 13 19S17 17.2 17 15C17 13.9 16.6 12.9 16 12.3V4C16 2.9 15.1 2 14 2H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="13" cy="15" r="2" fill="currentColor"/>
              <path d="M14 6V12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <path d="M14 8H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <path d="M14 10H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <h2>Temperature</h2>
          <ParameterSelector
            selectedParameters={selectedParameters}
            onParameterChange={onParameterChange}
            title="Temperature"
          />
        </div>
        
        <OverviewChart
          weatherData={weatherData}
          onChartClick={onNavigateToDetails}
        />
      </div>
    </div>
  );
}
