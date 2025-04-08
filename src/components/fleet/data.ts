
import { FleetVehicle, MaintenanceAlert } from "./types";

export const fleetVehicles: FleetVehicle[] = [
  {
    id: "V-1042",
    type: "Class 8 Truck",
    status: "active",
    lastMaintenance: "2023-04-02",
    nextMaintenance: "2023-05-02",
    driver: "James Wilson",
    currentRoute: "RO-276",
    fuelLevel: 78,
    mileage: 127500
  },
  {
    id: "V-1043",
    type: "Class 8 Truck",
    status: "maintenance",
    lastMaintenance: "2023-03-15",
    nextMaintenance: "2023-04-15",
    driver: "Sarah Johnson",
    currentRoute: null,
    fuelLevel: 42,
    mileage: 156200
  },
  {
    id: "V-1044",
    type: "Delivery Van",
    status: "active",
    lastMaintenance: "2023-03-28",
    nextMaintenance: "2023-04-28",
    driver: "Michael Chen",
    currentRoute: "RO-344",
    fuelLevel: 93,
    mileage: 76300
  },
  {
    id: "V-1045",
    type: "Delivery Van",
    status: "active",
    lastMaintenance: "2023-04-05",
    nextMaintenance: "2023-05-05",
    driver: "David Rodriguez",
    currentRoute: "RO-127",
    fuelLevel: 65,
    mileage: 42800
  },
  {
    id: "V-1046",
    type: "Class 6 Truck",
    status: "inactive",
    lastMaintenance: "2023-02-20",
    nextMaintenance: "2023-04-20",
    driver: "Unassigned",
    currentRoute: null,
    fuelLevel: 12,
    mileage: 98400
  }
];

export const maintenanceAlerts: MaintenanceAlert[] = [
  {
    id: "MA-1001",
    vehicleId: "V-1043",
    issue: "Brake system maintenance",
    severity: "high",
    reportedDate: "2023-04-08",
    assignedTo: "Maintenance Team A",
    status: "in-progress"
  },
  {
    id: "MA-1002",
    vehicleId: "V-1046",
    issue: "Engine diagnostic required",
    severity: "medium",
    reportedDate: "2023-04-02",
    assignedTo: "Maintenance Team B",
    status: "scheduled"
  },
  {
    id: "MA-1003",
    vehicleId: "V-1044",
    issue: "Tire rotation needed",
    severity: "low",
    reportedDate: "2023-03-30",
    assignedTo: "Maintenance Team A",
    status: "scheduled"
  }
];
