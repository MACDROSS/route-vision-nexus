
import { 
  LayoutDashboard, 
  TruckIcon, 
  Users, 
  Zap,
  Map,
  FileStack,
  Network,
  Factory,
  Ship,
  BoxesIcon,
  BarChart3,
  Shield,
  Building,
  Calendar,
  MoveHorizontal,
  PackageOpen,
  HelpCircle,
  Settings
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const featureCards = [
    {
      title: "Route Optimization",
      description: "Optimize delivery routes to reduce costs and improve efficiency",
      icon: <Map className="h-8 w-8 text-blue-500" />,
      href: "/route-optimization",
      color: "bg-blue-50"
    },
    {
      title: "Data Catalog",
      description: "Browse, visualize, and extract network data",
      icon: <FileStack className="h-8 w-8 text-indigo-500" />,
      href: "/data-catalog",
      color: "bg-indigo-50"
    },
    {
      title: "Scenarios",
      description: "Create and compare multiple logistics scenarios",
      icon: <Network className="h-8 w-8 text-purple-500" />,
      href: "/scenarios",
      color: "bg-purple-50"
    },
    {
      title: "Production Planning",
      description: "Schedule and optimize production processes",
      icon: <Factory className="h-8 w-8 text-green-500" />,
      href: "/production-planning",
      color: "bg-green-50"
    },
    {
      title: "Shipping",
      description: "Manage shipping and transportation operations",
      icon: <Ship className="h-8 w-8 text-cyan-500" />,
      href: "/shipping-transportation",
      color: "bg-cyan-50"
    },
    {
      title: "Load Plans",
      description: "Optimize cargo loading and planning",
      icon: <BoxesIcon className="h-8 w-8 text-teal-500" />,
      href: "/load-plans",
      color: "bg-teal-50"
    },
    {
      title: "Analytics",
      description: "Analyze performance metrics across operations",
      icon: <BarChart3 className="h-8 w-8 text-orange-500" />,
      href: "/analytics",
      color: "bg-orange-50"
    },
    {
      title: "Compliance",
      description: "Monitor regulatory compliance for deliveries",
      icon: <Shield className="h-8 w-8 text-red-500" />,
      href: "/compliance-monitoring",
      color: "bg-red-50"
    },
    {
      title: "Fleet Management",
      description: "Monitor and manage delivery vehicles",
      icon: <TruckIcon className="h-8 w-8 text-amber-500" />,
      href: "/fleet",
      color: "bg-amber-50"
    },
    {
      title: "Package Tracking",
      description: "Track packages in real-time throughout delivery",
      icon: <PackageOpen className="h-8 w-8 text-emerald-500" />,
      href: "/package-tracking",
      color: "bg-emerald-50"
    },
    {
      title: "Facilities",
      description: "Manage distribution centers and warehouses",
      icon: <Building className="h-8 w-8 text-slate-500" />,
      href: "/facilities",
      color: "bg-slate-50"
    },
    {
      title: "Facility Schedule",
      description: "Monitor arrivals and departures for facilities",
      icon: <Calendar className="h-8 w-8 text-pink-500" />,
      href: "/facility-schedule",
      color: "bg-pink-50"
    },
    {
      title: "Sort Planning",
      description: "Optimize package sorting operations",
      icon: <MoveHorizontal className="h-8 w-8 text-violet-500" />,
      href: "/sort-planning",
      color: "bg-violet-50"
    },
    {
      title: "Personnel",
      description: "Manage driver schedules and assignments",
      icon: <Users className="h-8 w-8 text-pink-500" />,
      href: "/personnel",
      color: "bg-fuchsia-50"
    }
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Courier Network Digital Twin</h1>
        <p className="text-muted-foreground">
          Welcome to the logistics management platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Deliveries"
          value="124"
          icon={<PackageOpen className="h-5 w-5" />}
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

      <h2 className="text-2xl font-semibold mb-4">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {featureCards.map((card) => (
          <Link to={card.href} key={card.title}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className={`p-6 flex flex-col items-center text-center ${card.color} h-full`}>
                <div className="rounded-full p-3 mb-4">
                  {card.icon}
                </div>
                <h3 className="font-medium text-lg mb-1">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-between mt-6">
        <Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <HelpCircle className="h-5 w-5" />
          <span>Help & Documentation</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Index;
