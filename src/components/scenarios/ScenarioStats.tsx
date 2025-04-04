
import { Scenario, MetricKey } from "./types";

interface ScenarioStatsProps {
  scenarios: Scenario[];
  activeMetric: MetricKey;
}

const ScenarioStats = ({ scenarios, activeMetric }: ScenarioStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {scenarios.map((scenario, index) => {
        const baselineScenario = scenarios.find(s => s.type === "baseline");
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
              {isPositive ? "↓" : "↑"} {Math.abs(parseFloat(percentage))}%
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
  );
};

export default ScenarioStats;
