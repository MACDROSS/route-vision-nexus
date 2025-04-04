
import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RouteMap from "@/components/maps/RouteMap";

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
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Set map as ready after a short delay
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
          <span className="text-sm font-normal text-muted-foreground">
            {mockMapData.routes.length} routes | {mockMapData.vehicles.length} vehicles
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        {mapReady ? (
          <RouteMap
            routes={mockMapData.routes}
            vehicles={mockMapData.vehicles}
            height="100%"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteOverviewMap;
