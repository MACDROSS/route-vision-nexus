
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFacilityStore } from "@/hooks/facilities/useFacilityStore";
import { ArrowLeft, ArrowRight, Truck, MapPin, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, addDays, startOfWeek, subWeeks, addWeeks, isToday, isTomorrow } from "date-fns";
import { SelectViewDropdown } from "./SelectViewDropdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Departure } from "@/types/facilities";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ScheduleSummaryStats from "./ScheduleSummaryStats";

interface DeparturesDashboardProps {
  facilityId: string | null;
}

const DeparturesDashboard: React.FC<DeparturesDashboardProps> = ({ facilityId }) => {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const { getFacility, getDeparturesForFacility } = useFacilityStore();
  
  const facility = facilityId ? getFacility(facilityId) : null;
  const departures = facilityId ? getDeparturesForFacility(facilityId, currentDate, viewMode) : [];
  
  const navigatePrevious = () => {
    if (viewMode === "daily") {
      setCurrentDate(prev => addDays(prev, -1));
    } else {
      setCurrentDate(prev => subWeeks(prev, 1));
    }
  };
  
  const navigateNext = () => {
    if (viewMode === "daily") {
      setCurrentDate(prev => addDays(prev, 1));
    } else {
      setCurrentDate(prev => addWeeks(prev, 1));
    }
  };
  
  const resetToToday = () => {
    setCurrentDate(new Date());
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Loading</Badge>;
      case "departed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Departed</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Delayed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (!facilityId) {
    return (
      <Alert>
        <AlertTitle>No facility selected</AlertTitle>
        <AlertDescription>
          Please select a facility to view departures schedule.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!facility) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const renderDateHeader = () => {
    if (viewMode === "daily") {
      return (
        <div className="text-lg font-medium">
          {isToday(currentDate) ? (
            <span className="text-blue-600 font-semibold">Today</span>
          ) : isTomorrow(currentDate) ? (
            <span>Tomorrow</span>
          ) : (
            format(currentDate, "PPPP")
          )}
        </div>
      );
    }
    
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 6);
    return (
      <div className="text-lg font-medium">
        {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Truck className="mr-2 h-5 w-5 text-indigo-500" />
              <span>Departures Schedule for {facility.name}</span>
            </CardTitle>
            <SelectViewDropdown 
              value={viewMode} 
              onChange={(value) => setViewMode(value as "daily" | "weekly")} 
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" onClick={navigatePrevious}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              {viewMode === "daily" ? "Previous Day" : "Previous Week"}
            </Button>
            
            {renderDateHeader()}
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetToToday}>Today</Button>
              <Button variant="outline" size="sm" onClick={navigateNext}>
                {viewMode === "daily" ? "Next Day" : "Next Week"}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <ScheduleSummaryStats 
            data={departures} 
            type="departures"
            viewMode={viewMode}
          />

          <div className="mt-6">
            <ScrollArea className="h-[400px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {viewMode === "weekly" && <TableHead>Date</TableHead>}
                    <TableHead>Time</TableHead>
                    <TableHead>Shipment</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departures.length > 0 ? (
                    departures.map(departure => (
                      <TableRow key={departure.id}>
                        {viewMode === "weekly" && 
                          <TableCell>{format(new Date(departure.scheduledTime), "MMM dd")}</TableCell>
                        }
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {format(new Date(departure.scheduledTime), "h:mm a")}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap font-medium">{departure.shipmentId}</TableCell>
                        <TableCell>{departure.destination}</TableCell>
                        <TableCell>{departure.itemCount} units</TableCell>
                        <TableCell>{departure.carrier}</TableCell>
                        <TableCell>{getStatusBadge(departure.status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={viewMode === "weekly" ? 7 : 6} className="h-24 text-center">
                        No departures scheduled
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeparturesDashboard;
