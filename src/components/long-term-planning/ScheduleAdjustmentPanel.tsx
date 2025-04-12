
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ScenarioSelector from "./ScenarioSelector";
import AdjustmentCalendar from "./AdjustmentCalendar";
import { useLongTermPlanningStore } from "@/hooks/long-term-planning/useLongTermPlanningStore";
import { format } from "date-fns";

const ScheduleAdjustmentPanel = () => {
  const { toast } = useToast();
  const { activeScenario, scenarios, adjustments, addAdjustment, getResourcesForType } = useLongTermPlanningStore();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [resourceType, setResourceType] = useState<string>("personnel");
  const [resourceId, setResourceId] = useState<string>("");
  const [changeType, setChangeType] = useState<"capacity" | "efficiency" | "availability">("capacity");
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  
  const resources = getResourcesForType(resourceType);
  
  const handleAddAdjustment = () => {
    if (!selectedDate || !resourceId || !changeType) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to add an adjustment",
        variant: "destructive",
      });
      return;
    }

    addAdjustment({
      id: `adj-${Date.now()}`,
      date: selectedDate,
      resourceType,
      resourceId,
      changeType,
      value: adjustmentValue,
      scenarioId: activeScenario || scenarios[0]?.id,
    });

    toast({
      title: "Adjustment added",
      description: `${changeType} adjustment added for ${format(selectedDate, "PPP")}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Adjustment Calendar</CardTitle>
            <ScenarioSelector />
          </div>
        </CardHeader>
        <CardContent>
          <AdjustmentCalendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            adjustments={adjustments.filter(adj => adj.scenarioId === activeScenario)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Adjustment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="resource-type">Resource Type</Label>
              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger id="resource-type">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personnel">Personnel</SelectItem>
                  <SelectItem value="facility">Facility</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="resource">Resource</Label>
              <Select value={resourceId} onValueChange={setResourceId}>
                <SelectTrigger id="resource">
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  {resources.map(resource => (
                    <SelectItem key={resource.id} value={resource.id}>
                      {resource.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="change-type">Change Type</Label>
              <Select 
                value={changeType} 
                onValueChange={(value: "capacity" | "efficiency" | "availability") => setChangeType(value)}
              >
                <SelectTrigger id="change-type">
                  <SelectValue placeholder="Select change type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="capacity">Capacity</SelectItem>
                  <SelectItem value="efficiency">Efficiency</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="adjustment-value">
                Adjustment Value: {adjustmentValue}%
              </Label>
              <Slider
                id="adjustment-value"
                min={-100}
                max={100}
                step={5}
                value={[adjustmentValue]}
                onValueChange={(values) => setAdjustmentValue(values[0])}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Selected Date</Label>
              <Input
                value={selectedDate ? format(selectedDate, "PPP") : ""}
                readOnly
                className="bg-muted"
              />
            </div>

            <Separator className="my-2" />

            <Button onClick={handleAddAdjustment} className="w-full">
              Add Adjustment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleAdjustmentPanel;
