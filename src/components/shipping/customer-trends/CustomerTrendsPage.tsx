
import { useShippingStore } from "@/hooks/shipping/store";
import CustomerTrendsSummary from "./CustomerTrendsSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerAlertsList from "./CustomerAlertsList";
import { Badge } from "@/components/ui/badge";

interface CustomerTrendsPageProps {
  fullView?: boolean;
}

const CustomerTrendsPage = ({ fullView = false }: CustomerTrendsPageProps) => {
  const { customers, customerAlerts } = useShippingStore();
  const unreadAlerts = customerAlerts.filter(a => !a.isRead).length;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customer Trends Analysis</h2>
        {unreadAlerts > 0 && (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
            {unreadAlerts} unread alerts
          </Badge>
        )}
      </div>

      <Tabs defaultValue="amazon">
        <TabsList className="mb-4">
          {customers.map(customer => (
            <TabsTrigger key={customer.id} value={customer.id.replace('customer-', '')}>
              {customer.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {customers.map(customer => (
          <TabsContent 
            key={customer.id} 
            value={customer.id.replace('customer-', '')}
          >
            <CustomerTrendsSummary customerId={customer.id} fullView={fullView} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default CustomerTrendsPage;
