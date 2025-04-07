
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ScenarioCard from "./ScenarioCard";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type ScenarioData = {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  creator: string;
  routes: number;
  vehicles: number;
};

interface ScenariosDragListProps {
  scenarios: ScenarioData[];
}

const ScenariosDragList = ({ scenarios: initialScenarios }: ScenariosDragListProps) => {
  const [scenarios, setScenarios] = useState(initialScenarios);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(scenarios);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setScenarios(items);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>Drag and drop scenarios to rearrange them</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setScenarios(initialScenarios)}>
          Reset Order
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="scenarios">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {scenarios.map((scenario, index) => (
                <Draggable key={scenario.id} draggableId={String(scenario.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-full"
                    >
                      <ScenarioCard scenario={scenario} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ScenariosDragList;
