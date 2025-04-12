
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import LongTermPlanningDashboard from "@/components/long-term-planning/LongTermPlanningDashboard";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

const LongTermPlanning = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
          <CalendarClock className="h-7 w-7" />
          Long Term Planning
        </h1>
        <p className="text-muted-foreground">
          Adjust schedules and view annualized impacts across operations
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Planning Overview</CardTitle>
          <CardDescription>
            Make adjustments to schedules and see the impacts over time
          </CardDescription>
        </CardHeader>
      </Card>

      <LongTermPlanningDashboard />
    </MainLayout>
  );
};

export default LongTermPlanning;
