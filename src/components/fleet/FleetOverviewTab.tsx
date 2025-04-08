
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FleetStatCards from "./FleetStatCards";
import FleetStatusTable from "./FleetStatusTable";
import { FleetVehicle } from "./types";

interface FleetOverviewTabProps {
  vehicles: FleetVehicle[];
  getStatusBadge: (status: string) => React.ReactElement;
}

const FleetOverviewTab = ({ vehicles, getStatusBadge }: FleetOverviewTabProps) => {
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === "active").length;
  const maintenanceAlerts = 3; // This is hardcoded in the original file

  return (
    <>
      <FleetStatCards 
        totalVehicles={totalVehicles} 
        activeVehicles={activeVehicles} 
        maintenanceAlerts={maintenanceAlerts}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Fleet Status</CardTitle>
          <CardDescription>Current status of your delivery fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <FleetStatusTable vehicles={vehicles} getStatusBadge={getStatusBadge} />
        </CardContent>
      </Card>
    </>
  );
};

export default FleetOverviewTab;
