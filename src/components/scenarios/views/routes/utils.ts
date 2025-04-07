
import { ScenarioRoute } from '../../types';
import { RouteStop, RouteWithStops } from './types';

// Function to simulate generating stops for each route
export const generateStopsForRoute = (route: ScenarioRoute, index: number): RouteStop[] => {
  // This is placeholder data - in a real app, these would come from the API
  return Array(Math.floor(Math.random() * 3) + 2).fill(0).map((_, i) => ({
    id: `${route.id}-stop-${i}`,
    name: `Stop ${i + 1}`,
    type: i % 2 === 0 ? 'pickup' : 'delivery',
    address: `${100 + i} Main St, City ${index}`,
    position: route.coordinates[Math.min(i, route.coordinates.length - 1)]
  }));
};

// Create routes with stops
export const createRoutesWithStops = (routes: ScenarioRoute[] | undefined): RouteWithStops[] => {
  if (!routes || routes.length === 0) return [];
  
  return routes.map((route, index) => ({
    route,
    stops: generateStopsForRoute(route, index)
  }));
};
