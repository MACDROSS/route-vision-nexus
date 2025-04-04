
import { Scenario, MetricKey, ChartDataPoint } from "./types";

// Transform data for charts
export const transformDataForChart = (scenarios: Scenario[], metric: MetricKey): ChartDataPoint[] => {
  // Get all unique months from all scenarios
  const allMonths = new Set<string>();
  scenarios.forEach(scenario => {
    scenario.metrics[metric].forEach(item => allMonths.add(item.month));
  });
  
  // Create data array with all months and all scenario values
  return Array.from(allMonths).map(month => {
    const dataPoint: ChartDataPoint = { month };
    
    scenarios.forEach(scenario => {
      const metricData = scenario.metrics[metric].find(item => item.month === month);
      if (metricData) {
        dataPoint[scenario.name] = metricData.value;
      }
    });
    
    return dataPoint;
  }).sort((a, b) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.indexOf(a.month as string) - months.indexOf(b.month as string);
  });
};

export const getRandomColor = (index: number): string => {
  const colors = ['#0ea5e9', '#14b8a6', '#8b5cf6', '#f97316', '#10b981'];
  return colors[index % colors.length];
};
