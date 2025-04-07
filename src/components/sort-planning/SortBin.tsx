
import { Bin } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import DraggableItem from './DraggableItem';
import { useDrop } from 'react-dnd';
import { useSortPlanning } from './SortPlanningContext';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SortBinProps {
  bin: Bin;
  index: number;
  conveyorId: string;
}

const SortBin = ({ bin, index, conveyorId }: SortBinProps) => {
  const { moveDestination, addDestinationToBin } = useSortPlanning();

  // Set up drop for destinations
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'DESTINATION',
    drop: (item: { id: string }) => {
      addDestinationToBin(item.id, bin.id);
      return { binId: bin.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Create a handler for moving destinations within this bin
  const handleMoveDestination = (dragIndex: number, hoverIndex: number) => {
    moveDestination(dragIndex, hoverIndex, bin.id);
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
      style={{ borderLeft: `4px solid ${bin.color || '#71717a'}` }}
    >
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-sm flex items-center justify-between">
          {bin.name}
          <Badge variant="outline" className="ml-2">
            {bin.destinations.length} destinations
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        {bin.destinations.length > 0 ? (
          bin.destinations.map((destination, idx) => (
            <DraggableItem
              key={destination.id}
              id={destination.id}
              index={idx}
              type="DESTINATION"
              onMoveItem={handleMoveDestination}
              className="bg-muted"
            >
              <div className="flex items-center">
                <Package size={16} className="mr-2" />
                <span className="text-sm font-medium">{destination.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">{destination.address}</div>
            </DraggableItem>
          ))
        ) : (
          <div className="text-sm text-muted-foreground py-2 text-center italic">
            Drop destinations here
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SortBin;
