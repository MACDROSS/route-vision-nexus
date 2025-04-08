
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MaintenanceAlert } from "./types";

interface MaintenanceAlertsTableProps {
  alerts: MaintenanceAlert[];
  getMaintenanceSeverityBadge: (severity: string) => React.ReactElement;
}

const MaintenanceAlertsTable = ({ alerts, getMaintenanceSeverityBadge }: MaintenanceAlertsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alert ID</TableHead>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Reported Date</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alerts.map((alert) => (
          <TableRow key={alert.id}>
            <TableCell className="font-medium">{alert.id}</TableCell>
            <TableCell>{alert.vehicleId}</TableCell>
            <TableCell>{alert.issue}</TableCell>
            <TableCell>{getMaintenanceSeverityBadge(alert.severity)}</TableCell>
            <TableCell>{alert.reportedDate}</TableCell>
            <TableCell>{alert.assignedTo}</TableCell>
            <TableCell>
              <Badge className={alert.status === "in-progress" ? "bg-blue-500" : "bg-gray-500"}>
                {alert.status === "in-progress" ? "In Progress" : "Scheduled"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaintenanceAlertsTable;
