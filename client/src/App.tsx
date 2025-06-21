import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewPage from './components/Pages/OverviewPage';
import DetailsPage from './components/Pages/DetailsPage';
import LoadingState from './components/LoadingState';
import { fetchWeatherData } from './utils/weatherApi';
import { WeatherData, PageType } from './types/weather';
import './styles/weather.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('overview');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['Australia']);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<string[]>(['temperature_2m']);

  const handleFetchWeatherData = async (isHourly = false) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(selectedLocations, startDate, endDate, isHourly);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWeatherData(currentPage === 'details');
  }, [selectedLocations, startDate, endDate, currentPage]);

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleLocationChange = (locations: string[]) => {
    setSelectedLocations(locations);
  };

  const handleParameterChange = (parameters: string[]) => {
    setSelectedParameters(parameters);
  };

  const handleNavigateToDetails = () => {
    setCurrentPage('details');
  };

  const handleNavigateBack = () => {
    setCurrentPage('overview');
  };

  if (loading) {
    return (
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header title="Weather Dashboard" />
          <LoadingState />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header title="Weather Dashboard" />
        
        {currentPage === 'overview' ? (
          <OverviewPage
            weatherData={weatherData}
            selectedLocations={selectedLocations}
            selectedParameters={selectedParameters}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onLocationChange={handleLocationChange}
            onParameterChange={handleParameterChange}
            onNavigateToDetails={handleNavigateToDetails}
          />
        ) : (
          <DetailsPage
            weatherData={weatherData}
            selectedParameters={selectedParameters}
            onParameterChange={handleParameterChange}
            onNavigateBack={handleNavigateBack}
          />
        )}
      </div>
    </div>
  );
}
