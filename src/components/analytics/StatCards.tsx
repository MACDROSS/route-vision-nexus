
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Calendar, Users } from "lucide-react";

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Package className="h-5 w-5 text-muted-foreground mr-2" />
            <div className="text-2xl font-bold">3,482</div>
          </div>
          <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
            +12.5% from last month
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Fleet Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-muted-foreground mr-2" />
            <div className="text-2xl font-bold">82%</div>
          </div>
          <Badge className="mt-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            +2.1% from last month
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
            <div className="text-2xl font-bold">94.3%</div>
          </div>
          <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
            +1.8% from last month
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Driver Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-muted-foreground mr-2" />
            <div className="text-2xl font-bold">87.5%</div>
          </div>
          <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
            +3.2% from last month
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
