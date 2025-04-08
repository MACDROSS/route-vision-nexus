
import { FinishedGood, TransportOption, ShippingPlan, IntermodalConnection, IntermodalRoute, Customer, CustomerTrend, CustomerAlert } from '@/types/shipping';

export interface ShippingStore {
  finishedGoods: FinishedGood[];
  transportOptions: TransportOption[];
  shippingPlans: ShippingPlan[];
  intermodalConnections: IntermodalConnection[];
  intermodalRoutes: IntermodalRoute[];
  customers: Customer[];
  customerTrends: CustomerTrend[];
  customerAlerts: CustomerAlert[];
  addFinishedGood: (good: FinishedGood) => void;
  addTransportOption: (option: TransportOption) => void;
  addShippingPlan: (plan: ShippingPlan) => void;
  removeShippingPlan: (id: string) => void;
  updateTransportStatus: (id: string, status: 'available' | 'reserved') => void;
  addIntermodalConnection: (connection: IntermodalConnection) => void;
  addIntermodalRoute: (route: IntermodalRoute) => void;
  addCustomerAlert: (alert: CustomerAlert) => void;
  markAlertAsRead: (id: string) => void;
  addCustomerTrend: (trend: CustomerTrend) => void;
}
