
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Filter, MapPin, Plus, Settings2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RouteMap from "@/components/maps/RouteMap";
import { Route, Vehicle, RoutePoint } from "@/components/maps/types";

// Mock data for map visualization
const mockRoutes = [
  {
    id: 1,
    name: "Downtown Express",
    coordinates: [
      [40.7128, -74.0060],
      [40.7300, -73.9950],
      [40.7400, -73.9850],
      [40.7500, -73.9750]
    ] as [number, number][],
    color: "#0ea5e9",
    active: true
  },
  {
    id: 2,
    name: "North City Route",
    coordinates: [
      [40.7128, -74.0060],
      [40.7000, -74.0100],
      [40.6900, -74.0200],
      [40.6800, -74.0300]
    ] as [number, number][],
    color: "#10b981"
  },
  {
    id: 3,
    name: "Airport Delivery",
    coordinates: [
      [40.7128, -74.0060],
      [40.7150, -73.9800],
      [40.7200, -73.9600],
      [40.7250, -73.9400]
    ] as [number, number][],
    color: "#8b5cf6"
  }
] as Route[];

const mockVehicles = [
  {
    id: 1,
    name: "Truck 101",
    position: [40.7300, -73.9950] as [number, number],
    status: "delivering" as const,
    packages: 12
  },
  {
    id: 2,
    name: "Van 023",
    position: [40.6900, -74.0200] as [number, number],
    status: "delivering" as const,
    packages: 8
  },
  {
    id: 3,
    name: "Bike 015",
    position: [40.7200, -73.9600] as [number, number],
    status: "returning" as const,
    packages: 3
  }
] as Vehicle[];

const mockDeliveryPoints = [
  {
    id: 1,
    name: "Downtown Office",
    position: [40.7500, -73.9750] as [number, number],
    type: "delivery" as const
  },
  {
    id: 2,
    name: "Central Warehouse",
    position: [40.7128, -74.0060] as [number, number],
    type: "pickup" as const
  },
  {
    id: 3,
    name: "Airport Hub",
    position: [40.7250, -73.9400] as [number, number],
    type: "delivery" as const
  }
] as RoutePoint[];

const RouteOptimization = () => {
  const [mapReady, setMapReady] = useState(false);
  
  // Simulate map loading
  setTimeout(() => setMapReady(true), 1000);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Route Optimization</h1>
        <p className="text-muted-foreground">
          Optimize delivery routes for efficiency and cost savings
        </p>
      </div>
      
      <Tabs defaultValue="map">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Route
            </Button>
          </div>
        </div>
        
        <TabsContent value="map">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-[70vh]">
                    <RouteMap
                      routes={mockRoutes}
                      vehicles={mockVehicles}
                      points={mockDeliveryPoints}
                      height="70vh"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings2 className="h-4 w-4 mr-2" />
                        Optimize All Routes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Add Delivery Point
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Active Vehicles</h3>
                    <div className="space-y-2">
                      {["Truck 101", "Van 023", "Bike 015"].map((vehicle, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <p className="font-medium">{vehicle}</p>
                            <p className="text-xs text-muted-foreground">On Route • 12 packages</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Track</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Reassign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Routes Overview</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Downtown Express", stops: 12, distance: "18.4 mi", time: "45 min", status: "Active" },
                    { name: "North City Route", stops: 15, distance: "22.6 mi", time: "56 min", status: "Active" },
                    { name: "Airport Delivery", stops: 8, distance: "15.2 mi", time: "38 min", status: "Active" },
                    { name: "South Industrial", stops: 10, distance: "19.8 mi", time: "52 min", status: "Paused" },
                  ].map((route, i) => (
                    <div key={i} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{route.name}</h4>
                            <div className={`text-xs px-2 py-0.5 rounded-full ${
                              route.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {route.status}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {route.stops} stops • {route.distance} • {route.time}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">View</Button>
                          <Button size="sm" variant="outline">Optimize</Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        <div className="text-center p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground">Assigned</p>
                          <p className="font-medium">Truck 101</p>
                        </div>
                        <div className="text-center p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground">Packages</p>
                          <p className="font-medium">24</p>
                        </div>
                        <div className="text-center p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="font-medium">45%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Optimization Parameters</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Time Priority</Label>
                        <Slider defaultValue={[70]} max={100} step={5} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Fuel Efficiency</Label>
                        <Slider defaultValue={[60]} max={100} step={5} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cost Optimization</Label>
                        <Slider defaultValue={[40]} max={100} step={5} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Load Balancing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-2 block">Max Packages Per Vehicle</Label>
                        <Input type="number" placeholder="50" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Max Stops Per Route</Label>
                        <Input type="number" placeholder="20" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Time Windows</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-2 block">Service Start</Label>
                          <Input type="time" defaultValue="08:00" />
                        </div>
                        <div>
                          <Label className="mb-2 block">Service End</Label>
                          <Input type="time" defaultValue="18:00" />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Priority Customers</Label>
                        <Input placeholder="Enter customer IDs" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Constraints</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">Maximum Route Duration (hours)</Label>
                        <Input type="number" placeholder="8" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Maximum Distance (miles)</Label>
                        <Input type="number" placeholder="120" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Reset to Default</Button>
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default RouteOptimization;
