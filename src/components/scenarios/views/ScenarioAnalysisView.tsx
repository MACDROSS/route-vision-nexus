
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Copy, Trash2 } from "lucide-react";
import { Scenario, MetricKey, metricLabels } from "../types";
import ScenarioMetricChart from "../ScenarioMetricChart";
import ScenarioMetricTable from "../ScenarioMetricTable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ScenarioAnalysisViewProps {
  scenario: Scenario;
  activeMetric: MetricKey;
  setActiveMetric: (metric: MetricKey) => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onCompare: () => void;
}

const ScenarioAnalysisView = ({
  scenario,
  activeMetric,
  setActiveMetric,
  onEdit,
  onDelete,
  onDuplicate,
  onCompare
}: ScenarioAnalysisViewProps) => {
  return (
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
              <Button variant="outline" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button onClick={onCompare}>Compare</Button>
            </div>
            
            <div className="pt-2 flex justify-between gap-2">
              <Button variant="outline" size="sm" className="text-blue-600" onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioAnalysisView;
