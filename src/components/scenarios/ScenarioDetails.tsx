import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { ArrowLeft, FileText, Settings, BarChart, MapPin, Calendar, Edit, Copy, Trash2, Map } from "lucide-react";
import { scenariosData } from "./scenarios-data";
import { MetricKey, metricLabels } from "./types";
import { Badge } from "@/components/ui/badge";
import ScenarioMetricChart from "./ScenarioMetricChart";
import ScenarioMetricTable from "./ScenarioMetricTable";
import ScenarioMapView from "./ScenarioMapView";
import MainLayout from "@/components/layout/MainLayout";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

const ScenarioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenarioId = parseInt(id || "0");
  const scenario = scenariosData.find(s => s.id === scenarioId);
  const [activeMetric, setActiveMetric] = useState<MetricKey>("deliveryTime");
  const [activeView, setActiveView] = useState<"details" | "analysis" | "map" | "configuration">("details");
  
  // States for UI interactions
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompareSheetOpen, setIsCompareSheetOpen] = useState(false);
  const [scenariosToCompare, setScenariosToCompare] = useState<number[]>([]);

  // Handle actions
  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Changes saved successfully");
    setIsEditSheetOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    toast.success("Scenario deleted successfully");
    setIsDeleteDialogOpen(false);
    navigate("/scenarios");
  };

  const handleDuplicate = () => {
    toast.success("Scenario duplicated successfully");
  };

  const handleCompare = () => {
    if (scenario) {
      setScenariosToCompare([scenario.id]);
      setIsCompareSheetOpen(true);
    }
  };

  const handleAddToComparison = (id: number) => {
    setScenariosToCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleViewComparison = () => {
    setIsCompareSheetOpen(false);
    navigate(`/scenarios?compare=${scenariosToCompare.join(',')}`);
  };

  if (!scenario) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Scenario not found</h2>
          <Button 
            onClick={() => navigate("/scenarios")} 
            variant="outline" 
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scenarios
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/scenarios")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{scenario.name}</h1>
        {scenario.type === "baseline" && (
          <Badge variant="secondary" className="ml-1">Baseline</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card 
          className={`hover:shadow-md transition-shadow cursor-pointer ${activeView === "details" ? "border-primary" : ""}`} 
          onClick={() => setActiveView("details")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <FileText className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Details</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                View scenario details and configuration
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`hover:shadow-md transition-shadow cursor-pointer ${activeView === "analysis" ? "border-primary" : ""}`} 
          onClick={() => setActiveView("analysis")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <BarChart className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Analysis</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Review performance metrics and KPIs
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-md transition-shadow cursor-pointer ${activeView === "map" ? "border-primary" : ""}`} 
          onClick={() => setActiveView("map")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Map className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Map View</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Visualize routes and network coverage
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-md transition-shadow cursor-pointer ${activeView === "configuration" ? "border-primary" : ""}`} 
          onClick={() => {
            setActiveView("configuration");
            handleEdit();
          }}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Settings className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Configuration</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Modify scenario parameters and rules
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeView === "details" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{scenario.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p className="font-medium">{scenario.type === "baseline" ? "Baseline" : "Scenario"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>June 15, 2025</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Modified</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>June 18, 2025</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Latest Metrics</h3>
                  <Table className="mt-2">
                    <TableBody>
                      {Object.entries(metricLabels).map(([key, label]) => {
                        const metricData = scenario.metrics[key as MetricKey];
                        const latestValue = metricData[metricData.length - 1].value;
                        
                        return (
                          <TableRow key={key} className="border-b">
                            <TableCell className="py-2 pl-0">{label}</TableCell>
                            <TableCell className="py-2 text-right font-medium">{latestValue.toLocaleString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={handleCompare}>Compare</Button>
                </div>
                
                <div className="pt-2 flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={handleDuplicate}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "analysis" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeMetric} onValueChange={(value) => setActiveMetric(value as MetricKey)}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="deliveryTime">Delivery Time</TabsTrigger>
                  <TabsTrigger value="fuelConsumption">Fuel Consumption</TabsTrigger>
                  <TabsTrigger value="operationalCosts">Operational Costs</TabsTrigger>
                </TabsList>
                
                <div className="h-64 mb-6">
                  <ScenarioMetricChart 
                    scenarios={[scenario]}
                    metricKey={activeMetric}
                  />
                </div>
                
                <ScenarioMetricTable 
                  scenario={scenario}
                  metricKey={activeMetric}
                />
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p className="font-medium">{scenario.type === "baseline" ? "Baseline" : "Scenario"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>June 15, 2025</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Modified</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>June 18, 2025</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Latest Metrics</h3>
                  <Table className="mt-2">
                    <TableBody>
                      {Object.entries(metricLabels).map(([key, label]) => {
                        const metricData = scenario.metrics[key as MetricKey];
                        const latestValue = metricData[metricData.length - 1].value;
                        
                        return (
                          <TableRow key={key} className="border-b">
                            <TableCell className="py-2 pl-0">{label}</TableCell>
                            <TableCell className="py-2 text-right font-medium">{latestValue.toLocaleString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="pt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={handleCompare}>Compare</Button>
                </div>
                
                <div className="pt-2 flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="text-blue-600" onClick={handleDuplicate}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeView === "map" && <ScenarioMapView scenario={scenario} />}

      {/* Edit Scenario Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Scenario</SheetTitle>
            <SheetDescription>
              Make changes to your scenario. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  id="name"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.name}
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.description}
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="type" className="text-sm font-medium">Type</label>
                <select
                  id="type"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.type}
                >
                  <option value="baseline">Baseline</option>
                  <option value="scenario">Scenario</option>
                </select>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your scenario
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Compare Scenarios Sheet */}
      <Sheet open={isCompareSheetOpen} onOpenChange={setIsCompareSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Compare Scenarios</SheetTitle>
            <SheetDescription>
              Select scenarios to compare with {scenario.name}
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              {scenariosData
                .filter(s => s.id !== scenario.id)
                .map(s => (
                  <div key={s.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`scenario-${s.id}`}
                      checked={scenariosToCompare.includes(s.id)}
                      onChange={() => handleAddToComparison(s.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`scenario-${s.id}`} className="text-sm font-medium">
                      {s.name}
                      {s.type === "baseline" && (
                        <Badge variant="secondary" className="ml-2">Baseline</Badge>
                      )}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsCompareSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleViewComparison} disabled={scenariosToCompare.length <= 1}>
              View Comparison
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

    </MainLayout>
  );
};

export default ScenarioDetails;
