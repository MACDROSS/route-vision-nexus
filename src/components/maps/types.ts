
export interface Vehicle {
  id: number;
  name: string;
  position: [number, number];
  status: "delivering" | "returning" | "idle";
  packages: number;
}

export interface RoutePoint {
  id: number;
  name: string;
  position: [number, number];
  type: "pickup" | "delivery";
}

export interface Route {
  id: number;
  name: string;
  coordinates: [number, number][];
  color: string;
  active?: boolean;
}

export interface RouteMapProps {
  routes?: Route[];
  vehicles?: Vehicle[];
  points?: RoutePoint[];
  centerCoordinates?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}
