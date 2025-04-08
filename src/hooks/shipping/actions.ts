
import { FinishedGood, TransportOption, ShippingPlan, IntermodalConnection, IntermodalRoute } from '@/types/shipping';
import { ShippingStore } from './types';

export const createShippingActions = (set: any): Pick<ShippingStore, 
  'addFinishedGood' | 
  'addTransportOption' | 
  'addShippingPlan' | 
  'removeShippingPlan' | 
  'updateTransportStatus' |
  'addIntermodalConnection' |
  'addIntermodalRoute'> => ({
  
  addFinishedGood: (good: FinishedGood) => set((state: ShippingStore) => ({
    finishedGoods: [...state.finishedGoods, good]
  })),
  
  addTransportOption: (option: TransportOption) => set((state: ShippingStore) => ({
    transportOptions: [...state.transportOptions, option]
  })),
  
  addShippingPlan: (plan: ShippingPlan) => set((state: ShippingStore) => ({
    shippingPlans: [...state.shippingPlans, plan]
  })),
  
  removeShippingPlan: (id: string) => set((state: ShippingStore) => ({
    shippingPlans: state.shippingPlans.filter(plan => plan.id !== id)
  })),
  
  updateTransportStatus: (id: string, status: 'available' | 'reserved') => set((state: ShippingStore) => ({
    transportOptions: state.transportOptions.map(option =>
      option.id === id ? { ...option, status } : option
    )
  })),
  
  addIntermodalConnection: (connection: IntermodalConnection) => set((state: ShippingStore) => ({
    intermodalConnections: [...(state.intermodalConnections || []), connection]
  })),
  
  addIntermodalRoute: (route: IntermodalRoute) => set((state: ShippingStore) => ({
    intermodalRoutes: [...(state.intermodalRoutes || []), route]
  }))
});
