
import { ScenarioRoute } from '../../types';
import { RouteStop, RouteWithStops } from './types';

// Function to generate realistic stops for each route
export const generateStopsForRoute = (route: ScenarioRoute, index: number): RouteStop[] => {
  // This creates more realistic and consistent stops based on the route's coordinates
  const cityNames = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Jersey City', 'Hoboken'];
  const streetNames = ['Main St', 'Broadway', 'Park Ave', 'Madison Ave', 'Lexington Ave', '5th Ave', 'Commerce St'];
  
  // Generate between 3-5 stops per route
  const numStops = Math.floor(Math.random() * 3) + 3;
  
  // Create stops at evenly distributed points along the route
  return Array(numStops).fill(0).map((_, i) => {
    // Calculate position from route coordinates
    const coordIndex = Math.min(
      Math.floor((i / (numStops - 1)) * (route.coordinates.length - 1)),
      route.coordinates.length - 1
    );
    
    const city = cityNames[Math.min(index, cityNames.length - 1)];
    const street = streetNames[Math.min(i, streetNames.length - 1)];
    
    return {
      id: `${route.id}-stop-${i}`,
      name: `Stop ${i + 1}`,
      type: i === 0 ? 'pickup' : 'delivery',
      address: `${100 + i * 100} ${street}, ${city}`,
      position: route.coordinates[coordIndex]
    };
  });
};

// Create routes with stops
export const createRoutesWithStops = (routes: ScenarioRoute[] | undefined): RouteWithStops[] => {
  if (!routes || routes.length === 0) return [];
  
  return routes.map((route, index) => ({
    route,
    stops: generateStopsForRoute(route, index)
  }));
};

