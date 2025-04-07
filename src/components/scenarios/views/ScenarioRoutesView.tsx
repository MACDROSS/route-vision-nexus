
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Scenario } from '../types';
import { toast } from 'sonner';
import { RouteWithStops } from './routes/types';
import { createRoutesWithStops } from './routes/utils';
import RouteCard from './routes/RouteCard';

interface ScenarioRoutesViewProps {
  scenario: Scenario;
}

const ScenarioRoutesView: React.FC<ScenarioRoutesViewProps> = ({ scenario }) => {
  const initialRoutesWithStops: RouteWithStops[] = createRoutesWithStops(scenario.routes);
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
              <RouteCard
                key={routeWithStops.route.id}
                route={routeWithStops.route}
                stops={routeWithStops.stops}
                isExpanded={expandedRoute === routeWithStops.route.id}
                onToggleExpand={() => toggleRouteExpansion(routeWithStops.route.id)}
              />
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default ScenarioRoutesView;
