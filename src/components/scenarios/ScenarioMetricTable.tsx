
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Scenario, MetricKey, metricLabels } from "./types";

interface ScenarioMetricTableProps {
  scenario: Scenario;
  metricKey: MetricKey;
}

const ScenarioMetricTable = ({ scenario, metricKey }: ScenarioMetricTableProps) => {
  const metricData = scenario.metrics[metricKey];
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">{metricLabels[metricKey]}</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metricData.map((dataPoint, index) => {
            const prevValue = index > 0 ? metricData[index - 1].value : dataPoint.value;
            const change = dataPoint.value - prevValue;
            const percentChange = prevValue !== 0 ? (change / prevValue) * 100 : 0;
            const isPositive = metricKey === "deliveryTime" || metricKey === "fuelConsumption" || metricKey === "operationalCosts" 
              ? change < 0 
              : change > 0;
            
            return (
              <TableRow key={dataPoint.month}>
                <TableCell>{dataPoint.month}</TableCell>
                <TableCell className="text-right">{dataPoint.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {index > 0 && (
                    <span className={`${isPositive ? "text-green-600" : "text-red-600"}`}>
                      {isPositive ? "↓" : "↑"} {Math.abs(percentChange).toFixed(1)}%
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScenarioMetricTable;
