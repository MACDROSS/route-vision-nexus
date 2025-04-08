
export interface FinishedGood {
  id: string;
  productName: string;
  quantity: number;
  availableDate: Date;
  processId: string;
  color: string;
}

export interface TransportOption {
  id: string;
  name: string;
  type: 'truck' | 'rail' | 'air' | 'sea';
  capacity: number;
  availableDate: Date;
  status: 'available' | 'reserved';
  cost?: number;
}

export interface ShippingPlan {
  id: string;
  finishedGoodId: string;
  transportOptionId: string;
  quantity: number;
  scheduledDate: Date;
  status: 'planned' | 'in-transit' | 'delivered';
}

export interface IntermodalConnection {
  id: string;
  sourceId: string;
  destinationId: string;
  transferTime: number; // in hours
  transferCost: number;
  transferLocation: string;
}

export interface IntermodalRoute {
  id: string;
  name: string;
  transportSegments: string[]; // IDs of transport options in sequence
  connections: string[]; // IDs of connections between segments
  totalTime: number; // in hours
  totalCost: number;
  totalDistance: number; // in miles/km
}
