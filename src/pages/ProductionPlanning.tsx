
import MainLayout from "@/components/layout/MainLayout";
import ProductionCalendar from "@/components/production-planning/ProductionCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizationPanel from "@/components/production-planning/OptimizationPanel";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SortPlanningProvider } from '@/components/sort-planning/SortPlanningContext';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity } from "lucide-react";
import ProcessFlow from "@/components/production-planning/ProcessFlow";
import SixSigmaReport from "@/components/production-planning/SixSigmaMetrics";
import { ProductionProcess, ProcessConnection, SixSigmaMetrics } from "@/types/production";
import { useState } from "react";

const ProductionPlanning = () => {
  // Sample multi-step processes data
  const [processes] = useState<ProductionProcess[]>([
    { id: "1", name: "Raw Material Receiving", capacity: 500, color: "#4CAF50", stepNumber: 1 },
    { id: "2", name: "Material Inspection", capacity: 450, color: "#2196F3", stepNumber: 2, dependsOn: "1" },
    { id: "3", name: "Component Assembly", capacity: 400, color: "#FF9800", stepNumber: 3, dependsOn: "2" },
    { id: "4", name: "Quality Control", capacity: 420, color: "#9C27B0", stepNumber: 4, dependsOn: "3" },
    { id: "5", name: "Packaging", capacity: 410, color: "#E91E63", stepNumber: 5, dependsOn: "4" },
    { id: "6", name: "Distribution Preparation", capacity: 430, color: "#3F51B5", stepNumber: 6, dependsOn: "5" }
  ]);
  
  // Sample connections between processes with inventory data
  const [connections] = useState<ProcessConnection[]>([
    { sourceId: "1", targetId: "2", inventoryLevel: 85, cycleTime: 45 },
    { sourceId: "2", targetId: "3", inventoryLevel: 120, cycleTime: 30 },
    { sourceId: "3", targetId: "4", inventoryLevel: 65, cycleTime: 60 },
    { sourceId: "4", targetId: "5", inventoryLevel: 40, cycleTime: 25 },
    { sourceId: "5", targetId: "6", inventoryLevel: 90, cycleTime: 20 }
  ]);
  
  // Sample Six Sigma metrics
  const [sixSigmaMetrics] = useState<SixSigmaMetrics[]>([
    { 
      processId: "1", 
      defectsPerMillionOpportunities: 3200, 
      cycleTime: 45,
      processCapability: 1.35,
      valueAddedRatio: 0.65,
      overallEquipmentEffectiveness: 82,
      inventoryTurns: 24,
      firstPassYield: 98.2
    },
    { 
      processId: "2", 
      defectsPerMillionOpportunities: 4100, 
      cycleTime: 30,
      processCapability: 1.21,
      valueAddedRatio: 0.58,
      overallEquipmentEffectiveness: 75,
      inventoryTurns: 22,
      firstPassYield: 97.6
    },
    { 
      processId: "3", 
      defectsPerMillionOpportunities: 5600, 
      cycleTime: 60,
      processCapability: 1.15,
      valueAddedRatio: 0.72,
      overallEquipmentEffectiveness: 68,
      inventoryTurns: 18,
      firstPassYield: 96.5
    },
    { 
      processId: "4", 
      defectsPerMillionOpportunities: 2800, 
      cycleTime: 25,
      processCapability: 1.42,
      valueAddedRatio: 0.82,
      overallEquipmentEffectiveness: 86,
      inventoryTurns: 28,
      firstPassYield: 99.1
    },
    { 
      processId: "5", 
      defectsPerMillionOpportunities: 3600, 
      cycleTime: 20,
      processCapability: 1.38,
      valueAddedRatio: 0.76,
      overallEquipmentEffectiveness: 81,
      inventoryTurns: 26,
      firstPassYield: 98.4
    },
    { 
      processId: "6", 
      defectsPerMillionOpportunities: 3100, 
      cycleTime: 15,
      processCapability: 1.45,
      valueAddedRatio: 0.68,
      overallEquipmentEffectiveness: 84,
      inventoryTurns: 30,
      firstPassYield: 98.7
    }
  ]);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Production Planning</h1>
        <p className="text-muted-foreground">
          Optimize production schedules using Wagner-Whitin algorithm and visual planning tools
        </p>
      </div>

      <Tabs defaultValue="calendar" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="calendar">Production Calendar</TabsTrigger>
            <TabsTrigger value="processes">Multi-Step Processes</TabsTrigger>
            <TabsTrigger value="metrics">Six Sigma Metrics</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="sort">Sort Planning</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="calendar" className="h-[calc(100vh-12rem)]">
          <ProductionCalendar />
        </TabsContent>
        
        <TabsContent value="processes">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <ProcessFlow processes={processes} connections={connections} />
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <SixSigmaReport metrics={sixSigmaMetrics} processes={processes} />
          </div>
        </TabsContent>
        
        <TabsContent value="optimization">
          <OptimizationPanel />
        </TabsContent>
        
        <TabsContent value="sort">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Sort Planning</span>
                <Link to="/sort-planning">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    Full View <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Organize destinations into bins, conveyors, and facilities for efficient order fulfillment.
              </p>
              <div className="border rounded-md p-4 text-center">
                <h3 className="font-medium mb-2">Destination Sorting Tool</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Plan your sorting strategy for Canadian distribution centers.
                </p>
                <Link to="/sort-planning">
                  <Button>
                    Open Sort Planning Tool
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProductionPlanning;
