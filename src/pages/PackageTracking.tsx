
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PackageTracking from "@/components/packages/PackageTracking";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Route, RoutePoint, Vehicle } from "@/components/maps/types";
import RouteMap from "@/components/maps/RouteMap";

// Mock data for map visualization
const mockRoutes = [
  {
    id: 1,
    name: "Express Route A",
    coordinates: [
      [40.7128, -74.0060],
      [40.7300, -73.9950],
      [40.7400, -73.9850],
      [40.7500, -73.9750]
    ] as [number, number][],
    color: "#0ea5e9",
    active: true
  },
  {
    id: 2,
    name: "Standard Route B",
    coordinates: [
      [40.7128, -74.0060],
      [40.7000, -74.0100],
      [40.6900, -74.0200],
      [40.6800, -74.0300]
    ] as [number, number][],
    color: "#10b981"
  },
] as Route[];

const mockVehicles = [
  {
    id: 1,
    name: "Truck 101",
    position: [40.7300, -73.9950] as [number, number],
    status: "delivering" as const,
    packages: 12
  },
  {
    id: 2,
    name: "Van 023",
    position: [40.6900, -74.0200] as [number, number],
    status: "delivering" as const,
    packages: 8
  },
] as Vehicle[];

const mockPoints = [
  {
    id: 1,
    name: "Manhattan Office",
    position: [40.7500, -73.9750] as [number, number],
    type: "delivery" as const
  },
  {
    id: 2,
    name: "NYC Warehouse",
    position: [40.7128, -74.0060] as [number, number],
    type: "pickup" as const
  },
  {
    id: 3,
    name: "Brooklyn Store",
    position: [40.6800, -74.0300] as [number, number],
    type: "delivery" as const
  }
] as RoutePoint[];

const PackageTrackingPage = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Package Tracking</h1>
        <p className="text-muted-foreground">
          Monitor and track package deliveries in real-time
        </p>
      </div>

      <Tabs defaultValue="list">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="h-[calc(100vh-220px)]">
          <PackageTracking />
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-[calc(100vh-220px)]">
                <RouteMap
                  routes={mockRoutes}
                  vehicles={mockVehicles}
                  points={mockPoints}
                  height="calc(100vh - 220px)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">On-Time Delivery Performance</h3>
                {/* Reuse the existing DeliveryMetrics component */}
                <div className="h-80">
                  {/* We'll use the existing DeliveryMetrics component here */}
                  <iframe className="w-full h-full" src="/?" style={{ border: 'none' }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default PackageTrackingPage;
