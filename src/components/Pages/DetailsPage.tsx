import { ArrowLeft, BarChart3 } from 'lucide-react';
import DateRangeControl from '../Controls/DateRangeControl';
import LocationControl from '../Controls/LocationControl';
import ParameterSelector from '../Controls/ParameterSelector';
import DetailChart from '../Charts/DetailChart';
import { WeatherData } from '../../types/weather';

interface DetailsPageProps {
  weatherData: WeatherData | null;
  selectedLocations: string[];
  selectedParameters: string[];
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  onLocationChange: (locations: string[]) => void;
  onParameterChange: (parameters: string[]) => void;
  onNavigateBack: () => void;
}

export default function DetailsPage({
  weatherData,
  selectedLocations,
  selectedParameters,
  startDate,
  endDate,
  onDateChange,
  onLocationChange,
  onParameterChange,
  onNavigateBack
}: DetailsPageProps) {
  return (
    <div className="page-content">
      <div className="page-header">
        <button className="back-button" onClick={onNavigateBack}>
          <ArrowLeft className="icon" />
        </button>
        <h1 className="page-title">Drilldown</h1>
      </div>

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
            <img src="/temp.svg" alt="Temprature" />
          </div>
          <h2>Temprature</h2>
          <ParameterSelector
            selectedParameters={selectedParameters}
            onParameterChange={onParameterChange}
            multiple={true}
          />
        </div>
        
        <DetailChart
          weatherData={weatherData}
          selectedParameters={selectedParameters}
        />
      </div>
    </div>
  );
}
