
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
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText, MapPin, Package, PieChart, Route, Truck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ShippingTransportation = () => {
  const { shippingPlans, finishedGoods, transportOptions } = useShippingStore();
  
  // Helper functions
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

  // Summary statistics
  const totalFinishedGoods = finishedGoods.reduce((sum, good) => sum + good.quantity, 0);
  const totalTransportCapacity = transportOptions.reduce((sum, option) => sum + option.capacity, 0);
  const totalShippingPlanned = shippingPlans.reduce((sum, plan) => sum + plan.quantity, 0);
  const availableTransportOptions = transportOptions.filter(option => option.status === 'available').length;
  
  // Transportation type breakdown
  const transportTypes = transportOptions.reduce((acc, option) => {
    if (!acc[option.type]) {
      acc[option.type] = { count: 0, capacity: 0 };
    }
    acc[option.type].count++;
    acc[option.type].capacity += option.capacity;
    return acc;
  }, {} as Record<string, { count: number; capacity: number }>);

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
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Finished Goods</p>
                    <p className="text-2xl font-bold">{totalFinishedGoods}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transport Capacity</p>
                    <p className="text-2xl font-bold">{totalTransportCapacity}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping Planned</p>
                    <p className="text-2xl font-bold">{totalShippingPlanned}</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Transport</p>
                    <p className="text-2xl font-bold">{availableTransportOptions}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <FinishedGoodsAvailability />
            <TransportationAvailability />
          </div>

          {/* Transportation Types Table */}
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Route className="mr-2 h-5 w-5 text-indigo-500" />
                  <span>Transportation Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transport Type</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Total Capacity</TableHead>
                      <TableHead>Avg. Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(transportTypes).map(([type, data]) => {
                      const typeOptions = transportOptions.filter(option => option.type === type);
                      const avgCost = typeOptions.reduce((sum, opt) => sum + (opt.cost || 0), 0) / typeOptions.length;
                      
                      return (
                        <TableRow key={type}>
                          <TableCell className="font-medium capitalize">{type}</TableCell>
                          <TableCell>{data.count}</TableCell>
                          <TableCell>{data.capacity}</TableCell>
                          <TableCell>${avgCost.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Recent Shipping Plans */}
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-pink-500" />
                    <span>Recent Shipping Plans</span>
                  </div>
                  <Badge variant="outline">
                    {shippingPlans.length} Plans
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[240px]">
                  <div className="space-y-4">
                    {shippingPlans.slice(0, 5).map((plan) => (
                      <div 
                        key={plan.id} 
                        className="border rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <h3 className="font-medium">{getFinishedGoodName(plan.finishedGoodId)}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-2">
                              <Truck className="h-3.5 w-3.5" />
                              <span>{getTransportName(plan.transportOptionId)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="h-3.5 w-3.5" /> 
                              <span>{plan.quantity} units</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{format(plan.scheduledDate, 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
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
          </div>

          <ShippingCalendar className="mt-6" />

          {/* Alerts Section */}
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                <span>Shipping Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {totalFinishedGoods > totalTransportCapacity && (
                  <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-3" />
                    <div>
                      <p className="font-medium">Transport capacity shortage</p>
                      <p className="text-sm text-muted-foreground">
                        Total finished goods ({totalFinishedGoods} units) exceed available transport capacity ({totalTransportCapacity} units).
                      </p>
                    </div>
                  </div>
                )}
                
                {transportOptions.filter(opt => opt.status === 'reserved').length > 0 && (
                  <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium">Reserved transport resources</p>
                      <p className="text-sm text-muted-foreground">
                        {transportOptions.filter(opt => opt.status === 'reserved').length} transport options are currently reserved.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
