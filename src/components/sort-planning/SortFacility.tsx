
import { Facility } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import DraggableItem from './DraggableItem';
import SortConveyor from './SortConveyor';
import { useDrop } from 'react-dnd';
import { useSortPlanning } from './SortPlanningContext';
import { MapPin, MoveHorizontal } from 'lucide-react';

interface SortFacilityProps {
  facility: Facility;
}

const SortFacility = ({ facility }: SortFacilityProps) => {
  const { moveConveyor, addConveyorToFacility } = useSortPlanning();
  
  // Set up drop for conveyors
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'CONVEYOR',
    drop: (item: { id: string }) => {
      addConveyorToFacility(item.id, facility.id);
      return { facilityId: facility.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Create a handler for moving conveyors within this facility
  const handleMoveConveyor = (dragIndex: number, hoverIndex: number) => {
    moveConveyor(dragIndex, hoverIndex, facility.id);
  };

  // Style for the drop target
  const getDropStyle = () => {
    if (isOver && canDrop) {
      return 'border-dashed border-2 border-primary bg-primary/10';
    }
    return '';
  };

  return (
    <Card className={`w-full mb-6 ${getDropStyle()}`} ref={drop}>
      <CardHeader className="p-4 bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <MapPin size={18} />
          {facility.name}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            {facility.location}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {facility.conveyors.length > 0 ? (
          facility.conveyors.map((conveyor, idx) => (
            <DraggableItem
              key={conveyor.id}
              id={conveyor.id}
              index={idx}
              type="CONVEYOR"
              onMoveItem={handleMoveConveyor}
              className="mb-4 p-0 border-0"
              count={conveyor.bins.length}
            >
              <SortConveyor 
                conveyor={conveyor} 
                index={idx} 
                facilityId={facility.id} 
              />
            </DraggableItem>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 border border-dashed rounded-lg text-muted-foreground">
            <MoveHorizontal className="mr-2" size={18} />
            <span>Drop conveyors here</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SortFacility;
