import { ArrowLeft, BarChart3 } from 'lucide-react';
import ParameterSelector from '../Controls/ParameterSelector';
import DetailChart from '../Charts/DetailChart';
import { WeatherData } from '../../types/weather';

interface DetailsPageProps {
  weatherData: WeatherData | null;
  selectedParameters: string[];
  onParameterChange: (parameters: string[]) => void;
  onNavigateBack: () => void;
}

export default function DetailsPage({
  weatherData,
  selectedParameters,
  onParameterChange,
  onNavigateBack
}: DetailsPageProps) {
  return (
    <div className="page-content">
      <div className="page-header">
        <button className="back-button" onClick={onNavigateBack}>
          <ArrowLeft className="icon" />
          Back
        </button>
        <h1 className="page-title">Detailed Weather Analysis</h1>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <div className="chart-icon">
            <BarChart3 size={16} />
          </div>
          <h2>Hourly Weather Data</h2>
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
