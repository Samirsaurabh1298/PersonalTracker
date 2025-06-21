import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeatherData, ChartData } from '../../types/weather';
import { PARAMETERS } from '../../utils/weatherApi';

interface DetailChartProps {
  weatherData: WeatherData | null;
  selectedParameters: string[];
}

export default function DetailChart({ weatherData, selectedParameters }: DetailChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];
    
    return weatherData.time.map((datetime, index) => {
      const data: ChartData = {
        date: new Date(datetime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric' })
      };
      
      selectedParameters.forEach(param => {
        const paramData = weatherData[param as keyof WeatherData] as number[];
        if (paramData) {
          data[param] = paramData[index] || 0;
        }
      });
      
      return data;
    });
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-container large">
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedParameters.map(param => {
            const parameter = PARAMETERS.find(p => p.key === param);
            return parameter ? (
              <Line
                key={param}
                type="monotone"
                dataKey={param}
                stroke={parameter.color}
                strokeWidth={2}
                name={parameter.label}
              />
            ) : null;
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
      <div className="chart-frequency">
        Hourly frequency
      </div>
    </div>
  );
}
