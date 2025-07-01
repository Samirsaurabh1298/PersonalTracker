import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wind } from "lucide-react";
import { WeatherData, ChartData } from "../../types/weather";

interface WindSpeedChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function WindSpeedChart({
  weatherData,
  onChartClick,
}: WindSpeedChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];

    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      windSpeed: weatherData.wind_speed_10m_max?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon wind">
          <img src="/wind.svg" alt="Wind" />
        </div>
        <h2>Windspeed</h2>
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
                fill: "#616161", // color
                fontSize: 10, // font size
                fontWeight: 400, // font weight
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#616161", // color
                fontSize: 10, // font size
                fontWeight: 400, // font weight
              }}
              label={{
                value: "Windspeed (km/h)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: {
                  fill: "#616161", // label color
                  fontSize: 10, // label font size
                  fontWeight: 400, // label font weight
                },
              }}
            />

            <Tooltip cursor={false} />
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#8BADA9"
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
