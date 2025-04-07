
import { Calendar } from "@/components/ui/calendar";
import { ProcessEvent } from "@/types/production";
import { Badge } from "@/components/ui/badge";
import { DayContentProps } from "react-day-picker";

interface CalendarDropAreaProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  onDrop: (e: React.DragEvent) => void;
  allEvents: ProcessEvent[]; // Added to display events on calendar
}

const CalendarDropArea = ({ 
  selectedDate, 
  setSelectedDate, 
  onDrop,
  allEvents
}: CalendarDropAreaProps) => {
  // Helper to get dates with events for visual indicators
  const getDatesWithEvents = () => {
    const eventDates = allEvents.map(event => {
      const date = new Date(event.date);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    });
    return [...new Set(eventDates)];
  };

  // Count events per day for displaying badges
  const getEventCountForDate = (date: Date) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    }).length;
  };

  // Dates that have events scheduled
  const datesWithEvents = getDatesWithEvents();
  
  return (
    <div 
      className="flex-1"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
          hasEvents: (date) => {
            const dateStr = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
            return datesWithEvents.includes(dateStr);
          }
        }}
        components={{
          DayContent: (props: DayContentProps) => {
            const eventCount = getEventCountForDate(props.date);
            return (
              <div className="relative w-full h-full flex items-center justify-center">
                {props.date.getDate()}
                {eventCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {eventCount}
                  </Badge>
                )}
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export default CalendarDropArea;
