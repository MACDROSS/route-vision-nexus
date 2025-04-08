
import { FinishedGood, TransportOption, ShippingPlan } from '@/types/shipping';

export interface ShippingStore {
  finishedGoods: FinishedGood[];
  transportOptions: TransportOption[];
  shippingPlans: ShippingPlan[];
  addFinishedGood: (good: FinishedGood) => void;
  addTransportOption: (option: TransportOption) => void;
  addShippingPlan: (plan: ShippingPlan) => void;
  removeShippingPlan: (id: string) => void;
  updateTransportStatus: (id: string, status: 'available' | 'reserved') => void;
}
