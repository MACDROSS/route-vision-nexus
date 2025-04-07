
import { Calendar } from "@/components/ui/calendar";

interface CalendarDropAreaProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  onDrop: (e: React.DragEvent) => void;
}

const CalendarDropArea = ({ selectedDate, setSelectedDate, onDrop }: CalendarDropAreaProps) => {
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
      />
    </div>
  );
};

export default CalendarDropArea;
