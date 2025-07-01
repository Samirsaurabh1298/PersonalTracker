import { WeatherData, Location } from '../types/weather';

export const LOCATIONS: Location[] = [
  { name: 'Australia', lat: -25.2744, lon: 133.7751 },
  { name: 'Belgium', lat: 50.8503, lon: 4.3517 },
  { name: 'Brazil', lat: -14.2350, lon: -51.9253 },
  { name: 'China', lat: 35.8617, lon: 104.1954 },
  { name: 'Denmark', lat: 56.2639, lon: 9.5018 },
  { name: 'India', lat: 20.5937, lon: 78.9629 },
  { name: 'Sri Lanka', lat: 7.8731, lon: 80.7718 },
  { name: 'Thailand', lat: 15.8700, lon: 100.9925 }
];

export const PARAMETERS = [
  { key: 'temperature_2m', label: 'Temperature (°C)', color: '#EEC920' },
  { key: 'relative_humidity_2m', label: 'Relative Humidity (%)', color: '#82ca9d' },
  { key: 'apparent_temperature', label: 'Apparent Temperature (°C)', color: '#8884d8' },
  { key: 'precipitation', label: 'Precipitation (mm)', color: '#00bcd4' },
  { key: 'surface_pressure', label: 'Sea Level Pressure (hPa)', color: '#ff8042' },
  { key: 'wind_speed_10m', label: 'Wind Speed (km/h)', color: '#8BADA9' }
];


export const fetchWeatherData = async (
  selectedLocations: string[], 
  startDate: string, 
  endDate: string, 
  isHourly = false
): Promise<WeatherData | null> => {
  try {
    // Use the first selected location
    const location = LOCATIONS.find(loc => selectedLocations.includes(loc.name)) || LOCATIONS[0];
    
    const timeframe = isHourly ? 'hourly' : 'daily';
    const params = isHourly 
      ? 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,surface_pressure,wind_speed_10m'
      : 'temperature_2m_mean,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max';
    
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${location.lat}&longitude=${location.lon}&start_date=${startDate}&end_date=${endDate}&${timeframe}=${params}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return data[timeframe] || null;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};
