
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import RouteMapView from "@/components/route-optimization/RouteMapView";
import RouteListView from "@/components/route-optimization/RouteListView";
import RouteSettingsView from "@/components/route-optimization/RouteSettingsView";
import { Route, Vehicle, RoutePoint } from "@/components/maps/types";
import { mockRoutes, mockVehicles, mockDeliveryPoints } from "@/components/route-optimization/route-data";

const RouteOptimization = () => {
  const [mapReady, setMapReady] = useState(false);
  
  // Simulate map loading
  setTimeout(() => setMapReady(true), 1000);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Route Optimization</h1>
        <p className="text-muted-foreground">
          Optimize delivery routes for efficiency and cost savings
        </p>
      </div>
      
      <Tabs defaultValue="map">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Route
            </Button>
          </div>
        </div>
        
        <TabsContent value="map">
          <RouteMapView 
            routes={mockRoutes} 
            vehicles={mockVehicles} 
            points={mockDeliveryPoints} 
          />
        </TabsContent>
        
        <TabsContent value="list">
          <RouteListView />
        </TabsContent>
        
        <TabsContent value="settings">
          <RouteSettingsView />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default RouteOptimization;
