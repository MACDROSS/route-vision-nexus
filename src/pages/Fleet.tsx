
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Fleet = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const fleetVehicles = [
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

  const maintenanceAlerts = [
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

  const getStatusBadge = (status: string) => {
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

  const getMaintenanceSeverityBadge = (severity: string) => {
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

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Fleet Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your delivery fleet
        </p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">5</div>
                    <Truck className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Fleet Status</CardTitle>
                <CardDescription>Current status of your delivery fleet</CardDescription>
              </CardHeader>
              <CardContent>
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
                    {fleetVehicles.map((vehicle) => (
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
                <CardDescription>Detailed information about your fleet vehicles</CardDescription>
              </CardHeader>
              <CardContent>
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
                    {fleetVehicles.map((vehicle) => (
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Alerts</CardTitle>
                <CardDescription>Current maintenance issues and scheduled repairs</CardDescription>
              </CardHeader>
              <CardContent>
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
                    {maintenanceAlerts.map((alert) => (
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Fleet;
