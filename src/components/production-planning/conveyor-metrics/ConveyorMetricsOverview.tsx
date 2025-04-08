
import { useConveyorMetrics } from "@/hooks/useConveyorMetrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  BarChart,
  Check,
  Clock,
  Gauge,
  RefreshCw,
  Settings,
} from "lucide-react";
import { format } from "date-fns";
import ConveyorMetricsChart from "./ConveyorMetricsChart";
import ConveyorMetricsCard from "./ConveyorMetricsCard";
import BottleneckList from "./BottleneckList";

const ConveyorMetricsOverview = () => {
  const {
    metrics,
    isLoading,
    selectedConveyor,
    setSelectedConveyor,
    selectedConveyorData,
    activeBottlenecks,
    activeAlerts,
    markAlertAsRead,
    resolveBottleneck,
    overallEfficiency,
    totalThroughput,
  } = useConveyorMetrics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ConveyorMetricsCard
          title="Overall Efficiency"
          value={`${overallEfficiency.toFixed(1)}%`}
          icon={<Gauge />}
          trend={
            overallEfficiency > 85
              ? { value: 2.4, isPositive: true }
              : { value: 1.8, isPositive: false }
          }
          color={overallEfficiency > 85 ? "bg-green-50" : "bg-amber-50"}
        />
        <ConveyorMetricsCard
          title="Total Throughput"
          value={`${totalThroughput.toLocaleString()} units/hr`}
          icon={<Activity />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <ConveyorMetricsCard
          title="Active Bottlenecks"
          value={`${activeBottlenecks.length}`}
          icon={<AlertTriangle />}
          color={activeBottlenecks.length > 0 ? "bg-red-50" : "bg-green-50"}
        />
        <ConveyorMetricsCard
          title="Avg Downtime"
          value={`${Math.round(
            metrics.reduce((acc, curr) => acc + curr.downtime, 0) / metrics.length
          )} min`}
          icon={<Clock />}
        />
      </div>

      {/* Alerts Section */}
      {activeAlerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Active Alerts ({activeAlerts.length})
          </h3>
          <div className="space-y-2">
            {activeAlerts.slice(0, 3).map((alert) => (
              <Alert key={alert.id} variant={alert.severity === 'critical' ? 'destructive' : 'default'} className="flex items-center justify-between">
                <AlertDescription className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      alert.severity === 'critical' ? 'destructive' : 
                      alert.severity === 'high' ? 'destructive' : 
                      alert.severity === 'medium' ? 'default' : 
                      'outline'
                    }>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span>{alert.message}</span>
                    <span className="text-xs text-muted-foreground">
                      ({format(new Date(alert.timestamp), 'MMM d, h:mm a')})
                    </span>
                  </div>
                  {alert.metricName && (
                    <div className="text-sm mt-1">
                      <span className="text-muted-foreground">{alert.metricName}:</span>{" "}
                      <span className="font-medium">{alert.actualValue}</span>
                      <span className="text-muted-foreground"> (Threshold: {alert.thresholdValue})</span>
                    </div>
                  )}
                </AlertDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => markAlertAsRead(alert.id)}
                  className="ml-4"
                >
                  <Check className="h-4 w-4 mr-1" /> Acknowledge
                </Button>
              </Alert>
            ))}
            {activeAlerts.length > 3 && (
              <Button variant="link" className="text-sm">
                View {activeAlerts.length - 3} more alerts
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Conveyor Selection & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Conveyor Systems</CardTitle>
            <CardDescription>
              Select a conveyor system to view detailed metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {metrics.map((conveyor) => (
                <Button
                  key={conveyor.id}
                  variant={selectedConveyor === conveyor.id ? "default" : "outline"}
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedConveyor(conveyor.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{conveyor.name}</span>
                    <Badge
                      variant={conveyor.efficiency > 85 ? "outline" : "secondary"}
                      className={`${
                        conveyor.efficiency > 85
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : conveyor.efficiency > 70
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {conveyor.efficiency}%
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {selectedConveyorData ? (
            <>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedConveyorData.name}</CardTitle>
                    <CardDescription>
                      Performance metrics and real-time status
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="performance">
                  <TabsList className="mb-4">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Throughput</div>
                        <div className="text-2xl font-bold">
                          {selectedConveyorData.throughput} /hr
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Utilization</div>
                        <div className="text-2xl font-bold">
                          {selectedConveyorData.utilization}%
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Efficiency</div>
                        <div className="text-2xl font-bold">
                          {selectedConveyorData.efficiency}%
                        </div>
                      </div>
                    </div>

                    <ConveyorMetricsChart data={selectedConveyorData.metricHistory} />

                    <div className="mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Last 24 hours performance shown. Efficiency is calculated as
                        (Actual Output / Expected Output) × 100%.
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bottlenecks">
                    <BottleneckList
                      bottlenecks={selectedConveyorData.bottlenecks}
                      resolveBottleneck={resolveBottleneck}
                    />
                  </TabsContent>

                  <TabsContent value="maintenance" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">MTBF</div>
                        <div className="text-2xl font-bold">{selectedConveyorData.mtbf} hrs</div>
                        <div className="text-xs text-muted-foreground mt-1">Mean Time Between Failures</div>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">MTTR</div>
                        <div className="text-2xl font-bold">{selectedConveyorData.mttr} min</div>
                        <div className="text-xs text-muted-foreground mt-1">Mean Time To Repair</div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Daily Downtime</div>
                      <div className="text-2xl font-bold">{selectedConveyorData.downtime} min</div>
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, (selectedConveyorData.downtime / 240) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>0 min</span>
                          <span>Target: &lt;60 min</span>
                          <span>240 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-medium mb-2">Recommended Actions</h4>
                      {selectedConveyorData.mtbf < 100 || selectedConveyorData.downtime > 60 ? (
                        <ul className="space-y-2 text-sm">
                          {selectedConveyorData.mtbf < 100 && (
                            <li className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              Schedule preventive maintenance to improve MTBF
                            </li>
                          )}
                          {selectedConveyorData.downtime > 60 && (
                            <li className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-500" />
                              Investigate causes of excessive downtime
                            </li>
                          )}
                        </ul>
                      ) : (
                        <div className="text-sm flex items-center gap-2 text-green-600">
                          <Check className="h-4 w-4" />
                          No maintenance actions required
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-[400px]">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select a conveyor system to view detailed metrics</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ConveyorMetricsOverview;
