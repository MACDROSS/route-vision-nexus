
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, BarChart3, AlertCircle, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Facilities = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const facilitiesData = [
    {
      id: "FC-001",
      name: "Northeast Distribution Center",
      type: "Distribution Center",
      location: "Boston, MA",
      status: "operational",
      capacityUsage: 78,
      lastMaintenance: "2023-03-20",
      nextMaintenance: "2023-06-20",
      manager: "Robert Johnson",
      employeeCount: 245
    },
    {
      id: "FC-002",
      name: "Midwest Sorting Facility",
      type: "Sorting Hub",
      location: "Chicago, IL",
      status: "operational",
      capacityUsage: 92,
      lastMaintenance: "2023-02-15",
      nextMaintenance: "2023-05-15",
      manager: "Lisa Chen",
      employeeCount: 176
    },
    {
      id: "FC-003",
      name: "West Coast Distribution",
      type: "Distribution Center",
      location: "Los Angeles, CA",
      status: "operational",
      capacityUsage: 65,
      lastMaintenance: "2023-04-02",
      nextMaintenance: "2023-07-02",
      manager: "Marcus Williams",
      employeeCount: 210
    },
    {
      id: "FC-004",
      name: "Southern Warehouse",
      type: "Warehouse",
      location: "Dallas, TX",
      status: "maintenance",
      capacityUsage: 30,
      lastMaintenance: "2023-04-10",
      nextMaintenance: "2023-04-15",
      manager: "Sarah Rodriguez",
      employeeCount: 122
    },
    {
      id: "FC-005",
      name: "Southeast Distribution",
      type: "Distribution Center",
      location: "Miami, FL",
      status: "operational",
      capacityUsage: 81,
      lastMaintenance: "2023-03-05",
      nextMaintenance: "2023-06-05",
      manager: "David Wilson",
      employeeCount: 189
    }
  ];

  const maintenanceTasks = [
    {
      id: "MT-1001",
      facilityId: "FC-004",
      task: "Conveyor belt replacement",
      priority: "high",
      scheduledDate: "2023-04-12",
      duration: "24 hours",
      status: "scheduled",
      assignedTeam: "Maintenance Crew A"
    },
    {
      id: "MT-1002",
      facilityId: "FC-002",
      task: "HVAC system inspection",
      priority: "medium",
      scheduledDate: "2023-04-20",
      duration: "8 hours",
      status: "scheduled",
      assignedTeam: "HVAC Specialists"
    },
    {
      id: "MT-1003",
      facilityId: "FC-001",
      task: "Loading dock repair",
      priority: "low",
      scheduledDate: "2023-05-05",
      duration: "12 hours",
      status: "scheduled",
      assignedTeam: "Maintenance Crew B"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "operational":
        return <Badge className="bg-green-500">Operational</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      case "offline":
        return <Badge className="bg-red-500">Offline</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-500">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getCapacityColor = (usage: number) => {
    if (usage >= 90) return "bg-red-500";
    if (usage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Facilities Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your warehouse and distribution facilities
        </p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Facilities Details</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">5</div>
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Capacity Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">69%</div>
                    <BarChart3 className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <AlertCircle className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Facility Status</CardTitle>
                <CardDescription>Current status of your facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Capacity Usage</TableHead>
                      <TableHead>Manager</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facilitiesData.map((facility) => (
                      <TableRow key={facility.id}>
                        <TableCell className="font-medium">{facility.id}</TableCell>
                        <TableCell>{facility.name}</TableCell>
                        <TableCell>{facility.type}</TableCell>
                        <TableCell>{facility.location}</TableCell>
                        <TableCell>{getStatusBadge(facility.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={facility.capacityUsage} className={getCapacityColor(facility.capacityUsage)} />
                            <span className="text-sm">{facility.capacityUsage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{facility.manager}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Facility Details</CardTitle>
                <CardDescription>Detailed information about your facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Maintenance</TableHead>
                      <TableHead>Next Maintenance</TableHead>
                      <TableHead>Employee Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facilitiesData.map((facility) => (
                      <TableRow key={facility.id}>
                        <TableCell className="font-medium">{facility.id}</TableCell>
                        <TableCell>{facility.name}</TableCell>
                        <TableCell>{facility.type}</TableCell>
                        <TableCell>{facility.location}</TableCell>
                        <TableCell>{facility.lastMaintenance}</TableCell>
                        <TableCell>{facility.nextMaintenance}</TableCell>
                        <TableCell>{facility.employeeCount}</TableCell>
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
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Current and upcoming maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Facility ID</TableHead>
                      <TableHead>Task Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Assigned Team</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {maintenanceTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{task.facilityId}</TableCell>
                        <TableCell>{task.task}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{task.scheduledDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{task.duration}</span>
                          </div>
                        </TableCell>
                        <TableCell>{task.assignedTeam}</TableCell>
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

export default Facilities;
