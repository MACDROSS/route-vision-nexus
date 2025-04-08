
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserSearch, UserCog, Award, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Personnel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const personnelData = [
    {
      id: "EMP-1001",
      name: "James Wilson",
      role: "Driver",
      department: "Delivery",
      status: "active",
      hireDate: "2020-06-15",
      location: "Boston, MA",
      supervisor: "Maria Garcia",
      shifts: "Morning",
      performanceScore: 92
    },
    {
      id: "EMP-1002",
      name: "Sarah Johnson",
      role: "Driver",
      department: "Delivery",
      status: "active",
      hireDate: "2019-03-22",
      location: "Boston, MA",
      supervisor: "Maria Garcia",
      shifts: "Evening",
      performanceScore: 88
    },
    {
      id: "EMP-1003",
      name: "Michael Chen",
      role: "Driver",
      department: "Delivery",
      status: "active",
      hireDate: "2021-02-10",
      location: "Chicago, IL",
      supervisor: "Robert Williams",
      shifts: "Morning",
      performanceScore: 95
    },
    {
      id: "EMP-1004",
      name: "David Rodriguez",
      role: "Driver",
      department: "Delivery",
      status: "on-leave",
      hireDate: "2018-11-05",
      location: "Los Angeles, CA",
      supervisor: "Jennifer Smith",
      shifts: "Night",
      performanceScore: 85
    },
    {
      id: "EMP-1005",
      name: "Lisa Chen",
      role: "Facility Manager",
      department: "Operations",
      status: "active",
      hireDate: "2017-08-20",
      location: "Chicago, IL",
      supervisor: "Thomas Brown",
      shifts: "Day",
      performanceScore: 97
    },
    {
      id: "EMP-1006",
      name: "Marcus Williams",
      role: "Facility Manager",
      department: "Operations",
      status: "active",
      hireDate: "2016-05-12",
      location: "Los Angeles, CA",
      supervisor: "Thomas Brown",
      shifts: "Day",
      performanceScore: 94
    },
    {
      id: "EMP-1007",
      name: "Sarah Rodriguez",
      role: "Facility Manager",
      department: "Operations",
      status: "active",
      hireDate: "2019-01-15",
      location: "Dallas, TX",
      supervisor: "Thomas Brown",
      shifts: "Day",
      performanceScore: 91
    }
  ];

  const trainingData = [
    {
      id: "TR-1001",
      name: "Safety Compliance Training",
      department: "All",
      duration: "8 hours",
      dueDate: "2023-05-15",
      status: "mandatory",
      completionRate: 78
    },
    {
      id: "TR-1002",
      name: "Advanced Driving Techniques",
      department: "Delivery",
      duration: "16 hours",
      dueDate: "2023-06-10",
      status: "optional",
      completionRate: 45
    },
    {
      id: "TR-1003",
      name: "Warehouse Management Systems",
      department: "Operations",
      duration: "24 hours",
      dueDate: "2023-05-30",
      status: "mandatory",
      completionRate: 62
    },
    {
      id: "TR-1004",
      name: "Leadership Skills",
      department: "Management",
      duration: "16 hours",
      dueDate: "2023-07-20",
      status: "recommended",
      completionRate: 30
    },
  ];

  const scheduleData = [
    {
      id: "SCH-1001",
      department: "Delivery",
      shift: "Morning",
      hours: "6:00 AM - 2:00 PM",
      personnel: 32,
      coverage: "adequate"
    },
    {
      id: "SCH-1002",
      department: "Delivery",
      shift: "Evening",
      hours: "2:00 PM - 10:00 PM",
      personnel: 28,
      coverage: "adequate"
    },
    {
      id: "SCH-1003",
      department: "Delivery",
      shift: "Night",
      hours: "10:00 PM - 6:00 AM",
      personnel: 18,
      coverage: "understaffed"
    },
    {
      id: "SCH-1004",
      department: "Operations",
      shift: "Day",
      hours: "8:00 AM - 5:00 PM",
      personnel: 45,
      coverage: "adequate"
    },
    {
      id: "SCH-1005",
      department: "Operations",
      shift: "Night",
      hours: "8:00 PM - 5:00 AM",
      personnel: 20,
      coverage: "understaffed"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-yellow-500">On Leave</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTrainingStatusBadge = (status: string) => {
    switch(status) {
      case "mandatory":
        return <Badge className="bg-red-500">Mandatory</Badge>;
      case "recommended":
        return <Badge className="bg-yellow-500">Recommended</Badge>;
      case "optional":
        return <Badge className="bg-blue-500">Optional</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCoverageBadge = (coverage: string) => {
    switch(coverage) {
      case "adequate":
        return <Badge className="bg-green-500">Adequate</Badge>;
      case "understaffed":
        return <Badge className="bg-red-500">Understaffed</Badge>;
      case "overstaffed":
        return <Badge className="bg-yellow-500">Overstaffed</Badge>;
      default:
        return <Badge>{coverage}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Personnel Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your workforce
        </p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">7</div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">4</div>
                    <UserSearch className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Facility Managers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <UserCog className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">92%</div>
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Personnel Overview</CardTitle>
                <CardDescription>Quick view of your personnel by department</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Active Personnel</TableHead>
                      <TableHead>On Leave</TableHead>
                      <TableHead>Average Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Delivery</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>90%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Operations</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>94%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>Details of all personnel</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personnelData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {getInitials(employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>{employee.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={
                              employee.performanceScore >= 90 ? "text-green-500" : 
                              employee.performanceScore >= 80 ? "text-yellow-500" : "text-red-500"
                            }>
                              {employee.performanceScore}%
                            </span>
                            {employee.performanceScore >= 90 && <Award className="h-4 w-4 text-green-500" />}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>Current and upcoming training initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Training ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trainingData.map((training) => (
                      <TableRow key={training.id}>
                        <TableCell className="font-medium">{training.id}</TableCell>
                        <TableCell>{training.name}</TableCell>
                        <TableCell>{training.department}</TableCell>
                        <TableCell>{training.duration}</TableCell>
                        <TableCell>{training.dueDate}</TableCell>
                        <TableCell>{getTrainingStatusBadge(training.status)}</TableCell>
                        <TableCell>{training.completionRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduling" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shift Schedules</CardTitle>
                <CardDescription>Current shift schedules and staffing levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Schedule ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Personnel Count</TableHead>
                      <TableHead>Coverage Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduleData.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.id}</TableCell>
                        <TableCell>{schedule.department}</TableCell>
                        <TableCell>{schedule.shift}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{schedule.hours}</span>
                          </div>
                        </TableCell>
                        <TableCell>{schedule.personnel}</TableCell>
                        <TableCell>{getCoverageBadge(schedule.coverage)}</TableCell>
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

export default Personnel;
