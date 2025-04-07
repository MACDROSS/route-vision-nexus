
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scenario, ScenarioRoute } from '../types';
import { toast } from 'sonner';

// Define additional types for route stops
interface RouteStop {
  id: string;
  name: string;
  type: 'pickup' | 'delivery';
  address: string;
  position: [number, number];
}

// Function to simulate generating stops for each route
const generateStopsForRoute = (route: ScenarioRoute, index: number): RouteStop[] => {
  // This is placeholder data - in a real app, these would come from the API
  return Array(Math.floor(Math.random() * 3) + 2).fill(0).map((_, i) => ({
    id: `${route.id}-stop-${i}`,
    name: `Stop ${i + 1}`,
    type: i % 2 === 0 ? 'pickup' : 'delivery',
    address: `${100 + i} Main St, City ${index}`,
    position: route.coordinates[Math.min(i, route.coordinates.length - 1)]
  }));
};

interface RouteWithStops {
  route: ScenarioRoute;
  stops: RouteStop[];
}

interface ScenarioRoutesViewProps {
  scenario: Scenario;
}

const ScenarioRoutesView: React.FC<ScenarioRoutesViewProps> = ({ scenario }) => {
  // Create routes with stops
  const initialRoutesWithStops: RouteWithStops[] = scenario.routes?.map((route, index) => ({
    route,
    stops: generateStopsForRoute(route, index)
  })) || [];

  const [routesWithStops, setRoutesWithStops] = useState<RouteWithStops[]>(initialRoutesWithStops);
  const [expandedRoute, setExpandedRoute] = useState<number | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Get source and destination route indices
    const sourceRouteId = source.droppableId;
    const destRouteId = destination.droppableId;

    // Create a new array of routes
    const newRoutes = [...routesWithStops];

    // Handle reordering within the same route
    if (sourceRouteId === destRouteId) {
      const routeIndex = newRoutes.findIndex(r => `route-${r.route.id}` === sourceRouteId);
      if (routeIndex === -1) return;

      const routeStops = [...newRoutes[routeIndex].stops];
      const [movedStop] = routeStops.splice(source.index, 1);
      routeStops.splice(destination.index, 0, movedStop);

      newRoutes[routeIndex] = {
        ...newRoutes[routeIndex],
        stops: routeStops
      };
    } 
    // Handle moving between routes
    else {
      const sourceRouteIndex = newRoutes.findIndex(r => `route-${r.route.id}` === sourceRouteId);
      const destRouteIndex = newRoutes.findIndex(r => `route-${r.route.id}` === destRouteId);
      
      if (sourceRouteIndex === -1 || destRouteIndex === -1) return;

      // Get the stop being moved
      const sourceStops = [...newRoutes[sourceRouteIndex].stops];
      const [movedStop] = sourceStops.splice(source.index, 1);
      
      // Add the stop to the destination route
      const destStops = [...newRoutes[destRouteIndex].stops];
      destStops.splice(destination.index, 0, movedStop);

      // Update both routes
      newRoutes[sourceRouteIndex] = {
        ...newRoutes[sourceRouteIndex],
        stops: sourceStops
      };
      
      newRoutes[destRouteIndex] = {
        ...newRoutes[destRouteIndex],
        stops: destStops
      };
    }

    setRoutesWithStops(newRoutes);
    toast.success("Stop order updated");
  };

  const toggleRouteExpansion = (routeId: number) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  if (!routesWithStops.length) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No routes available for this scenario.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Routes and Stops</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-4">
            {routesWithStops.map((routeWithStops) => (
              <Card key={routeWithStops.route.id} className="overflow-hidden">
                <div 
                  className={`flex items-center justify-between p-4 cursor-pointer ${routeWithStops.route.color ? `border-l-4 border-[${routeWithStops.route.color}]` : ''}`} 
                  onClick={() => toggleRouteExpansion(routeWithStops.route.id)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: routeWithStops.route.color || '#888' }}
                    ></div>
                    <h3 className="font-medium">{routeWithStops.route.name}</h3>
                    <Badge variant="outline">{routeWithStops.stops.length} stops</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    {expandedRoute === routeWithStops.route.id ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </Button>
                </div>

                {expandedRoute === routeWithStops.route.id && (
                  <div className="px-4 pb-4">
                    <Droppable droppableId={`route-${routeWithStops.route.id}`}>
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
                              {routeWithStops.stops.map((stop, index) => (
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
                  </div>
                )}
              </Card>
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default ScenarioRoutesView;
