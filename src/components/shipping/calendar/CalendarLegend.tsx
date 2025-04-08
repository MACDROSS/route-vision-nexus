
import React from "react";

const CalendarLegend: React.FC = () => {
  return (
    <div className="mt-2 flex gap-4 justify-center text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span>Finished Goods</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
        <span>Transportation</span>
      </div>
    </div>
  );
};

export default CalendarLegend;
