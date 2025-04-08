
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionProcess, ProcessEvent } from "@/types/production";
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductionTimelineProps {
  processes: ProductionProcess[];
  events: ProcessEvent[];
  className?: string; // Added className as an optional prop
}

const ProductionTimeline: React.FC<ProductionTimelineProps> = ({ processes, events, className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Calculate start and end of the current week for the timeline
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate all days in the interval
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Handle navigation
  const previousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  // Format data for the timeline chart
  const timelineData = daysInWeek.map(day => {
    const dayEvents = events.filter(event => 
      isSameDay(new Date(event.date), day)
    );
    
    const result: any = {
      date: format(day, 'MM/dd'),
      name: format(day, 'EEE'),
    };
    
    // Group events by process
    processes.forEach(process => {
      const processEvents = dayEvents.filter(event => event.processId === process.id);
      result[process.name] = processEvents.reduce((sum, evt) => sum + evt.quantity, 0);
    });
    
    return result;
  });

  // Generate custom colors for bars based on process colors
  const processColors = processes.map(process => process.color || "#666");
  
  // Count events by process for the legend
  const processEventCount = processes.map(process => {
    const count = events.filter(event => event.processId === process.id).length;
    return { name: process.name, count };
  });
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Production Timeline
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={previousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </span>
            <Button variant="outline" size="sm" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {processEventCount.map((process) => (
            <Badge 
              key={process.name} 
              variant="outline" 
              className="flex items-center gap-1"
              style={{borderLeftColor: processes.find(p => p.name === process.name)?.color}}
            >
              <Flag className="h-3 w-3" />
              {process.name}: {process.count} events
            </Badge>
          ))}
        </div>
        
        <div className="h-[300px]">
          <ChartContainer
            id="production-timeline"
            config={{
              primary: {
                theme: {
                  light: "#0ea5e9",
                  dark: "#38bdf8"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timelineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                {processes.map((process, index) => (
                  <Bar 
                    key={process.id}
                    dataKey={process.name} 
                    stackId="a"
                    fill={processColors[index]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionTimeline;
