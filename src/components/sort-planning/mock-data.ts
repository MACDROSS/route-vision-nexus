
import { Destination, Bin, Conveyor, Facility } from './types';

// Generate mock destinations based on NYC neighborhoods
export const mockDestinations: Destination[] = [
  { id: 'd1', name: 'Manhattan Office', address: '123 Broadway, Manhattan', type: 'delivery' },
  { id: 'd2', name: 'Brooklyn Warehouse', address: '45 Atlantic Ave, Brooklyn', type: 'pickup' },
  { id: 'd3', name: 'Queens Store', address: '78 Queens Blvd, Queens', type: 'delivery' },
  { id: 'd4', name: 'Bronx Distribution', address: '25 Grand Concourse, Bronx', type: 'delivery' },
  { id: 'd5', name: 'Staten Island Shop', address: '12 Bay Street, Staten Island', type: 'delivery' },
  { id: 'd6', name: 'Jersey City Hub', address: '65 Exchange Pl, Jersey City', type: 'pickup' },
  { id: 'd7', name: 'Hoboken Store', address: '33 Washington St, Hoboken', type: 'delivery' },
  { id: 'd8', name: 'Newark Airport', address: '3 Brewster Rd, Newark', type: 'pickup' },
  { id: 'd9', name: 'Yonkers Mall', address: '987 Central Ave, Yonkers', type: 'delivery' },
  { id: 'd10', name: 'Long Island City', address: '45-35 21st St, Queens', type: 'delivery' },
  { id: 'd11', name: 'Financial District', address: '100 Wall St, Manhattan', type: 'delivery' },
  { id: 'd12', name: 'Williamsburg', address: '240 Bedford Ave, Brooklyn', type: 'delivery' }
];

// Create bins with some destinations assigned
export const mockBins: Bin[] = [
  { 
    id: 'b1', 
    name: 'Manhattan Bin', 
    color: '#0ea5e9', 
    destinations: [mockDestinations[0], mockDestinations[10]] 
  },
  { 
    id: 'b2', 
    name: 'Brooklyn Bin', 
    color: '#10b981', 
    destinations: [mockDestinations[1], mockDestinations[11]] 
  },
  { 
    id: 'b3', 
    name: 'Queens Bin', 
    color: '#f59e0b', 
    destinations: [mockDestinations[2], mockDestinations[9]] 
  },
  { 
    id: 'b4', 
    name: 'Bronx Bin', 
    color: '#ef4444', 
    destinations: [mockDestinations[3]] 
  },
  { 
    id: 'b5', 
    name: 'Staten Island Bin', 
    color: '#8b5cf6', 
    destinations: [mockDestinations[4]] 
  },
  { 
    id: 'b6', 
    name: 'New Jersey Bin', 
    color: '#ec4899', 
    destinations: [mockDestinations[5], mockDestinations[6], mockDestinations[7]] 
  },
  { id: 'b7', name: 'Westchester Bin', color: '#6366f1', destinations: [mockDestinations[8]] },
  { id: 'b8', name: 'Empty Bin', color: '#71717a', destinations: [] },
];

// Create conveyors with bins assigned
export const mockConveyors: Conveyor[] = [
  { id: 'c1', name: 'NYC Conveyor', bins: [mockBins[0], mockBins[1], mockBins[2], mockBins[3], mockBins[4]] },
  { id: 'c2', name: 'NJ Conveyor', bins: [mockBins[5]] },
  { id: 'c3', name: 'Suburban Conveyor', bins: [mockBins[6]] },
  { id: 'c4', name: 'Unassigned Conveyor', bins: [mockBins[7]] }
];

// Create facilities with conveyors assigned
export const mockFacilities: Facility[] = [
  { 
    id: 'f1', 
    name: 'Main Sort Facility', 
    location: 'Queens, NY',
    conveyors: [mockConveyors[0], mockConveyors[1]] 
  },
  { 
    id: 'f2', 
    name: 'Secondary Sort Facility', 
    location: 'Newark, NJ',
    conveyors: [mockConveyors[2]] 
  },
  { 
    id: 'f3', 
    name: 'New Facility (Empty)', 
    location: 'Secaucus, NJ',
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
