
// Types for route stops management
export interface RouteStop {
  id: string;
  name: string;
  type: 'pickup' | 'delivery';
  address: string;
  position: [number, number];
}

export interface RouteWithStops {
  route: import('../../types').ScenarioRoute;
  stops: RouteStop[];
}
