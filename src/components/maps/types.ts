
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

// Package tracking interfaces
export interface Package {
  id: string;
  trackingId: string;
  status: "pending" | "in_transit" | "delivered" | "delayed" | "returned";
  origin: string;
  destination: string;
  estimatedDelivery: string; // ISO date string
  actualDelivery?: string; // ISO date string
  customerName: string;
  lastUpdate: string; // ISO date string
  onTime: boolean;
  priorityLevel: "standard" | "express" | "priority";
  vehicleId?: number;
}

export interface PackageFilter {
  status?: Package["status"] | "all";
  priority?: Package["priorityLevel"] | "all";
  onTime?: boolean | "all";
}
