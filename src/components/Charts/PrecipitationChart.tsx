import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CloudRain } from 'lucide-react';
import { WeatherData, ChartData } from '../../types/weather';

interface PrecipitationChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function PrecipitationChart({ weatherData, onChartClick }: PrecipitationChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];
    
    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      precipitation: weatherData.precipitation_sum?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon precipitation">
          <CloudRain size={16} />
        </div>
        <h2>Precipitation</h2>
      </div>
      
      <div className="chart-container-main" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="precipitation" 
              fill="#00bcd4" 
              name="Precipitation (mm)"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
        <div className="chart-frequency">
          Daily frequency
        </div>
      </div>
    </div>
  );
}