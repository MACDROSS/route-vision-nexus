
import { create } from 'zustand';
import { FinishedGood, TransportOption, ShippingPlan } from '@/types/shipping';
import { addDays } from 'date-fns';

interface ShippingStore {
  finishedGoods: FinishedGood[];
  transportOptions: TransportOption[];
  shippingPlans: ShippingPlan[];
  addFinishedGood: (good: FinishedGood) => void;
  addTransportOption: (option: TransportOption) => void;
  addShippingPlan: (plan: ShippingPlan) => void;
  removeShippingPlan: (id: string) => void;
  updateTransportStatus: (id: string, status: 'available' | 'reserved') => void;
}

export const useShippingStore = create<ShippingStore>((set) => ({
  finishedGoods: [],
  transportOptions: [
    {
      id: 'transport-1',
      name: 'Freight Truck #1',
      type: 'truck',
      capacity: 120,
      availableDate: new Date(),
      status: 'available',
      cost: 1200
    },
    {
      id: 'transport-2',
      name: 'Freight Truck #2',
      type: 'truck',
      capacity: 150,
      availableDate: addDays(new Date(), 1),
      status: 'available',
      cost: 1400
    },
    {
      id: 'transport-3',
      name: 'Rail Shipment',
      type: 'rail',
      capacity: 300,
      availableDate: addDays(new Date(), 2),
      status: 'available',
      cost: 2800
    },
    {
      id: 'transport-4',
      name: 'Express Air Cargo',
      type: 'air',
      capacity: 75,
      availableDate: addDays(new Date(), 1),
      status: 'available',
      cost: 3500
    },
    {
      id: 'transport-5',
      name: 'Container Ship',
      type: 'sea',
      capacity: 800,
      availableDate: addDays(new Date(), 5),
      status: 'available',
      cost: 4200
    }
  ],
  shippingPlans: [],
  
  addFinishedGood: (good) => set((state) => ({
    finishedGoods: [...state.finishedGoods, good]
  })),
  
  addTransportOption: (option) => set((state) => ({
    transportOptions: [...state.transportOptions, option]
  })),
  
  addShippingPlan: (plan) => set((state) => ({
    shippingPlans: [...state.shippingPlans, plan]
  })),
  
  removeShippingPlan: (id) => set((state) => ({
    shippingPlans: state.shippingPlans.filter(plan => plan.id !== id)
  })),
  
  updateTransportStatus: (id, status) => set((state) => ({
    transportOptions: state.transportOptions.map(option =>
      option.id === id ? { ...option, status } : option
    )
  }))
}));
