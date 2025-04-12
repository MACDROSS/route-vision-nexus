
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduleAdjustmentPanel from "./ScheduleAdjustmentPanel";
import ImpactAnalysis from "./ImpactAnalysis";
import { useLongTermPlanningStore } from "@/hooks/long-term-planning/useLongTermPlanningStore";

const LongTermPlanningDashboard = () => {
  const [activeTab, setActiveTab] = useState("adjustments");
  const { scenarios, activeScenario, setActiveScenario } = useLongTermPlanningStore();

  useEffect(() => {
    // Initialize with the first scenario if available
    if (scenarios.length > 0 && !activeScenario) {
      setActiveScenario(scenarios[0].id);
    }
  }, [scenarios, activeScenario, setActiveScenario]);

  return (
    <Tabs
      defaultValue="adjustments"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="adjustments">Schedule Adjustments</TabsTrigger>
        <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="adjustments">
        <ScheduleAdjustmentPanel />
      </TabsContent>

      <TabsContent value="impact">
        <ImpactAnalysis />
      </TabsContent>
    </Tabs>
  );
};

export default LongTermPlanningDashboard;
