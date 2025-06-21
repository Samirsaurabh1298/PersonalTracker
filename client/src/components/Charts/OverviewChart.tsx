import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeatherData, ChartData } from '../../types/weather';

interface OverviewChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function OverviewChart({ weatherData, onChartClick }: OverviewChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];
    
    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgTemp: weatherData.temperature_2m_mean?.[index] || 0,
      maxTemp: weatherData.temperature_2m_max?.[index] || 0,
      minTemp: weatherData.temperature_2m_min?.[index] || 0,
      precipitation: weatherData.precipitation_sum?.[index] || 0,
      windSpeed: weatherData.wind_speed_10m_max?.[index] || 0
    }));
  };

  const chartData = prepareChartData();

  return (
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
  );
}
