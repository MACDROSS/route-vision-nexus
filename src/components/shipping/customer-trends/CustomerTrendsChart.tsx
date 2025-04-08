
import { CustomerTrend } from "@/types/shipping";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { format } from "date-fns";

interface CustomerTrendsChartProps {
  trends: CustomerTrend[];
  metric: 'on_time_delivery' | 'shipping_cost' | 'volume' | 'damages';
}

const METRIC_LABELS = {
  on_time_delivery: "On-Time Delivery (%)",
  shipping_cost: "Shipping Cost ($ thousands)",
  volume: "Volume (units)",
  damages: "Damage Rate (%)"
};

const CustomerTrendsChart = ({ trends, metric }: CustomerTrendsChartProps) => {
  // Sort trends by timestamp
  const sortedTrends = [...trends]
    .filter(t => t.metric === metric)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const transformValue = (value: number) => {
    if (metric === 'shipping_cost') return value / 1000; // Convert to thousands
    return value;
  };

  const chartData = sortedTrends.map(trend => ({
    date: format(trend.timestamp, 'MMM dd'),
    timestamp: trend.timestamp,
    value: transformValue(trend.value),
    status: trend.status
  }));

  const getLineColor = () => {
    switch (metric) {
      case 'on_time_delivery': return "#22c55e"; // Green
      case 'shipping_cost': return "#3b82f6"; // Blue
      case 'volume': return "#8b5cf6"; // Purple
      case 'damages': return "#ef4444"; // Red
      default: return "#64748b"; // Slate
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{METRIC_LABELS[metric]} Trend</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-64">
          <ChartContainer
            config={{
              value: { color: getLineColor() }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="date" />}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name={METRIC_LABELS[metric]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  style={{ stroke: 'var(--color-value)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerTrendsChart;
