
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DataCatalogTable from "@/components/data-catalog/DataCatalogTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import RouteMap from "@/components/maps/RouteMap";

// Mock data for the data catalog map view
const mockGeoData = {
  routes: [
    {
      id: 1,
      name: "Route A-101",
      coordinates: [
        [40.7128, -74.0060],
        [40.7300, -73.9950],
        [40.7400, -73.9850],
        [40.7500, -73.9750]
      ],
      color: "#0ea5e9"
    },
    {
      id: 2,
      name: "Route B-203",
      coordinates: [
        [40.7128, -74.0060],
        [40.7000, -74.0100],
        [40.6900, -74.0200],
        [40.6800, -74.0300]
      ],
      color: "#14b8a6"
    }
  ],
  points: [
    {
      id: 1,
      name: "Main Warehouse",
      position: [40.7128, -74.0060],
      type: "pickup"
    },
    {
      id: 2,
      name: "Delivery Point 1",
      position: [40.7500, -73.9750],
      type: "delivery"
    },
    {
      id: 3,
      name: "Delivery Point 2",
      position: [40.6800, -74.0300],
      type: "delivery"
    }
  ]
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
