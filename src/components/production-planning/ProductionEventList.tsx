
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, GitBranch } from "lucide-react";
import { ProcessEvent } from "@/types/production";
import ProductionEventItem from "./ProductionEventItem";

interface ProductionEventListProps {
  selectedDate: Date | undefined;
  selectedDateEvents: ProcessEvent[];
  allEvents: ProcessEvent[]; // All events for finding dependencies
  removeEvent: (eventId: string) => void;
}

const ProductionEventList = ({ 
  selectedDate, 
  selectedDateEvents,
  allEvents,
  removeEvent 
}: ProductionEventListProps) => {
  // Group events by step sequence (if available)
  const groupedEvents = selectedDateEvents.reduce((groups: Record<string, ProcessEvent[]>, event) => {
    // Create groups for processes that have step numbers
    const groupKey = event.stepNumber ? `group-${event.processId.split('-')[0]}` : event.id;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(event);
    return groups;
  }, {});

  // Find previous step events that this event depends on
  const getPreviousStepEvent = (event: ProcessEvent) => {
    if (!event.dependsOn) return null;
    return allEvents.find(e => e.id === event.dependsOn);
  };

  return (
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
          Object.entries(groupedEvents).map(([groupKey, events]) => (
            <div key={groupKey} className="mb-4">
              {events.length > 1 && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <GitBranch className="mr-1 h-4 w-4" />
                  Multi-step Process
                </div>
              )}
              
              {events.map(event => {
                const previousStep = getPreviousStepEvent(event);
                
                return (
                  <ProductionEventItem
                    key={event.id}
                    event={event}
                    previousStep={previousStep}
                    onRemove={() => removeEvent(event.id)}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>No production events scheduled</p>
            <p className="text-sm">Drag a process from the left panel and drop here</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ProductionEventList;
