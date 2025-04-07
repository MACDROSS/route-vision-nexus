
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import RouteMap from "@/components/maps/RouteMap";
import { Scenario } from "./types";
import { MapPin, Truck, Map } from "lucide-react";
import { Route, Vehicle, RoutePoint } from "@/components/maps/types";

interface ScenarioMapViewProps {
  scenario: Scenario;
}

const ScenarioMapView: React.FC<ScenarioMapViewProps> = ({ scenario }) => {
  const [mapReady, setMapReady] = useState(false);
  
  // Convert scenario map data to the format expected by RouteMap
  const routes: Route[] = scenario.routes?.map(route => ({
    id: route.id,
    name: route.name,
    coordinates: route.coordinates,
    color: route.color,
    active: route.active
  })) || [];
  
  const vehicles: Vehicle[] = scenario.vehicles?.map(vehicle => ({
    id: vehicle.id,
    name: vehicle.name,
    position: vehicle.position,
    status: vehicle.status,
    packages: vehicle.packages
  })) || [];
  
  const points: RoutePoint[] = scenario.deliveryPoints?.map(point => ({
    id: point.id,
    name: point.name,
    position: point.position,
    type: point.type
  })) || [];

  useEffect(() => {
    // Set map as ready after a short delay
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Map className="h-5 w-5" /> 
        Map View for {scenario.name}
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-[70vh]">
                {mapReady ? (
                  <RouteMap
                    routes={routes}
                    vehicles={vehicles}
                    points={points}
                    height="70vh"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Route Summary</h3>
              <div className="space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{routes.length}</span> routes
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{vehicles.length}</span> vehicles
                </p>
                <p className="text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{points.length}</span> delivery points
                </p>
              </div>
            </CardContent>
          </Card>
          
          {vehicles.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Active Vehicles</h3>
                <div className="space-y-2">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div>
                        <p className="font-medium">{vehicle.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {vehicle.status === "delivering" ? "On Route" : vehicle.status === "returning" ? "Returning" : "Idle"} • {vehicle.packages} packages
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioMapView;
