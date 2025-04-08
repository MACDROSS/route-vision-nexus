
import { FinishedGood, TransportOption, ShippingPlan } from '@/types/shipping';
import { addDays } from 'date-fns';

// Helper function to create a date with just the day part changed
export const createDate = (daysToAdd: number) => {
  return addDays(new Date(), daysToAdd);
};

export const initialFinishedGoods: FinishedGood[] = [
  {
    id: 'fg-001',
    productName: 'Premium Widgets',
    quantity: 150,
    availableDate: createDate(0),
    processId: 'process-1',
    color: '#4CAF50'
  },
  {
    id: 'fg-002',
    productName: 'Standard Components',
    quantity: 200,
    availableDate: createDate(1),
    processId: 'process-2',
    color: '#2196F3'
  },
  {
    id: 'fg-003',
    productName: 'Deluxe Assemblies',
    quantity: 75,
    availableDate: createDate(2),
    processId: 'process-3',
    color: '#FF9800'
  },
  {
    id: 'fg-004',
    productName: 'Industrial Parts',
    quantity: 120,
    availableDate: createDate(3),
    processId: 'process-4',
    color: '#9C27B0'
  },
  {
    id: 'fg-005',
    productName: 'Custom Electronics',
    quantity: 50,
    availableDate: createDate(4),
    processId: 'process-5',
    color: '#E91E63'
  },
  {
    id: 'fg-006',
    productName: 'Precision Tools',
    quantity: 80,
    availableDate: createDate(5),
    processId: 'process-6',
    color: '#607D8B'
  },
  {
    id: 'fg-007',
    productName: 'Specialized Components',
    quantity: 100,
    availableDate: createDate(6),
    processId: 'process-7',
    color: '#795548'
  }
];

export const initialTransportOptions: TransportOption[] = [
  {
    id: 'transport-1',
    name: 'Freight Truck #1',
    type: 'truck',
    capacity: 120,
    availableDate: createDate(0),
    status: 'available',
    cost: 1200
  },
  {
    id: 'transport-2',
    name: 'Freight Truck #2',
    type: 'truck',
    capacity: 150,
    availableDate: createDate(1),
    status: 'reserved',
    cost: 1400
  },
  {
    id: 'transport-3',
    name: 'Rail Shipment',
    type: 'rail',
    capacity: 300,
    availableDate: createDate(2),
    status: 'available',
    cost: 2800
  },
  {
    id: 'transport-4',
    name: 'Express Air Cargo',
    type: 'air',
    capacity: 75,
    availableDate: createDate(1),
    status: 'available',
    cost: 3500
  },
  {
    id: 'transport-5',
    name: 'Container Ship',
    type: 'sea',
    capacity: 800,
    availableDate: createDate(5),
    status: 'available',
    cost: 4200
  },
  {
    id: 'transport-6',
    name: 'Local Delivery Van',
    type: 'truck',
    capacity: 50,
    availableDate: createDate(0),
    status: 'available',
    cost: 800
  },
  {
    id: 'transport-7',
    name: 'Freight Truck #3',
    type: 'truck',
    capacity: 140,
    availableDate: createDate(3),
    status: 'available',
    cost: 1350
  },
  {
    id: 'transport-8',
    name: 'Express Rail',
    type: 'rail',
    capacity: 250,
    availableDate: createDate(4),
    status: 'available',
    cost: 2500
  },
  {
    id: 'transport-9',
    name: 'Cargo Plane',
    type: 'air',
    capacity: 100,
    availableDate: createDate(6),
    status: 'available',
    cost: 4000
  }
];

export const initialShippingPlans: ShippingPlan[] = [
  {
    id: 'plan-001',
    finishedGoodId: 'fg-001',
    transportOptionId: 'transport-2',
    quantity: 100,
    scheduledDate: createDate(1),
    status: 'planned'
  },
  {
    id: 'plan-002',
    finishedGoodId: 'fg-002',
    transportOptionId: 'transport-3',
    quantity: 150,
    scheduledDate: createDate(2),
    status: 'planned'
  },
  {
    id: 'plan-003',
    finishedGoodId: 'fg-004',
    transportOptionId: 'transport-7',
    quantity: 75,
    scheduledDate: createDate(3),
    status: 'planned'
  },
  {
    id: 'plan-004',
    finishedGoodId: 'fg-003',
    transportOptionId: 'transport-4',
    quantity: 50,
    scheduledDate: createDate(1),
    status: 'in-transit'
  },
  {
    id: 'plan-005',
    finishedGoodId: 'fg-006',
    transportOptionId: 'transport-8',
    quantity: 80,
    scheduledDate: createDate(4),
    status: 'planned'
  }
];
