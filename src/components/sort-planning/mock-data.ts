
import { Destination, Bin, Conveyor, Facility } from './types';

// Generate mock destinations based on Canadian cities
export const mockDestinations: Destination[] = [
  { id: 'd1', name: 'Toronto Office', address: '123 Bay Street, Toronto', type: 'delivery' },
  { id: 'd2', name: 'Vancouver Warehouse', address: '45 Water Street, Vancouver', type: 'pickup' },
  { id: 'd3', name: 'Montreal Store', address: '78 Saint Catherine Street, Montreal', type: 'delivery' },
  { id: 'd4', name: 'Calgary Distribution', address: '25 Stephen Avenue, Calgary', type: 'delivery' },
  { id: 'd5', name: 'Ottawa Shop', address: '12 Rideau Street, Ottawa', type: 'delivery' },
  { id: 'd6', name: 'Edmonton Hub', address: '65 Jasper Avenue, Edmonton', type: 'pickup' },
  { id: 'd7', name: 'Quebec City Store', address: '33 Grande Allée, Quebec City', type: 'delivery' },
  { id: 'd8', name: 'Winnipeg Airport', address: '3 Portage Avenue, Winnipeg', type: 'pickup' },
  { id: 'd9', name: 'Hamilton Mall', address: '987 King Street, Hamilton', type: 'delivery' },
  { id: 'd10', name: 'Halifax Port', address: '45 Barrington Street, Halifax', type: 'delivery' },
  { id: 'd11', name: 'Toronto Financial District', address: '100 King Street West, Toronto', type: 'delivery' },
  { id: 'd12', name: 'Victoria Harbor', address: '240 Government Street, Victoria', type: 'delivery' }
];

// Create bins with some destinations assigned
export const mockBins: Bin[] = [
  { 
    id: 'b1', 
    name: 'Ontario Bin', 
    color: '#0ea5e9', 
    destinations: [mockDestinations[0], mockDestinations[10]] 
  },
  { 
    id: 'b2', 
    name: 'British Columbia Bin', 
    color: '#10b981', 
    destinations: [mockDestinations[1], mockDestinations[11]] 
  },
  { 
    id: 'b3', 
    name: 'Quebec Bin', 
    color: '#f59e0b', 
    destinations: [mockDestinations[2], mockDestinations[6]] 
  },
  { 
    id: 'b4', 
    name: 'Alberta Bin', 
    color: '#ef4444', 
    destinations: [mockDestinations[3], mockDestinations[5]] 
  },
  { 
    id: 'b5', 
    name: 'Eastern Provinces Bin', 
    color: '#8b5cf6', 
    destinations: [mockDestinations[4], mockDestinations[9]] 
  },
  { 
    id: 'b6', 
    name: 'Central Bin', 
    color: '#ec4899', 
    destinations: [mockDestinations[7], mockDestinations[8]] 
  },
  { id: 'b7', name: 'Northern Territories Bin', color: '#6366f1', destinations: [] },
  { id: 'b8', name: 'Express Bin', color: '#71717a', destinations: [] },
];

// Create conveyors with bins assigned
export const mockConveyors: Conveyor[] = [
  { id: 'c1', name: 'Eastern Canada Conveyor', bins: [mockBins[0], mockBins[2], mockBins[4]] },
  { id: 'c2', name: 'Western Canada Conveyor', bins: [mockBins[1], mockBins[3]] },
  { id: 'c3', name: 'Central Canada Conveyor', bins: [mockBins[5]] },
  { id: 'c4', name: 'Special Handling Conveyor', bins: [mockBins[6], mockBins[7]] }
];

// Create facilities with conveyors assigned
export const mockFacilities: Facility[] = [
  { 
    id: 'f1', 
    name: 'Toronto Sorting Center', 
    location: 'Mississauga, ON',
    conveyors: [mockConveyors[0], mockConveyors[2]] 
  },
  { 
    id: 'f2', 
    name: 'Vancouver Distribution Hub', 
    location: 'Richmond, BC',
    conveyors: [mockConveyors[1]] 
  },
  { 
    id: 'f3', 
    name: 'Montreal Facility', 
    location: 'Laval, QC',
    conveyors: [mockConveyors[3]] 
  }
];

// Create a list of unassigned destinations
export const getUnassignedDestinations = (): Destination[] => {
  // Get all assigned destination IDs from all bins
  const assignedDestinationIds = new Set<string>();
  mockBins.forEach(bin => {
    bin.destinations.forEach(dest => assignedDestinationIds.add(dest.id));
  });
  
  // Return destinations that are not in any bin
  return mockDestinations.filter(dest => !assignedDestinationIds.has(dest.id));
};
