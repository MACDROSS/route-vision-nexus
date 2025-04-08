
import React from 'react';
import { ConveyorMetricHistory } from '@/types/production';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { format } from 'date-fns';

interface ConveyorMetricsChartProps {
  data: ConveyorMetricHistory[];
}

const ConveyorMetricsChart: React.FC<ConveyorMetricsChartProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.map(item => ({
    name: format(new Date(item.timestamp), 'HH:mm'),
    Throughput: item.throughput,
    Utilization: item.utilization,
    Efficiency: item.efficiency,
    timestamp: item.timestamp
  }));
  
  // Chart configuration
  const chartConfig = {
    Throughput: { label: "Throughput", color: "#2196F3" },
    Utilization: { label: "Utilization (%)", color: "#4CAF50" },
    Efficiency: { label: "Efficiency (%)", color: "#FF9800" }
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => value}
          />
          <YAxis 
            yAxisId="left"
            orientation="left"
            domain={[0, 'dataMax + 100']}
            tick={{ fontSize: 12 }}
            label={{ value: 'Throughput', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            label={{ value: 'Percentage', angle: -90, position: 'insideRight', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend content={<ChartLegendContent />} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="Throughput" 
            stroke={chartConfig.Throughput.color} 
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="Utilization" 
            stroke={chartConfig.Utilization.color} 
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="Efficiency" 
            stroke={chartConfig.Efficiency.color} 
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default ConveyorMetricsChart;
