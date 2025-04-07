
import { Route, Vehicle, RoutePoint } from "../maps/types";

// Mock data for map visualization
export const mockRoutes = [
  {
    id: 1,
    name: "Downtown Express",
    coordinates: [
      [40.7128, -74.0060],
      [40.7300, -73.9950],
      [40.7400, -73.9850],
      [40.7500, -73.9750]
    ] as [number, number][],
    color: "#0ea5e9",
    active: true
  },
  {
    id: 2,
    name: "North City Route",
    coordinates: [
      [40.7128, -74.0060],
      [40.7000, -74.0100],
      [40.6900, -74.0200],
      [40.6800, -74.0300]
    ] as [number, number][],
    color: "#10b981"
  },
  {
    id: 3,
    name: "Airport Delivery",
    coordinates: [
      [40.7128, -74.0060],
      [40.7150, -73.9800],
      [40.7200, -73.9600],
      [40.7250, -73.9400]
    ] as [number, number][],
    color: "#8b5cf6"
  }
] as Route[];

export const mockVehicles = [
  {
    id: 1,
    name: "Truck 101",
    position: [40.7300, -73.9950] as [number, number],
    status: "delivering" as const,
    packages: 12
  },
  {
    id: 2,
    name: "Van 023",
    position: [40.6900, -74.0200] as [number, number],
    status: "delivering" as const,
    packages: 8
  },
  {
    id: 3,
    name: "Bike 015",
    position: [40.7200, -73.9600] as [number, number],
    status: "returning" as const,
    packages: 3
  }
] as Vehicle[];

export const mockDeliveryPoints = [
  {
    id: 1,
    name: "Downtown Office",
    position: [40.7500, -73.9750] as [number, number],
    type: "delivery" as const
  },
  {
    id: 2,
    name: "Central Warehouse",
    position: [40.7128, -74.0060] as [number, number],
    type: "pickup" as const
  },
  {
    id: 3,
    name: "Airport Hub",
    position: [40.7250, -73.9400] as [number, number],
    type: "delivery" as const
  }
] as RoutePoint[];
