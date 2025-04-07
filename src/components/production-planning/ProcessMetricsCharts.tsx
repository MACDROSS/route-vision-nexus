
import React from 'react';
import { ProductionProcess } from "@/types/production";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

interface ProcessMetricsChartsProps {
  processes: ProductionProcess[];
}

// Generate sample process metrics data
const generateMetricsData = (processes: ProductionProcess[]) => {
  return processes
    .filter(process => process.stepNumber !== undefined) // Only include processes with steps
    .sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0))
    .map(process => {
      // Generate some realistic sample data based on process capacity
      const capacity = process.capacity;
      const throughput = Math.floor(capacity * (0.7 + Math.random() * 0.25)); // 70-95% of capacity
      const wip = Math.floor(capacity * (0.1 + Math.random() * 0.4)); // 10-50% of capacity as WIP
      
      return {
        name: process.name,
        capacity,
        throughput,
        wip,
        color: process.color,
        stepNumber: process.stepNumber
      };
    });
};

const ProcessMetricsCharts: React.FC<ProcessMetricsChartsProps> = ({ processes }) => {
  const metricsData = generateMetricsData(processes);
  
  // Chart configuration
  const chartConfig = {
    capacity: { label: "Capacity", color: "#4CAF50" },
    throughput: { label: "Throughput", color: "#2196F3" },
    wip: { label: "WIP", color: "#FF9800" }
  };

  return (
    <div className="space-y-6">
      {/* Capacity vs Throughput Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Capacity vs Throughput by Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="capacity" fill={chartConfig.capacity.color} name="Capacity" />
              <Bar dataKey="throughput" fill={chartConfig.throughput.color} name="Throughput" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Work in Process (WIP) Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Work in Process (WIP) by Step</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="wip" fill={chartConfig.wip.color} name="WIP" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Process Utilization Chart (Throughput / Capacity) */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Process Utilization Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart 
              data={metricsData.map(item => ({
                ...item,
                utilization: Math.round((item.throughput / item.capacity) * 100)
              }))} 
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis unit="%" />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Utilization']}
                content={<ChartTooltipContent />}
              />
              <Bar 
                dataKey="utilization" 
                fill="#9C27B0" 
                name="Utilization"
                label={{ position: 'top', formatter: (value: number) => `${value}%` }}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessMetricsCharts;
