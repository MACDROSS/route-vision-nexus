

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

// Constants for city coordinates
export const NYC_COORDINATES = {
  MANHATTAN: [40.7831, -73.9712],
  BROOKLYN: [40.6782, -73.9442],
  QUEENS: [40.7282, -73.7949],
  BRONX: [40.8448, -73.8648],
  JERSEY_CITY: [40.7178, -74.0431],
  NEWARK: [40.7357, -74.1724]
};

