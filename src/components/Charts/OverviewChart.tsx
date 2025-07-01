import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  LineChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { WeatherData, ChartData } from "../../types/weather";

import { afterEach } from "node:test";

interface OverviewChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function OverviewChart({
  weatherData,
  onChartClick,
}: OverviewChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];

    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      avgTemp: weatherData.temperature_2m_mean?.[index] || 0,
      maxTemp: weatherData.temperature_2m_max?.[index] || 0,
      minTemp: weatherData.temperature_2m_min?.[index] || 0,
      precipitation: weatherData.precipitation_sum?.[index] || 0,
      windSpeed: weatherData.wind_speed_10m_max?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
    <>
      

      <div className="chart-container-main" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <LineChart width={300} height={100}  />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="avgTemp"
              stroke="#F59E0B" // Tailwind yellow-500
              strokeWidth={2.5}
              name="Avg Temperature (°C)"
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#EF4444" // Tailwind red-500
              strokeWidth={2}
              name="Max Temperature (°C)"
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="minTemp"
              stroke="#3B82F6" // Tailwind blue-500
              strokeWidth={2}
              name="Min Temperature (°C)"
              dot={false}
              activeDot={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
        <div className="chart-frequency text-sm text-gray-500 text-center mt-2">Daily</div>
      </div>
    </>
  );
}


