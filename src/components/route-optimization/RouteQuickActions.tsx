
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Settings2 } from "lucide-react";

const RouteQuickActions = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Settings2 className="h-4 w-4 mr-2" />
            Optimize All Routes
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Add Delivery Point
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteQuickActions;
