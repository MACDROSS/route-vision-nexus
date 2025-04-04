
import MainLayout from "@/components/layout/MainLayout";
import ScenarioComparison from "@/components/scenarios/ScenarioComparison";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CalendarDays, Copy, FileText, MapPin, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for scenarios
const scenarios = [
  {
    id: 1,
    name: "Current Operations",
    description: "Baseline scenario with current fleet and routing",
    type: "baseline",
    createdAt: "2023-03-15",
    creator: "System",
    routes: 12,
    vehicles: 32,
  },
  {
    id: 2,
    name: "Increased Fleet",
    description: "Scenario with 20% more vehicles in operation",
    type: "scenario",
    createdAt: "2023-03-18",
    creator: "John Doe",
    routes: 14,
    vehicles: 38,
  },
  {
    id: 3,
    name: "Route Optimization",
    description: "Optimized routing with existing fleet",
    type: "scenario",
    createdAt: "2023-03-20",
    creator: "Jane Smith",
    routes: 10,
    vehicles: 30,
  },
  {
    id: 4,
    name: "Holiday Rush",
    description: "Scenario for anticipated holiday volume",
    type: "scenario",
    createdAt: "2023-03-25",
    creator: "John Doe",
    routes: 18,
    vehicles: 45,
  },
];

const Scenarios = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Scenario Planning</h1>
        <p className="text-muted-foreground">
          Create, modify and compare different network configurations
        </p>
      </div>

      <Tabs defaultValue="list" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">Scenarios</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Scenario
          </Button>
        </div>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {scenario.name}
                        {scenario.type === "baseline" && (
                          <Badge variant="secondary" className="ml-1">Baseline</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MapPin className="h-4 w-4 mr-2" />
                          View on Map
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Routes</p>
                        <p className="font-semibold">{scenario.routes}</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Vehicles</p>
                        <p className="font-semibold">{scenario.vehicles}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        Created {scenario.createdAt}
                      </div>
                      <div>By {scenario.creator}</div>
                    </div>
                    
                    <div className="flex justify-between gap-2 pt-2">
                      {scenario.type !== "baseline" && (
                        <Button variant="outline" size="sm" className="flex-1">Compare</Button>
                      )}
                      <Button size="sm" className="flex-1">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="h-[calc(100vh-12rem)]">
            <ScenarioComparison />
          </div>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardContent className="p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">Create New Scenario</h2>
                  <p className="text-muted-foreground">Design a new network configuration for analysis</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label className="mb-1 block">Scenario Name</Label>
                      <Input type="text" placeholder="Enter a descriptive name" />
                    </div>
                    
                    <div>
                      <Label className="mb-1 block">Description</Label>
                      <Textarea placeholder="Describe the purpose of this scenario" />
                    </div>
                    
                    <div>
                      <Label className="mb-1 block">Base From</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a starting point" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baseline">Current Operations (Baseline)</SelectItem>
                          <SelectItem value="fleet">Increased Fleet</SelectItem>
                          <SelectItem value="routing">Route Optimization</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">Select an existing scenario to use as a starting point</p>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center p-3 border rounded-md bg-amber-50 border-amber-200">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                        <p className="text-sm text-amber-700">
                          Changes to scenarios don't affect real-world operations until approved and deployed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Scenario</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Scenarios;

// Import necessary components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
