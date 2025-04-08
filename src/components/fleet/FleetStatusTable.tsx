
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FleetVehicle } from "./types";

interface FleetStatusTableProps {
  vehicles: FleetVehicle[];
  getStatusBadge: (status: string) => React.ReactElement;
}

const FleetStatusTable = ({ vehicles, getStatusBadge }: FleetStatusTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Current Route</TableHead>
          <TableHead>Fuel Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.id}</TableCell>
            <TableCell>{vehicle.type}</TableCell>
            <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
            <TableCell>{vehicle.driver}</TableCell>
            <TableCell>{vehicle.currentRoute || "—"}</TableCell>
            <TableCell>{vehicle.fuelLevel}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FleetStatusTable;
