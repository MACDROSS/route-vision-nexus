import { useShippingStore } from "@/hooks/shipping/store";
import { Customer } from "@/types/shipping";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomerTrendCard from "./CustomerTrendCard";
import CustomerTrendsChart from "./CustomerTrendsChart";
import CustomerAlertsList from "./CustomerAlertsList";
import { Badge } from "@/components/ui/badge";

interface CustomerTrendsSummaryProps {
  customerId: string;
  fullView?: boolean;
}

const CustomerTrendsSummary = ({ customerId, fullView = false }: CustomerTrendsSummaryProps) => {
  const { customers, customerTrends, customerAlerts } = useShippingStore();
  
  const customer = customers.find(c => c.id === customerId);
  
  if (!customer) {
    return <div>Customer not found</div>;
  }

  const filteredTrends = customerTrends.filter(trend => trend.customerId === customerId);
  const latestTrends = [...filteredTrends]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .reduce((acc, trend) => {
      // Keep only the latest trend for each metric
      if (!acc.some(t => t.metric === trend.metric)) {
        acc.push(trend);
      }
      return acc;
    }, [] as typeof filteredTrends);

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-300",
    medium: "bg-amber-100 text-amber-800 border-amber-300",
    low: "bg-green-100 text-green-800 border-green-300"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            {customer.logo && <AvatarImage src={customer.logo} alt={customer.name} />}
            <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p className="text-sm text-muted-foreground">{customer.industry}</p>
          </div>
        </div>
        <Badge variant="outline" className={priorityColors[customer.priority]}>
          {customer.priority.charAt(0).toUpperCase() + customer.priority.slice(1)} Priority
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestTrends.map(trend => (
          <CustomerTrendCard key={trend.id} trend={trend} />
        ))}
      </div>

      {fullView ? (
        <Tabs defaultValue="charts">
          <TabsList className="mb-4">
            <TabsTrigger value="charts">Trend Charts</TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-800">
                {customerAlerts.filter(a => a.customerId === customerId && !a.isRead).length}
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomerTrendsChart
                trends={filteredTrends}
                metric="on_time_delivery"
              />
              <CustomerTrendsChart
                trends={filteredTrends}
                metric="shipping_cost"
              />
              <CustomerTrendsChart
                trends={filteredTrends}
                metric="volume"
              />
              <CustomerTrendsChart
                trends={filteredTrends}
                metric="damages"
              />
            </div>
          </TabsContent>
          <TabsContent value="alerts">
            <CustomerAlertsList customerId={customerId} showTitle={false} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Latest Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerTrendsChart
                trends={filteredTrends.filter(t => t.metric === 'on_time_delivery')}
                metric="on_time_delivery"
              />
            </CardContent>
          </Card>
          <CustomerAlertsList 
            customerId={customerId} 
            limit={3} 
          />
        </div>
      )}
    </div>
  );
};

export default CustomerTrendsSummary;
