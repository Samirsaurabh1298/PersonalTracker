import DateRangeControl from '../Controls/DateRangeControl';
import LocationControl from '../Controls/LocationControl';
import TemperatureChart from '../Charts/TemperatureChart';
import PrecipitationChart from '../Charts/PrecipitationChart';
import WindSpeedChart from '../Charts/WindSpeedChart';
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

      <div className="charts-grid">
        <TemperatureChart
          weatherData={weatherData}
          onChartClick={onNavigateToDetails}
        />
        
        <PrecipitationChart
          weatherData={weatherData}
          onChartClick={onNavigateToDetails}
        />
        
        <WindSpeedChart
          weatherData={weatherData}
          onChartClick={onNavigateToDetails}
        />
      </div>
    </div>
  );
}
