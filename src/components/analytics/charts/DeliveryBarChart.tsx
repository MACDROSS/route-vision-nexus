
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart/index";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DeliveryBarChartProps {
  data: Array<{
    name: string;
    onTime: number;
    delayed: number;
  }>;
  title?: string;
  description?: string;
  height?: string;
}

const DeliveryBarChart = ({ 
  data, 
  title = "Delivery Performance", 
  description = "On-time vs Delayed deliveries over time",
  height = "h-80" 
}: DeliveryBarChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={height}>
        <ChartContainer 
          config={{
            onTime: { color: "#4ade80" },
            delayed: { color: "#f87171" }
          }}
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="onTime" name="On Time" fill="var(--color-onTime)" stackId="a" />
            <Bar dataKey="delayed" name="Delayed" fill="var(--color-delayed)" stackId="a" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeliveryBarChart;
