
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SixSigmaMetrics, ProductionProcess } from "@/types/production";
import { Progress } from "@/components/ui/progress";
import { Gauge } from 'lucide-react';

interface SixSigmaReportProps {
  metrics: SixSigmaMetrics[];
  processes: ProductionProcess[];
}

const SixSigmaReport: React.FC<SixSigmaReportProps> = ({ metrics, processes }) => {
  // Helper function to get process name from ID
  const getProcessName = (id: string) => {
    const process = processes.find(p => p.id === id);
    return process ? process.name : "Unknown Process";
  };

  // Calculate overall metrics
  const averageOEE = metrics.reduce((sum, metric) => 
    sum + (metric.overallEquipmentEffectiveness || 0), 0) / (metrics.length || 1);

  const averageYield = metrics.reduce((sum, metric) => 
    sum + (metric.firstPassYield || 0), 0) / (metrics.length || 1);

  const totalCycleTime = metrics.reduce((sum, metric) => 
    sum + (metric.cycleTime || 0), 0);

  // Helper function to render status colors based on values
  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case 'oee':
        return value > 85 ? "text-green-600" : value > 60 ? "text-amber-600" : "text-red-600";
      case 'yield':
        return value > 99 ? "text-green-600" : value > 95 ? "text-amber-600" : "text-red-600";
      case 'dpmo':
        return value < 3400 ? "text-green-600" : value < 10000 ? "text-amber-600" : "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          <CardTitle className="text-lg">Six Sigma Metrics</CardTitle>
        </div>
        <CardDescription>Lean manufacturing and quality metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Average OEE</div>
            <div className="text-2xl font-bold mb-2">{averageOEE.toFixed(1)}%</div>
            <Progress value={averageOEE} className="h-2" />
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">First Pass Yield</div>
            <div className="text-2xl font-bold mb-2">{averageYield.toFixed(1)}%</div>
            <Progress value={averageYield} className="h-2" />
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Total Cycle Time</div>
            <div className="text-2xl font-bold">{totalCycleTime} min</div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Process</TableHead>
              <TableHead>DPMO</TableHead>
              <TableHead>Cycle Time</TableHead>
              <TableHead>Capability (Cp)</TableHead>
              <TableHead>OEE</TableHead>
              <TableHead>Value Added Ratio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.processId}>
                <TableCell className="font-medium">{getProcessName(metric.processId)}</TableCell>
                <TableCell className={getStatusColor(metric.defectsPerMillionOpportunities || 0, 'dpmo')}>
                  {metric.defectsPerMillionOpportunities?.toLocaleString() || 'N/A'}
                </TableCell>
                <TableCell>{metric.cycleTime} min</TableCell>
                <TableCell>{metric.processCapability?.toFixed(2) || 'N/A'}</TableCell>
                <TableCell className={getStatusColor(metric.overallEquipmentEffectiveness || 0, 'oee')}>
                  {metric.overallEquipmentEffectiveness?.toFixed(1)}%
                </TableCell>
                <TableCell>{metric.valueAddedRatio?.toFixed(2) || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SixSigmaReport;
