
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Database,
  Network,
  Factory,
  Ship,
  BarChart3,
  Shield,
  Truck,
  PackageOpen,
  Users,
  MoveHorizontal
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

export const FeatureOverview: React.FC = () => {
  const features = [
    {
      title: "Route Optimization",
      description: "Optimize delivery routes based on multiple factors including distance, time, and priority to reduce costs and improve delivery times.",
      icon: <MapPin className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Data Catalog",
      description: "Browse, visualize, and extract network data with powerful filtering and search capabilities across all your logistics data.",
      icon: <Database className="h-5 w-5 text-indigo-500" />
    },
    {
      title: "Scenario Planning",
      description: "Create and compare multiple logistics scenarios to evaluate different strategies before implementation.",
      icon: <Network className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Production Planning",
      description: "Schedule and optimize production processes to align with shipping and delivery requirements.",
      icon: <Factory className="h-5 w-5 text-green-500" />
    },
    {
      title: "Shipping & Transportation",
      description: "Manage shipping operations, track transportation availability, and monitor intermodal connections.",
      icon: <Ship className="h-5 w-5 text-cyan-500" />
    },
    {
      title: "Analytics",
      description: "Analyze performance metrics across deliveries, costs, and resources with interactive visualizations and reports.",
      icon: <BarChart3 className="h-5 w-5 text-orange-500" />
    },
    {
      title: "Compliance Monitoring",
      description: "Track regulatory compliance across your logistics operations and quickly address any compliance issues.",
      icon: <Shield className="h-5 w-5 text-red-500" />
    },
    {
      title: "Fleet Management",
      description: "Monitor and manage delivery vehicles, maintenance schedules, and driver assignments.",
      icon: <Truck className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Package Tracking",
      description: "Real-time tracking of packages throughout the delivery process with status updates and notifications.",
      icon: <PackageOpen className="h-5 w-5 text-emerald-500" />
    },
    {
      title: "Personnel Management",
      description: "Manage driver schedules, assignments, and performance metrics to optimize workforce utilization.",
      icon: <Users className="h-5 w-5 text-pink-500" />
    },
    {
      title: "Sort Planning",
      description: "Optimize package sorting operations with visual planning tools to improve throughput and accuracy.",
      icon: <MoveHorizontal className="h-5 w-5 text-violet-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
