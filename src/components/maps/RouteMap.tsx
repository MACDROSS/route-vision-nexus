
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Route, Vehicle, RoutePoint, RouteMapProps } from './types';

// Fix for default marker icons in Leaflet with React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Custom icons for different point types
const createCustomIcon = (color: string) => {
  return L.icon({
    iconUrl: iconUrl.toString(),
    iconRetinaUrl: iconRetinaUrl.toString(),
    shadowUrl: shadowUrl.toString(),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: `custom-icon-${color}`
  });
};

const RouteMap = ({
  routes = [],
  vehicles = [],
  points = [],
  centerCoordinates = [40.7128, -74.0060] as [number, number], // Default to NYC
  zoom = 10,
  height = "100%",
  className = "",
}: RouteMapProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Fix for SSR (if used)
    setIsClient(true);
    
    // Fix for the Leaflet default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconUrl: iconUrl.toString(),
      iconRetinaUrl: iconRetinaUrl.toString(),
      shadowUrl: shadowUrl.toString(),
    });
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Create icons for different point types
  const pickupIcon = createCustomIcon('blue');
  const deliveryIcon = createCustomIcon('red');
  
  // If not on client side yet, show a loading indicator
  if (!isClient) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ height }}>
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <MapContainer 
        center={centerCoordinates} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        className="z-0"
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
            pathOptions={{ 
              color: route.color || '#0ea5e9', 
              weight: route.active ? 5 : 3,
              opacity: 0.8
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">{route.name}</h3>
                {route.active && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>}
              </div>
            </Popup>
          </Polyline>
        ))}

        {/* Add markers for vehicles */}
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={vehicle.position}
            icon={L.icon({
              iconUrl: iconUrl.toString(),
              iconRetinaUrl: iconRetinaUrl.toString(),
              shadowUrl: shadowUrl.toString(),
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
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
            icon={point.type === 'pickup' ? pickupIcon : deliveryIcon}
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

      {/* Add a legend for route and marker types */}
      {(routes.length > 0 || points.length > 0) && (
        <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow-md text-xs z-10">
          {routes.length > 0 && (
            <div className="mb-1">
              <h4 className="font-medium mb-1">Routes</h4>
              {routes.map((route) => (
                <div key={route.id} className="flex items-center mb-1">
                  <div 
                    className="w-4 h-2 mr-1" 
                    style={{ backgroundColor: route.color || '#0ea5e9' }}
                  ></div>
                  <span>{route.name}</span>
                </div>
              ))}
            </div>
          )}
          {points.length > 0 && (
            <div>
              <h4 className="font-medium mb-1">Points</h4>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Pickup</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span>Delivery</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteMap;
