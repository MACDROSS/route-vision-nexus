
import { create } from 'zustand';
import { ShippingStore } from './types';
import { 
  initialFinishedGoods, 
  initialTransportOptions, 
  initialShippingPlans, 
  initialIntermodalConnections,
  initialIntermodalRoutes,
  initialCustomers,
  initialCustomerTrends,
  initialCustomerAlerts
} from './data';
import { createShippingActions } from './actions';

export const useShippingStore = create<ShippingStore>((set) => ({
  finishedGoods: initialFinishedGoods,
  transportOptions: initialTransportOptions,
  shippingPlans: initialShippingPlans,
  intermodalConnections: initialIntermodalConnections,
  intermodalRoutes: initialIntermodalRoutes,
  customers: initialCustomers,
  customerTrends: initialCustomerTrends,
  customerAlerts: initialCustomerAlerts,
  ...createShippingActions(set)
}));
