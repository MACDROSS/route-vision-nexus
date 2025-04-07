
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes, DragItem } from './types';
import { Badge } from '@/components/ui/badge';

interface DraggableItemProps {
  id: string;
  index: number;
  type: ItemTypes;
  children: React.ReactNode;
  onMoveItem?: (dragIndex: number, hoverIndex: number) => void;
  className?: string;
  color?: string;
  count?: number;
}

const DraggableItem = ({
  id,
  index,
  type,
  children,
  onMoveItem,
  className = '',
  color,
  count
}: DraggableItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Set up drag
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type, id, index } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Set up drop
  const [{ handlerId }, drop] = useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current || !onMoveItem) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onMoveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // Set up the drag and drop refs
  drag(drop(ref));

  // Apply styles for dragging
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`relative border rounded-md p-3 mb-2 cursor-move ${className}`}
      style={{ opacity, borderColor: color }}
    >
      <div className="flex justify-between items-center">
        {children}
        {count !== undefined && (
          <Badge className="ml-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
            {count}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default DraggableItem;
