
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Scenario, MetricKey } from "./types";
import { transformDataForChart, getRandomColor } from "./scenario-utils";

interface ScenarioMetricChartProps {
  scenarios: Scenario[];
  metricKey: MetricKey;
}

const ScenarioMetricChart = ({ scenarios, metricKey }: ScenarioMetricChartProps) => {
  const chartData = transformDataForChart(scenarios, metricKey);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {scenarios.map((scenario, index) => (
          <Line
            key={scenario.id}
            type="monotone"
            dataKey={scenario.name}
            stroke={getRandomColor(index)}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ScenarioMetricChart;
