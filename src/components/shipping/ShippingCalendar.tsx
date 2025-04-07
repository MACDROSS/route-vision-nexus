
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Package, Truck } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useProductionCalendar } from "@/hooks/useProductionCalendar";
import { useShippingStore } from "@/hooks/useShippingStore";
import { DayContentProps } from "react-day-picker";

interface ShippingCalendarProps {
  className?: string;
  fullView?: boolean;
}

const ShippingCalendar = ({ className, fullView = false }: ShippingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { allEvents } = useProductionCalendar();
  const { transportOptions } = useShippingStore();

  // Filter for last step in each process to get finished goods
  const getFinishedGoodsEvents = () => {
    // Group events by processId to find the ones that represent the final step
    const processGroups: Record<string, any[]> = {};
    
    allEvents.forEach(event => {
      const baseProcessId = event.processId.split('-')[0];
      if (!processGroups[baseProcessId]) {
        processGroups[baseProcessId] = [];
      }
      processGroups[baseProcessId].push(event);
    });

    // Find events that are the last step in each process
    const finishedGoodsEvents = [];
    for (const events of Object.values(processGroups)) {
      // Sort by step number descending
      const sortedEvents = [...events].sort((a, b) => 
        (b.stepNumber || 0) - (a.stepNumber || 0)
      );
      
      // The first event after sorting is the last step
      if (sortedEvents.length > 0) {
        finishedGoodsEvents.push(sortedEvents[0]);
      }
    }

    return finishedGoodsEvents;
  };

  const finishedGoodsEvents = getFinishedGoodsEvents();

  // Get all dates that have either finished goods or transportation
  const getDatesWithAvailability = () => {
    const dates = new Set<string>();
    
    // Add dates with finished goods
    finishedGoodsEvents.forEach(event => {
      const date = new Date(event.date);
      dates.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString());
    });
    
    // Add dates with transportation
    transportOptions.forEach(option => {
      const date = new Date(option.availableDate);
      dates.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString());
    });
    
    return Array.from(dates);
  };

  const datesWithAvailability = getDatesWithAvailability();

  // Count goods and transportation for a specific date
  const getAvailabilityForDate = (date: Date) => {
    // Count finished goods
    const goodsCount = finishedGoodsEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    }).reduce((sum, event) => sum + event.quantity, 0);
    
    // Count transportation capacity
    const transportCount = transportOptions.filter(option => {
      const optionDate = new Date(option.availableDate);
      return optionDate.getDate() === date.getDate() && 
             optionDate.getMonth() === date.getMonth() &&
             optionDate.getFullYear() === date.getFullYear();
    }).reduce((sum, option) => sum + option.capacity, 0);
    
    return { goodsCount, transportCount };
  };

  // Filter events and transportation for the selected date
  const selectedDateGoods = finishedGoodsEvents.filter(event => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  const selectedDateTransport = transportOptions.filter(option => {
    if (!selectedDate) return false;
    const optionDate = new Date(option.availableDate);
    return optionDate.getDate() === selectedDate.getDate() && 
           optionDate.getMonth() === selectedDate.getMonth() &&
           optionDate.getFullYear() === selectedDate.getFullYear();
  });

  // Total quantities for the selected date
  const totalGoods = selectedDateGoods.reduce((sum, event) => sum + event.quantity, 0);
  const totalTransport = selectedDateTransport.reduce((sum, option) => sum + option.capacity, 0);

  return (
    <Card className={`${className} ${fullView ? "min-h-[calc(100vh-16rem)]" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="mr-2 h-5 w-5" />
          <span>Shipping Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
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
                const hasContent = goodsCount > 0 || transportCount > 0;
                
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {props.date.getDate()}
                    {hasContent && (
                      <div className="absolute -bottom-1 left-0 right-0 flex justify-center gap-1">
                        {goodsCount > 0 && (
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                        )}
                        {transportCount > 0 && (
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
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
        </div>

        <div className="lg:w-1/2">
          {selectedDate && (
            <>
              <h3 className="font-medium mb-3">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-green-500" />
                    <h4 className="font-medium">Finished Goods</h4>
                  </div>
                  <p className="text-2xl font-bold">{totalGoods}</p>
                  <p className="text-sm text-muted-foreground">Units available</p>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="h-4 w-4 text-blue-500" />
                    <h4 className="font-medium">Transportation</h4>
                  </div>
                  <p className="text-2xl font-bold">{totalTransport}</p>
                  <p className="text-sm text-muted-foreground">Transport capacity</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {selectedDateGoods.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Finished Goods ({selectedDateGoods.length})</h4>
                    {selectedDateGoods.map(event => (
                      <div key={event.id} className="text-sm border rounded-md p-2 mb-2 flex justify-between">
                        <span>{event.processName}</span>
                        <Badge variant="outline">{event.quantity} units</Badge>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedDateTransport.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Transportation ({selectedDateTransport.length})</h4>
                    {selectedDateTransport.map(option => (
                      <div key={option.id} className="text-sm border rounded-md p-2 mb-2 flex justify-between">
                        <span>{option.name}</span>
                        <Badge variant="outline">{option.capacity} capacity</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingCalendar;
