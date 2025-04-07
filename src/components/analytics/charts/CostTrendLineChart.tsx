
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface CostTrendLineChartProps {
  data: Array<{
    month: string;
    fuel: number;
    maintenance: number;
    personnel: number;
  }>;
}

const CostTrendLineChart = ({ data }: CostTrendLineChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown Trends</CardTitle>
        <CardDescription>Monthly cost comparison by category</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ChartContainer 
          config={{
            fuel: { color: "#60a5fa" },
            maintenance: { color: "#f97316" },
            personnel: { color: "#8b5cf6" },
          }}
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fuel" name="Fuel" stroke="var(--color-fuel)" />
            <Line type="monotone" dataKey="maintenance" name="Maintenance" stroke="var(--color-maintenance)" />
            <Line type="monotone" dataKey="personnel" name="Personnel" stroke="var(--color-personnel)" />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CostTrendLineChart;
