import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wind } from 'lucide-react';
import { WeatherData, ChartData } from '../../types/weather';

interface WindSpeedChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function WindSpeedChart({ weatherData, onChartClick }: WindSpeedChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];
    
    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      windSpeed: weatherData.wind_speed_10m_max?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon wind">
          <Wind size={16} />
        </div>
        <h2>Wind Speed</h2>
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
              dataKey="windSpeed" 
              stroke="#0088fe" 
              strokeWidth={2}
              name="Max Wind Speed (km/h)"
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