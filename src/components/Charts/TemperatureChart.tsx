import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WeatherData, ChartData } from "../../types/weather";

interface TemperatureChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function TemperatureChart({
  weatherData,
  onChartClick,
}: TemperatureChartProps) {
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
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon">
          {/* Optional: Replace with any icon you like */}
          <img src="/temp.svg" alt="Temprature" />
        </div>
        <h2>Temperature</h2>
      </div>

      <div className="chart-container-main" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsLineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#616161", // matches Y-axis label color
                fontSize: 10,
                fontWeight: 400,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#616161", // match styling here too
                fontSize: 10,
                fontWeight: 400,
              }}
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: {
                  fill: "#616161",
                  fontSize: 10,
                  fontWeight: 400,
                },
              }}
            />

            <Tooltip cursor={false} />
            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#FACC15"
              strokeWidth={2.5}
              dot={false}
            />
          </RechartsLineChart>
        </ResponsiveContainer>

        <div className="chart-frequency text-sm text-gray-500 text-center mt-2">
          Daily
        </div>
      </div>
    </div>
  );
}
