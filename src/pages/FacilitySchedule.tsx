
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArrivalsDashboard from "@/components/facilities/ArrivalsDashboard";
import DeparturesDashboard from "@/components/facilities/DeparturesDashboard";
import FacilitySelector from "@/components/facilities/FacilitySelector";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Calendar, Building } from "lucide-react";

const FacilitySchedule = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const facilityId = searchParams.get("facilityId");
  
  const handleFacilityChange = (newFacilityId: string) => {
    setSearchParams({ facilityId: newFacilityId });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          <Building className="h-7 w-7" />
          Facility Schedule
        </h1>
        <p className="text-muted-foreground">
          Monitor arrivals and departures for selected facilities
        </p>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select Facility
            </CardTitle>
            <CardDescription>
              Choose a facility to view its schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FacilitySelector 
              selectedFacilityId={facilityId} 
              onFacilityChange={handleFacilityChange} 
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="arrivals" className="mb-6">
        <TabsList>
          <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
          <TabsTrigger value="departures">Departures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="arrivals">
          <ArrivalsDashboard facilityId={facilityId} />
        </TabsContent>
        
        <TabsContent value="departures">
          <DeparturesDashboard facilityId={facilityId} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default FacilitySchedule;
