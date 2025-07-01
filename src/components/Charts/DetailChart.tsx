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
import { PARAMETERS } from "../../utils/weatherApi";

interface DetailChartProps {
  weatherData: WeatherData | null;
  selectedParameters: string[];
}

export default function DetailChart({
  weatherData,
  selectedParameters,
}: DetailChartProps) {
  const prepareChartData = (): ChartData[] => {
    if (!weatherData?.time) return [];

    return weatherData.time.map((datetime, index) => {
      const data: ChartData = {
        date: new Date(datetime).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          hour12: true,
        }),
      };

      selectedParameters.forEach((param) => {
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
    <div className="chart-section">
      <div className="chart-container-main">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            {/* Dashed horizontal grid only */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* X-Axis styling */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />

            {/* Y-Axis label if only one parameter is selected */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
              label={
                selectedParameters.length === 1
                  ? {
                      value:
                        PARAMETERS.find((p) => p.key === selectedParameters[0])
                          ?.label || "",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: { fill: "#999", fontSize: 12 },
                    }
                  : undefined
              }
            />

            {/* No line cursor */}
            <Tooltip cursor={false} />

            {/* No Legend */}
            {selectedParameters.map((param) => {
              const parameter = PARAMETERS.find((p) => p.key === param);
              return parameter ? (
                <Line
                  key={param}
                  type="monotone"
                  dataKey={param}
                  stroke="#EEC920"
                  strokeWidth={2.5}
                  dot={false}
                  name={parameter.label}
                />
              ) : null;
            })}
          </RechartsLineChart>
        </ResponsiveContainer>

        <div className="chart-frequency text-sm text-gray-500 text-center mt-2">
          Daily
        </div>
      </div>
    </div>
  );
}
