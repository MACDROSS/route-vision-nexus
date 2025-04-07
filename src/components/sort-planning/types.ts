
// Basic types for sort planning
export interface Destination {
  id: string;
  name: string;
  address: string;
  type: 'pickup' | 'delivery';
}

export interface Bin {
  id: string;
  name: string;
  color?: string;
  destinations: Destination[];
}

export interface Conveyor {
  id: string;
  name: string;
  bins: Bin[];
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  conveyors: Conveyor[];
}

// DnD types
export type ItemTypes = 'DESTINATION' | 'BIN' | 'CONVEYOR';

export interface DragItem {
  type: ItemTypes;
  id: string;
  index: number;
  parentId?: string;
}

// DnD context types
export interface SortPlanningContextType {
  facilities: Facility[];
  addDestinationToBin: (destinationId: string, binId: string) => void;
  removeDestinationFromBin: (destinationId: string, binId: string) => void;
  addBinToConveyor: (binId: string, conveyorId: string) => void;
  removeBinFromConveyor: (binId: string, conveyorId: string) => void;
  addConveyorToFacility: (conveyorId: string, facilityId: string) => void;
  removeConveyorFromFacility: (conveyorId: string, facilityId: string) => void;
  moveBin: (dragIndex: number, hoverIndex: number, conveyorId: string) => void;
  moveConveyor: (dragIndex: number, hoverIndex: number, facilityId: string) => void;
  moveDestination: (dragIndex: number, hoverIndex: number, binId: string) => void;
}
