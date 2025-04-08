
import React from "react";
import { Arrival, Departure } from "@/types/facilities";

interface ScheduleSummaryStatsProps {
  data: Array<Arrival | Departure>;
  type: "arrivals" | "departures";
  viewMode: "daily" | "weekly";
}

const ScheduleSummaryStats: React.FC<ScheduleSummaryStatsProps> = ({ data, type, viewMode }) => {
  const total = data.length;
  
  // Count items by status
  const statusCounts = data.reduce((acc, item) => {
    const status = item.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Count total items
  const totalItems = data.reduce((sum, item) => sum + item.itemCount, 0);
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
      <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
        <div className="text-sm text-blue-600 font-medium">Total {type === "arrivals" ? "Arrivals" : "Departures"}</div>
        <div className="text-2xl font-bold mt-1">{total}</div>
        <div className="text-xs text-muted-foreground">{viewMode === "daily" ? "Today" : "This week"}</div>
      </div>
      
      <div className="bg-green-50 rounded-md p-3 border border-green-100">
        <div className="text-sm text-green-600 font-medium">Total Items</div>
        <div className="text-2xl font-bold mt-1">{totalItems.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">{viewMode === "daily" ? "Today" : "This week"}</div>
      </div>
      
      <div className="bg-amber-50 rounded-md p-3 border border-amber-100">
        <div className="text-sm text-amber-600 font-medium">
          {type === "arrivals" ? "In Transit" : "In Progress"}
        </div>
        <div className="text-2xl font-bold mt-1">
          {type === "arrivals" 
            ? statusCounts["in-transit"] || 0 
            : statusCounts["in-progress"] || 0}
        </div>
        <div className="text-xs text-muted-foreground">{viewMode === "daily" ? "Today" : "This week"}</div>
      </div>
      
      <div className="bg-red-50 rounded-md p-3 border border-red-100">
        <div className="text-sm text-red-600 font-medium">Delayed</div>
        <div className="text-2xl font-bold mt-1">{statusCounts["delayed"] || 0}</div>
        <div className="text-xs text-muted-foreground">{viewMode === "daily" ? "Today" : "This week"}</div>
      </div>
    </div>
  );
};

export default ScheduleSummaryStats;
