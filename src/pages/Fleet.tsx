
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fleetVehicles, maintenanceAlerts } from "@/components/fleet/data";
import { getStatusBadge, getMaintenanceSeverityBadge } from "@/components/fleet/utils";
import FleetOverviewTab from "@/components/fleet/FleetOverviewTab";
import VehiclesTab from "@/components/fleet/VehiclesTab";
import MaintenanceTab from "@/components/fleet/MaintenanceTab";

const Fleet = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Fleet Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your delivery fleet
        </p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <FleetOverviewTab
              vehicles={fleetVehicles}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="vehicles" className="mt-6">
            <VehiclesTab
              vehicles={fleetVehicles}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-6">
            <MaintenanceTab
              alerts={maintenanceAlerts}
              getMaintenanceSeverityBadge={getMaintenanceSeverityBadge}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Fleet;
