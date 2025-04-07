
import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Scenario, MetricKey } from "./types";
import { transformDataForChart } from "./scenario-utils";

interface ScenarioMetricChartProps {
  scenarios: Scenario[];
  metricKey: MetricKey;
}

const ScenarioMetricChart = ({ scenarios, metricKey }: ScenarioMetricChartProps) => {
  const chartData = transformDataForChart(scenarios, metricKey);
  const colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)"];

  return (
    <ChartContainer 
      id="scenario-metric"
      config={{
        primary: {
          theme: {
            light: "#0ea5e9",
            dark: "#38bdf8"
          }
        },
        secondary: {
          theme: {
            light: "#8b5cf6",
            dark: "#a78bfa"
          }
        },
        tertiary: {
          theme: {
            light: "#14b8a6",
            dark: "#2dd4bf"
          }
        }
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <ChartLegend />
          {scenarios.map((scenario, index) => (
            <Line
              key={scenario.id}
              type="monotone"
              dataKey={scenario.name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ScenarioMetricChart;
