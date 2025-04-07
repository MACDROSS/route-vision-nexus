
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductionProcess } from "@/types/production";
import ProcessFlowChart from "./ProcessFlowChart";
import ProcessMetricsCharts from "./ProcessMetricsCharts";

interface ProcessHierarchyViewProps {
  processes: ProductionProcess[];
  className?: string;
}

const ProcessHierarchyView: React.FC<ProcessHierarchyViewProps> = ({ 
  processes,
  className
}) => {
  // Group processes by their step number to organize them hierarchically
  const groupedProcesses = processes.reduce((acc, process) => {
    const stepNumber = process.stepNumber || 0;
    if (!acc[stepNumber]) {
      acc[stepNumber] = [];
    }
    acc[stepNumber].push(process);
    return acc;
  }, {} as Record<number, ProductionProcess[]>);

  // Sort steps in ascending order
  const sortedSteps = Object.keys(groupedProcesses)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Process Hierarchy & Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="flow">
          <TabsList className="mb-4">
            <TabsTrigger value="flow">Process Flow</TabsTrigger>
            <TabsTrigger value="metrics">Process Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow">
            <ProcessFlowChart processes={processes} />
          </TabsContent>
          
          <TabsContent value="metrics">
            <ProcessMetricsCharts processes={processes} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProcessHierarchyView;
