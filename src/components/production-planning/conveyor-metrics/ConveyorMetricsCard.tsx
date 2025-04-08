
import { ReactNode } from "react";

interface ConveyorMetricsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const ConveyorMetricsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  color = "bg-blue-50" 
}: ConveyorMetricsCardProps) => {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-8 w-8 rounded-md bg-white/80 flex items-center justify-center text-primary border">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-2">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`text-sm mb-1 flex items-center ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ConveyorMetricsCard;
