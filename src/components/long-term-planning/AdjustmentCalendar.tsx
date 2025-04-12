
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Adjustment } from "@/types/long-term-planning";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AdjustmentCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  adjustments: Adjustment[];
}

const AdjustmentCalendar = ({ selectedDate, onSelectDate, adjustments }: AdjustmentCalendarProps) => {
  // Group adjustments by date
  const adjustmentsByDate = adjustments.reduce<{ [date: string]: Adjustment[] }>(
    (acc, adjustment) => {
      const dateKey = format(new Date(adjustment.date), "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(adjustment);
      return acc;
    },
    {}
  );

  const renderDayContent = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const dayAdjustments = adjustmentsByDate[dateKey] || [];
    
    if (dayAdjustments.length === 0) return null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex justify-center">
              <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center">
                {dayAdjustments.length}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {dayAdjustments.map(adjustment => (
              <div key={adjustment.id} className="text-xs">
                {adjustment.changeType}: {adjustment.value}%
              </div>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => (
              <div className="flex flex-col items-center">
                <div>{format(date, "d")}</div>
                {renderDayContent(date)}
              </div>
            ),
          }}
        />
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        {selectedDate ? (
          <>
            Selected: <span className="font-medium">{format(selectedDate, "PPP")}</span>
          </>
        ) : (
          "Select a date to add adjustments"
        )}
      </div>
    </div>
  );
};

export default AdjustmentCalendar;
