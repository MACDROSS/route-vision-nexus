
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { ProcessEvent, ProductionProcess } from "@/types/production";
import CalendarDropArea from "./CalendarDropArea";
import ProductionEventList from "./ProductionEventList";

interface CalendarPanelProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedDateEvents: ProcessEvent[];
  allEvents: ProcessEvent[]; // All events for the calendar
  removeEvent: (eventId: string) => void;
  addEvent: (event: ProcessEvent) => void;
}

const CalendarPanel = ({ 
  selectedDate, 
  setSelectedDate, 
  selectedDateEvents,
  allEvents,
  removeEvent,
  addEvent
}: CalendarPanelProps) => {

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    
    try {
      const processData = JSON.parse(e.dataTransfer.getData("application/json")) as ProductionProcess;
      
      // Create a new event for this process
      const newEvent: ProcessEvent = {
        id: `event-${Date.now()}`,
        processId: processData.id,
        processName: processData.name,
        date: selectedDate,
        color: processData.color,
        quantity: Math.round(processData.capacity * 0.8), // Default to 80% of capacity
        stepNumber: processData.stepNumber
      };
      
      // If this process depends on another process, find the most recent event for that process
      if (processData.dependsOn) {
        const dependentProcessEvents = allEvents.filter(e => e.processId === processData.dependsOn);
        
        // Find the most recent event for the process this depends on
        if (dependentProcessEvents.length > 0) {
          // Sort events by date (newest first)
          const sortedEvents = [...dependentProcessEvents].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          
          // Set this event to depend on the most recent event of the dependent process
          newEvent.dependsOn = sortedEvents[0].id;
        }
      }
      
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
          allEvents={allEvents}
        />

        <ProductionEventList 
          selectedDate={selectedDate}
          selectedDateEvents={selectedDateEvents}
          allEvents={allEvents}
          removeEvent={removeEvent}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarPanel;
