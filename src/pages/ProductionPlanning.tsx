
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
import { ArrowRight } from "lucide-react";

const ProductionPlanning = () => {
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
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="processes">Processes</TabsTrigger>
            <TabsTrigger value="sort">Sort Planning</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="calendar" className="h-[calc(100vh-12rem)]">
          <ProductionCalendar />
        </TabsContent>
        
        <TabsContent value="optimization">
          <OptimizationPanel />
        </TabsContent>
        
        <TabsContent value="processes">
          <Card>
            <CardHeader>
              <CardTitle>Process Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure and manage production processes here.</p>
            </CardContent>
          </Card>
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
