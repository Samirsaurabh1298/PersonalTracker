import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CloudRain } from "lucide-react";
import { WeatherData, ChartData } from "../../types/weather";

interface PrecipitationChartProps {
  weatherData: WeatherData | null;
  onChartClick: () => void;
}

export default function PrecipitationChart({
  weatherData,
  onChartClick,
}: PrecipitationChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];

    return weatherData.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      precipitation: weatherData.precipitation_sum?.[index] || 0,
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="chart-section">
      <div className="chart-header">
        <div className="chart-icon precipitation">
          <img src="/cloud.svg" alt="Cloud" />
        </div>
        <h2>Precipitation</h2>
      </div>

      <div className="chart-container-main" onClick={onChartClick}>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsBarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#616161", // same color
                fontSize: 10, // same font size
                fontWeight: 400, // same font weight
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#616161", // same color
                fontSize: 10, // same font size
                fontWeight: 400, // same font weight
              }}
              label={{
                value: "Precipitation (mm)",
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
            <Bar
              dataKey="precipitation"
              fill="#0284C7"
              radius={[8, 8, 0, 0]}
              barSize={18}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
        <div className="chart-frequency text-sm text-gray-500 text-center mt-2">
          Daily
        </div>
      </div>
    </div>
  );
}
