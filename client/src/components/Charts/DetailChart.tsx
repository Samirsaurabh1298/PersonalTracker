import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData, WeatherData, Parameter } from '../../types/weather';

interface DetailChartProps {
  weatherData: WeatherData | null;
  selectedParameters: string[];
  parameters: Parameter[];
}

export default function DetailChart({ weatherData, selectedParameters, parameters }: DetailChartProps) {
  const prepareDetailChartData = (): ChartData[] => {
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

  const chartData = prepareDetailChartData();

  if (!chartData.length) {
    return (
      <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedParameters.map(paramKey => {
            const param = parameters.find(p => p.key === paramKey);
            return param ? (
              <Line 
                key={paramKey}
                type="monotone" 
                dataKey={paramKey} 
                stroke={param.color} 
                name={param.label}
              />
            ) : null;
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
      <div className="chart-frequency">
        <p>Hourly frequency</p>
      </div>
    </div>
  );
}
