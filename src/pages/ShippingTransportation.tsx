
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FinishedGoodsAvailability from "@/components/shipping/FinishedGoodsAvailability";
import TransportationAvailability from "@/components/shipping/TransportationAvailability";
import ShippingCalendar from "@/components/shipping/ShippingCalendar";

const ShippingTransportation = () => {
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
      </Tabs>
    </MainLayout>
  );
};

export default ShippingTransportation;
