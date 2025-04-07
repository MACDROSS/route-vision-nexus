
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Scenario } from "../types";
import { Badge } from "@/components/ui/badge";

interface ScenarioDialogsProps {
  scenario: Scenario;
  isEditSheetOpen: boolean;
  isDeleteDialogOpen: boolean;
  isCompareSheetOpen: boolean;
  scenariosToCompare: number[];
  scenariosData: Scenario[];
  setIsEditSheetOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  setIsCompareSheetOpen: (open: boolean) => void;
  setScenariosToCompare: React.Dispatch<React.SetStateAction<number[]>>;
  handleSaveEdit: () => void;
  handleConfirmDelete: () => void;
  handleViewComparison: () => void;
}

export const ScenarioDialogs: React.FC<ScenarioDialogsProps> = ({
  scenario,
  isEditSheetOpen,
  isDeleteDialogOpen, 
  isCompareSheetOpen,
  scenariosToCompare,
  scenariosData,
  setIsEditSheetOpen,
  setIsDeleteDialogOpen,
  setIsCompareSheetOpen,
  setScenariosToCompare,
  handleSaveEdit,
  handleConfirmDelete,
  handleViewComparison
}) => {
  const handleAddToComparison = (id: number) => {
    setScenariosToCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <>
      {/* Edit Scenario Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Scenario</SheetTitle>
            <SheetDescription>
              Make changes to your scenario. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  id="name"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.name}
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.description}
                  rows={3}
                />
              </div>
              <div>
                <label htmlFor="type" className="text-sm font-medium">Type</label>
                <select
                  id="type"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  defaultValue={scenario.type}
                >
                  <option value="baseline">Baseline</option>
                  <option value="scenario">Scenario</option>
                </select>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your scenario
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Compare Scenarios Sheet */}
      <Sheet open={isCompareSheetOpen} onOpenChange={setIsCompareSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Compare Scenarios</SheetTitle>
            <SheetDescription>
              Select scenarios to compare with {scenario.name}
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="space-y-4">
              {scenariosData
                .filter(s => s.id !== scenario.id)
                .map(s => (
                  <div key={s.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`scenario-${s.id}`}
                      checked={scenariosToCompare.includes(s.id)}
                      onChange={() => handleAddToComparison(s.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`scenario-${s.id}`} className="text-sm font-medium">
                      {s.name}
                      {s.type === "baseline" && (
                        <Badge variant="secondary" className="ml-2">Baseline</Badge>
                      )}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsCompareSheetOpen(false)}>Cancel</Button>
            <Button onClick={handleViewComparison} disabled={scenariosToCompare.length <= 1}>
              View Comparison
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
