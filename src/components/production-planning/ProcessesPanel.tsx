
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Factory, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProcessForm from "./ProcessForm";
import { ProductionProcess } from "@/types/production";

interface ProcessesPanelProps {
  processes: ProductionProcess[];
  setProcesses: (processes: ProductionProcess[]) => void;
}

const ProcessesPanel = ({ processes, setProcesses }: ProcessesPanelProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Production Processes</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Process</DialogTitle>
              </DialogHeader>
              <ProcessForm 
                onSubmit={(process) => setProcesses([...processes, process])} 
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-2">
            {processes.map(process => (
              <div
                key={process.id}
                className="p-3 border rounded-md cursor-move bg-white"
                draggable
                style={{ borderLeft: `4px solid ${process.color}` }}
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/json", JSON.stringify(process));
                }}
              >
                <div className="font-medium">{process.name}</div>
                <div className="text-sm text-muted-foreground">
                  Capacity: {process.capacity} units
                </div>
              </div>
            ))}
            
            {processes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Factory className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>No processes created yet</p>
                <p className="text-sm">Add a process to begin planning</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProcessesPanel;
