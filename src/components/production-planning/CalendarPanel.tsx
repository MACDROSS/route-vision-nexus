
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { ProcessEvent, ProductionProcess } from "@/types/production";
import CalendarDropArea from "./CalendarDropArea";
import ProductionEventList from "./ProductionEventList";

interface CalendarPanelProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedDateEvents: ProcessEvent[];
  removeEvent: (eventId: string) => void;
  addEvent: (event: ProcessEvent) => void;
}

const CalendarPanel = ({ 
  selectedDate, 
  setSelectedDate, 
  selectedDateEvents, 
  removeEvent,
  addEvent
}: CalendarPanelProps) => {

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    try {
      const processData = JSON.parse(e.dataTransfer.getData("application/json")) as ProductionProcess;
      
      const newEvent: ProcessEvent = {
        id: `event-${Date.now()}`,
        processId: processData.id,
        processName: processData.name,
        date: selectedDate,
        color: processData.color,
        quantity: Math.round(processData.capacity * 0.8) // Default to 80% of capacity
      };
      
      addEvent(newEvent);
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  return (
    <Card className="lg:col-span-3 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Production Calendar</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-1" />
            Drag processes and drop on calendar dates
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CalendarDropArea 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDrop={handleDrop}
        />

        <ProductionEventList 
          selectedDate={selectedDate}
          selectedDateEvents={selectedDateEvents}
          removeEvent={removeEvent}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarPanel;
