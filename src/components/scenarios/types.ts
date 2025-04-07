
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
  routes?: ScenarioRoute[];
  vehicles?: ScenarioVehicle[];
  deliveryPoints?: ScenarioDeliveryPoint[];
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

// Map view related types
export interface ScenarioRoute {
  id: number;
  name: string;
  coordinates: [number, number][];
  color: string;
  active?: boolean;
}

export interface ScenarioVehicle {
  id: number;
  name: string;
  position: [number, number];
  status: "delivering" | "returning" | "idle";
  packages: number;
}

export interface ScenarioDeliveryPoint {
  id: number;
  name: string;
  position: [number, number];
  type: "pickup" | "delivery";
}
