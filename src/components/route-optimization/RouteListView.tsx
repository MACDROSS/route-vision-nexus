
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const RouteListView = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Routes Overview</h3>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="space-y-3">
            {[
              { name: "Downtown Express", stops: 12, distance: "18.4 mi", time: "45 min", status: "Active" },
              { name: "North City Route", stops: 15, distance: "22.6 mi", time: "56 min", status: "Active" },
              { name: "Airport Delivery", stops: 8, distance: "15.2 mi", time: "38 min", status: "Active" },
              { name: "South Industrial", stops: 10, distance: "19.8 mi", time: "52 min", status: "Paused" },
            ].map((route, i) => (
              <RouteListItem key={i} route={route} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RouteItemProps {
  route: {
    name: string;
    stops: number;
    distance: string;
    time: string;
    status: string;
  }
}

const RouteListItem = ({ route }: RouteItemProps) => {
  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{route.name}</h4>
            <div className={`text-xs px-2 py-0.5 rounded-full ${
              route.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}>
              {route.status}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {route.stops} stops • {route.distance} • {route.time}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">View</Button>
          <Button size="sm" variant="outline">Optimize</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="text-center p-2 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Assigned</p>
          <p className="font-medium">Truck 101</p>
        </div>
        <div className="text-center p-2 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Packages</p>
          <p className="font-medium">24</p>
        </div>
        <div className="text-center p-2 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="font-medium">45%</p>
        </div>
      </div>
    </div>
  );
};

export default RouteListView;
