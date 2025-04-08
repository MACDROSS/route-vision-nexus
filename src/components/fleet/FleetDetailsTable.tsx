
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FleetVehicle } from "./types";

interface FleetDetailsTableProps {
  vehicles: FleetVehicle[];
  getStatusBadge: (status: string) => React.ReactElement;
}

const FleetDetailsTable = ({ vehicles, getStatusBadge }: FleetDetailsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Last Maintenance</TableHead>
          <TableHead>Next Maintenance</TableHead>
          <TableHead>Mileage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.id}</TableCell>
            <TableCell>{vehicle.type}</TableCell>
            <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
            <TableCell>{vehicle.driver}</TableCell>
            <TableCell>{vehicle.lastMaintenance}</TableCell>
            <TableCell>{vehicle.nextMaintenance}</TableCell>
            <TableCell>{vehicle.mileage.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FleetDetailsTable;
