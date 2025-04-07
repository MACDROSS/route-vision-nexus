
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
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Set map as initialized to trigger rendering
    setMapInitialized(true);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Make sure the marker icon is set before rendering
  useEffect(() => {
    // This ensures the icons are properly set for all markers
    // Use import instead of require in a Vite project
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.toString(),
        iconUrl: iconUrl.toString(),
        shadowUrl: shadowUrl.toString(),
      });
    });
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Loading indicator while map is initializing */}
      {!mapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Map Container */}
      <MapContainer 
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        className={`z-0 ${!mapInitialized ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        ref={mapContainerRef}
        // Apply center and zoom via the MapView component instead of directly on MapContainer
        center={centerCoordinates}
        zoom={zoom}
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
            pathOptions={{ color: route.color || '#0ea5e9', weight: route.active ? 5 : 3 }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{route.name}</h3>
              </div>
            </Popup>
          </Polyline>
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
