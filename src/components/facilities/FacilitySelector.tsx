
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFacilityStore } from "@/hooks/facilities/useFacilityStore";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FacilitySelectorProps {
  selectedFacilityId: string | null;
  onFacilityChange: (facilityId: string) => void;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  selectedFacilityId,
  onFacilityChange,
}) => {
  const { facilities } = useFacilityStore();

  if (facilities.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No facilities available</AlertTitle>
        <AlertDescription>
          There are no facilities to select from. Please add facilities first.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Select
            value={selectedFacilityId || facilities[0].id}
            onValueChange={onFacilityChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a facility" />
            </SelectTrigger>
            <SelectContent>
              {facilities.map((facility) => (
                <SelectItem key={facility.id} value={facility.id}>
                  {facility.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FacilitySelector;
