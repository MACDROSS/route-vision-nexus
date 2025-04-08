
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DataCatalogTable from "@/components/data-catalog/DataCatalogTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import RouteMap from "@/components/maps/RouteMap";
import { Route, RoutePoint } from "@/components/maps/types";

// Enhanced mock data for the data catalog map view
const mockGeoData = {
  routes: [
    {
      id: 1,
      name: "Northeast Corridor",
      coordinates: [
        [40.7128, -74.0060], // New York
        [40.7300, -73.9950],
        [40.7400, -73.9850],
        [40.7500, -73.9750],
        [42.3601, -71.0589]  // Boston
      ] as [number, number][],
      color: "#0ea5e9"
    },
    {
      id: 2,
      name: "Mid-Atlantic Route",
      coordinates: [
        [40.7128, -74.0060], // New York
        [40.7000, -74.0100],
        [40.6900, -74.0200],
        [40.6800, -74.0300],
        [39.9526, -75.1652]  // Philadelphia
      ] as [number, number][],
      color: "#14b8a6"
    },
    {
      id: 3,
      name: "Southern Express",
      coordinates: [
        [39.9526, -75.1652], // Philadelphia
        [39.2904, -76.6122], // Baltimore
        [38.9072, -77.0369], // Washington DC
        [37.5407, -77.4360]  // Richmond
      ] as [number, number][],
      color: "#f59e0b"
    },
    {
      id: 4,
      name: "Midwest Connection",
      coordinates: [
        [40.7128, -74.0060], // New York
        [41.4993, -81.6944], // Cleveland
        [41.8781, -87.6298]  // Chicago
      ] as [number, number][],
      color: "#ef4444"
    },
    {
      id: 5,
      name: "West Coast Route",
      coordinates: [
        [37.7749, -122.4194], // San Francisco
        [34.0522, -118.2437], // Los Angeles
        [32.7157, -117.1611]  // San Diego
      ] as [number, number][],
      color: "#8b5cf6"
    }
  ] as Route[],
  points: [
    {
      id: 1,
      name: "New York Distribution Center",
      position: [40.7128, -74.0060] as [number, number],
      type: "pickup" as const
    },
    {
      id: 2,
      name: "Boston Delivery Hub",
      position: [42.3601, -71.0589] as [number, number],
      type: "delivery" as const
    },
    {
      id: 3,
      name: "Philadelphia Warehouse",
      position: [39.9526, -75.1652] as [number, number],
      type: "pickup" as const
    },
    {
      id: 4,
      name: "Chicago Distribution Center",
      position: [41.8781, -87.6298] as [number, number],
      type: "delivery" as const
    },
    {
      id: 5,
      name: "Washington DC Hub",
      position: [38.9072, -77.0369] as [number, number],
      type: "delivery" as const
    },
    {
      id: 6,
      name: "San Francisco Logistics Center",
      position: [37.7749, -122.4194] as [number, number],
      type: "pickup" as const
    },
    {
      id: 7,
      name: "Los Angeles Distribution",
      position: [34.0522, -118.2437] as [number, number],
      type: "delivery" as const
    },
    {
      id: 8,
      name: "Richmond Regional Center",
      position: [37.5407, -77.4360] as [number, number],
      type: "delivery" as const
    },
    {
      id: 9,
      name: "Cleveland Hub",
      position: [41.4993, -81.6944] as [number, number],
      type: "pickup" as const
    }
  ] as RoutePoint[]
};

const DataCatalog = () => {
  const [activeTab, setActiveTab] = useState<string>("table");

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Data Catalog</h1>
        <p className="text-muted-foreground">
          Browse, visualize, and extract network data
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="h-[calc(100vh-12rem)]">
          <DataCatalogTable />
        </TabsContent>
        
        <TabsContent value="map">
          <Card>
            <CardContent className="p-0">
              <div className="h-[calc(100vh-16rem)]">
                <RouteMap 
                  routes={mockGeoData.routes} 
                  points={mockGeoData.points}
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default DataCatalog;
