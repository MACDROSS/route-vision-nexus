
export interface FleetVehicle {
  id: string;
  type: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
  driver: string;
  currentRoute: string | null;
  fuelLevel: number;
  mileage: number;
}

export interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  issue: string;
  severity: string;
  reportedDate: string;
  assignedTo: string;
  status: string;
}
