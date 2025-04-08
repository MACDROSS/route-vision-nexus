
import { FinishedGood, TransportOption, ShippingPlan, IntermodalConnection, IntermodalRoute } from '@/types/shipping';

export interface ShippingStore {
  finishedGoods: FinishedGood[];
  transportOptions: TransportOption[];
  shippingPlans: ShippingPlan[];
  intermodalConnections: IntermodalConnection[];
  intermodalRoutes: IntermodalRoute[];
  addFinishedGood: (good: FinishedGood) => void;
  addTransportOption: (option: TransportOption) => void;
  addShippingPlan: (plan: ShippingPlan) => void;
  removeShippingPlan: (id: string) => void;
  updateTransportStatus: (id: string, status: 'available' | 'reserved') => void;
  addIntermodalConnection: (connection: IntermodalConnection) => void;
  addIntermodalRoute: (route: IntermodalRoute) => void;
}
