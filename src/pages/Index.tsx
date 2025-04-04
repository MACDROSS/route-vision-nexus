
import { 
  Package, 
  TruckIcon, 
  Users, 
  Zap 
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import RouteOverviewMap from "@/components/dashboard/RouteOverviewMap";
import DeliveryMetrics from "@/components/dashboard/DeliveryMetrics";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RouteOptimizer from "@/components/route-optimization/RouteOptimizer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Courier Network Digital Twin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Deliveries"
          value="124"
          icon={<Package className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Vehicles on Route"
          value="32"
          icon={<TruckIcon className="h-5 w-5" />}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Active Couriers"
          value="48"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Efficiency Score"
          value="94%"
          icon={<Zap className="h-5 w-5" />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 h-[400px]">
          <RouteOverviewMap />
        </div>
        <div className="h-[400px]">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="h-[350px]">
          <DeliveryMetrics />
        </div>
        <div className="h-[350px]">
          <RouteOptimizer />
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link to="/data-catalog">View Data Catalog</Link>
        </Button>
        <Button asChild>
          <Link to="/scenarios">Manage Scenarios</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default Index;
