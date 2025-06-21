import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeatherData, ChartData } from '../../types/weather';

interface TemperatureChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function TemperatureChart({ weatherData, onChartClick }: TemperatureChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];
    
    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgTemp: weatherData.temperature_2m_mean?.[index] || 0,
      maxTemp: weatherData.temperature_2m_max?.[index] || 0,
      minTemp: weatherData.temperature_2m_min?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
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
        <h2>Temperature Trends</h2>
      </div>
      
      <div className="chart-container-main" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="avgTemp" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Avg Temperature (°C)"
            />
            <Line 
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#ff4444" 
              strokeWidth={1}
              name="Max Temperature (°C)"
            />
            <Line 
              type="monotone" 
              dataKey="minTemp" 
              stroke="#0088fe" 
              strokeWidth={1}
              name="Min Temperature (°C)"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
        <div className="chart-frequency">
          Daily frequency
        </div>
      </div>
    </div>
  );
}