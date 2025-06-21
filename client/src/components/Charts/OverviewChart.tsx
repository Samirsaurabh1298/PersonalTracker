import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData, WeatherData } from '../../types/weather';

interface OverviewChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function OverviewChart({ weatherData, onChartClick }: OverviewChartProps) {
  const prepareOverviewChartData = (): ChartData[] => {
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

  const chartData = prepareOverviewChartData();

  if (!chartData.length) {
    return (
      <div className="chart-container-main" onClick={onChartClick}>
        <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container-main" onClick={onChartClick}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgTemp" stroke="#ff7300" name="Avg Temperature" />
          <Line type="monotone" dataKey="maxTemp" stroke="#ff4444" name="Max Temperature" />
          <Line type="monotone" dataKey="minTemp" stroke="#4444ff" name="Min Temperature" />
        </RechartsLineChart>
      </ResponsiveContainer>
      <div className="chart-frequency">
        <p>Daily frequency</p>
      </div>
    </div>
  );
}
