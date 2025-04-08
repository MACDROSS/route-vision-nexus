
import { create } from 'zustand';
import { ShippingStore } from './types';
import { 
  initialFinishedGoods, 
  initialTransportOptions, 
  initialShippingPlans, 
  initialIntermodalConnections,
  initialIntermodalRoutes
} from './data';
import { createShippingActions } from './actions';

export const useShippingStore = create<ShippingStore>((set) => ({
  finishedGoods: initialFinishedGoods,
  transportOptions: initialTransportOptions,
  shippingPlans: initialShippingPlans,
  intermodalConnections: initialIntermodalConnections,
  intermodalRoutes: initialIntermodalRoutes,
  ...createShippingActions(set)
}));
