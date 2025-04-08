
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DayContentProps } from "react-day-picker";
import DayContent from "./DayContent";
import CalendarLegend from "./CalendarLegend";

interface CalendarViewProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  datesWithAvailability: string[];
  getAvailabilityForDate: (date: Date) => { goodsCount: number; transportCount: number };
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
  datesWithAvailability,
  getAvailabilityForDate
}) => {
  return (
    <div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        modifiersStyles={{
          selected: {
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))"
          },
          today: {
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))"
          }
        }}
        modifiers={{
          hasAvailability: (date) => {
            const dateStr = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
            return datesWithAvailability.includes(dateStr);
          }
        }}
        components={{
          DayContent: (props: DayContentProps) => {
            const { goodsCount, transportCount } = getAvailabilityForDate(props.date);
            return (
              <DayContent 
                {...props} 
                goodsCount={goodsCount} 
                transportCount={transportCount} 
              />
            );
          }
        }}
      />
      <CalendarLegend />
    </div>
  );
};

export default CalendarView;
