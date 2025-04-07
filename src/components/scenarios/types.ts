
export interface MetricDataPoint {
  month: string;
  value: number;
}

export interface ScenarioMetrics {
  deliveryTime: MetricDataPoint[];
  fuelConsumption: MetricDataPoint[];
  operationalCosts: MetricDataPoint[];
}

export interface Scenario {
  id: number;
  name: string;
  type: "baseline" | "scenario";
  metrics: ScenarioMetrics;
  description: string;
}

export type MetricKey = keyof ScenarioMetrics;

export interface ChartDataPoint {
  month: string;
  [key: string]: string | number | undefined;
}

export interface MetricIconProps {
  metricKey: MetricKey;
  className?: string;
}

export const metricLabels: Record<MetricKey, string> = {
  deliveryTime: "Average Delivery Time (min)",
  fuelConsumption: "Fuel Consumption (gal)",
  operationalCosts: "Operational Costs ($)",
};
