
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricKey } from "./types";
import { scenariosData } from "./scenarios-data";
import { metricLabels } from "./types";
import ScenarioSelector from "./ScenarioSelector";
import ScenarioMetricChart from "./ScenarioMetricChart";
import ScenarioStats from "./ScenarioStats";
import { MetricIcon } from "./MetricIcon";

const ScenarioComparison = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<number[]>([1, 3]);
  const [activeMetric, setActiveMetric] = useState<MetricKey>("deliveryTime");
  
  const scenariosToCompare = scenariosData.filter(s => selectedScenarios.includes(s.id));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Scenario Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <ScenarioSelector 
            scenarios={scenariosData}
            selectedScenarios={selectedScenarios}
            onChange={setSelectedScenarios}
          />
        </div>
        
        <Tabs value={activeMetric} onValueChange={(value) => setActiveMetric(value as MetricKey)}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="deliveryTime" className="flex items-center gap-1">
              <MetricIcon metricKey="deliveryTime" />
              <span>Time</span>
            </TabsTrigger>
            <TabsTrigger value="fuelConsumption" className="flex items-center gap-1">
              <MetricIcon metricKey="fuelConsumption" />
              <span>Fuel</span>
            </TabsTrigger>
            <TabsTrigger value="operationalCosts" className="flex items-center gap-1">
              <MetricIcon metricKey="operationalCosts" />
              <span>Cost</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(metricLabels).map(metric => (
            <TabsContent key={metric} value={metric} className="h-64">
              <ScenarioMetricChart 
                scenarios={scenariosToCompare}
                metricKey={metric as MetricKey}
              />
            </TabsContent>
          ))}
        </Tabs>
        
        <ScenarioStats 
          scenarios={scenariosToCompare}
          activeMetric={activeMetric}
        />
      </CardContent>
    </Card>
  );
};

export default ScenarioComparison;
