
import MainLayout from "@/components/layout/MainLayout";
import ProductionCalendar from "@/components/production-planning/ProductionCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizationPanel from "@/components/production-planning/OptimizationPanel";

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
      </Tabs>
    </MainLayout>
  );
};

export default ProductionPlanning;
