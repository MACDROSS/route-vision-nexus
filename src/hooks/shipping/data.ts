import { FinishedGood, TransportOption, ShippingPlan, IntermodalConnection, IntermodalRoute, Customer, CustomerTrend, CustomerAlert } from '@/types/shipping';
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

export const initialIntermodalConnections: IntermodalConnection[] = [
  {
    id: 'conn-001',
    sourceId: 'transport-1',
    destinationId: 'transport-3',
    transferTime: 4,
    transferCost: 350,
    transferLocation: 'Chicago Intermodal Terminal'
  },
  {
    id: 'conn-002',
    sourceId: 'transport-3',
    destinationId: 'transport-5',
    transferTime: 6,
    transferCost: 500,
    transferLocation: 'New York Port Authority'
  },
  {
    id: 'conn-003',
    sourceId: 'transport-7',
    destinationId: 'transport-4',
    transferTime: 3,
    transferCost: 650,
    transferLocation: 'Denver Air-Freight Center'
  },
  {
    id: 'conn-004',
    sourceId: 'transport-6',
    destinationId: 'transport-8',
    transferTime: 2,
    transferCost: 200,
    transferLocation: 'Atlanta Rail Hub'
  }
];

export const initialIntermodalRoutes: IntermodalRoute[] = [
  {
    id: 'route-001',
    name: 'Midwest to East Coast',
    transportSegments: ['transport-1', 'transport-3', 'transport-5'],
    connections: ['conn-001', 'conn-002'],
    totalTime: 96,
    totalCost: 8200,
    totalDistance: 1450
  },
  {
    id: 'route-002',
    name: 'West to Midwest Express',
    transportSegments: ['transport-7', 'transport-4'],
    connections: ['conn-003'],
    totalTime: 18,
    totalCost: 5000,
    totalDistance: 1100
  },
  {
    id: 'route-003',
    name: 'Southern Rail Connection',
    transportSegments: ['transport-6', 'transport-8'],
    connections: ['conn-004'],
    totalTime: 32,
    totalCost: 3500,
    totalDistance: 850
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'customer-001',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    contactEmail: 'logistics@amazon.com',
    priority: 'high',
    industry: 'E-commerce'
  },
  {
    id: 'customer-002',
    name: 'Walmart',
    contactEmail: 'supply-chain@walmart.com',
    priority: 'high',
    industry: 'Retail'
  },
  {
    id: 'customer-003',
    name: 'Target',
    contactEmail: 'logistics@target.com',
    priority: 'medium',
    industry: 'Retail'
  },
  {
    id: 'customer-004',
    name: 'Home Depot',
    contactEmail: 'freight@homedepot.com',
    priority: 'medium',
    industry: 'Home Improvement'
  }
];

export const initialCustomerTrends: CustomerTrend[] = [
  {
    id: 'trend-001',
    customerId: 'customer-001',
    metric: 'on_time_delivery',
    value: 94.2,
    previousValue: 92.1,
    changePercent: 2.1,
    timestamp: createDate(-30),
    status: 'improving'
  },
  {
    id: 'trend-002',
    customerId: 'customer-001',
    metric: 'on_time_delivery',
    value: 95.7,
    previousValue: 94.2,
    changePercent: 1.5,
    timestamp: createDate(-15),
    status: 'improving'
  },
  {
    id: 'trend-003',
    customerId: 'customer-001',
    metric: 'on_time_delivery',
    value: 97.1,
    previousValue: 95.7,
    changePercent: 1.4,
    timestamp: createDate(0),
    status: 'improving'
  },
  {
    id: 'trend-004',
    customerId: 'customer-001',
    metric: 'shipping_cost',
    value: 1250000,
    previousValue: 1300000,
    changePercent: -3.8,
    timestamp: createDate(-30),
    status: 'improving'
  },
  {
    id: 'trend-005',
    customerId: 'customer-001',
    metric: 'shipping_cost',
    value: 1220000,
    previousValue: 1250000,
    changePercent: -2.4,
    timestamp: createDate(-15),
    status: 'improving'
  },
  {
    id: 'trend-006',
    customerId: 'customer-001',
    metric: 'shipping_cost',
    value: 1280000,
    previousValue: 1220000,
    changePercent: 4.9,
    timestamp: createDate(0),
    status: 'declining'
  },
  {
    id: 'trend-007',
    customerId: 'customer-001',
    metric: 'volume',
    value: 87500,
    previousValue: 85000,
    changePercent: 2.9,
    timestamp: createDate(-30),
    status: 'improving'
  },
  {
    id: 'trend-008',
    customerId: 'customer-001',
    metric: 'volume',
    value: 92000,
    previousValue: 87500,
    changePercent: 5.1,
    timestamp: createDate(-15),
    status: 'improving'
  },
  {
    id: 'trend-009',
    customerId: 'customer-001',
    metric: 'volume',
    value: 98500,
    previousValue: 92000,
    changePercent: 7.1,
    timestamp: createDate(0),
    status: 'improving'
  },
  {
    id: 'trend-010',
    customerId: 'customer-001',
    metric: 'damages',
    value: 0.8,
    previousValue: 1.2,
    changePercent: -33.3,
    timestamp: createDate(-30),
    status: 'improving'
  },
  {
    id: 'trend-011',
    customerId: 'customer-001',
    metric: 'damages',
    value: 0.6,
    previousValue: 0.8,
    changePercent: -25.0,
    timestamp: createDate(-15),
    status: 'improving'
  },
  {
    id: 'trend-012',
    customerId: 'customer-001',
    metric: 'damages',
    value: 0.9,
    previousValue: 0.6,
    changePercent: 50.0,
    timestamp: createDate(0),
    status: 'declining'
  }
];

export const initialCustomerAlerts: CustomerAlert[] = [
  {
    id: 'alert-001',
    customerId: 'customer-001',
    title: 'Shipping Cost Increase',
    message: 'Amazon shipping costs have increased by 4.9% in the last period.',
    severity: 'medium',
    timestamp: createDate(0),
    isRead: false,
    relatedMetric: 'shipping_cost'
  },
  {
    id: 'alert-002',
    customerId: 'customer-001',
    title: 'Damage Rate Increase',
    message: 'Product damage rate for Amazon shipments has increased by 50% in the last period.',
    severity: 'high',
    timestamp: createDate(0),
    isRead: false,
    relatedMetric: 'damages'
  },
  {
    id: 'alert-003',
    customerId: 'customer-001',
    title: 'Record Volume Increase',
    message: 'Amazon shipping volume has increased by 7.1% reaching a new record high.',
    severity: 'low',
    timestamp: createDate(-1),
    isRead: true,
    relatedMetric: 'volume'
  },
  {
    id: 'alert-004',
    customerId: 'customer-001',
    title: 'On-Time Delivery Improvement',
    message: 'On-time delivery rate for Amazon has improved to 97.1%, exceeding target of 95%.',
    severity: 'low',
    timestamp: createDate(-2),
    isRead: true,
    relatedMetric: 'on_time_delivery'
  }
];
