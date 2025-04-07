
import React from 'react';
import { ProductionProcess } from "@/types/production";
import { ChevronRight } from "lucide-react";

interface ProcessFlowChartProps {
  processes: ProductionProcess[];
}

const ProcessFlowChart: React.FC<ProcessFlowChartProps> = ({ processes }) => {
  // Create a map for quick access to processes by ID
  const processMap = processes.reduce((map, process) => {
    map[process.id] = process;
    return map;
  }, {} as Record<string, ProductionProcess>);

  // Group processes by step number
  const stepGroups: Record<number, ProductionProcess[]> = {};
  
  processes.forEach(process => {
    const step = process.stepNumber || 0;
    if (!stepGroups[step]) {
      stepGroups[step] = [];
    }
    stepGroups[step].push(process);
  });

  // Sort step numbers
  const sortedSteps = Object.keys(stepGroups)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 pb-4 min-w-max">
        {sortedSteps.map((stepNumber) => (
          <div key={stepNumber} className="min-w-[200px]">
            <div className="text-sm font-semibold mb-2 text-center bg-muted rounded-md py-1">
              Step {stepNumber}
            </div>
            <div className="space-y-2">
              {stepGroups[stepNumber].map((process) => {
                // Find processes that depend on this one
                const nextProcesses = processes.filter(
                  p => p.dependsOn === process.id
                );

                return (
                  <div key={process.id} className="space-y-1">
                    <div 
                      className="border rounded-md p-3" 
                      style={{ borderLeft: `4px solid ${process.color}` }}
                    >
                      <div className="font-medium">{process.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Capacity: {process.capacity} units
                      </div>
                    </div>
                    
                    {nextProcesses.length > 0 && (
                      <div className="flex justify-center my-1">
                        <ChevronRight className="text-muted-foreground" size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlowChart;
