
import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the map
const mockMapData = {
  routes: [
    {
      id: 1,
      name: "North City Delivery",
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
      name: "South City Delivery",
      coordinates: [
        [40.7128, -74.0060],
        [40.7000, -74.0100],
        [40.6900, -74.0200],
        [40.6800, -74.0300]
      ],
      color: "#14b8a6"
    },
    {
      id: 3,
      name: "East City Delivery",
      coordinates: [
        [40.7128, -74.0060],
        [40.7150, -73.9800],
        [40.7200, -73.9600],
        [40.7250, -73.9400]
      ],
      color: "#8b5cf6"
    }
  ],
  vehicles: [
    {
      id: 1,
      name: "Truck 101",
      position: [40.7300, -73.9950],
      status: "delivering",
      packages: 12
    },
    {
      id: 2,
      name: "Truck 102",
      position: [40.6900, -74.0200],
      status: "delivering",
      packages: 8
    },
    {
      id: 3,
      name: "Truck 103",
      position: [40.7200, -73.9600],
      status: "returning",
      packages: 3
    }
  ]
};

const RouteOverviewMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // This would normally initialize a real map like MapboxGL or Leaflet
    // For now, we'll just simulate a map loading
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Active Routes</span>
          <span className="text-sm font-normal text-muted-foreground">{mockMapData.routes.length} routes | {mockMapData.vehicles.length} vehicles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        <div className="map-container bg-muted relative">
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
          {mapReady && (
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-muted-foreground">Map visualization would go here</p>
                <p className="text-sm text-muted-foreground">Showing {mockMapData.routes.length} routes and {mockMapData.vehicles.length} active vehicles</p>
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {mockMapData.routes.map(route => (
                    <div key={route.id} className="flex items-center gap-2 px-3 py-1 bg-background rounded-full shadow-sm">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: route.color }}></div>
                      <span className="text-xs font-medium">{route.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={mapContainer} className="w-full h-full"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteOverviewMap;
