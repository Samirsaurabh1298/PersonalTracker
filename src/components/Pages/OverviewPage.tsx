import { useState } from "react";
import DateRangeControl from "../Controls/DateRangeControl";
import LocationControl from "../Controls/LocationControl";
import TemperatureChart from "../Charts/TemperatureChart";
import PrecipitationChart from "../Charts/PrecipitationChart";
import WindSpeedChart from "../Charts/WindSpeedChart";
import { WeatherData } from "../../types/weather";

interface OverviewPageProps {
  weatherData: WeatherData | null;
  selectedLocations: string[];
  selectedParameters: string[];
  startDate: string;
  endDate: string;
  onDateChange: (startDate: string, endDate: string) => void;
  onLocationChange: (locations: string[]) => void;
  onParameterChange: (parameters: string[]) => void;
  onNavigateToDetails: (
    chart: "temperature" | "precipitation" | "wind"
  ) => void;
}

export default function OverviewPage({
  weatherData,
  selectedLocations,
  selectedParameters,
  startDate,
  endDate,
  onDateChange,
  onLocationChange,
  onNavigateToDetails,
}: OverviewPageProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const handleToggleDate = () => {
    setIsDateOpen((prev) => !prev);
    setIsLocationOpen(false); // Close location dropdown if open
  };

  const handleToggleLocation = () => {
    setIsLocationOpen((prev) => !prev);
    setIsDateOpen(false); // Close date dropdown if open
  };

  return (
    <div className="page-content ml-[100px] mt-[48px] p-0">
      <div className="text-[24px] font-[500] leading-[24px] pb-6 pt-7">
        <span className="text-24 font-bold mb-4">Overview</span>
      </div>

      <div className="controls-bar">
        <DateRangeControl
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
          isOpen={isDateOpen}
          onToggle={handleToggleDate}
          closeDropdown={() => setIsDateOpen(false)}
        />

        <LocationControl
          selectedLocations={selectedLocations}
          onLocationChange={onLocationChange}
          isOpen={isLocationOpen}
          onToggle={handleToggleLocation}
          closeDropdown={() => setIsLocationOpen(false)}
        />
      </div>
      
        <div className="charts-grid">
          <TemperatureChart
            weatherData={weatherData}
            onChartClick={() => onNavigateToDetails("temperature")}
          />

          <PrecipitationChart
            weatherData={weatherData}
            onChartClick={() => onNavigateToDetails("precipitation")}
          />

          <WindSpeedChart
            weatherData={weatherData}
            onChartClick={() => onNavigateToDetails("wind")}
          />
        </div>
    
    </div>
  );
}
