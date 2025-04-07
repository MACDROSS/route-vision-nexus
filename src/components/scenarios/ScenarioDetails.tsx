
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Settings, BarChart, MapPin, Calendar } from "lucide-react";
import { scenariosData } from "./scenarios-data";
import { MetricKey, metricLabels } from "./types";
import { Badge } from "@/components/ui/badge";
import ScenarioMetricChart from "./ScenarioMetricChart";
import ScenarioMetricTable from "./ScenarioMetricTable";
import MainLayout from "@/components/layout/MainLayout";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

const ScenarioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenarioId = parseInt(id || "0");
  const scenario = scenariosData.find(s => s.id === scenarioId);
  const [activeMetric, setActiveMetric] = useState<MetricKey>("deliveryTime");
  
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
        <Card>
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
        
        <Card>
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

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-2 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Map View</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Visualize routes and network coverage
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
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
                <Button variant="outline">Edit</Button>
                <Button>Compare</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ScenarioDetails;
