
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FinishedGoodsAvailability from "@/components/shipping/FinishedGoodsAvailability";
import TransportationAvailability from "@/components/shipping/TransportationAvailability";
import ShippingCalendar from "@/components/shipping/ShippingCalendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useShippingStore } from "@/hooks/useShippingStore";
import { format } from "date-fns";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";

const ShippingTransportation = () => {
  const { shippingPlans, finishedGoods, transportOptions } = useShippingStore();
  
  const getFinishedGoodName = (id: string) => {
    const good = finishedGoods.find(g => g.id === id);
    return good ? good.productName : "Unknown Product";
  };
  
  const getTransportName = (id: string) => {
    const transport = transportOptions.find(t => t.id === id);
    return transport ? transport.name : "Unknown Transport";
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'planned':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'in-transit':
        return <Truck className="h-4 w-4 text-amber-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in-transit':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Shipping & Transportation</h1>
        <p className="text-muted-foreground">
          View finished goods availability and schedule transportation resources
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="finished-goods">Finished Goods</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="shipping-plans">Shipping Plans</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinishedGoodsAvailability />
            <TransportationAvailability />
          </div>
          <ShippingCalendar className="mt-6" />
        </TabsContent>
        
        <TabsContent value="finished-goods">
          <FinishedGoodsAvailability fullView={true} />
        </TabsContent>
        
        <TabsContent value="transportation">
          <TransportationAvailability fullView={true} />
        </TabsContent>
        
        <TabsContent value="planning">
          <ShippingCalendar fullView={true} />
        </TabsContent>
        
        <TabsContent value="shipping-plans">
          <Card className="min-h-[calc(100vh-16rem)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  <span>Shipping Plans</span>
                </div>
                <Badge variant="outline">{shippingPlans.length} Plans</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="space-y-4">
                  {shippingPlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className="border rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-medium">{getFinishedGoodName(plan.finishedGoodId)}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>Transport: {getTransportName(plan.transportOptionId)}</div>
                          <div>Quantity: {plan.quantity} units</div>
                          <div>Date: {format(plan.scheduledDate, 'MMM dd, yyyy')}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(plan.status)}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(plan.status)}
                            <span className="capitalize">{plan.status}</span>
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ShippingTransportation;
