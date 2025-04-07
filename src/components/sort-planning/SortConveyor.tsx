
import { Conveyor } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import DraggableItem from './DraggableItem';
import SortBin from './SortBin';
import { useSortPlanning } from './SortPlanningContext';
import { useDrop } from 'react-dnd';
import { Box } from 'lucide-react';

interface SortConveyorProps {
  conveyor: Conveyor;
  index: number;
  facilityId: string;
}

const SortConveyor = ({ conveyor, index, facilityId }: SortConveyorProps) => {
  const { moveBin, addBinToConveyor } = useSortPlanning();
  
  // Set up drop for bins
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'BIN',
    drop: (item: { id: string }) => {
      addBinToConveyor(item.id, conveyor.id);
      return { conveyorId: conveyor.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Create a handler for moving bins within this conveyor
  const handleMoveBin = (dragIndex: number, hoverIndex: number) => {
    moveBin(dragIndex, hoverIndex, conveyor.id);
  };

  // Style for the drop target
  const getDropStyle = () => {
    if (isOver && canDrop) {
      return 'border-dashed border-2 border-primary bg-primary/10';
    }
    return '';
  };

  return (
    <Card 
      ref={drop}
      className={`w-full mb-4 ${getDropStyle()}`}
    >
      <CardHeader className="p-4 pb-2 border-b">
        <CardTitle className="text-md">
          {conveyor.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {conveyor.bins.length > 0 ? (
          conveyor.bins.map((bin, idx) => (
            <DraggableItem
              key={bin.id}
              id={bin.id}
              index={idx}
              type="BIN"
              onMoveItem={handleMoveBin}
              className="mb-4 p-0 border-0"
              color={bin.color}
              count={bin.destinations.length}
            >
              <SortBin bin={bin} index={idx} conveyorId={conveyor.id} />
            </DraggableItem>
          ))
        ) : (
          <div className="flex items-center justify-center p-8 border border-dashed rounded-lg text-muted-foreground">
            <Box className="mr-2" size={18} />
            <span>Drop bins here</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SortConveyor;
