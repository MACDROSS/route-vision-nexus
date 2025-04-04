
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, BadgeDollarSign, PlusCircle } from "lucide-react";

// Mock data for scenarios
const scenariosData = [
  {
    id: 1,
    name: "Current Operations",
    type: "baseline",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 45 },
        { month: "Feb", value: 48 },
        { month: "Mar", value: 43 },
        { month: "Apr", value: 40 },
        { month: "May", value: 42 },
        { month: "Jun", value: 47 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 2800 },
        { month: "Feb", value: 2650 },
        { month: "Mar", value: 2700 },
        { month: "Apr", value: 2900 },
        { month: "May", value: 3100 },
        { month: "Jun", value: 3000 },
      ],
      operationalCosts: [
        { month: "Jan", value: 12500 },
        { month: "Feb", value: 12000 },
        { month: "Mar", value: 12300 },
        { month: "Apr", value: 13000 },
        { month: "May", value: 13500 },
        { month: "Jun", value: 13200 },
      ],
    },
  },
  {
    id: 2,
    name: "Increased Fleet",
    type: "scenario",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 42 },
        { month: "Feb", value: 44 },
        { month: "Mar", value: 40 },
        { month: "Apr", value: 38 },
        { month: "May", value: 35 },
        { month: "Jun", value: 34 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 3200 },
        { month: "Feb", value: 3100 },
        { month: "Mar", value: 3150 },
        { month: "Apr", value: 3300 },
        { month: "May", value: 3400 },
        { month: "Jun", value: 3350 },
      ],
      operationalCosts: [
        { month: "Jan", value: 14500 },
        { month: "Feb", value: 14000 },
        { month: "Mar", value: 14300 },
        { month: "Apr", value: 15000 },
        { month: "May", value: 15500 },
        { month: "Jun", value: 15200 },
      ],
    },
  },
  {
    id: 3,
    name: "Route Optimization",
    type: "scenario",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 40 },
        { month: "Feb", value: 38 },
        { month: "Mar", value: 36 },
        { month: "Apr", value: 34 },
        { month: "May", value: 35 },
        { month: "Jun", value: 33 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 2500 },
        { month: "Feb", value: 2400 },
        { month: "Mar", value: 2350 },
        { month: "Apr", value: 2300 },
        { month: "May", value: 2280 },
        { month: "Jun", value: 2250 },
      ],
      operationalCosts: [
        { month: "Jan", value: 11500 },
        { month: "Feb", value: 11000 },
        { month: "Mar", value: 10800 },
        { month: "Apr", value: 10600 },
        { month: "May", value: 10400 },
        { month: "Jun", value: 10200 },
      ],
    },
  },
];

// Transform data for charts
const transformDataForChart = (scenarios, metric) => {
  // Get all unique months from all scenarios
  const allMonths = new Set();
  scenarios.forEach(scenario => {
    scenario.metrics[metric].forEach(item => allMonths.add(item.month));
  });
  
  // Create data array with all months and all scenario values
  return Array.from(allMonths).map(month => {
    const dataPoint = { month };
    
    scenarios.forEach(scenario => {
      const metricData = scenario.metrics[metric].find(item => item.month === month);
      if (metricData) {
        dataPoint[scenario.name] = metricData.value;
      }
    });
    
    return dataPoint;
  }).sort((a, b) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });
};

const ScenarioComparison = () => {
  const [selectedScenarios, setSelectedScenarios] = useState([1, 3]);
  const [activeMetric, setActiveMetric] = useState("deliveryTime");
  
  const scenariosToCompare = scenariosData.filter(s => selectedScenarios.includes(s.id));
  
  const metricLabels = {
    deliveryTime: "Average Delivery Time (min)",
    fuelConsumption: "Fuel Consumption (gal)",
    operationalCosts: "Operational Costs ($)",
  };
  
  const metricIcons = {
    deliveryTime: <Clock className="h-4 w-4" />,
    fuelConsumption: <TrendingUp className="h-4 w-4" />,
    operationalCosts: <BadgeDollarSign className="h-4 w-4" />,
  };
  
  const chartData = transformDataForChart(scenariosToCompare, activeMetric);
  
  const getRandomColor = (index) => {
    const colors = ['#0ea5e9', '#14b8a6', '#8b5cf6', '#f97316', '#10b981'];
    return colors[index % colors.length];
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Scenario Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {scenariosData.map((scenario, index) => (
              <Badge
                key={scenario.id}
                variant={selectedScenarios.includes(scenario.id) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  if (selectedScenarios.includes(scenario.id)) {
                    if (selectedScenarios.length > 1) {
                      setSelectedScenarios(selectedScenarios.filter(id => id !== scenario.id));
                    }
                  } else {
                    setSelectedScenarios([...selectedScenarios, scenario.id]);
                  }
                }}
              >
                {scenario.name}
              </Badge>
            ))}
            <Button size="sm" variant="ghost" className="h-6">
              <PlusCircle className="h-3 w-3 mr-1" />
              New
            </Button>
          </div>
        </div>
        
        <Tabs value={activeMetric} onValueChange={setActiveMetric}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="deliveryTime" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Time</span>
            </TabsTrigger>
            <TabsTrigger value="fuelConsumption" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Fuel</span>
            </TabsTrigger>
            <TabsTrigger value="operationalCosts" className="flex items-center gap-1">
              <BadgeDollarSign className="h-4 w-4" />
              <span>Cost</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(metricLabels).map(metric => (
            <TabsContent key={metric} value={metric} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={transformDataForChart(scenariosToCompare, metric)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {scenariosToCompare.map((scenario, index) => (
                    <Line
                      key={scenario.id}
                      type="monotone"
                      dataKey={scenario.name}
                      stroke={getRandomColor(index)}
                      activeDot={{ r: 8 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          {scenariosToCompare.map((scenario, index) => {
            const baselineScenario = scenariosData.find(s => s.type === "baseline");
            const isBaseline = scenario.type === "baseline";
            const latestMonth = scenario.metrics[activeMetric][scenario.metrics[activeMetric].length - 1];
            let comparisonValue = null;
            
            if (!isBaseline && baselineScenario) {
              const baselineLatest = baselineScenario.metrics[activeMetric][baselineScenario.metrics[activeMetric].length - 1];
              const diff = latestMonth.value - baselineLatest.value;
              const percentage = ((diff / baselineLatest.value) * 100).toFixed(1);
              
              const isPositive = activeMetric === "deliveryTime" || activeMetric === "fuelConsumption" || activeMetric === "operationalCosts" ? diff < 0 : diff > 0;
              
              comparisonValue = (
                <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                  {isPositive ? "↓" : "↑"} {Math.abs(percentage)}%
                </span>
              );
            }
            
            return (
              <div key={scenario.id} className="bg-muted rounded-md p-2">
                <p className="text-xs text-muted-foreground mb-1">{scenario.name}</p>
                <div className="flex items-baseline gap-1">
                  <p className="font-bold">{latestMonth.value.toLocaleString()}</p>
                  {comparisonValue}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioComparison;
