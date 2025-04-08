
import { LoadPlan } from '@/types/load-plans';
import { addDays, subDays } from 'date-fns';

// Mock data for load plans
export const mockLoadPlans: LoadPlan[] = [
  {
    id: '1',
    name: 'Northeast Distribution Plan',
    truckId: 'TRK-2023-A',
    createdAt: subDays(new Date(), 3),
    status: 'active',
    spaceUtilization: 92,
    products: [
      {
        id: 'p1',
        name: 'Electronics Box A',
        position: '0,0,0', // x,y,z coordinates
        dimensions: '2x3x2', // width x length x height
        weight: 45,
        color: '#3b82f6',
        sku: 'ELEC-001'
      },
      {
        id: 'p2',
        name: 'Furniture Package',
        position: '2,0,0',
        dimensions: '4x3x3',
        weight: 120,
        color: '#ef4444',
        sku: 'FURN-089'
      },
      {
        id: 'p3',
        name: 'Fragile Glassware',
        position: '6,0,0',
        dimensions: '2x2x2',
        weight: 30,
        color: '#10b981',
        sku: 'GLAS-102'
      },
      {
        id: 'p4',
        name: 'Books Pallet',
        position: '0,3,0',
        dimensions: '3x3x1',
        weight: 90,
        color: '#f59e0b',
        sku: 'BOOK-432'
      },
      {
        id: 'p5',
        name: 'Clothing Box',
        position: '3,3,0',
        dimensions: '3x3x2',
        weight: 50,
        color: '#8b5cf6',
        sku: 'CLTH-201'
      },
      {
        id: 'p6',
        name: 'Toys Package',
        position: '6,3,0',
        dimensions: '2x3x2',
        weight: 35,
        color: '#ec4899',
        sku: 'TOYS-305'
      },
      {
        id: 'p7',
        name: 'Kitchen Appliances',
        position: '0,6,0',
        dimensions: '4x2x3',
        weight: 75,
        color: '#14b8a6',
        sku: 'APPL-112'
      },
      {
        id: 'p8',
        name: 'Hardware Tools',
        position: '4,6,0',
        dimensions: '4x2x1',
        weight: 60,
        color: '#f97316',
        sku: 'TOOL-225'
      }
    ]
  },
  {
    id: '2',
    name: 'West Coast Shipment',
    truckId: 'TRK-2023-B',
    createdAt: subDays(new Date(), 1),
    status: 'scheduled',
    spaceUtilization: 78,
    products: [
      {
        id: 'p9',
        name: 'Outdoor Equipment',
        position: '0,0,0',
        dimensions: '5x3x3',
        weight: 150,
        color: '#6366f1',
        sku: 'OUTD-056'
      },
      {
        id: 'p10',
        name: 'Sports Gear',
        position: '5,0,0',
        dimensions: '3x3x2',
        weight: 85,
        color: '#a855f7',
        sku: 'SPRT-089'
      },
      {
        id: 'p11',
        name: 'Office Supplies',
        position: '0,3,0',
        dimensions: '4x4x2',
        weight: 70,
        color: '#06b6d4',
        sku: 'OFFC-145'
      },
      {
        id: 'p12',
        name: 'Art Supplies',
        position: '4,3,0',
        dimensions: '4x3x1',
        weight: 40,
        color: '#d946ef',
        sku: 'ARTS-078'
      }
    ]
  },
  {
    id: '3',
    name: 'Midwest Distribution',
    truckId: 'TRK-2023-C',
    createdAt: subDays(new Date(), 7),
    status: 'completed',
    spaceUtilization: 95,
    products: [
      {
        id: 'p13',
        name: 'Grocery Pallet A',
        position: '0,0,0',
        dimensions: '4x4x2',
        weight: 120,
        color: '#0ea5e9',
        sku: 'GROC-001'
      },
      {
        id: 'p14',
        name: 'Grocery Pallet B',
        position: '4,0,0',
        dimensions: '4x4x2',
        weight: 110,
        color: '#0ea5e9',
        sku: 'GROC-002'
      },
      {
        id: 'p15',
        name: 'Cleaning Supplies',
        position: '0,4,0',
        dimensions: '3x3x2',
        weight: 70,
        color: '#22c55e',
        sku: 'CLEN-087'
      },
      {
        id: 'p16',
        name: 'Pet Supplies',
        position: '3,4,0',
        dimensions: '3x3x2',
        weight: 60,
        color: '#eab308',
        sku: 'PETS-115'
      },
      {
        id: 'p17',
        name: 'Health Products',
        position: '6,4,0',
        dimensions: '2x3x2',
        weight: 45,
        color: '#3b82f6',
        sku: 'HLTH-221'
      }
    ]
  },
  {
    id: '4',
    name: 'Southern Route Template',
    truckId: 'TEMPLATE',
    createdAt: subDays(new Date(), 30),
    status: 'template',
    spaceUtilization: 88,
    products: [
      {
        id: 'p18',
        name: 'Large Items',
        position: '0,0,0',
        dimensions: '8x6x3',
        weight: 200,
        color: '#8b5cf6',
        sku: 'TEMP-001'
      },
      {
        id: 'p19',
        name: 'Medium Items',
        position: '0,6,0',
        dimensions: '8x2x3',
        weight: 120,
        color: '#ec4899',
        sku: 'TEMP-002'
      },
      {
        id: 'p20',
        name: 'Small Items',
        position: '0,8,0',
        dimensions: '8x2x1',
        weight: 80,
        color: '#f97316',
        sku: 'TEMP-003'
      }
    ]
  },
  {
    id: '5',
    name: 'Holiday Rush Shipment',
    truckId: 'TRK-2023-E',
    createdAt: addDays(new Date(), 3),
    status: 'scheduled',
    spaceUtilization: 90,
    products: [
      {
        id: 'p21',
        name: 'Gift Boxes A',
        position: '0,0,0',
        dimensions: '3x3x2',
        weight: 65,
        color: '#dc2626',
        sku: 'GIFT-001'
      },
      {
        id: 'p22',
        name: 'Gift Boxes B',
        position: '3,0,0',
        dimensions: '3x3x2',
        weight: 70,
        color: '#dc2626',
        sku: 'GIFT-002'
      },
      {
        id: 'p23',
        name: 'Holiday Decor',
        position: '6,0,0',
        dimensions: '2x3x3',
        weight: 55,
        color: '#16a34a',
        sku: 'DECR-087'
      },
      {
        id: 'p24',
        name: 'Electronics',
        position: '0,3,0',
        dimensions: '5x3x2',
        weight: 90,
        color: '#2563eb',
        sku: 'ELEC-456'
      },
      {
        id: 'p25',
        name: 'Toys Package',
        position: '5,3,0',
        dimensions: '3x3x2',
        weight: 60,
        color: '#9333ea',
        sku: 'TOYS-784'
      }
    ]
  }
];
