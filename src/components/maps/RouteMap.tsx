
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fix for default marker icons in Leaflet with React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Define types for our map component
interface Vehicle {
  id: number;
  name: string;
  position: [number, number];
  status: "delivering" | "returning" | "idle";
  packages: number;
}

interface RoutePoint {
  id: number;
  name: string;
  position: [number, number];
  type: "pickup" | "delivery";
}

interface Route {
  id: number;
  name: string;
  coordinates: [number, number][];
  color: string;
  active?: boolean;
}

interface RouteMapProps {
  routes?: Route[];
  vehicles?: Vehicle[];
  points?: RoutePoint[];
  centerCoordinates?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Set up the default icon for markers
const defaultIcon = new Icon({
  iconRetinaUrl: iconRetinaUrl.toString(),
  iconUrl: iconUrl.toString(),
  shadowUrl: shadowUrl.toString(),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RouteMap = ({
  routes = [],
  vehicles = [],
  points = [],
  centerCoordinates = [40.7128, -74.0060], // Default to NYC coordinates
  zoom = 12,
  height = "100%",
  className = "",
}: RouteMapProps) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Set map as ready after a short delay to ensure proper rendering
    const timer = setTimeout(() => {
      setMapReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Loading indicator while map is initializing */}
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Map Container */}
      <MapContainer 
        center={centerCoordinates} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        className={`z-0 ${!mapReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw routes as polylines */}
        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.coordinates}
            pathOptions={{ color: route.color, weight: route.active ? 5 : 3 }}
          />
        ))}

        {/* Add markers for vehicles */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={vehicle.position}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Status: <span className="capitalize">{vehicle.status}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Packages: {vehicle.packages}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Add markers for delivery/pickup points */}
        {points.map((point) => (
          <Marker
            key={point.id}
            position={point.position}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{point.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {point.type} Point
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RouteMap;
