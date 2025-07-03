import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import DateRangeControl from "../Controls/DateRangeControl";
import LocationControl from "../Controls/LocationControl";
import ParameterSelector from "../Controls/ParameterSelector";
import DetailChart from "../Charts/DetailChart";
import { WeatherData } from "../../types/weather";

interface DetailsPageProps {
  chartType: "temperature" | "precipitation" | "wind";
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
  chartType,
  weatherData,
  selectedLocations,
  selectedParameters,
  startDate,
  endDate,
  onDateChange,
  onLocationChange,
  onParameterChange,
  onNavigateBack,
}: DetailsPageProps) {
  const [openDropdown, setOpenDropdown] = useState<null | "date" | "location" | "parameter">(null);

  const handleToggle = (type: "date" | "location" | "parameter") => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  // Dynamic chart metadata
  const chartMeta = {
    temperature: {
      title: "Temperature",
      icon: "/temp.svg",
    },
    precipitation: {
      title: "Precipitation",
      icon: "/cloud.svg",
    },
    wind: {
      title: "Wind Speed",
      icon: "/wind.svg",
    },
  };

  const { title: chartTitle, icon: chartIcon } = chartMeta[chartType];

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
          isOpen={openDropdown === "date"}
          onToggle={() => handleToggle("date")}
          closeDropdown={() => setOpenDropdown(null)}
        />

        <LocationControl
          selectedLocations={selectedLocations}
          onLocationChange={onLocationChange}
          isOpen={openDropdown === "location"}
          onToggle={() => handleToggle("location")}
          closeDropdown={() => setOpenDropdown(null)}
        />
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <div className="chart-icon">
            <img src={chartIcon} alt={chartTitle} />
          </div>
          <h2>{chartTitle}</h2>
          <ParameterSelector
            selectedParameters={selectedParameters}
            onParameterChange={onParameterChange}
            multiple={true}
            isOpen={openDropdown === "parameter"}
            onToggle={() => handleToggle("parameter")}
            closeDropdown={() => setOpenDropdown(null)}
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
