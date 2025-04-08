
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerTrend } from "@/types/shipping";
import { BarChart, LineChart, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface CustomerTrendCardProps {
  trend: CustomerTrend;
}

const METRIC_LABELS = {
  on_time_delivery: "On-Time Delivery",
  shipping_cost: "Shipping Cost",
  volume: "Volume",
  damages: "Damage Rate"
};

const METRIC_ICONS = {
  on_time_delivery: <LineChart className="h-4 w-4" />,
  shipping_cost: <BarChart className="h-4 w-4" />,
  volume: <BarChart className="h-4 w-4" />,
  damages: <LineChart className="h-4 w-4" />
};

const METRIC_FORMATS = {
  on_time_delivery: (value: number) => `${value.toFixed(1)}%`,
  shipping_cost: (value: number) => `$${(value / 1000).toFixed(1)}k`,
  volume: (value: number) => `${(value / 1000).toFixed(1)}k units`,
  damages: (value: number) => `${value.toFixed(1)}%`
};

const CustomerTrendCard = ({ trend }: CustomerTrendCardProps) => {
  const isPositiveChange = trend.changePercent > 0;
  const isDesiredDirection = 
    (trend.metric === 'on_time_delivery' || trend.metric === 'volume') ? isPositiveChange : !isPositiveChange;

  const getStatusColor = () => {
    if (trend.status === 'improving') return "bg-green-100 text-green-800 border-green-300";
    if (trend.status === 'stable') return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-1.5">
          {METRIC_ICONS[trend.metric as keyof typeof METRIC_ICONS]}
          {METRIC_LABELS[trend.metric as keyof typeof METRIC_LABELS]}
          <Badge variant="outline" className={getStatusColor()}>
            {trend.status.charAt(0).toUpperCase() + trend.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mt-2 flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              {METRIC_FORMATS[trend.metric as keyof typeof METRIC_FORMATS](trend.value)}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(trend.timestamp, "MMM d, yyyy")}
            </p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium ${isDesiredDirection ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span>{Math.abs(trend.changePercent).toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerTrendCard;
