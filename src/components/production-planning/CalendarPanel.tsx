
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Info } from "lucide-react";
import { ProcessEvent, ProductionProcess } from "@/types/production";
import ProductionEventItem from "./ProductionEventItem";

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
        <div 
          className="flex-1"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
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

        {/* Events for selected day */}
        <ScrollArea className="h-[200px] mt-4 border rounded-md p-2">
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {selectedDate ? selectedDate.toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : "No date selected"}
              </h3>
              
              <Badge variant="outline">
                {selectedDateEvents.length} Events
              </Badge>
            </div>

            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map(event => (
                <ProductionEventItem
                  key={event.id}
                  event={event}
                  onRemove={() => removeEvent(event.id)}
                />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>No production events scheduled</p>
                <p className="text-sm">Drag a process from the left panel and drop here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CalendarPanel;
