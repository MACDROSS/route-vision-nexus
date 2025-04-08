
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
  customerId?: string; // Added to track which customer this shipment is for
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

export interface Customer {
  id: string;
  name: string;
  logo?: string;
  contactEmail?: string;
  priority: 'high' | 'medium' | 'low';
  industry: string;
}

export interface CustomerTrend {
  id: string;
  customerId: string;
  metric: 'on_time_delivery' | 'shipping_cost' | 'volume' | 'damages';
  value: number;
  previousValue: number;
  changePercent: number;
  timestamp: Date;
  status: 'improving' | 'stable' | 'declining';
}

export interface CustomerAlert {
  id: string;
  customerId: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  isRead: boolean;
  relatedMetric?: string;
}
