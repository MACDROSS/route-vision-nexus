
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for recent activities
const activities = [
  {
    id: 1,
    type: "package",
    description: "Package #45782 delivered to customer",
    time: "5 minutes ago",
    icon: Package
  },
  {
    id: 2,
    type: "route",
    description: "Route #32 optimized for Truck 101",
    time: "12 minutes ago",
    icon: Truck
  },
  {
    id: 3,
    type: "user",
    description: "Dispatcher assigned 5 new deliveries",
    time: "25 minutes ago",
    icon: User
  },
  {
    id: 4,
    type: "package",
    description: "Package #45123 out for delivery",
    time: "45 minutes ago",
    icon: Package
  },
  {
    id: 5,
    type: "route",
    description: "New optimization scenario created",
    time: "1 hour ago",
    icon: Truck
  }
];

const getIconColor = (type: string): string => {
  switch (type) {
    case "package":
      return "text-yellow-500";
    case "route":
      return "text-logistics-600";
    case "user":
      return "text-courier-600";
    default:
      return "text-gray-500";
  }
};

const getBackgroundColor = (type: string): string => {
  switch (type) {
    case "package":
      return "bg-yellow-100";
    case "route":
      return "bg-logistics-100";
    case "user":
      return "bg-courier-100";
    default:
      return "bg-gray-100";
  }
};

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`mt-0.5 h-8 w-8 rounded-full ${getBackgroundColor(activity.type)} flex items-center justify-center ${getIconColor(activity.type)}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
