
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Truck, Calendar as CalendarIcon, Package, ClipboardList } from "lucide-react";
import { format, addDays } from "date-fns";
import { TransportOption } from "@/types/shipping";
import { useShippingStore } from "@/hooks/useShippingStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TransportationAvailabilityProps {
  fullView?: boolean;
}

const TransportationAvailability = ({ fullView = false }: TransportationAvailabilityProps) => {
  const { transportOptions } = useShippingStore();

  // Group transport capacity by date
  const capacityByDate = transportOptions.reduce((acc: Record<string, number>, option) => {
    const dateKey = format(new Date(option.availableDate), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = 0;
    }
    acc[dateKey] += option.capacity;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.entries(capacityByDate).map(([date, capacity]) => ({
    date: format(new Date(date), 'MMM dd'),
    capacity
  }));

  return (
    <Card className={fullView ? "min-h-[calc(100vh-16rem)]" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Truck className="mr-2 h-5 w-5 text-blue-500" />
            <span>Transportation Availability</span>
          </div>
          <Badge variant="outline">{transportOptions.length} Vehicles</Badge>
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
                <Bar dataKey="capacity" fill="#2196F3" name="Capacity (units)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <ScrollArea className={fullView ? "h-[calc(100vh-28rem)]" : "h-60"}>
          <div className="space-y-4">
            {transportOptions.length > 0 ? (
              transportOptions.map((option) => (
                <div 
                  key={option.id} 
                  className="border rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h3 className="font-medium">{option.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>Available: {format(new Date(option.availableDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>Capacity: {option.capacity} units</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClipboardList className="h-3 w-3" />
                        <span>Type: {option.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge
                    variant="outline"
                    className={`${option.status === 'available' 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'bg-amber-100 text-amber-800 border-amber-300'}`}
                  >
                    {option.status === 'available' ? 'Available' : 'Reserved'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Truck className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No transportation options available</p>
                <p className="text-sm">Add transportation resources to see availability</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransportationAvailability;
