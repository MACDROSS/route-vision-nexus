
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { RouteStop } from './types';

interface RouteStopTableProps {
  routeId: number;
  stops: RouteStop[];
}

const RouteStopTable: React.FC<RouteStopTableProps> = ({ routeId, stops }) => {
  return (
    <Droppable droppableId={`route-${routeId}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Stop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stops.map((stop, index) => (
                <Draggable 
                  key={stop.id} 
                  draggableId={stop.id} 
                  index={index}
                >
                  {(provided) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="hover:bg-muted/50 cursor-move"
                    >
                      <TableCell className="py-2">
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{stop.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={stop.type === 'pickup' ? 'outline' : 'default'}
                          className={stop.type === 'pickup' ? 'bg-blue-50 text-blue-700 hover:bg-blue-50' : ''}
                        >
                          {stop.type === 'pickup' ? 'Pickup' : 'Delivery'}
                        </Badge>
                      </TableCell>
                      <TableCell>{stop.address}</TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          </Table>
        </div>
      )}
    </Droppable>
  );
};

export default RouteStopTable;
