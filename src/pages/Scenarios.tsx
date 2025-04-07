
import MainLayout from "@/components/layout/MainLayout";
import ScenarioComparison from "@/components/scenarios/ScenarioComparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ScenariosList from "@/components/scenarios/ScenariosList";
import CreateScenarioForm from "@/components/scenarios/CreateScenarioForm";
import { scenariosData } from "@/components/scenarios/scenarios-data";
import ScenariosDragList from "@/components/scenarios/ScenariosDragList";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define the interface needed by ScenariosList and ScenariosDragList
interface ScenarioData {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  creator: string;
  routes: number;
  vehicles: number;
}

// Convert scenariosData to the format expected by ScenariosList
const convertToScenariosList = () => {
  return scenariosData.map(scenario => ({
    id: scenario.id,
    name: scenario.name,
    description: scenario.description,
    type: scenario.type,
    createdAt: "June 15, 2025", // Default date since it's not in the original data
    creator: "System", // Default creator since it's not in the original data
    routes: scenario.routes?.length || 0,
    vehicles: scenario.vehicles?.length || 0
  }));
};

const Scenarios = () => {
  const [activeTab, setActiveTab] = useState("list");
  // Correctly convert scenariosData to the expected format
  const scenariosListData = convertToScenariosList();
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Scenario Planning</h1>
        <p className="text-muted-foreground">
          Create, modify and compare different network configurations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">Scenarios</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="organize">Organize</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Scenario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Scenario</DialogTitle>
              </DialogHeader>
              <CreateScenarioForm />
            </DialogContent>
          </Dialog>
        </div>
        
        <TabsContent value="list">
          <ScenariosList scenarios={scenariosListData} />
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="h-[calc(100vh-12rem)]">
            <ScenarioComparison />
          </div>
        </TabsContent>
        
        <TabsContent value="organize">
          <ScenariosDragList scenarios={scenariosListData} />
        </TabsContent>
        
        <TabsContent value="create">
          <CreateScenarioForm />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Scenarios;
