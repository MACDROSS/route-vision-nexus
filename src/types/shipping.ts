
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
