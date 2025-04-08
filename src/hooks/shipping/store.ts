
import { create } from 'zustand';
import { ShippingStore } from './types';
import { initialFinishedGoods, initialTransportOptions, initialShippingPlans } from './data';
import { createShippingActions } from './actions';

export const useShippingStore = create<ShippingStore>((set) => ({
  finishedGoods: initialFinishedGoods,
  transportOptions: initialTransportOptions,
  shippingPlans: initialShippingPlans,
  ...createShippingActions(set)
}));
