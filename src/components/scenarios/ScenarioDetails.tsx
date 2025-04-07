
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { scenariosData } from "./scenarios-data";
import { MetricKey } from "./types";
import { Badge } from "@/components/ui/badge";
import ScenarioMapView from "./ScenarioMapView";
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "sonner";

// Import our extracted components
import ScenarioNavigationCards from "./ScenarioNavigationCards";
import ScenarioDetailsView from "./views/ScenarioDetailsView";
import ScenarioAnalysisView from "./views/ScenarioAnalysisView";
import { ScenarioDialogs } from "./dialogs/ScenarioDialogs";

const ScenarioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scenarioId = parseInt(id || "0");
  const scenario = scenariosData.find(s => s.id === scenarioId);
  const [activeMetric, setActiveMetric] = useState<MetricKey>("deliveryTime");
  const [activeView, setActiveView] = useState<"details" | "analysis" | "map" | "configuration">("details");
  
  // States for UI interactions
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompareSheetOpen, setIsCompareSheetOpen] = useState(false);
  const [scenariosToCompare, setScenariosToCompare] = useState<number[]>([]);

  // Handle actions
  const handleEdit = () => {
    setIsEditSheetOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Changes saved successfully");
    setIsEditSheetOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    toast.success("Scenario deleted successfully");
    setIsDeleteDialogOpen(false);
    navigate("/scenarios");
  };

  const handleDuplicate = () => {
    toast.success("Scenario duplicated successfully");
  };

  const handleCompare = () => {
    if (scenario) {
      setScenariosToCompare([scenario.id]);
      setIsCompareSheetOpen(true);
    }
  };

  const handleViewComparison = () => {
    setIsCompareSheetOpen(false);
    navigate(`/scenarios?compare=${scenariosToCompare.join(',')}`);
  };

  if (!scenario) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Scenario not found</h2>
          <Button 
            onClick={() => navigate("/scenarios")} 
            variant="outline" 
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scenarios
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/scenarios")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{scenario.name}</h1>
        {scenario.type === "baseline" && (
          <Badge variant="secondary" className="ml-1">Baseline</Badge>
        )}
      </div>

      <ScenarioNavigationCards 
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenConfiguration={handleEdit}
      />

      {activeView === "details" && (
        <ScenarioDetailsView
          scenario={scenario}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onCompare={handleCompare}
        />
      )}

      {activeView === "analysis" && (
        <ScenarioAnalysisView
          scenario={scenario}
          activeMetric={activeMetric}
          setActiveMetric={setActiveMetric}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onCompare={handleCompare}
        />
      )}

      {activeView === "map" && <ScenarioMapView scenario={scenario} />}

      {/* Dialog and Sheet components */}
      <ScenarioDialogs 
        scenario={scenario}
        isEditSheetOpen={isEditSheetOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isCompareSheetOpen={isCompareSheetOpen}
        scenariosToCompare={scenariosToCompare}
        scenariosData={scenariosData}
        setIsEditSheetOpen={setIsEditSheetOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        setIsCompareSheetOpen={setIsCompareSheetOpen}
        setScenariosToCompare={setScenariosToCompare}
        handleSaveEdit={handleSaveEdit}
        handleConfirmDelete={handleConfirmDelete}
        handleViewComparison={handleViewComparison}
      />

    </MainLayout>
  );
};

export default ScenarioDetails;
