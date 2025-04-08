
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MaintenanceAlertsTable from "./MaintenanceAlertsTable";
import { MaintenanceAlert } from "./types";

interface MaintenanceTabProps {
  alerts: MaintenanceAlert[];
  getMaintenanceSeverityBadge: (severity: string) => React.ReactElement;
}

const MaintenanceTab = ({ alerts, getMaintenanceSeverityBadge }: MaintenanceTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Alerts</CardTitle>
        <CardDescription>Current maintenance issues and scheduled repairs</CardDescription>
      </CardHeader>
      <CardContent>
        <MaintenanceAlertsTable alerts={alerts} getMaintenanceSeverityBadge={getMaintenanceSeverityBadge} />
      </CardContent>
    </Card>
  );
};

export default MaintenanceTab;
