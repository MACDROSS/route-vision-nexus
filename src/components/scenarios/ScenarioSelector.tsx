
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Scenario } from "./types";

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedScenarios: number[];
  onChange: (selectedIds: number[]) => void;
}

const ScenarioSelector = ({ scenarios, selectedScenarios, onChange }: ScenarioSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {scenarios.map((scenario) => (
        <Badge
          key={scenario.id}
          variant={selectedScenarios.includes(scenario.id) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => {
            if (selectedScenarios.includes(scenario.id)) {
              if (selectedScenarios.length > 1) {
                onChange(selectedScenarios.filter(id => id !== scenario.id));
              }
            } else {
              onChange([...selectedScenarios, scenario.id]);
            }
          }}
        >
          {scenario.name}
        </Badge>
      ))}
      <Button size="sm" variant="ghost" className="h-6">
        <PlusCircle className="h-3 w-3 mr-1" />
        New
      </Button>
    </div>
  );
};

export default ScenarioSelector;
