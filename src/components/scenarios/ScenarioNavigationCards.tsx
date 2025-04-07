
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Settings, BarChart, Map, List } from "lucide-react";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ 
  title, 
  description, 
  icon, 
  isActive, 
  onClick 
}) => {
  return (
    <Card 
      className={`hover:shadow-md transition-shadow cursor-pointer ${isActive ? "border-primary" : ""}`} 
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <div className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
            {icon}
          </div>
          <h3 className={`text-lg font-semibold ${isActive ? "text-primary" : ""}`}>{title}</h3>
          <p className="text-sm text-muted-foreground text-center mt-1">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ScenarioNavigationCardsProps {
  activeView: "details" | "analysis" | "map" | "configuration" | "routes";
  onViewChange: (view: "details" | "analysis" | "map" | "configuration" | "routes") => void;
  onOpenConfiguration: () => void;
}

const ScenarioNavigationCards: React.FC<ScenarioNavigationCardsProps> = ({
  activeView,
  onViewChange,
  onOpenConfiguration
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
      <NavigationCard 
        title="Details" 
        description="View scenario details and configuration"
        icon={<FileText className="h-8 w-8 mb-2" />}
        isActive={activeView === "details"}
        onClick={() => onViewChange("details")}
      />
      
      <NavigationCard 
        title="Analysis" 
        description="Review performance metrics and KPIs"
        icon={<BarChart className="h-8 w-8 mb-2" />}
        isActive={activeView === "analysis"}
        onClick={() => onViewChange("analysis")}
      />

      <NavigationCard 
        title="Routes" 
        description="Manage and reorder route stops"
        icon={<List className="h-8 w-8 mb-2" />}
        isActive={activeView === "routes"}
        onClick={() => onViewChange("routes")}
      />

      <NavigationCard 
        title="Map View" 
        description="Visualize routes and network coverage"
        icon={<Map className="h-8 w-8 mb-2" />}
        isActive={activeView === "map"}
        onClick={() => onViewChange("map")}
      />

      <NavigationCard 
        title="Configuration" 
        description="Modify scenario parameters and rules"
        icon={<Settings className="h-8 w-8 mb-2" />}
        isActive={activeView === "configuration"}
        onClick={() => {
          onViewChange("configuration");
          onOpenConfiguration();
        }}
      />
    </div>
  );
};

export default ScenarioNavigationCards;
