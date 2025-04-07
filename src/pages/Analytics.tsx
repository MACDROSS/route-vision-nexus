
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { ChartArea, ChartBar, ChartLine, ChartPie, Package, Truck, Users, Calendar } from "lucide-react";

const Analytics = () => {
  // Sample data for charts
  const deliveryData = [
    { name: "Jan", onTime: 120, delayed: 20 },
    { name: "Feb", onTime: 140, delayed: 15 },
    { name: "Mar", onTime: 135, delayed: 25 },
    { name: "Apr", onTime: 160, delayed: 10 },
    { name: "May", onTime: 170, delayed: 12 },
    { name: "Jun", onTime: 180, delayed: 8 },
  ];

  const efficiencyData = [
    { name: "Mon", value: 86 },
    { name: "Tue", value: 92 },
    { name: "Wed", value: 88 },
    { name: "Thu", value: 94 },
    { name: "Fri", value: 90 },
    { name: "Sat", value: 75 },
    { name: "Sun", value: 60 },
  ];

  const resourceUtilizationData = [
    { name: "Trucks", value: 82 },
    { name: "Drivers", value: 78 },
    { name: "Warehouses", value: 65 },
    { name: "Fuel", value: 90 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  const costTrendData = [
    { month: "Jan", fuel: 4000, maintenance: 2400, personnel: 6000 },
    { month: "Feb", fuel: 3800, maintenance: 2200, personnel: 6100 },
    { month: "Mar", fuel: 4200, maintenance: 2800, personnel: 6200 },
    { month: "Apr", fuel: 4500, maintenance: 2000, personnel: 6300 },
    { month: "May", fuel: 4300, maintenance: 2500, personnel: 6400 },
    { month: "Jun", fuel: 4800, maintenance: 2300, personnel: 6500 },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive data visualization and performance metrics
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-6 space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ChartArea className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Delivery Metrics
          </TabsTrigger>
          <TabsTrigger value="costs" className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            Cost Analysis
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" />
            Resource Utilization
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">3,482</div>
                  </div>
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                    +12.5% from last month
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Fleet Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">82%</div>
                  </div>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    +2.1% from last month
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">94.3%</div>
                  </div>
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                    +1.8% from last month
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Driver Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">87.5%</div>
                  </div>
                  <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                    +3.2% from last month
                  </Badge>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>On-time vs Delayed deliveries over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer 
                    config={{
                      onTime: { color: "#4ade80" },
                      delayed: { color: "#f87171" }
                    }}
                  >
                    <BarChart data={deliveryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" name="On Time" fill="var(--color-onTime)" stackId="a" />
                      <Bar dataKey="delayed" name="Delayed" fill="var(--color-delayed)" stackId="a" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Weekly Efficiency Trend</CardTitle>
                  <CardDescription>Average efficiency percentage by day</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer 
                    config={{
                      value: { color: "#60a5fa" }
                    }}
                  >
                    <LineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Efficiency (%)" 
                        stroke="var(--color-value)" 
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Delivery Tab */}
          <TabsContent value="delivery">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance by Month</CardTitle>
                  <CardDescription>On-time vs Delayed deliveries over time</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ChartContainer 
                    config={{
                      onTime: { color: "#4ade80" },
                      delayed: { color: "#f87171" }
                    }}
                  >
                    <BarChart data={deliveryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="onTime" name="On Time" fill="var(--color-onTime)" stackId="a" />
                      <Bar dataKey="delayed" name="Delayed" fill="var(--color-delayed)" stackId="a" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Costs Tab */}
          <TabsContent value="costs">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown Trends</CardTitle>
                <CardDescription>Monthly cost comparison by category</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ChartContainer 
                  config={{
                    fuel: { color: "#60a5fa" },
                    maintenance: { color: "#f97316" },
                    personnel: { color: "#8b5cf6" },
                  }}
                >
                  <LineChart data={costTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="fuel" name="Fuel" stroke="var(--color-fuel)" />
                    <Line type="monotone" dataKey="maintenance" name="Maintenance" stroke="var(--color-maintenance)" />
                    <Line type="monotone" dataKey="personnel" name="Personnel" stroke="var(--color-personnel)" />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Percentage of resource utilization by type</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceUtilizationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {resourceUtilizationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </MainLayout>
  );
};

export default Analytics;
