
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProcessEvent } from "@/types/production";
import { useProductionCalendar } from "@/hooks/useProductionCalendar";
import { Box, Calendar as CalendarIcon, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { FinishedGood, TransportOption } from "@/types/shipping";
import { useShippingStore } from "@/hooks/useShippingStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FinishedGoodsAvailabilityProps {
  fullView?: boolean;
}

const FinishedGoodsAvailability = ({ fullView = false }: FinishedGoodsAvailabilityProps) => {
  const { allEvents } = useProductionCalendar();
  const { finishedGoods } = useShippingStore();

  // Filter finished goods (last step in processes)
  const getFinishedGoodsFromEvents = () => {
    // Group events by processId to find the ones that represent the final step
    const processGroups: Record<string, ProcessEvent[]> = {};
    
    allEvents.forEach(event => {
      const baseProcessId = event.processId.split('-')[0];
      if (!processGroups[baseProcessId]) {
        processGroups[baseProcessId] = [];
      }
      processGroups[baseProcessId].push(event);
    });

    // Find events that are the last step in each process
    const finishedGoodsEvents: ProcessEvent[] = [];
    Object.values(processGroups).forEach(events => {
      // Sort by step number descending
      const sortedEvents = [...events].sort((a, b) => 
        (b.stepNumber || 0) - (a.stepNumber || 0)
      );
      
      // The first event after sorting is the last step
      if (sortedEvents.length > 0) {
        finishedGoodsEvents.push(sortedEvents[0]);
      }
    });

    return finishedGoodsEvents;
  };

  const finishedGoodsEvents = getFinishedGoodsFromEvents();

  // Calculate availability by date
  const availabilityByDate = finishedGoodsEvents.reduce((acc: Record<string, number>, event) => {
    const dateKey = format(new Date(event.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = 0;
    }
    acc[dateKey] += event.quantity;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.entries(availabilityByDate).map(([date, quantity]) => ({
    date: format(new Date(date), 'MMM dd'),
    quantity
  }));

  return (
    <Card className={fullView ? "min-h-[calc(100vh-16rem)]" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <PackageCheck className="mr-2 h-5 w-5 text-green-500" />
            <span>Finished Goods Availability</span>
          </div>
          <Badge variant="outline">{finishedGoodsEvents.length} Items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 && (
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#4CAF50" name="Units Available" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <ScrollArea className={fullView ? "h-[calc(100vh-28rem)]" : "h-60"}>
          <div className="space-y-4">
            {finishedGoodsEvents.length > 0 ? (
              finishedGoodsEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="border rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h3 className="font-medium">{event.processName}</h3>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Available: {format(new Date(event.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Box className="h-3 w-3" /> 
                        <span>{event.quantity} units</span>
                      </div>
                    </div>
                  </div>
                  <Badge style={{ backgroundColor: event.color }} className="text-white">
                    Final Processing Step
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No finished goods available yet</p>
                <p className="text-sm">Complete production processes to see availability</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinishedGoodsAvailability;
