
import { Clock, TrendingUp, BadgeDollarSign } from "lucide-react";
import { MetricIconProps, MetricKey } from "./types";

export const MetricIcon = ({ metricKey, className = "h-4 w-4" }: MetricIconProps) => {
  switch (metricKey) {
    case "deliveryTime":
      return <Clock className={className} />;
    case "fuelConsumption":
      return <TrendingUp className={className} />;
    case "operationalCosts":
      return <BadgeDollarSign className={className} />;
  }
};

export const getMetricIcon = (metricKey: MetricKey) => {
  return <MetricIcon metricKey={metricKey} />;
};

export const metricIcons: Record<MetricKey, JSX.Element> = {
  deliveryTime: <Clock className="h-4 w-4" />,
  fuelConsumption: <TrendingUp className="h-4 w-4" />,
  operationalCosts: <BadgeDollarSign className="h-4 w-4" />,
};
