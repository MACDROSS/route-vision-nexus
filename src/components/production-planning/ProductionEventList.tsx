
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { ProcessEvent } from "@/types/production";
import ProductionEventItem from "./ProductionEventItem";

interface ProductionEventListProps {
  selectedDate: Date | undefined;
  selectedDateEvents: ProcessEvent[];
  removeEvent: (eventId: string) => void;
}

const ProductionEventList = ({ 
  selectedDate, 
  selectedDateEvents, 
  removeEvent 
}: ProductionEventListProps) => {
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
  );
};

export default ProductionEventList;
