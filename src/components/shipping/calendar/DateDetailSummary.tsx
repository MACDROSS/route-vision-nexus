
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Package, Truck } from "lucide-react";

interface DateDetailSummaryProps {
  totalGoods: number;
  totalTransport: number;
}

const DateDetailSummary: React.FC<DateDetailSummaryProps> = ({ 
  totalGoods, 
  totalTransport 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div className="border rounded-md p-4">
        <div className="flex items-center gap-2 mb-1">
          <Package className="h-4 w-4 text-green-500" />
          <h4 className="font-medium">Finished Goods</h4>
        </div>
        <p className="text-2xl font-bold">{totalGoods}</p>
        <p className="text-sm text-muted-foreground">Units available</p>
      </div>
      
      <div className="border rounded-md p-4">
        <div className="flex items-center gap-2 mb-1">
          <Truck className="h-4 w-4 text-blue-500" />
          <h4 className="font-medium">Transportation</h4>
        </div>
        <p className="text-2xl font-bold">{totalTransport}</p>
        <p className="text-sm text-muted-foreground">Transport capacity</p>
      </div>
    </div>
  );
};

export default DateDetailSummary;
