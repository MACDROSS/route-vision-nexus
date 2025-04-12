
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { CalendarIcon, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { SelectViewDropdown } from "@/components/facilities/SelectViewDropdown";
import ScenarioSelector from "./ScenarioSelector";
import { useLongTermPlanningStore } from "@/hooks/long-term-planning/useLongTermPlanningStore";
import { Badge } from "@/components/ui/badge";

const ImpactAnalysis = () => {
  const [timeframe, setTimeframe] = useState<string>("monthly");
  const [view, setView] = useState<string>("capacity");
  const { calculateAnnualImpact, activeScenario, scenarios } = useLongTermPlanningStore();
  
  const impacts = calculateAnnualImpact(activeScenario || scenarios[0]?.id);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Annual Impact Analysis
          </h3>
          <p className="text-muted-foreground text-sm">
            Projected impacts based on current adjustments
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <ScenarioSelector />
          <SelectViewDropdown value={timeframe} onChange={setTimeframe} />
        </div>
      </div>

      <Tabs defaultValue="capacity" value={view} onValueChange={setView}>
        <TabsList>
          <TabsTrigger value="capacity">Capacity</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="capacity">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Capacity Impact</CardTitle>
                <Badge variant="outline" className="ml-2">
                  Net Change: {impacts.capacityNetChange}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  id="capacity-impact-chart"
                  config={{
                    baseline: {
                      theme: {
                        light: "#9ca3af",
                        dark: "#6b7280"
                      }
                    },
                    adjusted: {
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa"
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impacts.capacityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="baseline"
                        stroke="#9ca3af"
                        name="Baseline"
                      />
                      <Line
                        type="monotone"
                        dataKey="adjusted"
                        stroke="#3b82f6"
                        name="Adjusted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Efficiency Impact</CardTitle>
                <Badge variant="outline" className="ml-2">
                  Net Change: {impacts.efficiencyNetChange}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  id="efficiency-impact-chart"
                  config={{
                    baseline: {
                      theme: {
                        light: "#9ca3af",
                        dark: "#6b7280"
                      }
                    },
                    adjusted: {
                      theme: {
                        light: "#10b981",
                        dark: "#34d399"
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impacts.efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="baseline"
                        stroke="#9ca3af"
                        name="Baseline"
                      />
                      <Line
                        type="monotone"
                        dataKey="adjusted"
                        stroke="#10b981"
                        name="Adjusted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cost">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cost Impact</CardTitle>
                <Badge variant="outline" className={impacts.costNetChange > 0 ? "bg-red-100" : "bg-green-100"} className="ml-2">
                  Net Change: ${Math.abs(impacts.costNetChange).toLocaleString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  id="cost-impact-chart"
                  config={{
                    baseline: {
                      theme: {
                        light: "#9ca3af",
                        dark: "#6b7280"
                      }
                    },
                    adjusted: {
                      theme: {
                        light: "#ef4444",
                        dark: "#f87171"
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impacts.costData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="baseline"
                        stroke="#9ca3af"
                        fill="#9ca3af"
                        name="Baseline"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="adjusted"
                        stroke="#ef4444"
                        fill="#ef4444"
                        name="Adjusted"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Revenue Impact</CardTitle>
                <Badge variant="outline" className={impacts.revenueNetChange >= 0 ? "bg-green-100" : "bg-red-100"} className="ml-2">
                  Net Change: ${impacts.revenueNetChange.toLocaleString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  id="revenue-impact-chart"
                  config={{
                    baseline: {
                      theme: {
                        light: "#9ca3af",
                        dark: "#6b7280"
                      }
                    },
                    adjusted: {
                      theme: {
                        light: "#8b5cf6",
                        dark: "#a78bfa"
                      }
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impacts.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="baseline"
                        stroke="#9ca3af"
                        fill="#9ca3af"
                        name="Baseline"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="adjusted"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        name="Adjusted"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Summary of Annual Impacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium text-muted-foreground">Capacity</div>
              <div className="text-2xl font-bold">
                {impacts.capacityNetChange > 0 ? "+" : ""}{impacts.capacityNetChange}%
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium text-muted-foreground">Efficiency</div>
              <div className="text-2xl font-bold">
                {impacts.efficiencyNetChange > 0 ? "+" : ""}{impacts.efficiencyNetChange}%
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium text-muted-foreground">Cost</div>
              <div className="text-2xl font-bold">
                ${impacts.costNetChange.toLocaleString()}
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium text-muted-foreground">Revenue</div>
              <div className="text-2xl font-bold">
                ${impacts.revenueNetChange.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactAnalysis;
