
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Settings2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import RouteMap from "@/components/maps/RouteMap";
import { Route, Vehicle, RoutePoint } from "@/components/maps/types";
import RouteQuickActions from "./RouteQuickActions";

interface RouteMapViewProps {
  routes: Route[];
  vehicles: Vehicle[];
  points: RoutePoint[];
}

const RouteMapView = ({ routes, vehicles, points }: RouteMapViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3">
        <Card>
          <CardContent className="p-0">
            <div className="relative h-[70vh]">
              <RouteMap
                routes={routes}
                vehicles={vehicles}
                points={points}
                height="70vh"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="space-y-4">
          <RouteQuickActions />
          <VehicleList vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
};

const VehicleList = ({ vehicles }: { vehicles: Vehicle[] }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">Active Vehicles</h3>
        <div className="space-y-2">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between p-2 border rounded-md">
              <div>
                <p className="font-medium">{vehicle.name}</p>
                <p className="text-xs text-muted-foreground">
                  {vehicle.status === "delivering" ? "On Route" : "Returning"} • {vehicle.packages} packages
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Track</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Reassign</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteMapView;
