
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionProcess, ProcessConnection } from "@/types/production";
import { ArrowRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessFlowProps {
  processes: ProductionProcess[];
  connections: ProcessConnection[];
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ processes, connections }) => {
  // Sort processes by step number
  const sortedProcesses = [...processes].sort((a, b) => 
    (a.stepNumber || 0) - (b.stepNumber || 0));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Process Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {sortedProcesses.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No processes defined. Create processes to visualize the flow.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {sortedProcesses.map((process, index) => {
                // Find connections where this process is the source
                const outgoingConnections = connections.filter(conn => conn.sourceId === process.id);
                
                return (
                  <div key={process.id} className="flow-item">
                    <div 
                      className="p-4 border rounded-md" 
                      style={{ borderLeft: `4px solid ${process.color}` }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{process.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Capacity: {process.capacity} units
                          </div>
                        </div>
                        <div className="text-sm bg-muted px-2 py-1 rounded">
                          Step {process.stepNumber || index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {outgoingConnections.map(conn => {
                      const targetProcess = processes.find(p => p.id === conn.targetId);
                      if (!targetProcess) return null;
                      
                      // Determine inventory status
                      const inventoryStatus = conn.inventoryLevel > 100 ? "high" : 
                                             conn.inventoryLevel < 20 ? "low" : "normal";
                      
                      return (
                        <div key={`${conn.sourceId}-${conn.targetId}`} className="my-2 ml-8">
                          <div className="flex items-center gap-2 py-2">
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <div className="text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{conn.cycleTime} min</span>
                              </div>
                            </div>
                          </div>
                          <div 
                            className={cn(
                              "px-3 py-2 border border-dashed rounded-md text-sm", 
                              inventoryStatus === "high" ? "bg-orange-50 border-orange-200" :
                              inventoryStatus === "low" ? "bg-red-50 border-red-200" :
                              "bg-green-50 border-green-200"
                            )}
                          >
                            <div className="flex justify-between items-center">
                              <span>WIP Inventory</span>
                              <div className="font-medium">{conn.inventoryLevel} units</div>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {inventoryStatus === "high" && (
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                              )}
                              {inventoryStatus === "low" && (
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                              )}
                              {inventoryStatus === "normal" && (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              )}
                              <span className={cn(
                                "text-xs",
                                inventoryStatus === "high" ? "text-orange-500" : 
                                inventoryStatus === "low" ? "text-red-500" : 
                                "text-green-500"
                              )}>
                                {inventoryStatus === "high" ? "Excess inventory" : 
                                 inventoryStatus === "low" ? "Low inventory risk" : 
                                 "Optimal inventory level"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessFlow;
