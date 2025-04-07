
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { mockDestinations } from './mock-data';
import { Destination } from './types';
import DraggableItem from './DraggableItem';
import { useSortPlanning } from './SortPlanningContext';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UnassignedDestinations = () => {
  const [unassignedDestinations, setUnassignedDestinations] = useState<Destination[]>([]);
  const { facilities } = useSortPlanning();

  // Find all destinations that are not in any bin
  useEffect(() => {
    // Get all assigned destination IDs from all bins
    const assignedDestinationIds = new Set<string>();
    
    facilities.forEach(facility => {
      facility.conveyors.forEach(conveyor => {
        conveyor.bins.forEach(bin => {
          bin.destinations.forEach(dest => {
            assignedDestinationIds.add(dest.id);
          });
        });
      });
    });
    
    // Filter mockDestinations to only include those not in any bin
    const unassigned = mockDestinations.filter(
      dest => !assignedDestinationIds.has(dest.id)
    );
    
    setUnassignedDestinations(unassigned);
  }, [facilities]);

  return (
    <Card className="h-full">
      <CardHeader className="p-4 bg-muted/50">
        <CardTitle className="flex items-center justify-between">
          <span>Unassigned Destinations</span>
          <Badge variant="outline" className="ml-2">
            {unassignedDestinations.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-[70vh] overflow-auto">
        {unassignedDestinations.length > 0 ? (
          unassignedDestinations.map((destination, index) => (
            <DraggableItem
              key={destination.id}
              id={destination.id}
              index={index}
              type="DESTINATION"
              className="bg-white"
            >
              <div>
                <div className="flex items-center">
                  <Package size={16} className="mr-2" />
                  <span className="text-sm font-medium">{destination.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">{destination.address}</div>
                <Badge 
                  variant="secondary" 
                  className="mt-1 text-xs"
                >
                  {destination.type}
                </Badge>
              </div>
            </DraggableItem>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No unassigned destinations
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnassignedDestinations;
