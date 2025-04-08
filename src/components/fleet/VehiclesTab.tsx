
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FleetDetailsTable from "./FleetDetailsTable";
import { FleetVehicle } from "./types";

interface VehiclesTabProps {
  vehicles: FleetVehicle[];
  getStatusBadge: (status: string) => React.ReactElement;
}

const VehiclesTab = ({ vehicles, getStatusBadge }: VehiclesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Details</CardTitle>
        <CardDescription>Detailed information about your fleet vehicles</CardDescription>
      </CardHeader>
      <CardContent>
        <FleetDetailsTable vehicles={vehicles} getStatusBadge={getStatusBadge} />
      </CardContent>
    </Card>
  );
};

export default VehiclesTab;
