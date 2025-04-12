
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLongTermPlanningStore } from "@/hooks/long-term-planning/useLongTermPlanningStore";

const ScenarioSelector = () => {
  const { toast } = useToast();
  const { scenarios, activeScenario, setActiveScenario, addScenario } = useLongTermPlanningStore();
  const [newScenarioName, setNewScenarioName] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleAddScenario = () => {
    if (!newScenarioName.trim()) {
      toast({
        title: "Error",
        description: "Scenario name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const newScenario = {
      id: `scenario-${Date.now()}`,
      name: newScenarioName,
    };

    addScenario(newScenario);
    setActiveScenario(newScenario.id);
    setNewScenarioName("");
    setDialogOpen(false);
    
    toast({
      title: "Scenario created",
      description: `New scenario "${newScenarioName}" has been created`,
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Select value={activeScenario} onValueChange={setActiveScenario}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select scenario" />
        </SelectTrigger>
        <SelectContent>
          {scenarios.map(scenario => (
            <SelectItem key={scenario.id} value={scenario.id}>
              {scenario.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Scenario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Scenario Name</Label>
              <Input
                id="name"
                value={newScenarioName}
                onChange={(e) => setNewScenarioName(e.target.value)}
                placeholder="Enter scenario name"
              />
            </div>
            <Button onClick={handleAddScenario} className="w-full">
              Create Scenario
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScenarioSelector;
