
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SortPlanningProvider } from '@/components/sort-planning/SortPlanningContext';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SortFacility from '@/components/sort-planning/SortFacility';
import UnassignedDestinations from '@/components/sort-planning/UnassignedDestinations';
import { useSortPlanning } from '@/components/sort-planning/SortPlanningContext';
import { Button } from '@/components/ui/button';
import { MoveHorizontal, Save, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

const SortPlanningContent = () => {
  const { facilities } = useSortPlanning();

  const handleSaveConfig = () => {
    toast.success('Sort configuration saved successfully');
    // In a real app, we would save the configuration to a database
  };

  const handleExportConfig = () => {
    // Create a file to download with the current configuration
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(facilities, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "sort-configuration.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('Configuration exported successfully');
  };

  const handleImportConfig = () => {
    toast.info('Import functionality would be implemented in a real app');
    // In a real app, we would provide a file picker and import the configuration
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Sort Planning</h1>
          <p className="text-muted-foreground">
            Organize destinations into bins, conveyors, and facilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImportConfig}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleSaveConfig}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="visual" className="mb-6">
        <TabsList>
          <TabsTrigger value="visual">
            Visual Layout
          </TabsTrigger>
          <TabsTrigger value="table">
            Table View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <div className="mb-4 p-3 bg-muted/30 border rounded-md">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MoveHorizontal size={16} />
                  <span>Drag and drop items to organize your sort plan</span>
                </div>
              </div>
              
              {facilities.map((facility) => (
                <SortFacility key={facility.id} facility={facility} />
              ))}
            </div>
            
            <div className="md:col-span-1">
              <UnassignedDestinations />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="table">
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">Table View</h3>
            <p className="text-muted-foreground">
              A tabular representation of the sort plan would be shown here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SortPlanning = () => {
  return (
    <MainLayout>
      <DndProvider backend={HTML5Backend}>
        <SortPlanningProvider>
          <SortPlanningContent />
        </SortPlanningProvider>
      </DndProvider>
    </MainLayout>
  );
};

export default SortPlanning;
