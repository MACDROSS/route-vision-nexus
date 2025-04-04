
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import { Route, Vehicle, RoutePoint, RouteMapProps } from './types';

// Fix for default marker icons in Leaflet with React
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

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

// This component updates the map view when center or zoom changes
const MapView = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const RouteMap = ({
  routes = [],
  vehicles = [],
  points = [],
  centerCoordinates = [40.7128, -74.0060] as [number, number], // Default to NYC coordinates
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
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        className={`z-0 ${!mapReady ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      >
        {/* Use the MapView component to control center and zoom */}
        <MapView center={centerCoordinates} zoom={zoom} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
