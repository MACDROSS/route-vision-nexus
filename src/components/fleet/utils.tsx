
import React from "react";
import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
  switch(status) {
    case "active":
      return <Badge className="bg-green-500">Active</Badge>;
    case "maintenance":
      return <Badge className="bg-yellow-500">Maintenance</Badge>;
    case "inactive":
      return <Badge className="bg-gray-500">Inactive</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const getMaintenanceSeverityBadge = (severity: string) => {
  switch(severity) {
    case "high":
      return <Badge className="bg-red-500">High</Badge>;
    case "medium":
      return <Badge className="bg-yellow-500">Medium</Badge>;
    case "low":
      return <Badge className="bg-blue-500">Low</Badge>;
    default:
      return <Badge>{severity}</Badge>;
  }
};
