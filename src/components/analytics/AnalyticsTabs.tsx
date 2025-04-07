
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartArea, ChartBar, ChartLine, ChartPie } from "lucide-react";
import OverviewTab from "./tabs/OverviewTab";
import DeliveryTab from "./tabs/DeliveryTab";
import CostsTab from "./tabs/CostsTab";
import ResourcesTab from "./tabs/ResourcesTab";

interface AnalyticsTabsProps {
  deliveryData: Array<{
    name: string;
    onTime: number;
    delayed: number;
  }>;
  efficiencyData: Array<{
    name: string;
    value: number;
  }>;
  resourceUtilizationData: Array<{
    name: string;
    value: number;
  }>;
  costTrendData: Array<{
    month: string;
    fuel: number;
    maintenance: number;
    personnel: number;
  }>;
  colors: string[];
}

const AnalyticsTabs = ({
  deliveryData,
  efficiencyData,
  resourceUtilizationData,
  costTrendData,
  colors,
}: AnalyticsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mb-6 space-y-6">
      <TabsList>
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <ChartArea className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="delivery" className="flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          Delivery Metrics
        </TabsTrigger>
        <TabsTrigger value="costs" className="flex items-center gap-2">
          <ChartLine className="h-4 w-4" />
          Cost Analysis
        </TabsTrigger>
        <TabsTrigger value="resources" className="flex items-center gap-2">
          <ChartPie className="h-4 w-4" />
          Resource Utilization
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="overview">
          <OverviewTab 
            deliveryData={deliveryData} 
            efficiencyData={efficiencyData} 
          />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryTab deliveryData={deliveryData} />
        </TabsContent>

        <TabsContent value="costs">
          <CostsTab costTrendData={costTrendData} />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesTab 
            resourceUtilizationData={resourceUtilizationData} 
            colors={colors} 
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AnalyticsTabs;
